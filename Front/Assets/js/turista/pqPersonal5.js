var atrid="";
var atraccionNombre="";
$(function () {
  if (listaatracciones === "") {
    obtenerlistaatracciones();
   
  }
  window.setTimeout(function () {
    var municipioid = reserva.idMunicipio;

    var filaActual = $("<div class='row'></div>"); // Crear la primera fila
    var tarjetaVacia = `
<div class="col-md-3 mb-4">
    <div class="serv-card p-3 text-center" id="atraccion-">
        <h5>No requiero Atracciones</h5>
        <button class="btn btn-primary btnElegir" data-id="">Seleccionar</button>
    </div>
</div>
`;
    filaActual.append(tarjetaVacia);
    $("#lista-servicios").append(filaActual);
    for (var i = 0; i < listaatracciones.length; i++) {
      var lisatra = listaatracciones[i];

      if (parseInt(municipioid) === parseInt(lisatra.idMunicipio)) {
        var atraccionCard = `
            <div class="col-md-3 mb-4">
                <div class="serv-card p-3 text-center " id=atraccion-${lisatra.id}>
               
                    <h5>${lisatra.nombre}</h5>
                    <p>Precio: ${lisatra.precio}</p>
                    <button class="btn btn-primary">Ver más</button>
                    <button class="btn btn-primary btnElegir" data-id="${lisatra.id}">Elegir</button>
                </div>
            </div>
            `;

        filaActual.append(atraccionCard); // Agregar el hotel a la fila actual

        // Cada 4 hoteles, crear una nueva fila
        if ((i + 1) % 4 === 0) {
          filaActual = $("<div class='row'></div>");
          $("#lista-servicios").append(filaActual);
        }
      }
    }
  }, 200);
});
$(document).on("click", ".btnElegir", function () {
  atraccionNombre = $(this).closest(".serv-card").find("h5").text();
  actualizarResumen("atraccion", atraccionNombre);
  $(".serv-card").removeClass("elementoSel");
 atrid = $(this).data("id");
  id = "atraccion-" + atrid;
  console.log("idatra::" + id);
  $("#" + id).addClass("elementoSel");
  console.log("varREserva::", reserva);
});
$("#continuarpq5").click(function () {
  reserva.idAtraccion = atrid;
  reserva.atraccion = atraccionNombre;
  console.log("varREserva::", reserva);
  loadPage("paquetePersonal6", turPath);
  $("#resumen-seleccion").hide(1500);
});
$("#atras").click(function(){
  actualizarResumen("atraccion", "No Seleccionado");
  loadPage("paquetePersonal4",turPath);
 

})
