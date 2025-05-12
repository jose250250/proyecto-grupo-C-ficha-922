package co.edu.sena.gestion_turistica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import co.edu.sena.gestion_turistica.entity.paqueteTuristicoEntity;


@Repository
public interface PaqueteTuristicoRepository extends
JpaRepository<paqueteTuristicoEntity, Long>, 
JpaSpecificationExecutor<paqueteTuristicoEntity>{

    List<paqueteTuristicoEntity> findByClaseNot(String clase);

}
