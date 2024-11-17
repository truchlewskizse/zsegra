$(document).ready(function () {
  // Funkcja uruchamiana po załadowaniu całego dokumentu HTML.

  const colors = ["green", "red", "yellow", "blue"];
  // Tablica z nazwami dostępnych kolorów, które reprezentują przyciski w grze.

  let gameSequence = [];
  // Tablica przechowująca losowo wygenerowaną sekwencję kolorów,
  // którą gracz musi zapamiętać.

  let userSequence = [];
  // Tablica przechowująca sekwencję kolorów, które gracz wprowadza podczas danej rundy.

  let level = 0;
  // Zmienna przechowująca aktualny poziom gry.
  // Każdy poprawnie odtworzony poziom zwiększa tę wartość o 1.

  let started = false;
  // Zmienna określająca, czy gra została rozpoczęta.
  // false oznacza, że gra jeszcze się nie rozpoczęła.

  function startGame() {
    // Funkcja inicjalizująca nową grę.
    level = 0; // Resetuje poziom gry.
    gameSequence = []; // Resetuje sekwencję gry.
    userSequence = []; // Resetuje sekwencję użytkownika.
    started = true; // Ustawia zmienną started na true, oznaczając rozpoczęcie gry.
    $("h1").text("Poziom " + level); // Wyświetla aktualny poziom gry w nagłówku.
    nextSequence(); // Wywołuje funkcję generującą pierwszą sekwencję kolorów.
  }
  // Resetowanie userSequence na początku każdej nowej rundy zapewnia,
  //że gracz wprowadzi nową sekwencję tylko dla bieżącej rundy.
  function nextSequence() {
    // Funkcja generująca kolejną sekwencję kolorów.
    userSequence = []; // Resetuje sekwencję użytkownika na początku rundy.
    level++; // Zwiększa poziom gry o 1.
    $("h1").text(`Poziom ${level}`); // Aktualizuje nagłówek z nowym poziomem.
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    // Losuje jeden z kolorów dostępnych w tablicy colors.
    gameSequence.push(randomColor);
    // Dodaje wylosowany kolor do sekwencji gry.
    $(`#${randomColor}`).fadeOut(100).fadeIn(100);
    // Tworzy efekt migania dla wylosowanego przycisku.
    playSound(randomColor);
    // Odtwarza dźwięk odpowiadający wylosowanemu kolorowi.
  }

  function playSound(color) {
    // Funkcja odtwarzająca dźwięk przypisany do koloru.
    const audio = new Audio(`../dzwiek/${color}.mp3`);
    // Tworzy nowy obiekt audio, odwołując się do pliku dźwiękowego.
    $(audio).on("error", function () {
      console.error(`Nie znaleziono pliku dźwiękowego: ${color}.mp3`);
    });
    // Obsługuje błędy związane z brakiem pliku dźwiękowego.
    audio.play();
    // Odtwarza dźwięk.
  }

  function animatePress(color) {
    // Funkcja dodająca animację kliknięcia dla przycisku.
    $(`#${color}`).addClass("pressed");
    // Dodaje klasę CSS `pressed` do klikniętego przycisku.
    setTimeout(() => {
      $(`#${color}`).removeClass("pressed");
    }, 100);
    // Usuwa klasę CSS `pressed` po 100 ms, kończąc animację.
  }

  $(".zse-kwadrat").click(function () {
    // Obsługuje zdarzenie kliknięcia na przyciski gry.
    if (!started) return;
    // Ignoruje kliknięcia, jeśli gra się jeszcze nie rozpoczęła.
    const userChosenColor = $(this).attr("id");
    // Pobiera id klikniętego elementu, które odpowiada kolorowi.
    userSequence.push(userChosenColor);
    // Dodaje wybrany kolor do sekwencji użytkownika.
    playSound(userChosenColor);
    // Odtwarza dźwięk odpowiadający wybranemu kolorowi.
    animatePress(userChosenColor);
    // Dodaje animację kliknięcia dla wybranego koloru.
    checkAnswer(userSequence.length - 1);
    // Sprawdza poprawność odpowiedzi użytkownika.
  });

  function checkAnswer(currentLevel) {
    // Funkcja sprawdzająca, czy sekwencja użytkownika jest poprawna.
    if (userSequence[currentLevel] === gameSequence[currentLevel]) {
      // Porównuje wybrany kolor użytkownika z odpowiednim kolorem z sekwencji gry.
      if (userSequence.length === gameSequence.length) {
        // Jeśli użytkownik odtworzył całą sekwencję poprawnie...
        setTimeout(() => {
          nextSequence();
        }, 1000);
        // Generuje nową sekwencję po 1 sekundzie.
      }
    } else {
      playSound("game-over");
      // Odtwarza dźwięk oznaczający przegraną.
      $("body").addClass("game-over");
      // Dodaje klasę CSS `game-over` do ciała dokumentu, zmieniając styl na chwilę.
      $("h1").text("Przegrałeś... zacznij od nowa");
      // Wyświetla komunikat o przegranej w nagłówku.
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 2000);
      // Usuwa klasę CSS `game-over` po 2000 ms.
      startOver();
      // Resetuje grę.
    }
  }

  function startOver() {
    // Funkcja resetująca stan gry po przegranej.
    started = false;
    // Oznacza, że gra jest zresetowana i gotowa do ponownego rozpoczęcia.
    $("h1").text("Naciśnij Start, aby rozpocząć grę");
    // Wyświetla komunikat zachęcający do rozpoczęcia nowej gry.
  }

  $(".zse-container").click(function () {
    // Obsługuje kliknięcie w kontener startowy gry.
    if (!started) {
      // Sprawdza, czy gra nie została jeszcze rozpoczęta.
      startGame();
      // Rozpoczyna nową grę.
    }
  });
});
