
let elbody = document.querySelector("body")
let elModeBtn = document.querySelector(".header__btn")
let elList = document.querySelector(".hero__list")

let elmodalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

elmodalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elmodalWrapper.classList.remove("open-modal")
    }
})


elModeBtn.addEventListener("click", function(evt){
   elbody.classList.toggle("mode")
})


let request = new XMLHttpRequest()

// let promise = new Promise((resolve, reject) =>{
//     request.open("GET", "./pokemon.json")
//     request.send()
//     request.onload = () =>{
//         resolve(JSON.parse(request.response))
//     }
//     request.onerror = ()=>{
//         reject("Xatolik Frontda")
//     }
//     request.onabort = () =>{
//         reject("Xatolik Baccendda")
//     }
// })

function pokemonFuncReq(path, URL){
    let promise = new Promise((resolve, reject) =>{
    request.open(path, URL)
    request.send()
    request.onload = () =>{
        resolve(JSON.parse(request.response))
    }
    request.onerror = ()=>{
        reject("Xatolik Frontda")
    }
    request.onabort = () =>{
        reject("Xatolik Baccendda")
    }
})
  return promise;

}

pokemonFuncReq("GET", "./pokemon.json").then(res => {
    let data = res;
    data.length ? data.map(item =>{
        let elItem = document.createElement("li")
        elItem.classList.add("hero__item")
        elItem.innerHTML = `
          <span class="item__line">ID: ${item.id}</span><br>
          <span class="item__line">Num: ${item.num}</span>
          <div class="hero__img-div">
          <img src="${item.img}" width="200" height="120" alt="Pokemon image">
          </div>
          <p class="item__name"><strong class="bold">Name: </strong> ${item.name}</p>
          <p class="item__weight"><strong class="bold">Weight: </strong> ${item.weight}</p>
          <p class="item__weight"><strong class="bold">Height: </strong> ${item.height}</p>
          <p class="item__chance"><strong class="bold">Spawn chance: </strong>${item.spawn_chance}</p>
          <p class="item__time"><strong class="bold">Spawn time: </strong>${item.spawn_time}</p>
          <p class="item__candy"><strong class="bold">Candy: </strong>${item.candy}</p>
          <p class="item__count"><strong class="bold">Candy count: </strong>${item.candy_count}</p>
          <p class="item__avg"><strong class="bold"> Avg spawns: </strong>${item.avg_spawns}</p>
          <p class="item__egg"><strong class="bold">Egg: </strong>${item.egg}</p>
          <div class="hero__btn">
            <button onclick="pokemonClickBtnMore(${item.id})" class="btn">Learn more</button>
          </div>
        `
        elList.appendChild(elItem)
    })
    : "Bunday ma'lumotlar yo'q"
})
.catch(err =>{
    console.log(err);
})

// ----------------Modal---------------------

function pokemonClickBtnMore(id){
    elmodalWrapper.classList.add("open-modal")
    pokemonFuncReq("GET", `./pokemon.json`).then(res =>{
        const data = res.find(item => item.id == id)
        console.log(data);
            elModal.innerHTML = `
            <span class="item__line">ID: ${data.id}</span><br>
            <span class="item__line">Num: ${data.num}</span>
            <div class=" mt-[20px] flex items-center justify-between">
            <div class="hero__img-div">
            <img src="${data.img}" width="400" height="200" alt="Pokemon image">
            </div>
            <div>
            <p class="item__name"><strong class="bold">Name: </strong> ${data.name}</p>
            <p class="item__weight"><strong class="bold">Weight: </strong> ${data.weight}</p>
            <p class="item__weight"><strong class="bold">Height: </strong> ${data.height}</p>
            <p class="item__chance"><strong class="bold">Spawn chance: </strong>${data.spawn_chance}</p>
            <p class="item__time"><strong class="bold">Spawn time: </strong>${data.spawn_time}</p>
            <p class="item__candy"><strong class="bold">Candy: </strong>${data.candy}</p>
            <p class="item__count"><strong class="bold">Candy count: </strong>${data.candy_count}</p>
            <p class="item__avg"><strong class="bold"> Avg spawns: </strong>${data.avg_spawns}</p>
            <p class="item__egg"><strong class="bold">Egg: </strong>${data.egg}</p>
            </div>
            </div>
            <div class="hero__btn absolute top-[430px] right-0 bottom-0 left-[600px]">
              <button onclick="pokemonClickBtnExit()" class="btn">Exit</button>
            </div>
            `
    })
}


function pokemonClickBtnExit(){
    elmodalWrapper.classList.remove("open-modal")
}