var reservaelegida = "";
$(function(){
  paqueteelegido = localStorage.getItem("paqueteelegido");

    var url = "http://localhost:8080/dperpaquete/"+ paqueteelegido
    console.log("VAR::" + url);
    var method = "GET";
    var request = "";
    var ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        reservaelegida = apiResponse.data;
        console.log("reservaelegida::", reservaelegida);
        $("#paqueteValor").text(reservaelegida.paquete);
        $("#valorNumero").text(`$${reservaelegida.precioTotal}`);
        closeLoader();

    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
$(".serv-card2").on("click", function () {
  const metodo = $(this).data("metodo");
  console.log("Método seleccionado:", metodo);
    loadPage("paquetePersonal8",turPath);
});
});