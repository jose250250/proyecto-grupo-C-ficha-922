var datoUsuario = localStorage.getItem("data-user")
var reservaProm = [];
var dUser = [];
$(function () {
  var objUser = redirectByLoginUser(true);

  closeLoader();
  $("#nUsuario").text(objUser.primerNombre + " " + objUser.primerApellido);
  $("#rolUsuario").text(objUser.rol);
  localStorage.setItem("turista",objUser.persona);
  cargarPaquetesPromocionales();

  $("#btnsalir, #cerrarsesion").on("click", function () {
    localStorage.clear();
    redirectByLoginUser(true);
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

          reservaProm = {
            
              idPersona: dUser.persona,
              idPaquete: index,
              estado: "pendiente",
              registro: new Date().toISOString(),
              motivo: "fecha de creacion del usuario"       
            }
          


      }, 1500);
 }
});
});