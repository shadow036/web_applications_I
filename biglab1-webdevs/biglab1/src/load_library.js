import dayjs from 'dayjs';
import { Film, FilmLibrary } from './film_library';

function load_library(){
    const library = new FilmLibrary();
    library.add_new_film(new Film(0, "Pulp Fiction", true, dayjs("March 10, 2022"), 5));
    library.add_new_film(new Film(1, "21 Grams", true, dayjs("March 17, 2022"), 4));
    library.add_new_film(new Film(2, "Star Wars", false, undefined, undefined));
    library.add_new_film(new Film(3, "Matrix", false, undefined, undefined));
    library.add_new_film(new Film(4, "Shrek", false, dayjs("March 21, 2022"), 3));
    return library.library;
}
export default load_library;