var index = localStorage.getItem('idpersona');


admin= "admin/"
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();  
  
});
$("#ingresarPersona").click(function () {
       var html = "<option value=''> Seleccione departamento </option>";
        for (var i = 0; i < departamentos.length; i++) {
           var dep = departamentos[i];
           html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
          };
        $("#slcDepartamento").html(html);
        $("#form-persona")[0].reset();
        $("#txtcabecera").text("Ingresar Nuevo Registro de Persona"); 
        $("#main-content-persona").show();
        $("#submitpersona").text("Enviar");
        $("#main-content-header").attr("style", "display: none !important");

        closeLoader();
});
    $("#verlistaPersona").click(function () {
        loadPage("listaPersonas",admin);
        var url = "http://localhost:8080/persona";
        var method = "GET";
        var request = "";
        var ifSuccesspersona = function (apiResponse) {
            console.log("persona:response " + JSON.stringify(apiResponse));
            var listaPersonas = (apiResponse.data);
            console.log("lista persona" + JSON.stringify(listaPersonas));

            var html = "";

            for (var i = 0; i < listaPersonas.length; i++) {
                var per = listaPersonas[i];
                html += "<tr>";
                html += "<th scope='col'>" + (i + 1) + "</th>";
                html += "<td>" + per.primerNombre + "</td>";
                html += "<td>" + per.primerApellido + "</td>";
                html += "<td>" + per.celular + "</td>";
                html += "<td><div class='btns-editar'  data-id='" + per.id + "' ></div> <div class='btns-eliminar' data-id='" + per.id + "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
                html += "</tr>";
            };

            $("#table-persona tbody").html(html);
            $("#main-content-persona").show();

            closeLoader();

        }
        openLoader();
        callApi(url, method, request, ifSuccesspersona, ifError);
    });

    $("#slcDepartamento").on("change", function () {
        console.log("index:::" + index);

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
        console.log("index:::" + index);
        if (((cantidadErrores == 2) && ($("#txtSNombre").val() === "") && ($("#txtSApellido").val() === ""))
            || ((cantidadErrores == 1) && ($("#txtSNombre").val() === "")) || ((cantidadErrores == 1) && ($("#txtSApellido").val() === ""))
            || (cantidadErrores == 0)) {
           
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
           
            var method="";
            var url = "";
            if((index == '')||(index == null)){
                method = "POST";
                url = "http://localhost:8080/persona";              
                 }
                else {
                    method ="PUT";
                    url = "http://localhost:8080/persona/"+index;
                    localStorage.setItem('idpersona', '');                 
                }           
            var request = persona;
            var ifSuccess = function (apiResponse) {
                $("#main-content-persona").hide();
                $("#main-content-header").show();
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
    $("#atrasPersona").click(function(){        
        $("#main-content-persona").hide();
        $("#main-content-header").show();
    });
    $("#homeAdmin").click(function(){
        loadPage("homeAdmin",admin);
    })
     
    $("#btnSalir").click(function(){
        loadPage("home");
    })
    
  









