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
//COMPUTER
new Question('What does GHz stand for?', 'Gigahertz', [ 'Gigahertz', 'Gigahatz', 'Gigahotz', 'Gigahetz'], 1);
new Question('When was the programming language \'C#\' released?', '2000', [ '2000', '2001', '1998', '1999'], 2);
new Question('The programming language \'Swift\' was created to replace what other programming language?', 'Objective-C', [ 'Objective-C', 'Ruby', 'C++', 'C#'], 1);
new Question('Which of the following languages is used as a scripting language in the Unity 3D game engine?', 'C#', [ 'C#', 'Java', 'Objective-C', 'C++'], 2);
new Question('If you were to code software in this language you\'d only be able to type 0\'s and 1\'s.', 'Binary', [ 'Binary', 'Python', 'C++', 'JavaScript'], 1);
new Question('What was the first commerically available computer processor?', 'Intel 4004', [ 'Intel 4004', 'AMD AM386', 'Intel 486SX', 'TMS 1000'], 2);
new Question('In the server hosting industry IaaS stands for...', 'Infrastructure as a Service', [ 'Infrastructure as a Service', 'Internet and a Server', 'Internet as a Service', 'Infrastructure as a Server'], 2);
new Question('What port does HTTP run on?', '80', [ '80', '53', '23', '443'], 3);
new Question('Which computer language would you associate Django framework with?', 'Python', [ 'Python', 'C++', 'C#', 'Java'], 1);
new Question('What does \'LCD\' stand for?', 'Liquid Crystal Display', [ 'Liquid Crystal Display', 'Long Continuous Design', 'Language Control Design', 'Last Common Difference'], 2);
new Question('Who is the original author of the realtime physics engine called PhysX?', 'NovodeX', [ 'NovodeX', 'Nvidia', 'Ageia', 'AMD'], 3);
new Question('Which of the following is a personal computer made by the Japanese company Fujitsu?', 'FM-7', [ 'FM-7', 'MSX', 'Xmillennium ', 'PC-9801'], 2);
new Question('.at is the top-level domain for what country?', 'Austria', [ 'Austria', 'Australia', 'Angola', 'Argentina'], 2);
new Question('Which data structure does FILO apply to?', 'Stack', [ 'Stack', 'Queue', 'Heap', 'Tree'], 3);
new Question('What is the main CPU is the Sega Mega Drive / Sega Genesis?', 'Motorola 68000', [ 'Motorola 68000', 'Intel 8088', 'Yamaha YM2612', 'Zilog Z80'], 2);
new Question('What was the first Android version specifically optimized for tablets?', 'Honeycomb', [ 'Honeycomb', 'Eclair', 'Marshmellow', 'Froyo'], 2);
new Question('When did the online streaming service \'Mixer\' launch?', '2016', [ '2016', '2011', '2009', '2013'], 2);
new Question('What was the first company to use the term \'Golden Master\'?', 'Apple', [ 'Apple', 'Microsoft', 'Google', 'IBM'], 3);
new Question('How many values can a single byte represent?', '256', [ '256', '8', '1024', '1'], 1);
new Question('Which programming language was developed by Sun Microsystems in 1995?', 'Java', [ 'Java', 'Solaris OS', 'C++', 'Python'], 2);
new Question('The name of technology company HP stands for what?', 'Hewlett-Packard', [ 'Hewlett-Packard', 'Hellman-Pohl', 'Husker-Pollosk', 'Howard Packmann'], 2);
new Question('Which internet company began life as an online bookstore called \'Cadabra\'?', 'Amazon', [ 'Amazon', 'Overstock', 'eBay', 'Shopify'], 2);
new Question('What does the \'MP\' stand for in MP3?', 'Moving Picture', [ 'Moving Picture', 'Music Player', 'Multi Pass', 'Micro Point'], 1);
new Question('What was the name of the security vulnerability found in Bash in 2014?', 'Shellshock', [ 'Shellshock', 'Heartbleed', 'Bashbug', 'Stagefright'], 3);
new Question('What amount of bits commonly equals one byte?', '8', [ '8', '1', '64', '2'], 1);
new Question('On which computer hardware device is the BIOS chip located?', 'Motherboard', [ 'Motherboard', 'Graphics Processing Unit', 'Central Processing Unit', 'Hard Disk Drive'], 2);
new Question('Which of the following languages is used as a scripting language in the Unity 3D game engine?', 'C#', [ 'C#', 'C++', 'Java', 'Objective-C'], 2);
new Question('Nvidia\'s headquarters are based in which Silicon Valley city?', 'Santa Clara', [ 'Santa Clara', 'Palo Alto', 'Cupertino', 'Mountain View'], 2);
new Question('What is the most preferred image format used for logos in the Wikimedia database?', '.svg', [ '.svg', '.png', '.gif', '.jpeg'], 1);
new Question('What did the name of the Tor Anonymity Network orignially stand for?', 'The Onion Router', [ 'The Onion Router', 'The Orange Router', 'The Only Router', 'The Ominous Router'], 2);
new Question('What was the name given to Android 4.3?', 'Jelly Bean', [ 'Jelly Bean', 'Froyo', 'Nutella', 'Lollipop'], 2);
new Question('The internet domain .fm is the country-code top-level domain for which Pacific Ocean island nation?', 'Micronesia', [ 'Micronesia', 'Marshall Islands', 'Fiji', 'Tuvalu'], 3);
new Question('In the server hosting industry IaaS stands for...', 'Infrastructure as a Service', [ 'Infrastructure as a Service', 'Infrastructure as a Server', 'Internet and a Server', 'Internet as a Service'], 2);
new Question('Which of these names was an actual codename for a cancelled Microsoft project?', 'Neptune', [ 'Neptune', 'Enceladus', 'Saturn', 'Pollux'], 3);
new Question('What is the name of the default theme that is installed with Windows XP?', 'Luna', [ 'Luna', 'Whistler', 'Bliss', 'Neptune'], 2);
new Question('Who is the original author of the realtime physics engine called PhysX?', 'NovodeX', [ 'NovodeX', 'Ageia', 'AMD', 'Nvidia'], 3);
new Question('Which operating system was released first?', 'Mac OS', [ 'Mac OS', 'Linux', 'Windows', 'OS/2'], 2);
new Question('What is known as \'the brain\' of the Computer?', 'Central Processing Unit', [ 'Central Processing Unit', 'Motherboard', 'Graphics Processing Unit', 'Keyboard'], 2);
new Question('What does the term GPU stand for?', 'Graphics Processing Unit', [ 'Graphics Processing Unit', 'Graphical Proprietary Unit', 'Graphite Producing Unit', 'Gaming Processor Unit'], 2);
new Question('What does the International System of Quantities refer 1024 bytes as?', 'Kibibyte', [ 'Kibibyte', 'Kylobyte', 'Kelobyte', 'Kilobyte'], 3);
new Question('When did the online streaming service \'Mixer\' launch?', '2016', [ '2016', '2011', '2013', '2009'], 2);
new Question('Laserjet and inkjet printers are both examples of what type of printer?', 'Non-impact printer', [ 'Non-impact printer', 'Daisywheel printer', 'Dot matrix printer', 'Impact printer'], 2);
new Question('The name of technology company HP stands for what?', 'Hewlett-Packard', [ 'Hewlett-Packard', 'Howard Packmann', 'Hellman-Pohl', 'Husker-Pollosk'], 2);
new Question('What is the name given to layer 4 of the Open Systems Interconnection (ISO) model?', 'Transport', [ 'Transport', 'Data link', 'Network', 'Session'], 3);
new Question('The Harvard architecture for micro-controllers added which additional bus?', 'Instruction', [ 'Instruction', 'Address', 'Control', 'Data'], 3);
new Question('What does the \'MP\' stand for in MP3?', 'Moving Picture', [ 'Moving Picture', 'Multi Pass', 'Music Player', 'Micro Point'], 1);
new Question('What was the name of the security vulnerability found in Bash in 2014?', 'Shellshock', [ 'Shellshock', 'Stagefright', 'Heartbleed', 'Bashbug'], 3);
new Question('The programming language \'Swift\' was created to replace what other programming language?', 'Objective-C', [ 'Objective-C', 'C++', 'C#', 'Ruby'], 1);
new Question('What five letter word is the motto of the IBM Computer company?', 'Think', [ 'Think', 'Logic', 'Click', 'Pixel'], 2);
new Question('What amount of bits commonly equals one byte?', '8', [ '8', '1', '2', '64'], 1);
new Question('How many Hz does the video standard PAL support?', '50', [ '50', '60', '59', '25'], 3);
new Question('If you were to code software in this language you\'d only be able to type 0\'s and 1\'s.', 'Binary', [ 'Binary', 'C++', 'Python', 'JavaScript'], 1);
new Question('What did the name of the Tor Anonymity Network orignially stand for?', 'The Onion Router', [ 'The Onion Router', 'The Ominous Router', 'The Orange Router', 'The Only Router'], 2);
new Question('What was the first commerically available computer processor?', 'Intel 4004', [ 'Intel 4004', 'Intel 486SX', 'AMD AM386', 'TMS 1000'], 2);
new Question('What port does HTTP run on?', '80', [ '80', '53', '443', '23'], 3);
new Question('Which computer language would you associate Django framework with?', 'Python', [ 'Python', 'C#', 'C++', 'Java'], 1);
new Question('What does \'LCD\' stand for?', 'Liquid Crystal Display', [ 'Liquid Crystal Display', 'Last Common Difference', 'Long Continuous Design', 'Language Control Design'], 2);
new Question('Which operating system was released first?', 'Mac OS', [ 'Mac OS', 'OS/2', 'Windows', 'Linux'], 2);
new Question('.rs is the top-level domain for what country?', 'Serbia', [ 'Serbia', 'Russia', 'Rwanda', 'Romania'], 2);
new Question('.at is the top-level domain for what country?', 'Austria', [ 'Austria', 'Angola', 'Australia', 'Argentina'], 2);
new Question('What is known as \'the brain\' of the Computer?', 'Central Processing Unit', [ 'Central Processing Unit', 'Graphics Processing Unit', 'Keyboard', 'Motherboard'], 2);
new Question('What internet protocol was documented in RFC 1459?', 'IRC', [ 'IRC', 'FTP', 'HTTPS', 'HTTP'], 3);
new Question('This mobile OS held the largest market share in 2012.', 'iOS', [ 'iOS', 'Symbian', 'BlackBerry', 'Android'], 1);
new Question('Which of these people was NOT a founder of Apple Inc?', 'Jonathan Ive', [ 'Jonathan Ive', 'Steve Wozniak', 'Ronald Wayne', 'Steve Jobs'], 2);
new Question('Which RAID array type is associated with data mirroring?', 'RAID 1', [ 'RAID 1', 'RAID 10', 'RAID 0', 'RAID 5'], 3);
new Question('Laserjet and inkjet printers are both examples of what type of printer?', 'Non-impact printer', [ 'Non-impact printer', 'Dot matrix printer', 'Impact printer', 'Daisywheel printer'], 2);
new Question('What was the first company to use the term \'Golden Master\'?', 'Apple', [ 'Apple', 'Google', 'Microsoft', 'IBM'], 3);
new Question('How many values can a single byte represent?', '256', [ '256', '1024', '8', '1'], 1);



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