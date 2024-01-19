let selectLevel = document.querySelector(".description>span:nth-child(1)")
let selectSecond = document.querySelector(".description>span:nth-child(2)")
let writeWord = document.querySelector(".writeWord")
let seconds = document.querySelector(".seconds")
let trueWritingWords = document.querySelector(".score>span:nth-child(1)")
let allWordsLength = document.querySelector(".score>span:nth-child(2)")
let allWords = document.querySelector(".words")
let startGame = document.querySelector(".startGame")
let randomWordDiv = document.querySelector(".randomWord")
let level = {
    "Easy": 6,
    "Normal": 4,
    "Hard": 3,
}
let words = ["Hello",
    "Programming",
    "Code",
    "Javascript",
    "Saddam",
    "Country",
    "VScode",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
]
allWordsLength.innerHTML = words.length
let defaultLevel = "Normal"
let defaultSecond = level[defaultLevel]
let message = document.querySelector(".message")
seconds.innerHTML = defaultSecond
selectLevel.innerHTML = defaultLevel
selectSecond.innerHTML = defaultSecond
trueWritingWords.innerHTML = 0

writeWord.onpaste = function () {
    return false
}
startGame.addEventListener("click", () => {
    startGame.remove()
    writeWord.focus()
    generateWord()


})
function generateWord() {

    let randomWord = words[Math.floor(Math.random() * words.length)]
    randomWordDiv.innerHTML = randomWord
    let getIndexWord = words.indexOf(randomWord)
    words.splice(getIndexWord, 1)
    words.forEach((word) => {
        let createDiv = document.createElement("div")
        createDiv.innerHTML = word
        allWords.appendChild(createDiv)
    })
    startPlay()
}
function startPlay() {
    let time = setInterval(() => {
        seconds.innerHTML--
        if (seconds.innerHTML <= 0) {

            if (writeWord.value.toLowerCase() == randomWordDiv.innerHTML.toLowerCase()) {
                trueWritingWords.innerHTML++
                // generateWord()
                writeWord.value = ""
                if (words.length > 0) {
                    seconds.innerHTML = defaultSecond
                    allWords.innerHTML = ""
                    generateWord()
                } else {
                    message.innerHTML = "Well Done, You Wrote Everything Correctly. You Are Very Fast."
                    message.classList.add("messageStyle")
                }
            } else {
                message.innerHTML = "YOU LOSE "
                message.classList.add("messageStyle")
            }

            clearInterval(time)
        }
    }, 1000)
}