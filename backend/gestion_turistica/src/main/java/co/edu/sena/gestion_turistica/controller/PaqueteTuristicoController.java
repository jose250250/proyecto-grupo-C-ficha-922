package co.edu.sena.gestion_turistica.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.http.MediaType;

import co.edu.sena.gestion_turistica.dto.PaqueteResponseIDdto;
import co.edu.sena.gestion_turistica.dto.PaqueteTuristicoRequestDto;
import co.edu.sena.gestion_turistica.dto.PaqueteTuristicoResponseDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseAll;
import co.edu.sena.gestion_turistica.dto.ServerResponseDataDto;
import co.edu.sena.gestion_turistica.service.PaqueteTuristicoService;
import lombok.Builder;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/paquete")
@Builder

public class PaqueteTuristicoController {

    @Autowired
    private PaqueteTuristicoService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ServerResponseAll create(
            @RequestPart("dto") PaqueteTuristicoRequestDto dto,
            @RequestPart(value = "file", required = false) MultipartFile foto) {

        PaqueteResponseIDdto guardado = service.save(dto, foto);

        return ServerResponseAll.builder()
                .message("Registro exitoso")
                .status(HttpStatus.OK.value())
                .data(guardado)
                .build();
    }


    @GetMapping()
      public ServerResponseDataDto getAll(){
        return ServerResponseDataDto.builder()
                .status(200)
                .message("Consulta exitosa!")
                .data(this.service.getAll())
                .build();
    }

    @GetMapping("/filtrados")
    public ServerResponseDataDto paquetesFiltrados(){
      return ServerResponseDataDto.builder()
              .status(200)
              .message("Consulta exitosa!")
              .data(this.service.paquetesFiltrados())
              .build();
  }

  
  


    @GetMapping("/{id}")
public ServerResponseAll getById(@PathVariable("id") Long id){

    PaqueteTuristicoResponseDto dto = this.service.getById(id);
    return ServerResponseAll.builder()
    .message(dto != null ? "Registro encontrado" : "registro  no encontrado")
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
 
@PutMapping("/{id}")
public ServerResponseAll update(
        @PathVariable Long id,
        @RequestPart("dto") PaqueteTuristicoRequestDto dto,
        @RequestPart(value = "file", required = false) MultipartFile foto) {
    
    // Asegurar que el ID del path se asigna al DTO
    dto.setId(id);

    PaqueteTuristicoRequestDto actualizado = service.update(foto, dto);

    if (actualizado != null) {
        return ServerResponseAll.builder()
                .message("Paquete actualizado con éxito")
                .status(HttpStatus.OK.value())
                .data(actualizado)
                .build();
    } else {
        return ServerResponseAll.builder()
                .message("No se encontró el paquete con ID " + id)
                .status(HttpStatus.NOT_FOUND.value())
                .data(null)
                .build();
    }
}

}
