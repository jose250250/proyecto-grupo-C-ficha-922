$(function(){

    var objUser = redirectByLoginUser(true);
   
  
    
    $("#btnsalir, #cerrarsesion").on('click', function(){
       localStorage.clear();
       redirectByLoginUser(true);
    });  
    
    $("#barraAdmin").show();
    $("#infoLogin").show();
    loadPage('homeAdmin');
    closeLoader();
 
    $("#main-nav").hide();
    $("#nUsuario").text(objUser.primerNombre +" " +objUser.primerApellido);
    $("#rolUsuario").text(objUser.rol);


});