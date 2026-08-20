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

// Speicherliste für gelikte Bücher (als konstantes Array)
const likedBooksList = [];

// 1. Startfunktion: Erst Daten laden, dann anzeigen
function init() {
  loadBooksFromLocalStorage();
  renderBooks();
  renderComments();
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
  saveBooksToLocalStorage();
  renderBooks();
}

// Hilfsfunktion: Buch aus dem Array entfernen
function removeBookFromLikedList(bookToRemove) {
  for (let i = 0; i < likedBooksList.length; i = i + 1) {
    if (likedBooksList[i] === bookToRemove) {
      likedBooksList.splice(i, 1); // Entfernt exakt 1 Element an Position i
      break; // Schleife sofort beenden
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

// 2. addComment-Funktion mit Speicherung erweitern
function addComment(event, bookIndex) {
  event.preventDefault();

  const form = event.target;
  const inputElement = form.querySelector("input");
  const commentText = inputElement.value;

  const book = books[bookIndex];

  if (!book) {
    return;
  }

  if (!Array.isArray(book.comments)) {
    book.comments = [];
  }

  const newComment = {
    name: "MySelf",
    comment: commentText,
  };

  book.comments.push(newComment);

  // NEU: Nach dem Hinzufügen im LocalStorage speichern
  saveBooksToLocalStorage();

  renderBooks();
}

// 3. Hilfsfunktion: Aktuelle Bücher-Daten im Browser sichern
function saveBooksToLocalStorage() {
  const jsonString = JSON.stringify(books);
  localStorage.setItem("myBooksData", jsonString);
}

// 4. Hilfsfunktion: Gespeicherte Daten beim Laden wiederherstellen
function loadBooksFromLocalStorage() {
  const savedData = localStorage.getItem("myBooksData");

  if (!savedData) {
    return; // Wenn noch nichts gespeichert ist, bleiben die Standard-Daten
  }

  // Ersetzt das globale 'books'-Array durch den gespeicherten Stand
  const parsedBooks = JSON.parse(savedData);

  // Überprüfen, ob die Daten gültig sind, und das Array aktualisieren
  if (Array.isArray(parsedBooks) && parsedBooks.length > 0) {
    for (let i = 0; i < parsedBooks.length; i = i + 1) {
      books[i] = parsedBooks[i];

      // Falls das Buch gelikt war, auch direkt in der likedBooksList registrieren
      if (books[i].liked === true && !likedBooksList.includes(books[i])) {
        likedBooksList.push(books[i]);
      }
    }
  }
}
