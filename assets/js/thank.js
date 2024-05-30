document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Previene la recarga de la página

    var formData = new FormData(this); // Recoge los datos del formulario

    // Realiza una solicitud AJAX a tu script PHP
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'mail.php', true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Muestra el mensaje de éxito
            document.getElementById('formMessage').style.display = 'block';
            // Limpia el formulario
            document.getElementById('contactForm').reset();
            // Opcional: ocultar el mensaje después de un tiempo
            setTimeout(function(){
                document.getElementById('formMessage').style.display = 'none';
            }, 5000); // 5 segundos
        } else {
            // Manejar errores aquí, si los hay
            console.error('The request failed!');
        }
    };
    xhr.send(formData); // Envía los datos del formulario
});
