var indexpaquete = "";
var idmunicipiopaquete = "";
var idmunicipio = "";
var preciohotel = 0;
var preciorestaurante = 0;
var precioatraccion = 0;
var preciotransporte = 0;
admin = "admin/";
$(function () {
  indexpaquete = localStorage.getItem("idpaquete");
  idmunicipiopaquete = localStorage.getItem("idmunicipiopaquete");
  if(departamentos===""){
  cargardepartamentos();}
  if(municipios=== ""){
  cargarmunicipiosbacken();}
  if(listaatracciones === ""){
  obtenerlistaatracciones();}
  if(listahoteles===""){
  obtenerlistahoteles();}
  if(listaTransportes===""){
  obtenerlistatransportes();}
  if(listarestaurantes===""){
  obtenerlistarestaurante();}
  if ((idmunicipiopaquete === "")||(idmunicipiopaquete === null)){
    console.log("el si e sverdadero")
  }
  else{
    idmunicipio= localStorage.getItem("idmunicipiopaquete")
    console.log("idmunicipiopaquete:::"+ idmunicipiopaquete + " : idmunicipio:::"+ idmunicipio);
    cargarutilidadestodo();
  
  }
  $("#txtGestion").text("Administrar Modulo Paquete Turistico");
  
});
$("#ingresarPaquete").click(function () {
  var html = "<option value=''> Seleccione departamento </option>";
  for (var i = 0; i < departamentos.length; i++) {
    var dep = departamentos[i];
    html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
  }
  $("#slcDepartamento").html(html);
  $("#main-content-paquete").show();
  $("#main-content-header").attr("style", "display: none !important");
  $("#txtcabecera").text("Ingresar Nuevo Registro de Paquetes"); 
  $("#submitPaquete").text("Enviar"); 
  $("#frmPaquete")[0].reset();  
  closeLoader();
});
$("#verlistaPaquete").click(function () {
  loadPage("listapaquete", admin);
  cargarpaquetes();
});
$("#slcDepartamento").on("change", function () {
  var idDepartamento = $(this).val();
  if (municipios === "") {
    cargarmunicipiosbacken();
    var html = "<option value=''> Seleccione ciudad </option>";
    for (var i = 0; i < municipios.length; i++) {
      var mun = municipios[i];
      if (parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
        html += "<option value='" + mun.id + "'>" + mun.municipio + "</option>";
      }
      $("#slcMunicipio").html(html);
    }
  } else {
    var html = "<option value=''> Seleccione ciudad </option>";

    for (var i = 0; i < municipios.length; i++) {
      var mun = municipios[i];
      if (parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
        html += "<option value='" + mun.id + "'>" + mun.municipio + "</option>";
      }
      $("#slcMunicipio").html(html);
    }
  }
});
  $("#slcMunicipio").on("change", function () {
    idmunicipio = $(this).val();
    console.log("idmuniicpio:::" + idmunicipio);
    cargarutilidades();
  });
function calcularprecio() {
  var precioparcial =
    preciohotel + precioatraccion + preciorestaurante + preciotransporte;
  var descuento = (precioparcial * $("#descuento").val()) / 100;
  console.log("descuento:::" + descuento);
  preciototal = precioparcial - descuento;
  $("#precio").val(preciototal);
}
$("#descuento").on("keyup keydow click", function () {
  calcularprecio();
});
$("#slcHotel").on("change", function () {
  var selectedOption = $(this).find("option:selected");
  preciohotel = selectedOption.data("precio");
  console.log("preciohotel::" + preciohotel);
  calcularprecio();
});
$("#slcRestaurante").on("change", function () {
  var selectedOption = $(this).find("option:selected");
  preciorestaurante = selectedOption.data("precio");
  console.log("preciorestarante::" + preciorestaurante);
  calcularprecio();
});
$("#slcTransporte").on("change", function () {
  var selectedOption = $(this).find("option:selected");
  preciotransporte = selectedOption.data("precio");
  console.log("preciotransporte::" + preciotransporte);
  calcularprecio();
});
$("#slcAtraccion").on("change", function () {
  var selectedOption = $(this).find("option:selected");
  precioatraccion = selectedOption.data("precio");
  console.log("precioatraccon::" + precioatraccion);
  calcularprecio();
});
$("#frmPaquete").submit(function (event) {
  event.preventDefault();
  let cantidadErrores = 0;

  // Validación de inputs y selects con clase específica
  $("#frmPaquete").find("input.form-control, select.form-label-s").each(function () {
    if ($(this).val() === "") {
      cantidadErrores++;
    }
  });

  if ($("#frmPaquete").find("select.form-label-a").val() === "") {
    cantidadErrores++;
  }

  console.log("Errores:", cantidadErrores);
  console.log("index:", indexpaquete);

  if (cantidadErrores === 0) {
    // Construir el DTO
    const paqueteDto = {
      nombre: $("#txtNombre").val(),
      clase: $("#slcClasePaquete").val(),
      descripcion: $("#txtDescripcion").val(),
      idMunicipio: $("#slcMunicipio").val(),
      fechaInicio: $("#dateFechaInicio").val(),
      fechaFinal: $("#dateFechaFinal").val(),
      idHotel: $("#slcHotel").val(),
      idRestaurante: $("#slcRestaurante").val(),
      idTransporte: $("#slcTransporte").val(),
      idAtraccion: $("#slcAtraccion").val(),
      precioDia: $("#precio").val(),
      descuento: $("#descuento").val()
    };

    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(paqueteDto)], { type: "application/json" }));

    const archivo = $("#foto")[0].files[0];
    if (archivo) {
      formData.append("file", archivo);
    }

    // Opcional: mostrar datos enviados
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    // Determinar método y URL
    let method = indexpaquete ? "PUT" : "POST";
    let url = indexpaquete
      ? `http://localhost:8080/paquete/${indexpaquete}`
      : "http://localhost:8080/paquete";

    if (indexpaquete) localStorage.setItem("idpaquete", "");
    console.log("url:::"+ url);
    
    // Enviar la solicitud
    $.ajax({
      url: url,
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        addAlert("Paquete guardado con éxito", "success", 3);
          $("#main-content-paquete").hide();
          $("#main-content-header").show();
          $("#frmPaquete")[0].reset();
        closeLoader();
        // Opcional: limpiar formulario o recargar datos
      },
      error: function (err) {
        console.error("Error:", err);
        addAlert("Se presentó un error en el servidor", "danger", 8);
        
        closeLoader();
      }
    });
 

    $("#frmPaquete")[0].reset();
  } else {
    $("#frmPaquete input, #frmPaquete select").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("is-invalid");
      }
    });
    addAlert("valide los datos ingresados", "info", 2);
  }
});
$("#frmPaquete input, #frmPaquete select").on(
  "change keyup click",
  function () {
    $(this).removeClass("is-invalid");
  }
);
$("#atraspaquete").click(function () {
  $("#main-content-paquete").hide();
  $("#main-content-header").show();
  $("#frmPaquete")[0].reset();
 
});
$("#homeAdmin").click(function () {
  loadPage("homeAdmin", admin);
   $("#txtGestion").text("Gestion por Modulos");
});
