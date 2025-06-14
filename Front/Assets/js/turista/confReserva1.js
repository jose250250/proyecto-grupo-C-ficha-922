var total = "";

$(document).on(function () {
  const hoy = new Date().toISOString().split("T")[0];
  $("#fechaInicio").attr("min", hoy);
  $("#fechaFinal").attr("min", hoy);
});

$(document).on("change", "#fechaInicio, #fechaFinal", function () {
  let inicio = new Date($("#fechaInicio").val());
  let final = new Date($("#fechaFinal").val());
  if (inicio && final && !isNaN(inicio) && !isNaN(final)) {
    let diferencia = Math.abs(final - inicio); // Diferencia en milisegundos
    let dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24)); // Convertir a días
    $("#CantDias").val(dias); // Asignar resultado al input
  }
  total = $("#precio").val() * $("#CantDias").val();
  $("#totalpaq").val(total);
  reservaProm.precioTotal = total;

  console.log("reservaprom::" , reservaProm);
});

// Evento submit del formulario
$("#reservaProm")
  .off("submit")
  .on("submit", function (e) {
    e.preventDefault();

    let cantidadErrores = 0;

    // Validar todos los campos
    $("#reservaProm input, #reservaProm select").each(function () {
      if ($(this).val().trim() === "") {
        cantidadErrores++;
        $(this).addClass("is-invalid");
      } else {
        $(this).removeClass("is-invalid");
      }
    });

    if (cantidadErrores === 0) {
      console.log("reservaprom:::", reservaProm);
      const formData = new FormData();
      formData.append(
        "dto",
        new Blob([JSON.stringify(reservaProm)], { type: "application/json" })
      );

      const method = "POST";
      const url = "http://localhost:8080/dperpaquete";
      console.log("url:::" + url);

      const ifSuccess = function (apiResponse) {
        addAlert(apiResponse.message, "success", 3);
        localStorage.setItem("paqueteelegido", apiResponse.data.id);

        loadPage("paquetePersonal7", turPath);

        closeLoader();
      };

      const ifErrorLogin = function (data) {
        addAlert("Se presentó un error en el servidor", "danger", 8);
        closeLoader();
      };

      openLoader();

      $.ajax({
        url: url,
        type: method,
        data: formData,
        processData: false,
        contentType: false,
        success: ifSuccess,
        error: ifErrorLogin,
      });
    } else {
      addAlert("Valide los datos ingresados", "info", 2);
    }
  });
$("#atrasReserva").click(function () {
  loadPage("home", turPath);
  $("#txtTitulo").show();
});
