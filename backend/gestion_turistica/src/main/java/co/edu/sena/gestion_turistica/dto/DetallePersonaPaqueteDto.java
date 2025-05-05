package co.edu.sena.gestion_turistica.dto;

import java.sql.Date;

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
    private long id; 

    private Long idPersona;

    private String persona;

    private Long idPaquete;

    private String paquete;

    private String estado;

    private Date registro;

    private String motivo;
   


}
