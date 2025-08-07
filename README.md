# EPA

html:
function verificarContraseña() {
    var password = document.getElementById("password").value;
    var imagen = document.querySelector('.img2');
    if (password === "Epa0102") {
        
        document.getElementById("formulario").style.display = "block";
        document.getElementById("protocolos").style.display = "block";
        document.getElementById("buscar").style.display = "block";
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

function limitLines(textarea, maxLines) {
    const lines = textarea.value.split('\n');
    if (lines.length > maxLines) {
        textarea.value = lines.slice(0, maxLines).join('\n');
    }
}



// Format date to YYYY-MM-DD for input type="date"
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) {
        // Try parsing DD/MM/YYYY format
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const parsedDate = new Date(parts[2], parts[1] - 1, parts[0]);
            if (!isNaN(parsedDate)) {
                const year = parsedDate.getFullYear();
                const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
                const day = ('0' + parsedDate.getDate()).slice(-2);
                return `${year}-${month}-${day}`;
            }
        }
        return '';
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}


function imprimir(){
    document.getElementById("protocolos").style.display = "none";
    document.getElementById("buscar").style.display = "none";
    
       
    window.print ();
    alert('¡REIMPRESIÓN EXITOSA!');
    formulario.reset();
cargarFechaActual();
document.getElementById("protocolos").style.display = "block";
document.getElementById("buscar").style.display = "block";
}

function mostrarPDF() {
  window.open("PROFILAXIS ANTIBIOTICA EPA.pdf", "_blank");
}








function searchRut() {
    var rut = document.getElementById('rutSearch').value.trim();
    if (!rut) {
        alert('Por favor, ingrese un RUT.');
        return;
    }

    // Mostrar el modal emergente antes de realizar la búsqueda
    document.getElementById('loadingModal').style.display = 'flex';

    var url = 'https://script.google.com/macros/s/AKfycbzYf-vOcMrOquenIFpCaty7DuoeA434AmGKYe8h8xo1SUKjg47YciwLu0sfjvh4G0J24Q/exec?rut=' + encodeURIComponent(rut);
    fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            var resultDiv = document.getElementById('searchResult');
            if (data) {
                // Populate text inputs and textareas
                document.getElementById('fecha').value = formatDate(data.FECHA) || '';
                document.getElementById('ficha').value = data.FICHA || '';
                document.getElementById('nombre').value = data.NOMBRE || '';
                document.getElementById('rut').value = data.RUT || '';
                document.getElementById('edad').value = data.EDAD || '';
                document.getElementById('diagnostico').value = data.DIAGNOSTICO || '';
                document.getElementById('cirugia').value = data.CIRUGIA || '';
                document.getElementById('medicos').value = data.MEDICOS || '';
                document.getElementById('medicamentos').value = data.MEDICAMENTOS || '';
                document.getElementById('laboratorios').value = data.LABORATORIOS || '';
                document.getElementById('evaluaciones').value = data.EVALUACIONES || '';
                document.getElementById('ekg').value = data.EKG || '';
                document.getElementById('presion_arterial').value = data.PA || '';
                document.getElementById('frecuencia_cardiaca').value = data.FC || '';
                document.getElementById('frecuencia_respiratoria').value = data.FR || '';
                document.getElementById('saturacion').value = data.SATO2 || '';
                document.getElementById('peso').value = data.PESO || '';
                document.getElementById('altura').value = data.TALLA || '';
                document.getElementById('resultado').value = data.IMC || '';
                document.getElementById('indicaciones').value = data.INDICACIONES || '';
                document.getElementById('rutSearch').value = '';

                // Populate select fields
                document.getElementById('select').value = data.ESPECIALIDAD || '';
                document.getElementById('genero').value = data.GENERO || '';
                document.getElementById('apertura_bucal').value = data.AB || '';
                document.getElementById('mallampati').value = data.MALLAMP || '';
                document.getElementById('distancia_tiromentoniana').value = data.DTM || '';
                document.getElementById('asa').value = data.ASA || '';
                document.getElementById('pase').value = data.PASE || '';
                document.getElementById('anestesiologo').value = data.ANESTESIOLOGO || '';

                // Populate checkboxes
                document.getElementById('hta').checked = data.HTA === 'on';
                document.getElementById('diabetes').checked = data.DM === 'on';
                document.getElementById('asma').checked = data.ASMA === 'on';
                document.getElementById('hipotiroidismo').checked = data.HIPOT4 === 'on';
                document.getElementById('hipertiroidismo').checked = data.HIPERT4 === 'on';
                document.getElementById('chagas').checked = data.CHAGAS === 'on';
                document.getElementById('insuficiencia_cardiaca').checked = data['INSUF. CARD'] === 'on';
                document.getElementById('alergias').checked = data.ALERGIAS === 'on';
                document.getElementById('otros').checked = data.OTROS === 'on';
                document.getElementById('sr').checked = data['SINT. RESP'] === 'on';
                document.getElementById('scv').checked = data['SINT. CV'] === 'on';

                // Trigger IMC calculation
                calcularIMC();

                resultDiv.innerHTML = 'Registro encontrado.';
            } else {
                resetForm();
                resultDiv.innerHTML = 'No se encontraron registros para este RUT.';
            }

            // Ocultar el modal emergente después de cargar los datos
            document.getElementById('loadingModal').style.display = 'none';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('searchResult').innerHTML = 'Error al buscar el RUT: ' + error.message;

            // Ocultar el modal emergente en caso de error
            document.getElementById('loadingModal').style.display = 'none';
        });
}



