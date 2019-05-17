'use strict';

// Array that all questions are being pushed to from the constructor
Question.allQuestions = [];

var questionCounter = 0;
var downloadTimer = null;

// sound files
var correct = new Audio('sound/correct.mp3');
var gameover = new Audio('sound/gameover.mp3');
var ticktock = new Audio('sound/ticktock.mp3');
var outoftime = new Audio('sound/outoftime.mp3');
var winner = new Audio('sound/sparkle.mp3');
var soundsArray = [correct, gameover, ticktock, outoftime, winner];

// variables accessing elements in the HTML
var divQuestionEl = document.getElementById('question');
var divAnswerEl = document.getElementById('answers');
var divAnswerElAB = document.getElementById('answersAB');
var divAnswerElCD = document.getElementById('answersCD');
var nextQuestionDiv = document.getElementById('next-question');
var timerEl = document.getElementById('timer');
var divLevelIndicatorEl = document.getElementById('levelIndicator');
var endGameMsgEl = document.getElementById('endGameMsg');
var level = document.getElementById('level');
var divLogOutEl = document.getElementById('logout');
var rand = 0;

function User(username, password) {
  this.username = username;
  this.password = password;
  this.topScore = 0;
  User.allUsers.push(this);
}

// if page is refreshed set current user's score to 0 and save it to localStorage
// if currentUser's data exists in localStorage, retrieve it
User.currentUser = {name: '', score: 0, topScore: 0};
if(performance.navigation.type === 1 && localStorage.currentUser){
  checkSavedCurrentUser();
  returnUser();
  User.currentUser['score'] = 0;
  saveCurrentUser();
  questionCounter = 0;
}else if(performance.navigation.type === 0 && localStorage.currentUser){
  checkSavedCurrentUser();
  returnUser();
}

// Constructor function
function Question(question, answer, setOfAnswers, difficulty) {
  this.question = question;
  this.answer = answer;
  this.setOfAnswers = setOfAnswers;
  this.difficulty = difficulty;
  Question.allQuestions.push(this);
}

