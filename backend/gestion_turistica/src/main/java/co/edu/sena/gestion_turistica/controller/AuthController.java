package co.edu.sena.gestion_turistica.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.gestion_turistica.dto.LoginRequestDto;
import co.edu.sena.gestion_turistica.dto.LoginResponseDto;
import co.edu.sena.gestion_turistica.dto.ServerResponseDataDto;
import co.edu.sena.gestion_turistica.service.UsuarioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

        @Autowired
    private UsuarioService service;

    @PostMapping()
    public ServerResponseDataDto login(@RequestBody LoginRequestDto request){

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        LoginResponseDto responseDto = this.service.login(request);

        return ServerResponseDataDto.builder()
                .message("Success")
                .data(responseDto)
                .status(200)
                .build();
    }
}
