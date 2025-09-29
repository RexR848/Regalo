const data = [
  {
    id: 1,
    titulo: "Día 1",
    subtitulo: "Hola romina",
    texto: "este regalo costó mucho, tiempo y dedicacion, tal que aun le faltan cosas que agregar, esto es para poder entregarlo hoy, un dia especial ya que volveremos a hablar, te amo mucho romina, este es el primer regalo",
    imagen: "https://th.bing.com/th/id/R.f019721cea9b68b97d94234d35ea28ae?rik=F2uOZD6L2IxoTw&pid=ImgRaw&r=0",
    musica: "audio/spp.mp3",
    tiempo_inicio: 0,
    loop: true,
    boton_texto: "regalo 1",
    boton_url: "https://ejemplo.com"
  }
  /*
  ,
  {
    id: 2,
    titulo: "Día 2",
    texto: "Un mensaje especial para continuar con la magia del calendario."
  },
  {
    id: 3,
    titulo: "Día 3",
    subtitulo: "hola tilin",
    imagen: "https://decorarnavidad.com/wp-content/uploads/2019/12/viaje-alsacia-navidad.jpg",
    texto: "Un mensaje especial para continuar con la magia del calendario."
  }
  */
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
  // Resetear todo primero
  titleEl.textContent = ""
  subtitleEl.textContent = ""
  textEl.textContent = ""
  imageEl.style.display = "none"
  imageEl.src = ""
  linkEl.classList.add("hidden")
  linkEl.textContent = ""
  linkEl.href = "#"

  // Rellenar con datos del item
  titleEl.textContent = item.titulo
  if(item.subtitulo){
    subtitleEl.textContent = item.subtitulo
    subtitleEl.style.display = "block"
  } else {
    subtitleEl.style.display = "none"
  }
  textEl.textContent = item.texto || ""

  if(item.imagen){
    imageEl.src = item.imagen
    imageEl.style.display = "block"
  }
  if(item.boton_texto && item.boton_url){
    linkEl.textContent = item.boton_texto
    linkEl.href = item.boton_url
    linkEl.classList.remove("hidden")
  }

  popup.classList.add("active")

  // Musica
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