// New Instances of the constructor
//books
new Question('Which of the following authors was not born in England? ', 'Arthur Conan Doyle', [ 'Arthur Conan Doyle', 'Graham Greene', 'Arthur C Clarke', 'H G Wells'], 2);
new Question('Who wrote \'Harry Potter\'?', 'J.K. Rowling', [ 'J.K. Rowling', 'Daniel Radcliffe', 'Terry Pratchett', 'J.R.R. Tolkien'], 1);
new Question('Who wrote the \'A Song of Ice And Fire\' fantasy novel series?', 'George R. R. Martin', [ 'George R. R. Martin', 'George Eliot', 'George Orwell', 'George Lucas'], 2);
new Question('Who wrote the novel \'Moby-Dick\'?', 'Herman Melville', [ 'Herman Melville', 'J. R. R. Tolkien', 'William Shakespeare', 'William Golding'], 3);
new Question('How many books are in the Chronicles of Narnia series?', '7', [ '7', '6', '8', '5'], 2);
new Question('Who wrote the 1967 horror novel \'Rosemary\'s Baby\'?', 'Ira Levin', [ 'Ira Levin', 'Stephen King', 'Mary Shelley', 'Robert Bloch'], 2);
new Question('What is Ron Weasley\'s middle name?', 'Bilius', [ 'Bilius', 'Dominic', 'Arthur', 'John'], 3);
new Question('What position does Harry Potter play in Quidditch?', 'Seeker', [ 'Seeker', 'Chaser', 'Keeper', 'Beater'], 2);
new Question('What is the fourth book of the Old Testament?', 'Numbers', [ 'Numbers', 'Genesis', 'Leviticus', 'Exodus'], 2);
new Question('Abel Magwitch is a character from which Charles Dickens novel?', 'Great Expectations', [ 'Great Expectations', 'Nicholas Nickleby', 'Oliver Twist', 'The Pickwick Papers'], 3);
new Question('\'Green Eggs And Ham\' is a book by which author?', 'Dr. Seuss', [ 'Dr. Seuss', 'Beatrix Potter', 'Roald Dahl', 'A.A. Milne'], 1);
new Question('How many Harry Potter books are there?', '7', [ '7', '6', '8', '5'], 1);
new Question('What is the name of the three headed dog in Harry Potter and the Sorcerer\'s Stone?', 'Fluffy', [ 'Fluffy', 'Poofy', 'Spot', 'Spike'], 1);
new Question('What is the name of the protagonist of J.D. Salinger\'s novel Catcher in the Rye?', 'Holden Caulfield', [ 'Holden Caulfield', 'Randall Flagg', 'Jay Gatsby', 'Fletcher Christian'], 1);
new Question('Which of these book series is by James Patterson?', 'Maximum Ride', [ 'Maximum Ride', 'Harry Potter', 'The Bartemaeus Trilogy', 'The Legend of Xanth'], 2);
new Question('The book \'Fahrenheit 451\' was written by whom?', 'Ray Bradbury', [ 'Ray Bradbury', 'Wolfgang Amadeus Mozart', 'R. L. Stine', 'Stephen King'], 2);
new Question('Which of the following is NOT a work done by Shakespeare?', 'Trial of Temperance', [ 'Trial of Temperance', 'Measure For Measure', 'Titus Andronicus', 'Cymbeline'], 3);
new Question('What is the name of Sherlock Holmes\'s brother?', 'Mycroft Holmes', [ 'Mycroft Holmes', 'Mederi Holmes', 'Martin Holmes', 'Herbie Hancock Holmes'], 1);
new Question('Which of the following was the author of \'Username Evie\'?', 'Joe Sugg', [ 'Joe Sugg', 'Alfie Deyes', 'Zoe Sugg', 'Joe Weller'], 2);
new Question('In which classic novel is there a character named Homer Simpson?', 'The Day of the Locust', [ 'The Day of the Locust', 'A Separate Peace', 'Catch-22', 'Of Mice and Men'], 3);
new Question('What is the name of Eragon\'s dragon in \'Eragon\'?', 'Saphira', [ 'Saphira', 'Arya', 'Glaedr', 'Thorn'], 2);
new Question('What was the first ever entry written for the SCP Foundation collaborative writing project?', 'SCP-173', [ 'SCP-173', 'SCP-999', 'SCP-001', 'SCP-1459'], 1);
new Question('Who wrote the \'A Song of Ice And Fire\' fantasy novel series?', 'George R. R. Martin', [ 'George R. R. Martin', 'George Lucas', 'George Orwell', 'George Eliot'], 2);
new Question('Who wrote the novel \'Moby-Dick\'?', 'Herman Melville', [ 'Herman Melville', 'J. R. R. Tolkien', 'William Golding', 'William Shakespeare'], 3);
new Question('Who wrote the 1967 horror novel \'Rosemary\'s Baby\'?', 'Ira Levin', [ 'Ira Levin', 'Stephen King', 'Robert Bloch', 'Mary Shelley'], 2);
new Question('What is Hermione Granger\'s middle name?', 'Jean', [ 'Jean', 'Emma', 'Jo', 'Jane'], 3);
new Question('What is Ron Weasley\'s middle name?', 'Bilius', [ 'Bilius', 'Arthur', 'Dominic', 'John'], 3);
new Question('What position does Harry Potter play in Quidditch?', 'Seeker', [ 'Seeker', 'Chaser', 'Beater', 'Keeper'], 2);
new Question('Who wrote the novel \'Fear And Loathing In Las Vegas\'?', 'Hunter S. Thompson', [ 'Hunter S. Thompson', 'F. Scott Fitzgerald', 'William S. Burroughs', 'Henry Miller'], 1);
new Question('Abel Magwitch is a character from which Charles Dickens novel?', 'Great Expectations', [ 'Great Expectations', 'Oliver Twist', 'The Pickwick Papers', 'Nicholas Nickleby'], 3);
new Question('Which famous spy novelist wrote the childrens\' story \'Chitty-Chitty-Bang-Bang\'?', 'Ian Fleming', [ 'Ian Fleming', 'Joseph Conrad', 'Graham Greene', 'John Buchan'], 1);
new Question('By what name was the author Eric Blair better known?', 'George Orwell', [ 'George Orwell', 'Ernest Hemingway', 'Ray Bradbury', 'Aldous Huxley'], 2);
new Question('Who wrote the children\'s story \'The Little Match Girl\'?', 'Hans Christian Andersen', [ 'Hans Christian Andersen', 'Oscar Wilde', 'Charles Dickens', 'Lewis Carroll'], 2);
new Question('How many Harry Potter books are there?', '7', [ '7', '5', '6', '8'], 1);
new Question('Under what pseudonym did Stephen King publish five novels between 1977 and 1984?', 'Richard Bachman', [ 'Richard Bachman', 'Mark Twain', 'J. D. Robb', 'Lewis Carroll'], 1);
new Question('The novel \'Jane Eyre\' was written by what author? ', 'Charlotte Brontë', [ 'Charlotte Brontë', 'Jane Austen', 'Emily Brontë', 'Louisa May Alcott'], 3);
new Question('Who wrote the young adult novel \'The Fault in Our Stars\'?', 'John Green', [ 'John Green', 'Stephen Chbosky', 'Stephenie Meyer', 'Suzanne Collins'], 1);
new Question('What is the name of the three headed dog in Harry Potter and the Sorcerer\'s Stone?', 'Fluffy', [ 'Fluffy', 'Spike', 'Poofy', 'Spot'], 1);
new Question('What is the name of the protagonist of J.D. Salinger\'s novel Catcher in the Rye?', 'Holden Caulfield', [ 'Holden Caulfield', 'Jay Gatsby', 'Randall Flagg', 'Fletcher Christian'], 1);
new Question('The book \'Fahrenheit 451\' was written by whom?', 'Ray Bradbury', [ 'Ray Bradbury', 'R. L. Stine', 'Stephen King', 'Wolfgang Amadeus Mozart'], 2);
new Question('Which of the following is NOT a work done by Shakespeare?', 'Trial of Temperance', [ 'Trial of Temperance', 'Cymbeline', 'Measure For Measure', 'Titus Andronicus'], 3);
new Question('What is the name of Sherlock Holmes\'s brother?', 'Mycroft Holmes', [ 'Mycroft Holmes', 'Herbie Hancock Holmes', 'Mederi Holmes', 'Martin Holmes'], 1);
new Question('Which of the following was the author of \'Username Evie\'?', 'Joe Sugg', [ 'Joe Sugg', 'Zoe Sugg', 'Joe Weller', 'Alfie Deyes'], 2);
new Question('In which classic novel is there a character named Homer Simpson?', 'The Day of the Locust', [ 'The Day of the Locust', 'Catch-22', 'A Separate Peace', 'Of Mice and Men'], 3);
new Question('What is the name of Eragon\'s dragon in \'Eragon\'?', 'Saphira', [ 'Saphira', 'Thorn', 'Glaedr', 'Arya'], 2);
new Question('What was the first ever entry written for the SCP Foundation collaborative writing project?', 'SCP-173', [ 'SCP-173', 'SCP-001', 'SCP-1459', 'SCP-999'], 1);
new Question('Which of the following authors was not born in England? ', 'Arthur Conan Doyle', [ 'Arthur Conan Doyle', 'H G Wells', 'Arthur C Clarke', 'Graham Greene'], 2);
new Question('Who wrote \'Harry Potter\'?', 'J.K. Rowling', [ 'J.K. Rowling', 'Daniel Radcliffe', 'J.R.R. Tolkien', 'Terry Pratchett'], 1);
new Question('Who wrote the \'A Song of Ice And Fire\' fantasy novel series?', 'George R. R. Martin', [ 'George R. R. Martin', 'George Eliot', 'George Lucas', 'George Orwell'], 2);
new Question('Who wrote the novel \'Moby-Dick\'?', 'Herman Melville', [ 'Herman Melville', 'William Shakespeare', 'J. R. R. Tolkien', 'William Golding'], 3);
new Question('How many books are in the Chronicles of Narnia series?', '7', [ '7', '6', '5', '8'], 2);
new Question('Who wrote the 1967 horror novel \'Rosemary\'s Baby\'?', 'Ira Levin', [ 'Ira Levin', 'Mary Shelley', 'Stephen King', 'Robert Bloch'], 2);
new Question('What is the fourth book of the Old Testament?', 'Numbers', [ 'Numbers', 'Genesis', 'Exodus', 'Leviticus'], 2);
new Question('Who wrote the novel \'Fear And Loathing In Las Vegas\'?', 'Hunter S. Thompson', [ 'Hunter S. Thompson', 'F. Scott Fitzgerald', 'Henry Miller', 'William S. Burroughs'], 1);
new Question('Abel Magwitch is a character from which Charles Dickens novel?', 'Great Expectations', [ 'Great Expectations', 'Oliver Twist', 'Nicholas Nickleby', 'The Pickwick Papers'], 3);
new Question('\'Green Eggs And Ham\' is a book by which author?', 'Dr. Seuss', [ 'Dr. Seuss', 'Roald Dahl', 'A.A. Milne', 'Beatrix Potter'], 1);
new Question('Which famous spy novelist wrote the childrens\' story \'Chitty-Chitty-Bang-Bang\'?', 'Ian Fleming', [ 'Ian Fleming', 'John Buchan', 'Graham Greene', 'Joseph Conrad'], 1);
new Question('By what name was the author Eric Blair better known?', 'George Orwell', [ 'George Orwell', 'Ray Bradbury', 'Ernest Hemingway', 'Aldous Huxley'], 2);
new Question('Who wrote the children\'s story \'The Little Match Girl\'?', 'Hans Christian Andersen', [ 'Hans Christian Andersen', 'Oscar Wilde', 'Lewis Carroll', 'Charles Dickens'], 2);
new Question('Under what pseudonym did Stephen King publish five novels between 1977 and 1984?', 'Richard Bachman', [ 'Richard Bachman', 'Mark Twain', 'Lewis Carroll', 'J. D. Robb'], 1);
new Question('The novel \'Of Mice And Men\' was written by what author? ', 'John Steinbeck ', [ 'John Steinbeck ', 'Mark Twain ', 'Harper Lee', 'George Orwell'], 2);
new Question('Who wrote the young adult novel \'The Fault in Our Stars\'?', 'John Green', [ 'John Green', 'Stephenie Meyer', 'Suzanne Collins', 'Stephen Chbosky'], 1);
new Question('Which of these does Charlie NOT read in The Perks of Being a Wallflower?', 'The Grapes of Wrath', [ 'The Grapes of Wrath', 'The Great Gatsby', 'Peter Pan', 'Hamlet'], 3);
new Question('What is the name of the three headed dog in Harry Potter and the Sorcerer\'s Stone?', 'Fluffy', [ 'Fluffy', 'Spot', 'Poofy', 'Spike'], 1);
new Question('The title of Adolf Hitler\'s autobiography \'Mein Kampf\' is what when translated to English?', 'My Struggle', [ 'My Struggle', 'My Sadness', 'My Desire', 'My Hatred'], 2);
new Question('The book \'The Little Prince\' was written by...', 'Antoine de Saint-Exupéry', [ 'Antoine de Saint-Exupéry', 'Jane Austen', 'F. Scott Fitzgerald', 'Miguel de Cervantes Saavedra'], 2);
new Question('The book \'Fahrenheit 451\' was written by whom?', 'Ray Bradbury', [ 'Ray Bradbury', 'R. L. Stine', 'Wolfgang Amadeus Mozart', 'Stephen King'], 2);
new Question('Who wrote \'Harry Potter\'?', 'J.K. Rowling', [ 'J.K. Rowling', 'Terry Pratchett', 'Daniel Radcliffe', 'J.R.R. Tolkien'], 1);
new Question('Who wrote the \'A Song of Ice And Fire\' fantasy novel series?', 'George R. R. Martin', [ 'George R. R. Martin', 'George Orwell', 'George Eliot', 'George Lucas'], 2);
new Question('How many books are in the Chronicles of Narnia series?', '7', [ '7', '8', '5', '6'], 2);
new Question('What is Ron Weasley\'s middle name?', 'Bilius', [ 'Bilius', 'John', 'Arthur', 'Dominic'], 3);
new Question('What position does Harry Potter play in Quidditch?', 'Seeker', [ 'Seeker', 'Keeper', 'Chaser', 'Beater'], 2);
new Question('What is the fourth book of the Old Testament?', 'Numbers', [ 'Numbers', 'Leviticus', 'Genesis', 'Exodus'], 2);
new Question('Abel Magwitch is a character from which Charles Dickens novel?', 'Great Expectations', [ 'Great Expectations', 'The Pickwick Papers', 'Oliver Twist', 'Nicholas Nickleby'], 3);
new Question('\'Green Eggs And Ham\' is a book by which author?', 'Dr. Seuss', [ 'Dr. Seuss', 'A.A. Milne', 'Roald Dahl', 'Beatrix Potter'], 1);
new Question('The novel \'Of Mice And Men\' was written by what author? ', 'John Steinbeck ', [ 'John Steinbeck ', 'Harper Lee', 'Mark Twain ', 'George Orwell'], 2);
new Question('Which of these does Charlie NOT read in The Perks of Being a Wallflower?', 'The Grapes of Wrath', [ 'The Grapes of Wrath', 'The Great Gatsby', 'Hamlet', 'Peter Pan'], 3);
new Question('What is the name of the three headed dog in Harry Potter and the Sorcerer\'s Stone?', 'Fluffy', [ 'Fluffy', 'Poofy', 'Spike', 'Spot'], 1);
new Question('Which of these book series is by James Patterson?', 'Maximum Ride', [ 'Maximum Ride', 'The Legend of Xanth', 'The Bartemaeus Trilogy', 'Harry Potter'], 2);
new Question('Which of the following was the author of \'Username Evie\'?', 'Joe Sugg', [ 'Joe Sugg', 'Joe Weller', 'Alfie Deyes', 'Zoe Sugg'], 2);

function randomNumGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fisher-Yates Shuffle gives us a random order of an array
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Main game question function
function gameQuestions() {
  divAnswerEl.addEventListener('click', answerButtonHandler);
  timerEl.removeAttribute('class', 'hidden-element');
  questionCounter += 1;
  countDownTimer();

  // pulling a random number from our array of questions
  if (questionCounter < 4) {
    do { rand = randomNumGenerator(0, Question.allQuestions.length - 1);
    } while (Question.allQuestions[rand].difficulty !== 1);
  } else if (questionCounter < 7) {
    do { rand = randomNumGenerator(0, Question.allQuestions.length - 1);
    } while (Question.allQuestions[rand].difficulty !== 2);
  } else {
    for (var x = Question.allQuestions.length - 1; x >= 0 ; x--) {
      if (Question.allQuestions[x].difficulty === 1 || Question.allQuestions[x].difficulty === 2) {
        Question.allQuestions.splice(x, 1);
      }
    }
    if (Question.allQuestions.length === 0) {
      endingGame();
    }
    rand = randomNumGenerator(0, Question.allQuestions.length - 1);
  }

  var q1 = Question.allQuestions[rand];
  var pEl = document.createElement('p');
  pEl.textContent = q1.question;

  //appending random question to an element in game.html
  divQuestionEl.appendChild(pEl);

  // shuffling the array of possible answer so that they appear in a random order and assigning to a variable
  var answerArray = shuffle(q1.setOfAnswers);

  // for loop to assign a letter to each question in the correct order
  for (var i = 0; i < answerArray.length; i++) {
    var letterIndex;
    if (i === 0) {
      letterIndex = ' ';
    } else if (i === 1) {
      letterIndex = ' ';
    } else if (i === 2) {
      letterIndex = ' ' ;
    } else {
      letterIndex = ' ';
    }

    // creating button elements for each letter/answer, assigning the value of an answer and appending to the element that holds the buttons/answers
    var button = document.createElement('button');
    button.setAttribute('class', 'answerButton');
    var span = document.createElement('span');
    span.textContent = letterIndex;
    button.setAttribute('name', answerArray[i]);
    button.innerHTML = answerArray[i];
    if (i === 0 || i === 1) {
      divAnswerElAB.appendChild(span);
      divAnswerElAB.appendChild(button);
    } else if (i === 2 || i === 3) {
      divAnswerElCD.appendChild(span);
      divAnswerElCD.appendChild(button);
    }
  }

  //remove previous level indicator
  if (divLevelIndicatorEl.childElementCount !== 0){
    removeLevelIndicator();
    levelIndicator();
  } else {
    //display current level
    levelIndicator();
  }
}

