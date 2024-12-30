package co.edu.sena.gestion_turistica.controller;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;







@RestController
@RequestMapping("/test-adso")


public class JpController {



@GetMapping()
public String despedirAdso(){
    return "Hasta luego gracias por asistir a la hgfg sesion editado en linea";

}

@GetMapping("/jp")
public String jose() {
    return new String("ya casi lo");
}


}
