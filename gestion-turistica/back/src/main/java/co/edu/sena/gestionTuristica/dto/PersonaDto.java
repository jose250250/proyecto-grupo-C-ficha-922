package co.edu.sena.gestionTuristica.dto;

import java.sql.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class PersonaDto {

    private Long id;

    private String nombre;

    private String primerNombre;

    private String segundoNombre;

    private String primerApellido;

    private String segundoApellido;

    private Date fechaNacimiento;

    private String tipoIdentificacion;

    private String identificacion;

    private String genero;

    private String celular;

    private long idMunicipio;

    private String direccion;

    private String correo;

}
