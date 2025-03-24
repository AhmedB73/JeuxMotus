document
  .getElementById("guessForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let guess = document.getElementById("guessInput").value.toUpperCase();
    if (guess.length !== 6) {
      alert("Le mot doit contenir exactement 6 lettres.");
      return;
    }

    fetch("motus.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "guess=" + guess,
    })
      .then((response) => response.json())
      .then((data) => {
        let resultDiv = document.getElementById("result");
        let row = document.createElement("div");

        for (let i = 0; i < guess.length; i++) {
          let span = document.createElement("span");
          span.classList.add("letter");

          if (data[i] === "correct") {
            span.classList.add("correct");
          } else if (data[i] === "present") {
            span.classList.add("present");
          } else {
            span.classList.add("absent");
          }

          span.textContent = guess[i];
          row.appendChild(span);
        }

        resultDiv.appendChild(row);
        document.getElementById("guessInput").value = "";
      });
  });

function resetGame() {
  fetch("reset.php").then(() => {
    setTimeout(() => {
      location.reload();
    }, 500); // Ajoute un léger délai pour s'assurer que la session est bien supprimée
  });
}
