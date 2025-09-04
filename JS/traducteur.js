import { dataTraductions } from "./traductions.js";
import { getSupermarket, Supermarket } from "./BeDrive.js";



function translateProductsInfos(codeLangue) {
  getSupermarket().then(supermarket => {
    const Produits = supermarket
    // Traduction des noms de chaque produits 
      document.querySelectorAll(".produit .nom").forEach(produitSpanName => {
        Produits.forEach(produit => {
          if(produitSpanName.id === produit.nomCourt){
            produitSpanName.textContent = produit.nom[codeLangue]
          }
        })
        // Cette adaptation de l'attribut data-text nous permettra de gérer les tries alphabétiques (voir script.js)
      document.querySelectorAll(".containerProduits .produit").forEach(produitDiv => {
        if(produitSpanName.id === produitDiv.id)
          produitDiv.dataset.text = produitSpanName.textContent
      })
      
      })
      // Traduction des descriptions de chaque produit
       document.querySelectorAll(".description-produit p").forEach(description => {
        Produits.forEach(produit => {
          if(description.id === produit.nomCourt){
            description.textContent = produit.description[codeLangue]
          }
        })
      })
    }
  );
}



const langues = document.querySelectorAll('#langMenu div');
const languesSB = document.querySelector('.traducteurSB');
const displayedFlag = document.querySelector("#output .displayedImage");


const languesFlags =[
    {
      fr: {
        url: "https://flagsapi.com/FR/flat/24.png",
        code:"fr"
      },
      en: {
        url: "https://flagsapi.com/US/flat/24.png",
        code:"en"
      },
      es: {
        url: "https://flagsapi.com/ES/flat/24.png",
        code:"es"
      },
      ln: {
        url: "https://flagsapi.com/CG/flat/24.png",
        code:"ln"
      },
      zho: {
        url: "https://flagsapi.com/CN/flat/24.png",
        code:"zho"
      },
    },
]



function showLangueFlagAndSelectedSBlangueName(codeLangue) {
  languesFlags.forEach(langue => {
    displayedFlag.src = langue[codeLangue].url;
    displayedFlag.id = langue[codeLangue].code;
  })
  
  languesSB.value = codeLangue;
}


// Lors du clique de chaque langue(sur ordinateur)
 for (const langue of langues) {
  langue.addEventListener("click", (e)=>{
    e.preventDefault();
    const codeLangue = e.target.id //récupération de l'id de la div cliqué ("fr", "en", ...)
    Traduire(codeLangue);
    showLangueFlagAndSelectedSBlangueName(codeLangue);
    translateProductsInfos(codeLangue);
    
    localStorage.setItem('langueCode', codeLangue); // sauvegarde de cet id
  })
 }

// Lors de la selection d'une langue dans la sideBar
languesSB.addEventListener('change', (e) =>{
  e.preventDefault();
  e.stopPropagation();
  const codeLangue = e.target.value // récupération de la value de chaque <option> selectionée ("fr", "en", ...)
    Traduire(codeLangue);
    translateProductsInfos(codeLangue);
    showLangueFlagAndSelectedSBlangueName(codeLangue);

    localStorage.setItem('langueCode', codeLangue); //sauvegarde de cette value
});

      

// Lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  // récupération de tous les éléments sauvegardés
  const savedLang = localStorage.getItem('langueCode'); 

  // Rappel des fonctions
  if (savedLang) {
    Traduire(savedLang);
    translateProductsInfos(savedLang)
    showLangueFlagAndSelectedSBlangueName(savedLang);
  }
});





function Traduire(codeLangue) {
  for (const langue of langues) {
    localStorage.getItem('Langue')
      if(codeLangue){
                                          // - Les éléments à traduire doivent doivent être ajouter ici -
        try {
            // le header
            document.querySelectorAll('#lesRayons').forEach((el) => {
              if(el) el.textContent = dataTraductions[codeLangue].lesRayons;
            });
            document.querySelectorAll('#fruitsLegumes').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].fruitsLegumes;
            });
            document.querySelectorAll('#viandesPoissons').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].viandesPoissons;
            });
            document.querySelectorAll('#prodLaitiersEuf').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].prodLaitiersEuf;
            });
            document.querySelectorAll('#epicerie').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].epicerie;
            });
            document.querySelectorAll('#painVienois').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].painVienois;
            });
            document.querySelectorAll('#prodSurgeles').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].prodSurgeles;
            });
            document.querySelectorAll('#boissons').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].boissons;
            });
            document.querySelectorAll('#charcutTraiteur').forEach((el) => {
               if(el) el.textContent = dataTraductions[codeLangue].charcutTraiteur;
            });

            rechercher.placeholder = dataTraductions[codeLangue].rechercher;

            ImgRayFruitL.alt = dataTraductions[codeLangue].ImgRayFruitL;
            ImgRayViande.alt = dataTraductions[codeLangue].ImgRayViande;
            ImgRayLait.alt = dataTraductions[codeLangue].ImgRayLait;
            ImgRayEpic.alt = dataTraductions[codeLangue].ImgRayEpic;
            ImgRayPains.alt = dataTraductions[codeLangue].ImgRayPains;
            ImgRaySurgles.alt = dataTraductions[codeLangue].ImgRaySurgles;
            ImgRayBoissons.alt = dataTraductions[codeLangue].ImgRayBoissons;
            ImgRayCharcut.alt = dataTraductions[codeLangue].ImgRayCharcut;


            // Le CONTAINER
              document.querySelectorAll("#wlcomMessageH1").forEach((wlcomMessageH1) => {
                if(wlcomMessageH1){
                  wlcomMessageH1.textContent = dataTraductions[codeLangue].wlcomMessageH1;
                }
              })
              document.querySelectorAll("#wlcomMessageH3").forEach((wlcomMessageH3) => {
                if(wlcomMessageH3){
                  wlcomMessageH3.textContent = dataTraductions[codeLangue].wlcomMessageH3;
                }
              })

           
              

            // Section1 - Partie2: produits à acheter


            // Section2 - Partie1: le panier

            // Section2 - Partie2: le classement


            // Le footer

            // toutdroitRz.textContent = dataTraductions[codeLangue].toutdroitRz;
            // politoConf.textContent = dataTraductions[codeLangue].politoConf;
            // conditionsUser.textContent = dataTraductions[codeLangue].conditionsUser;
            // apropos.textContent = dataTraductions[codeLangue].apropos;
            // nousContacter.textContent = dataTraductions[codeLangue].nousContacter;
            // inputNom.placeholder = dataTraductions[codeLangue].inputNom;
            // inputMail.placeholder = dataTraductions[codeLangue].inputMail;
            // textarea.placeholder = dataTraductions[codeLangue].textarea;
            // envoyerMessage.textContent = dataTraductions[codeLangue].envoyerMessage;


       } catch (error) {
            console.log(error);
          }

    }
  }   
}





