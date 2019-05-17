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
//GAMES
new Question('The map featured in Arma 3 named \'Altis\' is based off of what Greek island?', 'Lemnos', [ 'Lemnos', 'Ithaca', 'Naxos', 'Anafi'], 3);
new Question('Which of the following commercial vehicles from Grand Theft Auto IV did NOT reappear in Grand Theft Auto V?', 'Steed', [ 'Steed', 'Pony', 'Benson', 'Mule'], 3);
new Question('Who is the main character of \'Metal Gear Solid 3\'?', 'Naked Snake', [ 'Naked Snake', 'Solid Snake', 'Liquid Snake', 'Venom Snake'], 2);
new Question('In what year was \'Metal Gear Solid\' released in North America?', '1998', [ '1998', '1987', '2001', '2004'], 1);
new Question('Who voices Max Payne in the 2001 game \'Max Payne\'?', 'James McCaffrey', [ 'James McCaffrey', 'Sam Lake', 'Hideo Kojima', 'Troy Baker'], 2);
new Question('Which of the following is not a playable race in the MMORPG Guild Wars 2? ', 'Tengu', [ 'Tengu', 'Sylvari', 'Asura ', 'Charr'], 2);
new Question('What is the first weapon you acquire in Half-Life?', 'A crowbar', [ 'A crowbar', 'Your fists', 'A pistol', 'The H.E.V suit'], 1);
new Question('Which of these is NOT the name of a team leader in Pokémon GO?', 'Leif', [ 'Leif', 'Blanche', 'Spark', 'Candela'], 2);
new Question('Which of these characters was NOT planned to be playable for Super Smash Bros. 64?', 'Peach', [ 'Peach', 'King Dedede', 'Mewtwo', 'Bowser'], 2);
new Question('What is not a default game mode in Counter-Strike (2000)?', 'Arms Race', [ 'Arms Race', 'Bomb Defusal', 'Assassination', 'Hostage Rescue'], 2);
new Question('What is the name of the world that the MMO \'RuneScape\' takes place in?', 'Gielinor', [ 'Gielinor', 'Glindor', 'Zaros', 'Azeroth'], 1);
new Question('How many voice channels does the Nintendo Entertainment System support natively?', '5', [ '5', '4', '6', '3'], 3);
new Question('What is the real name of the Scout in \'Team Fortress 2\'?', 'Jeremy', [ 'Jeremy', 'John', 'Lance', 'Walter'], 2);
new Question('Aperture Science CEO Cave Johnson is voiced by which American actor?', 'J.K. Simmons', [ 'J.K. Simmons', 'Nolan North', 'John Patrick Lowrie', 'Christopher Lloyd'], 1);
new Question('Which game is NOT part of the Science Adventure series by 5pb. and Nitroplus?', 'Occultic; Nine', [ 'Occultic; Nine', 'Steins; Gate', 'Robotics; Notes', 'Chaos; Child'], 2);
new Question('What programming language was used to create the game \'Minecraft\'?', 'Java', [ 'Java', 'Python', 'C++', 'HTML 5'], 3);
new Question('How many unique items does \'Borderlands 2\' claim to have?', '87 Bazillion ', [ '87 Bazillion ', '87 Trillion', '87 Million', '87 Gazillion '], 2);
new Question('Which artist composed the original soundtrack for \'Watch Dogs 2\'?', 'Hudson Mohawke', [ 'Hudson Mohawke', 'Flying Lotus', 'Rustie', 'Machinedrum'], 3);
new Question('Who is the main character in the video game \'Just Cause 3\'?', 'Rico Rodriguez', [ 'Rico Rodriguez', 'Marcus Holloway', 'Tom Sheldon', 'Mario Frigo'], 2);
new Question('On which planet does the game Freedom Planet (2014) take place?', 'Avalice', [ 'Avalice', 'Galaxytrail', 'Shang Mu', 'Freedom'], 2);
new Question('What is the subtitle for Gran Turismo 3?', 'A-Spec', [ 'A-Spec', 'Championship', 'Drive', 'Nitro'], 2);
new Question('What is Pikachu\'s National PokéDex Number?', '#025', [ '#025', '#001', '#109', '#031'], 1);
new Question('Which franchise does the creature \'Slowpoke\' originate from?', 'Pokemon', [ 'Pokemon', 'Sonic The Hedgehog', 'Dragon Ball', 'Yugioh'], 1);
new Question('How many times do you fight Gilgamesh in \'Final Fantasy 5\'?', '6', [ '6', '4', '3', '5'], 1);
new Question('Who is the main character of \'Metal Gear Solid 3\'?', 'Naked Snake', [ 'Naked Snake', 'Venom Snake', 'Liquid Snake', 'Solid Snake'], 2);
new Question('Who voices Max Payne in the 2001 game \'Max Payne\'?', 'James McCaffrey', [ 'James McCaffrey', 'Sam Lake', 'Troy Baker', 'Hideo Kojima'], 2);
new Question('Which of these Starbound races has a Wild West culture?', 'Novakid', [ 'Novakid', 'Avian', 'Human', 'Hylotl'], 1);
new Question('What company created and developed the game \'Overwatch\'?', 'Blizzard Entertainment', [ 'Blizzard Entertainment', 'Hi-Rez Studios', 'Valve', 'Gearbox Software'], 1);
new Question('Who is the leader of Team Instinct in Pokémon Go?', 'Spark', [ 'Spark', 'Blanche', 'Willow', 'Candela'], 1);
new Question('How many normal endings are there in Cry Of Fear\'s campaign mode?', '4', [ '4', '5', '3', '6'], 2);
new Question('In what year was Hearthstone released?', '2014', [ '2014', '2013', '2012', '2011'], 1);
new Question('Which Game Development company made No Man\'s Sky?', 'Hello Games', [ 'Hello Games', 'Dovetail Games', 'Valve', 'Blizzard Entertainment'], 2);
new Question('Which of the following characters is NOT a female marriage candidate in the game Stardew Valley?', 'Caroline', [ 'Caroline', 'Haley', 'Abigail', 'Leah'], 1);
new Question('Which water-type Pokémon starter was introduced in the 4th generation of the series?', 'Piplup', [ 'Piplup', 'Oshawott', 'Totodile', 'Mudkip'], 1);
new Question('Which Overwatch character says the line \'Heroes never die!\'?', 'Mercy', [ 'Mercy', 'Reaper', 'Ana', 'Sonic'], 2);
new Question('Which of these Pokémon cannot learn Surf?', 'Arbok', [ 'Arbok', 'Nidoking', 'Tauros', 'Linoone'], 3);
new Question('In what year was \'Super Mario Sunshine\' released?', '2002', [ '2002', '2003', '2000', '2004'], 2);
new Question('Which operation in \'Tom Clancy\'s Rainbow Six Siege\' introduced the \'Skyscraper\' map?', 'Red Crow', [ 'Red Crow', 'Dust Line', 'Skull Rain', 'Velvet Shell'], 2);
new Question('What was the first weapon pack for \'PAYDAY 2\'?', 'The Gage Weapon Pack #1', [ 'The Gage Weapon Pack #1', 'The Overkill Pack', 'The Gage Chivalry Pack', 'The Gage Historical Pack'], 2);
new Question('What household item make the characters of \'Steins; Gate\' travel through time?', 'Microwave', [ 'Microwave', 'Computer', 'Refrigerator', 'Televison'], 1);
new Question('In which location does Dark Sun Gwyndolin reside in \'Dark Souls\'?', 'Anor Londo', [ 'Anor Londo', 'Blighttown', 'Kiln of the first flame', 'Firelink Shrine'], 2);
new Question('What animal is featured in \'Bloons TD Battles\'?', 'Monkeys', [ 'Monkeys', 'Alligators', 'Pigeons', 'Lizards'], 2);
new Question('How many controllers could a Nintendo GameCube have plugged in at one time?', '4', [ '4', '2', '6', '8'], 2);
new Question('Which of the following created and directed the Katamari Damacy series?', 'Keita Takahashi', [ 'Keita Takahashi', 'Shinji Mikami', 'Hideki Kamiya', 'Shu Takumi'], 2);
new Question('How many Chaos Emeralds can you collect in the first Sonic The Hedgehog?', 'Six', [ 'Six', 'Five', 'Eight', 'Seven'], 2);
new Question('What is the main character of Metal Gear Solid 2?', 'Raiden', [ 'Raiden', 'Big Boss', 'Venom Snake', 'Solidus Snake'], 2);
new Question('Which of these is NOT a player class in Team Fortress 2?', 'Healer', [ 'Healer', 'Pyro', 'Demoman', 'Spy'], 1);
new Question('What is the main ship used by Commander Shepard in the Mass Effect Franchise called?', 'Normandy', [ 'Normandy', 'Osiris', 'Endeavour', 'Infinity'], 1);
new Question('What is the world\'s first video game console?', 'Magnavox Odyssey', [ 'Magnavox Odyssey', 'Atari 2600', 'Coleco Telstar', 'Nintendo Color TV Game'], 2);
new Question('Which of these characters in \'Undertale\' can the player NOT go on a date with?', 'Toriel', [ 'Toriel', 'Alphys', 'Undyne', 'Papyrus'], 3);
new Question('Who was the first female protagonist in a video game?', 'Samus Aran', [ 'Samus Aran', 'Chell', 'Alis Landale', 'Lara Croft'], 2);
new Question('Which of these is NOT a playable character in the 2016 video game Overwatch?', 'Invoker', [ 'Invoker', 'Mercy', 'Winston', 'Zenyatta'], 1);
new Question('What was the name of the hero in the 80s animated video game \'Dragon\'s Lair\'?', 'Dirk the Daring', [ 'Dirk the Daring', 'Sir Toby Belch', 'Guy of Gisbourne', 'Arthur'], 3);
new Question('Which game did NOT get financed via Crowdfunding?', 'Enter the Gungeon', [ 'Enter the Gungeon', 'Undertale', 'Tower Unite', 'Town of Salem'], 1);
new Question('Who is the main character in \'The Stanley Parable\'?', 'Stanley', [ 'Stanley', 'The Narrator', 'The Boss', 'The Adventure Line'], 1);
new Question('What was the name of the Secret Organization in the Hotline Miami series? ', '50 Blessings', [ '50 Blessings', 'American Blessings', '50 Saints', 'USSR\'s Blessings'], 2);
new Question('What is Gabe Newell\'s favorite class in Team Fortress 2?', 'Spy', [ 'Spy', 'Medic', 'Heavy', 'Pyro'], 1);
new Question('Who is the founder of Team Fortress 2\'s fictional company \'Mann Co\'?', 'Zepheniah Mann', [ 'Zepheniah Mann', 'Cave Johnson', 'Saxton Hale', 'Wallace Breem'], 1);
new Question('What year was the game \'Overwatch\' revealed?', '2014', [ '2014', '2008', '2015', '2011'], 1);
new Question('How many flagship monsters appear in Monster Hunter Gernerations?', '4', [ '4', '2', '1', '3'], 1);
new Question('Which of these weapon classes DO NOT appear in the first Monster Hunter game?', 'Bow ', [ 'Bow ', 'Heavy Bowgun', 'Hammer', 'Light Bowgun'], 3);
new Question('What is the homeworld of the Elites from Halo?', 'Sanghelios', [ 'Sanghelios', 'Te', 'Eayn', 'Doisac'], 1);
new Question('In what year was Garry\'s Mod released as a standalone title on Valve\'s Steam distribution service?', '2006', [ '2006', '2003', '2007', '2004'], 1);
new Question('What was the name of the first MMORPG to popularize the genre?', 'Ultima Online', [ 'Ultima Online', 'World of Warcraft', 'Meridian 59', 'Guild Wars'], 2);
new Question('What is the name of the largest planet in Kerbal Space Program?', 'Jool', [ 'Jool', 'Eeloo', 'Minmus', 'Kerbol'], 1);
new Question('When was the game \'Roblox\' released?', '2006', [ '2006', '2002', '2003', '2007'], 2);
new Question('What is the browser game Kantai Collection heavily inspired by?', 'Second World War', [ 'Second World War', 'An Anime', 'World of Warcraft', 'Manga'], 2);
new Question('Who is the creator of Touhou project?', 'Zun', [ 'Zun', 'Tasofro', 'Jun', 'Twilight Frontier'], 1);
new Question('In which mall does \'Dead Rising\' take place?', 'Willamette Parkview Mall', [ 'Willamette Parkview Mall', 'Central Square Shopping Center', 'Liberty Mall', 'Twin Pines Mall'], 1);
new Question('In which game did the Konami Code make its first appearance?', 'Gradius', [ 'Gradius', 'Dance Dance Revolution', 'Contra', 'Castlevania'], 2);
new Question('What Pokémon\'s Base Stat Total does not change when it evolves?', 'Scyther', [ 'Scyther', 'Larvesta', 'Sneasel', 'Pikachu'], 3);


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