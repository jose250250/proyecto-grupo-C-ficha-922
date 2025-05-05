package co.edu.sena.gestion_turistica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import co.edu.sena.gestion_turistica.entity.DetallePersonaPaqueteEntity;

@Repository
public interface DetallePersonaPaqueteRepository extends
JpaRepository<DetallePersonaPaqueteEntity, Long>,
JpaSpecificationExecutor<DetallePersonaPaqueteEntity>
 {

}
