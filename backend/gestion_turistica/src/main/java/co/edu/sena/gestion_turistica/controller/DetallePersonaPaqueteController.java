package co.edu.sena.gestion_turistica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.gestion_turistica.dto.DetallePersonaPaqueteDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseAll;
import co.edu.sena.gestion_turistica.service.DetallePersonaPaqueteService;
import lombok.Builder;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/dperpaquete")
@Builder

public class DetallePersonaPaqueteController {

    @Autowired
    private DetallePersonaPaqueteService service;

    @PostMapping()
    public ServerResponseAll create(@RequestBody DetallePersonaPaqueteDto request){

    service.save(request);
    
    return ServerResponseAll.builder()
    .message("Registro exitoso")
    .status(HttpStatus.OK.value())
    .data(null)
    .build();

   }

   @GetMapping()
public ServerResponseAll ListAll(){

    List<DetallePersonaPaqueteDto> dtos = this.service.getAll();
    return ServerResponseAll.builder()
    .message("consulta exitosas")
    .status(HttpStatus.OK.value())
    .data(dtos)
    .build();
    
}
 public ServerResponseAll getById(Long id) {
      
    DetallePersonaPaqueteDto dto = this.service.getById(id);
    return ServerResponseAll.builder()
    .message(dto != null ? "Reistro encontrado" : "reistro  no encontrado")
    .status(dto != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value())
    .data(dto)
    .build();

}

}
