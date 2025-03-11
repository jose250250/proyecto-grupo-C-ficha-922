$(function(){

   

    loadHeader();
    {
        var url = 'template/headerAdmin.html';
        var idContent = 'content-header';
        loadZone(url, idContent);
       
    };  



    $("#atras").click(function(){
        loadHeader();{
        var url = 'template/header.html';
        var idContent = 'content-header';
       loadZone(url, idContent);
       }
    });

    $("#entrarPersona").click(function(){
        var url = 'template/pages/homepersona.html';
        var idContent = 'content-main';
        loadZone(url, idContent);

    });

})












