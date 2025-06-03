package co.edu.sena.gestion_turistica.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import co.edu.sena.gestion_turistica.dto.HotelDto;
import co.edu.sena.gestion_turistica.entity.HotelEntity;
import co.edu.sena.gestion_turistica.entity.MunicipioEntity;
import co.edu.sena.gestion_turistica.repository.HotelRepository;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;


@Service

public class HotelService {
   
    private final HotelRepository repository;

    @Value("${upload.path.hoteles}")
    private String uploadDir;

 
    public HotelService(HotelRepository repository) {
        this.repository = repository;
    }

    public HotelDto save(MultipartFile foto, String nombre, Long idMunicipio, String celular, String direccion, Double precio) {
        HotelEntity entity = new HotelEntity();

        entity.setNombre(nombre);
        entity.setCelular(celular);
        entity.setDireccion(direccion);
        entity.setPrecio(precio);

        // Asignar municipio
        MunicipioEntity municipio = new MunicipioEntity();
        municipio.setId(idMunicipio);
        entity.setMunicipios(municipio);

        // Guardar imagen
        if (foto != null && !foto.isEmpty()) {
            try {
                String nombreArchivo = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();
                Path ruta = Paths.get(uploadDir, nombreArchivo);
                Files.createDirectories(ruta.getParent());
                Files.write(ruta, foto.getBytes());
                entity.setUrlfoto("uploads/hoteles/" + nombreArchivo);
            } catch (IOException e) {
                throw new RuntimeException("Error al guardar imagen", e);
            }
        }

        repository.save(entity);

        // Retornar DTO
        HotelDto dto = new HotelDto();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setIdMunicipio(municipio.getId());
        dto.setCelular(entity.getCelular());
        dto.setDireccion(entity.getDireccion());
        dto.setPrecio(entity.getPrecio());
        dto.setUrlfoto(entity.getUrlfoto());

        return dto;
    }



    public List<HotelDto> getAll(){

        List<HotelDto> dtos = new ArrayList<>();
        List<HotelEntity> entities = repository.findAll();

        for(HotelEntity entity : entities){

            HotelDto dto = new HotelDto();

            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
            dto.setIdMunicipio(entity.getMunicipios().getId());
            dto.setMunicipio(entity.getMunicipios().getMunicipio());
            dto.setCelular(entity.getCelular());
            dto.setDireccion(entity.getDireccion());
            dto.setPrecio(entity.getPrecio());
            dto.setUrlfoto(entity.getUrlfoto());
                  
            dtos.add(dto);       

        }
        return dtos;        
    }

     public HotelDto getById(Long id) {
      
        Optional<HotelEntity> optionalhotel = this.repository.findById(id);
        if (optionalhotel.isPresent()) {
            HotelEntity entity = optionalhotel.get();
            HotelDto dto = new HotelDto();
            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
            dto.setIdMunicipio(entity.getMunicipios().getId());
            dto.setMunicipio(entity.getMunicipios().getMunicipio());
            dto.setCelular(entity.getCelular());
            dto.setDireccion(entity.getDireccion());
            dto.setPrecio(entity.getPrecio());
            dto.setUrlfoto(entity.getUrlfoto());
            return dto;


  }
  return null;

}

public void delete(Long id) {
    this.repository.deleteById(id);
    
}

public HotelDto update(HotelDto newdata, MultipartFile foto) throws IOException {
    Optional<HotelEntity> optionalHotel = this.repository.findById(newdata.getId());

    if (optionalHotel.isPresent()) {
        HotelEntity entity = optionalHotel.get();

        // Asignar campos desde el DTO
        entity.setNombre(newdata.getNombre());
        entity.setCelular(newdata.getCelular());
        entity.setDireccion(newdata.getDireccion());
        entity.setPrecio(newdata.getPrecio());

        // Municipio
        MunicipioEntity municipioEntity = new MunicipioEntity();
        municipioEntity.setId(newdata.getIdMunicipio());
        entity.setMunicipios(municipioEntity);

        // Si viene una nueva foto
        if (foto != null && !foto.isEmpty()) {
            String originalFileName = foto.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFileName);
            String newFileName = UUID.randomUUID() + "." + extension;

            Path path = Paths.get(uploadDir, newFileName);
            Files.createDirectories(path.getParent());
            Files.copy(foto.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            entity.setUrlfoto(newFileName);
            newdata.setUrlfoto(newFileName);
        }

        repository.save(entity);
        return newdata;
    }

    return null;
}



}
