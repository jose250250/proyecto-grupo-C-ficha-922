var index = localStorage.getItem('idatraccion');
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();  
});
$("#ingresarAtraccion").click(function(){
    localStorage.setItem("idatraccion", "");

var html = "<option value=''> Seleccione departamento </option>";
for (var i = 0; i < departamentos.length; i++) {
   var dep = departamentos[i];
   html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
  };
$("#slcDepartamento").html(html);
$("#main-content-atraccion").show();
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
    $("#frmAtraccion").submit(function (event) {
        event.preventDefault();
        var cantidadErrores = 0
        $("#frmAtraccion input, #frmAtraccion select").each(function (i) {
            if ($(this).val() === '') {
                cantidadErrores++
            };

        });
        console.log("cant errores" + cantidadErrores);
        console.log("index:::" + index);
        

        if (cantidadErrores == 0)  {

            var Atraccion = {
                "nombre": $("#txtNombre").val(),  
                "idMunicipio": $("#slcMunicipio").val(),           
                "celular": $("#txtCelular").val(),               
                "direccion": $("#txtDireccion").val(),
                "precio": $("#precio").val()              
            };
            console.log("atraccion" + JSON.stringify(Atraccion));
           
            var method="";
            var url = "";
            if((index == '')||(index== null)){
                method = "POST";
                    url = "http://localhost:8080/atraccion";
                 }
                else {
                  
                    method ="PUT";
                    url = "http://localhost:8080/atraccion/"+index;
                    localStorage.setItem('idatraccion', '');
                }

            
            
            var request = Atraccion;
            var ifSuccess = function (apiResponse) {

                addAlert(apiResponse.message, "success", 3);
                $("#main-content-atraccion").hide();
                $("#main-content-header").show();

                closeLoader();
            };

            var ifErrorLogin = function (data) {
                addAlert("Se presento un error en el servidor", "danger", 8);
                closeLoader();
            };

            openLoader();
            callApi(url, method, request, ifSuccess, ifErrorLogin);

            $('#frmAtraccion')[0].reset();
        }

        else {
            $("#frmAtraccion input, #frmAtraccion select").each(function () {
                if ($(this).val() === '') {
                    $(this).addClass("is-invalid");
                }

            });
            addAlert("valide los datos ingresados", "info", 2);

        };

    });
    $("#frmAtraccion input, #frmAtraccion select").on('change keyup click', function () {

        $(this).removeClass("is-invalid");

    });
    $("#atras").click(function(){
        $("#main-content-atraccion").hide();
        $("#main-content-header").show();
       });

    $("#homeAdmin").click(function(){
     loadPage("homeAdmin",admin);
    });

    $("#verlistaAtraccion").click(function () {
        loadPage("listaAtraccion",admin);        
    });    


