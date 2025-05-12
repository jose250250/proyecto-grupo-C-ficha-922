var emunicipio = "";
var transporteEdit = "";
var municipioid = "";
var iddep = "";
var admin = "admin/";

$(function(){   
    cargartransporte();
    $("#AtrasTransporte").click(function(){
        page = "homeTransporte";
        loadPage(page, admin); 
        $("#main-content-transporte").hide();
        $("#main-content-header").show();
          });
 
});

$(document).on("click", ".btns-eliminar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);
});
$("#confeliminar").click(function () {
    console.log("INDEX:: " + index);

    var url = "http://localhost:8080/transporte/" + index;
    console.log("VAR::" + url);
    var method = "DELETE";
    var request = "";
    var ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
        $("#cerrarmodal").click();
        cargartransporte();
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});

$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "hometransporte";
    loadPage(page, admin);   
    cargarmunicipiosbacken();          
    cargardepartamentos();  
    localStorage.setItem("idtransporte", index); 
 
    $(function () {
        var url = "http://localhost:8080/transporte/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            transporteEdit = (apiResponse.data);
            municipioid = (apiResponse.data.idMunicipio);
            console.log("transporteedit::" + JSON.stringify(transporteEdit));
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
                return elemento.id === transporteEdit.idMunicipio;
            });
           
            console.log("emunicipio::" +JSON.stringify(emunicipio)); 
            iddep = emunicipio[0].idDepartamento;
            console.log("iddp:::" +iddep);

        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });
    window.setTimeout(function () {               
            $("#main-content-restaurante").show();
            $("#txtNombre").val(transporteEdit.nombre);           
            $("#txtCelular").val(transporteEdit.celular);
            $("#txtDireccion").val(transporteEdit.direccion);                  
                           
             },500);            
            window.setTimeout(function () {
                $("#slcMunicipio").val(transporteEdit.idMunicipio);
                $("#slcDepartamento").val(iddep);               
                $("#txtcabecera").text("Actualizar Registro"); 
                $("#submittransporte").text("Actualizar"); 
                $("#main-content-header").attr("style", "display: none !important");                 
            }, 500);
          
            closeLoader();
        });  
      