function resetForm() {
  // Resetear campos de texto
  document.getElementById('ficha').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('rut').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('diagnostico').value = '';
  document.getElementById('cirugia').value = '';
  document.getElementById('medicos').value = '';
  document.getElementById('medicamentos').value = '';
  document.getElementById('laboratorios').value = '';
  document.getElementById('evaluaciones').value = '';
  document.getElementById('ekg').value = '';
  document.getElementById('presion_arterial').value = '';
  document.getElementById('frecuencia_cardiaca').value = '';
  document.getElementById('frecuencia_respiratoria').value = '';
  document.getElementById('saturacion').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('altura').value = '';
  document.getElementById('resultado').value = '';
  document.getElementById('indicaciones').value = '';
  document.getElementById('rutSearch').value = '';

  // Cargar fecha actual
  cargarFechaActual();

  // Resetear campos select
  document.getElementById('select').value = '';
  document.getElementById('genero').value = '';
  document.getElementById('apertura_bucal').value = '';
  document.getElementById('mallampati').value = '';
  document.getElementById('distancia_tiromentoniana').value = '';
  document.getElementById('asa').value = '';
  document.getElementById('pase').value = '';
  document.getElementById('anestesiologo').value = '';

  // Resetear checkboxes
  document.getElementById('hta').checked = false;
  document.getElementById('diabetes').checked = false;
  document.getElementById('asma').checked = false;
  document.getElementById('hipotiroidismo').checked = false;
  document.getElementById('hipertiroidismo').checked = false;
  document.getElementById('chagas').checked = false;
  document.getElementById('insuficiencia_cardiaca').checked = false;
  document.getElementById('alergias').checked = false;
  document.getElementById('otros').checked = false;
  document.getElementById('sr').checked = false;
  document.getElementById('scv').checked = false;
}

























document.getElementById('BTN').addEventListener('click', function(e) {
  e.preventDefault();
  
  abrirModalEnviando(); // Abrir modal de enviando datos
  
  var formData = new FormData(document.getElementById('formulario'));
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzYf-vOcMrOquenIFpCaty7DuoeA434AmGKYe8h8xo1SUKjg47YciwLu0sfjvh4G0J24Q/exec');
  xhr.onload = function() {
    if (xhr.status === 200) {
      
      
      
     
      
 
      
      document.getElementById("protocolos").style.display = "none";
      document.getElementById("buscar").style.display = "none";
      


      alert('¡Registro exitoso!');

      cerrarModalEnviando(); // Cerrar modal de enviando datos

      window.print();
      formulario.reset();
      cargarFechaActual();
      
      document.getElementById("protocolos").style.display = "block";
      document.getElementById("buscar").style.display = "block";
      
    } else {
      console.error('Submission error:', xhr.status, xhr.responseText);
      alert('Error al enviar el formulario: ' + xhr.responseText);
     cerrarModalEnviando(); // Cerrar modal de enviando datos
    }
  };
  xhr.onerror = function() {
    console.error('Connection error during submission');
    alert('Error de conexión al enviar el formulario');
     cerrarModalEnviando(); // Cerrar modal de enviando datos
  };
  xhr.send(formData);
});










// Obtener los elementos del modal
var modalEnviando = document.getElementById('modal-enviando');

