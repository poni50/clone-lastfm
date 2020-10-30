class Artist {

    constructor(name, songs) {
        this.name = name;
        this.songs = songs;
    }

    addSong(song) {
        this.songs.push(song);
    }
}