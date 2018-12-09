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
  // Innen hívhatod meg a többi függvényed
  sortCharactersByName(userDatas);
  selectCharactersPortraitAndName(userDatas);
  searchCharacter();
}
getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);


// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
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
                    <img src=${user[i].portrait} alt="portrait">
                    <p>${user[i].name}</p>
                    </div>
                    `;
  }
  characterElement.innerHTML = characterRow;
}
function searchCharacter() {
  var searchInput = document.querySelector('.div__description__search');
  searchInput.innerHTML = `
                          <input class="search__input" type="text" placeholder="Search a character">
                          <input class="search__button" type="button" value="Search">`;
}
