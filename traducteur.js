function Traduire(codeLangue) {
    for (const langue of langues) {
    localStorage.getItem('Langue')
        if(codeLangue){

    //     localStorage.setItem("Langue", codeLangue)
    // console.log(langue);

            // - Les éléments à traduire doivent doivent être ajouter ici -

            // le header
            document.querySelectorAll('#lesRayons').forEach((el) => {
                el.textContent = data[codeLangue].lesRayons;
            });
            document.querySelectorAll('#fruitsLegumes').forEach((el) => {
                el.textContent = data[codeLangue].fruitsLegumes;
            });
            document.querySelectorAll('#viandesPoissons').forEach((el) => {
                el.textContent = data[codeLangue].viandesPoissons;
            });
            document.querySelectorAll('#prodLaitiersEuf').forEach((el) => {
                el.textContent = data[codeLangue].prodLaitiersEuf;
            });
            document.querySelectorAll('#epicerie').forEach((el) => {
                el.textContent = data[codeLangue].epicerie;
            });
            document.querySelectorAll('#painVienois').forEach((el) => {
                el.textContent = data[codeLangue].painVienois;
            });
            document.querySelectorAll('#prodSurgeles').forEach((el) => {
                el.textContent = data[codeLangue].prodSurgeles;
            });
            document.querySelectorAll('#boissons').forEach((el) => {
                el.textContent = data[codeLangue].boissons;
            });
            document.querySelectorAll('#charcutTraiteur').forEach((el) => {
                el.textContent = data[codeLangue].charcutTraiteur;
            });

            rechercher.placeholder = data[codeLangue].rechercher;

            ImgRayFruitL.alt = data[codeLangue].ImgRayFruitL;
            ImgRayViande.alt = data[codeLangue].ImgRayViande;
            ImgRayLait.alt = data[codeLangue].ImgRayLait;
            ImgRayEpic.alt = data[codeLangue].ImgRayEpic;
            ImgRayPains.alt = data[codeLangue].ImgRayPains;
            ImgRaySurgles.alt = data[codeLangue].ImgRaySurgles;
            ImgRayBoissons.alt = data[codeLangue].ImgRayBoissons;
            ImgRayCharcut.alt = data[codeLangue].ImgRayCharcut;


            // Le CONTENAIR
            wlcomMessageH3.textContent = data[codeLangue].wlcomMessageH3;
            wlcomMessageH1.textContent = data[codeLangue].wlcomMessageH1;

           

            // Section1 - Partie2: produits à acheter


            // Section2 - Partie1: le panier

            // Section2 - Partie2: le classement


            // Le footer

            // toutdroitRz.textContent = data[codeLangue].toutdroitRz;
            // politoConf.textContent = data[codeLangue].politoConf;
            // conditionsUser.textContent = data[codeLangue].conditionsUser;
            // apropos.textContent = data[codeLangue].apropos;
            // nousContacter.textContent = data[codeLangue].nousContacter;
            // inputNom.placeholder = data[codeLangue].inputNom;
            // inputMail.placeholder = data[codeLangue].inputMail;
            // textarea.placeholder = data[codeLangue].textarea;
            // envoyerMessage.textContent = data[codeLangue].envoyerMessage;

        }
}   
}

// Lors du chargement de la page

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('langueCode');
  if (savedLang) {
    Traduire(savedLang);
  }
});


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
 

// ! SÉLECTION DE CHAQUE ÉLÉEMENT À TRADUIRE - Variable en fonction du contenu de la page

let wlcomMessageH3 = document.getElementById('wlcomMessageH3');

// LA DATA - extensible

