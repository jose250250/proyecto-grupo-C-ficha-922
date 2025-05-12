var trasid="";
var transporteNombre="";
$(function () {
  if (listaTransportes === "") {
    obtenerlistatransportes();
   
  }
  window.setTimeout(function () {
    var municipioid = reserva.idMunicipio;

    var filaActual = $("<div class='row'></div>"); // Crear la primera fila
    var tarjetaVacia = `
<div class="col-md-3 mb-4">
    <div class="serv-card p-3 text-center" id="transporte-">
        <h5>No requiero transporte</h5>
        <button class="btn btn-primary btnTransElegir" data-id="">Elegir</button>
    </div>
</div>
`;
    filaActual.append(tarjetaVacia);
    $("#lista-servicios").append(filaActual);
    for (var i = 0; i < listaTransportes.length; i++) {
      var listra = listaTransportes[i];

      if (parseInt(municipioid) === parseInt(listra.idMunicipio)) {
        var transporteCard = `
            <div class="col-md-3 mb-4">
                <div class="serv-card p-3 text-center " id=transporte-${listra.id}>
               
                    <h5>${listra.nombre}</h5>
                    <p>Precio: ${listra.precio}</p>
                    <button class="btn btn-primary">Ver más</button>
                    <button class="btn btn-primary btnTransElegir" data-id="${listra.id}">Elegir</button>
                </div>
            </div>
            `;

        filaActual.append(transporteCard); // Agregar el hotel a la fila actual

        // Cada 4 hoteles, crear una nueva fila
        if ((i + 1) % 4 === 0) {
          filaActual = $("<div class='row'></div>");
          $("#lista-servicios").append(filaActual);
        }
      }
    }
  }, 200);
});
$(document).on("click", ".btnTransElegir", function () {
  transporteNombre = $(this).closest(".serv-card").find("h5").text();
  actualizarResumen("transporte", transporteNombre);
  $(".serv-card").removeClass("elementoSel");
 trasid = $(this).data("id");
  id = "transporte-" + trasid;
  console.log("idtrasp::" + id);
  $("#" + id).addClass("elementoSel");
  console.log("varREserva::", reserva);
});
$("#continuarpq4").click(function () {
  reserva.idTransporte = trasid;
  reserva.transporte = transporteNombre;
  console.log("varREserva::", reserva);
  loadPage("paquetePersonal5", turPath);
});
$("#atras").click(function(){
  actualizarResumen("transporte", "No Seleccionado");
  loadPage("paquetePersonal3",turPath);

})
