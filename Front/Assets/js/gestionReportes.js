$(function(){
    cargarlugaresfavaritos();
     $("#txtGestion").text("Reportes");

 



})
 $("#atras").click(function(){
     loadPage("homeAdmin",admin);
      $("#txtGestion").text("Gestion por Modulos");
    });
