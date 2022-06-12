const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const crypto = require('crypto');

const db = new sqlite.Database('./films.db', (err) => {
    if (err) {
        throw err;
    }
});

function get_all(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id,title,favorite,watchdate,rating FROM films';
        db.all(sql, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    })
};

function get_filter(filter, logged_user){
    return new Promise((resolve, reject) => {
        let sql;
        switch(filter){
            case "All":
                sql = 'SELECT id, title, favorite, watchdate, rating FROM films WHERE user = ?';
                break;
            case "Favorites":
                sql = 'SELECT id, title, favorite, watchdate, rating FROM films WHERE favorite = 1 AND user = ?';
                break;
            case "Best_Rated":
                sql = 'SELECT id, title, favorite, watchdate, rating FROM films WHERE rating = 5 AND user = ?';
                break;
            case "Seen_Last_Month":
                sql = 'SELECT id, title, favorite, watchdate, rating FROM films WHERE watchdate >= ? AND user = ?';
                break;
            case  "Unseen":
                sql = 'SELECT id, title, favorite, watchdate, rating FROM films WHERE watchdate IS NULL AND user = ?';
                break;
            default:
                sql = `SELECT id, title, favorite, watchdate, rating FROM films WHERE title LIKE "%${filter.substring(1, filter.length-1)}%" AND user = ?`;
                break;
        };
        if(filter !== "Seen_Last_Month"){
            db.all(sql, logged_user, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        }else{
            db.all(sql, [dayjs().subtract(31, 'day').format('YYYY-MM-DD'), logged_user], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        }
    })
};

function get_id(target_id){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id,title,favorite,watchdate,rating FROM films WHERE id = ?';
        db.all(sql, [target_id] , (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    })
};

function post(new_film){
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films(title, favorite, watchdate, rating, user) VALUES(?, ?, ?, ?, ?)';
        db.run(sql, [new_film.title, new_film.favorite, new_film.watchdate, new_film.rating, new_film.user], (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    })
}

function put_update(target_id, new_film){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET title = ?, favorite = ?, watchdate = ?, rating = ?, user = ? WHERE id = ? AND user = ?';
        db.run(sql, [new_film.title, new_film.favorite, new_film.watchdate, new_film.rating, new_film.user, target_id, new_film.user], (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    })
}

function put_toggle(target_id){
    return new Promise((resolve, reject) => {
        const sql = `UPDATE films SET favorite = 1-favorite WHERE id = ?`;
        db.run(sql, [target_id], (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    })
}

function delete_film(target_id){
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM films WHERE id = ?';
        db.run(sql, target_id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    })
}

function find_user(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, email, (err, row) => {
            if(err)
                reject(err);
            else if(row === undefined)
                resolve(false);
            else{
                const user = {id: row.id, username: row.email, name: row.name};
                crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
                    if (err) reject(err);
                    if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
                      resolve(false);
                    else
                      resolve(user);
                })
            }
        })
    })
}

function find_user_by_id(id){
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) { 
          reject(err); 
        }
        else if (row === undefined) { 
          resolve({error: 'User not found!'}); 
        }
        else {
          const user = {id: row.id, username: row.email, name: row.name};
          resolve(user);
        }
      });
    });
  };

module.exports = { get_all, get_filter, get_id, post, put_update, put_toggle, delete_film, find_user, find_user_by_id };