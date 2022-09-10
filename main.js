const baseUrl="https://pokeapi.co/api/v2/pokemon";

const pokemonsContainer= document.querySelector(".pokemons");
const contentBtn= document.querySelector(".content_btn");
const inputSearch= document.querySelector("#inputSearch");

let nextPokemons="";
let previousPokemons="";

function getPrevious(){
    if (!previousPokemons) return alert("no hay mas");  
    callApi(previousPokemons);
};
function getNext(){
    callApi(nextPokemons);
}

function getAll(){
    callApi(baseUrl);
};

//  PRIMERA MANERA DE LLAMAR AL DATA
// fetch(baseUrl).then((data)=> data.json ())
// .then(response=>console.log(response));

// SEGUNDA MANERA DE LLAMAR AL DATA
// async function callApi(url) {
//     const data= await fetch(url)
//     const response= await data.json()

//     console.log(response);
// }

async function callApi(url) {
    const data= await fetch(url);
    const {next, previous, results } = await data.json();

    nextPokemons= next;
    previousPokemons=previous;

    printPokemon(results);
}

async function printPokemon(pokemons) {
    let html="";

    pokemons.forEach(async ({url}) => {
        const data = await fetch(url);
        const response = await data.json();
        html+= `
        <div>
            <h2>${response.name}</h2>
            <img src="${response.sprites.other["official-artwork"].front_default}" alt"${response.name}"/>
        </div>
        ` 
        pokemonsContainer.innerHTML= html;
    });
    
}
callApi(baseUrl);
// ACA ESTAMOS DELEGANDO EVENTOS(LINEA DE 51 A61)
// (BUSCAR DONDE ESTAMOS HACIENDO CLICK PARA LAS FUNCIONES)

contentBtn.addEventListener("click", (e)=>{
    if(e.target.classList.contains("btn_next")) {
        getNext();
    }
    if(e.target.classList.contains("btn_pre")) {
        getPrevious();
    }
    if(e.target.classList.contains("btn_all")) {
        getAll();
    }
    });

    inputSearch.addEventListener("change", async (e) =>{
try {

        const search =e.target.value;
        const searchUrl=`${baseUrl}/${search}`;

        const data= await fetch(searchUrl);
        const response= await data.json();

        let html="";
        html+= `
        <div>
        <h2>${response.name}</h2>
        <img src="${response.sprites.other["official-artwork"].front_default}" alt"${response.name}"/>
    </div>
    `;
        pokemonsContainer.innerHTML=html;
} catch (error) {
    pokemonsContainer.innerHTML="<h1 class='title_Error'> Este Pokemon no se encuentra</h1>";
    console.log(error);
}
    });


// CAMBIAR COLOR A CONSOLA DE VS PARA IDENTIFICAR METODOS Y MAS