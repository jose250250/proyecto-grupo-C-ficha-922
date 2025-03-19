package co.edu.sena.gestion_turistica.repository;





import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import co.edu.sena.gestion_turistica.entity.UsuarioEntity;



@Repository


public interface UsuarioRepository extends 
JpaRepository<UsuarioEntity, Long>, 
JpaSpecificationExecutor<UsuarioEntity>{

    Optional<UsuarioEntity>findByLoginAndPassword(String login, String password);
  
}
