document.addEventListener("DOMContentLoaded", () => {
    let select = document.querySelector("#ghibliMovies");
    let form = document.querySelector("form");
    let allReviews = document.querySelector("#allReviews");
    let userReview = document.querySelector("#review");
    let currentFilm = document.querySelector("#film");

    const fetchData = async (url, callback) => {
        try {
            let res = await axios.get(url);
            callback(res.data);
        } catch(err) {
            console.log(err);
        }
        
    }

    const populateSelect = async (data) => {
        data.forEach(film => {
            let option = document.createElement("option");
            option.innerText = film.title;
            option.id = film.id;
            select.appendChild(option);
        })
    }

    fetchData("https://ghibliapi.herokuapp.com/films", populateSelect);
})