package co.edu.sena.gestion_turistica.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "atraccion_turistica")

public class AtraccionEntity {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "id")
     private long id;

     @Column(name ="nombre")
     private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_municipio", nullable = false, updatable = true)
    private MunicipioEntity municipios;

     @Column(name="celular")
     private String celular;

     @OneToMany(cascade = CascadeType.ALL, mappedBy = "Atraccion")
     private List<paqueteTuristicoEntity> PQTuristico;

     @Column(name = "precio")
     private Long precio;
   
   
   }
