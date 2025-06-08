package co.edu.sena.gestion_turistica.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import co.edu.sena.gestion_turistica.dto.PaqueteResponseIDdto;
import co.edu.sena.gestion_turistica.dto.PaqueteTuristicoRequestDto;
import co.edu.sena.gestion_turistica.dto.PaqueteTuristicoResponseDto;
import co.edu.sena.gestion_turistica.entity.AtraccionEntity;
import co.edu.sena.gestion_turistica.entity.HotelEntity;
import co.edu.sena.gestion_turistica.entity.MunicipioEntity;
import co.edu.sena.gestion_turistica.entity.RestauranteEntity;
import co.edu.sena.gestion_turistica.entity.TransporteEntity;
import co.edu.sena.gestion_turistica.entity.paqueteTuristicoEntity;
import co.edu.sena.gestion_turistica.repository.AtraccionRepository;
import co.edu.sena.gestion_turistica.repository.HotelRepository;
import co.edu.sena.gestion_turistica.repository.MunicipioRepository;
import co.edu.sena.gestion_turistica.repository.PaqueteTuristicoRepository;
import co.edu.sena.gestion_turistica.repository.RestauranteRepository;
import co.edu.sena.gestion_turistica.repository.TransporteRepository;
import org.springframework.beans.factory.annotation.Value;

@Service
public class PaqueteTuristicoService {

    @Autowired
    private PaqueteTuristicoRepository repository;
    @Autowired
private MunicipioRepository municipioRepository;

@Autowired
private HotelRepository hotelRepository;

@Autowired
private RestauranteRepository restauranteRepository;

@Autowired
private AtraccionRepository atraccionRepository;

@Autowired
private TransporteRepository transporteRepository;




public List<PaqueteTuristicoResponseDto> getAll() {

    List<paqueteTuristicoEntity> entities = this.repository.findAll();
    List<PaqueteTuristicoResponseDto> dtos = new ArrayList<>();

    for (paqueteTuristicoEntity entity : entities) {
        PaqueteTuristicoResponseDto dto = PaqueteTuristicoResponseDto.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .clase(entity.getClase())
                .descripcion(entity.getDescripcion())
                .idMunicipio(entity.getMunicipios().getId())
                .municipio(entity.getMunicipios().getMunicipio())
                .fechaInicio(entity.getFechaInicio())
                .fechaFinal(entity.getFechaFinal())

                // Relaciones opcionales (verificadas con null-safe)
                .Hotel(entity.getHotel() != null ? entity.getHotel().getNombre() : "No Requiere")
                .Restaurante(entity.getRestaurante() != null ? entity.getRestaurante().getNombre() : "No Requiere")
                .Atraccion(entity.getAtraccion() != null ? entity.getAtraccion().getNombre() : "No Requiere")
                .Transporte(entity.getTransporte() != null ? entity.getTransporte().getNombre() : "No Requiere")

                .precioDia(entity.getPrecioDia())
                .Descuento(entity.getDescuento())
                .build();

        dtos.add(dto);
    }

    return dtos;
}


@Value("${upload.path.paquetes}")
private String uploadDir;

public PaqueteResponseIDdto save(PaqueteTuristicoRequestDto dto, MultipartFile foto) {
    paqueteTuristicoEntity entity = new paqueteTuristicoEntity();

    entity.setNombre(dto.getNombre());
    entity.setClase(dto.getClase());
    entity.setDescripcion(dto.getDescripcion());

    MunicipioEntity municipioEntity = municipioRepository.findById(dto.getIdMunicipio())
        .orElseThrow(() -> new RuntimeException("Municipio no encontrado"));
    entity.setMunicipios(municipioEntity);

    entity.setFechaInicio(dto.getFechaInicio());
    entity.setFechaFinal(dto.getFechaFinal());

    if (dto.getIdHotel() != null) {
        HotelEntity hotelEntity = hotelRepository.findById(dto.getIdHotel())
            .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));
        entity.setHotel(hotelEntity);
    }

    if (dto.getIdRestaurante() != null) {
        RestauranteEntity restauranteEntity = restauranteRepository.findById(dto.getIdRestaurante())
            .orElseThrow(() -> new RuntimeException("Restaurante no encontrado"));
        entity.setRestaurante(restauranteEntity);
    }

    if (dto.getIdAtraccion() != null) {
        AtraccionEntity atraccionEntity = atraccionRepository.findById(dto.getIdAtraccion())
            .orElseThrow(() -> new RuntimeException("Atracción no encontrada"));
        entity.setAtraccion(atraccionEntity);
    }

    if (dto.getIdTransporte() != null) {
        TransporteEntity transporteEntity = transporteRepository.findById(dto.getIdTransporte())
            .orElseThrow(() -> new RuntimeException("Transporte no encontrado"));
        entity.setTransporte(transporteEntity);
    }

    entity.setPrecioDia(dto.getPrecioDia());
    entity.setDescuento(dto.getDescuento());

    // Guardar imagen
   if (foto != null && !foto.isEmpty()) {
    try {
        String nombreArchivo = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();

        Path carpeta = Paths.get("C:/xampp/htdocs/Front/uploads/paquetes");
        if (!Files.exists(carpeta)) {
            Files.createDirectories(carpeta);
        }

        Path ruta = carpeta.resolve(nombreArchivo);
        Files.copy(foto.getInputStream(), ruta, StandardCopyOption.REPLACE_EXISTING);

        entity.setUrlfoto("paquetes/" + nombreArchivo); // Esto es importante para que el navegador acceda
    } catch (IOException e) {
        throw new RuntimeException("Error al guardar la imagen del paquete", e);
    }
}


    entity = repository.save(entity);

    PaqueteResponseIDdto responseDto = new PaqueteResponseIDdto();
    responseDto.setId(entity.getId());
    responseDto.setNombre(entity.getNombre());

    return responseDto;
}


