package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.HotelDto;
import co.edu.sena.gestion_turistica.entity.HotelEntity;
import co.edu.sena.gestion_turistica.entity.MunicipioEntity;
import co.edu.sena.gestion_turistica.repository.HotelRepository;

@Service

public class HotelService {
  
    @Autowired
    private HotelRepository repository;

    public void save(HotelDto dto){

        HotelEntity entity = new HotelEntity();

      entity.setNombre(dto.getNombre());
      MunicipioEntity municipioEntity = new MunicipioEntity();
      municipioEntity.setId(dto.getIdMunicipio());
      entity.setMunicipios(municipioEntity);  
      entity.setCelular(dto.getCelular());
      entity.setDireccion(dto.getDireccion());
      entity.setPrecio(dto.getPrecio());
      entity.setUrlfoto(dto.getUrlfoto());
      repository.save(entity);

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

public HotelDto update(HotelDto newdata){

    Optional<HotelEntity> optionalHotel = this.repository.findById(newdata.getId());
    if (optionalHotel.isPresent()) {
        HotelEntity entity = optionalHotel.get();        
        
        entity.setNombre(newdata.getNombre());
        MunicipioEntity municipioEntity = new MunicipioEntity();
        municipioEntity.setId(newdata.getIdMunicipio());
        entity.setMunicipios(municipioEntity);
        entity.setCelular(newdata.getCelular());
        entity.setDireccion(newdata.getDireccion());
        entity.setPrecio(newdata.getPrecio());
        entity.setUrlfoto(newdata.getUrlfoto());
       
        this.repository.save(entity);

        return newdata;
}

return null;


}



}
