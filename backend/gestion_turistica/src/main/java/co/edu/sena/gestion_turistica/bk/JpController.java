package co.edu.sena.gestion_turistica.bk;


import org.springframework.web.bind.annotation.RestController;
import co.edu.sena.gestion_turistica.dto.PersonaDto;
import co.edu.sena.gestion_turistica.service.PersonaService;
import java.sql.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;





@RestController
@RequestMapping("/test-adso")


public class JpController {

@Autowired
private PersonaService service;



@GetMapping()
 public String holaMundoAdso(){

    
PersonaDto dto = new PersonaDto();
dto.setPrimerNombre("esta");
dto.setSegundoNombre("test");
dto.setPrimerApellido("persa");
dto.setSegundoApellido("marcos");
dto.setTipoIdentificacion("cc");
dto.setIdentificacion("1423443");
dto.setFechaNacimiento(new Date(0));
dto.setCelular("3233244");
dto.setIdMunicipio(323);
dto.setDireccion("calle 2 djj 34");
dto.setGenero("f");
dto.setCorreo("jose@dsms");

service.save(dto);



    return "Hasta luego gracias por asistir a la hgfg sesion editado en linea";

}



@GetMapping("/jp")
public String jose() {
    return new String("ya casi lo");
}


}
