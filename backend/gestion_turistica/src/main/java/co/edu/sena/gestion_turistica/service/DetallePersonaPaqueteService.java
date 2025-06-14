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

import co.edu.sena.gestion_turistica.dto.DetallePersonaPaqueteDto;
import co.edu.sena.gestion_turistica.entity.DetallePersonaPaqueteEntity;
import co.edu.sena.gestion_turistica.entity.PersonaEntity;
import co.edu.sena.gestion_turistica.entity.paqueteTuristicoEntity;
import co.edu.sena.gestion_turistica.repository.DetallePersonaPaqueteRepository;

@Service
public class DetallePersonaPaqueteService {


    @Autowired
    private DetallePersonaPaqueteRepository repository;

   public DetallePersonaPaqueteDto save(MultipartFile file, DetallePersonaPaqueteDto dto) {
    DetallePersonaPaqueteEntity entity;

    // Si es actualización, obtener entidad existente
    if (dto.getId() != null && repository.existsById(dto.getId())) {
        entity = repository.findById(dto.getId()).orElseThrow(() -> new RuntimeException("Detalle no encontrado"));
    } else {
        entity = new DetallePersonaPaqueteEntity();
    }

    // Setear relaciones
    PersonaEntity personaEntity = new PersonaEntity();
    personaEntity.setId(dto.getIdPersona());
    entity.setPersona(personaEntity);

    paqueteTuristicoEntity paqueteEntity = new paqueteTuristicoEntity();
    paqueteEntity.setId(dto.getIdPaquete());
    entity.setPaquete(paqueteEntity);

    // Setear datos simples
    entity.setEstado(dto.getEstado());
    entity.setRegistro(dto.getRegistro());
    entity.setMotivo(dto.getMotivo());
    entity.setPrecioTotal(dto.getPrecioTotal());

    // Procesar imagen (voucher)
    if (file != null && !file.isEmpty()) {
        try {
            String nombreArchivo = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path carpeta = Paths.get("C:/xampp/htdocs/Front/uploads/vouchers");
            if (!Files.exists(carpeta)) {
                Files.createDirectories(carpeta);
            }
            Path ruta = carpeta.resolve(nombreArchivo);
            Files.copy(file.getInputStream(), ruta, StandardCopyOption.REPLACE_EXISTING);

            // Actualiza el campo de la ruta del voucher
            entity.setUrlVaucher("vouchers/" + nombreArchivo);
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el voucher", e);
        }
    }

    // Si no se envía imagen nueva, se conserva la que ya tiene (no se modifica)

    // Guardar en BD
    entity = repository.save(entity);

    // Construir DTO de respuesta
    DetallePersonaPaqueteDto responseDto = new DetallePersonaPaqueteDto();
    responseDto.setId(entity.getId());
    responseDto.setIdPersona(entity.getPersona().getId());
    responseDto.setIdPaquete(entity.getPaquete().getId());
    responseDto.setEstado(entity.getEstado());
    responseDto.setRegistro(entity.getRegistro());
    responseDto.setMotivo(entity.getMotivo());
    responseDto.setUrlVaucher(entity.getUrlVaucher());
    responseDto.setPrecioTotal(entity.getPrecioTotal());

    return responseDto;
}

      public List<DetallePersonaPaqueteDto> getAll(){

        List<DetallePersonaPaqueteDto> dtos = new ArrayList<>();
        List<DetallePersonaPaqueteEntity> entities = repository.findAll();

        for(DetallePersonaPaqueteEntity entity : entities){

            DetallePersonaPaqueteDto dto = new DetallePersonaPaqueteDto();
            dto.setId(entity.getId());
            dto.setIdPaquete(entity.getPaquete().getId());
            dto.setPaquete(entity.getPaquete().getNombre());
            dto.setIdPersona(entity.getPersona().getId());
            dto.setPersona(entity.getPersona().getPrimerNombre()+" "+entity.getPersona().getPrimerApellido());
            dto.setIdentificacion(entity.getPersona().getIdentificacion());
            dto.setEstado(entity.getEstado());
            dto.setRegistro(entity.getRegistro());
            dto.setMotivo(entity.getMotivo());
            dto.setUrlVaucher(entity.getUrlVaucher());
            dto.setPrecioTotal(entity.getPrecioTotal());
            dtos.add(dto);       
        }
        return dtos;        
    }

