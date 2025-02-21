package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.UsuarioDto;
import co.edu.sena.gestion_turistica.entity.UsuarioEntity;
import co.edu.sena.gestion_turistica.repository.UsuarioRepository;

@Service

public class UsuarioService {

    @Autowired
    public UsuarioRepository repository;

    public void save(UsuarioDto dto){

        UsuarioEntity entity = new UsuarioEntity();

        entity.setId(dto.getId());
        entity.setPassword(dto.getPassword());
        entity.setLogin(dto.getLogin());
        entity.setIdRol(dto.getIdRol());
        entity.setIdPersona(dto.getIdPersona());

        repository.save(entity);
        



    }

    
    public List<UsuarioDto> getAll(){

        List<UsuarioDto> dtos = new ArrayList<>();
        List<UsuarioEntity> entities = repository.findAll();

        for(UsuarioEntity entity : entities){

            UsuarioDto dto = new UsuarioDto();

            dto.setId(entity.getId());
            dto.setLogin(entity.getLogin());
            dto.setPassword(entity.getPassword());
            dto.setIdRol(entity.getIdRol());
            dto.setIdPersona(entity.getIdPersona());
           
      
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
            dto.setIdRol(entity.getIdRol());
            dto.setIdPersona(entity.getIdPersona());

          
            return dto;


  }
  return null;

}

public void delete(Long id) {
    this.repository.deleteById(id);
    
}

public UsuarioDto update(UsuarioDto newdata){

    Optional<UsuarioEntity> optionalUsuario = this.repository.findById(newdata.getId());
    if (optionalUsuario.isPresent()) {
        UsuarioEntity entity = optionalUsuario.get();

        entity.setLogin(newdata.getLogin());
        entity.setPassword(newdata.getPassword());
        entity.setIdRol(newdata.getIdRol());
        entity.setIdPersona(newdata.getIdPersona());       
        
             
        this.repository.save(entity);

        return newdata;
}

return null;


}






}
