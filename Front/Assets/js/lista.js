var emunicipio = "";
var personaEdit = "";
var municipioid = "";
var iddep = "";
var admin = "admin/";



$(function(){
   
    cargarpersonas();


});

$(document).on("click", ".btns-eliminar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);
});
$("#confeliminar").click(function () {
    console.log("INDEX:: " + index);

    var url = "http://localhost:8080/persona/" + index;
    console.log("VAR::" + url);
    var method = "DELETE";
    var request = "";
    var ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
        $("#cerrarmodal").click();
        cargarpersonas();
    };   
    openLoader();
    callApi(url, method, request, ifSuccess, ifError);
});

$(document).on("click", ".btns-editar", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);  
    page = "homepersona";
    loadPage(page, admin);   
    cargarmunicipiosbacken();          
    cargardepartamentos();  
    localStorage.setItem("idpersona", index); 
 
    $(function () {
        var url = "http://localhost:8080/persona/" + index;
        console.log("VAR::" + url);
        var method5 = "GET";
        var request = "";
        var ifSuccess = function (apiResponse) {
            personaEdit = (apiResponse.data);
            municipioid = (apiResponse.data.idMunicipio);
            console.log("personaedit::" + JSON.stringify(personaEdit));
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
                return elemento.id === personaEdit.idMunicipio;
            });
           
            console.log("emunicipio::" +JSON.stringify(emunicipio)); 
            iddep = emunicipio[0].idDepartamento;
            console.log("iddp:::" +iddep);

        }       
        callApi(url, method5, request, ifSuccess, ifError);
    });
    window.setTimeout(function () {               
            $("#main-content-persona").show();
            $("#txtPNombre").val(personaEdit.primerNombre);
            $("#txtSNombre").val(personaEdit.segundoNombre);
            $("#txtPApellido").val(personaEdit.primerApellido);
            $("#txtSApellido").val(personaEdit.segundoApellido);
            $("#txtIdentificacion").val(personaEdit.identificacion);
            $("#dateFechaNacimiento").val(personaEdit.fechaNacimiento);
            $("#txtCelular").val(personaEdit.celular);
            $("#txtDireccion").val(personaEdit.direccion);
            $("#slcGenero").val(personaEdit.genero);
            $("#txtCorreo").val(personaEdit.correo);
           
          
                           
             },500);
            
            window.setTimeout(function () {
                $("#slcMunicipio").val(personaEdit.idMunicipio);
                $("#slcDepartamento").val(iddep);               
                $("#textcabecera").text("Actualizar Registro"); 
                if (personaEdit.tipoIdentificacion === "pasaporte") {
                    $("#slcTipoIdentificacion").val(2);
                }
                else {
                    $("#slcTipoIdentificacion").val(1);
                }   
                $("#submitpersona").text("Actualizar");                
            }, 500);
          
            closeLoader();
        });  
        $("#Atras").click(function(){
            page = "homepersona";
            loadPage(page, admin); 
            $("#main-content-persona").hide();
            $("#main-content-header").show();
        });
     

