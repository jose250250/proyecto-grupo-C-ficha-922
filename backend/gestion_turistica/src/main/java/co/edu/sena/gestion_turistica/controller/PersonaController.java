package co.edu.sena.gestion_turistica.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.gestion_turistica.dto.CustomResponseDto;
import co.edu.sena.gestion_turistica.dto.PersonaDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseDataDto;
import co.edu.sena.gestion_turistica.entity.PersonaEntity;
import co.edu.sena.gestion_turistica.service.PersonaService;
import lombok.Builder;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/persona")
@Builder

public class PersonaController {    

@Autowired
private PersonaService service;

@PostMapping()
public ServerResponseDataDto create(@RequestBody PersonaDto request){

    service.save(request);
    
    return ServerResponseDataDto.builder()
    .message("Registro exitoso")
    .status(HttpStatus.OK.value())
    .data(null)
    .build();
    


}

@GetMapping()
public ServerResponseDataDto ListAll(){

    List<PersonaDto> dtos = this.service.getAll();
    
    return ServerResponseDataDto.builder()
    .message("consulta exitosa")
    .status(HttpStatus.OK.value())
    .data(dtos)
    .build();
}

@GetMapping("/{id}")
public ServerResponseDataDto getById(@PathVariable("id") Long id){

    PersonaDto dto = this.service.getById(id);
    return ServerResponseDataDto.builder()
    .message(dto != null ? "Registro encontrado" : "registro  no encontrado")
    .status(dto != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value())
    .data(dto)
    .build();


}
@DeleteMapping("/{id}")
public ServerResponseDataDto deleteById(@PathVariable("id") Long id){
    this.service.delete(id);
    return ServerResponseDataDto
    .builder()
    .message("reistro  eliminado")
    .status(HttpStatus.OK.value())   
    .build();
   

}
@PutMapping("/{id}")


public ServerResponseDataDto update(@PathVariable("id") Long id, @RequestBody PersonaDto request) {
request.setId(id);
request = this.service.update(request);

return ServerResponseDataDto
.builder()
.message(request != null ? "Reistro actualizado" : "reistro  no actualizado")
.status(request != null ? HttpStatus.OK.value() : HttpStatus.BAD_REQUEST.value())
.data(request)
.build();

}


@GetMapping("/buscar/{identificacion}")
public CustomResponseDto obtenerPersonaPorCedula(@PathVariable String identificacion) {
    PersonaEntity persona = service.buscarPersonaPorCedula(identificacion);

    return new CustomResponseDto(
        persona,
        persona != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value(),
        persona != null ? "Persona encontrada" : "Persona no encontrada"
    );
}

}