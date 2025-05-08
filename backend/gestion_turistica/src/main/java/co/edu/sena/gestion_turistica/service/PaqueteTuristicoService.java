package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.PaqueteResponseIDdto;
import co.edu.sena.gestion_turistica.dto.PaqueteTuristicoRequestDto;
import co.edu.sena.gestion_turistica.dto.PaqueteTuristicoResponseDto;
import co.edu.sena.gestion_turistica.entity.AtraccionEntity;
import co.edu.sena.gestion_turistica.entity.HotelEntity;
import co.edu.sena.gestion_turistica.entity.MunicipioEntity;
import co.edu.sena.gestion_turistica.entity.RestauranteEntity;
import co.edu.sena.gestion_turistica.entity.TransporteEntity;
import co.edu.sena.gestion_turistica.entity.paqueteTuristicoEntity;
import co.edu.sena.gestion_turistica.repository.PaqueteTuristicoRepository;

@Service
public class PaqueteTuristicoService {

    @Autowired
    private PaqueteTuristicoRepository repository;


    public List<PaqueteTuristicoResponseDto> getAll(){

        List<paqueteTuristicoEntity> entities = this.repository.findAll();
        List<PaqueteTuristicoResponseDto> dtos = new ArrayList<>();

        for (paqueteTuristicoEntity entity: entities) {
            PaqueteTuristicoResponseDto dto = PaqueteTuristicoResponseDto.builder()
                    .id(entity.getId())
                     .nombre(entity.getNombre())
                     .clase(entity.getClase())
                     .descripcion(entity.getDescripcion())
                     .idMunicipio(entity.getMunicipios().getId())
                     .municipio(entity.getMunicipios().getMunicipio())
                     .fechaInicio(entity.getFechaInicio())
                     .fechaFinal(entity.getFechaFinal())
                     .Hotel(entity.getHotel().getNombre())
                     .Atraccion(entity.getAtraccion().getNombre())
                     .Restaurante(entity.getRestaurante().getNombre())
                     .Transporte(entity.getTransporte().getNombre())
                     .precioDia(entity.getPrecioDia())
                     .Descuento(entity.getDescuento())
                    

                    .build();

            dtos.add(dto);
        }

        return dtos;
    }

 
    public PaqueteResponseIDdto save(PaqueteTuristicoRequestDto dto){

    paqueteTuristicoEntity entity = new paqueteTuristicoEntity();

    entity.setNombre(dto.getNombre());
    entity.setClase(dto.getClase());
    entity.setDescripcion(dto.getDescripcion());
    MunicipioEntity municipioEntity = new MunicipioEntity();
    municipioEntity.setId(dto.getIdMunicipio());
    entity.setMunicipios(municipioEntity);  
    entity.setFechaInicio(dto.getFechaInicio());
    entity.setFechaFinal(dto.getFechaFinal());
    HotelEntity hotelEntity = new HotelEntity();
    hotelEntity.setId(dto.getIdHotel());
    entity.setHotel(hotelEntity);   
    RestauranteEntity restauranteEntity = new RestauranteEntity();
    restauranteEntity.setId(dto.getIdRestaurante());
    entity.setRestaurante(restauranteEntity);
    AtraccionEntity atraccionEntity = new AtraccionEntity();
    atraccionEntity.setId(dto.getIdAtraccion());
    entity.setAtraccion(atraccionEntity);
    TransporteEntity transporteEntity = new TransporteEntity();
    transporteEntity.setId(dto.getIdTransporte());
    entity.setTransporte(transporteEntity);
    entity.setPrecioDia(dto.getPrecioDia());
    entity.setDescuento(dto.getDescuento());

    entity = repository.save(entity);

    PaqueteResponseIDdto responseDto = new PaqueteResponseIDdto();
    responseDto.setId(entity.getId());
    responseDto.setNombre(entity.getNombre());
   

    return responseDto;
    
   

    }

     public PaqueteTuristicoResponseDto getById(Long id) {
      
        Optional<paqueteTuristicoEntity> optionalpaquete = this.repository.findById(id);
        if (optionalpaquete.isPresent()) {
            paqueteTuristicoEntity entity = optionalpaquete.get();
            PaqueteTuristicoResponseDto dto = new PaqueteTuristicoResponseDto();
            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
            dto.setClase(entity.getClase());
            dto.setDescripcion(entity.getDescripcion());
            dto.setIdMunicipio(entity.getMunicipios().getId());
            dto.setMunicipio(entity.getMunicipios().getMunicipio());
            dto.setFechaInicio(entity.getFechaInicio());
            dto.setFechaFinal(entity.getFechaFinal());           
            dto.setHotel(entity.getHotel().getNombre());
            dto.setIdHotel(entity.getHotel().getId());
            dto.setAtraccion(entity.getAtraccion().getNombre());
            dto.setIdAtraccion(entity.getAtraccion().getId());
            dto.setRestaurante(entity.getRestaurante().getNombre());
            dto.setIdRestaurante(entity.getRestaurante().getId());
            dto.setTransporte(entity.getTransporte().getNombre());
            dto.setIdTransporte(entity.getTransporte().getId());
            dto.setPrecioDia(entity.getPrecioDia());
            dto.setDescuento(entity.getDescuento());          
          
            return dto;


  }
  return null;

}
public void delete(Long id) {
    this.repository.deleteById(id);
    
}

public PaqueteTuristicoRequestDto update(PaqueteTuristicoRequestDto newdata){

    Optional<paqueteTuristicoEntity> optionalPaquete = this.repository.findById(newdata.getId());
    if (optionalPaquete.isPresent()) {
        paqueteTuristicoEntity entity = optionalPaquete.get();        
        
        entity.setNombre(newdata.getNombre());
        entity.setClase(newdata.getClase());
        entity.setDescripcion(newdata.getDescripcion());
        MunicipioEntity municipioEntity = new MunicipioEntity();
        municipioEntity.setId(newdata.getIdMunicipio());
        entity.setMunicipios(municipioEntity);
        entity.setFechaInicio(newdata.getFechaInicio());
        entity.setFechaFinal(newdata.getFechaFinal());
        HotelEntity hotelEntity = new HotelEntity();
        hotelEntity.setId(newdata.getIdHotel());
        entity.setHotel(hotelEntity);
        RestauranteEntity restauranteEntity = new RestauranteEntity();
        restauranteEntity.setId(newdata.getIdRestaurante());
        entity.setRestaurante(restauranteEntity);
        AtraccionEntity atraccionEntity = new AtraccionEntity();
        atraccionEntity.setId(newdata.getIdAtraccion());
        entity.setAtraccion(atraccionEntity);
        TransporteEntity transporteEntity = new TransporteEntity();
        transporteEntity.setId(newdata.getIdTransporte());
        entity.setTransporte(transporteEntity);
        entity.setPrecioDia(newdata.getPrecioDia());
        entity.setDescuento(newdata.getDescuento());      
       
        this.repository.save(entity);

        return newdata;
}

return null;


}

}
