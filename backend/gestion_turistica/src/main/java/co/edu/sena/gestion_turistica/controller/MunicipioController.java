package co.edu.sena.gestion_turistica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.gestion_turistica.dto.MunicipioDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseAll;
import co.edu.sena.gestion_turistica.service.MunicipioServicio;
import lombok.Builder;
import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin(origins = "*")
@RestController
@Builder
@RequestMapping("/municipio")
public class MunicipioController {

    @Autowired
    private MunicipioServicio service;

    @GetMapping()
public ServerResponseAll ListAll(){

    List<MunicipioDto> dtos = this.service.getAll();

   
       
    return ServerResponseAll.builder()
    .message("consulta exitosas")
    .status(HttpStatus.OK.value())
    .data(dtos)
    .build();
    
}
@GetMapping("/{id}")
public ServerResponseAll getById(@PathVariable("id") Long id){

    MunicipioDto dto = this.service.getById(id);
    return ServerResponseAll.builder()
    .message(dto != null ? "Registro encontrado" : "registro  no encontrado")
    .status(dto != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value())
    .data(dto)
    .build();

}


}
