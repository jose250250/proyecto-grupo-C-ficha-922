$(function(){


$(document).on(function(){
const hoy = new Date().toISOString().split("T")[0];
$("#fechaInicio").attr("min", hoy);
$("#fechaFinal").attr("min", hoy);

})



$("#reservaProm").submit(function (event) {
    event.preventDefault();
    var urlp = "http://localhost:8080/dperpaquete"
    var detallepaquete= {
      idPersona: reservaProm.idPersona,
      idPaquete: reservaProm.idPaquete,
      estado: "pendiente",
      registro: new Date().toISOString(),
      motivo: "fecha de eleccion del usuario"       
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


})
$("#atrasReserva").click(function(){
  loadPage("home",turPath);
  $("#txtTitulo").show();
})
})