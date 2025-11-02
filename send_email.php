<?php
// ==============================
//  Education For Muslims - Form Mailer
//  Handles both Popup and Contact forms
// ==============================

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files (adjust path if needed)
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $mail = new PHPMailer(true);

    try {
        // $mail->SMTPDebug = 2; // enable only for testing/debugging

        // === SMTP CONFIGURATION ===
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'ma4126403@gmail.com';     // your Gmail address
        $mail->Password   = 'whghphjlrxjsvedh';        // your 16-character Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // === EMAIL HEADERS ===
        $mail->setFrom('ma4126403@gmail.com', 'Education For Muslims');
        $mail->addAddress('ma4126403@gmail.com'); // where you’ll receive all messages

        // === DETECT FORM SOURCE ===
        $source  = $_POST['source'] ?? 'Website Form';
        $pageURL = $_SERVER['HTTP_REFERER'] ?? 'Unknown Page';

        // === POPUP FORM (Simplified) ===
        if ($source === 'Popup Form') {
            $firstName = $_POST['firstName'] ?? '';
            $email     = $_POST['email'] ?? '';
            $phone     = $_POST['phone'] ?? '';
            $country   = $_POST['country'] ?? '';
            $course    = $_POST['course'] ?? '';

            $mail->isHTML(true);
            $mail->Subject = "New Trial Request via website Popup Form ";

            $mail->Body = "
                <h2>New Submission from Popup Form</h2>
                <p><strong>Submitted From:</strong> $pageURL</p>
                <hr>
                <p><strong>Name:</strong> " . htmlspecialchars($firstName) . "</p>
                <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
                <p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
                <p><strong>Country:</strong> " . htmlspecialchars($country) . "</p>
                <p><strong>Course:</strong> " . htmlspecialchars($course) . "</p>
                <hr>
                <p style='font-size:12px;color:#888;'>This message was automatically sent from your popup form.</p>
            ";

            $mail->AltBody = "
New Submission from Popup Form
Submitted From: $pageURL
Name: $firstName
Email: $email
Phone: $phone
Country: $country
Course: $course
            ";
        }

        // === CONTACT FORM (Detailed) ===
        else {
            $firstName = $_POST['firstName'] ?? '';
            $lastName  = $_POST['lastName'] ?? '';
            $email     = $_POST['email'] ?? '';
            $phone     = $_POST['phone'] ?? '';
            $country   = $_POST['country'] ?? '';
            $city      = $_POST['city'] ?? '';
            $course    = $_POST['course'] ?? '';
            $level     = $_POST['level'] ?? '';
            $schedule  = $_POST['schedule'] ?? '';
            $message   = $_POST['message'] ?? '';

            $mail->isHTML(true);
            $mail->Subject = "New Submission from Website Contact Form";

            $mail->Body = "
                <h2>New Submission from Contact Form</h2>
                <p><strong>Submitted From:</strong> $pageURL</p>
                <hr>
                <p><strong>Name:</strong> " . htmlspecialchars("$firstName $lastName") . "</p>
                <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
                <p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
                <p><strong>Country:</strong> " . htmlspecialchars($country) . "</p>
                <p><strong>City:</strong> " . htmlspecialchars($city) . "</p>
                <p><strong>Course:</strong> " . htmlspecialchars($course) . "</p>
                <p><strong>Level:</strong> " . htmlspecialchars($level) . "</p>
                <p><strong>Schedule:</strong> " . htmlspecialchars($schedule) . "</p>
                <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
                <hr>
                <p style='font-size:12px;color:#888;'>This message was automatically sent from your contact form.</p>
            ";

            $mail->AltBody = "
New Submission from Contact Form
Submitted From: $pageURL
Name: $firstName $lastName
Email: $email
Phone: $phone
Country: $country
City: $city
Course: $course
Level: $level
Schedule: $schedule
Message: $message
            ";
        }

        // === SEND EMAIL ===
        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo 'error';
    }
}
?>
