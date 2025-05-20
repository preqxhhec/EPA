document.getElementById('BTN').addEventListener('click', function(e) {
    e.preventDefault();
    var formData = new FormData(document.getElementById('formulario'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzYf-vOcMrOquenIFpCaty7DuoeA434AmGKYe8h8xo1SUKjg47YciwLu0sfjvh4G0J24Q/exec');
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            alert('¡Registro exitoso!');
            window.print();
        } else {
            console.error('Submission error:', xhr.status, xhr.responseText);
            alert('Error al enviar el formulario: ' + xhr.responseText);
        }
    };
    xhr.onerror = function() {
        console.error('Connection error during submission');
        alert('Error de conexión al enviar el formulario');
    };
    xhr.send(formData);
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

function limitLines(textarea, maxLines) {
    const lines = textarea.value.split('\n');
    if (lines.length > maxLines) {
        textarea.value = lines.slice(0, maxLines).join('\n');
    }
}

function searchRut() {
    var rut = document.getElementById('rutSearch').value.trim();
    if (!rut) {
        alert('Por favor, ingrese un RUT.');
        return;
    }

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
                resultDiv.innerHTML = 'No se encontraron registros para este RUT.';
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('searchResult').innerHTML = 'Error al buscar el RUT: ' + error.message;
        });
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
    window.print ();
}
