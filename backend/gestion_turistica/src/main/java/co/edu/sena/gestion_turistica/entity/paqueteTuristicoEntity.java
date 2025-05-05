package co.edu.sena.gestion_turistica.entity;

import java.sql.Date;
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

@Data
@Entity
@Table(name = "paquete_turistico")
public class paqueteTuristicoEntity {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column( name = "nombre")
    private String nombre;

    @Column( name = "clase")
    private String clase;

    @Column( name = "descripcion")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_municipio", nullable = false, updatable = true)
    private MunicipioEntity municipios;

    @Column( name = "fecha_inicio")
    private Date fechaInicio;

    @Column( name = "fecha_final")
    private Date fechaFinal;

    @ManyToOne
    @JoinColumn(name = "id_hotel", nullable = false, updatable = true)
    private HotelEntity hotel;

    @ManyToOne
    @JoinColumn(name = "id_restaurante", nullable = false, updatable = true)
    private RestauranteEntity restaurante;

    @ManyToOne
    @JoinColumn(name = "id_atraccion_turistica", nullable = false, updatable = true)
    private AtraccionEntity Atraccion;

    @ManyToOne
    @JoinColumn(name = "id_transporte", nullable = false, updatable = true)
    private TransporteEntity transporte;

    @Column( name = "precio_dia")
    private Long precioDia;

    @Column( name = "descuento")
    private Long Descuento;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "paquete")
    private List<DetallePersonaPaqueteEntity> detPerPaquete;


}
