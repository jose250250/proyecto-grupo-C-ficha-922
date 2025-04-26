var index = localStorage.getItem('idhotel');
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();  
});
$("#ingresarhotel").click(function(){
    localStorage.setItem("idhotel", "");
    $("#submithotel").text("Enviar");

var html = "<option value=''> Seleccione departamento </option>";
for (var i = 0; i < departamentos.length; i++) {
   var dep = departamentos[i];
   html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
  };
$("#slcDepartamento").html(html);
$("#main-content-hotel").show();
$("#main-content-header").hide();

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
    $("#frmhotel").submit(function (event) {
        event.preventDefault();
        var cantidadErrores = 0
        $("#frmhotel input, #frmhotel select").each(function (i) {
            if ($(this).val() === '') {
                cantidadErrores++
            };

        });
        console.log("cant errores" + cantidadErrores);
        console.log("index:::" + index);
        

        if (cantidadErrores == 0)  {

            var hotel = {
                "nombre": $("#txtNombre").val(),  
                "idMunicipio": $("#slcMunicipio").val(),           
                "celular": $("#txtCelular").val(),               
                "direccion": $("#txtDireccion").val(),
                "precio":$("#precio").val()              
            };
            console.log("hotel" + JSON.stringify(hotel));
           
            var method="";
            var url = "";
            if((index == '')||(index== null)){
                method = "POST";
                    url = "http://localhost:8080/hotel";
                 }
                else {
                  
                    method ="PUT";
                    url = "http://localhost:8080/hotel/"+index;
                    localStorage.setItem('idhotel', '');
                }        
            
            var request = hotel;
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

            $('#frmhotel')[0].reset();
            $("#main-content-hotel").hide();
            $("#main-content-header").show();
        }

        else {
            $("#frmhotel input, #frmhotel select").each(function () {
                if ($(this).val() === '') {
                    $(this).addClass("is-invalid");
                }

            });
            addAlert("valide los datos ingresados", "info", 2);

        };

    });
    $("#frmhotel input, #frmhotel select").on('change keyup click', function () {

        $(this).removeClass("is-invalid");

    });
    $("#atras").click(function(){
        $("#main-content-hotel").hide();
        $("#main-content-header").show();
    });

    $("#homeAdmin").click(function(){
     loadPage("homeAdmin",admin);
    });

    $("#verlistahotel").click(function () {
        loadPage("listahotel",admin);        
    });    


