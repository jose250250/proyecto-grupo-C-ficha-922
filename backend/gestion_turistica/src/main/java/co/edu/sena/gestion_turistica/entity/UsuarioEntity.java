package co.edu.sena.gestion_turistica.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name = "usuario")


public class UsuarioEntity {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "id")
     private long id;

     @Column(name ="password")
     private String password;

     @Column(name="login") 
     private String login;

     @ManyToOne
     @JoinColumn(name = "id_persona", nullable = false, updatable = true)
     private PersonaEntity persona;   
    
    @ManyToOne
    @JoinColumn(name = "id_rol", nullable = false, updatable = true)
    private RolEntity rol;



}
