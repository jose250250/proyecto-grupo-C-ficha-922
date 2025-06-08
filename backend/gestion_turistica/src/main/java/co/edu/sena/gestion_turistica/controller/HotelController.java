package co.edu.sena.gestion_turistica.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import co.edu.sena.gestion_turistica.dto.HotelDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseAll;
import co.edu.sena.gestion_turistica.service.HotelService;
import lombok.Builder;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/hotel")
@Builder

public class HotelController {
        @Autowired
        private HotelService service;

 @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ServerResponseAll createHotel(
    @RequestParam("foto") MultipartFile foto,
    @RequestParam("nombre") String nombre,
    @RequestParam("idMunicipio") Long idMunicipio,
    @RequestParam("celular") String celular,
    @RequestParam("direccion") String direccion,
    @RequestParam("precio") Double precio
) {
    HotelDto dto = service.save(foto, nombre, idMunicipio, celular, direccion, precio);

    return ServerResponseAll.builder()
        .message("Registro exitoso")
        .status(HttpStatus.OK.value())
        .data(dto)
        .build();
}


@GetMapping()
public ServerResponseAll ListAll(){

    List<HotelDto> dtos = this.service.getAll();

   
       
    return ServerResponseAll.builder()
    .message("consulta exitosas")
    .status(HttpStatus.OK.value())
    .data(dtos)
    .build();
    
}

@GetMapping("/{id}")
public ServerResponseAll getById(@PathVariable("id") Long id){

    HotelDto dto = this.service.getById(id);
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

@PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ServerResponseAll updateHotel(
        @PathVariable Long id,
        @RequestParam String nombre,
        @RequestParam Long idMunicipio,
        @RequestParam String celular,
        @RequestParam String direccion,
        @RequestParam Double precio,
        @RequestParam(required = false) MultipartFile foto
) throws IOException {

    HotelDto dto = new HotelDto();
    dto.setId(id);
    dto.setNombre(nombre);
    dto.setIdMunicipio(idMunicipio);
    dto.setCelular(celular);
    dto.setDireccion(direccion);
    dto.setPrecio(precio);

    HotelDto result = service.update(dto, foto);

    return ServerResponseAll.builder()
            .message("Hotel actualizado correctamente")
            .status(HttpStatus.OK.value())
            .data(result)
            .build();
}




}
