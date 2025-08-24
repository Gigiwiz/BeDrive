const searchsInputs = document.querySelectorAll(".searchInput");


searchsInputs.forEach(searchInput => {

    searchInput.addEventListener("focus", () => {
        document.body.style.backgroundColor = "red"

        console.log("c'est en focus");
        
    })
    searchInput.addEventListener("input", () => {
        document.body.style.backgroundColor = "green"

        console.log("c'est rempli");
        
    })
    
})

