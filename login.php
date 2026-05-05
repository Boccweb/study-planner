<?php
session_start();
require 'koneksi.php';

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    $stmt = mysqli_prepare($conn, "SELECT * FROM login WHERE username = ?");
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    

    if ($row = mysqli_fetch_assoc($result)) {
        if ($password === $row["password"]) {
            $_SESSION["user"] = $row["username"];
            header("Location: index.html");
            exit();
        } else {
            $error = "Password salah!";
        }
    } else {
        $error = "Username tidak ditemukan!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — Smart Study Planner</title>
    <link rel="stylesheet" href="login-style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>

    <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>

    <div class="login-wrapper">

        <div class="login-left">
            <div class="brand">
                <img src="aset/logo.png" alt="Logo">
            </div>
            <div class="left-text">
                <h1>Smart Study<br><span>Planner</span></h1>
                <p>Buat tujuan belajar mu di sini.<br>Fokus, disiplin, dan raih prestasimu!</p>
            </div>
            <img src="aset/maskot.png" class="maskot" alt="Maskot">
        </div>

        <div class="login-right">
            <div class="login-card">

                <div class="login-header">
                    <h2>Selamat Datang</h2>
                    <p>Masuk untuk melanjutkan belajar</p>
                </div>

                <?php if ($error): ?>
                    <div class="alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="">

                    <div class="input-group">
                        <label for="username">Username</label>
                        <div class="input-wrap">
                            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <input type="text" id="username" name="username"
                                placeholder="Masukkan username" required
                                value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>">
                        </div>
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <div class="input-wrap">
                            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            <input type="password" id="password" name="password"
                                placeholder="Masukkan password" required>
                            <button type="button" class="toggle-pw" onclick="togglePassword()">
                                <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="btn-login">
                        Masuk
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </button>

                </form>

                <p class="login-footer">Smart Study Planner &copy; 2025</p>

            </div>
        </div>

    </div>

    <script src="main.js"></script>
</body>
</html>