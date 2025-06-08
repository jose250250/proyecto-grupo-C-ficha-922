$(function(){

     let numeroAleatorio = Math.floor(100000 + Math.random() * 900000);
  $("#codigo").text(paqueteEdit.nombre + "-" + numeroAleatorio);
  $("#monto").text(`$${paqueteEdit.precioDia}`);
})