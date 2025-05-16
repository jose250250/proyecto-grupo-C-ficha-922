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
@Table(name = "municipio")

public class MunicipioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;    
 
    @Column( name= "municipio")
    private String municipio;

    @Column( name= "id_departamento")
    private String idDepartamento;   

    @Column( name= "estado")
    private Long estado; 

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "municipio")
    private List<MunicipioEntity> municipios;

  

}
