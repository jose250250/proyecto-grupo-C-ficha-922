package co.edu.sena.gestion_turistica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

   @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ServerResponseAll create(
    @RequestPart("dto") DetallePersonaPaqueteDto request,
    @RequestPart(value = "file", required = false) MultipartFile file
) {
    DetallePersonaPaqueteDto guardado = service.save(file, request);

    return ServerResponseAll.builder()
        .message("Registro exitoso")
        .status(HttpStatus.OK.value())
        .data(guardado)
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
  @GetMapping("/detalle/{idPersona}")
  public ServerResponseAll findPaquetesByPersonaId(@PathVariable("idPersona") Long idPersona){
     return ServerResponseAll.builder()
     .status(200)
     .message("historial de paquetes")
     .data(service.historicoPaquetes(idPersona))
     .build();
  }

   @GetMapping("/{id}")
public ServerResponseAll getById(@PathVariable("id") Long id){
      
    DetallePersonaPaqueteDto dto = this.service.getById(id);
    return ServerResponseAll.builder()
    .message(dto != null ? "Registro encontrado" : "Registro  no encontrado")
    .status(dto != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value())
    .data(dto)
    .build();

}
@DeleteMapping("/{id}")

public ServerResponseAll deleteById(@PathVariable("id") Long id){
    this.service.delete(id);
    return ServerResponseAll
    .builder()    
    .message("registro  eliminado")
    .status(HttpStatus.OK.value())   
    .build();

}
@PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ServerResponseAll update(
        @PathVariable("id") Long id,
        @RequestPart("dto") DetallePersonaPaqueteDto dto,
        @RequestPart(value = "file", required = false) MultipartFile file) {

    DetallePersonaPaqueteDto updated = this.service.update(id, dto, file); // Correcta llamada al service

    return ServerResponseAll.builder()
            .message(updated != null ? "Registro actualizado" : "Registro no actualizado")
            .status(updated != null ? HttpStatus.OK.value() : HttpStatus.BAD_REQUEST.value())
            .data(updated)
            .build();
}

}
