package co.edu.sena.gestion_turistica.entity;

import java.time.LocalDateTime;

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
@Table(name = "detalle_persona_paquete")
public class DetallePersonaPaqueteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; 

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false, updatable = true)
    private PersonaEntity persona; 

    @ManyToOne
    @JoinColumn(name = "id_paquete_turistico", nullable = false, updatable = true)
    private paqueteTuristicoEntity paquete; 

    @Column (name="estado")
    private String estado;

    @Column (name="registro")
    private LocalDateTime registro;

    @Column (name="motivo_registro")
    private String motivo;

    @Column (name= "url_vaucher")
    private String urlVaucher;

     @Column (name= "total_pago")
    private Long precioTotal;
   

}
