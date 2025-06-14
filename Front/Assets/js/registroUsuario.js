$(function(){
    identificacion = localStorage.getItem("identificacion");
        var method="";
        var url = "";   
        method = "GET";
        url = "http://localhost:8080/persona/buscar/"+ identificacion;
        console.log("var url:::" + url);    
        var request = "";
        var ifSuccess = function (apiResponse) {
            var correo = apiResponse.data.correo;
            var html = "";
             html += "<option value='" + (apiResponse.data.id) + "'readonly>" + (apiResponse.data.primerNombre) + " "+ (apiResponse.data.primerApellido) + "</option>";
            $("#slcPersona").html(html); 
            $("#txtCorreo").val(correo);
            $("#main-content-header").hide();
            $("#txtCorreo").prop("readonly", true);
            console.log("var html:::"+ html+ "correo:::" + correo);
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
        };
        openLoader();
        callApi(url, method, request, ifSuccess, ifError);
    }) 
    $("#txtPassword, #txtPasswordconf").on('keyup keydow', function(){
        if(($("#txtPassword").val())===($("#txtPasswordconf").val())){
             validPassword = true;
             console.log("vilid:::"+validPassword);
             $(this).removeClass("is-invalid");
        }
        else{
            validPassword = false;
            $(this).addClass("is-invalid");
        }
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
        if ((cantidadErrores == 0)&(validPassword==true))  {

            var usuario = {              
                "login":$("#txtCorreo").val(),
                "password":$("#txtPassword").val(),
                "idPersona":$("#slcPersona").val(),
                "idrol":$("#slcRol").val()                          
            };
            console.log("usuario" + JSON.stringify(usuario));
            var method = "POST";
            var url = "http://localhost:8080/usuario";
            localStorage.setItem('idusuario', '');
            var request = usuario;
            var ifSuccess = function (apiResponse) {
                addAlert(apiResponse.message, "success", 3);
               $('#loginModal').modal('hide');
                $(document.activeElement).blur();
                loadPage("mnosotros");
                closeLoader();
                
                window.setTimeout(function(){
                   
                $('#loginModal').modal('show');
                }, 1000);
                
            };
            var ifErrorLogin = function (data) {
                addAlert("Se presento un error en el servidor", "danger", 8);
                closeLoader();
            };
            openLoader();
            callApi(url, method, request, ifSuccess, ifErrorLogin);         
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
    $("#frmUsuario input, #frmUsuario select").on('change keyup click', function () {
        $(this).removeClass("is-invalid");
    });
    $("#Atras").click(function(){
       loadPage("home");
       });
 
    
    
    




