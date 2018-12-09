function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  var livingUsers = livingCharacters(userDatas);
  // Innen hívhatod meg a többi függvényed
  sortCharactersByName(livingUsers);
  selectCharactersPortraitAndName(livingUsers);
  searchCharacterTextButton();
  clickButton(livingUsers);
}
getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);


// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function livingCharacters(user) {
  var livingCharactersData = [];
  for (var i = 0; i < user.length; i++) {
    if (!user[i].dead) {
      livingCharactersData.push(user[i]);
    }
  }
  return livingCharactersData;
}

function sortCharactersByName(user) {
  for (var i = 0; i < user.length - 1; i++) {
    for (var j = i + 1; j < user.length; j++) {
      if (user[i].name > user[j].name) {
        var x = [user[i], user[j]];
        user[i] = x[1];
        user[j] = x[0];
      }
    }
  }
}
function selectCharactersPortraitAndName(user) {
  var characterElement = document.querySelector('.main__div__portraits');
  var characterRow = '';
  for (var i = 0; i < user.length; i++) {
    characterRow += `
                    <div class=div__character__portrait>
                    <img src=${user[i].portrait} alt="portrait" onclick="clickOnPortrait()">
                    <p>${user[i].name}</p>
                    </div>
                    `;
  }
  characterElement.innerHTML = characterRow;
}
function searchCharacterTextButton() {
  var searchInput = document.querySelector('.div__description__search');
  searchInput.innerHTML = `
                          <input class="search__input" type="text" placeholder="Search a character">
                          <input class="search__button" type="button" value="Search">`;
}
function characterOnDisplay(found) {
  var descriptionCharacter = document.querySelector('.div__description__character');
  var house = '';
  if (found[0].house) {
    house = `<img src="/assets/houses/${found[0].house}.png">`;
  } else {
    house = '';
  }
  descriptionCharacter.innerHTML = `
                                        <p><img src=${found[0].picture} alt="picture"></p>
                                        <p>${found[0].name}</p>
                                        <p>${house}</p>
                                        <p>${found[0].bio}</p>
                                       `;
  document.querySelector('.search__input').value = '';
}
function characterNoFound() {
  var noDescription = document.querySelector('.div__description__character');
  noDescription = 'Character not found.';
  document.querySelector('.search__input').value = '';
}

function searchCharacter(user) {
  var userInput = document.querySelector('.search__input').value;
  userInput = userInput.toLowerCase();
  var found = [];
  for (var i = 0; i < user.length; i++) {
    if ( userInput === user[i].name.toLowerCase()) {
      found.push(user[i]);
      characterOnDisplay(found);
    } else {
      characterNoFound();
    }
  }
}
function clickButton(user) {
  var searchButton = document.querySelector('.search__button');
  searchButton.addEventListener('click', function () {searchCharacter(user);});
}
