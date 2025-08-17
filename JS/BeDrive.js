export class Supermarket{
    
        #promo = false;
        #changePromoElements = [];
        #price = 0;
        #changePriceElements = [];
        #dispo = true;
        #unavailableElements = []
    
    /**
      * @param {string} nom 
      * @param {string} adresse
      * @param {string} Logo_Supermarket
      * @property {string} Logo_Supermarket - dernière partie de cette URL "https://.../Images/supermarket/${Logo_Supermarket}" du logo du supermarché qui s'écrit généralement => "Logo_[nomSupermaché].svg"
 */
    constructor(nom, Logo_Supermarket, adresse){
        this.nom = nom;
        this.logo = `https://raw.githubusercontent.com/Gigiwiz/BeDrive/f82b2c96e7eb2869f26b5b71e7f3796c51dcf582/Images/supermarket/${Logo_Supermarket}`;
        this.adresse = adresse;
        

    this.getProduits = async function() {
        const reponse = await fetch("./Json/produits.json");
        const products = reponse.json()
        this.produits = products        
        return this.produits
};

// Pour modifier ou pas le prix originel des produits 

    this.getProduits().then(produits => {
        const produitsPriceToChange = produits
        this.#changePriceElements.forEach(el => {
            for (const produit of produitsPriceToChange) {
                if((el.toLowerCase() === produit.id.toLowerCase() || el.toLowerCase() === produit.categorie.toLowerCase()) && produit.prix > 2){
                   produit.prix = +(produit.prix - this.#price).toFixed(2)
                }
            }
        })

        return produitsPriceToChange
    })
    .then(produitsPriceToChange => {
// Pour mettre les produits en promotion et modifier en même temps leurs prix
        const produitsPromoToChange = produitsPriceToChange
        this.#changePromoElements.forEach(el => {
            for (const produit of produitsPromoToChange) {
                if(el.toLowerCase() === produit.categorie.toLowerCase() || el.toLowerCase() === produit.id.toLowerCase()){
                    produit.promo += this.#promo
                    produit.prix = +(produit.prix - (produit.prix*(this.#promo/100))).toFixed(2)
                }
            }
        })

        return produitsPromoToChange
    })
    .then(produitsPromoToChange =>{
// Pour rendre indisponible les produits
        const produitsAvailable =  produitsPromoToChange
        this.#unavailableElements.forEach(el =>{
            for (const produit of produitsAvailable) {
                if(el.toLowerCase() === produit.categorie.toLowerCase() || el.toLowerCase() === produit.id.toLowerCase()){                    
                    produit.disponible = this.#dispo
                }
            }
        })

        return produitsAvailable
    })
    .then(produitsAvailable => {
        

// Pour afficher les produits en fonction du choix du spermarché

        const newProduits = produitsAvailable.sort((a, b) => a.marque.localeCompare(b.marque))


        const section1ProduitsPageAcceuil = document.querySelectorAll(".section1Produits.accueil");

        /* Création du container des produits de la page d'accueil
            dans le but d'automatiser l'ajout des produits en fonction des catégories (ajoutée.s ou rétirée.s)
        */
        const containerProduitsPageAcceuilClass = ["containerProduits "];
        const containerProduitsPageAcceuil = document.createElement('div');


        for (const produit of newProduits) {

            if (produit.categorie) {
                containerProduitsPageAcceuilClass.push(produit.categorie)
                const newClass = [...new Set(containerProduitsPageAcceuilClass)]

                containerProduitsPageAcceuil.className = newClass;

                section1ProduitsPageAcceuil.forEach(section => {
                    section.appendChild(containerProduitsPageAcceuil);                    
                })

                const allContainersProduits = document.querySelectorAll(".containerProduits");
                    allContainersProduits.forEach((container) => {

                    if(produit.disponible){                        
                        // création du produit
                        const produitDiv = document.createElement("div");
                                produitDiv.className = `produit ${this.nom}`;
                                produitDiv.id = produit.nomCourt

                        const img = document.createElement("img");
                                img.src = produit.image;
                                img.className = `img ${produit.nomCourt}`;
                                img.id = produit.nomCourt;
                                img.alt = produit.nom;

                        const div1 = document.createElement("div");
                                div1.className="prix-AddToCart";

                        const span = document.createElement("span");
                                span.className = "prix" ;
                                span.id = produit.nomCourt
                                if(!produit.promo){
                                    span.textContent = `${(produit.prix)} €`;
                                }
                                else{
                                    span.textContent = `${(produit.prix)} €, -${produit.promo}%`;
                                    span.style.color = 'red'
                                }

                        const svgNS = "http://www.w3.org/2000/svg";
                        const svg = document.createElementNS(svgNS, "svg");
                            svg.setAttribute("class", "addToCart");
                            svg.setAttribute("width", "24px");
                            svg.setAttribute("height", "24px");
                            svg.setAttribute("viewBox", "0 -960 960 960" );
                            svg.setAttribute("fill", "#000000");
                        const path = document.createElementNS(svgNS, "path");
                            path.setAttribute("d", "M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z");
                        svg.appendChild(path);
                                    
                        const span1 = document.createElement("span")
                                span1.className="nom";
                                span1.id = produit.nomCourt;
                                span1.textContent = produit.nom;

                    // Ajout du produit dans chaque container
                        if(container.className.toLowerCase().includes(produit.categorie.toLowerCase())){
                            container.appendChild(produitDiv);
                            produitDiv.appendChild(img);
                            produitDiv.appendChild(div1);
                            div1.appendChild(span);
                            div1.appendChild(svg);
                            produitDiv.appendChild(span1);   
                        }

                    // On affiche qu'un seul container n'oubliant pas que nous sommes dans une boucle ha ha ha 😂
                        document.querySelectorAll(".section1Produits.accueil .containerProduits:not(:nth-child(3))").forEach(el => {
                            el.style.backgroundColor ="red"
                            el.style.display = "none" 
                        })
                    
                        const lastOnesSupermarketOptions = document.querySelectorAll(".switchSupermarket option:not(:first-child)");
                                lastOnesSupermarketOptions.forEach(option => {
                                    if (option.value === this.nom) {
                                        produitDiv.style.display = "none"
                                    }
                                });

                        const switchSupermarketSelect = document.querySelectorAll(".switchSupermarket");                
                                switchSupermarketSelect.forEach((select) => {
                                    select.addEventListener("change", (e) => {
                                        e.preventDefault();
                                        const value = e.target.value
                                        const displayedProduits = document.querySelectorAll(".containerProduits .produit")
                                                displayedProduits.forEach((product) => {
                                                    if(product.className.includes(value))
                                                        product.style.display = "flex";
                                                    else 
                                                        product.style.display = "none";
                                                })
                                    })
                                })
                        }
                    })   
                }
            }

        return newProduits
    })
    .then(newProduits => {

// Pour afficher la description de chaque produit au clic de celui-ci
        const produitsEl =  document.querySelectorAll('.containerProduits .produit');
        const descriptionDiv = document.querySelector(".description-produit");
        const productDescriptionImg = document.querySelector(".description-produit img");
        const productDescription = document.querySelector(".description-produit p");
        const prixDesc = document.querySelector(".description-produit .prix");

        for (const produit of newProduits) {
            
                produitsEl.forEach(el => {
                el.addEventListener("click", (e) => {                    
                    e.preventDefault()
                    const value = e.target.id
                    if(value === produit.nomCourt && el.className.includes(this.nom) ){
                        productDescriptionImg.src = produit.image;
                        productDescription.textContent = produit.description;
                        productDescription.id = produit.nomCourt
                        if(!produit.promo){
                            prixDesc.textContent = `${produit.prix} €`;
                            prixDesc.style.color = 'white'
                        }
                        else{
                            prixDesc.textContent = `${(produit.prix)} €, -${produit.promo}%`;
                            prixDesc.style.color = 'red'
                        }
                        descriptionDiv.classList.add("active")

                        const overlay =  document.querySelector('.overlay')
                            overlay.style.display='block';
                            overlay.addEventListener("click", () => {
                                descriptionDiv.classList.remove("active")
                            } )

                    }

                })
            })
            
        }


            
        

        return newProduits
    })

