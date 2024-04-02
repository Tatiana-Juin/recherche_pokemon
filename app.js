// RECUPERATION THE DOM ELEMENTS
let search = document.querySelector("#search");
let form = document.querySelector("form");
let card = document.querySelector(".card-pokemon");
//appelle de l'API
let API = "https://pokeapi.co/api/v2/pokemon/";

// function asynchrone pour appeller API et récupérer des donnée
async function dataPokemon(name) {
    const reponse = await fetch(`${API}${name}`);
    // POUR AFFICHER UN MESSAGE D'ERREUR QUAND LE POKEMON N'EXISTE PAS 
    if(!reponse.ok){
        card.innerHTML=`<p class="erreur">Le pokemon n'existe pas  </p>`;
    
        return;
    }
    const data = await reponse.json()
    // console.log(data);
    affichage(data);
}


// fonction pour afficher un pokemon 
function affichage(name) {

    // creation d'une div qui va contenir l'image 
    let divImg = document.createElement("div");
    divImg.setAttribute("class","card-img-pokemon");
    card.appendChild(divImg)

    // image 
    let img = document.createElement("img");
    img.setAttribute("src",name['sprites']['front_default']);
    img.setAttribute("class","picture");
    divImg.appendChild(img);
    
    // nom 
    let h2 = document.createElement("h2");
    h2.innerText = name["name"];
    h2.setAttribute("class","name-pokemon");
    card.appendChild(h2);


    // boucle pour récupérer le type 
    for (let i = 0; i< name["types"].length;i++){
        let paraType = document.createElement("p");
        paraType.innerHTML= ` Type : ${name["types"][i].type.name}`
        paraType.setAttribute("class","type-pokemon")
        card.appendChild(paraType);
        
    }

    //   console.log(type);

    //pour pour récupérer toutes les statistique
    for (let j = 0; j<name["stats"].length;j++){
        let nameStat = name["stats"][j]["stat"].name
        // console.log(nameStat);
        let statistic = name["stats"][j].base_stat;
        // console.log(statistic);
        let paraStat = document.createElement("p");
        paraStat.setAttribute("class","stat-pokemon");
        paraStat.innerHTML = `${name["stats"][j]["stat"].name} :  ${name["stats"][j].base_stat}`
        card.appendChild(paraStat);
    }
 }

// fonction de recherche 
form.addEventListener("submit",(e) =>{
    e.preventDefault();
    
    if(search.value.length > 0){
        //on enleve le contenu qui existe 
        card.textContent="";
        //appelle de API avec la valeur saisie par l'utilisateur 
        dataPokemon(search.value);
        //on enleve le texte saisie dans le champs on le renitialisant la variable 
        search.value=""
        
      
    }

})
