const searchsInputs = document.querySelectorAll(".searchInput");


searchsInputs.forEach(searchInput => {

    searchInput.addEventListener("click", () => {
        document.body.style.backgroundColor = "red"

        console.log("c'est cliqué");
        
    })
    searchInput.addEventListener("input", () => {
        document.body.style.backgroundColor = "green"

        console.log("c'est rempli");
        
    })
    
})