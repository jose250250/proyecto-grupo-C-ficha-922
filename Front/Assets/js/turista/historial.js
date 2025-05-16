var emunicipio = "";
var historialEdit = "";
var municipioid = "";
var iddep = "";

var personaid = localStorage.getItem("turista");

$(function(){   
    cargarHistorialPaquetes(personaid);
    $("#divBntAgragar").attr("style", "display: none !important");
    $("#txtTitulo").attr("style", "display: none !important");
   
   
    $("#Atras").click(function(){
        page = "home";
        loadPage(page, turPath); 
         $("#txtTitulo").attr("style", "display: block !important");
    });
});

$(document).on("click", ".btns-eliminar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);
});
$("#confeliminar").click(function () {
    console.log("INDEX:: " + index);

    var url = "http://localhost:8080/dperpaquete/" + index;
    console.log("VAR::" + url);
    var method = "DELETE";
    var request = "";
    var ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
        $("#cerrarmodal").click();
        cargarHistorialPaquetes(personaid);
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});
$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "homeReserva";
    loadPage(page, turPath);   
    localStorage.setItem("idreserva", index); 
    $(function () {
        var url = "http://localhost:8080/dperpaquete/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            ReservaEdit = (apiResponse.data);
            console.log("reservaedit::" + JSON.stringify(ReservaEdit));
        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });
    window.setTimeout(function () {               
            $("#main-content-reserva").show();
            $("#slcNombre").val(ReservaEdit.nombre);           
            $("#slcPaquete").val(hotelReserva.paquete);
            $("#txtDescripcion").val(ReservaEdit.descripcion);
            $("#motivo").val(ReservaEdit.motivo);                  
             },500);
            window.setTimeout(function () {
                $("#txtcabecera").text("Actualizar Registro"); 
                $("#submitreserva").text("Actualizar");                 
                $("#main-content-header").hide();  
                $("#main-content-header").attr("style", "display: none !important");             
            }, 500);
            closeLoader();
        });  
      
     

