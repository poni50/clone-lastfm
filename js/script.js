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

async function main() {
    let songsJson = await fetchData("music.json")
    songsJson.forEach(element => fillArrays(element));
}