// On affiche le supermarché en recuperant le getter 

    this.chooseSupermarket;
    };

   get chooseSupermarket(){

    const imgContainer = document.querySelectorAll(".choixSupermarche a");
          imgContainer.forEach((container) =>{
            const img = document.createElement("img")
                        img.src = this.logo
                        img.className = "logoSupermarche"
                        img.id = this.nom
                        img.alt = `Logo_${this.nom}`
                        img.title = this.adresse;

            container.appendChild(img)
        });

    const choixSupermarche = document.querySelectorAll(".choixSupermarche select");
    const imagesSuperM =  document.querySelectorAll(".choixSupermarche .logoSupermarche");
    const lastOnesImages = document.querySelectorAll(".choixSupermarche img:not(:first-child)")
            lastOnesImages.forEach((image) => {
                image.style.display = "none"
            })
  
        choixSupermarche.forEach((choixSelect) => {

            const option = document.createElement("option")
                    option.value = this.nom
                    option.innerText = this.nom

                    choixSelect.appendChild(option);

                    choixSelect.addEventListener("change", (event)=>{
                        const attr = event.target.value
                            imagesSuperM.forEach((image) =>{
                                image.id === attr ? image.style.display = "flex" : image.style.display = "none";
                        });
                    })
    });
};

    /**
     * @param {[string]} elements les id et/ou les catégories des produits dont le prix originel va être modifier.
     * @param {number} price valeur à soustraire du prix originel(dans produits.json) => nombre entier ou décimal.toFixed(2) compris entre 0.1 à 2
     * @returns {[string]} retourne le tableau => changePriceElements = [...elements]
     */
