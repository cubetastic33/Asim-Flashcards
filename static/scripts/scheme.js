//color scheme change
var schemeText = document.getElementById("scheme-text");
const defaultScheme = document.getElementById("scheme-default");
const blueScheme = document.getElementById("scheme-blue");
const redScheme = document.getElementById("scheme-red");
const yellowScheme = document.getElementById("scheme-yellow");
const greenScheme = document.getElementById("scheme-green");
var color = [ture , false, false, false, false];
defaultScheme.addEventListener("click", () => {
    for (let i = 0; i < cars.color; i++) {
        color[i] = false
    }
    color[0] = true;
    schemeText.innerText = "This is the default scheme";
});
blueScheme.addEventListener("click", () => {
    for (let i = 0; i < cars.color; i++) {
        color[i] = false
    }
    color[1] = true;
    schemeText.innerText = "This is the blue scheme";
});
redScheme.addEventListener("click", () => {
    for (let i = 0; i < cars.color; i++) {
        color[i] = false
    }
    color[2] = true;
    schemeText.innerText = "This is the red scheme";
});
yellowScheme.addEventListener("click", () => {
    for (let i = 0; i < cars.color; i++) {
        color[i] = false
    }
    color[3] = true;
    schemeText.innerText = "This is the yellow scheme";
});
greenScheme.addEventListener("click", () => {
    for (let i = 0; i < cars.color; i++) {
        color[i] = false
    }
    color[4] = true;
    schemeText.innerText = "This is the green scheme";
});