var songs = [];
var artists = [];
document.onload = main();

async function fetchData(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

function fillArrays(element) {
    let songVar = new Song(element.name, element.listeners, element.genre, element.artist.name);

    let found = false;
    for (let i = 0; i < artists.length; i++) {

        if (artists[i].name == songVar.artist) {
            found = true;
            artists[i].addSong(songVar);
            break;
        }
    }

    if (!found) {
        let artist = new Artist(songVar.artist);
        artist.addSong(songVar);
        artists.push(artist);
    }

    songs.push(songVar);
}


function initMainContent(title) {
    document.getElementsByTagName("main")[0].innerHTML = "";
    document.getElementsByTagName("main")[0].appendChild(document.createElement("h2"));
    document.getElementsByTagName("main")[0].getElementsByTagName("h2")[0].id = "title";
    document.getElementsByTagName("main")[0].getElementsByTagName("h2")[0].appendChild(document.createTextNode(title));
    document.getElementsByTagName("main")[0].appendChild(document.createElement("ul"));
    let listTag = document.getElementsByTagName("main")[0].getElementsByTagName("ul")[0];
    listTag.classList.add("songList");

    return listTag;
}

function printList(parentNode, artistName, songName, listeners, index) {
    let listItem = document.createElement("li")
    if (index % 2 == 0) {
        listItem.classList.add("even");
    }
    listItem.classList.add("song");

    //Play icon
    let icon = document.createElement("i");
    icon.classList.add("far");
    icon.classList.add("fa-play-circle");

    //Song info
    let artistNameP = document.createElement("p");
    artistNameP.appendChild(document.createTextNode(`${index+1}. ${artistName}`));
    let songNameP = document.createElement("p");
    songNameP.appendChild(document.createTextNode(`${songName}`));
    songNameP.classList.add("bolder");
    let listenersP = document.createElement("p")
    listenersP.appendChild(document.createTextNode(`${listeners} listeners`));

    //Add the tags to the <li>
    listItem.appendChild(icon);
    listItem.appendChild(artistNameP);
    listItem.appendChild(songNameP);
    listItem.appendChild(listenersP);


    //add <li> to <ul>
    parentNode.appendChild(listItem);
}

function removeFocus() {
    let buttons = document.getElementById("menu").getElementsByTagName("p");

    for (let button of buttons) {
        if (button.classList.contains("focused")) {
            button.classList.remove("focused");
        }
    }
}

function setOverview() {
    removeFocus();
    document.getElementById("menu").getElementsByTagName("p")[0].classList.add("focused");
    let listTag = initMainContent("Overview");
    songs.forEach((element, index) => printList(listTag, element.artist, element.name, element.listeners, index));
}

function setTop10() {
    removeFocus();
    document.getElementById("menu").getElementsByTagName("p")[1].classList.add("focused");
    let listTag = initMainContent("Top 10");

    let sorted = songs.sort((e1, e2) => {
        if (e1.listeners < e2.listeners) {
            return -1;
        }
        if (e1.listeners > e2.listeners) {
            return 1;
        }
        return 0;
    })

    sorted = sorted.slice(0, 10);

    sorted.forEach((element, index) => printList(listTag, element.artist, element.name, element.listeners, index));
}

function setBestGroup() {
    removeFocus();
    document.getElementById("menu").getElementsByTagName("p")[2].classList.add("focused");
    let listTag = initMainContent("The Biggest");

    let max = artists.reduce((prev, current) => {
        return (prev.totalListeners() > current.totalListeners()) ? prev : current
    });

    max.songs.forEach((element, index) => printList(listTag, element.artist, element.name, element.listeners, index));

}

function capitalizeFirstWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);

}

function setGenre(genre) {
    removeFocus();
    let listTag = initMainContent(capitalizeFirstWord(genre));

    let genreSongs = songs.filter((element) => {
        if (element.genre == genre)
            return element;
    })

    genreSongs.forEach((element, index) => printList(listTag, element.artist, element.name, element.listeners, index));
}


async function main() {
    let songsJson = await fetchData("music.json")
    songsJson.forEach(element => fillArrays(element));

    document.getElementById("menu").getElementsByTagName("p")[0].addEventListener("click", setOverview);
    document.getElementById("menu").getElementsByTagName("p")[1].addEventListener("click", setTop10);
    document.getElementById("menu").getElementsByTagName("p")[2].addEventListener("click", setBestGroup);
    document.getElementById("rock").addEventListener("click", function() { setGenre("rock") });
    document.getElementById("hiphop").addEventListener("click", function() { setGenre("hip-hop") });
    document.getElementById("indie").addEventListener("click", function() { setGenre("indie") });
    document.getElementById("jazz").addEventListener("click", function() { setGenre("jazz") });
    document.getElementById("reggae").addEventListener("click", function() { setGenre("reggae") });

    setOverview();
}