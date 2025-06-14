$(function(){
  paqueteelegido = localStorage.getItem("paqueteelegido");

     let numeroAleatorio = Math.floor(100000 + Math.random() * 900000);
  $("#codigo").text(reservaelegida.paquete + "-" + numeroAleatorio);
  $("#monto").text(`$${reservaelegida.precioTotal}`);
})
$("#btnEnviar").on("click", function(){

  if (!$("#vaucher").val()) {
    alert("Debe subir una imagen del voucher.");
}else{
      reservaProm = {
        idPersona: reservaelegida.idPersona,
        idPaquete: reservaelegida.idPaquete,
        estado: "en-proceso",
        registro: new Date().toISOString(),
        motivo: "fecha de pago del usuario",
        precioTotal: reservaelegida.precioTotal
      }
    
        const formData = new FormData();
        formData.append("dto", new Blob([JSON.stringify(reservaProm)], { type: "application/json" }));
        
      const archivo = $("#vaucher")[0].files[0];
      if (archivo) {
      formData.append("file", archivo);
    }
        const method = "PUT";
        const url = "http://localhost:8080/dperpaquete/"+paqueteelegido;
         console.log("url:::"+url);
         const ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
                localStorage.setItem("paqueteelegido", "");
                addAlert("Su voucher fue cargado correctamente, espere su confirmacion", "info", 8);
                 loadPage("historialCard",turPath);
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
    });

}
})