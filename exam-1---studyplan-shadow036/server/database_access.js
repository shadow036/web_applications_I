const sqlite = require('sqlite3');
const crypto = require('crypto');
const express = require('express');

const db = new sqlite.Database('./study_plan.db', (err) => {
    if (err) {
        throw err;
    }
});

function load_courses(){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM courses ORDER BY name";
        db.all(sql, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
};

function load_study_plan(id){
  return new Promise((resolve, reject) => {
    const sql = "SELECT [study plan type], [study plan] FROM students WHERE id = ?";
    db.get(sql, id, (err, row) => {
        if(err)
            reject(err);
        else
            resolve(row);
    });
});
}

function delete_study_plan(id){
  return new Promise((resolve, reject) => {
    const sql = "UPDATE students SET [study plan type] = null, [study plan] = null WHERE id = ?";
    db.get(sql, id, (err, row) => {
        if(err)
            reject(err);
        else
            resolve(row);
    });
  });
}

function save_study_plan(id, study_plan){
  return new Promise(async (resolve, reject) => {
    let error = "";
    let flag = true;
    const courses = await load_courses();
    const old_study_plan = (await load_study_plan(id))["study plan"];
    console.log(old_study_plan)
    courses.forEach(c => {
      if(study_plan.courses.find(c2 => c2 === c.code) !== undefined && c["maximum students"] !== null){
        if(c["maximum students"] < c["current students"]){
          flag = false;
          error += `,${c.name}`;
        }else if(c["maximum students"] === c["current students"] && old_study_plan.split(',').find(c3 => c3 === c.code) === undefined){
          flag = false;
          error += `,${c.name}`;
        }
      }
    })
    if(!flag)
      reject(`Error: student limit exceeded in the following course(s): ${error.substring(1)}`);
    const sql = "UPDATE students SET [study plan type] = ?, [study plan] = ? WHERE id = ?";
    db.get(sql, [study_plan.type, study_plan.courses, id], (err, row) => {
        if(err)
            reject(err);
        else
            resolve(row);
    });
  });
}

function extract_codes(courses){
  let list = [];
  courses.forEach(c => {
    list.push({"id": c.code, "value": c["current students"]});
  });
  return list;
}

function update_courses(courses){
  const list = extract_codes(courses);
  return new Promise((resolve, reject) => {
    list.forEach(element => {
      db.all("UPDATE courses SET [current students] = ? WHERE code = ?", [element.value, element.id], (err, row) => {
        if(err)
          reject(err);
        else if(element.id === list[list.length-1].id)
          resolve(true);
      });
    })
  })}


function find_user(id, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM students WHERE id = ?';
        db.get(sql, id, (err, row) => {
            if(err)
                reject(err);
            else if(row === undefined)
                resolve(false);
            else{
                const user = {id: row.id, name: row.name, surname: row.surname, email: row.email, study_plan_type: row["study plan type"], study_plan: row["study plan"]};
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

module.exports = { load_courses, find_user, load_study_plan, delete_study_plan, save_study_plan, update_courses };