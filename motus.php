<?php
session_start();
$words = ["AVIRON", "BANANE", "CITRON", "DESSIN", "FLEURS", "GRISER", "MANGER", "NAPPER", "OISEAU", "POMMES",];

// Vérifie si la session a été réinitialisée
if (!isset($_SESSION["word"]) || empty($_SESSION["word"])) {
  $_SESSION["word"] = $words[array_rand($words)];
}

$word = $_SESSION["word"];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $guess = strtoupper($_POST["guess"]);
  $result = [];

  for ($i = 0; $i < 6; $i++) {
    if ($guess[$i] === $word[$i]) {
      $result[$i] = "correct";
    } elseif (strpos($word, $guess[$i]) !== false) {
      $result[$i] = "present";
    } else {
      $result[$i] = "absent";
    }
  }

  echo json_encode($result);
}
