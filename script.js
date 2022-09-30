let keysTag = document.querySelectorAll(".keys");
let KeypadTag = document.querySelector(".Keypad");
let recordTag = document.querySelector(".record");
let recordDataTag = document.querySelector(".recordData");
let inputAndSaveTag = document.querySelector(".inputAndSave");
let saveTag = document.querySelector(".save");
let recContainerTag = document.querySelector(".recContainer");

let playPiano = (event) => {
    let song = new Audio(`./sound/${event}.mp3`);
    song.play()
}

let recordMusic = (e) => {
    recordDataTag.value += `${e},`;
}
 
let replayMusic = (records,delay=400) => {
    let time = delay;
    records.map((el)=>{
        setTimeout(playPiano,time,el);
        time += delay;
    })  
}

keysTag.forEach((el) => {
    el.addEventListener("click",(event)=>{
        playPiano(event.target.value)
        if ( !inputAndSaveTag.classList.contains("d-none")){
            recordMusic(event.target.value)
        }
    })
})

recordTag.addEventListener("mouseout",()=>{
    recordTag.style.backgroundColor = "#FCCA46"
})

recordTag.addEventListener("mouseover",()=>{
    recordTag.style.backgroundColor = "#ecbd3a"
})

recordTag.addEventListener("click",() => {
    recordTag.style.backgroundColor = "#dfb43f"
    if (inputAndSaveTag.classList.contains("d-none")){
        
        inputAndSaveTag.classList.remove("d-none","animate__bounceOut") 
        inputAndSaveTag.classList.add("animate__bounceIn");
    } else {
        
        inputAndSaveTag.classList.remove("animate__bounceIn")
        inputAndSaveTag.classList.add("animate__bounceOut") 
        setTimeout(()=>{
            inputAndSaveTag.classList.add("d-none")
        },800)
    }
})

saveTag.addEventListener("mouseout",()=>{
    saveTag.style.backgroundColor = "#FCCA46"
})

saveTag.addEventListener("mouseover",()=>{
    saveTag.style.backgroundColor = "#ecbd3a"
})

saveTag.addEventListener("click",() => {
    saveTag.style.backgroundColor = "#dfb43f"
    let ulTag = document.createElement("li");
    let chordDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    let playButton = document.createElement("div");
    playButton.classList.add("playButton")
    let iTag = document.createElement("i");
    let iTag1 = document.createElement("i");
    let iTag2 = document.createElement("i");
    let chordAndButtonTag = document.createElement("div")
    chordAndButtonTag.classList.add("chordAndButton")

    iTag.classList.add("fa-solid" ,"fa-play","playBtn");
    iTag1.classList.add("fa-solid" ,"fa-trash-can","deleteBtn");
    iTag2.classList.add("fa-solid", "fa-pen", "editBtn")

    // playButton.append(iTag);
    buttonDiv.append(iTag,iTag1,iTag2);
    buttonDiv.classList.add("buttonDiv")

    ulTag.classList.add("list-group-item");
    chordDiv.append(recordDataTag.value);
    chordDiv.classList.add("chord")
    chordAndButtonTag.append(chordDiv,buttonDiv);
    ulTag.append(chordAndButtonTag)
    recContainerTag.append(ulTag);
    recordDataTag.value=""

    let playBtnTag = document.querySelectorAll(".playBtn");
    let deleteBtnTag = document.querySelectorAll(".deleteBtn");
    let editBtnTag = document.querySelectorAll(".editBtn");

    playBtnTag.forEach((el) => {
        el.addEventListener("click",() => {
            let musicToPlay = el.parentElement.previousElementSibling.textContent.split(",");
            replayMusic(musicToPlay)    
        })
    })
    deleteBtnTag.forEach((el)=>{
        el.addEventListener("click", ()=>{
            let toDelete = el.parentElement.parentElement.parentElement;
            toDelete.remove()
        })
    })

    editBtnTag.forEach((el)=>{
        el.addEventListener("click",()=>{
            let toEdit = el.parentElement.previousElementSibling.textContent;
            recordDataTag.value = toEdit;
            saveTag.addEventListener("click",()=>{
                let toDelete = el.parentElement.parentElement.parentElement;
            toDelete.remove()
            })         
        })
    })
})


let keyboardPlay = (keyName) => {
    playPiano(keyName)
    recordMusic(keyName)
    keysTag.forEach((el)=>{
    if (el.value == keyName){
        el.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            setTimeout(()=>{
                el.style.backgroundColor = "#fff";
            },250)
            }
            })
}

document.addEventListener("keyup",(e) => {
    switch (e.key) {
        case ("a"):
        case ("A"):
            keyboardPlay("C4")
            break;
        case ("s"):
        case ("S"):
            keyboardPlay("D4")
            break;
        case ("d"):
        case ("D"):
            keyboardPlay("E4")
            break;
        case ("f"):
        case ("F"):
            keyboardPlay("F4")
            break;
        case ("j"):
        case ("J"):
            keyboardPlay("G4")
            break;
        case ("k"):
        case ("K"):
            keyboardPlay("A4")
            break;
        case ("l"):
        case ("L"):
            keyboardPlay("B4")
            break;
        case (":"):
        case (";"):
            keyboardPlay("C5")
            break;
        default:
            break;
    }
})
//<i class="fa-solid fa-pen"></i>