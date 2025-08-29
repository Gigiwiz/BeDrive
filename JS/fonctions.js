const produitsPanierContainer = document.querySelectorAll(".panier .produits-panier");
const choixSupermarche = document.querySelectorAll(".choixSupermarche select");
const addToCartBtns = document.querySelectorAll(".addToCart")


export function addProductToCart(productID) {

    produitsPanierContainer.forEach(container => {
        choixSupermarche.forEach(choix => {
            document.querySelectorAll(".section2 .produit").forEach(produitPanier => {
                if(produitPanier.className.includes(choix.value) && productID === produitPanier.id){
                    container.appendChild(produitPanier);
                    produitPanier.style.display = "flex"
                    localStorage.setItem(`produit${produitPanier.id}`, produitPanier.id)

                    increaseQuantite(productID)
                    decreaseQuantite(productID)
                }
            })
        })
    })
}




function increaseQuantite(productID) {

    document.querySelectorAll(".section2 .produit").forEach(produitPanier => {
        if(productID === produitPanier.id){
            document.querySelectorAll(".produits-panier span.quantite").forEach(quantiteProd => {
                if(quantiteProd.id === productID){
                    // Incrémentation de la quatité du produit
                    document.querySelectorAll(".produits-panier img.add").forEach(buttonAdd => {
                        buttonAdd.addEventListener("click", (e) => {
                            e.preventDefault()
                            e.stopImmediatePropagation()
                            quantiteProd.textContent++
                            localStorage.setItem(`quantite${productID}`, quantiteProd.textContent) // sauvegarde de la quatité du produit

                            increasePrice(productID) // augmentation du prix en même temps
                        })
                    })
                }
            })
        }
    })
}



function increasePrice(productID) {

    document.querySelectorAll(".produits-panier span.quantite").forEach(quantiteProd => {
        if(quantiteProd.id === productID){  
            // Augmentation du prix du produit en fonction de sa quantité
            document.querySelectorAll(".produits-panier span.prix").forEach(produitPrix => {
                if(produitPrix.id === quantiteProd.id){
                // Augmentation des prix des memes produits de différents supermarchés
                for (let i = 0; i < sessionStorage.length; i++) {
                    let cle = sessionStorage.key(i);
                        if(cle.includes(`${produitPrix.id}`) && quantiteProd.textContent >= 1){

                            let nouveauPrix = parseFloat(sessionStorage.getItem(cle) * quantiteProd.textContent).toFixed(2) //calcul du prix
                                
                                produitPrix.textContent = nouveauPrix //affichage du prix
                                localStorage.setItem(`${cle}`,nouveauPrix ) // stockage du prix
                        } 
                    }
                }
            })
        }
    }) 
}








function decreaseQuantite(productID) {

    document.querySelectorAll(".section2 .produit").forEach(produitPanier => {
        if(productID === produitPanier.id){
            document.querySelectorAll(".produits-panier span.quantite").forEach(quantiteProd => {
                if(quantiteProd.id === productID){
                    // décrémentation de la quatité du produit
                    document.querySelectorAll(".produits-panier img.remove").forEach(buttonRemove => {
                        buttonRemove.addEventListener("click", (e) => {
                            e.preventDefault()
                            e.stopImmediatePropagation()
                            if(quantiteProd.textContent >= 1){
                                quantiteProd.textContent--
                                localStorage.setItem(`quantite${productID}`, quantiteProd.textContent) // sauvegarde de la quatité du produit

                                decreasePrice(productID) // On diminue en même temps le prix des produits
                            }

                            if (quantiteProd.textContent == 0 && quantiteProd.id === produitPanier.id) { //retrait du produit du panier
                                produitPanier.style.display = "none"
                                localStorage.removeItem(`quantite${productID}`);
                                localStorage.removeItem(`produit${productID}`);
                            }   
                            if (quantiteProd.textContent == 1) { // remise du produit dans le panier
                                // produitPanier.style.display = "flex"
                            }   
                        })
                    })
                }
            })
        }
    })  
}


        

function decreasePrice(productID) {

    document.querySelectorAll(".produits-panier span.quantite").forEach(quantiteProd => {
        if(quantiteProd.id === productID){
            // Diminution du prix du produit en fonction de sa quantité
            document.querySelectorAll(".produits-panier span.prix").forEach(produitPrix => {
                if(produitPrix.id === quantiteProd.id){
                    for (let i = 0; i < sessionStorage.length; i++) {
                        let cle = sessionStorage.key(i);
                        if(cle.includes(`${produitPrix.id}`) && quantiteProd.textContent >= 1){

                        let nouveauPrix = parseFloat(sessionStorage.getItem(cle) * quantiteProd.textContent).toFixed(2) //calcul du prix
                            
                            produitPrix.textContent = nouveauPrix //affichage du prix
                            localStorage.setItem(`${cle}`,nouveauPrix ) // stockage du prix
                        } 
                    }
                }
            })
        }
    })          
}