    public void delete(Long id) {
        this.repository.deleteById(id);
        
    }
     public DetallePersonaPaqueteDto getById(Long id) {
      
        Optional<DetallePersonaPaqueteEntity> optionaldetalle = this.repository.findById(id);
        if (optionaldetalle.isPresent()) {
            DetallePersonaPaqueteEntity entity = optionaldetalle.get();
            DetallePersonaPaqueteDto dto = new DetallePersonaPaqueteDto();
            dto.setId(entity.getId());
            dto.setEstado(entity.getEstado());
            dto.setIdPaquete(entity.getPaquete().getId());
            dto.setPaquete(entity.getPaquete().getNombre());
            dto.setIdentificacion(entity.getPersona().getIdentificacion());
            dto.setIdPersona(entity.getPersona().getId());
            dto.setPersona(entity.getPersona().getPrimerNombre()+" "+entity.getPersona().getPrimerApellido());
            dto.setRegistro(entity.getRegistro());
            dto.setMotivo(entity.getMotivo());
            dto.setUrlVaucher(entity.getUrlVaucher());
            dto.setPrecioTotal(entity.getPrecioTotal());
            return dto;


  }
  return null;

}

public DetallePersonaPaqueteDto update(Long id, DetallePersonaPaqueteDto dto, MultipartFile file) {
    Optional<DetallePersonaPaqueteEntity> optionalEntity = repository.findById(id);

    if (optionalEntity.isPresent()) {
        DetallePersonaPaqueteEntity entity = optionalEntity.get();

        // Actualiza campos comunes
        PersonaEntity personaEntity = new PersonaEntity();
        personaEntity.setId(dto.getIdPersona());
        entity.setPersona(personaEntity);

        paqueteTuristicoEntity paqueteEntity = new paqueteTuristicoEntity();
        paqueteEntity.setId(dto.getIdPaquete());
        entity.setPaquete(paqueteEntity);

        entity.setEstado(dto.getEstado());
        entity.setRegistro(dto.getRegistro());
        entity.setMotivo(dto.getMotivo());
        entity.setPrecioTotal(dto.getPrecioTotal());

        // Validar si se subió un nuevo archivo
        if (file != null && !file.isEmpty()) {
            try {
            String nombreArchivo = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path carpeta = Paths.get("C:/xampp/htdocs/Front/uploads/vouchers");
            if (!Files.exists(carpeta)) {
                Files.createDirectories(carpeta);
            }
            Path ruta = carpeta.resolve(nombreArchivo);
            Files.copy(file.getInputStream(), ruta, StandardCopyOption.REPLACE_EXISTING);

            // Actualiza el campo de la ruta del voucher
            entity.setUrlVaucher("vouchers/" + nombreArchivo);

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el voucher", e);
        }
    }
        // Guardar los cambios
        entity = repository.save(entity);

        // Preparar respuesta DTO
        DetallePersonaPaqueteDto response = new DetallePersonaPaqueteDto();
        response.setId(entity.getId());
        response.setIdPersona(entity.getPersona().getId());
        response.setIdPaquete(entity.getPaquete().getId());
        response.setEstado(entity.getEstado());
        response.setRegistro(entity.getRegistro());
        response.setMotivo(entity.getMotivo());
        response.setUrlVaucher(entity.getUrlVaucher());
        response.setPrecioTotal(entity.getPrecioTotal());

        return response;
    }

    return null;
}


public List<DetallePersonaPaqueteDto> historicoPaquetes(Long idPersona){

    List<DetallePersonaPaqueteEntity> paquetes = repository.findPaquetesByPersonaId(idPersona);
    List<DetallePersonaPaqueteDto> dtos = new ArrayList<>();

    for(DetallePersonaPaqueteEntity entity : paquetes){
        DetallePersonaPaqueteDto dto = DetallePersonaPaqueteDto.builder()
        .id(entity.getId())
        .idPersona(entity.getPersona().getId())
        .persona(entity.getPersona().getPrimerNombre()+" "+entity.getPersona().getPrimerApellido())
        .idPaquete(entity.getPaquete().getId())
        .paquete(entity.getPaquete().getNombre())
        .estado(entity.getEstado())
        .registro(entity.getRegistro())
        .motivo(entity.getMotivo())
        .precioTotal(entity.getPrecioTotal())
        .build();
        
    
    dtos.add(dto);
}
return dtos;
}


}