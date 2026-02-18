/* ---------- Alternating title letters ---------- */
const text = "Python Path";
const title = document.getElementById("title");

text.split("").forEach(letter=>{
    const span = document.createElement("span");
    span.textContent = letter;
    title.appendChild(span);
});

/* ---------- Click handler placeholder ---------- */
document.querySelectorAll(".lesson").forEach(lesson=>{
    lesson.addEventListener("click", ()=>{
        alert("Open lesson: " + lesson.textContent);

        // future navigation example:
        // window.location.href = "lesson.html?topic=" + lesson.textContent;
    });
});
