function resetModal() {
    $("#email, #password").each(function () {
        $(this).removeClass('is-invalid');
        $(this).val('');
    });

    $('#login-form')[0].reset();
}
$(function () {

    $("#email, #password").on('change', function () {
        $(this).removeClass('is-invalid');
    });

    var myModal = document.getElementById('loginModal');
    myModal.addEventListener('hidden.bs.modal', function () {
        resetModal();
    });

    $("#btnLogin").on('click', function () {
        $("#login-form button[type=submit]").click();
    });


    $("#main-nav .nav-link.page").click(function () {
        var pag = $(this).data('tag');
        if (pag && pag !== null && pag !== undefined) {
            currentPage = pag;

        }

        else {
            currentPage = defaultPage;
        }
        $("#main-nav .nav-link.page").removeClass('active');
        getPage();
    });


    $("#login-form").submit(function (event) {
        event.preventDefault();

        var isValidForm = true;
        var email = $("#email").val();
        var password = $("#password").val();

        if (email === "") {
            $("#email").addClass('is-invalid');
            isValidForm = false;
        }

        if (password === "") {
            $("#password").addClass('is-invalid');
            isValidForm = false;
        }

        if (isValidForm) {

            var request = {
                username: $("#email").val(),
                password: $("#password").val()
            };


            console.log("Login::request " + JSON.stringify(request));

            var url = "http://localhost:8080/auth";
            var method = "POST";
            var ifSuccessLogin = function (apiResponse) {
                console.log("Login::response " + JSON.stringify(apiResponse));
                if (apiResponse.data.active) {
                    addAlert("Usuario logueado con exito", "success", 2);

                    rolIngreso = apiResponse.data.rol;
                    switch (rolIngreso) {
                        case 1:

                            window.setTimeout(function () {

                                $("#barraAdmin").show();
                                $("#infoLogin").show();
                                loadPage('homeAdmin');
                                closeLoader();
                                resetModal();
                               $("#btnClose").click();
                                $("#main-nav").hide();
                                $("#nUsuario").text(apiResponse.data.primerNombre +" " +apiResponse.data.primerApellido);
                                $("#rolUsuario").text("Administrador");

                            }, 4000);
                            break;
                            
                        default:
                            window.setTimeout(function () {
                                loadHeader(); {

                                    var url = 'template/header.html';
                                    var idContent = 'content-header';
                                    loadZone(url, idContent);
                                }
                            }, 3000);

                    }


                    //window.setTimeout(function(){
                    //window.location.replace("../google.com?q=El usuario inicio sesion yuju!!!!");
                    //  }, 3000);
                } else {
                    $('#login-form')[0].reset();
                    addAlert("Usuario no encontrado", "warning", 2);
                }
                closeLoader();
            };

            var ifErrorLogin = function (data) {
                addAlert("Se presento un error en el servidor", "danger", 8);
                closeLoader();
            };

            openLoader();
            callApi(url, method, request, ifSuccessLogin, ifErrorLogin);
        }


    });



    $("#btnsalir").click(function(){
        $("#barraAdmin").hide();
        $("#infoLogin").hide();
        $("#main-nav").show();
        loadPage('home');
              
       });  
       $("#btnatras").click(function(){
        loadPage("homeAdmin");

   
     

    });

   
     
});



