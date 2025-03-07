$(function(){

   

    loadHeader();
    {
        var url = 'template/headerAdmin.html';
        var idContent = 'content-header';
        loadZone(url, idContent);
       
    };

    $("#personaAdmin").click(function(){
        $("#MenuPersona").removeClass('d-none');   
        $(this).removeClass('btn btn-outline-primary').addClass('btn btn-success');
        $('#grupo2', 'restauranteAdmin').addClass('d-none');

         
    });

    $('')
    
    



    $("#atras").click(function(){
        loadHeader();{
        var url = 'template/header.html';
        var idContent = 'content-header';
       loadZone(url, idContent);
       }
    });

})












