function format_table(flags){   // check if incompatible/preparatory header has to be added to the table
    let incompatible_flag = false;
    let preparatory_flag = false;
    flags.forEach(course => {
        if(course["incompatible course(s)"] !== null)
            incompatible_flag = true;
        if(course["preparatory course"] !== null)
            preparatory_flag = true;
    })
    return [incompatible_flag, preparatory_flag];
}

function find_course_in_flags(target_course, flags){    //  check if a course is already in its expanded state
    if(flags.find(course => course.code === target_course.code) === undefined)
        return false;
    else
        return true;
}

function find_right_style(course, temporary_study_plan){
    const flag = check_add(course, temporary_study_plan)[0]; 
    if(flag)
            return "dummy"
        else
            return "red";
}

function find_right_style_max_credits(courses, temporary_study_plan){    // add a style to the elements based on credits threshold
    const current_credits = temporary_study_plan.courses.reduce((partial_sum, next_element) => partial_sum + get_course_by_id(courses, next_element).credits, 0);
    if(temporary_study_plan.type === "Full time" && (current_credits < 60 || current_credits > 80))
        return "red";
    else if(temporary_study_plan.type === "Part time" && (current_credits < 20 || current_credits > 40))
        return "red";
    else
        return "dummy";
}

function check_max_students(course){   // return boolean based on students threshold
    if(course["maximum students"] === null)
        return true;
    if(course["current students"] >= course["maximum students"])
        return false;
    else
        return true;
}

function check_add(course, temporary_study_plan){   // check if a couse can be added to the study plan
    let flag = [true, ""];
    if(temporary_study_plan.type !== ""){
        if(course["incompatible course(s)"] !== null){
            const splitted_courses = course["incompatible course(s)"].split(',');
            splitted_courses.forEach(c => {
                if(temporary_study_plan.courses.find(c2 => c === c2) !== undefined)
                    flag = [false, flag[1] + "Incompatible course present: " + c + ", "];
            });
        }
        if(course["preparatory course"] !== null){
            if(temporary_study_plan.courses.find( c => c === course["preparatory course"]) === undefined)
                flag = [false, flag[1] + "Preparatory course needed: " + course["preparatory course"] + ", "];
        }
        if(!check_max_students(course))
            flag = [false, flag[1] + "No more students allowed, "];

        if(temporary_study_plan.courses.find(c2 => course.code === c2) !== undefined)
            flag = [false, flag[1] + "Course already added, "];
        if(!flag[0])
            flag = [flag[0], flag[1].substring(0, flag[1].length-2)]   // remove last colon and whitespace
    }
    return flag;
}

function get_course_by_id(courses, target_course){  // obtain course object given its id
    return courses.find(course => course.code === target_course);
}

function check_remove(course_id, courses, temporary_study_plan){
    let flag = [true, ""];

    temporary_study_plan.courses.forEach(c => {
        if(get_course_by_id(courses, c)["preparatory course"] === course_id)
            flag = [false, flag[1] + "Preparatory course for " + c + ", "];
    })

    if(!flag[0])
        flag = [flag[0], flag[1].substring(0, flag[1].length-2)]

    return flag
}

function check_max_credits(courses, temporary_study_plan){   // return boolean based on credits threshold
    const current_credits = temporary_study_plan.courses.reduce((partial_sum, next_element) => partial_sum + get_course_by_id(courses, next_element).credits, 0);
    if((temporary_study_plan.type === "Full time" && current_credits < 60) || (temporary_study_plan.type === "Part time" && current_credits < 20))
        return [false, false];
    else if((temporary_study_plan.type === "Full time" && current_credits > 80) || (temporary_study_plan.type === "Part time" && current_credits > 40))
        return [false, true];
    else return [true, false];
}

function sleep(unit) {
    return new Promise(resolve => setTimeout(resolve, 1000 * unit));
}

export { format_table, get_course_by_id, check_add, check_max_students, find_right_style_max_credits, find_right_style, find_course_in_flags, check_remove, check_max_credits, sleep};