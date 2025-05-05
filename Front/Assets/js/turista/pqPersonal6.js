var hotelSel=[];
var restauranteSel=[];
var transporteSel=[];
var atraccionSel=[];

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
});
$("#atras6").click(function(){
  loadPage("paquetePersonal5",turPath);
})

$("#frmPaquete").submit(function (event) {
  event.preventDefault();
  var cantidadErrores = 0;
  $("#frmPaquete input, #frmPaquete select").each(function (i) {
    if ($(this).val() === "") {
      cantidadErrores++;
    }
  });
  console.log("cant errores" + cantidadErrores);
  console.log("index:::" + indexpaquete);
  if (cantidadErrores == 0) {
    var paquete = {
      nombre: "mi paquete",
      clase: "PERSONALIZADO",
      descripcion: "Paquete creado por el usuario",
      idMunicipio: $("#slcMunicipio").val(),
      fechaInicio: $("#fechaInicio").val(),
      fechaFinal: $("#fechaFinal").val(),
      idHotel: reserva.idHotel || "",
      idRestaurante: reserva.idRestaurante || "",
      idTransporte: reserva.idTransporte || "",
      idAtraccion: reserva.idAtraccion || "",
      precioDia: $("#precio").val(),
      descuento: "0"
    };
    console.log("paquete" + JSON.stringify(paquete));
    var method = "";
    var url = "";
    if (indexpaquete == "" || indexpaquete == null) {
      method = "POST";
      url = "http://localhost:8080/paquete";
    } else {
      method = "PUT";
      url = "http://localhost:8080/paquete/" + indexpaquete;
      localStorage.setItem("idpaquete", "");
    }
    var request = paquete;
    var ifSuccess = function (apiResponse) {
      addAlert(apiResponse.message, "success", 3);
      closeLoader();
      
    };
    var ifErrorLogin = function (data) {
      addAlert("Se presento un error en el servidor", "danger", 8);
      closeLoader();
    };
    openLoader();
    callApi(url, method, request, ifSuccess, ifErrorLogin);


}
});