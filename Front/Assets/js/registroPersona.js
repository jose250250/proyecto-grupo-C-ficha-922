var identificacion = "";
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();  
    $("#txtTitulo").hide();
    window.setTimeout(function(){
        var html = "<option value=''> Seleccione departamento </option>";
        for (var i = 0; i < departamentos.length; i++) {
           var dep = departamentos[i];
           html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
          };
        $("#slcDepartamento").html(html);
        $("#form-persona")[0].reset();
    },1000);
  
});
$("#slcDepartamento").on("change", function () {
    var idDepartamento = ($(this).val());
    if (municipios === "") {
        cargarmunicipiosbacken();
            var html = "<option value=''> Seleccione ciudad </option>";
            for (var i = 0; i < municipios.length; i++) {
                var mun = municipios[i];
                if (parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
                    html += "<option value='" + mun.id + "'>" + mun.municipio + "</option>";
                }
                $("#slcMunicipio").html(html);
            }
        }          
    else {
        var html = "<option value=''> Seleccione ciudad </option>";

        for (var i = 0; i < municipios.length; i++) {
            var mun = municipios[i];
            if (parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
                html += "<option value='" + mun.id + "'>" + mun.municipio + "</option>";
            }
            $("#slcMunicipio").html(html);
        }

    }
});

$("#form-persona").submit(function (event) {
    event.preventDefault();
    var cantidadErrores = 0
    $("#form-persona input, #form-persona select").each(function (i) {
        if ($(this).val() === '') {
            cantidadErrores++
        };
    });
    console.log("cant errores" + cantidadErrores);
    if (((cantidadErrores == 2) && ($("#txtSNombre").val() === "") && ($("#txtSApellido").val() === ""))
        || ((cantidadErrores == 1) && ($("#txtSNombre").val() === "")) || ((cantidadErrores == 1) && ($("#txtSApellido").val() === ""))
        || (cantidadErrores == 0)) {
         identificacion = $("#txtIdentificacion").val();
         localStorage.setItem("identificacion", identificacion);
        var persona = {
            "primerNombre": $("#txtPNombre").val(),
            "segundoNombre": $("#txtSNombre").val(),
            "primerApellido": $("#txtPApellido").val(),
            "segundoApellido": $("#txtSApellido").val(),
            "tipoIdentificacion": $("#slcTipoIdentificacion").val(),
            "identificacion": $("#txtIdentificacion").val(),
            "fechaNacimiento": $("#dateFechaNacimiento").val(),
            "celular": $("#txtCelular").val(),
            "idMunicipio": $("#slcMunicipio").val(),
            "direccion": $("#txtDireccion").val(),
            "genero": $("#slcGenero").val(),
            "correo": $("#txtCorreo").val()
        };
        console.log("persona" + JSON.stringify(persona));
       
        var method="POST";
        var url = "http://localhost:8080/persona";
        localStorage.setItem('idpersona', ''); 
        var request = persona;
        var ifSuccess = function (apiResponse) {
                loadPage("RegistroUsuario");
                $("#ingresarUsuario").click();                    
            addAlert(apiResponse.message, "success", 3);
            closeLoader();
        };
        var ifErrorLogin = function (data) {
            addAlert("Se presento un error en el servidor", "danger", 8);
            closeLoader();
        };
        openLoader();
        callApi(url, method, request, ifSuccess, ifErrorLogin);

        $('#form-persona')[0].reset();
    }

    else {
        $("#form-persona input, #form-persona select").each(function () {
            if ($(this).val() === '') {
                $(this).addClass("is-invalid");
            }

        });
        addAlert("valide los datos ingresados", "info", 2);

    };

});
$("#form-persona input, #form-persona select").on('change keyup click', function () {

    $(this).removeClass("is-invalid");

});

$("#btnSalir").click(function(){
    loadPage("home");

});