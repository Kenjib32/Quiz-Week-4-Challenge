//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and my score


//Variables
var welcomeScreenEl = document.getElementById("welcomeScreen");
var quizSectionEl = document.getElementById("question-container")
var conclusionEl = document.getElementById("conclusion-container")
var finalScoreEl = document.getElementById("final-score")
var inputInitials = document.getElementById("initials-input")
var leaderBoardEl = document.getElementById("leaderboard-container")
var leaderBoardLinkEl = document.getElementById("leaderboardLink")
var leaderBoardListEl = document.getElementById("leaderboard-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
var startBtnEl = document.querySelector("#start-quiz");
var btnRestartEl = document.querySelector("#restart")
var clearLeaderboardBtnEl = document.querySelector("#clear-leaderboard")
var quizQuestionEl = document.getElementById("quiz-question")
var answerbuttonsEl = document.getElementById("answer-button")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;
var HighScores = [];
var arrayShuffledQuestions
var QuestionIndex = 0

//Question Variables in an Array Format
var questions = [
    { q: 'The first index of an array is ___.', 
    a: '1. 0', 
    choices: [{choice: '1. 0'}, {choice: '2. 1'}, {choice: '3. 3'}, {choice: '4. this'}]
    },
    { q: 'Inside which HTML element do we put the javascript?', 
    a: '3. <script>', 
    choices: [{choice: '1. <h1>'}, {choice: '2. <js>'}, {choice: '3. <script>'}, {choice: '4. <head>'}]
    },
    { q: 'When did javascript first appear?', 
    a: '1. 1995', 
    choices: [{choice: '1. 1995'}, {choice: '2. Y2K'}, {choice: '3. 2007'}, {choice: '4. 1800'}]
    },
    { q: 'Who invented JavaScript??', 
    a: '2. Brendan Eich', 
    choices: [{choice: '1. Douglas Crockford'}, {choice: '2. Brendan Eich'}, {choice: '3. Ben Javascript'}, {choice: '4. Kenji Bribon'}]
    },
];

//Restart to Welcome Screen
var renderStartPage = function () {
    leaderBoardEl.classList.add("hidden")
    leaderBoardEl.classList.remove("display")
    welcomeScreenEl.classList.remove("hidden")
    welcomeScreenEl.classList.add("display")
    finalScoreEl.removeChild(finalScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0 
    score = 0
    
    if (correctEl.className = "display") {
        correctEl.classList.remove("display");
        correctEl.classList.add("hidden")
    }
    if (wrongEl.className = "display") {
        wrongEl.classList.remove("display");
        wrongEl.classList.add("hidden");
    }
}

//Timer
var setTime = function () {
    timeleft = 30;
    
    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--
        
        if (gameover) {
            clearInterval(timercheck)
        }
        
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }
        
    }, 1000)
}

var startGame = function() {
 
    welcomeScreenEl.classList.add("hidden");
    welcomeScreenEl.classList.remove('display');
    quizSectionEl.classList.remove("hidden");
    quizSectionEl.classList.add('display');
    //Shuffle the questions so they display in random order
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

//Shuffle Question Function
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}


var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

//Quiz Section Function displaying and moving on to the next questions
var displayQuestion = function(index) {
    quizQuestionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('button')
        answerbutton.classList.add('answerbutton')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};
//"Correct Answer" will appear when the answer is correct
var answerCorrect = function() {
    if (correctEl.className = "hidden") {
        correctEl.classList.remove("hidden")
        correctEl.classList.add("final")
        wrongEl.classList.remove("final")
        wrongEl.classList.add("hidden")
    }
}  
//"Incorrect Answer" will appear when the answer is wrong
var answerWrong = function() {
    if (wrongEl.className = "hidden") {
        wrongEl.classList.remove("hidden")
        wrongEl.classList.add("final")
        correctEl.classList.remove("final")
        correctEl.classList.add("hidden")
    }
}

//Correct and Incorrect Answer Function   
var answerCheck = function(event) {
    var selectedanswer = event.target
    if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
        answerCorrect()
        score = score + 1
    }
    
    else {
        answerWrong()
        
        timeleft = timeleft - 3;
    };
    
    QuestionIndex++
    if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
        setQuestion()
    }   
    else {
        gameover = "true";
        showScore();
    }
}

//Display total score screen at end of game
var showScore = function () {
    quizSectionEl.classList.add("hidden");
    conclusionEl.classList.remove("hidden");
    conclusionEl.classList.add("display");
    
    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    finalScoreEl.appendChild(scoreDisplay);
}       

//Function in requiring to populate initials block
var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your intials!");
        return;
    }
    
    inputInitials.reset();
    
    var HighScore = {
        initials: initials,
        score: score
    } 
    
    

    //push and sort scores
    HighScores.push(HighScore);
    HighScores.sort((a, b) => {return b.score-a.score});
    
    //clear visibile list to resort
    while (leaderBoardListEl.firstChild) {
        leaderBoardListEl.removeChild(leaderBoardListEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "leaderboard";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        leaderBoardListEl.appendChild(highscoreEl);
    }
    
    saveHighScore();
    displayHighScores();
    
}
//save high score
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
    
}

//load values/ called on page load
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }
    
    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})
    
    
    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "leaderboard";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        leaderBoardListEl.appendChild(highscoreEl);
        
        HighScores.push(LoadedHighScores[i]);
        
    }
}  

//display high score screen from link or when intiials entered
var displayHighScores = function() {
    
    leaderBoardEl.classList.remove("hidden");
    leaderBoardEl.classList.add("display");
    gameover = "true"
    
    if (conclusionEl.className = "display") {
        conclusionEl.classList.remove("display");
        conclusionEl.classList.add("hidden");
    }
    if (welcomeScreenEl.className = "display") {
        welcomeScreenEl.classList.remove("display");
        welcomeScreenEl.classList.add("hidden");
    }
    
    if (quizSectionEl.className = "display") {
        quizSectionEl.classList.remove("display");
        quizSectionEl.classList.add("hidden");
    }
    
    if (correctEl.className = "display") {
        correctEl.classList.remove("display");
        correctEl.classList.add("hidden");
    }
    
    if (wrongEl.className = "display") {
        wrongEl.classList.remove("display");
        wrongEl.classList.add("hidden");
    }
    
}
//clears high scores
var clearLeaderboard = function () {
    HighScores = [];
    
    while (leaderBoardListEl.firstChild) {
        leaderBoardListEl.removeChild(leaderBoardListEl.firstChild);
    }
    
    localStorage.clear(HighScores);
    
} 

loadHighScore()

//on start click, start game
startBtnEl.addEventListener("click", startGame)
//on submit button -- enter or click
inputInitials.addEventListener("submit", createHighScore)
//when view high-scores is clicked
leaderBoardLinkEl.addEventListener("click", displayHighScores)
//Go back button
btnRestartEl.addEventListener("click", renderStartPage)
//clear scores button
clearLeaderboardBtnEl.addEventListener("click", clearLeaderboard)
var quizSectionEl = document.getElementById("question-container");