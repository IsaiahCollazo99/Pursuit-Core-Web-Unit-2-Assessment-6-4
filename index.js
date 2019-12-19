document.addEventListener("DOMContentLoaded", () => {
    // Grabbing all necessary elements
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
            // For each film, create an option tag with it's inner text being the title of the film
            let option = document.createElement("option");
            option.innerText = film.title;
            // Assigning the id of the option tag to the films id to be able to fetch the films description
            option.id = film.id;
            select.appendChild(option);
        })
    }

    const getDescription = (data) => {
        // Resetting the currentFilm section
        currentFilm.innerHTML = "";

        // Creating the title as an h3
        let filmTitle = document.createElement("h3");
        filmTitle.innerText = data.title;
        currentFilm.appendChild(filmTitle);

        // Creating the release date as a P, and assigning it an id of "release"
        let releaseDate = document.createElement("p");
        releaseDate.id = "release";
        releaseDate.innerText = data.release_date;
        currentFilm.appendChild(releaseDate);

        // Creating the description as a P and assigning it an id of "description"
        let filmDescription = document.createElement("p");
        filmDescription.id = "description";
        filmDescription.innerText = data.description;
        currentFilm.appendChild(filmDescription);
    }

    // Fetch the films and populate the select tag with each film
    fetchData("https://ghibliapi.herokuapp.com/films", populateSelect);

    select.addEventListener("change", (event) => {
        // When the user selects a film it will fetch the data of the selected film 
        // and get it's description
        
        let selected = event.currentTarget.selectedOptions[0]; // Grabbing the selected film
        fetchData(`https://ghibliapi.herokuapp.com/films/${selected.id}`, getDescription);
    })

    form.addEventListener("submit", (event) => {
        let title = document.querySelector("h3");
        if(!title) {
            // If the user didn't choose a film, display an alert
            event.preventDefault();
            alert("A film wasn't selected!");

        } else if(userReview.value === "") {
            // If the user didn't enter a review, display an alert
            event.preventDefault();
            alert("No review was entered!");

        } else if(title && userReview.value !== "") {
            // If both a film was selected, and the user enetered a review it's added to the review ul
            event.preventDefault();
            let li = document.createElement("li");

            // Creating a span tag to bolden the title of the selected film
            let reviewTitle = document.createElement("span");
            reviewTitle.innerText = title.innerText;
            reviewTitle.style.fontWeight = "bold";

            // Creating a second span tag for the user's review of the selected film
            let reviewText = document.createElement("span");
            reviewText.innerText = `: ${userReview.value}`;
            li.appendChild(reviewTitle);
            li.appendChild(reviewText);

            allReviews.appendChild(li);
        }
        
    })
})