var btnGuardar = document.getElementById('BTN');

// Función para abrir el modal de enviando datos
function abrirModalEnviando() {
  modalEnviando.style.display = 'flex';
}

// Función para cerrar el modal de enviando datos
function cerrarModalEnviando() {
  modalEnviando.style.display = 'none';
}






scrypt:

function verificarContraseña() {
    var password = document.getElementById("password").value;
    var imagen = document.querySelector('.img2');
    if (password === "Epa0102") {
        
        document.getElementById("formulario").style.display = "block";
        document.getElementById("protocolos").style.display = "block";
        document.getElementById("buscar").style.display = "block";
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

function limitLines(textarea, maxLines) {
    const lines = textarea.value.split('\n');
    if (lines.length > maxLines) {
        textarea.value = lines.slice(0, maxLines).join('\n');
    }
}



// Format date to YYYY-MM-DD for input type="date"
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) {
        // Try parsing DD/MM/YYYY format
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const parsedDate = new Date(parts[2], parts[1] - 1, parts[0]);
            if (!isNaN(parsedDate)) {
                const year = parsedDate.getFullYear();
                const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
                const day = ('0' + parsedDate.getDate()).slice(-2);
                return `${year}-${month}-${day}`;
            }
        }
        return '';
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}


function imprimir(){
    document.getElementById("protocolos").style.display = "none";
    document.getElementById("buscar").style.display = "none";
    
       
    window.print ();
    alert('¡REIMPRESIÓN EXITOSA!');
    formulario.reset();
cargarFechaActual();
document.getElementById("protocolos").style.display = "block";
document.getElementById("buscar").style.display = "block";
}

function mostrarPDF() {
  window.open("PROFILAXIS ANTIBIOTICA EPA.pdf", "_blank");
}








function searchRut() {
    var rut = document.getElementById('rutSearch').value.trim();
    if (!rut) {
        alert('Por favor, ingrese un RUT.');
        return;
    }

    // Mostrar el modal emergente antes de realizar la búsqueda
    document.getElementById('loadingModal').style.display = 'flex';

    var url = 'https://script.google.com/macros/s/AKfycbzYf-vOcMrOquenIFpCaty7DuoeA434AmGKYe8h8xo1SUKjg47YciwLu0sfjvh4G0J24Q/exec?rut=' + encodeURIComponent(rut);
    fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            var resultDiv = document.getElementById('searchResult');
            if (data) {
                // Populate text inputs and textareas
                document.getElementById('fecha').value = formatDate(data.FECHA) || '';
                document.getElementById('ficha').value = data.FICHA || '';
                document.getElementById('nombre').value = data.NOMBRE || '';
                document.getElementById('rut').value = data.RUT || '';
                document.getElementById('edad').value = data.EDAD || '';
                document.getElementById('diagnostico').value = data.DIAGNOSTICO || '';
                document.getElementById('cirugia').value = data.CIRUGIA || '';
                document.getElementById('medicos').value = data.MEDICOS || '';
                document.getElementById('medicamentos').value = data.MEDICAMENTOS || '';
                document.getElementById('laboratorios').value = data.LABORATORIOS || '';
                document.getElementById('evaluaciones').value = data.EVALUACIONES || '';
                document.getElementById('ekg').value = data.EKG || '';
                document.getElementById('presion_arterial').value = data.PA || '';
                document.getElementById('frecuencia_cardiaca').value = data.FC || '';
                document.getElementById('frecuencia_respiratoria').value = data.FR || '';
                document.getElementById('saturacion').value = data.SATO2 || '';
                document.getElementById('peso').value = data.PESO || '';
                document.getElementById('altura').value = data.TALLA || '';
                document.getElementById('resultado').value = data.IMC || '';
                document.getElementById('indicaciones').value = data.INDICACIONES || '';
                document.getElementById('rutSearch').value = '';

                // Populate select fields
                document.getElementById('select').value = data.ESPECIALIDAD || '';
                document.getElementById('genero').value = data.GENERO || '';
                document.getElementById('apertura_bucal').value = data.AB || '';
                document.getElementById('mallampati').value = data.MALLAMP || '';
                document.getElementById('distancia_tiromentoniana').value = data.DTM || '';
                document.getElementById('asa').value = data.ASA || '';
                document.getElementById('pase').value = data.PASE || '';
                document.getElementById('anestesiologo').value = data.ANESTESIOLOGO || '';

                // Populate checkboxes
                document.getElementById('hta').checked = data.HTA === 'on';
                document.getElementById('diabetes').checked = data.DM === 'on';
                document.getElementById('asma').checked = data.ASMA === 'on';
                document.getElementById('hipotiroidismo').checked = data.HIPOT4 === 'on';
                document.getElementById('hipertiroidismo').checked = data.HIPERT4 === 'on';
                document.getElementById('chagas').checked = data.CHAGAS === 'on';
                document.getElementById('insuficiencia_cardiaca').checked = data['INSUF. CARD'] === 'on';
                document.getElementById('alergias').checked = data.ALERGIAS === 'on';
                document.getElementById('otros').checked = data.OTROS === 'on';
                document.getElementById('sr').checked = data['SINT. RESP'] === 'on';
                document.getElementById('scv').checked = data['SINT. CV'] === 'on';

                // Trigger IMC calculation
                calcularIMC();

                resultDiv.innerHTML = 'Registro encontrado.';
            } else {
                resetForm();
                resultDiv.innerHTML = 'No se encontraron registros para este RUT.';
            }

            // Ocultar el modal emergente después de cargar los datos
            document.getElementById('loadingModal').style.display = 'none';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('searchResult').innerHTML = 'Error al buscar el RUT: ' + error.message;

            // Ocultar el modal emergente en caso de error
            document.getElementById('loadingModal').style.display = 'none';
        });
}



