$(document).ready(function () {
  // Tablica z dostępnymi kolorami przycisków
  const colors = ["green", "red", "yellow", "blue"];

  // Deklaracje zmiennych globalnych
  let gameSequence = [];
  let userSequence = [];
  let level = 0;
  let started = false;

  // Funkcja inicjalizująca lub resetująca grę
  function startGame() {
    level = 0;
    gameSequence = [];
    userSequence = [];
    started = true;
    $("h1").text("Poziom " + level);
    nextSequence();
  }

  // Funkcja generująca kolejną sekwencję kolorów
  function nextSequence() {
    userSequence = [];
    level++;
    $("h1").text(`Poziom ${level}`);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    // Animacja i dźwięk dla nowego koloru
    $(`#${randomColor}`).fadeOut(100).fadeIn(100);
    playSound(randomColor);
  }

  // Funkcja odtwarzająca dźwięk przypisany do koloru
  function playSound(color) {
    const audio = new Audio(`../dzwiek/${color}.mp3`);
    $(audio).on("error", function () {
      console.error(`Nie znaleziono pliku dźwiękowego: ${color}.mp3`);
    });
    audio.play();
  }

  // Funkcja dodająca animację kliknięcia dla przycisku
  function animatePress(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout(() => {
      $(`#${color}`).removeClass("pressed");
    }, 100);
  }

  // Funkcja sprawdzająca odpowiedź użytkownika
  function checkAnswer(currentLevel) {
    if (userSequence[currentLevel] === gameSequence[currentLevel]) {
      if (userSequence.length === gameSequence.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      // Obsługa przegranej
      playSound("game-over");
      $("body").addClass("game-over");
      $("h1").text("Przegrałeś... Naciśnij Start, aby spróbować ponownie.");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 2000);
      startOver();
    }
  }

  // Funkcja resetująca grę po przegranej
  function startOver() {
    started = false;
    $("h1").text("Naciśnij Start, aby rozpocząć grę");
  }

  // Obsługa kliknięcia w przycisk z kolorami
  $(".zse-kwadrat").click(function () {
    if (!started) return;

    const userChosenColor = $(this).attr("id");
    userSequence.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userSequence.length - 1);
  });

  // Obsługa kliknięcia w kontener startowy gry
  $(".zse-container").click(function () {
    if (!started) {
      startGame();
    }
  });
});
