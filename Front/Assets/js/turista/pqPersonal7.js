$(function(){
  console.log("Paquetelegido:::"+paqueteelegido);
 var url = "http://localhost:8080/paquete/" + paqueteelegido;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            paqueteEdit = (apiResponse.data);
            console.log("paqueteedit::", paqueteEdit);
           
window.setTimeout(function(){
    $("#paqueteValor").text(paqueteEdit.nombre);
    $("#valorNumero").text(`$${paqueteEdit.precioDia}`);
} , 1000);
        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });

$(".serv-card2").on("click", function () {
  const metodo = $(this).data("metodo");
  console.log("Método seleccionado:", metodo);
    loadPage("paquetePersonal8",turPath);
  

});    