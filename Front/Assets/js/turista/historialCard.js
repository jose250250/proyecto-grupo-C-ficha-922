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
      localStorage.setItem("paqueteelegido",  $(this).data('id'));
     loadPage("paquetepersonal7",turPath);
});  
$(document).on("click", ".cancelar-btn", function () {
      localStorage.setItem("paqueteelegido",  $(this).data('id'));
    var paqEleg =  $(this).data('id');
    let reservaPer = $.grep(historial, function (paquete) {
    return paquete.id === paqEleg;
    })
    console.log("reservaper:::" , reservaPer);

    reservaPer[0].estado = "cancelado";

    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(reservaPer)], { type: "application/json" }));

     const method = "PUT";
        const url = "http://localhost:8080/dperpaquete/"+paqEleg;
         console.log("url:::"+url);
         const ifSuccess = function (apiResponse) {
        addAlert("el paquete fue cancelado", "success", 3);
                localStorage.setItem("paqueteelegido", "");
                 cargarhistorialcard(personaid);
               
               
                closeLoader();
    };

    const ifErrorLogin = function (data) {
                addAlert("Se presentó un error en el servidor", "danger", 8);
                closeLoader();
    };

    openLoader();

    $.ajax({
        url: url,
        type: method,
        data: formData,
        processData: false,
        contentType: false,
        success: ifSuccess,
        error: ifErrorLogin
    })

    
    
   
          
}); 
      
     

