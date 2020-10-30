document.onload = main();

async function fetchData(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

async function main() {
    let songsJson = await fetchData("music.json")
    console.log(songsJson);
}