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
  generateElement(livingUsers);
  // clickOnPortrait(livingUsers);
}
getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);


// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

//  élő szereplők kiválasztása
function livingCharacters(user) {
  var livingCharactersData = [];
  for (var i = 0; i < user.length; i++) {
    if (!user[i].dead) {
      livingCharactersData.push(user[i]);
    }
  }
  return livingCharactersData;
}
// az élő szereplők sorbarendezése
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
// a szereplők képeinek és neveinek megjelenítése
function selectCharactersPortraitAndName(user) {
  var characterElement = document.querySelector('.main__div__portraits');
  var characterRow = '';
  for (var i = 0; i < user.length; i++) {
    characterRow += `
                    <div class="div__character__portrait">
                    <img class="portraitCharacter" src="${user[i].portrait}" alt="portrait">
                    <p>${user[i].name}</p>
                    </div>
                    `;
  }
  characterElement.innerHTML = characterRow;
}
// a kereső mező és gomb létrehozása
function searchCharacterTextButton() {
  var searchInput = document.querySelector('.div__description__search');
  searchInput.innerHTML = `
                          <input class="search__input" type="text" placeholder="Search a character">
                          <input class="search__button" type="button" value="Search">`;
}
// függvény - találat esetén fusson le
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
// függvény - amennyiben nem történt találat
function characterNoFound() {
  var noDescription = document.querySelector('.div__description__character');
  noDescription = 'Character not found.';
  document.querySelector('.search__input').value = '';
}
// keresési függvény
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
// a keresőgomb életre keltése
function clickButton(user) {
  var searchButton = document.querySelector('.search__button');
  searchButton.addEventListener('click', function () {searchCharacter(user);});
}
/* a karakter adatainak kiíratása
function showCharacterDatas(user) {
  var descriptionCharacter = document.querySelector('.div__description__character');
  var house = '';
  if (user[0].house) {
    house = `<img src="/assets/houses/${user[0].house}.png">`;
  } else {
    house = '';
  }
  descriptionCharacter.innerHTML = `
                                    <p><img src="${user[0].picture} alt="picture"></p>
                                    <p>${user[0].name}</p>
                                    <p>${house}</p>
                                    <p>${user[0].bio}</p>
                                    `;
}
// képre kattintás funkció hozzáadása
function clickOnPortrait(user) {
  var characterPortrait = document.querySelectorAll('.div__character__portrait');
  for (var i = 0; i < characterPortrait.length; i++) {
    characterPortrait[i].addEventListener('click', function () {
    characterPortrait[i] = user[i];
    characterPortrait.target.
    })
  }
}*/
