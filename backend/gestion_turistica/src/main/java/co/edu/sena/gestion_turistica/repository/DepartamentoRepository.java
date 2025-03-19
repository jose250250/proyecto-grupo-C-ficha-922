package co.edu.sena.gestion_turistica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import co.edu.sena.gestion_turistica.entity.DepartamentoEntity;

public interface DepartamentoRepository extends
JpaRepository<DepartamentoEntity, Long>, 
JpaSpecificationExecutor<DepartamentoEntity> 
{

}
