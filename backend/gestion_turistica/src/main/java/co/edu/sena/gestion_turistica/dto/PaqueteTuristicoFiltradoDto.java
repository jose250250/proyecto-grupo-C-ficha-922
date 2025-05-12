package co.edu.sena.gestion_turistica.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaqueteTuristicoFiltradoDto<T> {


    private int status;
    private String message;
    private T data;
}

