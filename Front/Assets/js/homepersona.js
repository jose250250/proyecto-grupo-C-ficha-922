$(function () {
    
    $("#btnradio1").click(function () { 
        var url = "http://localhost:8080/departamento"; 
        var method = "GET"; 
        var request = ""; 
        var ifSuccessLogin = function (apiResponse){  
            console.log("departamento:response " + JSON.stringify(apiResponse)); 
            var departamentos = (apiResponse.data); 
            console.log("departamos" + JSON.stringify(departamentos));

          
                var html = "<option value=''> Seleccione departamento </option>";
            
                for(var i = 0; i < departamentos.length; i++) {
                    var dep = departamentos[i];
                    html += "<option value='" + dep.id + "'>" + dep.departamento + "</option>";
                }
            
                $("#slcDepartamento").html(html);
                $("#main-content-persona").show();
                
                closeLoader();

          
          
        
        }
       
        var ifErrorLogin = function (data) {
            addAlert("Se presento un error en el servidor", "danger", 8);
            closeLoader();
        };

        openLoader();
        callApi(url, method, request, ifSuccessLogin, ifErrorLogin);
               

          

        });

        $("#btnradio2").click(function(){
            loadPage("listaPersonas");
        })

    });
  