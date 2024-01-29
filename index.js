function renderMovie(movie) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${movie.title}</td>
    <td>${movie.year}</td>
    <td>${movie.score}</td>
    <td>${movie.duration}</td>
    <td>${movie.budget}</td>
    `;
    document.getElementById("table-body").appendChild(tr);
}

document.getElementById("import-button").addEventListener("click", function () {
    try {
    moviesArray = JSON.parse(document.getElementById("import-input").value);
    } catch (err) {
    alert("Erro ao importar JSON");
    return;
    }
    document.getElementById("import-container").classList.add("hidden");
    document.getElementById("presentation-container").classList.remove("hidden");
    moviesArray = moviesArray
    .filter((movie) => movie.title_year !== "")
    .filter((movie) => movie.duration !== "")
    .filter((movie) => movie.budget !== "")
    .map((movie) => ({
    title: movie.movie_title,
    year: Number(movie.title_year),
    score: Number(movie.imdb_score),
    duration: Number(movie.duration),
    budget: Number(movie.budget),
    }));
    moviesArray.forEach(renderMovie);
});

document.getElementById("apply-button").addEventListener("click", function () {
    const minDurationInput = document.getElementById("min-duration").value.trim();
    const minDuration =
    minDurationInput === "" ? -Infinity : Number(minDurationInput);
    const maxDurationInput = document.getElementById("max-duration").value.trim();
    const maxDuration =
    maxDurationInput === "" ? Infinity : Number(maxDurationInput);
    const minScoreInput = document.getElementById("min-score").value.trim();
    const minScore = minScoreInput === "" ? -Infinity : Number(minScoreInput);
    const maxScoreInput = document.getElementById("max-score").value.trim();
    const maxScore = maxScoreInput === "" ? Infinity : Number(maxScoreInput);
    const minBudgetInput = document.getElementById("min-budget").value.trim();
    const minBudget = minBudgetInput === "" ? -Infinity : Number(minBudgetInput);
    const maxBudgetInput = document.getElementById("max-budget").value.trim();
    const maxBudget = maxBudgetInput === "" ? Infinity : Number(maxBudgetInput);
    const sortProperty = document.getElementById("sort-property").value;
    const sortOrder = document.getElementById("sort-order").value;
    document.getElementById("table-body").innerHTML = "";
    moviesArray
    .filter((movie) => movie.duration >= minDuration && movie.duration <= maxDuration)
    .filter((movie) => movie.score >= minScore && movie.score <= maxScore)
    .filter((movie) => movie.budget >= minBudget && movie.budget <= maxBudget)
    .sort((movie1, movie2) => {
    switch (sortProperty) {
    case "Title":
    if (movie1.title < movie2.title) {
    return sortOrder === "Ascending" ? -1 : 1;
    } else if (movie1.title > movie2.title) {
    return sortOrder === "Ascending" ? 1 : -1;
    } else {
    return 0;
    }
    case "Year":
    if (movie1.year < movie2.year) {
    return sortOrder === "Ascending" ? -1 : 1;
    } else if (movie1.year > movie2.year) {
    return sortOrder === "Ascending" ? 1 : -1;
    } else {
    return 0;
    }
    case "Budget":
    if (movie1.budget < movie2.budget) {
    return sortOrder === "Ascending" ? -1 : 1;
    } else if (movie1.budget > movie2.budget) {
    return sortOrder === "Ascending" ? 1 : -1;
    } else {
    return 0;
    }
    }
    })
    .forEach(renderMovie);
});        