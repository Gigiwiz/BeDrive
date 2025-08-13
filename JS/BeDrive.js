function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


class Supermarket{
    constructor(nom, Logo_Supermarket, adresse){
        this.nom = nom;
        this.logo = `https://raw.githubusercontent.com/Gigiwiz/BeDrive/f82b2c96e7eb2869f26b5b71e7f3796c51dcf582/Images/supermarket/${Logo_Supermarket}`;
        this.adresse = adresse;


    this.getProduits = async function() {
        const reponse = await fetch("/Json/produits.json");
        return reponse.json()
};

// Pour modifier le prix des produits en fonction des supermarchés

    this.getProduits().then(resp => {
        const produits = resp
        console.log(produits);
        
        for (const produit of produits) {
            if (this.nom.toLowerCase() === "carrefour") {
                +(produit.prix+=randomInt(-1,1.5))
            }
            else if (this.nom.toLowerCase() === "auchan") {
                produit.prix+=randomInt(-0.5,1)
            }
        }
        return produits

// Pour afficher les produits à acheter
    }).then(produits => {
        const produitsPromo = produits
        for (const produit of produits) {
            if (produit.categorie.toLowerCase() === "fruits" ) {
                produit.promo+=50
            }
            
        }

        // console.log(produitsPromo);
        
    })
    
    // .then(newProduits =>  {
    //         const choixProduits = document.querySelector(".choixProduits");
    //     if (this.nom) {
    //         for (const produit of newProduits) {

    //             const div = document.createElement("div");
    //                 div.className = "produit";

    //             const img = document.createElement("img");
    //                     img.src = produit.image;
    //                     img.id = `img${produit.nomCourt}`;
    //                     img.alt = produit.nom;

    //             const div1 = document.createElement("div");
    //                     div1.className="prix-AddToCart";

    //                 const span = document.createElement("span");
    //                         span.className = "prix" ;
    //                         span.textContent = `${(produit.prix).toFixed(2)} €`;

    //             const svgNS = "http://www.w3.org/2000/svg";
    //             const svg = document.createElementNS(svgNS, "svg");
    //                 svg.setAttribute("class", "addToCart");
    //                 svg.setAttribute("width", "24px");
    //                 svg.setAttribute("height", "24px");
    //                 svg.setAttribute("viewBox", "0 -960 960 960" );
    //                 svg.setAttribute("fill", "#000000");
    //             const path = document.createElementNS(svgNS, "path");
    //                 path.setAttribute("d", "M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z");
    //             svg.appendChild(path);
                            
    //             const span1 = document.createElement("span")
    //                     span1.className="nom";
    //                     span1.id = produit.nomCourt;
    //                     span1.textContent = produit.nom;
                 
    //                 choixProduits.appendChild(div);
    //                 div.appendChild(img);
    //                 div.appendChild(div1);
    //                 div1.appendChild(span);
    //                 div1.appendChild(svg);
    //                 div.appendChild(span1);
    //         }
    //     }
            
    //     });




    // this.getProduits()



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
    const imagesSaufLe1 = document.querySelectorAll(".choixSupermarche img:not(:first-child)")
            imagesSaufLe1.forEach((image) => {
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





   
};

const Lidl = new Supermarket("Lidl","Logo_Lidl.svg", "23 avenue des Peupliers Paris 75013");

const Carrefour = new Supermarket("Carrefour", "Logo_Carrefour.svg", "60 boulevard de Stalingrad Vitry-sur-Seine");
  
const Auchan = new Supermarket("Auchan","Logo_Auchan.svg", "10 rue des Oliviers Paris 75013");











