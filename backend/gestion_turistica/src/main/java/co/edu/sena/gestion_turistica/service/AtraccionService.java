package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.AtraccionDto;
import co.edu.sena.gestion_turistica.entity.AtraccionEntity;
import co.edu.sena.gestion_turistica.repository.AtraccionRepository;

@Service
public class AtraccionService {

    @Autowired
    private AtraccionRepository repository;

    public void save(AtraccionDto dto){
        AtraccionEntity entity = new AtraccionEntity();
        entity.setNombre(dto.getNombre());
        entity.setIdMunicipio(dto.getIdMunicipio());
        entity.setCelular(dto.getCelular());
        entity.setPrecio(dto.getPrecio());

        repository.save(entity);

    }

    public List<AtraccionDto> getAll(){

        List<AtraccionDto> dtos = new ArrayList<>();
        List<AtraccionEntity> entities = repository.findAll();

        for(AtraccionEntity entity : entities){

            AtraccionDto dto = new AtraccionDto();

            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
            dto.setIdMunicipio(entity.getIdMunicipio());
            dto.setCelular(entity.getCelular());
            dto.setPrecio(entity.getPrecio());
            
      
            dtos.add(dto);


        

        }

        return dtos;
        
    }

     public AtraccionDto getById(Long id) {
      
        Optional<AtraccionEntity> optionalAt = this.repository.findById(id);
        if (optionalAt.isPresent()) {
            AtraccionEntity entity = optionalAt.get();
            AtraccionDto dto = new AtraccionDto();
            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
            dto.setIdMunicipio(entity.getIdMunicipio());
            dto.setCelular(entity.getCelular());
            dto.setPrecio(entity.getPrecio());            
            return dto;
  }
  return null;

}

public void delete(Long id) {
    this.repository.deleteById(id);
    
}

public AtraccionDto update(AtraccionDto newdata){

    Optional<AtraccionEntity> optionalAt = this.repository.findById(newdata.getId());
    if (optionalAt.isPresent()) {
        AtraccionEntity entity = optionalAt.get();        
        
        entity.setNombre(newdata.getNombre());
        entity.setIdMunicipio(newdata.getIdMunicipio());
        entity.setCelular(newdata.getCelular());
        entity.setPrecio(newdata.getPrecio());            
        this.repository.save(entity);

        return newdata;
}

return null;


}



}
