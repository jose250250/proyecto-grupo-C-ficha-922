package co.edu.sena.gestion_turistica.dto;

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
   
    private String primerNombre;

    private String segundoNombre;

    private String primerApellido;

    private String segundoApellido;
   
    private String tipoIdentificacion;

    private String identificacion;  

    private Date fechaNacimiento;

    private String celular;

    private long idMunicipio;

    private String direccion;

    private String genero;

    private String correo;


}