// Event Listener on div that holds questions
function answerButtonHandler(e) {
  var target = e.target.name;
  var correctAnswer = Question.allQuestions[rand].answer;
  var answerChoice = e.srcElement;
  var answerButtonEls = document.querySelectorAll('button.answerButton');
  if (!e.target.name) {
    return;
  }

  divAnswerEl.removeEventListener('click', answerButtonHandler);
  timerEl.setAttribute('class', 'hidden-element');
  if (correctAnswer === target) {
    answerChoice.setAttribute('id', 'correct');
    for (var i = 0; i < answerButtonEls.length; i++) {
      answerButtonEls[i].setAttribute('class', 'no-hover');
    }

    User.currentUser['score'] += 1;

    soundsArray[2].pause();
    soundsArray[0].play();

    resetCurrentUserTopScore();
    saveCurrentUser();
    Question.allQuestions.splice(rand, 1);
    clearCountDown();

    var nextQuestionBtn = document.createElement('button');
    nextQuestionBtn.innerHTML = 'Next Question';
    nextQuestionDiv.appendChild(nextQuestionBtn);
    nextQuestionBtn.addEventListener('click', nextQuestionHandler);

  } else {
    answerChoice.setAttribute('id', 'incorrect');
    for (var j = 0; j < answerButtonEls.length; j++) {
      answerButtonEls[j].setAttribute('class', 'no-hover');
      if (correctAnswer === answerButtonEls[j].name) {
        answerButtonEls[j].setAttribute('id', 'correct');
      }
    }
    clearCountDown();

    soundsArray[2].pause();
    soundsArray[1].play();

    // resetCurrentUserScore();
    resetCurrentUserTopScore();
    console.log('are you saving?');
    //if user's score is greater than top score, set a new top score
    if(User.currentUser['score'] > User.currentUser['topScore']){
      User.currentUser['topScore'] = User.currentUser['score'];
    }
    saveCurrentUser();
    updateCUToAllUser();

    //ending game
    timerEl.innerHTML = '';
    endGameMsgEl.innerHTML = '<h2>Incorrect - Game Over</h2>';
    window.setInterval(function() {
      endingGame();
    }, 3000);
  }
}

