package co.edu.sena.gestion_turistica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.sena.gestion_turistica.entity.DetallePersonaPaqueteEntity;

@Repository
public interface DetallePersonaPaqueteRepository extends
JpaRepository<DetallePersonaPaqueteEntity, Long>,
JpaSpecificationExecutor<DetallePersonaPaqueteEntity>
 {
List<DetallePersonaPaqueteEntity> findPaquetesByPersonaId(@Param("idPersona") Long idPersona);

@Query(value = "SELECT m.id AS idMunicipio, m.municipio AS nombre, dpto.departamento AS departamento, COUNT(dpp.id) AS totalReservas " +
               "FROM detalle_persona_paquete dpp " +
               "JOIN paquete_turistico p ON dpp.id_paquete_turistico = p.id " +
               "JOIN municipio m ON p.id_municipio = m.id " +
               "JOIN departamento dpto ON m.id_departamento = dpto.id " +
               "GROUP BY m.id, m.municipio, dpto.departamento " +
               "ORDER BY totalReservas DESC", nativeQuery = true)
List<Object[]> findMunicipiosMasReservados();
}
