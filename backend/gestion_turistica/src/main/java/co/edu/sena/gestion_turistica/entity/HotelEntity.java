package co.edu.sena.gestion_turistica.entity;

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
@Table(name = "hotel")

public class HotelEntity {

   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long Id;    

    @Column( name= "nombre")
    private String nombre;

    @Column(name = "id_municipio")
    private long idMunicipio;

    @Column(name= "celular")
    private String celular;

    @Column(name = "direccion")
    private String direccion;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "hotel")
    private List<paqueteTuristicoEntity> PQTuristico;
   
    @Column(name = "precio")
    private Long precio;


}
