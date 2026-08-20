// @ts-nocheck

function getAuthorName(singleComment) {
  if (singleComment && singleComment.name) {
    return singleComment.name;
  }
  return "unknown";
}

function getCommentText(singleComment) {
  if (singleComment && singleComment.comment) {
    return singleComment.comment;
  }
  return "";
}

function getFormattedPrice(bookPrice) {
  if (typeof bookPrice === "number") {
    return bookPrice.toFixed(2).replace(".", ",") + " €";
  }
  return "0,00 €";
}

function getLikeClass(isLiked) {
  if (isLiked) {
    return "liked";
  }
  return "";
}

function renderComments(commentArray) {
  if (
    !commentArray ||
    !Array.isArray(commentArray) ||
    commentArray.length === 0
  ) {
    return "<p>No comments found.</p>";
  }

  const commentHtmlArray = commentArray.map(function (singleComment) {
    return createSingleCommentTemplate(singleComment);
  });

  return commentHtmlArray.join("");
}

function renderBooks() {
  const container = document.getElementById("book-container");

  if (!container) {
    console.error("the element #book-container could not be found.");
    return;
  }

  if (
    typeof books === "undefined" ||
    !Array.isArray(books) ||
    books.length === 0
  ) {
    container.innerHTML = "<p>No books available.</p>";
    return;
  }

  let allBooksHtml = "";

  books.forEach(function (singleBook, bookIndex) {
    if (singleBook) {
      allBooksHtml += createBookCardTemplate(singleBook, bookIndex);
    }
  });

  container.innerHTML = allBooksHtml;
}

function init() {
  renderBooks();
  renderComments();
}

// Speicherliste für gelikte Bücher (als konstantes Array)
const likedBooksList = [];

// 1. Startfunktion: Erst Daten laden, dann anzeigen
function init() {
  loadLikesFromLocalStorage();
  renderBooks();
}

// 2. Klick-Funktion für den Herz-Button
function toggleLike(bookIndex) {
  const book = books[bookIndex];

  if (!book) {
    return;
  }

  // Zustand umschalten
  if (book.liked === true) {
    book.liked = false;
    book.likes = book.likes - 1;
    removeBookFromLikedList(book);
  } else {
    book.liked = true;
    book.likes = book.likes + 1;
    likedBooksList.push(book);
  }

  // Daten sichern und Seite neu zeichnen
  saveLikesToLocalStorage();
  renderBooks();
}

// 3. Hilfsfunktion: Buch aus dem Array entfernen
function removeBookFromLikedList(bookToRemove) {
  for (let i = 0; i < likedBooksList.length; i = i + 1) {
    if (likedBooksList[i] === bookToRemove) {
      likedBooksList.splice(i, 1); // Entfernt exakt 1 Element an Position i
      break; // Schleife sofort beenden
    }
  }
}

// 4. Im Browser-Speicher sichern
function saveLikesToLocalStorage() {
  const titlesToSave = [];

  for (let i = 0; i < likedBooksList.length; i = i + 1) {
    titlesToSave.push(likedBooksList[i].name);
  }

  const jsonString = JSON.stringify(titlesToSave);
  localStorage.setItem("likedBooks", jsonString);
}

// 5. Aus dem Browser-Speicher laden
function loadLikesFromLocalStorage() {
  const savedData = localStorage.getItem("likedBooks");

  if (!savedData) {
    return; // Abbrechen, falls noch nichts gespeichert wurde
  }

  const savedTitles = JSON.parse(savedData);

  for (let i = 0; i < books.length; i = i + 1) {
    const book = books[i];

    if (savedTitles.includes(book.name)) {
      book.liked = true;
      book.likes = book.likes + 1; // Zähler für gelikte Bücher anpassen
      likedBooksList.push(book);
    }
  }
}

// 1. Dialog öffnen und Inhalt Rendern
function openLikedBooksDialog() {
  const dialog = document.getElementById("liked-books-dialog");

  if (!dialog) {
    return;
  }

  renderLikedBooksList();

  dialog.showModal();
}

// 2. Dialog schließen
function closeLikedBooksDialog() {
  const dialog = document.getElementById("liked-books-dialog");

  if (dialog) {
    dialog.close();
  }
}

// 3. HTML-Liste für den Dialog erstellen
function renderLikedBooksList() {
  const container = document.getElementById("liked-books-list-container");

  if (!container) {
    return;
  }

  // Falls keine Bücher gelikt sind
  if (likedBooksList.length === 0) {
    container.innerHTML = "<p>Du hast noch keine Bücher gelikt.</p>";
    return;
  }

  let html = "<ul>";

  for (let i = 0; i < likedBooksList.length; i = i + 1) {
    const book = likedBooksList[i];
    html += "<li><strong>" + book.name + "</strong> (" + book.author + ")</li>";
  }

  html += "</ul>";

  container.innerHTML = html;
}

function stopBubbling(event) {
  event.stopPropagation();
}