function resetForm() {
  // Resetear campos de texto
  document.getElementById('ficha').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('rut').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('diagnostico').value = '';
  document.getElementById('cirugia').value = '';
  document.getElementById('medicos').value = '';
  document.getElementById('medicamentos').value = '';
  document.getElementById('laboratorios').value = '';
  document.getElementById('evaluaciones').value = '';
  document.getElementById('ekg').value = '';
  document.getElementById('presion_arterial').value = '';
  document.getElementById('frecuencia_cardiaca').value = '';
  document.getElementById('frecuencia_respiratoria').value = '';
  document.getElementById('saturacion').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('altura').value = '';
  document.getElementById('resultado').value = '';
  document.getElementById('indicaciones').value = '';
  document.getElementById('rutSearch').value = '';

  // Cargar fecha actual
  cargarFechaActual();

  // Resetear campos select
  document.getElementById('select').value = '';
  document.getElementById('genero').value = '';
  document.getElementById('apertura_bucal').value = '';
  document.getElementById('mallampati').value = '';
  document.getElementById('distancia_tiromentoniana').value = '';
  document.getElementById('asa').value = '';
  document.getElementById('pase').value = '';
  document.getElementById('anestesiologo').value = '';

  // Resetear checkboxes
  document.getElementById('hta').checked = false;
  document.getElementById('diabetes').checked = false;
  document.getElementById('asma').checked = false;
  document.getElementById('hipotiroidismo').checked = false;
  document.getElementById('hipertiroidismo').checked = false;
  document.getElementById('chagas').checked = false;
  document.getElementById('insuficiencia_cardiaca').checked = false;
  document.getElementById('alergias').checked = false;
  document.getElementById('otros').checked = false;
  document.getElementById('sr').checked = false;
  document.getElementById('scv').checked = false;
}

























document.getElementById('BTN').addEventListener('click', function(e) {
  e.preventDefault();
  
  abrirModalEnviando(); // Abrir modal de enviando datos
  
  var formData = new FormData(document.getElementById('formulario'));
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzYf-vOcMrOquenIFpCaty7DuoeA434AmGKYe8h8xo1SUKjg47YciwLu0sfjvh4G0J24Q/exec');
  xhr.onload = function() {
    if (xhr.status === 200) {
      
      
      
     
      
 
      
      document.getElementById("protocolos").style.display = "none";
      document.getElementById("buscar").style.display = "none";
      


      alert('¡Registro exitoso!');

      cerrarModalEnviando(); // Cerrar modal de enviando datos

      window.print();
      formulario.reset();
      cargarFechaActual();
      
      document.getElementById("protocolos").style.display = "block";
      document.getElementById("buscar").style.display = "block";
      
    } else {
      console.error('Submission error:', xhr.status, xhr.responseText);
      alert('Error al enviar el formulario: ' + xhr.responseText);
     cerrarModalEnviando(); // Cerrar modal de enviando datos
    }
  };
  xhr.onerror = function() {
    console.error('Connection error during submission');
    alert('Error de conexión al enviar el formulario');
     cerrarModalEnviando(); // Cerrar modal de enviando datos
  };
  xhr.send(formData);
});










