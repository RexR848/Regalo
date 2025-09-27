const data = [
  {
    id: 1,
    titulo: "Día 1",
    subtitulo: "Inicio del Adviento",
    texto: "Hoy comienza la cuenta regresiva hacia la Navidad. ¡Ábreme para descubrir tu sorpresa!",
    imagen: "images/dia1.png",
    musica: "audio/navidad.mp3",
    tiempo_inicio: 12,
    loop: true,
    boton_texto: "Ir a sorpresa",
    boton_url: "https://ejemplo.com"
  },
  {
    id: 2,
    titulo: "Día 2",
    texto: "Un mensaje especial para continuar con la magia del calendario."
  },
  {
    id: 3,
    titulo: "Día 3",
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
const linkEl = document.getElementById("popup-link")
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
  if(item.boton_texto && item.boton_url){
    linkEl.textContent = item.boton_texto
    linkEl.href = item.boton_url
    linkEl.classList.remove("hidden")
  } else {
    linkEl.classList.add("hidden")
  }
  popup.classList.add("active")
  if(item.musica){
    audio = new Audio(item.musica)
    audio.loop = item.loop || false
    audio.currentTime = item.loop ? 0 : (item.tiempo_inicio || 0)
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

const welcomePopup = document.getElementById("welcome-popup")
const closeWelcome = document.getElementById("close-welcome")
if(!localStorage.getItem("welcomeShown")){
  welcomePopup.classList.add("active")
}
closeWelcome.addEventListener("click", ()=>{
  welcomePopup.classList.remove("active")
  localStorage.setItem("welcomeShown", "true")
})

const codigoPopup = document.getElementById("codigo-popup")
document.getElementById("btn-codigo").addEventListener("click", ()=>{
  codigoPopup.classList.add("active")
})
document.getElementById("close-codigo").addEventListener("click", ()=>{
  codigoPopup.classList.remove("active")
})
document.getElementById("enviar-codigo").addEventListener("click", ()=>{
  alert("Código enviado: " + document.getElementById("codigo-input").value)
})

let tickets = 5
const gachaPopup = document.getElementById("gacha-popup")
document.getElementById("btn-gacha").addEventListener("click", ()=>{
  document.getElementById("gacha-tickets").textContent = tickets
  gachaPopup.classList.add("active")
})
document.getElementById("close-gacha").addEventListener("click", ()=>{
  gachaPopup.classList.remove("active")
})
document.getElementById("usar-ticket").addEventListener("click", ()=>{
  if(tickets > 0){
    tickets--
    document.getElementById("gacha-tickets").textContent = tickets
    alert("Usaste un ticket (próximamente gacha...)")
  } else {
    alert("No tienes tickets.")
  }
})
