package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.LoginRequestDto;
import co.edu.sena.gestion_turistica.dto.LoginResponseDto;
import co.edu.sena.gestion_turistica.dto.UsuarioDto;
import co.edu.sena.gestion_turistica.dto.UsuarioResponseDto;
import co.edu.sena.gestion_turistica.entity.PersonaEntity;
import co.edu.sena.gestion_turistica.entity.RolEntity;
import co.edu.sena.gestion_turistica.entity.UsuarioEntity;
import co.edu.sena.gestion_turistica.repository.UsuarioRepository;

@Service

public class UsuarioService {

   

    @Autowired
    public UsuarioRepository repository;

    @Autowired
    public RolService rolService;   
     

    public void save(UsuarioDto dto) {

        UsuarioEntity entity = new UsuarioEntity(); 

        entity.setLogin(dto.getLogin());
        entity.setPassword(dto.getPassword());
        RolEntity rolEntity = new RolEntity();
        rolEntity.setId(dto.getIdrol());
        entity.setRol(rolEntity);
        PersonaEntity personaEntity = new PersonaEntity();
        personaEntity.setId(dto.getIdPersona());
        entity.setPersona(personaEntity);
        repository.save(entity);
    }

    public List<UsuarioResponseDto> getAll() {

        List<UsuarioResponseDto> dtos = new ArrayList<>();
        List<UsuarioEntity> entities = repository.findAll();

        for (UsuarioEntity entity : entities) {

            UsuarioResponseDto dto = new UsuarioResponseDto();

            dto.setId(entity.getId());
            dto.setLogin(entity.getLogin());
            dto.setPassword(entity.getPassword());
            dto.setPersona(entity.getPersona().getPrimerNombre()+" "+ entity.getPersona().getPrimerApellido());
            dto.setRol(entity.getRol().getNombre());

            dtos.add(dto);

        }

        return dtos;

    }

    public UsuarioDto getById(Long id) {

        Optional<UsuarioEntity> optionalUsuario = this.repository.findById(id);
        if (optionalUsuario.isPresent()) {
            UsuarioEntity entity = optionalUsuario.get();
            UsuarioDto dto = new UsuarioDto();
            dto.setId(entity.getId());
            dto.setLogin(entity.getLogin());
            dto.setPassword(entity.getPassword());
            dto.setIdrol(entity.getRol().getId());
            dto.setIdPersona(entity.getPersona().getId());

            return dto;

        }
        return null;

    }

    public void delete(Long id) {
        this.repository.deleteById(id);

    }

    public UsuarioDto update(UsuarioDto newdata) {

        Optional<UsuarioEntity> optionalUsuario = this.repository.findById(newdata.getId());
        if (optionalUsuario.isPresent()) {
            UsuarioEntity entity = optionalUsuario.get();

            entity.setLogin(newdata.getLogin());
            entity.setPassword(newdata.getPassword());  
            PersonaEntity personaEntity = new PersonaEntity();
            personaEntity.setId(newdata.getIdPersona());        
            entity.setPersona(personaEntity);
            RolEntity rolEntity = new RolEntity();
            rolEntity.setId(newdata.getIdrol());
            entity.setRol(rolEntity);

            this.repository.save(entity);

            return newdata;
        }

        return null;

    }   
   

    public LoginResponseDto login(LoginRequestDto request) {      
        
        LoginResponseDto response;

        Optional<UsuarioEntity> optResponse = this.repository
                .findByLoginAndPassword(request.getUsername(), request.getPassword());            
            if(optResponse.isPresent()) {
                UsuarioEntity entity =  optResponse.get();        

                response = LoginResponseDto.builder()
                        .id(entity.getId())
                        .rol(entity.getRol().getNombre())
                        .idrol(entity.getRol().getId())
                        .persona(entity.getPersona().getId())
                        .PrimerNombre(entity.getPersona().getPrimerNombre())
                        .PrimerApellido(entity.getPersona().getPrimerApellido())
                        .isActive(true)
                        .build();    
              
            } else {
                response = LoginResponseDto.builder()
                        .isActive(false)
                        .build();           
            }  
            return response;
    }


}
