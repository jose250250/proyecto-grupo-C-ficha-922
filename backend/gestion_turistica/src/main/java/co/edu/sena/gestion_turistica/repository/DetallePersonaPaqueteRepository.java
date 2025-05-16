package co.edu.sena.gestion_turistica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.sena.gestion_turistica.entity.DetallePersonaPaqueteEntity;

@Repository
public interface DetallePersonaPaqueteRepository extends
JpaRepository<DetallePersonaPaqueteEntity, Long>,
JpaSpecificationExecutor<DetallePersonaPaqueteEntity>
 {
List<DetallePersonaPaqueteEntity> findPaquetesByPersonaId(@Param("idPersona") Long idPersona);
}
