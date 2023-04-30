 const darkmode = document.getElementById("darkmode-icon");
 darkmode.addEventListener("click", switchToDarkMode);
 var mode = false;
 
 function switchToDarkMode() {
    darkmode.innerText = darkmode.innerText === "dark_mode" ? "light_mode" : "dark_mode";
    document.querySelector(".navbar").classList.toggle("switchToDarkMode-header");
    document.querySelector(".modal").classList.toggle("switchToDarkMode-header");
    document.querySelector(".nav-title").classList.toggle("switchToDarkMode-header");
    document.querySelector("#ham").classList.toggle("switchToDarkMode-hamburger");
    document.querySelector("#bur").classList.toggle("switchToDarkMode-hamburger");
    document.querySelector("#ger").classList.toggle("switchToDarkMode-hamburger");
    document.querySelector(".timer").classList.toggle("switchToDarkMode-timer");
    
    document.body.classList.toggle("switchToDarkMode-body");
    

    if(mode){
        mode = false;
        document.querySelector("#darkmode-icon").style.backgroundColor = "#ffffff";
        document.querySelector("#timer-icon").style.backgroundColor = "#ffffff";
        document.querySelector(".navbar-hamburger").style.backgroundColor = "#ffffff";
    } else {
        mode = true;
        document.querySelector("#darkmode-icon").style.backgroundColor = "#232222";
        document.querySelector("#timer-icon").style.backgroundColor = "#232222";
        document.querySelector(".navbar-hamburger").style.backgroundColor = "#232222";
    }

    var linkTexts = document.querySelectorAll(".link-text");
    linkTexts.forEach((element) => {
        element.classList.toggle("switchToDarkMode-links");
    })

 }