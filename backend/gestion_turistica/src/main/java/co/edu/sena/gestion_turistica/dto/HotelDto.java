package co.edu.sena.gestion_turistica.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(Include.NON_NULL)

public class HotelDto {

    
    private Long Id;

    private String nombre;

    private long idMunicipio;

    private String municipio;

    private String celular;

    private String direccion;

    private Long precio;


}
