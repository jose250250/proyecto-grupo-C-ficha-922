var lugar = [
    {id:1, name: "Coveñas"},
    {id:2, name: "Santa Marta"},
    {id:3, name: "Tulo"},
    {id:4, name: "Cartagena"},
    {id:5, name: "Arboletes"},
];

var hotel = [
    {id:1, name: "Hotel las palmeras", id_dep: 1},
    {id:2, name: "Hotel puerta de oro", id_dep: 1},
    {id:3, name: "Hotel cartagena", id_dep: 2},
    {id:4, name: "Hotel san juan", id_dep: 2},
    {id:2, name: "Hotel marsella", id_dep: 2},
    {id:6, name: "Hotel San jose", id_dep: 3},
    {id:7, name: "Hotel la abuela", id_dep: 3},
    {id:8, name: "Hotel karolina real", id_dep: 3},
    {id:10, name: "Hotel hsb", id_dep: 1},
    {id:11, name: "Hotel holliday", id_dep: 4},
    {id:12, name: "Hotel gran turismo", id_dep: 3},
    {id:13, name: "Hotel la troncal", id_dep: 4},
    {id:14, name: "Hotel san sebastian", id_dep: 3},
    {id:15, name: "Hotel tolu", id_dep: 5},
];

var restuarante = [
    {id:1, name: "Delicias spress", id_dep: 1},
    {id:2, name: "La sazon de la abuela", id_dep: 1},
    {id:3, name: "La cuchara de palo", id_dep: 3},
    {id:4, name: "La trinchera", id_dep: 4},
    {id:5, name: "La sazon de la abuela", id_dep: 5},
    {id:6, name: "La cuchara", id_dep: 2},
    {id:7, name: "Delicias san gil", id_dep: 1},
    {id:8, name: "San juan", id_dep: 3},
    {id:9, name: "El fogon", id_dep: 4},
    {id:10, name: "Pollo frito", id_dep: 5},
    {id:11, name: "Rico pollo", id_dep: 1},
    {id:12, name: "La ZAzon.com", id_dep: 2},
];

var AtTuristica = [
    {id:1, name: "Volcan de lodo", id_dep: 1},
    {id:2, name: "La ronda del sinu", id_dep: 1},
    {id:3, name: "Las cataratas", id_dep: 3},
    {id:4, name: "La Los mangares", id_dep: 4},
    {id:5, name: "Isla bomba", id_dep: 5},
    {id:6, name: "Isla fuerte", id_dep: 2},
    {id:7, name: "Volcan de arena", id_dep: 1},
    {id:8, name: "Playa sola", id_dep: 3},
    {id:9, name: "Las murallas", id_dep: 4},
    {id:10, name: "El castillo de san felipe", id_dep: 5},
    {id:11, name: "Boca grande", id_dep: 1},
    {id:12, name: "Castillo grande", id_dep: 2},
];

var transportes = [
    {id:1, name: "Transporte Luz", id_dep: 1},
    {id:2, name: "Transcaribe", id_dep: 2},
    {id:3, name: "transport tur", id_dep: 3},
    {id:4, name: "Travaloz", id_dep: 4},
    {id:5, name: "sotracor", id_dep: 5},
];



function getUsuarios(){
    var localJsonData = localStorage.getItem("usuarios");
    if(localJsonData) {
        var usuarios = JSON.parse(localJsonData);
        return usuarios;
    } else {
        return [];
    }
}

function saveUsuarios(usuarios) {
    var localJsonData = JSON.stringify(usuarios);
    localStorage.setItem("usuarios", localJsonData);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}