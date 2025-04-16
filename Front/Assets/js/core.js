var municipios = "";
var departamentos = "";
var listaPersonas = ""; 


var validMethods = ["GET", "POST", "PUT", "DELETE"];

function loadZone(pathOrigin, idElement){
    const numeroAleatorio = Math.random(); 
    $.ajax({
        url: pathOrigin + "?n=" + numeroAleatorio,
        type: "GET",
        success: function (result) {
            $("#"+idElement).html(result);
        },
        error: function (xhr, status, error) {
        }
    });

};

function loadHeader(root){
    root = root===null || root === undefined? "": root;
    var url = 'template/'+root+'header.html';
    var idContent = 'content-header';
    loadZone(url+"?e=h", idContent);
}

function loadFooter(root){
    root = root===null || root === undefined? "": root;
    var url = 'template/'+root+'footer.html';
    var idContent = 'content-footer';
    loadZone(url+"?e=f", idContent);
}

function loadPage(page, root, variables) {
    variables = variables===null || variables === undefined || variables === "" ? "t=1" : variables;
    root = root===null || root === undefined ? "": root;
    var url = 'template/'+root+'pages/'+page+'.html';
    var idContent = 'content-main';
    loadZone(url+"?"+variables, idContent);
}

function getPage(currentPage, root){
    currentPage = currentPage === null ? defaultPage : currentPage;
    loadPage(currentPage,root);
    $("#btn-"+currentPage).addClass('active');
}

function callApi(url, method, data, cbSuccess, cbError) {

    console.log("callApi :: " + method + " :: " + url);
    isPresent = validMethods.find(function(item){
        return item === method;
    });
    if(isPresent === "") {
        alert("Metodo " + method + "No permitido");
        return;
    }
    var jsonData = "";
    if(method === "POST" || method === "PUT") {
        jsonData = JSON.stringify(data);
    }

    $.ajax({
        url: url,
        type: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData, 
        headers: {
            'Authorization':'token123'
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
        }
    });
}

function cbErrorBase(error) {
    alert("El llamado al servidor fallo " + error);
}


function openLoader(){
    $("#xmask").addClass('show');
}

function closeLoader(){
    $("#xmask").removeClass('show');
}

function addAlert(msg, type, time = null){
    if(time <= 0) {
        time = 5;
    }

    var id = "alert_" + getRandomInt(1000, 99999);

    var html = '<div id="'+id+'" class="alert alert-'+type+'" role="alert" style="display:none">';
    html += msg;
    html += "</div>"

    $("#alerts").prepend($(html));
    $("#"+id).show('fast');

    time = time===null ? 5000 : time * 1000;

    window.setTimeout(function(){
        $("#"+id).hide('fast');
    }, time);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Inclusive of min and max
  }

  function cargarMunicipios(idDepartamento){
    var html = "<option value=''> Seleccione ciudad </option>";

    for(var i = 0; i < municipios.length; i++) {
        var mun = municipios[i];
        if(parseInt(idDepartamento) === parseInt(mun.idDepartamento)) {
            html += "<option value='" + mun.id + "'>" + mun.name + "</option>";
        }
    }

    $("#slcMunicipio").html(html);
}
function redirectByLoginUser(logged) {
    var dataUser = localStorage.getItem("data-user"); 

    if((dataUser === null || dataUser === undefined || dataUser === "") && logged ) {
        window.location.replace("index.html");
        return;
    }

    if((dataUser !== null) && !logged ) {
        window.location.replace("adminhome.html");
        return;
    }

    if(logged) {
        var objUser = JSON.parse(dataUser);
        console.log("USUARIO LOG", objUser);
        return objUser;
    }
}
var ifError = function (data) {
    addAlert("Se presento un error en el servidor", "danger", 8);
    closeLoader();
};
function cargardepartamentos(){
    var url = "http://localhost:8080/departamento";
        var method = "GET";
        var request = "";
        var ifSuccessdep = function (apiResponse) {
            console.log("departamento:response " + JSON.stringify(apiResponse));
            departamentos = (apiResponse.data);
            console.log("departamos" + JSON.stringify(departamentos));
            closeLoader()          
        }  
        openLoader();
        callApi(url, method, request, ifSuccessdep, ifError);
    };
function cargarmunicipiosbacken(){
    var urlmunicipio = "http://localhost:8080/municipio";
    var method2 = "GET";
    var request = "";
    var ifSuccessmunicipio = function (apiResponse) {
        municipios = (apiResponse.data);
        closeLoader();      
    }   
    callApi(urlmunicipio, method2, request, ifSuccessmunicipio, ifError);
}  

function cargarpersonas(){
    var url = "http://localhost:8080/persona";
    var method = "GET";
    var request = "";
    var ifSuccesspersona = function (apiResponse) {
        console.log("persona:response " + JSON.stringify(apiResponse));
        listaPersonas = (apiResponse.data);
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
            html += "<td><div class='btns-editar'  data-id='" + per.id + "' ></div> <div class='btns-eliminar' data-id='" + per.id + "'data-bs-toggle='modal' data-bs-target='#eliminarmodal' ></div></td>";
            html += "</tr>";
        };

        $("#table-persona tbody").html(html);
        $("#main-content-persona").show();

        closeLoader();

    }

    
    openLoader();
    callApi(url, method, request, ifSuccesspersona, ifError);
};


