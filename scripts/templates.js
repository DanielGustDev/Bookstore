/**
 * Generates an HTML template string for a single comment card.
 *
 * @param {BookComment | null | undefined} singleComment - The comment object to render.
 * @returns {string} The formatted HTML string representing the comment, or an empty string if invalid.
 */
function createSingleCommentTemplate(singleComment) {
  if (!singleComment) {
    return "";
  }

  const authorName = getAuthorName(singleComment);
  const commentText = getCommentText(singleComment);

  return `
    <div class="comment-item">
      <p class="comment-author">[${authorName}]: </p>
      <p class="comment-text">${commentText}</p>
    </div>
  `;
}

/**
 * Normalizes raw book data by applying fallback values and formatting field properties for rendering.
 *
 * @param {Book} singleBook - The raw book data object.
 * @returns {{
 *   name: string,
 *   author: string,
 *   publishedYear: (number | string),
 *   genre: string,
 *   likes: number,
 *   price: string,
 *   likeClass: string,
 *   commentsHtml: string
 * }} An object containing clean, UI-ready book properties.
 */
function getCleanBookData(singleBook) {
  return {
    name: singleBook.name || "unknown title",
    author: singleBook.author || "unknown author",
    publishedYear: singleBook.publishedYear || "unknown",
    genre: singleBook.genre || "unknown",
    likes: typeof singleBook.likes === "number" ? singleBook.likes : 0,
    price: getFormattedPrice(singleBook.price),
    likeClass: getLikeClass(singleBook.liked),
    commentsHtml: renderComments(singleBook.comments),
  };
}

/**
 * Generates an HTML table template displaying the book's metadata (author, published year, genre).
 *
 * @param {{ author: string, publishedYear: (number | string), genre: string }} book - The sanitized book data.
 * @returns {string} The HTML string for the metadata table.
 */
function renderBookMetaTable(book) {
  return `
    <table class="info-table">
      <tr><td><strong>Author</strong></td><td>: ${book.author}</td></tr>
      <tr><td><strong>Published</strong></td><td>: ${book.publishedYear}</td></tr>
      <tr><td><strong>Genre</strong></td><td>: ${book.genre}</td></tr>
    </table>
  `;
}

/**
 * Generates an HTML template string for the like button and current like count.
 *
 * @param {number} likes - The number of likes for the book.
 * @param {string} likeClass - The CSS class applied to state whether the book is liked (`"liked"` or `""`).
 * @param {number} bookIndex - The position index of the book in the global array.
 * @returns {string} The HTML string for the like section.
 */
function renderLikeSection(likes, likeClass, bookIndex) {
  return `
    <p class="likes">
      ${likes} 
      <button class="heart-icon ${likeClass}" onclick="toggleLike(${bookIndex})">
        <img src="./assets/icons/heart.svg" alt="like button">
      </button>
    </p>
  `;
}

/**
 * Generates an HTML template string for the comments section, including existing comments and the add-comment form.
 *
 * @param {string} commentsHtml - The pre-rendered HTML string containing all comments.
 * @param {number} bookIndex - The position index of the book in the global array.
 * @returns {string} The HTML string for the entire comments component.
 */
function renderCommentsSection(commentsHtml, bookIndex) {
  return `
    <div class="comments-section">
      <h3>Comments:</h3>
      <div class="comments-list">
        ${commentsHtml}
      </div>
      
      <form class="comment-input-box" onsubmit="addComment(event, ${bookIndex})">
        <input type="text" placeholder="Add your comment ..." required>
        <button type="submit">
          <img src="./assets/icons/send-icon.svg" alt="send button">
        </button>
      </form>
    </div>
  `;
}

/**
 * Constructs the full HTML card component for a single book using component helpers.
 *
 * @param {Book} singleBook - The raw book object to render.
 * @param {number} bookIndex - The position index of the book in the array.
 * @returns {string} The complete HTML markup for a book card element.
 */
function createBookCardTemplate(singleBook, bookIndex) {
  const book = getCleanBookData(singleBook);

  return `
    <article class="book-card">
      <h2>${book.name}</h2>
      <div class="divider"></div>
      
      <div class="book-cover">
        <img src="./assets/icons/book.svg" alt="${book.name}">
      </div>
      <div class="divider"></div>

      <div class="book-meta">
        <p class="price">${book.price}</p>
        ${renderBookMetaTable(book)}
        ${renderLikeSection(book.likes, book.likeClass, bookIndex)}
      </div>
      <div class="divider"></div>

      ${renderCommentsSection(book.commentsHtml, bookIndex)}
    </article>
  `;
}
