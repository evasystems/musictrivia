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
//music
new Question('Brian May was the guitarist for which band?', 'Queen', [ 'Queen', 'Pink Floyd', 'The Doors', 'Rolling Stones'], 1);
new Question('Electronic artists Boys Noize and Skrillex have collaborated and released tracks under what name?', 'Dog Blood', [ 'Dog Blood', 'Jack Ü', 'Noisia', 'What So Not'], 3);
new Question('Ellie Goulding\'s earliest album was named?', 'Lights', [ 'Lights', 'Halcyon Days', 'Bright Lights', 'Halcyon'], 2);
new Question('From which country did the song \'Gangnam Style\' originate from?', 'South Korea', [ 'South Korea', 'China', 'Japan', 'North Korea'], 1);
new Question('How many members are there in the band Nirvana?', 'Three', [ 'Three', 'Two', 'Five', 'Four'], 1);
new Question('How many studio albums have the duo Daft Punk released?', '4', [ '4', '5', '2', '1'], 1);
new Question('In what film was the Michael Jackson song \'Will You Be There\' featured?', 'Free Willy', [ 'Free Willy', 'Bad Boys', 'Men in Black', 'Sleepless in Seattle'], 2);
new Question('In which city did American rap producer DJ Khaled originate from?', 'Miami', [ 'Miami', 'New York', 'Atlanta', 'Detroit'], 2);
new Question('In which year did \'Caravan Palace\' release their first album?', '2008', [ '2008', '2004', '2015', '2000'], 2);
new Question('In which year was the Megadeth album \'Peace Sells... but Who\'s Buying?\' released?', '1986', [ '1986', '1987', '1979', '1983'], 2);
new Question('Pete Townshend collaborated with which famous guitarist for an event at Brixton Academy in 1985?', 'David Gilmour', [ 'David Gilmour', 'Jimmy Page', 'Mark Knopfler', 'Eric Clapton'], 3);
new Question('Ringo Starr of The Beatles mainly played what instrument?', 'Drums', [ 'Drums', 'Guitar', 'Piano', 'Bass'], 1);
new Question('The 2016 song \'Starboy\' by Canadian singer The Weeknd features which prominent electronic artist?', 'Daft Punk', [ 'Daft Punk', 'DJ Shadow', 'Disclosure', 'deadmau5'], 1);
new Question('The \'K\' in \'K-Pop\' stands for which word?', 'Korean', [ 'Korean', 'Kazakhstan', 'Kenyan', 'Kuwaiti'], 1);
new Question('The heavy metal band Black Sabbath hail from which English city?', 'Birmingham', [ 'Birmingham', 'London', 'Manchester', 'Newcastle-Upon-Tyne'], 3);
new Question('The key of sharps does the key of G# minor contain?', '5', [ '5', '0', '7', '3'], 3);
new Question('The song \'Twin Size Mattress\' was written by which band?', 'The Front Bottoms', [ 'The Front Bottoms', 'Twenty One Pilots', 'The Wonder Years', 'The Smith Street Band'], 2);
new Question('What French artist/band is known for playing on the midi instrument \'Launchpad\'?', 'Madeon', [ 'Madeon', 'David Guetta', 'Daft Punk ', 'Disclosure'], 2);
new Question('What album did The Lumineers release in 2016?', 'Cleopatra', [ 'Cleopatra', 'Tracks From The Attic', 'Winter', 'The Lumineers'], 1);
new Question('What is not a wind instrument?', 'Viola', [ 'Viola', 'Oboe', 'Trombone', 'Duduk'], 1);
new Question('What is rapper Drake\'s real name?', 'Aubrey Graham', [ 'Aubrey Graham', 'Shaun Carter', 'Dwayne Carter', 'Andre Young'], 2);
new Question('What is the British term for a 64th note?', 'Hemidemisemiquaver', [ 'Hemidemisemiquaver', 'Semihemidemisemiquaver', 'Semiquaver', 'Demisemiquaver'], 3);
new Question('What is the name of Finnish DJ Darude\'s hit single released in October 1999?', 'Sandstorm', [ 'Sandstorm', 'Dust Devil', 'Sirocco', 'Khamsin'], 1);
new Question('What is the name of French electronic music producer Madeon\'s 2015 debut studio album?', 'Adventure', [ 'Adventure', 'The City', 'Pop Culture', 'Icarus'], 2);
new Question('What is the name of the 2016 mixtape released by Venezuelan electronic producer Arca?', 'Entrañas', [ 'Entrañas', 'Xen', 'Sheep', '&&&&&&'], 3);
new Question('What is the name of the album released in 2014 by American band Maroon 5?', 'V', [ 'V', 'IV', 'X', 'III'], 1);
new Question('What is the name of the main character from the music video of \'Shelter\' by Porter Robinson and A-1 Studios?', 'Rin', [ 'Rin', 'Rem', 'Ren', 'Ram'], 2);
new Question('What is the name of the song by Beyoncé and Alejandro Fernández released in 2007?', 'Amor Gitano', [ 'Amor Gitano', 'La ultima vez', 'Rocket', 'Hasta Dondes Estes'], 3);
new Question('What is the real name of Canadian electronic music producer deadmau5?', 'Joel Zimmerman', [ 'Joel Zimmerman', 'Sonny Moore', 'Thomas Wesley Pentz', 'Adam Richard Wiles'], 2);
new Question('What was Daft Punk\'s first studio album?', 'Homework', [ 'Homework', 'Random Access Memories', 'Human After All', 'Discovery'], 1);
new Question('What was David Bowie\'s real surname?', 'Jones', [ 'Jones', 'Johnson', 'Carter', 'Edwards'], 2);
new Question('What was Rage Against the Machine\'s debut album?', 'Rage Against the Machine', [ 'Rage Against the Machine', 'Bombtrack', 'Evil Empire', 'The Battle Of Los Angeles'], 1);
new Question('What was the name of Pink Floyd\'s first studio album?', 'The Piper at the Gates of Dawn', [ 'The Piper at the Gates of Dawn', 'More', 'Atom Heart Mother', 'Ummagumma'], 2);
new Question('What was the title of ABBA`s first UK hit single?', 'Waterloo', [ 'Waterloo', 'Fernando', 'Mamma Mia', 'Dancing Queen'], 2);
new Question('What year was Min Yoongi from South Korea boy band \'BTS\' born in?', '1993', [ '1993', '1994', '1995', '1992'], 3);
new Question('What\'s the most common time signature for rock songs?', '4/4', [ '4/4', '2/4', '8/12', '1/2'], 2);
new Question('When did Tame Impala release their second album?', '2012', [ '2012', '2010', '2015', '1967'], 2);
new Question('When did The Beatles release the LP \'Please Please Me\'?', '1963', [ '1963', '1969', '1970', '1960'], 2);
new Question('When was Gangnam Style uploaded to YouTube?', '2012', [ '2012', '2014', '2011', '2013'], 1);
new Question('Where did the British Boy Band \'Bros\' come from?', 'Camberley', [ 'Camberley', 'Aldershot', 'Bagshot', 'Guildford'], 2);
new Question('Where does the Mac part of the name Fleetwood Mac come from?', 'John McVie', [ 'John McVie', 'David Tennant', 'Christine McVie', 'Mac McAnally'], 1);
new Question('Which American family band had a 1986 top 10 hit with the song \'Crush On You\'?', 'The Jets', [ 'The Jets', 'The Cover Girls', 'The Jacksons', 'DeBarge'], 2);
new Question('Which Beatle led the way across the zebra crossing on the Abbey Road album cover?', 'John', [ 'John', 'Paul', 'Ringo', 'George'], 2);
new Question('Which Canadian reggae musician had a 1993 hit with the song \'Informer\'?', 'Snow', [ 'Snow', 'Rain', 'Hail', 'Sleet'], 1);
new Question('Which Disney character sings the song \'A Dream is a Wish Your Heart Makes\'?', 'Cinderella', [ 'Cinderella', 'Belle', 'Pocahontas', 'Snow White'], 1);
new Question('Which Elton John hit starts with the line \'When are you gonna come down\'?', 'Goodbye Yellow Brick Road', [ 'Goodbye Yellow Brick Road', 'Bennie and the Jets', 'Rocket Man', 'Crocodile Rock'], 3);
new Question('Which Nirvana album had a naked baby on the cover?', 'Nevermind', [ 'Nevermind', 'Incesticide', 'Bleach', 'In Utero'], 1);
new Question('Which Queen song was covered by Brittany Murphy in the 2006 film \'Happy Feet\'?', 'Somebody to Love', [ 'Somebody to Love', 'Under Pressure', 'Bohemian Rhapsody', 'Flash'], 2);
new Question('Which album was released by Kanye West in 2013?', 'Yeezus', [ 'Yeezus', 'Watch the Throne', 'My Beautiful Dark Twisted Fantasy', 'The Life of Pablo'], 3);
new Question('Which artist collaborated with American DJ Dillon Francis to release the song 2016 \'Need You\'?', 'NGHTMRE', [ 'NGHTMRE', 'LOUDPVCK', 'DVBBS', 'KRNE'], 2);
new Question('Which band is the longest active band in the world with no breaks or line-up changes?', 'U2', [ 'U2', 'Rush', 'Rolling Stones', 'Radiohead'], 3);
new Question('Which band recorded the album \'Parallel Lines\'?', 'Blondie', [ 'Blondie', 'Coldplay', 'The Police', 'Paramore'], 1);
new Question('Which band released the album \'Sonic Highways\' in 2014?', 'Foo Fighters', [ 'Foo Fighters', 'Coldplay', 'The Flaming Lips', 'Nickelback'], 2);
new Question('Which brass instrument has the lowest pitch in an orchestra?', 'Tuba', [ 'Tuba', 'Saxophone', 'Trombone', 'Trumpet'], 1);
new Question('Which classical composer wrote the \'Moonlight Sonata\'?', 'Ludvig Van Beethoven', [ 'Ludvig Van Beethoven', 'Chief Keef', 'Wolfgang Amadeus Mozart', 'Johannes Brahms'], 1);
new Question('Which country does the electronic music duo \'The Knife\' originate from?', 'Sweden', [ 'Sweden', 'Finland', 'Norway', 'Denmark'], 2);
new Question('Which country does the power metal band \'Sabaton\' originate from?', 'Sweden', [ 'Sweden', 'United States', 'Finland', 'Germany'], 2);
new Question('Which country is singer Kyary Pamyu Pamyu from?', 'Japan', [ 'Japan', 'South Korea', 'Vietnam', 'China'], 2);
new Question('Which member of \'The Beatles\' narrated episodes of \'Thomas the Tank Engine\'?', 'Ringo Starr', [ 'Ringo Starr', 'George Harrison', 'Paul McCartney', 'John Lennon'], 2);
new Question('Which member of the English band \'The xx\' released their solo album \'In Colour\' in 2015?', 'Jamie xx', [ 'Jamie xx', 'Oliver Sim', 'Baria Qureshi', 'Romy Madley Croft'], 3);
new Question('Which member of the Foo Fighters was previously the drummer for Nirvana?', 'Dave Grohl', [ 'Dave Grohl', 'Nate Mendel', 'Taylor Hawkins', 'Chris Shiflett'], 1);
new Question('Which of the following is NOT a real song from the band Thousand Foot Krutch?', 'Limitless Fury', [ 'Limitless Fury', 'Down', 'Let The Sparks Fly', 'Give Up The Ghost'], 3);
new Question('Which of these artists do NOT originate from France?', 'The Chemical Brothers', [ 'The Chemical Brothers', 'Air', 'Daft Punk', 'Justice'], 2);
new Question('Which of these artists has NOT been a member of dancehall group Major Lazer?', 'Skrillex', [ 'Skrillex', 'Jillionaire', 'Diplo', 'Walshy Fire'], 2);
new Question('Which of these bands is the oldest?', 'Pink Floyd', [ 'Pink Floyd', 'Red Hot Chili Peppers', 'AC/DC', 'Metallica'], 2);
new Question('Which of these is NOT a song by Pegboard Nerds?', 'WiFi Tears', [ 'WiFi Tears', 'Swamp Thing', 'Emoji', 'BAMF'], 2);
new Question('Which of these is NOT an album released by The Beatles?', 'The Wall', [ 'The Wall', 'Magical Mystery Tour', 'Abbey Road', 'Revolver'], 2);
new Question('Which of these is not an Ed Sheeran album?', '-', [ '-', '÷', '+', 'X'], 2);
new Question('Which of these is the name of a song by Tears for Fears?', 'Shout', [ 'Shout', 'Yell', 'Scream', 'Shriek'], 1);
new Question('Which of these languages was NOT included in the 2016 song \'Don\'t Mind\' by Kent Jones?', 'Portuguese', [ 'Portuguese', 'Japanese', 'Spanish', 'French'], 2);
new Question('Which of these songs is not by Tatsuro Yamashita?', 'Lucky Lady Feel So Good ', [ 'Lucky Lady Feel So Good ', 'Let\'s Dance Baby', 'Merry-Go Round', 'Love Talkin'], 3);
new Question('Which one of these Pink Floyd albums were also a movie?', 'The Wall', [ 'The Wall', 'Animals', 'The Dark Side of the Moon', 'Wish You Were Here'], 2);
new Question('Which one of these Rammstein songs has two official music videos?', 'Du Riechst So Gut', [ 'Du Riechst So Gut', 'Mein Teil', 'Benzin', 'Du Hast'], 2);
new Question('Which popular rock band has a one-armed drummer?', 'Def Leppard', [ 'Def Leppard', 'Lynyrd Skynyrd', 'Foreigner', 'The Beatles'], 2);
new Question('Which rap group released the album \'Straight Outta Compton\'?', 'N.W.A', [ 'N.W.A', 'Run-D.M.C.', 'Beastie Boys', 'Wu-Tang Clan'], 1);
new Question('Which rapper had an album that went double platinum with no features?', 'J. Cole', [ 'J. Cole', 'Big Sean', 'Drake', 'Kendrick Lamar'], 2);
new Question('Which rock band released the album \'The Bends\' in March 1995?', 'Radiohead', [ 'Radiohead', 'U2', 'Coldplay', 'Nirvana'], 2);
new Question('Which singer was featured in Swedish producer Avicii\'s song \'Wake Me Up\'?', 'Aloe Blacc', [ 'Aloe Blacc', 'John Legend', 'CeeLo Green', 'Pharrell Williams'], 2);
new Question('Which song in Drake\'s \'Views\' features Future?', 'Grammys', [ 'Grammys', 'Too Good', 'Pop Style', 'Faithful'], 2);
new Question('Which song is not by TheFatRat?', 'Ascent', [ 'Ascent', 'Monody', 'Infinite Power!', 'Windfall'], 2);
new Question('Which year was the album \'Floral Shoppe\' by Macintosh Plus released?', '2011', [ '2011', '2014', '2012', '2013'], 3);
new Question('Who had a 1973 hit with the song \'Hocus Pocus\'?', 'Focus', [ 'Focus', 'AC/DC', 'Pilot', 'Rush'], 2);
new Question('Who had a 1981 hit with the song \'Japanese Boy\'?', 'Aneka', [ 'Aneka', 'Sandra', 'Madonna', 'Toyah'], 3);
new Question('Who had a 1983 hit with the song \'Africa\'?', 'Toto', [ 'Toto', 'Steely Dan', 'Foreigner', 'Journey'], 1);
new Question('Who is a pioneer of \'Minimal Music\' in 1960s?', 'Steve Reich', [ 'Steve Reich', 'Wolfgang Amadeus Mozart', 'Sigur Rós', 'Brian Eno'], 3);
new Question('Who is the best selling artist of all time?', 'The Beatles', [ 'The Beatles', 'Elvis Presley', 'Michael Jackson', 'Elton John'], 2);
new Question('Who is the frontman of Muse?', 'Matt Bellamy', [ 'Matt Bellamy', 'Jonny Greenwood', 'Thom Yorke', 'Dominic Howard'], 2);
new Question('Who is the lead singer of Bastille?', 'Dan Smith', [ 'Dan Smith', 'Chris Wood', 'Will Farquarson', 'Kyle Simmons'], 2);
new Question('Who is the lead singer of Green Day?', 'Billie Joe Armstrong', [ 'Billie Joe Armstrong', 'Tré Cool', 'Sean Hughes', 'Mike Dirnt'], 1);
new Question('Who is the lead singer of Pearl Jam?', 'Eddie Vedder', [ 'Eddie Vedder', 'Stone Gossard', 'Kurt Cobain', 'Ozzy Osbourne'], 1);
new Question('Who is the lead singer of Silverchair?', 'Daniel Johns', [ 'Daniel Johns', 'Chris Joannou', 'Ben Gillies', ''], 2);
new Question('Who is the lead singer of the British pop rock band Coldplay?', 'Chris Martin', [ 'Chris Martin', 'Jonny Buckland', 'Guy Berryman', 'Will Champion'], 1);
new Question('Who is the lead singer of the band Coldplay?', 'Chris Martin', [ 'Chris Martin', 'Chris Wallace', 'Chris Isaak', 'Chris Connelly'], 1);
new Question('Who is the primary lyricist for Canadian progressive rock band Rush?', 'Neil Peart', [ 'Neil Peart', 'Geddy Lee', 'John Rutsey', 'Alex Lifeson'], 2);
new Question('Who performed \'I Took A Pill In Ibiza\'?', 'Mike Posner', [ 'Mike Posner', 'Avicii', 'Robbie Williams', 'Harry Styles'], 1);
new Question('Who recorded the 1975 album \'Captain Fantastic and the Brown Dirt Cowboy\'?', 'Elton John', [ 'Elton John', 'Billy Joel', 'John Denver', 'Joe Cocker'], 3);
new Question('Who was not in the band \'The Smiths\'?', 'Martin Chambers', [ 'Martin Chambers', 'Mike Joyce', 'Andy Rourke', 'Morrissey'], 3);
new Question('Who was the lead singer and frontman of rock band R.E.M?', 'Michael Stipe', [ 'Michael Stipe', 'George Michael', 'Thom Yorke', 'Chris Martin'], 2);
new Question('Who won the 1989 Drum Corps International championships?', 'Santa Clara Vanguard', [ 'Santa Clara Vanguard', 'The Bluecoats', 'The Academy', 'Blue Devils'], 3);
new Question('Who wrote the song \'You Know You Like It\'?', 'AlunaGeorge', [ 'AlunaGeorge', 'Major Lazer', 'Steve Aoki', 'DJ Snake'], 3);
new Question('Whose signature guitar technique is called the \'windmill\'?', 'Pete Townshend', [ 'Pete Townshend', 'Jimmy Page', 'Eddie Van Halen', 'Jimi Hendrix'], 1);
new Question('\'Lift Your Spirit\' is an album by which artist?', 'Aloe Blacc', [ 'Aloe Blacc', 'Lena Meyer-Landrut', 'Stevie Wonder', 'Taylor Swift'], 2);
new Question('\'Make You Feel My Love\' was originally written and performed by which singer-songwriter?', 'Bob Dylan', [ 'Bob Dylan', 'Billy Joel', 'Adele', 'Elvis'], 2);


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
