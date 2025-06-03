var index = localStorage.getItem('idreserva');
var idper ="";
$(function () {
    if(!index){
    cargardepartamentos();  
    cargarmunicipiosbacken(); 
    obtenerlistaatracciones();
    obtenerlistahoteles();
    obtenerlistarestaurante();
    obtenerlistatransportes(); 
    obtenerlistapaquetes();
    cargarlistapersonas();
    }
    else{
        cargarlistapersonas();
        obtenerlistapaquetes();
        var html = "<option value=''> Seleccione Usuario </option>";
for (var i = 0; i < listadopersonas.length; i++) {
   var per = listadopersonas[i];
   html += "<option value='" + per.id + "'>" + per.primerNombre + " "+ per.primerApellido +"</option>";
  };
$("#slcNombre").html(html);
var html2 = "<option value=''> Seleccione paquete </option>";
for (var i = 0; i < listapaquetes.length; i++) {
   var paq = listapaquetes[i];
   html2 += "<option value='" + paq.id + "'>" + paq.nombre + " </option>";
  };
  $("#slcPaquete").html(html2);

    }
 $("#txtGestion").text("Administrar Modulo Reservas");   

 
});
$("#ingresarReserva").click(function(){
    localStorage.setItem("idReserva", "");
    $("#submitReserva").text("Enviar");
    $("#txtcabecera").text("Ingresar Nuevo Registro de Reservas"); 
    $("#frmReserva")[0].reset();

var html = "<option value=''> Seleccione Usuario </option>";
for (var i = 0; i < listadopersonas.length; i++) {
   var per = listadopersonas[i];
   html += "<option value='" + per.id + "'>" + per.primerNombre + " "+ per.primerApellido +"</option>";
  };
$("#slcNombre").html(html);
var html2 = "<option value=''> Seleccione paquete </option>";
for (var i = 0; i < listapaquetes.length; i++) {
   var paq = listapaquetes[i];
   html2 += "<option value='" + paq.id + "'>" + paq.nombre + " </option>";
  };

$("#slcPaquete").html(html2);

$("#main-content-reserva").show();
$("#main-content-header").attr("style", "display: none !important");

closeLoader();
});

   
     
    /*$(document).on("change", "#slcPaquete", function () {
        idpaq=($(this).val());




    })*/

  $(document).on("change", "#slcNombre", function () {
  let idper = parseInt($(this).val());
  let perSel = $.grep(listadopersonas, function (elemento) {
    return elemento.id === idper;
  });
     console.log("personasel:::",perSel);
    $("#txtNidentificacion").val(perSel[0].identificacion);
})


    $("#frmReserva").submit(function (event) {
        event.preventDefault();
        var cantidadErrores = 0
        $("#frmReserva input, #frmReserva select").each(function (i) {
            if ($(this).val() === '') {
                cantidadErrores++
            };
        });
        console.log("cant errores" + cantidadErrores);
        console.log("index:::" + index);
        if (cantidadErrores == 0)  {
            var reserva = {
                "idPersona": $("#slcNombre").val(),  
                "idPaquete": $("#slcPaquete").val(), 
                "estado": $('#slcEstado option:selected').text(),              
                "registro": new Date().toISOString(),
                "motivo":$("#txtMotivo").val()
            };
            console.log("reserva" + JSON.stringify(reserva));
           
            var method="";
            var url = "";
            if(!index){
                method = "POST";
                    url = "http://localhost:8080/dperpaquete";
                 }
                else {
                  
                    method ="PUT";
                    url = "http://localhost:8080/dperpaquete/"+index;
                    localStorage.setItem('idreserva', '');
                }        
            
            var request = reserva;
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

            $('#frmReserva')[0].reset();
            $("#main-content-reserva").hide();
            $("#main-content-header").show();
        }

        else {
            $("#frmReserva input, #frmReserva select").each(function () {
                if ($(this).val() === '') {
                    $(this).addClass("is-invalid");
                }

            });
            addAlert("valide los datos ingresados", "info", 2);

        };

    });
    $("#frmReserva input, #frmReserva select").on('change keyup click', function () {

        $(this).removeClass("is-invalid");

    });
    $("#atras").click(function(){
        $("#main-content-reserva").hide();
        $("#main-content-header").show();
       
    });

    $("#homeAdmin").click(function(){
     loadPage("homeAdmin",admin);
      $("#txtGestion").text("Gestion por Modulos");
    });

    $("#verlistaReserva").click(function () {
        loadPage("listaReserva",admin);        
    });    


