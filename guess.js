let gameName = "Guess the World";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
let numberOfTries = 6;
let numbersOfLetter = 6;
let currentTry = 1;
let checkWord = '';
let wordsArray = ["update", "delete", "create", "master", "saddam"];
checkWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
let controlButton = document.querySelectorAll(".control")[0];
let messageArea = document.querySelector(".messageArea");
let hintsNumber = 2
let hintsControl = document.querySelector(".hint");
hintsControl.value = `${hintsNumber} Hints`;
hintsControl.addEventListener("click", getHints)
function generateTry() {
    const inputContainer = document.querySelector(".inputContainers");

    for (let i = 1; i < numberOfTries; i++) {
        const tryDiv = document.createElement("Div");
        tryDiv.classList.add(`try${i}`);
        tryDiv.classList.add("tryDiv")
        tryDiv.innerHTML = `<span>Try ${i}</span>`
        inputContainer.appendChild(tryDiv)
        if (i !== 1) {
            tryDiv.classList.add("disapledInput")
        }
        for (let j = 1; j <= numbersOfLetter; j++) {
            const crInput = document.createElement("input");
            crInput.type = "text"
            if (i !== 1) {

                tryDiv.classList.add("disabledInputs")
            }
            crInput.id = `try${i}Letter${j}`
            crInput.setAttribute("maxlength", "1")
            crInput.classList.add("inputsLetter")
            tryDiv.appendChild(crInput)
        }
    }
    inputContainer.children[1].children[1].focus()
    document.querySelectorAll(".disabledInputs input").forEach((e) => {
        e.disabled = true
    })
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase()
            let nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus()
        })

    })
    console.log(checkWord);
}
controlButton.addEventListener("click", function () {
    hundleGueses()
})
function hundleGueses() {
    checkLetter = true;
    for (let i = 1; i <= numbersOfLetter; i++) {
        let getInputs = document.querySelectorAll(`.try${currentTry} input`)[i - 1]
        let getLetter = checkWord[i - 1];
        if (getInputs) {
            if (getInputs.value.toUpperCase() == getLetter) {
                getInputs.classList.add("inPlace")
            } else if (checkWord.includes(getInputs.value.toUpperCase()) && getInputs.value.toUpperCase() !== "") {
                getInputs.classList.add("notInPlace")
                checkLetter = false
            } else {
                // getInputs.disabled = 'true'
                getInputs.classList.add("wrong")
                checkLetter = false
            }
        } else {
            checkLetter = false
        }
    }
    if (checkLetter == true) {
        messageArea.innerHTML = `<div>YOU WIN THE WORD IS</div>  <span> ${checkWord}</span>`
        let getTry = document.querySelectorAll(".tryDiv")
        getTry.forEach((div) => {
            div.classList.add("disabledInputs")

        })
        controlButton.disabled = "true"
    } else {
        // messageArea.innerHTML = `<div>YOU LOSE THE WORD IS</div>  <span> ${checkWord}</span>`
        if (document.querySelector(`.try${currentTry}`)) {
            document.querySelector(`.try${currentTry}`).classList.add("disabledInputs")
            document.querySelectorAll(`.try${currentTry} input`).forEach((input) => {
                input.disabled = true
            })
        }
        currentTry += 1
        let nextTry = document.querySelector(`.try${currentTry}`)
        if (nextTry) {
            nextTry.classList.remove("disabledInputs")
            let inputsInNextTry = document.querySelectorAll(`.try${currentTry} input`)
            inputsInNextTry.forEach((input => {
                input.disabled = false
            }))

            nextTry.children[1].focus()
        } else {
            messageArea.innerHTML = `<div>YOU LOSE THE WORD IS</div>  <span> ${checkWord}</span>`
        }

    }
    console.log(checkLetter);

}
function getHints() {
    if (hintsNumber > 0) {
        const enabledInputs = document.querySelectorAll("input:not([disabled])")
        const freeLetter = Array.from(enabledInputs).filter((input) => input.value == "")
        console.log(freeLetter);
        hintsNumber--;
        hintsControl.value = `${hintsNumber} Hints`;
        randomInput = freeLetter[Math.floor(Math.random() * freeLetter.length)]
        console.log(randomInput);
        randomIndex = Array.from(enabledInputs).indexOf(randomInput)

        if (randomIndex !== -1) {
            randomInput.value = checkWord[randomIndex].toUpperCase()
        }
    }
    if (hintsNumber == -1) {
        hintsControl.disabled = true
        hintsControl.classList.add("disabledInput")
    }
}
window.onload = function () {
    generateTry()
}
