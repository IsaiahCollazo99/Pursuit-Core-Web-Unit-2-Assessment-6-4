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

    const populateSelect = (data) => {
        data.forEach(film => {
            let option = document.createElement("option");
            option.innerText = film.title;
            option.id = film.id;
            select.appendChild(option);
        })
    }

    const getDescription = (data) => {
        currentFilm.innerHTML = "";

        let filmTitle = document.createElement("h3");
        filmTitle.innerText = data.title;
        currentFilm.appendChild(filmTitle);

        let releaseDate = document.createElement("p");
        releaseDate.id = "release";
        releaseDate.innerText = data.release_date;
        currentFilm.appendChild(releaseDate);

        let filmDescription = document.createElement("p");
        filmDescription.id = "description";
        filmDescription.innerText = data.description;
        currentFilm.appendChild(filmDescription);
    }

    fetchData("https://ghibliapi.herokuapp.com/films", populateSelect);

    select.addEventListener("change", (event) => {
        let selected = event.currentTarget.selectedOptions[0];
        fetchData(`https://ghibliapi.herokuapp.com/films/${selected.id}`, getDescription);
    })

    form.addEventListener("submit", (event) => {
        let title = document.querySelector("h3");
        if(!title) {
            event.preventDefault();
            alert("A film wasn't selected!");

        } else if(userReview.value === "") {
            event.preventDefault();
            alert("No review was entered!");

        } else if(title && userReview.value !== "") {
            event.preventDefault();
            let li = document.createElement("li");

            let reviewTitle = document.createElement("span");
            reviewTitle.innerText = title.innerText;
            reviewTitle.style.fontWeight = "bold";

            let reviewText = document.createElement("span");
            reviewText.innerText = `: ${userReview.value}`;
            li.appendChild(reviewTitle);
            li.appendChild(reviewText);

            allReviews.appendChild(li);
        }
        
        
        
    })
})