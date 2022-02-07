//<>
const api = "https://pokeapi.co/api/v2/" // Direccion de la API
async function getDB(x,y){
    if(!x)return;
    if(y==true){
        await fetch(api+x)
            .then(data => data.json().then(result => db=result));
        return db;
    }else{
        await fetch(api+"pokemon/"+x)
            .then(data => data.json().then(result => db=result));
        return db;
    }
    
} // Llamada a la API (Return pkmn info)

function capitalize(word){
    return word[0].toUpperCase() + word.slice(1);
} // Mayusculas

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
} // Delay

async function newProfile(x){
    var input = x
    await getDB(input).then(data => {pkmn = data});

    var dir = document.getElementById("list"); 
    var profile = document.createElement("div"); profile.id="profile";
    
    var id = document.createElement("h4"); id.innerText=pkmn.id; id.className="id"
    var img = document.createElement("div"); img.className="img"
    var txt = document.createElement("div"); txt.className="txt"
    var stats = document.createElement("div"); stats.className="stats"
    
    
    var picture = document.createElement("img"); picture.src=pkmn.sprites.front_default;
    var name = document.createElement("h3"); name.innerText=capitalize(pkmn.name); 
    var types = document.createElement("p");types.innerText="Types:";pkmn.types.forEach(data => {types.innerText=types.innerText+" "+capitalize(data.type.name)});
    
    var stats_info = document.createElement("div");
    stats_info.className="stats_info"
    stats_info.innerHTML=`<div><h4>HP:</h4><p>${pkmn.stats[0].base_stat}</p></div>`
    stats_info.innerHTML+=`<div><h4>ATK:</h4><p>${pkmn.stats[1].base_stat}</p></div>`
    stats_info.innerHTML+=`<div><h4>DEF:</h4><p>${pkmn.stats[2].base_stat}</p></div>`

    var stats_info_b = document.createElement("div");
    stats_info_b.className="stats_info"
    stats_info_b.innerHTML=`<div><h4>SPD:</h4><p>${pkmn.stats[5].base_stat}</p></div>`
    stats_info_b.innerHTML+=`<div><h4>E-ATK:</h4><p>${pkmn.stats[3].base_stat}</p></div>`
    stats_info_b.innerHTML+=`<div><h4>E-DEF:</h4><p>${pkmn.stats[4].base_stat}</p></div>`



    //Pintamos
    img.appendChild(picture);
    txt.appendChild(name);
    txt.appendChild(types);

    stats.appendChild(stats_info)
    stats.appendChild(stats_info_b)

    profile.appendChild(id);
    profile.appendChild(img);
    profile.appendChild(txt);
    profile.appendChild(stats)

    dir.appendChild(profile);
} // Creamos un nuevo perfil 

async function load(){
    max=60

    for(i=1;i<=max;i++){
        await newProfile(i)
        if(i>=max){
            document.getElementById("loading").style="display:none"
            document.getElementById("pokeapi").style="display:block"
        }
    }

} // Cargamos la pagina

window.onload=load();
