const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const addBtn = document.getElementById("add-btn");
const subjectNameInput = document.getElementById("first-input");
const studyHoursInput = document.getElementById("second-input");
const subjectContainer = document.querySelector(".all-subjects");
const hiddenSection = document.getElementById("Subject");

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

function toggleLight() {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
}
addBtn.addEventListener("click", function () {
    const subjectName = subjectNameInput.value.trim();
    const studyHours = studyHoursInput.value.trim(); 

    if (subjectName === "" || studyHours === "") {
        alert("Please enter both Subject Name and Daily Study Hours!");
        return;
    }

    const newSubject = document.createElement("div");
    newSubject.classList.add("subject-entry");
    newSubject.innerHTML = `
        <h3>${subjectName}</h3>
        <p>Goal: ${studyHours} hours per day</p>
        <p>Progress: 0 hours</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <input type="number" placeholder="Hours studied" class="log-input" min="0" step="0.5">
        <button class="log-btn">Log Progress</button>
    `;

   
    subjectContainer.appendChild(newSubject);

    
    hiddenSection.style.visibility = "visible";
    hiddenSection.innerHTML = `
        <h3>Subject: ${subjectName}</h3>
        <p>Goal: ${studyHours} hours per day</p>
    `;

    subjectNameInput.value = "";
    studyHoursInput.value = "";

    newSubject.querySelector(".delete-btn").addEventListener("click", function () {
        newSubject.remove();

        if (subjectContainer.children.length === 0) {
            hiddenSection.style.visibility = "hidden";
        }
    });

    newSubject.querySelector(".log-btn").addEventListener("click", function () {
        const logInput = newSubject.querySelector(".log-input");
        const progressText = newSubject.querySelector("p:nth-of-type(2)");
        const loggedHours = parseFloat(logInput.value) || 0;

        if (loggedHours > 0) {
            progressText.textContent = `Progress: ${loggedHours} hours`;
            logInput.value = "";
        } else {
            alert("Please enter a valid number for progress.");
        }
    });
});
