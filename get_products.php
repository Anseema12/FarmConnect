<?php
header('Content-Type: application/json');
include 'db_connect.php';

$sql = "SELECT p.product_id as id, p.name, f.farm_name as farmer, p.price, 
        p.image_url as image, c.name as category, p.is_organic as organic, p.stock_quantity
        FROM products p
        JOIN farmers f ON p.farmer_id = f.farmer_id
        JOIN categories c ON p.category_id = c.category_id";

$result = $conn->query($sql);
$products = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Convert boolean from MySQL to JavaScript format
        $row['organic'] = (bool)$row['organic'];
        $products[] = $row;
    }
}

echo json_encode($products);
$conn->close();
?>
