package co.edu.sena.gestion_turistica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.gestion_turistica.dto.ServerResponseAll;
import co.edu.sena.gestion_turistica.dto.UsuarioDto;
import co.edu.sena.gestion_turistica.service.UsuarioService;
import lombok.Data;

@RestController
@Data
@RequestMapping("/usuario")

public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping()
public ServerResponseAll create(@RequestBody UsuarioDto request){
    service.save(request);

     return ServerResponseAll.builder()
    .message("Registro exitoso")
    .status(HttpStatus.OK.value())
    .data(null)
    .build();
}

@GetMapping()

public ServerResponseAll ListAll(){
    List<UsuarioDto> dtos = this.service.getAll();

       
    return ServerResponseAll.builder()
    .message("consulta exitosas")
    .status(HttpStatus.OK.value())
    .data(dtos)
    .build();
    
}

@GetMapping("/{id}")
public ServerResponseAll getById(@PathVariable("id") Long id){

    UsuarioDto dto = this.service.getById(id);
    return ServerResponseAll.builder()
    .message(dto != null ? "Reistro encontrado" : "reistro  no encontrado")
    .status(dto != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value())
    .data(dto)
    .build();

}


@DeleteMapping("{id}")

public ServerResponseAll deleteById(@PathVariable("id") Long id){
    this.service.delete(id);
    return ServerResponseAll
    .builder()    
    .message("reistro  eliminado")
    .status(HttpStatus.OK.value())   
    .build();

}

@PutMapping("/{id}")


public ServerResponseAll update(@PathVariable("id") Long id, @RequestBody UsuarioDto request) {
request.setId(id);
request = this.service.update(request);

return ServerResponseAll
.builder()
.message(request != null ? "Reistro actualizado" : "reistro  no actualizado")
.status(request != null ? HttpStatus.OK.value() : HttpStatus.BAD_REQUEST.value())
.data(request)
.build();

}




}
