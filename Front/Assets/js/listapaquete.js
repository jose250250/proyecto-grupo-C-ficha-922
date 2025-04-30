var emunicipio = "";
var paqueteEdit = "";
var municipioid = "";
var iddep = "";
var admin = "admin/";
$(function(){   
    cargarpaquetes();
    $("#AtrasPaquete").click(function(){
        page = "homePaquete";
        loadPage(page, admin); 
        $("#main-content-paquete").hide();
        $("#main-content-header").show();
        localStorage.setItem("idmunicipiopaquete" ,"");
          });
});
$(document).on("click", ".btns-eliminar", function () {
    index = $(this).data('id');
});
$("#confeliminar").click(function () {
    console.log("INDEX:: " + index);
    var url = "http://localhost:8080/paquete/" + index;
    console.log("VAR::" + url);
    var method = "DELETE";
    var request = "";
    var ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
        $("#cerrarmodal").click();
        cargarpaquetes();
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});
$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "homePaquete";
    loadPage(page, admin);   
    cargarmunicipiosbacken();          
    cargardepartamentos();  
    localStorage.setItem("idpaquete", index); 
    $(function () {
        var url = "http://localhost:8080/paquete/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            paqueteEdit = (apiResponse.data);
            municipioid = (apiResponse.data.idMunicipio);
            console.log("paqueteedit::" + JSON.stringify(paqueteEdit));
            console.log("VARidmuniciio::" + municipioid);
            localStorage.setItem("idmunicipiopaquete", municipioid);               
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
                return elemento.id === paqueteEdit.idMunicipio;
            });
            console.log("emunicipio::" +JSON.stringify(emunicipio)); 
            iddep = emunicipio[0].idDepartamento;
            console.log("iddp:::" +iddep);
        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });
    window.setTimeout(function () {  
            $("#main-content-paquete").show();
            $("#txtNombre").val(paqueteEdit.nombre); 
            $("#slcClasePaquete").val(paqueteEdit.clase);      
            $("#txtDescripcion").val(paqueteEdit.descripcion);
            $("#dateFechaInicio").val(paqueteEdit.fechaInicio); 
            $("#dateFechaFinal").val(paqueteEdit.fechaFinal); 
            $("#precio").val(paqueteEdit.precioDia);
            $("#descuento").val(paqueteEdit.descuento);
             },500);            
            window.setTimeout(function () {
                $("#slcMunicipio").val(paqueteEdit.idMunicipio);
                $("#slcDepartamento").val(iddep);  
                $("#slcHotel").val(paqueteEdit.idHotel); 
                $("#slcRestaurante").val(paqueteEdit.idRestaurante); 
                $("#slcTransporte").val(paqueteEdit.idTransporte);
                $("#slcAtraccion").val(paqueteEdit.idAtraccion);             
                $("#textcabecera").text("Actualizar Registro"); 
                $("#submitPaquete").text("Actualizar");                
            }, 500);
            closeLoader();
        });  
      

