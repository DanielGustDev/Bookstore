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