const data = {
  fr: {
    // Le Header
    lesRayons: 'Les rayons',
    fruitsLegumes: 'Fruits et légumes',
    viandesPoissons: 'Viandes et poissons',
    prodLaitiersEuf: 'Produits laitiers et ouefs',
    epicerie: 'Épicerie',
    painVienois: 'Pains et viénoiseries',
    prodSurgeles: 'Produits Surgelés',
    boissons: 'Boissons',
    charcutTraiteur: 'Charcuterie et traiteur',
    rechercher: 'Rechercher...',
    ImgRayFruitL: "tomate, aubergine et carotte",
    ImgRayViande: "Cuisse de poulet et poisson",
    ImgRayLait: "Bouteille de lait, fromage et ouefs",
    ImgRayEpic: "panier rempli de produits",
    ImgRayPains: "Quatres pains emballés",
    ImgRaySurgles: "Viande surgelée en sachet",
    ImgRayBoissons: "Bouteille de Coca et deux verres de jus",
    ImgRayCharcut: "Bouteille de vin et du jambon sur une planche",
    // LE CONTENAIR
    wlcomMessageH1: 'Comparez, économisez et juste',
    wlcomMessageH3: 'Faites vos courses en profitant des meilleures offres de vos supermarchés',
   
    // Section1 - Partie2: produits à acheter
    sect1P2H2: "Commencez vos achats",
    imgCoca2l: "Bouteille de Coca cola 2l",
    coca2l: "Coca cola 2l",
    imgPoire: "Une poire",
    poire: "Poire",
    imgMangueCg: "Mangue du Congo",
    mangueCg: "Mangue du Congo",
    imgOignonRg: "Oignon rouge",
    oignonRg: "Oignon rouge",
    imgChipolata: "quelques chipolata",
    chipolata: "Chipolata",
    imgParmesan: "Morceau de Parmesan",
    parmesan: "Parmesan",
    imgRouellePorc: "Rouelle de porc",
    rouellePorc: "Rouelle de porc",
    imgPouletFermier: "Poulet entier dans une assiete",
    pouletFermier: "Poulet fermier",
    imgEauMinera: "Bouteille d'eau",
    eauMinera: "Eau minérale",
    imgPepsi: "Canette de Pepsi",
    pepsi: "Pepsi",
    imgGamjaJorim: "assiete de Gamja jorim",
    gamjaJorim: "Gamja jorim",
    imgBoudinNoir: "Deux boudins noirs",
    boudinNoir: "Boudin noir",
    imgCola33cl: "Bouteille Coca cola 33cl",
    Cola33cl: "Coca cola 33cl",
    imgCeleri: " Morceau de Céleri", 
    celeri: "Céleri",
    imgAil: " Ail" ,
    ail: "Ail",
    imgKiwi: " Kiwi" ,
    kiwi: "Kiwi",
    imgGruyere: " Morceau de Gruyère" ,
    Gruyere: "Gruyère",
    imgHeineken: "Heineken",
    heineken: "Heineken",
    imgPain: "Deux pains",
    pain: "Pain",
    imgChampagne: "Champagne",
    champagne: "Champagne",
    imgHotdog: "Hotdog",
    hotdog: "Hotdog",
    imgAnanas: "ananas",
    ananas: "Ananas",
    imgMangue: "mangue",
    mangue: "Mangue",
    imgBanane: "Banane",
    banane: "Banane",
                  // Produits à compléter
    
    // Section2 - Partie1: le panier

    // Section2 - Partie2: le classement
    classement: "Classement",
    // Le footer
    toutdroitRz: "Tous droits réservés.",
    politoConf: "Politique de confidentialité",
    conditionsUser: "Conditions d'utilisation",
    apropos: "À propos",
    nousContacter: "Nous contacter",
    inputNom: "Votre nom",
    inputMail: "Votre mail",
    textarea: "Votre message",
    envoyerMessage: "Envoyer",
  },

  en: {
    // Le header
    lesRayons: 'Sections',
    fruitsLegumes: 'Fruits and vegetables',
    viandesPoissons: 'Meats and fish',
    prodLaitiersEuf: 'Dairy and eggs',
    epicerie: 'Grocery',
    painVienois: 'Breads and pastries',
    prodSurgeles: 'Frozen products',
    boissons: 'Drinks',
    charcutTraiteur: 'Deli and catering',
    rechercher: 'Search...',
    ImgRayFruitL: "tomato, eggplant and carrot",
    ImgRayViande: "Chicken leg and fish",
    ImgRayLait: "Milk bottle, cheese and eggs",
    ImgRayEpic: "basket full of products",
    ImgRayPains: "Four wrapped breads",
    ImgRaySurgles: "Frozen meat in a bag",
    ImgRayBoissons: "Coca-Cola bottle and two glasses of juice",
    ImgRayCharcut: "Wine bottle and ham on a board",
    // LE CONTENAIR
    wlcomMessageH1: 'Compare, save, and just',
    wlcomMessageH3: 'Do your shopping while enjoying the best deals from your supermarkets',
    
    // Section1 - Partie2: produits à acheter

    // Section2 - Partie1: le panier

    // Section2 - Partie2: le classement

    // Le footer
  },

  es: {
    // Le header
    lesRayons: 'Secciones',
    fruitsLegumes: 'Frutas y verduras',
    viandesPoissons: 'Carnes y pescados',
    prodLaitiersEuf: 'Lácteos y huevos',
    epicerie: 'Despensa',
    painVienois: 'Pan y bollería',
    prodSurgeles: 'Productos congelados',
    boissons: 'Bebidas',
    charcutTraiteur: 'Charcutería y catering',
    rechercher: 'Buscar...',
    ImgRayFruitL: "tomate, berenjena y zanahoria",
    ImgRayViande: "Muslo de pollo y pescado",
    ImgRayLait: "Botella de leche, queso y huevos",
    ImgRayEpic: "cesta llena de productos",
    ImgRayPains: "Cuatro panes envueltos",
    ImgRaySurgles: "Carne congelada en bolsa",
    ImgRayBoissons: "Botella de Coca-Cola y dos vasos de jugo",
    ImgRayCharcut: "Botella de vino y jamón en una tabla",
    // LE CONTENAIR
    wlcomMessageH1: 'Compara, ahorra y simplemente',
    wlcomMessageH3: 'Haz tus compras aprovechando las mejores ofertas de tus supermercados',
   
    // Section1 - Partie2: produits à acheter

    // Section2 - Partie1: le panier

    // Section2 - Partie2: le classement

    // Le footer
  },

  ln: {
    // Le header
    lesRayons: 'Bibongisi',
    fruitsLegumes: 'Mbuma mpe ndunda',
    viandesPoissons: 'Niama mpe mbisi',
    prodLaitiersEuf: 'Miliki mpe maki',
    epicerie: 'Zando ya mukie',
    painVienois: 'Mapa mpe bagato',
    prodSurgeles: 'Ya kobomba na malili',
    boissons: 'Mayi mpe masanga',
    charcutTraiteur: 'Bilya',
    rechercher: 'Luka...',
    ImgRayFruitL: "tomati, beringene mpe karoti",
    ImgRayViande: "Ebelo ya soso mpe mbisi",
    ImgRayLait: "Boteyi ya miliki, froma mpe maki",
    ImgRayEpic: "Kitunga etondi na biloko",
    ImgRayPains: "Mapa minei basangisi",
    ImgRaySurgles: "Niama ya malili kati na saki",
    ImgRayBoissons: "Boteyi ya Coca-Cola mpe mikopo mibale ya sukali",
    ImgRayCharcut: "Boteyi ya masanga mpe mosuni na libaya",
    // LE CONTENAIR
    wlcomMessageH1: 'Pona, bomba mbongo mpe kaka',
    wlcomMessageH3: 'Luka awa biloko na bazando mpe zwa bipeselami ya kitoko koleka',
   
    // Section1 - Partie2: produits à acheter

    // Section2 - Partie1: le panier

    // Section2 - Partie2: le classement


    // Le footer
  },

  zho: {
    // Le header
    lesRayons: '分类',
    fruitsLegumes: '水果和蔬菜',
    viandesPoissons: '肉类和鱼类',
    prodLaitiersEuf: '乳制品和鸡蛋',
    epicerie: '食品杂货',
    painVienois: '面包和糕点',
    prodSurgeles: '冷冻产品',
    boissons: '饮料',
    charcutTraiteur: '熟食和外卖',
    rechercher: '搜索...',
    ImgRayFruitL: "西红柿、茄子和胡萝卜",
    ImgRayViande: "鸡腿和鱼",
    ImgRayLait: "牛奶瓶、奶酪和鸡蛋",
    ImgRayEpic: "装满商品的购物篮",
    ImgRayPains: "四个包装好的面包",
    ImgRaySurgles: "袋装冷冻肉",
    ImgRayBoissons: "可口可乐瓶和两杯果汁",
    ImgRayCharcut: "一瓶葡萄酒和一块火腿放在木板上",
    // LE CONTENAIR
    wlcomMessageH1: '比较，省钱，就是',
    wlcomMessageH3: '在您的超市中购物，享受最佳优惠',
    
    // Section1 - Partie2: produits à acheter

    // Section2 - Partie1: le panier

    // Section2 - Partie2: le classement


    // Le footer

  },
};
