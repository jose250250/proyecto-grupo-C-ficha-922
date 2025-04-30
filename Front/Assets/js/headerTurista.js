$(function(){
    var objUser = redirectByLoginUser(true);  
  
    closeLoader();
    $("#nUsuario").text(objUser.primerNombre +" " +objUser.primerApellido);
    $("#rolUsuario").text(objUser.rol);
    cargarPaquetesPromocionales();

     
    $("#btnsalir, #cerrarsesion").on('click', function(){
        localStorage.clear();
        redirectByLoginUser(true);
     });  

});

$("#main-nav .nav-link.page").click(function () {
    var pag = $(this).data('tag');
    if (pag && pag !== null && pag !== undefined) {
        currentPage = pag;

    }

    else {
        currentPage = defaultPage;
    }
    $("#main-nav .nav-link.page").removeClass('active');
    getPage();
});
