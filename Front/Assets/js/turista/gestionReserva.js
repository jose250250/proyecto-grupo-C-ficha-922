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
    $("#submitreserva").text("Enviar");
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
       // Validación de inputs y selects con clase específica
  $("#frmReserva").find("input.form-control, select.form-label").each(function () {
    if ($(this).val() === "") {
      cantidadErrores++;
            };
        });
        console.log("cant errores" + cantidadErrores);
        console.log("index:::" + index);
        if (cantidadErrores == 0)  {
     

    const reserva = {
        idPersona: $("#slcNombre").val(),  
        idPaquete: $("#slcPaquete").val(), 
        estado: $('#slcEstado option:selected').text(),              
        registro: new Date().toISOString(),
        motivo: $("#txtMotivo").val(),
        urlVoucher: $("#urlVoucher").val(),
        precioTotal: $("#pagoTotal").val()
    };
     console.log("reservaaguardar:::", reserva);
    // Crear FormData y adjuntar el JSON como Blob
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(reserva)], { type: "application/json" }));

    // Adjuntar voucher si fue cargado
     var archivo = $("#foto")[0].files[0];
    if (archivo) {
        formData.append("file", archivo);
       for (var pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1]);
}
    }  
    

    let method = "";
    let url = "";

    if (!index) {
        method = "POST";
        url = "http://localhost:8080/dperpaquete";
    } else {
        method = "PUT";
        url = "http://localhost:8080/dperpaquete/" + index;
        localStorage.setItem('idreserva', '');
    }

    const ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        closeLoader();
    };

    const ifErrorLogin = function (data) {
        addAlert("Se presentó un error en el servidor", "danger", 8);
        closeLoader();
    };

    openLoader();

    $.ajax({
        url: url,
        type: method,
        data: formData,
        processData: false,
        contentType: false,
        success: ifSuccess,
        error: ifErrorLogin
    });
;


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
         localStorage.setItem('idreserva', '');
       
    });

    $("#homeAdmin").click(function(){
     loadPage("homeAdmin",admin);
      $("#txtGestion").text("Gestion por Modulos");
    });

    $("#verlistaReserva").click(function () {
        loadPage("listaReserva",admin);        
    });    


