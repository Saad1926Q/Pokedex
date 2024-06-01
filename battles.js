const searchBtn=document.getElementById("search-btn")

let rightScore,leftScore;

async function fetchData(searchBar){
    try{
        var myPokemon = searchBar.value;

        var response = await fetch(`https://pokeapi.co/api/v2/pokemon/${myPokemon}`);
        var data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

function displayPokemondata(card,pokemonData,playerNumber){
    card.innerHTML=`
    <img src="${pokemonData.sprites.front_default}">
    <h2>${pokemonData.name}</h2>
    <p><strong>Attack:</strong><span>${pokemonData.stats[1].base_stat}</span></p>
    <p><strong>Defense:</strong><span>${pokemonData.stats[2].base_stat}</span></p>
    <p><strong>Hp:</strong><span>${pokemonData.stats[0].base_stat}</span></p>
    <p><strong>Height:</strong><span>${pokemonData.height}</span></p>
    <p><strong>Weight:</strong><span>${pokemonData.weight}</span></p>`;

    if(playerNumber===0){
        document.getElementById("left-heading").innerHTML=`Player 1 chose ${pokemonData.name}`
        document.getElementById("left-card").style.display="block";
    }
    else{
        document.getElementById("right-heading").innerHTML=`Player 2 chose ${pokemonData.name}`
        document.getElementById("right-card").style.display="block";
    }
}

function displayResult(leftScore,rightScore){
    if(leftScore>rightScore){
        document.getElementById("result-display").innerHTML="Player 1 Wins"
    }
    else if(rightScore>leftScore){
        document.getElementById("result-display").innerHTML="Player 2 Wins"
    }
    else{
        document.getElementById("result-display").innerHTML="Its A Draw"
    }
}


function replayGame(){
    document.getElementById("left-card").innerHTML="";
    document.getElementById("left-card").style.display="none";
    document.getElementById("right-card").innerHTML="";
    document.getElementById("right-card").style.display="none";
    document.getElementById("left-heading").innerHTML="";
    document.getElementById("right-heading").innerHTML="";
    document.getElementById("left-score").innerHTML="";
    document.getElementById("right-score").innerHTML="";
    document.getElementById("result-display").innerHTML="";
    document.getElementById("play-again-btn").style.display="none";

    document.getElementById("search-bar-1").value="";
    document.getElementById("search-bar-2").value="";

    leftScore=0;
    rightScore=0;
}

async function fetchBothPokemons(){
    try{
        const searchBarLeft = document.getElementById("search-bar-1");
        const searchBarRight = document.getElementById("search-bar-2");

        const [dataLeft, dataRight] = await Promise.all([
            fetchData(searchBarLeft),
            fetchData(searchBarRight)
        ]);

        console.log('Left Pokemon:', dataLeft);
        console.log('Right Pokemon:', dataRight);

        displayPokemondata(document.getElementById("left-card"),dataLeft,0);
        displayPokemondata(document.getElementById("right-card"),dataRight,1);


        leftScore=dataLeft.stats[1].base_stat+dataLeft.stats[2].base_stat+dataLeft.stats[0].base_stat;
        rightScore=dataRight.stats[1].base_stat+dataRight.stats[2].base_stat+dataRight.stats[0].base_stat

        document.getElementById("left-score").innerHTML=`<strong>Score:</strong><span>${leftScore}</span>`
        document.getElementById("right-score").innerHTML=`<strong>Score:</strong><span>${rightScore}</span>`

        displayResult(leftScore,rightScore);

        document.getElementById("play-again-btn").style.display="block";

    }catch(error){
        console.log(error)
    }
}


searchBtn.addEventListener("click",()=>{
    fetchBothPokemons();
});

document.getElementById("play-again-btn").addEventListener("click",()=>{
    replayGame();
})

document.getElementById("home-btn").addEventListener("click",()=>{
    window.location.href = "/Pokedex/index.html";
})

document.getElementById("about-btn").addEventListener("click",()=>{
    document.querySelector(".modal").style.display="block";
})

window.addEventListener("click",(event)=>{
    if(event.target==document.querySelector(".modal")){
        document.querySelector(".modal").style.display="none";
    }
})
