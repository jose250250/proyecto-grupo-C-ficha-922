package co.edu.sena.gestion_turistica.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.PersonaDto;
import co.edu.sena.gestion_turistica.entity.PersonaEntity;
import co.edu.sena.gestion_turistica.repository.PersonaRepository;

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


}
