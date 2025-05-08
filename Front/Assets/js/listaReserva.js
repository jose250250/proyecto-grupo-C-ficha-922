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
        cargarhotel();
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});

$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "homeReserva";
    loadPage(page, admin);   
   
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
                          
                $("#textcabecera").text("Actualizar Registro"); 
               
                $("#submitreserva").text("Actualizar");                 
                $("#main-content-header").hide();             
            }, 500);
          
            closeLoader();
        });  
        $("#Atras").click(function(){
            page = "homeReserva";
            loadPage(page, admin); 
            $("#main-content-reserva").hide();
            $("#main-content-header").show();
        });
     

