package co.edu.sena.gestion_turistica.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import co.edu.sena.gestion_turistica.dto.RestauranteDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseAll;
import co.edu.sena.gestion_turistica.service.RestauranteService;
import lombok.Builder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/restaurante")
@Builder

public class RestauranteController {

    @Autowired
    private RestauranteService service;

    @PostMapping()
    public ServerResponseAll create(@RequestBody RestauranteDto request){

    service.save(request);
    
    return ServerResponseAll.builder()
    .message("Registro exitoso")
    .status(HttpStatus.OK.value())
    .data(null)
    .build();

   }

@GetMapping()
public ServerResponseAll ListAll(){

    List<RestauranteDto> dtos = this.service.getAll();

   
       
    return ServerResponseAll.builder()
    .message("consulta exitosas")
    .status(HttpStatus.OK.value())
    .data(dtos)
    .build();
    
}

@GetMapping("/{id}")
public ServerResponseAll getById(@PathVariable("id") Long id){

    RestauranteDto dto = this.service.getById(id);
    return ServerResponseAll.builder()
    .message(dto != null ? "Reistro encontrado" : "reistro  no encontrado")
    .status(dto != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value())
    .data(dto)
    .build();

}


}