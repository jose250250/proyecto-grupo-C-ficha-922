var emunicipio = "";
var ReservaEdit = "";
var municipioid = "";
var iddep = "";
var admin = "admin/";



$(function(){   
    cargarreservas();
    $("#Atras").click(function(){
        page = "homeReserva";
        loadPage(page, admin); 
        $("#main-content-reserva").hide();
        $("#main-content-header").show();
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
        cargarreservas();
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});

$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "homeReserva2";
    loadPage(page, admin);   
   
    localStorage.setItem("idreserva", index); 
 
    $(function () {
        var url = "http://localhost:8080/dperpaquete/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            ReservaEdit = (apiResponse.data);
             $("#main-content-reserva").show();
           
            console.log("reservaedit::" + JSON.stringify(ReservaEdit));
            window.setTimeout(function () {  
                
             const rutaImagen = "http://localhost/Front/uploads/"+ ReservaEdit.urlVaucher;
            $("#fotoVoucher").attr("src", rutaImagen);   
            $("#slcNombre").val(ReservaEdit.idPersona);           
            $("#slcPaquete").val(ReservaEdit.idPaquete);
            $("#txtNidentificacion").val(ReservaEdit.identificacion);
            $("#txtMotivo").val(ReservaEdit.motivo); 
            $("#pagoTotal").val(ReservaEdit.precioTotal);

             },1500);
            
            window.setTimeout(function () {
                $("#txtcabecera").text("Actualizar Registro"); 
                $("#submitreserva").text("Actualizar");                 
                $("#main-content-header").hide();  
                $("#main-content-header").attr("style", "display: none !important"); 
                closeLoader();            
            }, 2500);
          
        
        }  
        openLoader();     
        callApi(url, method5, request, ifSuccess, ifError);
    });
 
        });  
        $("#Atras").click(function(){
            page = "homeReserva";
            loadPage(page, admin); 
            $("#main-content-reserva").hide();
            $("#main-content-header").show();
        });
     

