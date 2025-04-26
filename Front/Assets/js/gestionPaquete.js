var indexpaquete = localStorage.getItem('idpaquete');
var idmunicipio="";
admin= "admin/"
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();
    obtenerlistaatracciones();
    obtenerlistahoteles();
    obtenerlistatransportes();
    obtenerlistarestaurante();  
  
});
$("#ingresarPaquete").click(function () {
      
       var html = "<option value=''> Seleccione departamento </option>";
        for (var i = 0; i < departamentos.length; i++) {
           var dep = departamentos[i];
           html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
          };
        $("#slcDepartamento").html(html);
        $("#main-content-paquete").show();
        $("#main-content-header").hide();
        closeLoader();
})
    $("#verlistaPersona").click(function () {
        loadPage("listaPaquete",admin);
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
    $(function(){
    $("#slcMunicipio").on("change", function () {
    
    idmunicipio = ($(this).val());
    console.log("idmuniicpio:::" + idmunicipio);
    console.log("listahoteles:::" +JSON.stringify(listahoteles));
   
    var html2 = "<option value=''> Seleccione hotel </option>";
    for (var i = 0; i < listahoteles.length; i++) {
        var lishot = listahoteles[i];
        if (parseInt(idmunicipio) === parseInt(lishot.idMunicipio)) {
            html2 += "<option value='" + lishot.id + "'>" + lishot.nombre +  "</option>";
        } 
       }        
     
    var html3 = "<option value=''> Seleccione transporte </option>";
    for (var i = 0; i < listaTransportes.length; i++) {
        var listra = listaTransportes[i];
        if (parseInt(idmunicipio) === parseInt(listra.idMunicipio)) {
            html3 += "<option value='" + listra.id + "'>" + listra.nombre + "</option>";
        }
        }  
        var html5 = "<option value=''> Seleccione atraccion </option>";
        for (var i = 0; i < listarestaurantes.length; i++) {
             var lisres = listarestaurantes[i];
             console.log("lisres:::" + JSON.stringify(lisres));
             if (parseInt(idmunicipio) === parseInt(lisres.idMunicipio)) {
             html5 += "<option value='" + lisres.id + "'>" + lisres.nombre + "</option>";
              }
            }             
    
    var html4 = "<option value=''> Seleccione atraccion </option>";
    for (var i = 0; i < listaatracciones.length; i++) {
         var lisatr = listaatracciones[i];
         if (parseInt(idmunicipio) === parseInt(lisatr.idMunicipio)) {
         html4 += "<option value='" + lisatr.id + "'>" + lisatr.nombre + "</option>";
          }
        }    
      
            $("#slcTransporte").html(html3);
            $("#slcAtraccion").html(html4);
            $("#slcHotel").html(html2);
            $("#slcRestaurante").html(html5);   
});
});
$("#slcHotel #slcRestaurante #slcAtraccion #transporte").on("change", function (){
    $("#precio").val(parseInt(lisatr))

})
   /* $("#form-persona").submit(function (event) {
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
            if(index != ''){
                method ="PUT";
                url = "http://localhost:8080/persona/"+index;
                localStorage.setItem('idpersona', '');
                 }
                else {
                    method = "POST";
                    url = "http://localhost:8080/persona";
                }

            
            
            var request = persona;
            var ifSuccess = function (apiResponse) {

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
)}; */