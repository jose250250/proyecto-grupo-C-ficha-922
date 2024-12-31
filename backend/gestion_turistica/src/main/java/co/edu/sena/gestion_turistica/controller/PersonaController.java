package co.edu.sena.gestion_turistica.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.gestion_turistica.dto.PersonaDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseDataDto;
import co.edu.sena.gestion_turistica.service.PersonaService;
import lombok.Builder;

@RestController
@RequestMapping("/persona")
@Builder

public class PersonaController {    

@Autowired

private PersonaService service;
@PostMapping()
public ServerResponseDataDto create(@RequestBody PersonaDto request){

    return ServerResponseDataDto.builder()
    .message("Registro exitoso")
    .status(HttpStatus.OK.value())
    .data(null)
    .build();
    


}

}
