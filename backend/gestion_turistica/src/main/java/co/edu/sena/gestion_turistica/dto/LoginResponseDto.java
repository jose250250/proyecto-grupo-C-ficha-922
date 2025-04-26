package co.edu.sena.gestion_turistica.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)

public class LoginResponseDto {

    private Long id;
    private String rol;
    private Long idrol;
    private long persona;
    private String PrimerNombre;
    private String PrimerApellido;  
    private boolean isActive;
}