public PaqueteTuristicoResponseDto getById(Long id) {
    Optional<paqueteTuristicoEntity> optionalpaquete = this.repository.findById(id);

    if (optionalpaquete.isPresent()) {
        paqueteTuristicoEntity entity = optionalpaquete.get();
        PaqueteTuristicoResponseDto dto = new PaqueteTuristicoResponseDto();

        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setClase(entity.getClase());
        dto.setDescripcion(entity.getDescripcion());

        if (entity.getMunicipios() != null) {
            dto.setIdMunicipio(entity.getMunicipios().getId());
            dto.setMunicipio(entity.getMunicipios().getMunicipio());
        }

        dto.setFechaInicio(entity.getFechaInicio());
        dto.setFechaFinal(entity.getFechaFinal());

        if (entity.getHotel() != null) {
            dto.setIdHotel(entity.getHotel().getId());
            dto.setHotel(entity.getHotel().getNombre());
        }

        if (entity.getAtraccion() != null) {
            dto.setIdAtraccion(entity.getAtraccion().getId());
            dto.setAtraccion(entity.getAtraccion().getNombre());
        }

        if (entity.getRestaurante() != null) {
            dto.setIdRestaurante(entity.getRestaurante().getId());
            dto.setRestaurante(entity.getRestaurante().getNombre());
        }

        if (entity.getTransporte() != null) {
            dto.setIdTransporte(entity.getTransporte().getId());
            dto.setTransporte(entity.getTransporte().getNombre());
        }

        dto.setPrecioDia(entity.getPrecioDia());
        dto.setDescuento(entity.getDescuento());

        return dto;
    }

    return null;
}

    public void delete(Long id) {
        this.repository.deleteById(id);

    }

