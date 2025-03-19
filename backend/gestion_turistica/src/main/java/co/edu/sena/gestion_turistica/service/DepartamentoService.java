package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.DepartamentoDto;
import co.edu.sena.gestion_turistica.entity.DepartamentoEntity;
import co.edu.sena.gestion_turistica.repository.DepartamentoRepository;

@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository repository;

    public List<DepartamentoDto> getAll(){

        List<DepartamentoDto> dtos = new ArrayList<>();
        List<DepartamentoEntity> entities = repository.findAll();

        for(DepartamentoEntity entity : entities){

            DepartamentoDto dto = new DepartamentoDto();

            dto.setId(entity.getId());
            dto.setDepartamento(entity.getDepartamento());
         
           
      
            dtos.add(dto);


        

        }

        return dtos;
        
    }




}
