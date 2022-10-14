const mainMenuHamburger = document.getElementById("mainMenuHamburger");

mainMenuHamburger.onclick = function(event,error){
    mainMenuHamburger.classList.toggle("javaHandler");
    console.log(error)
    console.log(event)
}