// recargar el formulario //
document.getElementById('BTN').addEventListener('click', function(e) {
    e.preventDefault();
    var formData = new FormData(document.getElementById('formulario'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyQxGIe4_jEwZx56w1BX9bIrbArxoEnNcIFot9bp5m-SftOsewlN4A8yptf0u9sAiqobw/exec');
    xhr.reload = function() {
      document.getElementById('formulario').reload(); 
    // Recargar formulario

      
    };
    xhr.send(formData);
    
  });













  function verificarContraseña() {
    var password = document.getElementById("password").value;
    if (password === "Epa0102") {
        document.getElementById("formulario").style.display = "block";
        document.getElementById("acceso").style.display = "none";
    } else {
        alert("Contraseña incorrecta");
    }
}





  function setFechaActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const año = hoy.getFullYear();

    const fechaActual = `${año}-${mes}-${dia}`;
    document.getElementById('fecha').value = fechaActual;
}

window.onload = setFechaActual;





    function calcularIMC() {
        const peso = parseFloat(document.getElementById('peso').value);
        const altura = parseFloat(document.getElementById('altura').value);

        if (peso > 0 && altura > 0) {
            const imc = peso / (altura * altura);
            document.getElementById('resultado').value = imc.toFixed(2);
        } else {
            document.getElementById('resultado').value = '';
        }
    }

    document.getElementById('peso').addEventListener('input', calcularIMC);
    document.getElementById('altura').addEventListener('input', calcularIMC);




  function limpiarFormulario() {
    document.getElementById('fecha').value = '';
    document.getElementById('ficha').value = '';
    document.getElementById('cirujano').value = '';
  }







