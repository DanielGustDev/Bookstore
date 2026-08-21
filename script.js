/**
 * @typedef {Object} BookComment
 * @property {string} name
 * @property {string} comment
 */

/**
 * @typedef {Object} Book
 * @property {string} name
 * @property {string} author
 * @property {number | string} [publishedYear]
 * @property {string} [genre]
 * @property {number} price
 * @property {boolean} liked
 * @property {number} likes
 * @property {BookComment[]} [comments]
 */

/**
 * Safely retrieves the author's name from a comment object.
 *
 * @param {Object} singleComment - The comment object containing user data.
 * @param {string} [singleComment.name] - The author's name.
 * @returns {string} The author's name if present, otherwise "unknown".
 */
function getAuthorName(singleComment) {
  if (singleComment && singleComment.name) {
    return singleComment.name;
  }
  return "unknown";
}

/**
 * Safely retrieves the comment text from a comment object.
 *
 * @param {Object} singleComment - The comment object containing user data.
 * @param {string} [singleComment.comment] - The comment message content.
 * @returns {string} The comment text if present, otherwise an empty string.
 */
function getCommentText(singleComment) {
  if (singleComment && singleComment.comment) {
    return singleComment.comment;
  }
  return "";
}

/**
 * Formats a numeric book price into a localized currency string formatted as `0,00 €`.
 *
 * @param {number} bookPrice - The price of the book.
 * @returns {string} The formatted price string.
 */
function getFormattedPrice(bookPrice) {
  if (typeof bookPrice === "number") {
    return bookPrice.toFixed(2).replace(".", ",") + " €";
  }
  return "0,00 €";
}

/**
 * Returns a CSS class name based on the boolean state of a book's like status.
 *
 * @param {boolean} isLiked - Indicates whether the book is liked.
 * @returns {string} `"liked"` if `isLiked` is true, otherwise an empty string.
 */
function getLikeClass(isLiked) {
  if (isLiked) {
    return "liked";
  }
  return "";
}

/**
 * Generates an HTML string containing rendered comment items from an array.
 *
 * @param {BookComment[] | null | undefined} commentArray - An array of comment objects.
 * @returns {string} The concatenated HTML string for all comments, or a fallback paragraph if empty.
 */
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

/**
 * Renders all available books into the `#book-container` DOM element.
 * Reads data from the global `books` array and updates container `innerHTML`.
 *
 * @returns {void}
 */
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

/**
 * In-memory storage list for liked book objects.
 * @type {Book[]}
 */
const likedBooksList = [];

/**
 * Initializes the application state by loading stored data from LocalStorage
 * and rendering both books and comments to the DOM.
 *
 * @returns {void}
 */
function init() {
  loadBooksFromLocalStorage();
  renderBooks();
}

/**
 * Toggles the like state of a book by its index, updates its like counter,
 * synchronization with `likedBooksList`, saves changes to LocalStorage, and re-renders the UI.
 *
 * @param {number} bookIndex - The index position of the book in the `books` array.
 * @returns {void}
 */
function toggleLike(bookIndex) {
  const book = books[bookIndex];

  if (!book) {
    return;
  }

  // Toggle state
  if (book.liked === true) {
    book.liked = false;
    book.likes = book.likes - 1;
    removeBookFromLikedList(book);
  } else {
    book.liked = true;
    book.likes = book.likes + 1;
    likedBooksList.push(book);
  }

  // Save data and re-render page
  saveBooksToLocalStorage();
  renderBooks();
}

/**
 * Removes a specific book object from the `likedBooksList` array.
 *
 * @param {Object} bookToRemove - The book object to remove.
 * @returns {void}
 */
function removeBookFromLikedList(bookToRemove) {
  for (let i = 0; i < likedBooksList.length; i = i + 1) {
    if (likedBooksList[i] === bookToRemove) {
      likedBooksList.splice(i, 1); // Removes exactly 1 element at position i
      break; // Exit loop immediately
    }
  }
}

/**
 * Renders the list of liked books and opens the modal dialog.
 *
 * @returns {void}
 */
function openLikedBooksDialog() {
  const dialog = /** @type {HTMLDialogElement | null} */ (
    document.getElementById("liked-books-dialog")
  );

  if (!dialog) {
    return;
  }

  renderLikedBooksList();
  dialog.showModal();
}

/**
 * Closes the liked books modal dialog if present in the DOM.
 *
 * @returns {void}
 */
function closeLikedBooksDialog() {
  const dialog = /** @type {HTMLDialogElement | null} */ (
    document.getElementById("liked-books-dialog")
  );

  if (dialog) {
    dialog.close();
  }
}

/**
 * Renders the HTML markup for liked books inside `#liked-books-list-container`.
 * Displays an informational message if no books are liked.
 *
 * @returns {void}
 */
function renderLikedBooksList() {
  const container = document.getElementById("liked-books-list-container");

  if (!container) {
    return;
  }

  // If no books are liked
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

/**
 * Stops event propagation (bubbling) to prevent parent event listeners from triggering.
 *
 * @param {Event} event - The DOM Event object.
 * @returns {void}
 */
function stopBubbling(event) {
  event.stopPropagation();
}

/**
 * Handles the submit event for adding a new comment to a specified book,
 * saves the state to LocalStorage, and triggers a UI update.
 *
 * @param {SubmitEvent} event - The form submission event.
 * @param {number} bookIndex - The index of the targeted book in the `books` array.
 * @returns {void}
 */
function addComment(event, bookIndex) {
  event.preventDefault();

  const form = /** @type {HTMLFormElement | null} */ (event.target);
  const book = books[bookIndex];

  if (!form || !book) {
    return;
  }

  const inputElement = /** @type {HTMLInputElement | null} */ (
    form.querySelector("input")
  );

  if (!inputElement || !inputElement.value.trim()) {
    return;
  }

  // Initializes the array if no comments exist yet
  book.comments = book.comments || [];

  book.comments.push({
    name: "MySelf",
    comment: inputElement.value.trim(),
  });

  saveBooksToLocalStorage();
  renderBooks();
}

/**
 * Serializes and saves the global `books` array to the browser's `localStorage` under key `"myBooksData"`.
 *
 * @returns {void}
 */
function saveBooksToLocalStorage() {
  const jsonString = JSON.stringify(books);
  localStorage.setItem("myBooksData", jsonString);
}

/**
 * Loads saved book data from `localStorage` under key `"myBooksData"`, updates the global `books` array,
 * and populates `likedBooksList` with previously liked books.
 *
 * @returns {void}
 */
function loadBooksFromLocalStorage() {
  const savedData = localStorage.getItem("myBooksData");

  if (!savedData) {
    return; // Keep default data if nothing is saved
  }

  // Replace global 'books' array with saved state
  const parsedBooks = JSON.parse(savedData);

  // Validate data and update array
  if (Array.isArray(parsedBooks) && parsedBooks.length > 0) {
    for (let i = 0; i < parsedBooks.length; i = i + 1) {
      books[i] = parsedBooks[i];

      // Re-register liked books in likedBooksList
      if (books[i].liked === true && !likedBooksList.includes(books[i])) {
        likedBooksList.push(books[i]);
      }
    }
  }
}
