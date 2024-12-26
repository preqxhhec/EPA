document.getElementById('BTN').addEventListener('click', function(e) {
    e.preventDefault();
    var formData = new FormData(document.getElementById('formulario'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbxoyQRMJ_-ZI1CTZ2eO5F4wBXnLeMQbukYlKLzvNS2pUL36Z2o7LEPMtQNStHhwi94rdw/exec');
    xhr.reload = function() {
      document.getElementById('form').reload(); 
     
    };
    window.print();
    xhr.send(formData);
    alert('¡Registro exitoso!');
    
  });









  function verificarContraseña() {
    var password = document.getElementById("password").value;
    var imagen = document.querySelector('.img2');
    if (password === "Epa0102") {
        document.getElementById("formulario").style.display = "block";
        document.getElementById("acceso").style.display = "none";
        imagen.style.display = 'none';
    } else {
        alert("Contraseña incorrecta");
    }
}





function cargarFechaActual() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var todayString = year + "-" + month + "-" + day;
    document.getElementById("fecha").value = todayString;
  }

  window.onload = function() {
    cargarFechaActual();
  }

  document.getElementById("BTNR").onclick = function() {
    setTimeout(cargarFechaActual, 0);
  }



      













  
  
  








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







      
