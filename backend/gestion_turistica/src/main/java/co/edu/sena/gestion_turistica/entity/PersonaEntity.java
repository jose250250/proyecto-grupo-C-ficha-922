package co.edu.sena.gestion_turistica.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "persona")
public class PersonaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long Id;
    
  
    @Column(name = "primer_nombre")
    private String primerNombre;

    @Column(name = "segundo_nombre")
    private String segundoNombre;

    @Column(name = "primer_apellido")
    private String primerApellido;

    @Column(name = "segundo_apellido")
    private String segundoApellido;   

    @Column(name = "tipo_identificacion")
    private String tipoIdentificacion;

    @Column(name = "identificacion")
    private String identificacion;

    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    @Column(name = "genero")
    private String genero;

    @Column(name = "celular")
    private String celular;

    @Column (name = "id_municipio")
    private long idMunicipio;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "correo")
    private String correo;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "persona")
    private List<UsuarioEntity> usuario;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "persona")
    private List<DetallePersonaPaqueteEntity> detPerPaquete;
    








    
    


   

}




