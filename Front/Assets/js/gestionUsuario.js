var index = localStorage.getItem('idusuario');
var validPassword= false;
$(function () {
   cargarlistapersonas();
   cargarrol();

    $("#txtPassword, #txtPasswordconf").on("input", function () {
      let pass1 = $("#txtPassword").val();
      let pass2 = $("#txtPasswordconf").val();

      if (pass1 !== pass2) {
        $("#txtPassword, #txtPasswordconf").addClass("is-invalid");
      } 
      if(pass1===pass2) {
        validPassword = true;
        $("#txtPassword, #txtPasswordconf").removeClass("is-invalid");
      }
    });

   
});
$("#ingresarUsuario").click(function(){
    localStorage.setItem("idusuario", "");
    $("#submitUsuario").text("Enviar");
    var html2 = "<option value=''> Seleccione Rol </option>";
for (var i = 0; i < listaRol.length; i++) {
   var lisrol = listaRol[i];
   html2 += "<option value='" + lisrol.id + "'>" + lisrol.nombre + "</option>";
  };
$("#slcRol").html(html2);

var html = "<option value=''> Seleccione Persona </option>";
for (var i = 0; i < listadopersonas.length; i++) {
   var lisp = listadopersonas[i];
   html += "<option value='" + lisp.id + "'>" + lisp.primerNombre+" "+ lisp.primerApellido + "</option>";
  };
$("#slcPersona").html(html);
$("#main-content-usuario").show();
$("#main-content-header").hide();

closeLoader();
});
$("#slcPersona").on("change", function () {
      var idpersona = ($(this).val()); 
      $("#txtPassword").val(""); 
      console.log("idpersona:::" + idpersona);
      let personaActual = listadopersonas.find(persona => persona.id == idpersona);
    console.log("persona actual:::",personaActual);
    $("#txtCorreo").val(personaActual.correo);
    });
    $("#frmUsuario").submit(function (event) {
        event.preventDefault();
        var cantidadErrores = 0
        $("#frmUsuario input, #frmUsuario select").each(function (i) {
            if ($(this).val() === '') {
                cantidadErrores++
            };

        });
        
        console.log("cant errores" + cantidadErrores);
        console.log("index:::" + index);
        

        if ((cantidadErrores == 0)&(validPassword==true))  {

            var usuario = {              
                "login":$("#txtCorreo").val(),
                "password":$("#txtPassword").val(),
                "idPersona":$("#slcPersona").val(),
                "idrol":$("#slcRol").val()                          
            };
            console.log("usuario" + JSON.stringify(usuario));
            var method="";
            var url = "";
            if((index == '')||(index== null)){
                method = "POST";
                    url = "http://localhost:8080/usuario";
                 }
                else {
                  
                    method ="PUT";
                    url = "http://localhost:8080/usuario/"+index;
                    localStorage.setItem('idusuario', '');
                }
            var request = usuario;
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
            $('#frmUsuario')[0].reset();
            $("#main-content-usuario").hide();
            $("#main-content-header").show();
        }

        else {
            $("#frmUsuario input, #frmUsuario select").each(function () {
                if ($(this).val() === '') {
                    $(this).addClass("is-invalid");
                }

            });
            addAlert("valide los datos ingresados", "info", 2);

        };

    });
    $("#txtCorreo, #frmUsuario select").on('change keyup click', function () {

        $(this).removeClass("is-invalid");

    });
    $("#Atras").click(function(){
        $("#main-content-usuario").hide();
        $("#main-content-header").show();
       });

$("#homeAdmin").click(function(){
     loadPage("homeAdmin",admin);
    });

    $("#verlistaUsuario").click(function () {

        loadPage("listaUsuario",admin);
        var url = "http://localhost:8080/usuario";
        var method = "GET";
        var request = "";
        var ifSuccessusuario = function (apiResponse) {
            console.log("usuario:response " + JSON.stringify(apiResponse));
            var listaUsuario = (apiResponse.data);
           
            var html = "";

            for (var i = 0; i < listaUsuario.length; i++) {
                var lisu = listaUsuario[i];
                html += "<tr>";
                html += "<th scope='col'>" + (i + 1) + "</th>";
                html += "<td>" + lisu.persona + "</td>";
                html += "<td>" + lisu.login + "</td>";
                html += "<td>" + lisu.password + "</td>";
                html += "<td>" + lisu.rol + "</td>";               
                html += "<td><div class='btns-editar'  data-id='" + lisu.id + "' ></div> <div class='btns-eliminar' data-id='" + lisu.id + "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
                html += "</tr>";
            };
            $("#table-usuario tbody").html(html);        

            closeLoader();
        }   
      
        openLoader();
        callApi(url, method, request, ifSuccessusuario, ifError);

    });  

