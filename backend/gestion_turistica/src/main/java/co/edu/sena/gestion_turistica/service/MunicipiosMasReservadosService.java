package co.edu.sena.gestion_turistica.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.sena.gestion_turistica.dto.MunicipiosMasReservadosDto;
import co.edu.sena.gestion_turistica.repository.DetallePersonaPaqueteRepository;

@Service

public class MunicipiosMasReservadosService {

   
    @Autowired
    private DetallePersonaPaqueteRepository repository;

 
      public List<MunicipiosMasReservadosDto> obtenerMunicipiosMasReservados(){
        List<Object[]> resultados = repository.findMunicipiosMasReservados();

        return resultados.stream()
        .map(r -> new MunicipiosMasReservadosDto(
             ((Number) r[0]).longValue(),   // idMunicipio (puede ser Integer o Long)
             (String) r[1],                 // nombreMunicipio
             (String) r[2],                 // nombreDepartamento
             ((Number) r[3]).longValue() 
        )).collect(Collectors.toList());
        
      }
      

}
