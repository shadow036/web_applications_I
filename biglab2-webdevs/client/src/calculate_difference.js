import dayjs from "dayjs";

function is_leap_year(year){
    if(year % 400 === 0)
        return true;
    if(year % 4 === 0 && year % 100 !== 0)
        return true;
    return false; 
}

function calculate_difference(film_date){

    if (film_date === undefined)
        return 1;

    const days_in_a_year = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let threshold_day = 0;
    for(let i=0; i<dayjs().subtract(30, 'day').month(); i++)
        threshold_day += days_in_a_year[i];
    threshold_day += dayjs().subtract(30, 'day').date();
    if(is_leap_year(dayjs().subtract(30, 'day').year()) && dayjs().subtract(30, 'day').month() > 1)
        threshold_day++;
    const threshold_full = (dayjs().subtract(30, 'day').year()-1) * 365 + threshold_day;

    let film_day = 0;
    for(let i=0; i<dayjs(film_date).month(); i++)
        film_day += days_in_a_year[i];
    film_day += dayjs(film_date).date();
    if(is_leap_year(dayjs(film_date).year()) && dayjs(film_date).month() > 1)
        film_day++;
    const film_full = (dayjs(film_date).year()-1) * 365 + film_day;
    
    //console.log(threshold_full - film_full);

    return threshold_full - film_full;
}

export default calculate_difference;