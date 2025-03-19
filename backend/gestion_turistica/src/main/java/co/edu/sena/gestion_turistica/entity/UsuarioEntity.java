package co.edu.sena.gestion_turistica.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name = "usuario")


public class UsuarioEntity {
      @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "id")
     private long Id;

     @Column(name ="password")
     private String password;

     @Column(name="login") 
     private String login;

     @Column(name = "id_rol")
     private Long idRol;

     @Column(name = "id_persona")
     private Long idPersona;




}
