$(function(){
    $("#frm1").submit(function(){
       

        $("#frm1 input").each(function(){
            if($(this).val()==='') {
                $(this).addClass("error");
            }
        });

        /*if(!$("input[name=rdGenero]:checked")) {
            $("input[name=rdGenero]").addClass("error");
        }*/

        var cantidadErrores = $("#frm1 .error").length;
        if(cantidadErrores > 0) {
            alert("debe completar todos los campos!");
            return false;
            
        }
       
        if (($("#valida1").val()=== "admin@admin.com")&($("#valida2").val()=== "admin"))
             { 
                window.open("pg-administrador.html");
             }
                else {
                alert( "datos incorrectos");

                }
               
             })
             



  
    
  


$("#frm1 input").on("keyup", function() {
    $(this).removeClass("error");
});


});




