var index = localStorage.getItem('idhotel');
$(function () {
    cargardepartamentos();  
    cargarmunicipiosbacken();  
    $("#txtGestion").text("Administrar Modulo Hotel");
});
$("#ingresarhotel").click(function(){
    localStorage.setItem("idhotel", "");
    $("#submithotel").text("Enviar");
    $("#txtcabecera").text("Ingresar Nuevo Registro de Hoteles"); 
    $("#frmhotel")[0].reset();


var html = "<option value=''> Seleccione departamento </option>";
for (var i = 0; i < departamentos.length; i++) {
   var dep = departamentos[i];
   html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
  };
$("#slcDepartamento").html(html);
$("#main-content-hotel").show();
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

     var formData = new FormData();
    formData.append("nombre", $("#txtNombre").val());
    formData.append("idMunicipio", $("#slcMunicipio").val());
    formData.append("celular", $("#txtCelular").val());
    formData.append("direccion", $("#txtDireccion").val());
    formData.append("precio", $("#precio").val());

    var archivo = $("#foto")[0].files[0];
    if (archivo) {
        formData.append("foto", archivo);
       for (var pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1]);
}
    }    
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
       openLoader();
$.ajax({
    url: url,
    type: method,
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        addAlert("Hotel guardado con éxito", "success", 3);
        closeLoader();
    },
    error: function (err) {
        addAlert("Se presentó un error en el servidor", "danger", 8);
        closeLoader();
    }
});

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
      $("#txtGestion").text("Gestion por Modulos");
    });

    $("#verlistahotel").click(function () {
        loadPage("listahotel",admin);        
    });    


