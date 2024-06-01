const searchBar=document.getElementById("search-bar")
const searchBtn=document.getElementById("search-btn")

let cardsList=[];
let cardsHistory;
var historyIndex;
var historyCardKey;
lastUpdated=0;


if(localStorage.cardsHistory){
    cardsHistory=JSON.parse(localStorage.getItem("cardsHistory"));
}
else{
    cardsHistory={};
}

async function fetchData(){
    try{
        var myPokemon=searchBar.value;

        var response=await fetch(`https://pokeapi.co/api/v2/pokemon/${myPokemon}`)

        var data = await response.json();

        return data;
    }
    catch(error){
        console.log(error);
    }
}

searchBtn.addEventListener("click",()=>{
    fetchData()
    .then(data=>{
        console.log(data)
        
        if (cardsList.length===0) {


            var cardContent = `
        <img src="${data.sprites.front_default}">
        <h2>${data.name}</h2>
        <p><strong>Attack:</strong><span>${data.stats[1].base_stat}</span></p>
        <p><strong>Defense:</strong><span>${data.stats[2].base_stat}</span></p>
        <p><strong>Hp:</strong><span>${data.stats[0].base_stat}</span></p>
        <p><strong>Height:</strong><span>${data.height}</span></p>
        <p><strong>Weight:</strong><span>${data.weight}</span></p>
        `
            cardsList[0]=cardContent;
            historyIndex=Object.keys(cardsHistory).length+1;
            historyCardKey=`card-${historyIndex}`
            cardsHistory[historyCardKey]=cardContent
            console.log(cardsHistory)
            document.getElementById("card-1").innerHTML=cardContent;
            document.getElementById("card-1").style.display="block";
        }
        else if (lastUpdated < 2) {

            var cardContent = `
            <img src="${data.sprites.front_default}">
            <h2>${data.name}</h2>
            <p><strong>Attack:</strong><span>${data.stats[1].base_stat}</span></p>
            <p><strong>Defense:</strong><span>${data.stats[2].base_stat}</span></p>
            <p><strong>Hp:</strong><span>${data.stats[0].base_stat}</span></p>
            <p><strong>Height:</strong><span>${data.height}</span></p>
            <p><strong>Weight:</strong><span>${data.weight}</span></p>
        `
            cardsList[lastUpdated+1]=cardContent;
            historyIndex=Object.keys(cardsHistory).length+1;
            historyCardKey=`card-${historyIndex}`
            cardsHistory[historyCardKey]=cardContent
            console.log(cardsHistory)
            document.getElementById(`card-${lastUpdated+2}`).innerHTML=cardContent;
            document.getElementById(`card-${lastUpdated+2}`).style.display="block";
            lastUpdated++;
            if((cardsList.length===2)&&(document.getElementById("back-btn").style.display==="none")&&(document.getElementById("next-btn").style.display==="none")){
                document.getElementById("back-btn").style.display="block";
                document.getElementById("next-btn").style.display="block";
            }
        }
        else if(lastUpdated==2){
            var cardContent = `
            <img src="${data.sprites.front_default}">
            <h2>${data.name}</h2>
            <p><strong>Attack:</strong><span>${data.stats[1].base_stat}</span></p>
            <p><strong>Defense:</strong><span>${data.stats[2].base_stat}</span></p>
            <p><strong>Hp:</strong><span>${data.stats[0].base_stat}</span></p>
            <p><strong>Height:</strong><span>${data.height}</span></p>
            <p><strong>Weight:</strong><span>${data.weight}</span></p>
            `
                cardsList[0]=cardContent;
                historyIndex=Object.keys(cardsHistory).length+1;
                historyCardKey=`card-${historyIndex}`
                cardsHistory[historyCardKey]=cardContent
                console.log(cardsHistory)
                document.getElementById(`card-1`).innerHTML=cardContent;
                document.getElementById(`card-1`).style.display="block";
                lastUpdated=0;
        }
        localStorage.setItem("cardsHistory",JSON.stringify(cardsHistory));
    })
})

document.getElementById("next-btn").addEventListener("click",()=>{
    var leftElement=cardsList[0];
    var middleElement=cardsList[1];
    var rightElement=cardsList[2];

    cardsList[0]=rightElement;
    cardsList[1]=leftElement;
    cardsList[2]=middleElement;

    document.getElementById(`card-1`).innerHTML=cardsList[0];
    document.getElementById(`card-2`).innerHTML=cardsList[1];
    document.getElementById(`card-3`).innerHTML=cardsList[2];
})

document.getElementById("back-btn").addEventListener("click",()=>{
    var leftElement=cardsList[0];
    var middleElement=cardsList[1];
    var rightElement=cardsList[2];
    
    cardsList[0]=middleElement;
    cardsList[1]=rightElement;
    cardsList[2]=leftElement;

    document.getElementById(`card-1`).innerHTML=cardsList[0];
    document.getElementById(`card-2`).innerHTML=cardsList[1];
    document.getElementById(`card-3`).innerHTML=cardsList[2];
})

document.getElementById("history-btn").addEventListener("click", () => {
    window.location.href = "/history.html";
});

document.getElementById("battle-btn").addEventListener("click",()=>{
    window.location.href = "/battle.html";
})

document.getElementById("about-btn").addEventListener("click",()=>{
    document.querySelector(".modal").style.display="block";
})

window.addEventListener("click",(event)=>{
    if(event.target==document.querySelector(".modal")){
        document.querySelector(".modal").style.display="none";
    }
})
