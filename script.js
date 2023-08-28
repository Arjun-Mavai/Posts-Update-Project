// Utility function to get an element by its ID 
let id = (elementId) => document.getElementById(elementId);

// References to DOM elements
let form = id("form"),
    input = id("input"),
    msg = id("msg"),
    post = id("posts"),
    submitButton = id("submitButton");

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

// Validate the form input
let formValidation = () => {
    if (!input.value) {
        msg.innerHTML = "Please fill the form!";
        msg.style.color = "red";
    } else {
        // Check if we are in edit mode or adding a new post
        if (editIndex !== null) {
            updatePost();
        } else {
            acceptData();
        }
        msg.innerHTML = `Data posted ${input.value} successfully`;
        msg.style.color = "green";
    }
};

// Data array to store posts
let data = [];

// Variable to track the post being edited
let editIndex = null;

// Accept and store the form data
let acceptData = () => {
    data.push({ text: input.value });
    renderPosts();
    updateLocalStorage();
   
    input.value = "";
};

function updateLocalStorage(){
    localStorage.setItem("data", JSON.stringify(data));
}

// Render the posts on the page
function renderPosts() {
    post.innerHTML = "";
    data.forEach((item, index) => {
        post.innerHTML += `<div>
            <p>${item.text}</p>
            <span id="options">
                <i onClick="deletePost(${index})" class="fa-solid fa-trash"></i>
                <i onClick="startEdit(${index})" class="fa-regular fa-pen-to-square"></i>
            </span>
        </div>`;
    });
}

// Delete a post
const deletePost = (index) => {
    data.splice(index, 1);
   updateLocalStorage();
    renderPosts();
};

// Start editing a post
function startEdit(index) {
    editIndex = index;
    input.value = data[index].text;
    submitButton.innerText = "Update"; // Change button text to "Update"
}

// Update a post
function updatePost() {
    data[editIndex].text = input.value;
    renderPosts();
     updateLocalStorage();
    editIndex = null;
    submitButton.innerText = "Post"; // Change button text back to "Post"
    input.value = "";
}

// Load stored data from local storage on page load
(() => {
    let storedData = localStorage.getItem("data");
    if (storedData) {
        data = JSON.parse(storedData);
        renderPosts();
    }
})();
