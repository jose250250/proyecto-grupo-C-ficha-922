var datoUsuario = localStorage.getItem("data-user")
$(function () {
  var objUser = redirectByLoginUser(true);

  closeLoader();
  $("#nUsuario").text(objUser.primerNombre + " " + objUser.primerApellido);
  $("#rolUsuario").text(objUser.rol);
  cargarPaquetesPromocionales();

  $("#btnsalir, #cerrarsesion").on("click", function () {
    localStorage.clear();
    redirectByLoginUser(true);
  });
});

$("#main-nav .nav-link.page").click(function () {
  var pag = $(this).data("tag");
  if (pag && pag !== null && pag !== undefined) {
    currentPage = pag;
  } else {
    currentPage = defaultPage;
  }
  $("#main-nav .nav-link.page").removeClass("active");
  getPage(pag);
});
$(document).on("click", ".btn-paquete", function () {
    index = $(this).data('id');
    console.log("INDEX:: " + index);
    if(redirectByLoginUser){
        loadPage("reserva",turPath);
        console.log("paquetesss:::", paquetes);
        const paq = paquetes.find(paquete => parseInt(paquete.id) === parseInt(index));
        dUser=JSON.parse(datoUsuario);
        $("#divBntAgragar").hide();
        console.log("paqqq:::"+ dUser);
       
        window.setTimeout(function(){
            $("#txtDescripcion").val(paq.descripcion);
            $("#txtNombre").val(paq.nombre);
            $("#txtHotel").val(paq.hotel);
            $("#txtRestaurante").val(paq.restaurante);
            $("#txtTransporte").val(paq.transporte);
            $("#txtAtraccion").val(paq.atraccion);
            $("#precio").val(paq.precioDia);
            $("#txtPersona").val(dUser.primerNombre+" "+dUser.primerApellido);
        }, 1500);
       
    }
    
});
 $(document).on("change", "#fechaInicio, #fechaFinal", function () {
    let inicio = new Date($("#fechaInicio").val());
    let final = new Date($("#fechaFinal").val());

    if (inicio && final && !isNaN(inicio) && !isNaN(final)) {
        let diferencia = Math.abs(final - inicio); // Diferencia en milisegundos
        let dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24)); // Convertir a días
        
        $("#CantDias").val(dias); // Asignar resultado al input
    }
        var total = ($("#precio").val())*($("#CantDias").val())
        $("#totalpaq").val(total);
    
});

