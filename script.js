const form = document.getElementById("form");
const input = document.getElementById("input");
const msg = document.getElementById("msg");
const postContainer = document.getElementById("posts");
let data = JSON.parse(localStorage.getItem("data")) || [];
let editIndex = null;
 




form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    if (input.value) {
        if (editIndex !== null) {
            updatePost();
        } else {
            addNewPost();
        }
        displayPosts();
        saveToLocalStorage();
        clearInput();
        displayMessage("Data posted successfully", "green");
    } else {
        displayMessage("Please fill the form!", "red");
    }
}

function displayMessage(message, color) {
    msg.innerHTML = message;
    msg.style.color = color;
}

function addNewPost() {
    data.push({ text: input.value });
}

function updatePost() {
    data[editIndex].text = input.value;
    editIndex = null;
    document.getElementById("submitButton").innerText = "Post";

}

function displayPosts() {
    postContainer.innerHTML = "";
    data.forEach((item, index) => {
        postContainer.innerHTML += `
            <div>
                <p>${item.text}</p>
                <span>
                    <i onclick="deletePost(${index})" class="fa-solid fa-trash"></i>
                    <i onclick="startEdit(${index})" class="fa-regular fa-pen-to-square"></i>
                </span>
            </div>`;
    });
}

function deletePost(index) {
    data.splice(index, 1);
    displayPosts();
    saveToLocalStorage();
}

function startEdit(index) {
    editIndex = index;
    input.value = data[index].text;
    document.getElementById("submitButton").innerText = "Update";

}

function saveToLocalStorage() {
    localStorage.setItem("data", JSON.stringify(data));
}

function clearInput() {
    input.value = "";
}

// Initial display of posts
displayPosts();
