package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.DetallePersonaPaqueteDto;
import co.edu.sena.gestion_turistica.entity.DetallePersonaPaqueteEntity;
import co.edu.sena.gestion_turistica.entity.PersonaEntity;
import co.edu.sena.gestion_turistica.entity.paqueteTuristicoEntity;
import co.edu.sena.gestion_turistica.repository.DetallePersonaPaqueteRepository;

@Service
public class DetallePersonaPaqueteService {

    
    @Autowired
    private DetallePersonaPaqueteRepository repository;

    public DetallePersonaPaqueteDto save(DetallePersonaPaqueteDto dto) {
      DetallePersonaPaqueteEntity entity = new DetallePersonaPaqueteEntity();
  
      PersonaEntity personaEntity = new PersonaEntity();
      personaEntity.setId(dto.getIdPersona());
      entity.setPersona(personaEntity);
      paqueteTuristicoEntity paqueteEntity = new paqueteTuristicoEntity();
      paqueteEntity.setId(dto.getIdPaquete());
      entity.setPaquete(paqueteEntity);
      entity.setEstado(dto.getEstado());
      entity.setRegistro(dto.getRegistro());
      entity.setMotivo(dto.getMotivo());
  
      // Guarda y recupera entidad con ID generado
      entity = repository.save(entity);
  
      // Construir DTO de respuesta
      DetallePersonaPaqueteDto responseDto = new DetallePersonaPaqueteDto();
      responseDto.setId(entity.getId());
      responseDto.setIdPersona(entity.getPersona().getId());
      responseDto.setIdPaquete(entity.getPaquete().getId());
      responseDto.setEstado(entity.getEstado());
      responseDto.setRegistro(entity.getRegistro());
      responseDto.setMotivo(entity.getMotivo());
  
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
            return dto;


  }
  return null;

}

    public DetallePersonaPaqueteDto update(DetallePersonaPaqueteDto newdata){

    Optional<DetallePersonaPaqueteEntity> optionaldetalle = this.repository.findById(newdata.getId());
    if (optionaldetalle.isPresent()) {
        DetallePersonaPaqueteEntity entity = optionaldetalle.get();        
        
        PersonaEntity personaEntity = new PersonaEntity();
        personaEntity.setId(newdata.getIdPersona());
        entity.setPersona(personaEntity);
        paqueteTuristicoEntity paqueteEntity = new paqueteTuristicoEntity();
        paqueteEntity.setId(newdata.getIdPaquete());
        entity.setPaquete(paqueteEntity); 
        entity.setEstado(newdata.getEstado());
        entity.setRegistro(newdata.getRegistro());
        entity.setMotivo(newdata.getMotivo());
        this.repository.save(entity);
        return newdata;
}
return null;
}

public List<DetallePersonaPaqueteDto> historicoPaquetes(Long idPersona){

    List<DetallePersonaPaqueteEntity> paquetes = repository.findPaquetesByPersonaId(idPersona);
    List<DetallePersonaPaqueteDto> dtos = new ArrayList<>();

    for(DetallePersonaPaqueteEntity entity : paquetes){
        DetallePersonaPaqueteDto dto = DetallePersonaPaqueteDto.builder()
        .id(entity.getId())
        .persona(entity.getPersona().getPrimerNombre()+" "+entity.getPersona().getPrimerApellido())
        .paquete(entity.getPaquete().getNombre())
        .estado(entity.getEstado())
        .registro(entity.getRegistro())
        .motivo(entity.getMotivo())
        .build();
        
    
    dtos.add(dto);
}
return dtos;
}

}
