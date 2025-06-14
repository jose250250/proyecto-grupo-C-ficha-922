function resetModal() {
    $("#email, #password").each(function () {
        $(this).removeClass('is-invalid');
        $(this).val('');
    });

   
}
$(function () {

    $("#email, #password").on('change', function () {
        $(this).removeClass('is-invalid');
    });

    var myModal = document.getElementById('loginModal');
    myModal.addEventListener('hidden.bs.modal', function () {
        $(this).removeAttr('aria-hidden');
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

                    rolIngreso = apiResponse.data.idrol;
                    switch (rolIngreso) {
                        case 1:
                            window.setTimeout(function () {
                                var dataUser = JSON.stringify(apiResponse.data);
                                localStorage.setItem("data-user", dataUser);
                                window.location.replace("adminhome.html?");
                                $('#login-form')[0].reset();
                            }, 2000);
                            break;
                        case 2:
                                window.setTimeout(function () {
                                    var dataUser = JSON.stringify(apiResponse.data);
                                    localStorage.setItem("data-user", dataUser);
                                    window.location.replace("adminhome.html?");
                                    $('#login-form')[0].reset();
                                  
                                }, 2000);
                                break;    
                        case 3:
                            window.setTimeout(function () {
                                var dataUser = JSON.stringify(apiResponse.data);
                                localStorage.setItem("data-user", dataUser);
                                window.location.replace("indexTurista.html?");
                              
                                closeLoader();
                            }, 2000);
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
    $("#btnRegistro").click(function(){
        localStorage.setItem("registro", 1);
        page = "registroPersona";
            loadPage(page);
            
           window.setTimeout(function(){
            $("#btnClose").click();
           },400);
           $("#loginModal").hide(function(){
            $("#ingresarPersona").click();
           })        
    });
    $(document).on("click", ".btn-paquete", function () {
    if((localStorage.getItem("data-user")=="")||(localStorage.getItem("data-user")==null)){
        addAlert("Debes iniciar Secion o registrarte para poder reservar", "success", 3);
        $("#loginModal").modal('show');
    }
})
});


