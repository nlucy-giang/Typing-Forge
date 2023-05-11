const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
var tracker = 0;
var wordCounter = 0;
var resetPressed = false;
var calculatedWPM = 0;

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) {
    tracker++;
    if(tracker >= 5) {
      toggleWPM();
    }
    else {
      document.getElementById('trackerItem').innerHTML = tracker;
      // alert(tracker);
      renderNewQuote() }
  }
})


function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteArray = quote.split(' ');
  wordCounter += quoteArray.length;
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  if(resetPressed == true){
    resetPressed = false;
    startTime = new Date();
    return 0;
  }
  else {
    return Math.floor((new Date() - startTime) / 1000)
  }
}


function btnFunc() {
  if(tracker >= 8){
    toggleWPM();
  }
  document.getElementById("timer").innerHTML = '0';
  resetPressed = true;
  tracker = 0;
  wordCounter = 0;
  calculatedWPM = 0;
}

function toggleWPM() {
  document.getElementById("results").innerText = wordCounter + " words typed." + "\n" + calculatedWPM + " wpm";
  document.getElementById("modal").classList.toggle("active");
}

renderNewQuote()
