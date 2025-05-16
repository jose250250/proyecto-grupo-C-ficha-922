var currentPage = null;
var defaultPage = "home";
var turPath = "turista/";

$(function(){

    redirectByLoginUser(true);
    loadHeader(turPath);
    loadFooter(turPath);
  
      
 
   
});
$("#AgPaqueteBtn").click(function(){
    $("#divBntAgragar").hide();
    loadPage("paquetePersonal",turPath);
  });

  $("#minimizar-resumen").click(function () {
    $("#contenido-resumen").toggleClass("oculto");
    $(this).text($("#contenido-resumen").hasClass("oculto") ? "+" : "–");
});  
$("#btnHistorial").click(function(){
  loadPage("historialCard",turPath);
})



