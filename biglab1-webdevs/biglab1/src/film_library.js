import dayjs from 'dayjs';

function Film(id,title,favorite,date=undefined,rating=undefined){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary(){
    this.library = [];
    this.print_library = () => this.library;
    this.add_new_film = (new_film) => this.library.push(new_film);
    this.sort_by_date = () => {
        let library_ordered_by_date = [];
        let not_watched_films = [];
        this.library.forEach(film => {
            if(film.date !== undefined)
                library_ordered_by_date.push(film);
            else
                not_watched_films.push(film);
        });
        library_ordered_by_date.sort((a, b) => {
            if(dayjs(a.date).isBefore(dayjs(b.date)))
                return -1;
            else
                return 1;
        });
        not_watched_films.forEach(film => library_ordered_by_date.push(film));
        return library_ordered_by_date;
    };
    this.delete_film = (target_id) => this.library = this.library.filter(film => film.id !== target_id);
    this.reset_watched_film = () => this.library.forEach(film => film.date = undefined);
    this.get_rated = () => this.library.filter(film => film.rating !== undefined).sort((a, b) => b.rating - a.rating);
}

export {Film, FilmLibrary};