setPrice([...elements], price){
    if(price >= 0.1 && price <= 2){
        this.#price = price
    }else{
        throw new Error("Le prix à soustraire du prix originel doit être compris dans la fourchette de 0.1 à 2")
    }
    return this.#changePriceElements = elements
};

    /**
     * @param {[string]} elements les id et/ou les catégories des produits à mettre en promo => se référer au produits.json
     * @param {number} promo nombre entier ou décimal.toFixed(2) compris entre 1 - 100
     * @returns {[string]} retourne le tableau => #changePromoElements = [...elements]
     */
setPromo([...elements], promo){
    if(promo >= 0 && promo <= 100){
        this.#promo = promo
    }else{
        throw new Error("Promotion invalide, elle doit être comprise dans la fourchette de 1 à 100")
    }
    return this.#changePromoElements = elements
};

    /**
     * @param {string} elements les id et/ou les catégories des produits à rendre indisponibles => se référer au produits.json
     * @returns {[string]} retourne le tableau des éléments à rendre indisponibles => #unavailableElements = [...elements]
     */
setUnavailable(...elements){
    this.#dispo = false
    return this.#unavailableElements.push(...elements)
};

};




const Lidl = new Supermarket("Lidl","Logo_Lidl.svg", "23 avenue des Peupliers Paris 75013")
        Lidl.setPrice(["Fruits", "Légumes", "EPI3", "EPI4"], 1);
        Lidl.setPromo(["Viandes", "EPI3", "BOI17"], 50);
        Lidl.setUnavailable("FRU1", "FRU2", "FRU6", 'FRU3')

const Carrefour = new Supermarket("Carrefour", "Logo_Carrefour.svg", "60 boulevard de Stalingrad Vitry-sur-Seine");
        Carrefour.setPrice(["Fruits", "Légumes", "EPI3", "EPI4"], 2)
        Carrefour.setPromo(["FRU7", "Boissons", "EPI1", "EPI2"], 30)

const Auchan = new Supermarket("Auchan","Logo_Auchan.svg", "10 rue des Oliviers Paris 75013");
        Auchan.setPrice(["Fruits", "Légumes", "EPI3", "EPI4"], 0.89)
        Auchan.setPromo(["via1"], 19.5)



// const Leclerc = new Supermarket("E.Leclerc","Logo_Leclerc.svg", "203 avenue des dominicaines Paris 75003");

// const Aldi = new Supermarket("Aldi","Logo_Aldi.svg","30 avenue de Choisy Ivry-sur-Seine 75013")



