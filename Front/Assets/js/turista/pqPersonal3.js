var restid="";
var restNombre="";
$(function () {
  if (listarestaurantes === "") {
    obtenerlistarestaurante();
   
  }
  window.setTimeout(function () {
    var municipioid = reserva.idMunicipio;

    var filaActual = $("<div class='row'></div>"); // Crear la primera fila
    var tarjetaVacia = `
<div class="col-md-3 mb-4">
    <div class="serv-card p-3 text-center" id="restaurante-">
        <h5>No requiero Restaurante</h5>
        <button class="btn btn-primary btnResElegir" data-id="">Elegir</button>
    </div>
</div>
`;
    filaActual.append(tarjetaVacia);
    $("#lista-servicios").append(filaActual);
    for (var i = 0; i < listarestaurantes.length; i++) {
      var lisres = listarestaurantes[i];

      if (parseInt(municipioid) === parseInt(lisres.idMunicipio)) {
        var restauranteCard = `
            <div class="col-md-3 mb-4">
                <div class="serv-card p-3 text-center " id=restaurante-${lisres.id}>
               
                    <h5>${lisres.nombre}</h5>
                    <p>Precio: ${lisres.precio}</p>
                    <button class="btn btn-primary btnResElegir" data-id="${lisres.id}">Elegir</button>
                </div>
            </div>
            `;

        filaActual.append(restauranteCard); // Agregar el hotel a la fila actual

        // Cada 4 hoteles, crear una nueva fila
        if ((i + 1) % 4 === 0) {
          filaActual = $("<div class='row'></div>");
          $("#lista-servicios").append(filaActual);
        }
      }
    }
  }, 200);
});
$(document).on("click", ".btnResElegir", function () {
  restNombre = $(this).closest(".serv-card").find("h5").text();
  actualizarResumen("restaurante", restNombre);
  $(".serv-card").removeClass("elementoSel");
 restid = $(this).data("id");
  id = "restaurante-" + restid;
  console.log("idrest::" + id);
  $("#" + id).addClass("elementoSel");
  console.log("varREserva::", reserva);
});
$("#continuarpq3").click(function () {
  reserva.idRestaurante = restid;
  reserva.restaurante = restNombre;
  console.log("varREserva::", reserva);
  loadPage("paquetePersonal4", turPath);
});
$("#atras").click(function(){
  actualizarResumen("restaurante", "No Seleccionado");
  loadPage("paquetePersonal2",turPath);

})