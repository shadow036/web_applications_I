'use strict'

function refresh_list(perm_library, temp_library, filter_name, filter_id){
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    let film_ids = [];
    temp_library.forEach(film => {
        let film_id = "id_" + film.id;  // temporary variable to plug into <td>
        tbody.innerHTML +=  `<tr>
                                <td>${film.title}<img src="trash.jpg" width="30" height="30" id=${film_id}></td>
                                <td>${film.favorites}</td>
                                <td>${film.date}</td>
                                <td>${film.rating}</td>
                            </tr>`;        
        film_ids.push(film.id); // list of film ids in their normal format ("0","1",...)
    });
    film_ids.forEach(id => {
        tbody.querySelector("#id_" + id).addEventListener('click', event => {
            refresh_list(perm_library.filter(f => f.id != id), temp_library.filter(f => f.id != id), filter_name, filter_id);
            refresh_filters(perm_library.filter(f => f.id != id), filter_name, filter_id);  // sends the updated library to the refresh_filter function
        });
    });
};

function refresh_filters(library, filter_name, filter_id){
    const filter_title = document.querySelector('#active_filter');
    filter_title.innerHTML='';
    filter_title.innerHTML += `${filter_name}`;
    const aside = document.querySelector('aside');
    aside.innerHTML='';
    aside.innerHTML +=  `<div class="row">
                            <button id="show_all">All</button>
                        </div>
                        <div class="row">
                            <button id="show_favorites">Favorites</button>
                        </div>
                        <div class="row">
                            <button id="show_best">Best rated</button>
                        </div>
                        <div class="row">
                            <button id="show_seen_last_month"> Seen last month</button>
                        </div>
                        <div class="row">
                            <button id="show_unseen">Unseen</button>
                        </div>`;
    document.querySelector(`${filter_id}`).classList.add("highlighted_button");
    document.querySelector('#show_all').addEventListener('click', event => {
        refresh_filters(library,'All','#show_all');
        refresh_list(library,library,'All','#show_all');
    });
    document.querySelector('#show_favorites').addEventListener('click', event => {
        refresh_filters(library,'Favorites','#show_favorites');
        refresh_list(library,library.filter(film => film.favorites===true),'Favorites','#show_favorites');
    });
    document.querySelector('#show_best').addEventListener('click', event => {
        refresh_filters(library,'Best rated','#show_best');
        refresh_list(library,library.filter(film => film.rating===5),'Best rated','#show_best');
    });
    document.querySelector('#show_seen_last_month').addEventListener('click', event => {
        refresh_filters(library,'Seen last month','#show_seen_last_month');
        refresh_list(library,library.filter(film => dayjs(film.date).isSameOrAfter(dayjs().subtract(30,'day'))),'Seen last month','#show_seen_last_month');
        //console.log(`${dayjs().get('year')}-${dayjs().get('month')}-${dayjs().get('date')}`);
    });
    document.querySelector('#show_unseen').addEventListener('click', event => {
        refresh_filters(library,'Unseen','#show_unseen');
        refresh_list(library,library.filter(film => film.date===undefined),'Unseen','#show_unseen');
    });
};

document.addEventListener('DOMContentLoaded', event => {
    const library = new FilmLibrary();
    
    library.add_new_film(new Film(0, "Pulp fiction", true, "March 10, 2022", 5));
    library.add_new_film(new Film(1, "21 Grams", true, "March 17, 2022", 4));
    library.add_new_film(new Film(2, "Star Wars", false, undefined, 0));
    library.add_new_film(new Film(3, "Matrix", false, undefined, 0));
    library.add_new_film(new Film(4, "Shrek", false, "March 21, 2022", 3));

    refresh_list(library.library, library.library, 'All', '#show_all');
    refresh_filters(library.library, 'All', '#show_all');
});