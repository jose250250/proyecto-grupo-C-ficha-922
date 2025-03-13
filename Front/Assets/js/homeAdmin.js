$(function(){

   

    loadHeader();
    {
        var url = 'template/headerAdmin.html';
        var idContent = 'content-header';
        loadZone(url, idContent);       
    };  

    $("#entrarPersona").click(function(){
        var url = 'template/pages/homepersona.html';
        var idContent = 'content-main';
        loadZone(url, idContent);

    });  
    $("#entrarHotel").click(function(){
        var url = 'template/pages/homeHotel.html';
        var idContent = 'content-main';
        loadZone(url, idContent);

    });
    $("#entrarRestaurante").click(function(){
        var url = 'template/pages/homeRestaurante.html';
        var idContent = 'content-main';
        loadZone(url, idContent);

    });   
    $("#entrarATuristica").click(function(){
        var url = 'template/pages/homeATuristica.html';
        var idContent = 'content-main';
        loadZone(url, idContent);

    });   
    $("#entrarPaquete").click(function(){
        var url = 'template/pages/homePaquete.html';
        var idContent = 'content-main';
        loadZone(url, idContent);

    });   




    $("#bntAtras").click(function(){
        var url = 'template/pages/homeAdmin.html';
        var idContent = 'content-main';
        loadZone(url, idContent); 
        loadHeader(); {
            var url = 'template/headerAdmin.html';
            var idContent = 'content-header';
            loadZone(url, idContent);       
        };  

       }); 
   
     

    });














