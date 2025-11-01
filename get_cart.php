<?php
include 'db_connect.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT c.cart_item_id, c.product_id, c.quantity, p.name, p.price, p.image_url as image, 
        p.is_organic as organic, f.farm_name as farmer
        FROM cart_items c
        JOIN products p ON c.product_id = p.product_id
        JOIN farmers f ON p.farmer_id = f.farmer_id
        WHERE c.user_id = $user_id";

$result = $conn->query($sql);
$cart = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['organic'] = (bool)$row['organic'];
        $cart[] = $row;
    }
}

echo json_encode($cart);
$conn->close();
?>
