$(function(){

    var objUser = redirectByLoginUser(true);
    loadPage('homeAdmin',"admin/");
    closeLoader();
 
   
  
    
    $("#btnsalir, #cerrarsesion").on('click', function(){
       localStorage.clear();
       redirectByLoginUser(true);
    });  
    
   
  
    $("#main-nav").hide();
    $("#nUsuario").text(objUser.primerNombre +" " +objUser.primerApellido);
    $("#rolUsuario").text(objUser.rol);


});