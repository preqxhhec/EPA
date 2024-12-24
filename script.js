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



  document.getElementById('BTN').addEventListener('click', function() {
    window.print();
    window.location.reload();
    alert('Registro exitoso!');
    document.getElementById('form').reset();
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





  function setFechaActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const año = hoy.getFullYear();

    const fechaActual = `${dia}-${mes}-${año}`;
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







    function limitLines(textarea, maxLines) {
      let lines = textarea.value.split('\n');
      if (lines.length > maxLines) {
          textarea.value = lines.slice(0, maxLines).join('\n');
      } else {
          // Check if any line exceeds the width of the textarea
          let newValue = '';
          for (let i = 0; i < lines.length; i++) {
              while (lines[i].length > textarea.cols) {
                  newValue += lines[i].substring(0, textarea.cols) + '\n';
                  lines[i] = lines[i].substring(textarea.cols);
              }
              newValue += lines[i] + (i < lines.length - 1 ? '\n' : '');
          }
          textarea.value = newValue;
      }
  }
