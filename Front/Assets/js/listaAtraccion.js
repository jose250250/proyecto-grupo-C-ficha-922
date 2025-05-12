var emunicipio = "";
var atraccionEdit = "";
var municipioid = "";
var iddep = "";
var admin = "admin/";

$(function(){   
    cargaratracciones();
    $("#AtrasAtraccion").click(function(){
        page = "homeAtraccion";
        loadPage(page, admin); 
        $("#main-content-atraccion").hide();
        $("#main-content-header").show();
          });
 
});

$(document).on("click", ".btns-eliminar", function () {
    index = $(this).data('id');
});
$("#confeliminar").click(function () {
    console.log("INDEX:: " + index);

    var url = "http://localhost:8080/atraccion/" + index;
    console.log("VAR::" + url);
    var method = "DELETE";
    var request = "";
    var ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
        $("#cerrarmodal").click();
        cargaratracciones();
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});

$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "homeAtraccion";
    loadPage(page, admin);   
    cargarmunicipiosbacken();          
    cargardepartamentos();  
    localStorage.setItem("idatraccion", index); 
 
    $(function () {
        var url = "http://localhost:8080/atraccion/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            atraccionEdit = (apiResponse.data);
            municipioid = (apiResponse.data.idMunicipio);
            console.log("atraccionedit::" + JSON.stringify(atraccionEdit));
            console.log("VARidmuniciio::" + municipioid);         
            
            var html = "<option value=''> Seleccione departamento </option>";
            for (var i = 0; i < departamentos.length; i++) {
               var dep = departamentos[i];
               html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
              };
            $("#slcDepartamento").html(html); 
            var html2 = "<option value=''> Seleccione municipio </option>";
            for (var i = 0; i < municipios.length; i++) {
               var mun = municipios[i];
               html2 += "<option value='" + mun.id + "'>" + mun.municipio + "</option>";
              };
            $("#slcMunicipio").html(html2);
            let emunicipio = $.grep(municipios, function (elemento) {
                return elemento.id === atraccionEdit.idMunicipio;
            });
           
            console.log("emunicipio::" +JSON.stringify(emunicipio)); 
            iddep = emunicipio[0].idDepartamento;
            console.log("iddp:::" +iddep);

        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });
    window.setTimeout(function () {               
            $("#main-content-atraccion").show();
            $("#txtNombre").val(atraccionEdit.nombre);           
            $("#txtCelular").val(atraccionEdit.celular);
            $("#txtDireccion").val(atraccionEdit.direccion); 
            $("#precio").val(atraccionEdit.precio);                 
                           
             },500);            
            window.setTimeout(function () {
                $("#slcMunicipio").val(atraccionEdit.idMunicipio);
                $("#slcDepartamento").val(iddep);               
                $("#txtcabecera").text("Actualizar Registro"); 
                $("#main-content-header").attr("style", "display: none !important");  
                $("#submitAtraccion").text("Actualizar");                
            }, 500);
          
            closeLoader();
        });  
      

