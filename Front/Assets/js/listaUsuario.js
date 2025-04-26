var emunicipio = "";
var UsuarioEdit = "";
var municipioid = "";
var iddep = "";
var admin = "admin/";



$(function(){   
    cargarusuario();
    $("#Atras").click(function(){
        page = "homeUsuario";
        loadPage(page, admin); 
        $("#main-content-usuario").hide();
        $("#main-content-header").show();
    });
});

$(document).on("click", ".btns-eliminar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);
});
$("#confeliminar").click(function () {
    console.log("INDEX:: " + index);

    var url = "http://localhost:8080/usuario/" + index;
    console.log("VAR::" + url);
    var method = "DELETE";
    var request = "";
    var ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
        $("#cerrarmodal").click();
        cargarusuario();
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});

$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "homeUsuario";
    loadPage(page, admin); 
    cargapersonayrol();
     
   
 
    localStorage.setItem("idusuario", index); 
 
    $(function () {
        var url = "http://localhost:8080/usuario/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            UsuarioEdit = (apiResponse.data);         
            console.log("usuarioedit::" + JSON.stringify(UsuarioEdit));  
                            

        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });
    window.setTimeout(function () {               
            $("#main-content-usuario").show();
            $("#ingresarUsuario").click();
            $("#slcPersona").val(UsuarioEdit.idPersona);           
            $("#txtCorreo").val(UsuarioEdit.login)
            $("#txtPassword").val(UsuarioEdit.password)
            $("#slcRol").val(UsuarioEdit.idrol);                   
                           
             },500);
            
            window.setTimeout(function () {
                             
                $("#text-cabecera").text("Actualizar Registro"); 
                $("#submitUsuario").text("Actualizar");                 
                $("#main-content-header").hide();             
            }, 500);
          
            closeLoader();
        });  
        $("#Atras").click(function(){
            page = "homeUsuario";
            loadPage(page, admin); 
            $("#main-content-usuario").hide();
            $("#main-content-header").show();
        });
     

