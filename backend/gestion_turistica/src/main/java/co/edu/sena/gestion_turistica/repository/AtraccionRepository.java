package co.edu.sena.gestion_turistica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import co.edu.sena.gestion_turistica.entity.AtraccionEntity;

@Repository
public interface AtraccionRepository extends
JpaRepository<AtraccionEntity, Long>, 
JpaSpecificationExecutor<AtraccionEntity> {

}
