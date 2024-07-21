var recommendations = null;

function clearRecommendations() {

}

function displayRecommendations(locationList) {

}

function displayNoResult() {

}

function onSearch() {
    const searchInput = document.getElementById("search_bar").value.toLowerCase();
    if (searchInput === "beach" || searchInput === "beaches") {
        displayRecommendations(recommendations["beaches"]);
    } else if (searchInput == "temple" || searchInput == "temples") {
        displayRecommendations(recommendations["temples"]);
    } else if (searchInput === "country" || searchInput === "countries") {
        displayRecommendations(recommendations["countries"]);
    } else {
        displayNoResult();
    }
}

window.onload = async function (event) {
    recommendations = await fetch("./travel_recommendation_api.json").then(r => r.json());
}