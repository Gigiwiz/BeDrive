import { dataTraductions } from "./traductions.js";







 const langues = document.querySelectorAll('#langMenu a');
 for (const langue of langues) {
  langue.addEventListener("click", (e)=>{
    e.preventDefault();
    const codeLangue = e.target.id
    const lang = langue.innerHTML;
    const outPut =  document.getElementById('output')
    outPut.innerHTML = lang;
  
    localStorage.setItem('langueCode', codeLangue);
    Traduire(codeLangue);
  })
 }

 

//  For the sideBar
const languesSB = document.querySelector('.traducteurSB')

languesSB.addEventListener('change', (e) =>{
  const attr = e.target.value
  for (const el of languesSB) {
    localStorage.setItem('langueCode', attr);
    Traduire(attr);    
  }
});



// Lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('langueCode'); 
  if (savedLang) {
    Traduire(savedLang);
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
                el.textContent = dataTraductions[codeLangue].lesRayons;
            });
            document.querySelectorAll('#fruitsLegumes').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].fruitsLegumes;
            });
            document.querySelectorAll('#viandesPoissons').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].viandesPoissons;
            });
            document.querySelectorAll('#prodLaitiersEuf').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].prodLaitiersEuf;
            });
            document.querySelectorAll('#epicerie').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].epicerie;
            });
            document.querySelectorAll('#painVienois').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].painVienois;
            });
            document.querySelectorAll('#prodSurgeles').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].prodSurgeles;
            });
            document.querySelectorAll('#boissons').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].boissons;
            });
            document.querySelectorAll('#charcutTraiteur').forEach((el) => {
                el.textContent = dataTraductions[codeLangue].charcutTraiteur;
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


 

// ! SÉLECTION DE CHAQUE ÉLÉEMENT À TRADUIRE - Variable en fonction du contenu de la page



// import { Supermarket as Mpouo }  from "./BeDrive.js";

// const recupDonnées =  new Mpouo()
      

// recupDonnées.getProduits().then(resp => console.log(resp));

