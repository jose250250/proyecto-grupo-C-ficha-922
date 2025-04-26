package co.edu.sena.gestion_turistica.service;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.PersonaDto;
import co.edu.sena.gestion_turistica.entity.PersonaEntity;
import co.edu.sena.gestion_turistica.repository.PersonaRepository;
import scorex.util.ArrayList;

@Service
public class PersonaService {

    @Autowired 
    private PersonaRepository repository;

    
    public void save(PersonaDto dto){ 
    PersonaEntity entity = new PersonaEntity();
    entity.setPrimerNombre(dto.getPrimerNombre());
    entity.setSegundoNombre(dto.getSegundoNombre());
    entity.setPrimerApellido(dto.getPrimerApellido());
    entity.setSegundoApellido(dto.getSegundoApellido());
    entity.setFechaNacimiento(dto.getFechaNacimiento());
    entity.setTipoIdentificacion(dto.getTipoIdentificacion());
    entity.setIdentificacion(dto.getIdentificacion());  
    entity.setCelular(dto.getCelular());
    entity.setIdMunicipio(dto.getIdMunicipio());
    entity.setDireccion(dto.getDireccion());
    entity.setGenero(dto.getGenero());
    entity.setCorreo(dto.getCorreo());
   
    repository.save(entity);
}

public List<PersonaDto> getAll(){

    List<PersonaDto> dtos = new ArrayList<>();
    List<PersonaEntity> entities = repository.findAll();

    for (PersonaEntity entity : entities){       
            PersonaDto dto = new PersonaDto();
            dto.setId(entity.getId());
            dto.setPrimerNombre(entity.getPrimerNombre());
            dto.setSegundoNombre(entity.getSegundoNombre());
            dto.setPrimerApellido(entity.getPrimerApellido());
            dto.setSegundoApellido(entity.getSegundoApellido());
            dto.setFechaNacimiento(entity.getFechaNacimiento());
            dto.setTipoIdentificacion(entity.getTipoIdentificacion());
            dto.setIdentificacion(entity.getIdentificacion());  
            dto.setCelular(entity.getCelular());
            dto.setIdMunicipio(entity.getIdMunicipio());
            dto.setDireccion(entity.getDireccion());
            dto.setGenero(entity.getGenero());
            dto.setCorreo(entity.getCorreo());  
             
            dtos.add(dto);
        
            
        }
      return dtos;
    }
    

    public PersonaDto getById(Long id) {
      
        Optional<PersonaEntity> optionalPersona = this.repository.findById(id);
        if (optionalPersona.isPresent()) {
            PersonaEntity entity = optionalPersona.get();
            PersonaDto dto = new PersonaDto();
            dto.setId(entity.getId());
            dto.setPrimerNombre(entity.getPrimerNombre());
            dto.setSegundoNombre(entity.getSegundoNombre());
            dto.setPrimerApellido(entity.getPrimerApellido());
            dto.setSegundoApellido(entity.getSegundoApellido());
            dto.setFechaNacimiento(entity.getFechaNacimiento());
            dto.setTipoIdentificacion(entity.getTipoIdentificacion());
            dto.setIdentificacion(entity.getIdentificacion());  
            dto.setCelular(entity.getCelular());
            dto.setIdMunicipio(entity.getIdMunicipio());
            dto.setDireccion(entity.getDireccion());
            dto.setGenero(entity.getGenero());
            dto.setCorreo(entity.getCorreo());  
            return dto;
        }

        return null;
    }


public void delete(Long id) {
    this.repository.deleteById(id);
}

public PersonaDto update(PersonaDto newdata){

    Optional<PersonaEntity> optionalPersona = this.repository.findById(newdata.getId());
    if (optionalPersona.isPresent()) {
        PersonaEntity entity = optionalPersona.get();        
       
        entity.setPrimerNombre(newdata.getPrimerNombre());
        entity.setSegundoNombre(newdata.getSegundoNombre());
        entity.setPrimerApellido(newdata.getPrimerApellido());
        entity.setSegundoApellido(newdata.getSegundoApellido());
        entity.setFechaNacimiento(newdata.getFechaNacimiento());
        entity.setTipoIdentificacion(newdata.getTipoIdentificacion());
        entity.setIdentificacion(newdata.getIdentificacion());  
        entity.setCelular(newdata.getCelular());
        entity.setIdMunicipio(newdata.getIdMunicipio());
        entity.setDireccion(newdata.getDireccion());
        entity.setGenero(newdata.getGenero());
        entity.setCorreo(newdata.getCorreo());

        this.repository.save(entity);

        return newdata;
}

return null;


}


}