package co.edu.sena.gestion_turistica.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

     @PostMapping()
    public ServerResponseAll create(@RequestBody PaqueteTuristicoRequestDto request){

    service.save(request);
    
    return ServerResponseAll.builder()
    .message("Registro exitoso")
    .status(HttpStatus.OK.value())
    .data(null)
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

    @GetMapping("/{id}")
public ServerResponseAll getById(@PathVariable("id") Long id){

    PaqueteTuristicoResponseDto dto = this.service.getById(id);
    return ServerResponseAll.builder()
    .message(dto != null ? "Reistro encontrado" : "reistro  no encontrado")
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


public ServerResponseAll update(@PathVariable("id") Long id, @RequestBody PaqueteTuristicoRequestDto request) {
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
