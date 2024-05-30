<?php

// Aseguramos que la solicitud sea POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Obtener los campos del formulario y remover espacios y etiquetas innecesarias
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Establecer el asunto del correo como 'Website Lead'
    $subject = "New Website Lead";

    // Verificar que los datos necesarios fueron enviados y son válidos
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Si no son válidos, enviar una respuesta HTTP 400 (solicitud incorrecta)
        http_response_code(400);
        echo "Please fill all fields and try again.";
        exit;
    }

    // Dirección de correo del destinatario
    $recipient = "cristianvillavicencix@gmail.com";

    // Construir el contenido del email
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Message:\n$message\n";

    // Construir las cabeceras del correo electrónico
    $email_headers = "From: Cousins Painting Llc <info@cousinspaintingllc.com>\r\n";
    $email_headers .= "Reply-To: info@cousinspaintingllc.com\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // Intentar enviar el correo electrónico
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Si el correo se envía con éxito, enviar una respuesta HTTP 200 (OK)
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        // Si falla el envío, enviar una respuesta HTTP 500 (error interno del servidor)
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // Si la solicitud no es POST, enviar una respuesta HTTP 403 (prohibido)
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>
