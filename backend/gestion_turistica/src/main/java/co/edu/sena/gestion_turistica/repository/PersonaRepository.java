package co.edu.sena.gestion_turistica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import co.edu.sena.gestion_turistica.entity.PersonaEntity;

@Repository
public interface PersonaRepository extends
JpaRepository<PersonaEntity, Long>,
JpaSpecificationExecutor<PersonaEntity> {

    PersonaEntity findByIdentificacion(String identificacion);


}
