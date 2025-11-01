<?php
include 'db_connect.php';

// Get form data
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
$email = $_POST['email'];
$fullName = $_POST['fullName'];
$contact = $_POST['contact'];
$role = $_POST['userRole'];

// Insert user
$sql = "INSERT INTO users (username, password, email, full_name, contact_number, role) 
        VALUES ('$username', '$password', '$email', '$fullName', '$contact', '$role')";

if ($conn->query($sql) === TRUE) {
    $user_id = $conn->insert_id;
    
    // If user is a farmer, add to farmers table
    if ($role == 'farmer') {
        $farmName = $fullName . "'s Farm"; // Default farm name
        $sql = "INSERT INTO farmers (user_id, farm_name) VALUES ('$user_id', '$farmName')";
        $conn->query($sql);
    }
    
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
