var municipios = "";
var departamentos = "";
var listaPersonas = "";
var listadopersonas = "";
var listaRol = "";
var listahoteles = "";
var listaTransportes = "";
var listaatracciones = "";
var listarestaurantes = "";
var paquetes = "";


var validMethods = ["GET", "POST", "PUT", "DELETE"];

function loadZone(pathOrigin, idElement) {
  const numeroAleatorio = Math.random();
  $.ajax({
    url: pathOrigin + "?n=" + numeroAleatorio,
    type: "GET",
    success: function (result) {
      $("#" + idElement).html(result);
    },
    error: function (xhr, status, error) {},
  });
}
function loadHeader(root) {
  root = root === null || root === undefined ? "" : root;
  var url = "template/" + root + "header.html";
  var idContent = "content-header";
  loadZone(url + "?e=h", idContent);
}
function loadFooter(root) {
  root = root === null || root === undefined ? "" : root;
  var url = "template/" + root + "footer.html";
  var idContent = "content-footer";
  loadZone(url + "?e=f", idContent);
}
function loadPage(page, root, variables) {
  variables =
    variables === null || variables === undefined || variables === ""
      ? "t=1"
      : variables;
  root = root === null || root === undefined ? "" : root;
  var url = "template/" + root + "pages/" + page + ".html";
  var idContent = "content-main";
  loadZone(url + "?" + variables, idContent);
}
function getPage(currentPage, root) {
  currentPage = currentPage === null ? defaultPage : currentPage;
  loadPage(currentPage, root);
  $("#btn-" + currentPage).addClass("active");
}
function callApi(url, method, data, cbSuccess, cbError) {
  console.log("callApi :: " + method + " :: " + url);
  isPresent = validMethods.find(function (item) {
    return item === method;
  });
  if (isPresent === "") {
    alert("Metodo " + method + "No permitido");
    return;
  }
  var jsonData = "";
  if (method === "POST" || method === "PUT") {
    jsonData = JSON.stringify(data);
  }

  $.ajax({
    url: url,
    type: method,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: jsonData,
    headers: {
      Authorization: "token123",
    },
    success: function (result) {
      try {
        cbSuccess(result);
      } catch (e) {
        console.log("Error en cbSuccess", e);
      }
    },
    error: function (xhr, status, error) {
      try {
        console.log(error);
        cbError(xhr.status);
      } catch (e) {
        cbErrorBase(xhr.status);
        console.log("Error en cbError", e);
      }
    },
  });
}
function cbErrorBase(error) {
  alert("El llamado al servidor fallo " + error);
}
function openLoader() {
  $("#xmask").addClass("show");
}
function closeLoader() {
  $("#xmask").removeClass("show");
}
function addAlert(msg, type, time = null) {
  if (time <= 0) {
    time = 5;
  }

  var id = "alert_" + getRandomInt(1000, 99999);

  var html =
    '<div id="' +
    id +
    '" class="alert alert-' +
    type +
    '" role="alert" style="display:none">';
  html += msg;
  html += "</div>";

  $("#alerts").prepend($(html));
  $("#" + id).show("fast");

  time = time === null ? 5000 : time * 1000;

  window.setTimeout(function () {
    $("#" + id).hide("fast");
  }, time);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Inclusive of min and max
}
function cargarMunicipios(idDepartamento) {
  var html = "<option value=''> Seleccione ciudad </option>";

  for (var i = 0; i < municipios.length; i++) {
    var mun = municipios[i];
    if (parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
      html += "<option value='" + mun.id + "'>" + mun.name + "</option>";
    }
  }

  $("#slcMunicipio").html(html);
}
function redirectByLoginUser(logged) {
  var dataUser = localStorage.getItem("data-user");

  if (
    (dataUser === null || dataUser === undefined || dataUser === "") &&
    logged
  ) {
    window.location.replace("index.html");
    return;
  }

  if ((dataUser !== null) && !logged &&((dataUser.idrol)==1)) {
    window.location.replace("adminhome.html");
    return;
  }
  if ((dataUser !== null) && !logged &&((dataUser.idrol)==3)) {
    window.location.replace("indexTurista.html");
    return;
  }

  if (logged) {
    var objUser = JSON.parse(dataUser);
    console.log("USUARIO LOG", objUser);
    return objUser;
  }
}
var ifError = function (data) {
  addAlert("Se presento un error en el servidor", "danger", 8);
  closeLoader();
};
function cargardepartamentos() {
  var url = "http://localhost:8080/departamento";
  var method = "GET";
  var request = "";
  var ifSuccessdep = function (apiResponse) {
    console.log("departamento:response " + JSON.stringify(apiResponse));
    departamentos = apiResponse.data;
    console.log("departamos" + JSON.stringify(departamentos));
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccessdep, ifError);
}
function cargarmunicipiosbacken() {
  var urlmunicipio = "http://localhost:8080/municipio";
  var method2 = "GET";
  var request = "";
  var ifSuccessmunicipio = function (apiResponse) {
    municipios = apiResponse.data;
    closeLoader();
  };
  callApi(urlmunicipio, method2, request, ifSuccessmunicipio, ifError);
}
function cargarpersonas() {
  var url = "http://localhost:8080/persona";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("persona:response " + JSON.stringify(apiResponse));
    listaPersonas = apiResponse.data;
    console.log("lista persona" + JSON.stringify(listaPersonas));
    closeLoader();
    var html = "";

    for (var i = 0; i < listaPersonas.length; i++) {
      var per = listaPersonas[i];
      html += "<tr>";
      html += "<th scope='col'>" + (i + 1) + "</th>";
      html += "<td>" + per.primerNombre + "</td>";
      html += "<td>" + per.primerApellido + "</td>";
      html += "<td>" + per.celular + "</td>";
      html +=
        "<td><div class='btns-editar'  data-id='" +
        per.id +
        "' ></div> <div class='btns-eliminar' data-id='" +
        per.id +
        "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
      html += "</tr>";
    }

    $("#table-persona tbody").html(html);
    $("#main-content-persona").show();

    closeLoader();
  };

  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargarhotel() {
  var url = "http://localhost:8080/hotel";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("hotel:response " + JSON.stringify(apiResponse));
    var listahotel = apiResponse.data;

    var html = "";

    for (var i = 0; i < listahotel.length; i++) {
      var hot = listahotel[i];
      html += "<tr>";
      html += "<th scope='col'>" + (i + 1) + "</th>";
      html += "<td>" + hot.nombre + "</td>";
      html += "<td>" + hot.municipio + "</td>";
      html += "<td>" + hot.celular + "</td>";
      html += "<td>" + hot.direccion + "</td>";
      html += "<td>" + hot.precio + "</td>";
      html +=
        "<td><div class='btns-editar'  data-id='" +
        hot.id +
        "' ></div> <div class='btns-eliminar' data-id='" +
        hot.id +
        "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
      html += "</tr>";
    }

    $("#table-hotel tbody").html(html);

    closeLoader();
  };

  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargarrestaurante() {
  var url = "http://localhost:8080/restaurante";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("restaurante:response " + JSON.stringify(apiResponse));
    var listarestaurante = apiResponse.data;

    var html = "";

    for (var i = 0; i < listarestaurante.length; i++) {
      var rest = listarestaurante[i];
      html += "<tr>";
      html += "<th scope='col'>" + (i + 1) + "</th>";
      html += "<td>" + rest.nombre + "</td>";
      html += "<td>" + rest.municipio + "</td>";
      html += "<td>" + rest.celular + "</td>";
      html += "<td>" + rest.direccion + "</td>";
      html += "<td>" + rest.precio + "</td>";
      html +=
        "<td><div class='btns-editar'  data-id='" +
        rest.id +
        "' ></div> <div class='btns-eliminar' data-id='" +
        rest.id +
        "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
      html += "</tr>";
    }

    $("#table-restaurante tbody").html(html);

    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargartransporte() {
  var url = "http://localhost:8080/transporte";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("transporte:response " + JSON.stringify(apiResponse));
    var listatransporte = apiResponse.data;
    var html = "";
    for (var i = 0; i < listatransporte.length; i++) {
      var rest = listatransporte[i];
      html += "<tr>";
      html += "<th scope='col'>" + (i + 1) + "</th>";
      html += "<td>" + rest.nombre + "</td>";
      html += "<td>" + rest.municipio + "</td>";
      html += "<td>" + rest.celular + "</td>";
      html += "<td>" + rest.precio + "</td>";
      html +=
        "<td><div class='btns-editar'  data-id='" +
        rest.id +
        "' ></div> <div class='btns-eliminar' data-id='" +
        rest.id +
        "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
      html += "</tr>";
    }
    $("#table-transporte tbody").html(html);
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargarlistapersonas() {
  var url = "http://localhost:8080/persona";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("persona:response " + JSON.stringify(apiResponse));
    listadopersonas = apiResponse.data;
    console.log("lista persona" + JSON.stringify(listadopersonas));
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargarrol() {
  var url = "http://localhost:8080/rol";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("rol:response " + JSON.stringify(apiResponse));
    listaRol = apiResponse.data;
    console.log("lista rol" + JSON.stringify(listaRol));
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargarusuario() {
  var url = "http://localhost:8080/usuario";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("usuario:response " + JSON.stringify(apiResponse));
    var listaUsuario = apiResponse.data;

    var html = "";

    for (var i = 0; i < listaUsuario.length; i++) {
      var lisu = listaUsuario[i];
      html += "<tr>";
      html += "<th scope='col'>" + (i + 1) + "</th>";
      html += "<td>" + lisu.persona + "</td>";
      html += "<td>" + lisu.login + "</td>";
      html += "<td>" + lisu.password + "</td>";
      html += "<td>" + lisu.rol + "</td>";
      html +=
        "<td><div class='btns-editar'  data-id='" +
        lisu.id +
        "' ></div> <div class='btns-eliminar' data-id='" +
        lisu.id +
        "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
      html += "</tr>";
    }
    $("#table-usuario tbody").html(html);

    closeLoader();
  };

  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargapersonayrol() {
  var html2 = "<option value=''> Seleccione Rol </option>";
  for (var i = 0; i < listaRol.length; i++) {
    var lisrol = listaRol[i];
    html2 += "<option value='" + lisrol.id + "'>" + lisrol.nombre + "</option>";
  }
  $("#slcRol").html(html2);

  var html = "<option value=''> Seleccione Persona </option>";
  for (var i = 0; i < listadopersonas.length; i++) {
    var lisp = listadopersonas[i];
    html +=
      "<option value='" +
      lisp.id +
      "'>" +
      lisp.primerNombre +
      " " +
      lisp.primerApellido +
      "</option>";
  }
  $("#slcPersona").html(html);
  $("#main-content-usuario").show();
  $("#main-content-header").hide();

  closeLoader();
}
function cargaratracciones() {
  var url = "http://localhost:8080/atraccion";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("atracciones:response " + JSON.stringify(apiResponse));
    var listaAtracciones = apiResponse.data;
    var html = "";
    for (var i = 0; i < listaAtracciones.length; i++) {
      var lisa = listaAtracciones[i];
      html += "<tr>";
      html += "<th scope='col'>" + (i + 1) + "</th>";
      html += "<td>" + lisa.nombre + "</td>";
      html += "<td>" + lisa.idMunicipio + "</td>";
      html += "<td>" + lisa.celular + "</td>";
      html += "<td>" + lisa.precio + "</td>";
      html +=
        "<td><div class='btns-editar'  data-id='" +
        lisa.id +
        "' ></div> <div class='btns-eliminar' data-id='" +
        lisa.id +
        "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
      html += "</tr>";
    }
    $("#table-atraccion tbody").html(html);
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function cargarpaquetes() {
  var url = "http://localhost:8080/paquete";
  var method = "GET";
  var request = "";
  var ifSuccesspersona = function (apiResponse) {
    console.log("paquete:response " + JSON.stringify(apiResponse));
    var listaPaquetes = apiResponse.data;
    console.log("lista persona" + JSON.stringify(listaPaquetes));
    var html = "";
    for (var i = 0; i < listaPaquetes.length; i++) {
      var paq = listaPaquetes[i];
      html += "<tr>";
      html += "<th scope='col'>" + (i + 1) + "</th>";
      html += "<td>" + paq.nombre + "</td>";
      html += "<td>" + paq.clase + "</td>";
      html += "<td>" + paq.descripcion + "</td>";
      html += "<td>" + paq.idMunicipio + "</td>";
      html += "<td>" + paq.hotel + "</td>";
      html += "<td>" + paq.restaurante + "</td>";
      html += "<td>" + paq.transporte + "</td>";
      html += "<td>" + paq.atraccion + "</td>";
      html += "<td>" + paq.precioDia + "</td>";
      html += "<td>" + paq.descuento + "</td>";
      html +=
        "<td><div class='btns-editar'  data-id='" +
        paq.id +
        "' ></div> <div class='btns-eliminar' data-id='" +
        paq.id +
        "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
      html += "</tr>";
    }
    $("#table-paquete tbody").html(html);
    $("#main-content-paquete").show();
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccesspersona, ifError);
}
function obtenerlistahoteles() {
  var url = "http://localhost:8080/hotel";
  var method = "GET";
  var request = "";
  var ifSuccess = function (apiResponse) {
    console.log("hotel:response " + JSON.stringify(apiResponse.data));
    listahoteles = apiResponse.data;
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccess, ifError);
}
function obtenerlistarestaurante() {
  var url = "http://localhost:8080/restaurante";
  var method = "GET";
  var request = "";
  var ifSuccess = function (apiResponse) {
    console.log("restaurante:response " + JSON.stringify(apiResponse));
    listarestaurantes = apiResponse.data;
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccess, ifError);
}
function obtenerlistatransportes() {
  var url = "http://localhost:8080/transporte";
  var method = "GET";
  var request = "";
  var ifSuccess = function (apiResponse) {
    console.log("transportes:response " + JSON.stringify(apiResponse.data));
    listaTransportes = apiResponse.data;
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccess, ifError);
}
function obtenerlistaatracciones() {
  var url = "http://localhost:8080/atraccion";
  var method = "GET";
  var request = "";
  var ifSuccess = function (apiResponse) {
    console.log("atracciones:response " + JSON.stringify(apiResponse.data));
    listaatracciones = apiResponse.data;
    closeLoader();
  };
  openLoader();
  callApi(url, method, request, ifSuccess, ifError);
}
function cargarutilidades() {
  var html2 = "<option value=''data-precio = '0'> Seleccione hotel </option>";
  for (var i = 0; i < listahoteles.length; i++) {
    var lishot = listahoteles[i];
    if (parseInt(idmunicipio) === parseInt(lishot.idMunicipio)) {
      html2 +=
        "<option value='" +
        lishot.id +
        "'data-precio='" +
        lishot.precio +
        "'>" +
        lishot.nombre +
        "</option>";
    }
  }
  var html3 =
    "<option value='' data-precio = '0'> Seleccione transporte </option>";
  for (var i = 0; i < listaTransportes.length; i++) {
    var listra = listaTransportes[i];
    if (parseInt(idmunicipio) === parseInt(listra.idMunicipio)) {
      html3 +=
        "<option value='" +
        listra.id +
        "'data-precio='" +
        listra.precio +
        "'>" +
        listra.nombre +
        "</option>";
    }
  }
  var html5 =
    "<option value=''data-precio = '0'> Seleccione atraccion </option>";
  for (var i = 0; i < listarestaurantes.length; i++) {
    var lisres = listarestaurantes[i];

    if (parseInt(idmunicipio) === parseInt(lisres.idMunicipio)) {
      html5 +=
        "<option value='" +
        lisres.id +
        "'data-precio='" +
        lisres.precio +
        "'>" +
        lisres.nombre +
        "</option>";
    }
  }

  var html4 = "<option value='' data-precio = '0' > seleccione </option>";
  for (var i = 0; i < listaatracciones.length; i++) {
    var lisatr = listaatracciones[i];
    if (parseInt(idmunicipio) === parseInt(lisatr.idMunicipio)) {
      html4 +=
        "<option value='" +
        lisatr.id +
        "'data-precio='" +
        lisatr.precio +
        "'>" +
        lisatr.nombre +
        "</option>";
    }
  }

  $("#slcTransporte").html(html3);
  $("#slcAtraccion").html(html4);
  $("#slcHotel").html(html2);
  $("#slcRestaurante").html(html5);
  console.log("estado cargarutilidades esxitoso");
}
function cargarutilidadestodo() {
  var html2 = "<option value=''data-precio = '0'> Seleccione hotel </option>";
  for (var i = 0; i < listahoteles.length; i++) {
    var lishot = listahoteles[i];

    html2 +=
      "<option value='" +
      lishot.id +
      "'data-precio='" +
      lishot.precio +
      "'>" +
      lishot.nombre +
      "</option>";
  }
  var html3 =
    "<option value='' data-precio = '0'> Seleccione transporte </option>";
  for (var i = 0; i < listaTransportes.length; i++) {
    var listra = listaTransportes[i];

    html3 +=
      "<option value='" +
      listra.id +
      "'data-precio='" +
      listra.precio +
      "'>" +
      listra.nombre +
      "</option>";
  }
  var html5 =
    "<option value=''data-precio = '0'> Seleccione atraccion </option>";
  for (var i = 0; i < listarestaurantes.length; i++) {
    var lisres = listarestaurantes[i];

    html5 +=
      "<option value='" +
      lisres.id +
      "'data-precio='" +
      lisres.precio +
      "'>" +
      lisres.nombre +
      "</option>";
  }

  var html4 = "<option value='' data-precio = '0' > seleccione </option>";
  for (var i = 0; i < listaatracciones.length; i++) {
    var lisatr = listaatracciones[i];

    html4 +=
      "<option value='" +
      lisatr.id +
      "'data-precio='" +
      lisatr.precio +
      "'>" +
      lisatr.nombre +
      "</option>";
  }

  $("#slcTransporte").html(html3);
  $("#slcAtraccion").html(html4);
  $("#slcHotel").html(html2);
  $("#slcRestaurante").html(html5);
  console.log("estado cargarutilidades esxitoso");

}
function cargarPaquetesPromocionales() {  
  var url = "http://localhost:8080/paquete";
  var method = "GET";
  var request = "";
  var ifSuccesspaquete = function (apiResponse) {
    paquetes = apiResponse.data;
    console.log("paquete:response " + JSON.stringify(apiResponse));
    $("#content-main").empty();
   
    let row = $("<div class='row g-4 rounded-3'></div>"); // Contenedor de filas
    paquetes.forEach((paquete, index) => {
        let card = `
            <div class="col-md-3 rounded-3"> <!-- 4 tarjetas por fila -->
                <div class="card deltatur-card rounded-3">
                    <div class="deltatur-card-header rounded-2">
                        <h5 class="card-title rounded-2">${paquete.nombre}</h5>
                    </div>
                    <div class="card-body text-center rounded-1">
                        <p class="card-text"><strong>Descripción:</strong> ${paquete.descripcion}</p>
                        <p class="card-text"><strong>Precio:</strong> $${paquete.precioDia}</p>
                        <p class="card-text"><strong>Descuento:</strong> ${paquete.descuento}%</p>
                    </div>
                    <div class="deltatur-card-footer rounded-2">
                        <button class="btn btn-primary btn-paquete" data-id = '${paquete.id}'>Reservar ahora</button>
                    </div>
                </div>
            </div>`;
        row.append(card); // Agrega tarjeta a la fila

        // Cada 4 tarjetas, se cierra la fila y se inicia una nueva
        if ((index + 1) % 4 === 0) {
            $("#content-main").append(row); // Agregar la fila al contenedor
            row = $("<br><div class='row g-4 rounded-3'></div>"); // Nueva fila
        }
    });
    // Agregar la última fila si tiene menos de 4 elementos
    if (row.children().length > 0) {
        $("#content-main").append(row);
    }
    let botonAgregar = `
    <div class="text-center mt-4">
        <button id="agregarPaqueteBtn" class="btn btn-success">Crear Paquete</button>
    </div>`;
$("#content-main").append(botonAgregar);
    closeLoader();
  }
  openLoader();
  callApi(url, method, request, ifSuccesspaquete, ifError);
}



  

