class Artist {

    constructor(name) {
        this.name = name;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }

    totalListeners() {
        return this.songs.reduce((prev, next) => {
            return prev += parseInt(next.listeners);
        }, 0);
    }
}