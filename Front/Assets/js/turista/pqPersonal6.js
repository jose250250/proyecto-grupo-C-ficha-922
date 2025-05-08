var hotelSel=[];
var restauranteSel=[];
var transporteSel=[];
var atraccionSel=[];
var paqueteresponse=[];

$(function () {
  hotelSel = listahoteles.find(hotel => hotel.id === parseInt(reserva.idHotel));
  restauranteSel = listarestaurantes.find(rest => rest.id === parseInt(reserva.idRestaurante));
  transporteSel = listaTransportes.find(transp => transp.id === parseInt(reserva.idTransporte));
  atraccionSel = listaatracciones.find(atrac => atrac.id === parseInt(reserva.idAtraccion));
  $("#dateFechaInicio").val(reserva.fechaInicio);
  $("#dateFechaFinal").val(reserva.fechaFinal);
  $("#cantDias").val(reserva.CantDias);
  $("#txtMunicipio").val(reserva.municipio);
  $("#slcHotel").val(hotelSel.nombre);
  $("#slcRestaurante").val(restauranteSel.nombre);
  $("#slcTransporte").val(transporteSel.nombre);
  $("#slcAtraccion").val(atraccionSel.nombre);
  var precio = (parseFloat(hotelSel.precio) || 0) 
  + (parseFloat(restauranteSel.precio) || 0) 
  + (parseFloat(transporteSel.precio) || 0) 
  + (parseFloat(atraccionSel.precio) || 0);
  $("#precio").val(precio*Number(reserva.CantDias));

$("#frmDetallePaquete").submit(function (event) {
  console.log("Interceptado submit");
  event.preventDefault();
    var paquete = {
      nombre: "mi paquete",
      clase: "PERSONALIZADO",
      descripcion: "Paquete creado por el usuario",
      idMunicipio: reserva.idMunicipio,
      fechaInicio: reserva.fechaInicio,
      fechaFinal: reserva.fechaFinal,
      idHotel: reserva.idHotel || "",
      idRestaurante: reserva.idRestaurante || "",
      idTransporte: reserva.idTransporte || "",
      idAtraccion: reserva.idAtraccion || "",
      precioDia: $("#precio").val(),
      descuento: "0"
    };
    console.log("paquete" + JSON.stringify(paquete));
    var method = "POST";
    var url = "http://localhost:8080/paquete";
   
    var request = paquete;
    var ifSuccess = function (apiResponse) {
      paqueteresponse=apiResponse.data;
      var urlp = "http://localhost:8080/dperpaquete"
      var detallepaquete= {
        idPersona: reserva.idPersona,
        idPaquete: paqueteresponse.id,
        estado: "pendiente",
        registro: new Date().toISOString(),
        motivo: "fecha de creacion por el usuario"       
      }
      var requestp = detallepaquete;
      console.log("dpper" + JSON.stringify(detallepaquete));
      var ifSuccessdetalle = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        alert("registro exitoso");
        loadPage("paquetePersonal7",turPath);
      }
      closeLoader();
      callApi(urlp, "POST", requestp, ifSuccessdetalle, ifError);
    };
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});
$("#atras6").click(function(){
  loadPage("paquetePersonal5",turPath);
})
});