function nextQuestionHandler(){
  divQuestionEl.innerHTML = '';
  divAnswerElAB.innerHTML = '';
  divAnswerElCD.innerHTML = '';
  nextQuestionDiv.innerHTML = '';
  gameQuestions();
}

function checkSavedCurrentUser(){
  var retrieve = JSON.parse(localStorage.getItem('currentUser'));
  User.currentUser['name'] = retrieve.name;
  User.currentUser['topScore'] = retrieve.topScore;

}

function saveCurrentUser(){
  localStorage.setItem('currentUser', JSON.stringify(User.currentUser));
}

function endingGame(){
  //retrieve currentUser info
  checkSavedCurrentUser();

  // clear out div
  endGameMsgEl.innerHTML = '';
  divLevelIndicatorEl.innerHTML = '';
  divQuestionEl.innerHTML = '';
  divAnswerEl.innerHTML = '';
  clearCountDown();
  timerEl.style.display = 'none';

  //display current user's name & score
  var nameScore = document.createElement('h2');
  nameScore.textContent = User.currentUser['name'].charAt(0).toUpperCase() + User.currentUser['name'].slice(1) + ', your score is: ' + User.currentUser['score'];


  // display message to user
  var newHiH3 = document.createElement('h3');
  if (User.currentUser['score'] === 0) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'Keep learning, grasshopper.';
  } else if (User.currentUser['score'] < 3) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'You are a Trivia Student...keep learning.';
  } else if (User.currentUser['score'] < 5) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'You are a Trivia Novice...keep learning.';
  } else if (User.currentUser['score'] < 7) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'Well done, you are on your way to becoming a Trivia Wizard.';
  } else if (User.currentUser['score'] < 9) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'You are a Trivia Master! Keep going to reach Trivia Wizard status!';
  } else if (User.currentUser['score'] > 8) {
    newHiH3 = document.createElement('h3');
    soundsArray[4].play();
    newHiH3.textContent = 'Congrats, you are a Trivia Wizard!';
  }
  divQuestionEl.appendChild(nameScore);
  divQuestionEl.appendChild(newHiH3);

  //display play again button
  var playAgainBtn = document.createElement('button');
  playAgainBtn.className = 'play-again';
  playAgainBtn.innerHTML = 'Play Again!';
  divQuestionEl.appendChild(playAgainBtn);
  playAgainBtn.addEventListener('click', pageReload);

  //save user info into localStorage
  saveCurrentUser();
}

