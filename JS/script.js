import { getSupermarket } from "./BeDrive.js";


function sansAccents(str) {
  return str
    .normalize("NFD")              // décompose les lettres accentuées
    .replace(/[\u0300-\u036f]/g, ""); // supprime les diacritiques (é, à, ç, ü…)
}





getSupermarket().then(reponse => {

    const lesProduits = document.querySelectorAll(".containerProduits .produit")
    const selectSupermarche = document.querySelectorAll(".switchSupermarket")
    const searchInputs = document.querySelectorAll(".searchInput")
    const clearSearchBarBtn = document.querySelectorAll(".clean-search-bar")
    const aucunProduitTrouveTexte = document.getElementById("aucunProduitTrouve")




    searchInputs.forEach(input => {
        const value = input.value
        input.addEventListener("input", (e) => {
            const inputValue = e.target.value  
            searchProduct(inputValue)
        })
    })


    function searchProduct(inputValue){
        selectSupermarche.forEach(select => {
            lesProduits.forEach(produit => {
                const productToFind = produit.querySelector("span.nom").textContent
                
                if(sansAccents(productToFind).toLowerCase().includes(sansAccents(inputValue).toLowerCase()) && produit.dataset.store === select.value ){
                    produit.style.display = "flex"
                }
                else
                    produit.style.display = "none"
            })    
        })
    }

    // lesProduits.forEach(produit => {
    //     selectSupermarche.forEach(select => {
    //     if(produit.style.display === "none" && produit.className.includes(select.value)){
    //         aucunProduitTrouveTexte.style.display = "flex"
    //     }
    //     })
    // })


    function clearSearchBar(){
        clearSearchBarBtn.forEach(button => {
            button.addEventListener("click", () => {
                searchInputs.forEach(input => {
                    input.value = ""
                })
                selectSupermarche.forEach(select => {
                    lesProduits.forEach(produit => {

                        if(produit.dataset.store === select.value)
                            produit.style.display = "flex"
                        else
                            produit.style.display = "none"
                    })    
                })
            })
        })
    }

    clearSearchBar()



    

})





const selectTrie = document.querySelectorAll(".header select");

    selectTrie.forEach(select => {                    
            select.addEventListener("change", (e) => {
                let trieValue = e.target.value
                trieDesProduits(trieValue)
            })
        })

    
    function trieDesProduits(trieValue) {
        getSupermarket().then(reponse => {
        const parent = document.querySelector(".containerProduits");
        const enfants = Array.from(parent.children);

        if (trieValue === "pertinence") 
            enfants.sort((a, b) => a.className.localeCompare(b.className));
        if (trieValue === "prixCroissant") 
            enfants.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        if (trieValue === "prixDecroissant") 
            enfants.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        if (trieValue === "deAaZ") 
            enfants.sort((a, b) => a.dataset.text.localeCompare(b.dataset.text));
        if (trieValue === "deZaA") 
            enfants.sort((a, b) => b.dataset.text.localeCompare(a.dataset.text));


        enfants.forEach(e => parent.appendChild(e)); // réinsertion dans l'ordre

        sessionStorage.setItem("selectTrieValue", trieValue)
        })
    }


    // SessionStorage
    document.addEventListener("DOMContentLoaded", () => {
        selectTrie.forEach(select => {
        const savedSelectValue = sessionStorage.getItem("selectTrieValue")
        if (savedSelectValue){
            select.value = savedSelectValue
            trieDesProduits(savedSelectValue)
        }
    })

    })
    
