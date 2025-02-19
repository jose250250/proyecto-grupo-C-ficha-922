
package co.edu.sena.gestion_turistica.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.gestion_turistica.dto.TransporteDto;
import co.edu.sena.gestion_turistica.entity.TransporteEntity;
import co.edu.sena.gestion_turistica.repository.TransporteRepository;

@Service
public class TransporteService {

    @Autowired
    private TransporteRepository repository;

    public void save(TransporteDto dto){
        TransporteEntity entity = new TransporteEntity();
        entity.setNombre(dto.getNombre());
        entity.setIdMunicipio(dto.getIdMunicipio());
        entity.setCelular(dto.getCelular());

        repository.save(entity);

    }

    public List<TransporteDto> getAll(){
        List<TransporteDto> dtos = new ArrayList<>();
        List<TransporteEntity> entities = repository.findAll();

        for(TransporteEntity entity : entities){
           TransporteDto dto = new TransporteDto();
            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
            dto.setIdMunicipio(entity.getIdMunicipio());
            dto.setCelular(entity.getCelular());

            dtos.add(dto);

        }
         
    return dtos;
    }
    

    




}
