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
public class PaqueteTuristicoRequestDto {

    private Long id;

    private String nombre;

    private String clase;

    private String descripcion;

    private Long idMunicipio;

    private String municipio;

    private Date fechaInicio;

    private Date fechaFinal;

    private Long idHotel;

    private Long idRestaurante;

    private Long idAtraccion;

    private Long idTransporte;

    private Long precioDia;

    private Long Descuento;


}
