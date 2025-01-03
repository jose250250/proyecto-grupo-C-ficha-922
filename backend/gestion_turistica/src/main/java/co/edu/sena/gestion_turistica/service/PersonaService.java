package co.edu.sena.gestion_turistica.service;



import java.util.List;

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
    
}