// Obtener los elementos del modal
var modalEnviando = document.getElementById('modal-enviando');

var btnGuardar = document.getElementById('BTN');

// Función para abrir el modal de enviando datos
function abrirModalEnviando() {
  modalEnviando.style.display = 'flex';
}

// Función para cerrar el modal de enviando datos
function cerrarModalEnviando() {
  modalEnviando.style.display = 'none';
}


style:

body{
    margin: auto;
       padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, #007bff, #00c6ff, #28a745,#ffc107);
}

.formulario{
 margin: 0;
 width: 19cm;
 height: 26.5cm;
 margin-top: 10px;
 padding: 5px;
 border: 1px solid #000;
 font-family: sans-serif;
 font-size: 10px;
 align-items: center;
 box-sizing: border-box;
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
 background-color: white; 
 
}






img{
    width: 90px;

    }

h1{
    margin-top: auto;
    margin-left: 100px;
    vertical-align: middle;
    text-align: center;
    font-family: sans-serif;
    font-size: 25px;
    align-items: center;
}





h2{
    padding-top: 0%;
    font-family: sans-serif;
    font-size: 12px;
  
}


h3{
    margin-top: 0;
    text-align: center;
    font-family: sans-serif;
    font-size: 25px;
    align-items: center;
   
}



.select{
  width: 46%;
    display: inline-block;

}



.inputficha{
    width: 10%;
}



.nombre{
    width: 30%;
    margin-top: 5px;
}
.rut{
    width: 15%;
}

.lebelrut{
    padding-right: 19px;
    padding-left: 12px;
}

.edad{
    width: 6%;
}

.diagnostico{
    width: 35%;
margin-top: 5px;
}

.labelcx{
    padding-right: 13px;
}
.cirugia{
    width: 44%;
}

.fieldset1, .fieldset2, .fieldset3, .fieldset4,.fieldset5,.fieldset6{
    padding-top: 5px;
    padding-bottom: 5px;
    border-color: #f1f1f1;
        
}

.medicos, .medicamentos, .laboratorios,.evaluaciones{
    width: 48.5%;
    max-height: 80px;
    overflow-y: hidden;
    resize: none;
    
}


.EKG{
    padding-top: 5PX;
   
}

.ekg{
    display: inline-block;
    width: 94%;
}


.presion-arterial, .frecuencia-cardiaca, .frecuencia-respiratoria, .saturacion, .peso, .talla, .imc{
    width: 9.5%;
    font-family: sans-serif;
    font-size: 12px;
    display: inline-block;

}


.indicaciones{
    width: 98%;
    max-height: 120px;
    overflow-y: hidden;
    resize: none;
}

.anestesiologos{
    display: inline-block;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
}

#anestesiologo{
    display: inline-block;
    width: 50%;

}

.firma{
    margin-left: 90px;
}

.BTN, .botonpwd, .BTNR{
    width: auto;
    margin: auto;
    display: block;
    background-color: #4CAF50;

    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }

 .botonpwd:hover{
    background-color: #005600;
        }

.btnPxNew:hover{
     background-color: #005600;
                }

.BTN:hover{
     background-color: #005600;
                        }

.BTNR:hover{
    background-color: #005600;
                                               }
                                              

.formulario{
    display: none;
}

#acceso{
 
    align-items: center;
    background-color: #f0f0f0; /* Fondo para mejor visibilidad */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    margin-top: 300px;
  
    
}

.botonpwd{
    display: inline-block;
}

#botones{
    display: flex;
    justify-content: center;
    align-items: center;
}


.img2{
    margin-top: 300px;
    width: 300px;
    display: inline-block;
    padding: 5px;
  
    margin-right: 20px; /* Espacio entre la imagen y los elementos */
}

.h2, .img2{
    display: inline-block; 
    vertical-align: middle;
}


.search-section {
    margin: 5px 0;
    padding: 5px;
    background-color: #f8f9fa;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-section button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.search-section button:hover {
    background-color: #0056b3;
}

#searchResult {
    margin-left: 10px;
    color: #333;
    font-style: italic;
}

/* Additional existing styles (ensure compatibility) */
#botones {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}



.h1btn {
  display: flex;
  align-items: center;
  vertical-align: middle;
  }





