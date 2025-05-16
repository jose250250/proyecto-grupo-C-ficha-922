package co.edu.sena.gestion_turistica.dto;

import java.time.LocalDateTime;

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

public class DetallePersonaPaqueteDto {
    private Long id; 

    private Long idPersona;

    private String persona;

    private String identificacion;

    private Long idPaquete;

    private String paquete;

    private String estado;

    private LocalDateTime registro;

    private String motivo;

    public DetallePersonaPaqueteDto(Long id, String motivo) {
        this.id = id;
        this.motivo = motivo;
    }
   


}