function pageReload(){
  location.reload();
}

function countDownTimer(){
  var timeleft = 10;
  downloadTimer = setInterval(function() {
    document.getElementById('timer').innerHTML = --timeleft;

    soundsArray[2].play();
    if (timeleft <= 0){
      soundsArray[2].pause();
      soundsArray[3].play();

      clearInterval(downloadTimer);
      document.getElementById('timer').innerHTML = '';
      endingGame();
    }
  }, 1000);
}

function clearCountDown() {
  clearInterval(downloadTimer);
  timerEl.innerHTML = '';
}

// display level the user is on
function levelIndicator() {
  if (questionCounter < 4) {
    level.textContent = 'Question ' + questionCounter + ' - Level EASY';
    divLevelIndicatorEl.appendChild(level);
  } else if (questionCounter > 3 && questionCounter < 7) {
    level.textContent = 'Question ' + questionCounter + ' - Level MEDIUM';
    level.setAttribute('id', 'medium-difficulty');
    divLevelIndicatorEl.appendChild(level);
  } else {
    level.textContent = 'Question ' + questionCounter + ' - Level HARD';
    level.setAttribute('id', 'hard-difficulty');
    divLevelIndicatorEl.appendChild(level);
  }
}

function removeLevelIndicator(){
  level.remove;
}

