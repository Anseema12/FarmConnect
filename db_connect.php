<?php
$servername = "localhost";
$username = "root";  // Your MySQL username
$password = "";      // Your MySQL password
$dbname = "farmconnect";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<?php
include 'db_connect.php';

// Now you can use $conn to execute queries
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

// Process the results
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Product: " . $row["name"] . " - ₹" . $row["price"] . "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>
<?php
include 'db_connect.php';

// Now you can use $conn to execute queries
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

// Process the results
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Product: " . $row["name"] . " - ₹" . $row["price"] . "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>
