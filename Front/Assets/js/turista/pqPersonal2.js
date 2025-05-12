var hotelid="";
var hotelNombre="";
$(function(){
  if(listahoteles===""){
    obtenerlistahoteles();
    
  }
  window.setTimeout(function () {
    var municipioid = reserva.idMunicipio;
    var filaActual = $("<div class='row'></div>"); // Crear la primera fila
    var tarjetaVacia = `
    <div class="col-md-3 mb-4">
        <div class="serv-card p-3 text-center" id="hotel-">
            <h5>No requiero hotel</h5>
            <button class="btn btn-primary btnHotElegir" data-id ="">Elegir</button>
        </div>
    </div>
    `;
        filaActual.append(tarjetaVacia);
        $("#lista-servicios").append(filaActual);
    for (var i = 0; i < listahoteles.length; i++) {
        var lishot = listahoteles[i];
        if (parseInt(municipioid) === parseInt(lishot.idMunicipio)) {
            var hotelCard = `
            <div class="col-md-3 mb-4">
                <div class="serv-card p-3 text-center " id="hotel-${lishot.id}">
                <img src="${lishot.urlfoto}" alt="Imagen de ${lishot.nombre}">
                    <h5>${lishot.nombre}</h5>
                    <p>Precio: ${lishot.precio}</p>
                    <button class="btn btn-primary">Ver más</button>
                    <button class="btn btn-primary btnHotElegir" data-id="${lishot.id}">Elegir</button>
                </div>
            </div>
            `;

            filaActual.append(hotelCard); // Agregar el hotel a la fila actual

            // Cada 4 hoteles, crear una nueva fila
            if ((i + 1) % 4 === 0) {
                filaActual = $("<div class='row'></div>");
                $("#lista-servicios").append(filaActual);
            }
        }
    }
}, 200);
})
$(document).on("click", ".btnHotElegir", function () {
    hotelNombre = $(this).closest(".serv-card").find("h5").text();
    actualizarResumen("hotel", hotelNombre);
    $(".serv-card").removeClass("elementoSel");
    hotelid=$(this).data("id");
    id= "hotel-"+(hotelid);
    console.log("idhotel::"+id);
    $("#"+id).addClass("elementoSel");
    console.log("varREserva::",reserva);
  
  });
  $("#continuarpq2").click(function(){
    reserva.idHotel=hotelid;
    reserva.hotel=hotelNombre;
    console.log("varREserva::",reserva);
    loadPage("paquetePersonal3",turPath);

  })
  $("#atras").click(function(){
    actualizarResumen("hotel", "No Seleccionado");
    loadPage("paquetePersonal",turPath);

})
