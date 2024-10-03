var current_user = null;

$(document).ready(function(){

    cargarLugar();
    validateParamUser();

    $("#frm1").submit(function(e){

        $("#frm1 input, #frm1 select").each(function(index){
            if($(this).val()==='') {
                $(this).addClass("error");
            }
        });

        /*if(!$("input[name=rdGenero]:checked")) {
            $("input[name=rdGenero]").addClass("error");
        }*/

        var cantidadErrores = $("#frm1 .error").length;
        if(cantidadErrores > 0) {
            alert("Valide los datos ingresados!");
            return false;
        }

        var usuario = {
            "nombre": $("#txtNombre").val(),
            "TipoDePaquete": $("#slcTipoDePaquete").val(),
            "LugarDestino": $("#slcLugar").val(),
            "Restaurante": $("#slcRestaurante").val(),
            "Transporte": $("#slcTransporte").val(),
            "Aturistica": $("#slcAtTuristica").val(),
            "Npersonas": $("#slcCantDePersonas").val(),
            "Hotel": $("#slcHotel").val(),
           
        };

        var usuarios = [];
        var localJsonData = localStorage.getItem("usuarios");
        if(localJsonData) {
            usuarios = JSON.parse(localJsonData);
        } 

        usuarios.push(usuario);
        localJsonData = JSON.stringify(usuarios);
        localStorage.setItem("usuarios", localJsonData);

        alert("El registro se ha agregado exitosamente!");

        $("#frm1 button[type=reset]").click();

        return false;
    });

    $("#frm1 input").on("keyup", function(i) {
        $(this).removeClass("error");
    });

    $("#frm1 select, #frm1 input[type='date']").on("change", function(i) {
        $(this).removeClass("error");
    });

    $("#slcLugar").on("change", function(){
        if($(this).val() === "") {
            $("#slcHotel").html(""),
            $("#slcRestaurante").html(""),
            $("#slcAtTuristica").html(""),
            $("#slcTransporte").html("");
        } else {            
            cargarHotel($(this).val()),
            cargarRestaurante($(this).val()),
            cargarAturista($(this).val()),
            cargarTransporte($(this).val());
        }
    });

});

function validateParamUser() {
    var paramId = getParameterByName('id_usuario');
    if(paramId === "") {
        return;
    }

    paramId = parseInt(paramId);
    
    var usuarios = getUsuarios();
    if(paramId < 0 || paramId >= usuarios.length) {
        alert("El parametro ingresado es incorrecto");
        window.location.href = "lista-usuarios.html";
        return;
    }

    var currentUser = usuarios[paramId];
    $("#txtNombre").val(currentUser.nombre);
    $("#txtApellido").val(currentUser.apellido);
    $("#txtCorreo").val(currentUser.correo);
    $("#txtTelefono").val(currentUser.telefono);
    $("#slcTipoIdentificacion").val(currentUser.tipoIdentificacion);
    $("#txtIdentificacion").val(currentUser.identificacion);
    $("#dateFechaNacimiento").val(currentUser.fechaNacimiento);
    $("#rangeCantidadVehiculos").val(currentUser.cantidadVehiculos);
    $("#txtDireccion").val(currentUser.direccion);
    $("#colorFavorito").val(currentUser.color);

    if(currentUser.genero === 'F') {
        $('#rdGenero1').prop('checked',true);
    } else if (currentUser.genero === 'M') {
        $('#rdGenero2').prop('checked',true);
    } else {
        $('#rdGenero3').prop('checked',true);
    }

    if(currentUser.esPropietario) {
        $('#ckbEsPropietario').prop('checked',true);
    }


    window.setTimeout(function(){
        $("#slcDepartamento").val(currentUser.departamento);
        $("#slcDepartamento").change();

        window.setTimeout(function(){
            $("#slcCiudad").val(currentUser.ciudad);
        }, 500);


    }, 500)
    
}

function cargarHotel(idDepartamento){
    var html = "<option value=''> Seleccione hotel </option>";

    for(var i = 0; i < hotel.length; i++) {
        var mun = hotel[i];
        if(parseInt(idDepartamento) === parseInt(mun.id_dep)) {
            html += "<option value='" + mun.id + "'>" + mun.name + "</option>";
        }
    }

    $("#slcHotel").html(html);
    }
    function cargarRestaurante(idDepartamento){
        var html = "<option value=''> Seleccione restaurante </option>";
    
        for(var i = 0; i < restuarante.length; i++) {
            var mun = restuarante[i];
            if(parseInt(idDepartamento) === parseInt(mun.id_dep)) {
                html += "<option value='" + mun.id + "'>" + mun.name + "</option>";
            }
        }
    
        $("#slcRestaurante").html(html);
    }
    function cargarAturista(idDepartamento){
        var html = "<option value=''> Seleccione Atrancion turistica </option>";
    
        for(var i = 0; i < AtTuristica.length; i++) {
            var mun = AtTuristica[i];
            if(parseInt(idDepartamento) === parseInt(mun.id_dep)) {
                html += "<option value='" + mun.id + "'>" + mun.name + "</option>";
            }
        }
    
        $("#slcAtTuristica").html(html);
    }
    function cargarTransporte(idDepartamento){
        var html = "<option value=''> Seleccione Atrancion turistica </option>";
    
        for(var i = 0; i < transportes.length; i++) {
            var mun = transportes[i];
            if(parseInt(idDepartamento) === parseInt(mun.id_dep)) {
                html += "<option value='" + mun.id + "'>" + mun.name + "</option>";
            }
        }
    
        $("#slcTransporte").html(html);
    }
function cargarLugar(){
    var html = "<option value=''> Seleccione lugar </option>";

    for(var i = 0; i < lugar.length; i++) {
        var dep = lugar[i];
        html += "<option value='" + dep.id + "'>" + dep.name + "</option>";
    }

    $("#slcLugar").html(html);
} 
