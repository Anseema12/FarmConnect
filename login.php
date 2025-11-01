<?php
include 'db_connect.php';
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password'])) {
        // Password is correct, set session variables
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        
        // Update last login time
        $sql = "UPDATE users SET last_login = NOW() WHERE user_id = " . $user['user_id'];
        $conn->query($sql);
        
        echo json_encode(['success' => true, 'user' => [
            'username' => $user['username'],
            'role' => $user['role'],
            'fullName' => $user['full_name']
        ]]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid password']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'User not found']);
}

$conn->close();
?>
