package co.edu.sena.gestion_turistica.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.RolDto;
import co.edu.sena.gestion_turistica.entity.RolEntity;
import co.edu.sena.gestion_turistica.repository.RolRepository;

@Service
public class RolService {

    @Autowired
    private RolRepository repository;

    public RolDto getById(Long id) {
      
        Optional<RolEntity> optionalrol = this.repository.findById(id);

        if (optionalrol.isPresent()) {
            RolEntity entity = optionalrol.get();
            RolDto dto = new RolDto();
            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
          
            return dto;


  }
  return null;

}
public RolEntity GetById(Long id) {
      
    Optional<RolEntity> optionalrol = this.repository.findById(id);

    if (optionalrol.isPresent()) return optionalrol.get();

    return null;



} 
}