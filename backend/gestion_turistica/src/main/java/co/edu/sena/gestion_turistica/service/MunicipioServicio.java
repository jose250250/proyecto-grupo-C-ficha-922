package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.MunicipioDto;
import co.edu.sena.gestion_turistica.entity.MunicipioEntity;
import co.edu.sena.gestion_turistica.repository.MunicipioRepository;

@Service
public class MunicipioServicio {

    @Autowired
    private MunicipioRepository repository;

       public List<MunicipioDto> getAll(){

        List<MunicipioDto> dtos = new ArrayList<>();
        List<MunicipioEntity> entities = repository.findAll();

        for(MunicipioEntity entity : entities){

            MunicipioDto dto = new MunicipioDto();

            dto.setId(entity.getId());
            dto.setMunicipio(entity.getMunicipio());
            dto.setIdDepartamento(entity.getIdDepartamento());
            dto.setEstado(entity.getEstado());
            
         
           
      
            dtos.add(dto);


        

        }

        return dtos;
        
    }




}
