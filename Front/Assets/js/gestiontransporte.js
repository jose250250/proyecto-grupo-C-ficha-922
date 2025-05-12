var index = localStorage.getItem('idtransporte');
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();  
});
$("#ingresarTransporte").click(function(){
    localStorage.setItem("idtransporte", "");
    $("#txtcabecera").text("Ingresar Nuevo Registro de Transportes"); 
    $("#submittransporte").text("Enviar");
    $("#frmTransporte")[0].reset();

var html = "<option value=''> Seleccione departamento </option>";
for (var i = 0; i < departamentos.length; i++) {
   var dep = departamentos[i];
   html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
  };
$("#slcDepartamento").html(html);
$("#main-content-transporte").show();
$("#main-content-header").attr("style", "display: none !important");

closeLoader();
});
$("#slcDepartamento").on("change", function () {
      var idDepartamento = ($(this).val());

    if (municipios === "") {
        cargarmunicipiosbacken();}
        var html = "<option value=''> Seleccione ciudad </option>";
        for(var i = 0; i < municipios.length; i++) {
            var mun = municipios[i];
            if(parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
                html += "<option value='" + mun.id + "'>" + mun.municipio + "</option>";
            }
        }    
        $("#slcMunicipio").html(html);
    });
    $("#frmTransporte").submit(function (event) {
        event.preventDefault();
        var cantidadErrores = 0
        $("#frmTransporte input, #frmTransporte select").each(function (i) {
            if ($(this).val() === '') {
                cantidadErrores++
            };

        });
        console.log("cant errores" + cantidadErrores);
        console.log("index:::" + index);
        

        if (cantidadErrores == 0)  {

            var transporte = {
                "nombre": $("#txtNombre").val(),  
                "idMunicipio": $("#slcMunicipio").val(),           
                "celular": $("#txtCelular").val(),               
                "direccion": $("#txtDireccion").val(), 
                "precio": $("#precio").val()            
            };
            console.log("transporte" + JSON.stringify(transporte));
           
            var method="";
            var url = "";
            if((index == '')||(index== null)){
                method = "POST";
                    url = "http://localhost:8080/transporte";
                 }
                else {
                  
                    method ="PUT";
                    url = "http://localhost:8080/transporte/"+index;
                    localStorage.setItem('idtransporte', '');
                }

            
            
            var request = transporte;
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

            $('#frmTransporte')[0].reset();
        }

        else {
            $("#frmTransporte input, #frmTransporte select").each(function () {
                if ($(this).val() === '') {
                    $(this).addClass("is-invalid");
                }

            });
            addAlert("valide los datos ingresados", "info", 2);

        };

    });
    $("#frmTransporte input, #frmTransporte select").on('change keyup click', function () {

        $(this).removeClass("is-invalid");

    });
    $("#atras").click(function(){
        $("#main-content-transporte").hide();
        $("#main-content-header").show();
       });

    $("#homeAdmin").click(function(){
     loadPage("homeAdmin",admin);
    });

    $("#verlistaTransporte").click(function () {
        loadPage("listaTransporte",admin);        
    });    


