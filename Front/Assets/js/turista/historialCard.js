var emunicipio = "";
var historialEdit = "";
var municipioid = "";
var iddep = "";


var personaid = localStorage.getItem("turista");

$(function(){   
    cargarhistorialcard(personaid);
    $("#divBntAgragar").attr("style", "display: none !important");
    $("#txtTitulo").attr("style", "display: none !important");
   
   
    $("#Atras").click(function(){
        page = "home";
        loadPage(page, turPath); 
         $("#txtTitulo").attr("style", "display: block !important");
    });
});


$(document).on("click", ".completar-btn", function () {
       paqueteelegido =  $(this).data('id');


     loadPage("paquetepersonal7",turPath);
   
    
   
          
});  
      
     

