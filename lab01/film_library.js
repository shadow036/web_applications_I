'use strict';
const dayjs = require('dayjs');

//  EXERCISE 0

function transform_string(array_of_strings){
    array_of_strings.forEach(element => {
        switch(element.length){
            case 0:
            case 1:
                console.log("");
                break;
            default:
                console.log(element[0] + element[1] + element[element.length-2] + element[element.length-1]);
                break;
        }
    });
}

const array_of_strings=["cat","it","spring"];
transform_string(array_of_strings);

//EXERCISE 1 AND 2
function Film(id,title,favorites=false,date=undefined,rating=undefined){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary(){
    this.library = [];
    this.print_library = () => this.library.forEach(film => console.log(film.id + " " + film.title + " " + film.favorites + " " + film.date + " " + film.rating));
    this.add_new_film = (new_film) => this.library.push(new_film);
    this.sort_by_date = () => {
        let library_ordered_by_date = [];
        let not_watched_films = [];
        this.library.forEach(film => {
            if(film.date != undefined)
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
    this.delete_film = (target_id) => this.library = this.library.filter(film => film.id != target_id);
    this.reset_watched_film = () => this.library.forEach(film => film.date = undefined);
    this.get_rated = () => console.log(this.library.filter(film => film.rating != undefined).sort((a, b) => b.rating - a.rating));
}

const film1 = new Film(1,"Pulp Fiction", true, "March 10, 2022", 5);
const film2 = new Film(2, "21 Grams" , true, "March 17, 2022", 4);
const film3 = new Film(3, "Star Wars", false);
const film4 = new Film(4, "Matrix", false);
const film5 = new Film(5, "Shrek", false, "March 21, 2022", 3);

let library = new FilmLibrary();
library.add_new_film(film1);
library.add_new_film(film2);
library.add_new_film(film3);
library.add_new_film(film4);
library.add_new_film(film5);

console.log("\nORIGINAL LIBRARY\n");
library.print_library();
console.log("\nSORT BY DATE RESULT\n");
console.log(library.sort_by_date());
console.log("\nLIBRARY AFTER SORT BY DATE\n");
library.print_library();
library.reset_watched_film();
console.log("\nLIBRARY AFTER RESET WATCHED FILM\n");
library.print_library();
console.log("\nGET RATED RESULT\n");
library.get_rated();
console.log("\nLIBRARY AFTER GET RATED\n");
library.print_library();
console.log("\nLIBRARY AFTER DELETE FILM 2\n");
library.delete_film(2);
library.print_library();
console.log("\n");