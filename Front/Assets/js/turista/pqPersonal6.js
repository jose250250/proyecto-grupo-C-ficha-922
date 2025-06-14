var hotelSel=[];
var restauranteSel=[];
var transporteSel=[];
var atraccionSel=[];
var paqueteresponse=[];
var precio = "";

$(function () {
  hotelSel = listahoteles.find(hotel => hotel.id === parseInt(reserva.idHotel));
  restauranteSel = listarestaurantes.find(rest => rest.id === parseInt(reserva.idRestaurante));
  transporteSel = listaTransportes.find(transp => transp.id === parseInt(reserva.idTransporte));
  atraccionSel = listaatracciones.find(atrac => atrac.id === parseInt(reserva.idAtraccion));

  $("#dateFechaInicio").val(reserva.fechaInicio);
  $("#dateFechaFinal").val(reserva.fechaFinal);
  $("#cantDias").val(reserva.CantDias);
  $("#txtMunicipio").val(reserva.municipio);

  // Validaciones seguras con operador &&
  $("#slcHotel").val((hotelSel && hotelSel.nombre) || "No Requiere");
  $("#slcRestaurante").val((restauranteSel && restauranteSel.nombre) || "No Requiere");
  $("#slcTransporte").val((transporteSel && transporteSel.nombre) || "No Requiere");
  $("#slcAtraccion").val((atraccionSel && atraccionSel.nombre) || "No Requiere");

  // Precios seguros con valor 0 si el objeto no existe
  precio = (hotelSel ? parseFloat(hotelSel.precio) : 0) 
             + (restauranteSel ? parseFloat(restauranteSel.precio) : 0) 
             + (transporteSel ? parseFloat(transporteSel.precio) : 0) 
             + (atraccionSel ? parseFloat(atraccionSel.precio) : 0);

  $("#precio").val(precio);
  $("#totalpaq").val(parseFloat(precio) * parseFloat(reserva.CantDias));

});


$("#frmDetallePaquete").submit(function (event) {
  console.log("Interceptado submit");
  event.preventDefault();
   var total = (parseFloat(precio) * parseFloat(reserva.CantDias));
   console.log("TOTAL:::"+ total);
   reserva.precioTotal = total;
   console.log("reserva:::"+ reserva);
    var paquete = {
      nombre: "mi paquete",
      clase: "PERSONALIZADO",
      descripcion: "Paquete creado por el usuario",
      idMunicipio: reserva.idMunicipio,
      fechaInicio: reserva.fechaInicio,
      fechaFinal: reserva.fechaFinal,
      idHotel: reserva.idHotel || null,
      idRestaurante: reserva.idRestaurante || null,
      idTransporte: reserva.idTransporte || null,
      idAtraccion: reserva.idAtraccion || null,
      precioDia: $("#precio").val(),
      descuento: "0"
    };
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(paquete)], { type: "application/json" }));

   const archivoInput = $("#foto")[0];
   if (archivoInput && archivoInput.files.length > 0) {
   formData.append("file", archivoInput.files[0]);
   } else {
  // Añade un archivo vacío (opcional)
   formData.append("file", new Blob([]), "");
   }


    // Opcional: mostrar datos enviados
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }
    console.log("paquete" + JSON.stringify(paquete));
    var method = "POST";
    var url = "http://localhost:8080/paquete";
      $.ajax({
      url: url,
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        addAlert(response.message, "success", 3);
        paqueteresponse= response.data;
        console.log("paqueteresponse:::",paqueteresponse);
    var urlp = "http://localhost:8080/dperpaquete";
     reservaProm = {
     idPersona: reserva.idPersona,
     idPaquete: paqueteresponse.id,
     estado: "pendiente",
     registro: new Date().toISOString(),
     motivo: "fecha de creacion por el usuario",
     precioTotal: reserva.precioTotal
     }

console.log("reservaprom" + JSON.stringify(reservaProm));
var formData = new FormData();
formData.append("dto", new Blob([JSON.stringify(reservaProm)], { type: "application/json" }));
var ifSuccessdetalle = function (apiResponse) {
  addAlert(apiResponse.message, "success", 3);
    console.log("dataapi:::" , apiResponse);
  localStorage.setItem("paqueteelegido", apiResponse.data.id);
  console.log("Paquetelegido:::" , apiResponse.data.id);
  loadPage("paquetePersonal7", turPath);
};

$.ajax({
  url: urlp,
  type: "POST",
  data: formData,
  processData: false,
  contentType: false,
  success: ifSuccessdetalle,
  error: ifError
});

      },
      error: function (err) {
        console.error("Error:", err);
        addAlert("error en el servidor", "danger", 8);
        
        closeLoader();
      }
    });
   
});
$("#atras6").click(function(){
  loadPage("paquetePersonal5",turPath);
})
