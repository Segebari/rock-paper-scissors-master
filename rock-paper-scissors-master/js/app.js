setTimeout(() => {
    document.body.classList.remove('preload')
}, 500);


// DOM

const btnRules = document.querySelector('.rules-btn')
const btnClose = document.querySelector('.close-btn')
const modalRules = document.querySelector('.modal')

const Choices = [
    {
        name: "rock",
        beats:"scissors"
    },
    {
        name: "scissors",
        beats:"paper"
    },
    {
        name: "paper",
        beats:"rock"
    },
]

const choiceButtons = document.querySelectorAll('.choice-btn')
const gameDiv = document.querySelector('.game')
const resultsDiv = document.querySelector('.results')
const resultsDivs = document.querySelectorAll('.results__result')

const resultWinner = document.querySelector('.results__winner')
const resultText = document.querySelector('.results__text')

const playAgainBtn = document.querySelector('.play-again')

const scoreNumber = document.querySelector('.score__no')
let score = 0;

// GameLogic

choiceButtons.forEach( button => {
    button.addEventListener('click' , () => {
        const choiceName = button.dataset.choice;
        const choice = Choices.find(choice => choice.name === choiceName)
        choose(choice)
    })
})

function choose(choice) {
    const aichoice = aiChoose()
    displayResults([choice, aichoice])
    displayWinner([choice, aichoice])
}

function aiChoose() {
    const rand = Math.floor(Math.random() * Choices.length)
    return Choices[rand]
}

function displayResults (results) {
    resultsDivs.forEach((resultsDiv, idx) => {
        setTimeout(() => {
            resultsDiv.innerHTML = `
                <div class= "choice ${results[idx].name}">
                    <img src="./images/icon-${results[idx].name}.svg"
                    alt="${results[idx].name}" />
                </div>
            `
        }, idx * 1000);
    });

    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')

}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results)
        const aiWins = isWinner(results.reverse())

        if (userWins) {
            resultText.innerText = "you win";
            resultsDivs[0].classList.toggle('winner');
            keepScore(1)
        } else if (aiWins) {
            resultText.innerText = "you lose";
            resultsDivs[1].classList.toggle('winner');
            keepScore(-1)
        } else {
            resultText.innerText = "draw";
        }

        resultWinner.classList.toggle('hidden')
        resultsDiv.classList.toggle('show-winner')
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    score += point
    scoreNumber.innerText = score
}

// play again

playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')

    resultsDivs.forEach(resultsDiv => {
        resultsDiv.innerHTML = ""
        resultsDiv.classList.remove('winner')
    })

    resultText.innerText = "";
    resultWinner.classList.toggle('hidden')
    resultsDiv.classList.toggle('show-winner')
})

btnRules.addEventListener('click' , () => {
    modalRules.classList.toggle('show-modal')
});

btnClose.addEventListener('click' , () => {
    modalRules.classList.toggle('show-modal')
});