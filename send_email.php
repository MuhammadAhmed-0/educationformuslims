<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $country = htmlspecialchars($_POST['country']);
    $age = htmlspecialchars($_POST['age']);
    $course = htmlspecialchars($_POST['course']);
    $level = htmlspecialchars($_POST['level']);
    $schedule = htmlspecialchars($_POST['schedule']);
    $message = htmlspecialchars($_POST['message']);
    $newsletter = isset($_POST['newsletter']) ? "Yes" : "No";
    $terms = isset($_POST['terms']) ? "Agreed" : "Not Agreed";

    $to = "aeducateservices@gmail.com";  // Your email address
    $subject = "New Contact Form Submission";

    $body = "
    New Contact Form Submission:
    
    Name: $firstName $lastName
    Email: $email
    Phone: $phone
    Country: $country
    Age Group: $age
    Course Interest: $course
    Current Level: $level
    Preferred Schedule: $schedule
    Message: $message
    Subscribe to Newsletter: $newsletter
    Terms & Conditions: $terms
    ";

    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
}
?>
