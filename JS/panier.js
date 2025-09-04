import { getSupermarket } from "./BeDrive.js";




function formatPrix(valeur) {
  return parseFloat(valeur).toFixed(2)
            .replace(/\.0+$/, "")
            .replace(/(\.\d)0$/, "$1");
}



let produitsPanierDeChaqueStore = []








            getSupermarket().then(produitsJSON => {
    

    const produitsPanierContainer = document.querySelectorAll(".container-produits-panier > .produits-panier");
    const choixSupermarche = document.querySelectorAll(".choixSupermarche select");
    const addToCartBtns = document.querySelectorAll(".addToCart");
    const totalPricesContainer = document.querySelectorAll(".container-total .Total");




    function addProductToCart(productID) {
        produitsPanierContainer.forEach(container => {                
            document.querySelectorAll(".section2 .produit").forEach(produitToAddToPanier => {
                if(produitToAddToPanier.className.includes(container.id) && productID === produitToAddToPanier.id){
                    container.appendChild(produitToAddToPanier);
                    produitToAddToPanier.style.display = "flex"
                    localStorage.setItem(`produit${produitToAddToPanier.id}`, produitToAddToPanier.id)
                }
            })
        })
        // document.querySelectorAll(".produits-panier .produit").forEach(produitPanier => {
        //     let quantiteProd = produitPanier.querySelector("span.quantite")
        //     productID === produitPanier.id && quantiteProd.textContent == 0 ? produitPanier.style.display = "none" : produitPanier.style.display = "flex" 
        // })
    }


   

    // Ajout des produits-panier crées à chaque panier d'un supermarché et incrémentation de la quantité du produit et du prix
    addToCartBtns.forEach(button => {
        const produitID = button.id;

           

        button.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopImmediatePropagation()

            addProductToCart(produitID)

            // Incrémentation de la quatité du produit
            document.querySelectorAll(".produits-panier span.quantite").forEach(quantiteProd => {
                if (quantiteProd.id === produitID) {
                    quantiteProd.textContent++
                    localStorage.setItem(`quantite${quantiteProd.id}`, quantiteProd.textContent) // sauvegarde de la quantité du produit

                    // Mise à jour du prix
                        updatePrice(quantiteProd, produitID)
                }
            });


            window.location.reload()
        })
    })


            
    // LocalStorage (maintient) du produit dans le panier
    addToCartBtns.forEach(button => {
    const savedProductID = localStorage.getItem(`produit${button.id}`)
        addProductToCart(savedProductID)
    })

    // Maintien de la quantité du produit
    document.querySelectorAll(".produits-panier span.quantite").forEach(quantiteProduit => {
        const savedProductQuantite = localStorage.getItem(`quantite${quantiteProduit.id}`)
        if (savedProductQuantite) {
            quantiteProduit.textContent = savedProductQuantite
        }
    });


        




        
        

    /** 
     * TODO SECTION DÉDIÉE AU:
     * 1- CHANGEMENGEMENT EN MEME TEMPS DE LA QUANTITÉ DES PRODUITS IDENTIQUES DE CHAQUE SUPERMARCHÉ
     * 2- CALCUL DU PRIX DU PRODUIT EN FONCTION DE SA QUANTITÉ 
     * 3- CALCUL DU TOTAL DE CHAQUE SUPERMACHÉ
     *  */


    const changeQuantiteBtn = document.querySelectorAll(".produits-panier img.add, .produits-panier img.remove")
    const productPriceSpan =  document.querySelectorAll(".produits-panier .prix.cart");
    // const produitDiv =  document.querySelectorAll(".produits-panier .produit");

      
    

    // 1- CHANGEMENGEMENT EN MEME TEMPS DE LA QUANTITÉ DES PRODUITS IDENTIQUES DE CHAQUE SUPERMARCHÉ
    changeQuantiteBtn.forEach(button => {  
        button.addEventListener("click", (e) => {
            e.preventDefault()
            // e.stopImmediatePropagation()
            const buttonID  = e.target.id
            const produitDivs =  document.querySelectorAll(".produits-panier .produit");

            produitDivs.forEach(prodDiv => {
                const quantiteProd = prodDiv.querySelector("span.quantite")

                if (prodDiv.id === buttonID) {
                    if(button.className.includes("add")) {
                        quantiteProd.textContent++
                    }
                    if(button.className.includes("remove") && quantiteProd.textContent >= 1) {
                        quantiteProd.textContent--
                    }
                    // retrait du produit du panier
        
                     if (button.className.includes("remove") && quantiteProd.textContent == 0 ) {
                        prodDiv.style.display = "none"
                     }
                     if ( quantiteProd.textContent == 1 ) {
                        prodDiv.style.display = "flex"
                     }

                    localStorage.setItem(`quantite${quantiteProd.id}`, quantiteProd.textContent) // sauvegarde de la quantité du produit
                    
                    // 2- CALCUL DU PRIX DU PRODUIT EN FONCTION DE SA QUANTITÉ
                    updatePrice(quantiteProd, buttonID)
                }
            })            
        })
    })


     function updatePrice(quantiteProd, buttonID){
        productPriceSpan.forEach(priceSpan => {
            if (quantiteProd.dataset.id === priceSpan.dataset.id && priceSpan.id === buttonID) {
                priceSpan.textContent = formatPrix(priceSpan.dataset.price * quantiteProd.textContent) // formatPrix() est défini au debut de la page ligne 4

                localStorage.setItem(`${priceSpan.className}`, priceSpan.textContent)
            }

            if (quantiteProd.textContent == 0 && quantiteProd.id === priceSpan.id) {
                localStorage.removeItem(`quantite${priceSpan.id}`)
                localStorage.removeItem(`produit${priceSpan.id}`)
                localStorage.removeItem(priceSpan.className)         
            }
            
        })                
    }


        // 3- CALCUL DU TOTAL DE CHAQUE SUPERMACHÉ
        const cartTotalSpanPrice =  document.querySelectorAll(".panier .prixTotal");
        const lesProduits =  document.querySelectorAll(".produits-panier .produit")

            lesProduits.forEach(produit => {
                
                let quantiteProduit = +produit.querySelector("span.quantite").textContent 
                let prixProduit = +produit.querySelector(".prix.cart").dataset.price;

                // On crée une base de données des produits de chaque magasin ajoutés dans leur panier afin de calculer les totaux
                produitsPanierDeChaqueStore.push({
                    id: produit.id,
                    store: produit.dataset.store,
                    quantite: quantiteProduit,
                    prix: prixProduit,
                    total: Number(parseFloat(quantiteProduit * prixProduit).toFixed(2)),
                })                                    
            });


        let totauxDesSupermarche = produitsPanierDeChaqueStore.reduce((acc, p) => {
            acc[p.store] = (acc[p.store] || 0) + p.total;

            // localStorage.setItem("totauxDesSupermarche", JSON.stringify(acc))

            return acc;
            }, {});


        cartTotalSpanPrice.forEach(spanTotalPrice => {
            spanTotalPrice.textContent = parseFloat(totauxDesSupermarche[spanTotalPrice.id]).toFixed(2)       
        })

        // On évite l'affichage NaN
         cartTotalSpanPrice.forEach(totalSpan => {
            if (totalSpan.textContent == "NaN") {
                totalSpan.textContent = 0
            }            
        })

        /** LOCALSTORAGE DES PRODUITS, LEUR QUANTITÉ AINSI QUE LEUR PRIX */
                
        // Maintient du prix
        productPriceSpan.forEach(priceSpan => {
            const savedProductPrice = localStorage.getItem(priceSpan.className)

            if(savedProductPrice) priceSpan.textContent = savedProductPrice
        })





        // GESTION DU RANKING DES SUPERMARCHÉS
    const supermarketRankingDiv = document.querySelectorAll(".supermarche.ranking div")

    supermarketRankingDiv.forEach(supermarketDiv => {
        supermarketDiv.dataset.prixTotal = totauxDesSupermarche[supermarketDiv.id]
        
        let spanPrixTotal = supermarketDiv.querySelector(".prixTotal")
            spanPrixTotal.textContent = parseFloat(totauxDesSupermarche[spanPrixTotal.id]).toFixed(2)
    })
    // On évite l'affichage NaN
        document.querySelectorAll(".supermarche.ranking .prixTotal").forEach(spanPrixTotal =>{
            if (spanPrixTotal.textContent == "NaN") {
                spanPrixTotal.textContent = 0
            }
        })



    function trierRanking() {
        const parent = document.querySelector(".supermarche.ranking");
        const enfants = Array.from(parent.children);

        enfants.sort((a, b) => 
        parseFloat(a.dataset.prixTotal) - parseFloat(b.dataset.prixTotal));

        enfants.forEach(e => parent.appendChild(e)); // réinsertion dans l'ordre
        }

    trierRanking()



        return produitsJSON

    })









