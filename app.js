var textoEliminado = null;



function eliminarImagen() {
    const imagen = document.getElementById('ContenidoRectangulo');
    if (imagen) {
        imagen.remove();
    }
}


function eliminarTexto() {
    var texto1 = document.getElementById('textencontrado1');
        if (texto1) {
            // Guardar el contenido HTML del elemento eliminado
            textoEliminado = texto1.outerHTML;
            // Eliminar el elemento del DOM
            texto1.parentNode.removeChild(texto1);
        }

    var texto2 = document.getElementById('textencontrado2');
        if (texto2) {
                // Guardar el contenido HTML del elemento eliminado
            textoEliminado = texto2.outerHTML;
                // Eliminar el elemento del DOM
            texto2.parentNode.removeChild(texto2);
        }

    var imagen = document.getElementById('ContenidoRectangulo');
        if (imagen) {
                // Guardar el contenido HTML del elemento eliminado
            textoEliminado = imagen.outerHTML;
                // Eliminar el elemento del DOM
                imagen.parentNode.removeChild(imagen);
        }
      
}

function eliminarTextoEncriptado() {
    var texto1 = document.getElementById('textoEncriptado');
        if (texto1) {
            // Guardar el contenido HTML del elemento eliminado
            textoEliminado = texto1.outerHTML;
            // Eliminar el elemento del DOM
            texto1.parentNode.removeChild(texto1);
        }
}

function eliminarTextoDesencriptado() {
    var texto1 = document.getElementById('textoDesencriptado');
        if (texto1) {
            // Guardar el contenido HTML del elemento eliminado
            textoEliminado = texto1.outerHTML;
            // Eliminar el elemento del DOM
            texto1.parentNode.removeChild(texto1);
        }
}

function mostrarTextoEncriptado() {
    if (document.getElementById('textoEncriptado')) {
                // Convertir el HTML guardado en un nuevo elemento y agregarlo al DOM
    var div = document.createElement('div');
    div.innerHTML = textoEliminado;
    document.body.appendChild(div.firstChild);
                // Limpiar la variable de texto eliminado
    textoEliminado = null;
    }
}

function mostrarTextoDesencriptado() {
    if (document.getElementById('textoncriptado')) {
                // Convertir el HTML guardado en un nuevo elemento y agregarlo al DOM
    var div = document.createElement('div');
    div.innerHTML = textoEliminado;
    document.body.appendChild(div.firstChild);
                // Limpiar la variable de texto eliminado
    textoEliminado = null;
    }
}

function verificarTexto() {
    // Obtén el valor del textarea
    let texto = document.getElementById('textousuario').value;

    // Expresiones regulares para verificar acentos y mayúsculas
    const tieneAcentos = /[áéíóúÁÉÍÓÚ]/;
    const tieneMayusculas = /[A-Z]/;

    // Verificar si contiene acentos o mayúsculas
    if (tieneAcentos.test(texto) || tieneMayusculas.test(texto)) {
        document.getElementById('textousuario').value = "Error: El texto contiene acentos o mayúsculas.";
    } else {
        // Encriptar el texto usando un simple cifrado César (desplazamiento de 3 letras)
        const textoEncriptado = encriptarTexto(texto, 3);
        document.getElementById('textoEncriptado').textContent = textoEncriptado;
        // Guardar el texto encriptado en el atributo 'data-encriptado' del <p> para desencriptarlo luego
        document.getElementById('textoEncriptado').setAttribute('data-encriptado', textoEncriptado);

       
        eliminarTexto()
        eliminarImagen() 

    }
}

function encriptarTexto(texto, desplazamiento) {
    return texto.split('').map(function(char) {
        // Solo encripta letras minúsculas
        if (char >= 'a' && char <= 'z') {
            let codigo = char.charCodeAt(0);
            let nuevoCodigo = ((codigo - 97 + desplazamiento) % 26) + 97;
            return String.fromCharCode(nuevoCodigo);
        }
        // Si no es una letra, se mantiene igual
        return char;
    }).join('');
}

function desencriptarTexto(texto, desplazamiento) {
    return texto.split('').map(function(char) {
        // Solo desencripta letras minúsculas
        if (char >= 'a' && char <= 'z') {
            let codigo = char.charCodeAt(0);
            let nuevoCodigo = ((codigo - 97 - desplazamiento + 26) % 26) + 97;
            return String.fromCharCode(nuevoCodigo);
        }
        // Si no es una letra, se mantiene igual
        return char;
    }).join('');
}

 function desencriptar() {
            // Obtener el texto encriptado del atributo 'data-encriptado'
    const textoEncriptado = document.getElementById('textoEncriptado').getAttribute('data-encriptado');
        if (textoEncriptado) {
                // Desencriptar el texto usando el desplazamiento de 3 letras
            const textoDesencriptado = desencriptarTexto(textoEncriptado, 3);
            document.getElementById('textoDesencriptado').textContent += textoDesencriptado;
            mostrarTextoDesencriptado()
                
        eliminarTextoEncriptado()
        } else {
            document.getElementById('textoDesencriptado').textContent = "No hay texto encriptado para desencriptar.";
             eliminarTextoEncriptado()
             mostrarTextoDesencriptado()
    }
}



function copiarDesencriptado() {
    const botonDesencriptado = document.getElementById('textoDesencriptado');
    const texto = botonDesencriptado.textContent || botonDesencriptado.innerText;
    navigator.clipboard.writeText(texto).then(function() {
        console.log('Texto copiado al portapapeles');
    }).catch(function(err) {
        console.error('Error al copiar el texto: ', err);
    });
}


document.getElementById('buttoncopiar').addEventListener('click', copiarDesencriptado);


function copiarEncriptado() {
    const botonEncriptar = document.getElementById('textoEncriptado');
    const texto = botonEncriptar.textContent || botonEncriptar.innerText;
    navigator.clipboard.writeText(texto).then(function() {
        console.log('Texto copiado al portapapeles');
    }).catch(function(err) {
        console.error('Error al copiar el texto: ', err);
    });
}

document.getElementById('buttoncopiar').addEventListener('click', copiarEncriptado);


document.getElementById('botonEncriptar').addEventListener('click', verificarTexto);

document.getElementById('botonDesencriptar').addEventListener('click', desencriptar);





 