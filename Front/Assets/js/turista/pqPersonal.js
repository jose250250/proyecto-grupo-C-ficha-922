var reserva ="";
$(function(){
    $("#txtTitulo").hide();
    if(departamentos===""){
        cargardepartamentos();
    }
    if(municipios === ""){
        cargarmunicipiosbacken();
    }
window.setTimeout(function(){
var htmldep = "<option value=''> Seleccione departamento </option>";
for (var i = 0; i < departamentos.length; i++) {
   var dep = departamentos[i];
   htmldep += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
  };
$("#slcDepartamento").html(htmldep);
$("#slcDepartamento").on("change", function () {
    var idDepartamento = ($(this).val());
    var html = "<option value=''> Seleccione Municipio </option>";
    for(var i = 0; i < municipios.length; i++) {
        var mun = municipios[i];
        if(parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
          html += "<option value='" + mun.id + "'>" + mun.municipio + "</option>";
          }
      }    
      $("#slcMunicipio").html(html);
  });
},1000);
})

$("#frm-pqpersonal").submit(function (event) {
    event.preventDefault();
    var cantidadErrores = 0
    $("#frm-pqpersonal input, #frm-pqpersonal select").each(function (i) {
        if ($(this).val() === '') {
            cantidadErrores++
        };
    });
    console.log("cant errores" + cantidadErrores);
    if (cantidadErrores == 0)  {
        reserva = {
            "idPersona": parseInt(localStorage.getItem("turista")),
            "idMunicipio": $("#slcMunicipio").val(),
            "municipio": $("#slcMunicipio option:selected").text(),          
            "fechaInicio": $("#fechaInicio").val(),               
            "fechaFinal": $("#fechaFinal").val(),
            "CantDias":$("#CantDias").val()              
        };
        loadPage("paquetePersonal2",turPath);
           var municipioSeleccionado =  $("#slcMunicipio option:selected").text();
            actualizarResumen("municipio", municipioSeleccionado);
        console.log("var:reserva::"+reserva);
    }
});
$(document).on("change", "#fechaInicio, #fechaFinal", function () {
    let inicio = new Date($("#fechaInicio").val());
    let final = new Date($("#fechaFinal").val());
    if (inicio && final && !isNaN(inicio) && !isNaN(final)) {
        let diferencia = Math.abs(final - inicio); // Diferencia en milisegundos
        let dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24)); // Convertir a días
        $("#CantDias").val(dias); // Asignar resultado al input
    }
        var total = ($("#precio").val())*($("#CantDias").val())
        $("#totalpaq").val(total);
    
});
$("#atras").click(function(){
    loadPage("home",turPath);

})
