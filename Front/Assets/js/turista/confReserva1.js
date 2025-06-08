$(function(){


$(document).on(function(){
const hoy = new Date().toISOString().split("T")[0];
$("#fechaInicio").attr("min", hoy);
$("#fechaFinal").attr("min", hoy);

})



$("#reservaProm").off("submit").on("submit", function (event) {
    event.preventDefault();
    var urlp = "http://localhost:8080/dperpaquete"
    var detallepaquete= {
      idPersona: reservaProm.idPersona,
      idPaquete: reservaProm.idPaquete,
      estado: "pendiente",
      registro: new Date().toISOString(),
      motivo: "fecha de eleccion del usuario"       
    }
    paqueteelegido = reservaProm.idPaquete;
    var requestp = detallepaquete;
    console.log("dpper" + JSON.stringify(detallepaquete));
    var ifSuccessdetalle = function (apiResponse) {
      addAlert(apiResponse.message, "success", 3);
      
      loadPage("paquetePersonal7",turPath);
    }
    closeLoader();
    callApi(urlp, "POST", requestp, ifSuccessdetalle, ifError);


})
$(document).on("change", "#fechaInicio, #fechaFinal", function () {
    let inicio = new Date($("#fechaInicio").val());
    let final = new Date($("#fechaFinal").val());
    if (inicio && final && !isNaN(inicio) && !isNaN(final)) {
        let diferencia = Math.abs(final - inicio); // Diferencia en milisegundos
        let dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24)); // Convertir a días
        $("#CantDias").val(dias); // Asignar resultado al input
    }
        var total = ($("#precio").val())*($("#CantDias").val())
        $("#totalpaq").val(total);
    
});
$("#atrasReserva").click(function(){
  loadPage("home",turPath);
  $("#txtTitulo").show();
})
})