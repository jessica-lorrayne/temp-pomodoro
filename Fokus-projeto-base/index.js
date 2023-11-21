const background = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const h1 = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const buttonStart = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const inputMusica = document.querySelector("#alternar-musica");
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav")
const audioPause = new Audio("./sons/pause.mp3")
const fimTemporizador = new Audio ("./sons/beep.mp3")
const imgPlayOuPause = document.querySelector(".app__card-primary-butto-icon")


let tempoDecorridoemS = 1500
let intervaloId = null

musica.loop = true

inputMusica.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoemS = 1500
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoemS = 300
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoemS = 900
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  background.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      h1.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;

    case "descanso-curto":
      h1.innerHTML = `
            Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;

    case "descanso-longo":
      h1.innerHTML = `
            Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
      break;

    default:
      break;
  }


}

const contagemRegressiva = () => {
    if (tempoDecorridoemS <= 0) {
        alert ('o tempo acabou')
        audioPause.pause()
        fimTemporizador.play()
        pararSet()
        return
    }
    tempoDecorridoemS -= 1
    mostrarTempo()
}

buttonStart.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pararSet()
        return
    } else {
        audioPlay.play()
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pauser"
    imgPlayOuPause.setAttribute('src', `./imagens/pause.png`)
}

function pararSet() {
    audioPause.play()
    imgPlayOuPause.setAttribute('src', `./imagens/play_arrow.png`)
    iniciarOuPausarBt.textContent = "Começar"
    clearInterval (intervaloId)
    intervaloId = null
}

function mostrarTempo() {
  const tempo = new Date (tempoDecorridoemS *1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()