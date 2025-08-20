    /**
     * @typedef {Object} Produit
     * @property {string} id - Identifiant unique du produit
     * @property {Object} nom - Nom du produit
     * @property {string[]} nom.fr - Nom du produit en français
     * @property {string[]} nom.en - Nom du produit anglais 
     * @property {string[]} nom.es - Nom du produit en espagnol
     * @property {string[]} nom.ln - Nom du produit en lingala
     * @property {string[]} nom.zho - Nom du produit en chinois
     * @property {Object} description - Description détaillée du produit
     * @property {string[]} description.fr - Description détaillée du produit en français
     * @property {string[]} description.en - Description détaillée du produit en anglais
     * @property {string[]} description.es - Description détaillée du produit en espagnol
     * @property {string[]} description.ln - Description détaillée du produit en lingala
     * @property {string[]} description.zho - Description détaillée du produit en chinois
     * @property {string} nomCourt - Le camelCase ou le lowerCase du nom du produit
     * @property {string[]} categorie - Liste des catégories du produit
     * @property {number} prix - Prix du produit en euros
     * @property {string[]} image - URLs de l'image du produit
     * @property {boolean} disponible - Indique si le produit est en stock
     * @property {[string]} marque - La marque ou le fournisseur du produit
     * @property {boolean} promo - Indique si le produit est en promo
     * @property {boolean} bio - Indique si le produit est bio
     */

    /**
     * @returns {Promise<[Produit]>} Tableau de produits
     */

export async function getProduits () {
        /** @type {[Produit]} */
        const reponse = await fetch("/produitsV2.json");
        return reponse.json()
};









export class Supermarket{
    
    #remiseViandes = 0;
    #viandesRemiseElements = [];
    #remisePoissons = 0;
    #poissonsRemiseElements = [];
    #remiseLegumes = 0;
    #legumesRemiseElements = [];
    #remiseFruits = 0;
    #fruitsRemiseElements = [];
    #remiseLaitiers = 0;
    #laitiersRemiseElements = [];
    #remiseEpicerie = 0;
    #epicerieRemiseElements = [];
    #remiseBoissons = 0;
    #boissonsRemiseElements = [];
    #remiseBoulangerie = 0;
    #boulangerieRemiseElements = [];
    #remiseSurgeles = 0;
    #surgelesRemiseElements = [];
    #remiseCharcuterie = 0;
    #charcuterieRemiseElements = [];
    #remiseCategory = 0;
    #promoCategory = "" ;
    #reducePrice = 0;
    #changePriceElements = [];
    #unavailableElements = []
    
