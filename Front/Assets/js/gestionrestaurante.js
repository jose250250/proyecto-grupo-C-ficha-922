var index = localStorage.getItem('idrestaurante');
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();  
});
$("#ingresarRestaurante").click(function(){
    localStorage.setItem("idrestaurante", "");
    $("#txtcabecera").text("Ingresar Nuevo Registro de Restaurantes"); 
    $("#submitRestaurante").text("Enviar");
    $("#frmRestaurante")[0].reset();

var html = "<option value=''> Seleccione departamento </option>";
for (var i = 0; i < departamentos.length; i++) {
   var dep = departamentos[i];
   html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
  };
$("#slcDepartamento").html(html);
$("#main-content-restaurante").show();
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
    $("#frmRestaurante").submit(function (event) {
        event.preventDefault();
        var cantidadErrores = 0
        $("#frmRestaurante input, #frmRestaurante select").each(function (i) {
            if ($(this).val() === '') {
                cantidadErrores++
            };

        });
        console.log("cant errores" + cantidadErrores);
        console.log("index:::" + index);
        

        if (cantidadErrores == 0)  {

            var restaurante = {
                "nombre": $("#txtNombre").val(),  
                "idMunicipio": $("#slcMunicipio").val(),           
                "celular": $("#txtCelular").val(),               
                "direccion": $("#txtDireccion").val(),
                "precio": $("#precio").val()              
            };
            console.log("restaurante" + JSON.stringify(restaurante));
           
            var method="";
            var url = "";
            if((index == '')||(index== null)){
                method = "POST";
                    url = "http://localhost:8080/restaurante";
                 }
                else {
                  
                    method ="PUT";
                    url = "http://localhost:8080/restaurante/"+index;
                    localStorage.setItem('idrestaurante', '');
                }
            var request = restaurante;
            var ifSuccess = function (apiResponse) {
             $("#main-content-restaurante").hide();
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
            $('#frmRestaurante')[0].reset();
        }
        else {
            $("#frmRestaurante input, #frmRestaurante select").each(function () {
                if ($(this).val() === '') {
                    $(this).addClass("is-invalid");
                }
            });
            addAlert("valide los datos ingresados", "info", 2);
        };
    });
    $("#frmRestaurante input, #frmRestaurante select").on('change keyup click', function () {
        $(this).removeClass("is-invalid");
    });
    $("#atras").click(function(){
        $("#main-content-restaurante").hide();
        $("#main-content-header").show();
       });
$("#homeAdmin").click(function(){
     loadPage("homeAdmin",admin);
    });
    $("#verlistaRestaurante").click(function () {
        loadPage("listarestaurante",admin);
    });    