function resetCurrentUserTopScore(){
  if(User.currentUser['score'] > User.currentUser['topScore']) {
    User.currentUser['topScore'] = User.currentUser['score'];
  }
}

function updateCUToAllUser(){
  User.allUsers = JSON.parse(localStorage.getItem('allUsers'));
  for(var x = 0; x < User.allUsers.length; x++) {
    if(User.allUsers[x].username === User.currentUser['name']) {
      User.allUsers[x].topScore = User.currentUser['topScore'];
      localStorage.setItem('allUsers', JSON.stringify(User.allUsers));
    }
  }
}

function dispalyLogoutBtn(){
  var logOutBtn = document.createElement('button');
  logOutBtn.innerHTML = 'Logout';
  divLogOutEl.appendChild(logOutBtn);
  logOutBtn.addEventListener('click', logOutHandler);
  logOutBtn.className = 'log-out';
}

function logOutHandler(e){
  e.preventDefault();
  //remove logout button
  divLogOutEl.innerHTML = '';
  //remove currentUser from localStorage
  localStorage.removeItem('currentUser');
  resetCurrentUserTopScore();
  updatingCurrentUserAllUserObject();

  //back to index.page
  window.location.href = 'index.html';
}

function returnUser() {
  //if currentUser exists in localStorage
  if (User.currentUser['name'].length > 0) {
    //don't display login form
    //instead display welcome back message
    dispalyLogoutBtn();
  }
}

function updatingCurrentUserAllUserObject(){
  for (var i in User.allUsers) {
    if (User.allUsers[i].name === User.currentUser['name']) {
      User.allUsers[i].topScore = User.currentUser['topScore'];
    }
  }
}

// calling the main game function on page load
gameQuestions();