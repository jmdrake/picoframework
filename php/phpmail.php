<?php
require '../php/PHPMailerAutoload.php';

function mailuser($email, $name, $subject, $message){
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = $smtphost;    
    $mail->SMTPAuth = $smtpauth;                               // Enable SMTP authentication
    $mail->Username = $smtpusername;
    $mail->Password = $smtppassword;                           // SMTP password
    $mail->Port = $smtpport;                                    // TCP port to connect to
    $mail->setFrom($adminemail, $adminname);

    $mail->addAddress($email, $name);     // Add a recipient
    $mail->addReplyTo($replyemail, $replyname);
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = $subject;
    $mail->Body    = $message;

    if(!($mail->send())) {
        return 'Mailer error: ' . $mail->ErrorInfo;    
    } else {
        return "Ok";
    }
}
/*
function mailuser($email, $name, $subject, $message){
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = $smtphost;    
    $mail->SMTPAuth = $smtpauth;                               // Enable SMTP authentication
    $mail->Username = $smtpusername;
    $mail->Password = $smtppassword;                           // SMTP password
    $mail->Port = $smtpport;                                    // TCP port to connect to
    $mail->setFrom($adminemail, $adminname);

    $mail->addAddress($email, $name);     // Add a recipient
    $mail->addReplyTo("noreply@ratchetlove.com", "No reply");
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = $subject;
    $mail->Body    = $message;

    if(!$mail->send()) {
        return 'Mailer error: ' . $mail->ErrorInfo;    
    } else {
        return "Ok"
    }
}*/
?>