    /**
      * @param {string} nom 
      * @param {string} adresse - l'adresse complète du supermarché
      * @param {string} Logo_Supermarket - dernière partie de cette URL "https://.../Images/supermarket/${Logo_Supermarket}" du logo du supermarché qui s'écrit généralement => "Logo_[nomSupermaché].svg"
 */
    constructor(nom, Logo_Supermarket, adresse){
        this.nom = nom;
        this.logo = `https://raw.githubusercontent.com/Gigiwiz/BeDrive/f82b2c96e7eb2869f26b5b71e7f3796c51dcf582/Images/supermarket/${Logo_Supermarket}`;
        this.adresse = adresse;        
       

// Pour modifier ou pas le prix originel des produits 

    getProduits().then(produits => {

        const produitsPriceToChange = produits
        this.#changePriceElements.forEach(el => {
            for (const produit of produitsPriceToChange) {
                if((el.toLowerCase() === produit.id.toLowerCase() || el.toLowerCase() === produit.categorie.toLowerCase()) && produit.prix > 2){
                   produit.prix = +(produit.prix - this.#reducePrice).toFixed(2)
                }
            }
        })

        return produitsPriceToChange
    })
    .then(produitsPriceToChange => {
// Pour mettre les produits en promotion et modifier en même temps leurs prix
        const produitsPromoToChange = produitsPriceToChange
    
            for (const produit of produitsPromoToChange) {

                //Calculer du prix avec propmotion des produits de la catégorie choisie avec la méthode setPromoToCategory()
                if(produit.categorie.toLowerCase().includes(this.#promoCategory.toLowerCase())){
                    produit.promo = this.#remiseCategory
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseCategory/100))).toFixed(2)
                };
            //Calculer du prix avec propmotion des produits par catégorie. Les produits ont été préablement choisis avec la méthode setPromoByCategory()
                this.#fruitsRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("FRU")){
                    produit.promo = this.#remiseFruits
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseFruits/100))).toFixed(2)
                }
                });
                this.#legumesRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("LEG")){
                    produit.promo = this.#remiseLegumes
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseLegumes/100))).toFixed(2)
                }
                });
                this.#viandesRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("VIA")){
                    produit.promo = this.#remiseViandes
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseViandes/100))).toFixed(2)
                }
                });
                this.#poissonsRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("POI")){
                    produit.promo = this.#remisePoissons
                    produit.prix = +(produit.prix - (produit.prix*(this.#remisePoissons/100))).toFixed(2)
                }
                });
                this.#epicerieRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("EPI")){
                    produit.promo = this.#remiseEpicerie
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseEpicerie/100))).toFixed(2)
                }
                });
                this.#laitiersRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("PLA")){
                    produit.promo = this.#remiseLaitiers
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseLaitiers/100))).toFixed(2)
                }
                });
                this.#boissonsRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("BOI")){                
                    produit.promo = this.#remiseBoissons
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseBoissons/100))).toFixed(2)
                }
                });
                this.#boulangerieRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("BOU")){                
                    produit.promo = this.#remiseBoulangerie
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseBoulangerie/100))).toFixed(2)
                }
                });
                this.#surgelesRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("SUR")){                
                    produit.promo = this.#remiseSurgeles
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseSurgeles/100))).toFixed(2)
                }
                });
                this.#charcuterieRemiseElements.forEach(el => {
                    if(el.toLowerCase().includes(produit.id.toLowerCase()) && produit.id.startsWith("CHA")){                
                    produit.promo = this.#remiseCharcuterie
                    produit.prix = +(produit.prix - (produit.prix*(this.#remiseCharcuterie/100))).toFixed(2)
                }
                });
            }
        

        return produitsPromoToChange
    })
    .then(produitsPromoToChange =>{
// Pour rendre indisponible les produits
        const produitsAvailable =  produitsPromoToChange
        this.#unavailableElements.forEach(el =>{
            for (const produit of produitsAvailable) {
                if(produit.categorie.toLowerCase().includes(el.toLowerCase() ) || el.toLowerCase() === produit.id.toLowerCase()){                    
                    produit.disponible = false
                }
            }
        })

        return produitsAvailable
    })
    .then(produitsAvailable => {
        
        // On trie les produits par marque
        const newProduits = produitsAvailable.sort((a, b) => a.marque.localeCompare(b.marque))

        // Pour afficher les produits en fonction du choix du spermarché
        const containerProduitsPageAcceuil = document.querySelector(".section1Produits.accueil .containerProduits");
        const containerProduitsPageAcceuilClass = ["containerProduits "];

        for (const produit of newProduits) {

            if (produit.categorie) {
                containerProduitsPageAcceuilClass.push(produit.categorie)
                const newClass = [...new Set(containerProduitsPageAcceuilClass)]
                if(containerProduitsPageAcceuil) containerProduitsPageAcceuil.className = newClass
                
                document.querySelectorAll(".containerProduits").forEach((container) => {
                    if(produit.disponible){                        
                      // création du produit
                        const produitDiv = document.createElement("div");
                                produitDiv.className = `produit ${this.nom}`;
                                produitDiv.id = produit.nomCourt

                        const imgProduit = document.createElement("img");
                                imgProduit.src = produit.image;
                                imgProduit.className = `img ${produit.nomCourt}`;
                                imgProduit.id = produit.nomCourt;
                                imgProduit.alt = produit.nom.fr;

                        const divPrixBtnAddToCart = document.createElement("div");
                                divPrixBtnAddToCart.className="prix-AddToCart";

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
                                    
                        const spanNomProduit = document.createElement("span")
                                spanNomProduit.className="nom";
                                spanNomProduit.id = produit.nomCourt;
                                spanNomProduit.textContent = produit.nom.fr;

                    // Ajout du produit dans chaque container
                        if(container.className.toLowerCase().includes(produit.categorie.toLowerCase())){
                            container.appendChild(produitDiv);
                            produitDiv.appendChild(imgProduit);
                            produitDiv.appendChild(divPrixBtnAddToCart);
                            divPrixBtnAddToCart.appendChild(span);
                            divPrixBtnAddToCart.appendChild(svg);
                            produitDiv.appendChild(spanNomProduit);   
                        }

                    // Pour afficher les produits en fonction des supermarchés
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
                        productDescription.textContent = produit.description.fr;
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

// Cet appel du getter chooseSupermarket() dans le constructeur permet d'ajouter automatiquement au dessus du panier le nom et l'image de chaque supermarché crée afin de le choisir si besoin
    this.chooseSupermarket;
    };

   get chooseSupermarket(){

    document.querySelectorAll(".choixSupermarche .imgContainer").forEach((container) =>{
        // Création du parent(balise <a>) de l'image du supermarché et l'image en mème temps
        const imgParent = document.createElement("a");
            imgParent.href = "#"
            imgParent.id = this.nom
            imgParent.target = "_blank"
            imgParent.innerHTML = `<img src="${this.logo}" class="logoSupermarche" id=${this.nom} alt="Logo de ${this.nom}" title="${this.adresse}">`

        // Ajout du parent de l'image dans chaque container des logo des supermarchés
        container.appendChild(imgParent)

        // Affichage que de la première image qui correspond à la première option de 
        document.querySelectorAll(".imgContainer a:not(:first-child)").forEach(image => image.style.display = "none")
        });
    const supermarketSelect = document.querySelectorAll(".choixSupermarche select");
    const imageContainers = document.querySelectorAll(".imgContainer a")

        // Appel de tous les select<option> afin d'appliquer l'event "change" 
        supermarketSelect.forEach((select) => {
            // Création de l'option du supermarché
            const option = document.createElement("option")
                    option.value = this.nom
                    option.innerText = this.nom

            // Ajout de l'option dans le select
            select.appendChild(option);

            // Changement de l'image du supermarché au select de l'option correspondante
            select.addEventListener("change", (event)=>{
                const optionValue = event.target.value
                    imageContainers.forEach((container) =>{
                        container.id === optionValue ? container.style.display = "flex" : container.style.display = "none";
                });
                })
        });
};

    /**
     * @param {[string]} elements Tableau des id et/ou des catégories des produits dont le prix originel va être modifier.
     * @param {number} price valeur à soustraire du prix originel(dans produits.json) => nombre entier ou décimal.toFixed(2) compris entre 0.1 à 2
     * @returns {[string]} retourne le tableau => changePriceElements = [...elements]
     */
reducePrice([...elements], price){
    if(price >= 0.1 && price <= 2){
        this.#reducePrice = price
        this.#changePriceElements = elements
    }else{
        throw new Error("Le prix à soustraire du prix originel doit être compris dans la fourchette de 0.1 à 2")
    }
};

    /**
     * @param {[string]} categorie - La catégorie des produits à mettre en promo => se référer au produits.json
     * @param {number} promo - La remise à appliquer => nombre entier ou décimal.toFixed(2) compris entre 1 - 100
     */
setPromoToCategory(categorie, promo){
    if(promo > 0 && promo <= 100){
        this.#remiseCategory = promo
        this.#promoCategory = categorie
    }else{
        throw new Error("Promotion et/catégorie invalide.s, la promotion doit être comprise dans la fourchette de 1 à 100. Pour la catégorie, veuillez vous référer au produits.json")
    }
};

/**
 * 
 * @param {string} categorie - La catégorie des produits à mettre en promotion => se reférer au produits.json
 * @param {number} promo - La remise à appliquer => nombre entier ou décimal.toFixed(2) compris entre 1 - 100
 * @param {[string]} elements - Tableau des id et/ou la catégorie des produits à mettre en promo => se référer au produits.json
 * @returns {number & string}
 */
setPromoByCategory(categorie, promo, [...elements]){
    const condition1 = promo > 0 && promo <= 100;
    const condition2 = categorie.toLowerCase() ;

        if(condition1){
            if (condition2 === "fruits"){
                this.#remiseFruits = promo;
                this.#fruitsRemiseElements = elements
            }else if (condition2 === "légumes"){
                this.#remiseLegumes = promo
                this.#legumesRemiseElements = elements
            }
            else if (condition2 === "viandes"){
                this.#remiseViandes = promo
                this.#viandesRemiseElements = elements
            }
            else if (condition2 === "poissons"){
                this.#remisePoissons = promo
                this.#poissonsRemiseElements = elements
            }
            else if (categorie.toLowerCase().includes("épicerie")){
                this.#remiseEpicerie = promo
                this.#epicerieRemiseElements = elements
            }
            else if (categorie.toLowerCase().includes("laitiers")){
                this.#remiseLaitiers = promo
                this.#laitiersRemiseElements = elements 
            }
            else if (categorie.toLowerCase().includes("boissons")){
                this.#remiseBoissons = promo
                this.#boissonsRemiseElements = elements
            }
            else if (categorie.toLowerCase().includes("boulangerie")){
                this.#remiseBoulangerie = promo
                this.#boulangerieRemiseElements = elements
            }
            else if (categorie.toLowerCase().includes("charcuterie") ||categorie.toLowerCase().includes("traiteur")  ){
                this.#remiseCharcuterie = promo
                this.#charcuterieRemiseElements = elements
            }
            else if (categorie.toLowerCase().includes("surgelés")){
                this.#remiseSurgeles = promo
                this.#surgelesRemiseElements = elements
            }
            else throw new Error(" Catégorie inexistante, veuillez saisir une catégorie correspondante à celles présentes dans produits.json")
    }
    else throw new Error(" Promotion invalide, elle doit être comprise dans la fourchette de 1 à 100")
}

    /**
     * @param {string} elements les id et/ou les catégories des produits à rendre indisponibles => se référer au produits.json
     * @returns {[string]} Tableau des éléments à rendre indisponibles => #unavailableElements = [...elements]
     */
makeProductUnavailable(...elements){
    return this.#unavailableElements.push(...elements)
};
};




const Lidl = new Supermarket("Lidl","Logo_Lidl.svg", "23 avenue des Peupliers Paris 75013")
Lidl.setPromoToCategory("Poissons",80);
Lidl.setPromoByCategory("chart traiteur",35, ["CHA1", "CHA2", "BOI2", "CHA11", "CHA6"]);


// Lidl.setPromoByCategory("fruits", 2)

console.log(Lidl);

       
        

const Carrefour = new Supermarket("Carrefour", "Logo_Carrefour.svg", "60 boulevard de Stalingrad Vitry-sur-Seine");
Carrefour.setPromoByCategory("fruits",30,["FRU3", "FRU16"])

       

// const Auchan = new Supermarket("Auchan","Logo_Auchan.svg", "10 rue des Oliviers Paris 75013");
        



// const Leclerc = new Supermarket("E.Leclerc","Logo_Leclerc.svg", "203 avenue des dominicaines Paris 75003");

// const Aldi = new Supermarket("Aldi","Logo_Aldi.svg","30 avenue de Choisy Ivry-sur-Seine 75013")

