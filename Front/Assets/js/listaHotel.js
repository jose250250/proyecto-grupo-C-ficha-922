var emunicipio = "";
var hotelEdit = "";
var municipioid = "";
var iddep = "";
var admin = "admin/";



$(function(){   
    cargarhotel();
    $("#Atras").click(function(){
        page = "homeHotel";
        loadPage(page, admin); 
        $("#main-content-hotel").hide();
        $("#main-content-header").show();
    });
});

$(document).on("click", ".btns-eliminar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);
});
$("#confeliminar").click(function () {
    console.log("INDEX:: " + index);

    var url = "http://localhost:8080/hotel/" + index;
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
    page = "homeHotel";
    loadPage(page, admin);   
    cargarmunicipiosbacken();          
    cargardepartamentos();  
    localStorage.setItem("idhotel", index); 
 
    $(function () {
        var url = "http://localhost:8080/hotel/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            hotelEdit = (apiResponse.data);
            municipioid = (apiResponse.data.idMunicipio);
            console.log("hoteledit::" + JSON.stringify(hotelEdit));
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
                return elemento.id === hotelEdit.idMunicipio;
            });
           
            console.log("emunicipio::" +JSON.stringify(emunicipio)); 
            iddep = emunicipio[0].idDepartamento;
            console.log("iddp:::" +iddep);

        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });
    window.setTimeout(function () {               
            $("#main-content-hotel").show();
            $("#txtNombre").val(hotelEdit.nombre);           
            $("#txtCelular").val(hotelEdit.celular);
            $("#txtDireccion").val(hotelEdit.direccion);
            $("#precio").val(hotelEdit.precio);                  
             },500);
            
            window.setTimeout(function () {
                $("#slcMunicipio").val(hotelEdit.idMunicipio);
                $("#slcDepartamento").val(iddep);               
                $("#textcabecera").text("Actualizar Registro"); 
               
                $("#submithotel").text("Actualizar");                 
                $("#main-content-header").hide();             
            }, 500);
          
            closeLoader();
        });  
        $("#Atras").click(function(){
            page = "homeHotel";
            loadPage(page, admin); 
            $("#main-content-hotel").hide();
            $("#main-content-header").show();
        });
     

