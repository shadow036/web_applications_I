function ActiveFilter(props){
    return  <h1>
                Filter: {(props.filter === "Best_Rated" || props.filter === "Seen_Last_Month") ? props.filter.replace('_',' ').replace('_',' ') : props.filter}
            </h1>;
}

export default ActiveFilter;