$(function(){  
    rootPath= "admin/";
    var page = "";   

    $("#entrarPersona").click(function(){
        page = "homepersona";
        loadPage(page, rootPath);   
     });  
     $("#entrarUsuario").click(function(){
        page = "homeUsuario";
        loadPage(page, rootPath);   
     });
    $("#entrarHotel").click(function(){
        page = "homeHotel";
        loadPage(page, rootPath);
    });
    $("#entrarRestaurante").click(function(){
        page = "homeRestaurante";
        loadPage(page, rootPath);
        
    });   
    $("#entrarAtraccion").click(function(){
        page = "homeAtraccion";
        loadPage(page, rootPath);
    
    });   
    $("#entrarPaquete").click(function(){
        page = "homePaquete";
        loadPage(page, rootPath);

    });   
    $("#entrarTransporte").click(function(){
        page = "homeTransporte";
        loadPage(page, rootPath);

    });   
    $("#entrarReserva").click(function(){
        page = "homeReserva";
        loadPage(page, rootPath);

    });   

  
});









