'use strict';
const dayjs = require('dayjs');
const sqlite = require('sqlite3');

function Film(id,title,favorites=false,date=undefined,rating=undefined){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary(){
    
    //OLD PART  (LAB 1)
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

    //NEW PART  (LAB 2)
    const db = new sqlite.Database('films_copy.db', (err) => {
        if(err)
            throw err;
    });
    this.close_db = () => db.close();
    this.get_database = () =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            db.all(sql, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)));             
            });
        });
    };
    this.get_favorites = () =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE favorite = 1';
            db.all(sql, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)));
            });
        });
    };
    this.get_watched_today = () =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate = ?';
            db.all(sql, dayjs().format('YYYY-MM-DD'), (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)));
            });
        });
    };
    this.get_before_target_date = (target_date) =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate < ?';
            db.all(sql, target_date, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)));
            });
        });
    };
    this.get_greater_equal_target_rating = (target_rating) =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE rating >= ?';
            db.all(sql, target_rating, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)));
            });
        });
    };
    this.get_equal_target_title = (target_title) =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE title = ?';
            db.all(sql, target_title, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)));
            });
        });
    };
    this.store = (id, title, favorite, watchdate, rating) => {
        const sql = 'INSERT INTO films(id, title, favorite, watchdate, rating) VALUES(?, ?, ?, ?, ?)';
        db.run(sql, [id, title, favorite, watchdate, rating], (err) => {
            if(err){
                console.log("Insertion failed");
                throw err;
            }else
                console.log('Insertion successful');
        });
    };
    this.delete_movie = (target_id) => {
        const sql = 'DELETE FROM films WHERE id = ?';
        db.run(sql, target_id, (err) => {
            if(err){
                console.log("Deletion failed");
                throw err;
            }else
                console.log('Deletion successful');
        });
    };
    this.delete_watchdate = () => {
        const sql = 'UPDATE films SET watchdate = "undefined"';
        db.run(sql, (err) => {
            if(err){
                console.log("Update failed");
                throw err;
            }else
                console.log('Update successful');
        });
    };
};

function main(){
    let library = new FilmLibrary();
    library.get_database().then(result => {
        console.log("Entire DB");
        console.log(result);
    });
    library.get_favorites().then(result => {
        console.log("Favorites");
        console.log(result);
    }).catch(error => console.log(error));
    library.get_watched_today().then(result => {
        console.log("Today's films");
        console.log(result);
    }).catch(error => console.log(error));
    library.get_before_target_date("2022-03-15").then(result => {
        console.log("Films having watchdate before 2022-03-15");
        console.log(result);
    });
    library.get_greater_equal_target_rating(3).then(result => {
        console.log("Films having rating greater than 3");
        console.log(result);
    });
    library.get_equal_target_title("Matrix").then(result => {
        console.log("Matrix film");
        console.log(result);
    });
    library.store(36, 'Avatar', 1, '2012-02-13', 5);
    library.delete_movie(1);
    library.delete_watchdate();
    library.close_db();
};

main();