package co.edu.sena.gestion_turistica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.gestion_turistica.dto.MunicipiosMasReservadosDto;
import co.edu.sena.gestion_turistica.service.MunicipiosMasReservadosService;
import lombok.Builder;

@CrossOrigin(origins = "*")
@RestController
@Builder
@RequestMapping("/MasReservados")

public class MunicipiosMasReservadosController {

    @Autowired
    private MunicipiosMasReservadosService service;

@GetMapping()
    public ResponseEntity<List<MunicipiosMasReservadosDto>> getMunicipiosMasReservados() {
        List<MunicipiosMasReservadosDto> municipios = service.obtenerMunicipiosMasReservados();
        return ResponseEntity.ok(municipios);
    }

}
