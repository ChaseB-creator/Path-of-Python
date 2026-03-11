/* ---------- Alternating title letters ---------- */
const text = "Python Path";
const title = document.getElementById("title");

text.split("").forEach(letter=>{
    const span = document.createElement("span");
    span.textContent = letter;
    title.appendChild(span);
});

/* ---------- Lesson modal logic ---------- */
// build modal markup (in case HTML is missing)
// note: index.html now includes the markup directly, but this ensures it's available
let modal = document.getElementById('lesson-modal');
if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lesson-modal';
    modal.innerHTML = `
    <div class="lesson-card">
        <button id="close-btn">&times;</button>
        <h2 id="lesson-title"></h2>
        <div id="lesson-page-text"></div>
        <div class="lesson-nav">
            <button id="prev-btn" class="nav-btn">&larr;</button>
            <button id="next-btn" class="nav-btn">&rarr;</button>
        </div>
    </div>`;
    document.body.appendChild(modal);
}

const titleEl = modal.querySelector('#lesson-title');
const pageText = modal.querySelector('#lesson-page-text');
const prevBtn = modal.querySelector('#prev-btn');
const nextBtn = modal.querySelector('#next-btn');
const closeBtn = modal.querySelector('#close-btn');

let pages = [];
let currentPage = 0;

function showLesson(topic) {
    // create at least three dummy pages; could be customized per topic later
    pages = [];
    for (let i = 1; i <= 3; i++) {
        pages.push(`Sample text page ${i} for ${topic}`);
    }
    currentPage = 0;
    titleEl.textContent = topic;
    updateContent();
    modal.classList.add('show');
}

function updateContent() {
    // simple fade effect
    pageText.style.opacity = '0';
    setTimeout(() => {
        pageText.textContent = pages[currentPage];
        pageText.style.opacity = '1';
    }, 150);

    // previous button visibility
    if (currentPage === 0) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    // next button appearance or checkmark
    if (currentPage === pages.length - 1) {
        nextBtn.textContent = '✓';
    } else {
        nextBtn.textContent = '→';
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateContent();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updateContent();
    } else {
        // clicking on checkmark closes the lesson
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
}

closeBtn.addEventListener('click', closeModal);

// clicking backdrop closes
modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeModal();
    }
});

// hook up lesson squares
document.querySelectorAll(".lesson").forEach(lesson => {
    lesson.addEventListener("click", () => {
        showLesson(lesson.textContent.trim());
    });
});
