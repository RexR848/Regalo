const data = [
  {
    id: 1,
    titulo: "Día 1",
    subtitulo: "Inicio del Adviento",
    texto: "Hoy comienza la cuenta regresiva hacia la Navidad. ¡Ábreme para descubrir tu sorpresa!",
    imagen: "images/dia1.png",
    musica: "audio/navidad.mp3",
    tiempo_inicio: 12,
    loop: true
  },
  {
    id: 2,
    titulo: "Día 2",
    texto: "Un mensaje especial para continuar con la magia del calendario."
  }
]

const grid = document.getElementById("grid")
const popup = document.getElementById("popup")
const closeBtn = document.getElementById("close-popup")

const titleEl = document.getElementById("popup-title")
const subtitleEl = document.getElementById("popup-subtitle")
const textEl = document.getElementById("popup-text")
const imageEl = document.getElementById("popup-image")

let audio

function createCard(item){
  const el = document.createElement("div")
  el.className = "card"
  el.textContent = item.id
  el.addEventListener("click", ()=>openPopup(item))
  grid.appendChild(el)
}

function openPopup(item){
  titleEl.textContent = item.titulo
  subtitleEl.textContent = item.subtitulo || ""
  subtitleEl.style.display = item.subtitulo ? "block" : "none"
  textEl.textContent = item.texto
  if(item.imagen){
    imageEl.src = item.imagen
    imageEl.style.display = "block"
  } else {
    imageEl.style.display = "none"
  }

  popup.classList.add("active")

  if(item.musica){
    audio = new Audio(item.musica)
    audio.loop = item.loop || false
    if(item.loop){
      audio.currentTime = 0
    } else {
      audio.currentTime = item.tiempo_inicio || 0
    }
    audio.play()
  }
}

function closePopup(){
  popup.classList.remove("active")
  if(audio){
    audio.pause()
    audio.currentTime = 0
    audio = null
  }
}

closeBtn.addEventListener("click", closePopup)
popup.addEventListener("click", e => {if(e.target === popup) closePopup()})

data.forEach(item=>createCard(item))
