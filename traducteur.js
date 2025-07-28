
// Les sélecteurs
    // La div select contenant les 'option' (les langues)
const selectLangue = document.querySelector('.traducteur')
    // Sélection de chaque langue
const langues = document.querySelectorAll('.traducteur option')

// ! SÉLECTION DE CHAQUE ÉLÉEMENT À TRADUIRE - Variable en fonction du contenu de la page

let wlcomMessageH3 = document.getElementById('wlcomMessageH3')


// La logique de la traduction en fonction des data
const traducteur = selectLangue.addEventListener("change", (e) => {
    for (const langue of langues) {
        let attr = langue.getAttribute('value')
        if(e.target.value === attr){
            wlcomMessageH3.textContent = data[attr].wlcomMessageH3;

            // Les éléments à traduire préselectionnés doivent doivent être ajouter ici

        }
}
});

// Le stockage dans la localStorage

// LA DATA - extensible

let data = {
    "fr":
    {
        "wlcomMessageH3":'Faites vos courses en profitant des meilleures offres de vos supermarchés'
    },

    "en":
    {
        "wlcomMessageH3":'Look me now'
    },

    "es":
    {
        "wlcomMessageH3":'Qual es la fecha de hoy'
    },

    "ln":
    {
        "wlcomMessageH3":'Na zo louka mwana wana'
    },

    "zho":
    {
        "wlcomMessageH3":'hfoeklsd,nozljnvioej hoefnoieznfienfi'
    },
}