public PaqueteTuristicoRequestDto update(MultipartFile foto, PaqueteTuristicoRequestDto newdata) {
    Optional<paqueteTuristicoEntity> optionalPaquete = this.repository.findById(newdata.getId());

    if (optionalPaquete.isPresent()) {
        paqueteTuristicoEntity entity = optionalPaquete.get();

        entity.setNombre(newdata.getNombre());
        entity.setClase(newdata.getClase());
        entity.setDescripcion(newdata.getDescripcion());

        MunicipioEntity municipioEntity = municipioRepository.findById(newdata.getIdMunicipio())
                .orElseThrow(() -> new RuntimeException("Municipio no encontrado"));
        entity.setMunicipios(municipioEntity);

        entity.setFechaInicio(newdata.getFechaInicio());
        entity.setFechaFinal(newdata.getFechaFinal());

        // Hotel (opcional)
        if (newdata.getIdHotel() != null) {
            HotelEntity hotel = hotelRepository.findById(newdata.getIdHotel())
                    .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));
            entity.setHotel(hotel);
        } else {
            entity.setHotel(null);
        }

        // Restaurante (opcional)
        if (newdata.getIdRestaurante() != null) {
            RestauranteEntity rest = restauranteRepository.findById(newdata.getIdRestaurante())
                    .orElseThrow(() -> new RuntimeException("Restaurante no encontrado"));
            entity.setRestaurante(rest);
        } else {
            entity.setRestaurante(null);
        }

        // Atracción (opcional)
        if (newdata.getIdAtraccion() != null) {
            AtraccionEntity atr = atraccionRepository.findById(newdata.getIdAtraccion())
                    .orElseThrow(() -> new RuntimeException("Atracción no encontrada"));
            entity.setAtraccion(atr);
        } else {
            entity.setAtraccion(null);
        }

        // Transporte (opcional)
        if (newdata.getIdTransporte() != null) {
            TransporteEntity trans = transporteRepository.findById(newdata.getIdTransporte())
                    .orElseThrow(() -> new RuntimeException("Transporte no encontrado"));
            entity.setTransporte(trans);
        } else {
            entity.setTransporte(null);
        }

        entity.setPrecioDia(newdata.getPrecioDia());
        entity.setDescuento(newdata.getDescuento());

        // FOTO: si se envía nueva, se guarda. Si no, se mantiene la actual.
      if (foto != null && !foto.isEmpty()) {
    try {
        String nombreArchivo = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();

        Path carpeta = Paths.get("C:/xampp/htdocs/Front/uploads/paquetes");
        if (!Files.exists(carpeta)) {
            Files.createDirectories(carpeta);
        }

        Path ruta = carpeta.resolve(nombreArchivo);
        Files.copy(foto.getInputStream(), ruta, StandardCopyOption.REPLACE_EXISTING);

        entity.setUrlfoto("paquetes/" + nombreArchivo); // Ruta accesible desde el navegador
    } catch (IOException e) {
        throw new RuntimeException("Error al guardar la foto del paquete", e);
    }
}

        
        // Si no se envía foto, se conserva la ya existente (no se hace nada)

        this.repository.save(entity);
        return newdata;
    }

    return null;
}

    public List<PaqueteTuristicoResponseDto> paquetesFiltrados() {
        List<paqueteTuristicoEntity> paquetes = repository.findByClaseNot("PERSONALIZADO");
        List<PaqueteTuristicoResponseDto> dtos = new ArrayList<>();
    
        for (paqueteTuristicoEntity entity : paquetes) {
            PaqueteTuristicoResponseDto dto = PaqueteTuristicoResponseDto.builder()
                    .id(entity.getId())
                    .nombre(entity.getNombre())
                    .clase(entity.getClase())
                    .descripcion(entity.getDescripcion())
                    .idMunicipio(entity.getMunicipios().getId())
                    .municipio(entity.getMunicipios().getMunicipio())
                    .fechaInicio(entity.getFechaInicio())
                    .fechaFinal(entity.getFechaFinal())
    
                    .Hotel(entity.getHotel() != null ? entity.getHotel().getNombre() : "No Requiere")
                    .Atraccion(entity.getAtraccion() != null ? entity.getAtraccion().getNombre() : "No Requiere")
                    .Restaurante(entity.getRestaurante() != null ? entity.getRestaurante().getNombre() : "No Requiere")
                    .Transporte(entity.getTransporte() != null ? entity.getTransporte().getNombre() : "No Requiere")
    
                    .precioDia(entity.getPrecioDia())
                    .Descuento(entity.getDescuento())
                    .urlfoto(entity.getUrlfoto())
                    .build();
    
            dtos.add(dto);
        }
    
        return dtos;
    }
    
    

   }
