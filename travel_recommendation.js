const recommendationListPromise = fetch("./travel_recommendation_api.json").then(r => r.json());
const recommendationListNode = document.getElementById("recommendation_list");

function onClear() {
    recommendationListNode.innerHTML = "";
}

function displayRecommendations(locationList) {
    onClear();
    for (let loc of locationList) {
        const divNode = document.createElement("div");
        divNode.classList.add("recommendation");

        const imgNode = document.createElement("img");
        imgNode.setAttribute("src", loc.imageUrl);
        divNode.appendChild(imgNode);

        const tz_options = { timeZone: loc.tz, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const loc_time = new Date().toLocaleTimeString('en-US', tz_options);
        
        const nameNode = document.createElement("h3");
        nameNode.classList.add("recommendation_name");
        nameNode.textContent = loc.name + " - " + loc_time;
        divNode.appendChild(nameNode);


        const descrNode = document.createElement("p");
        descrNode.classList.add("recommendation_descr");
        descrNode.textContent = loc.description;
        divNode.appendChild(descrNode);

        recommendationListNode.appendChild(divNode);
    }
}

function displayNoResult() {
    recommendationListNode.innerHTML = "<h2 class='.recommendation'>No Result found</h2>";
}

async function onSearch() {
    const recommendations = await recommendationListPromise;
    const searchInput = document.getElementById("search_bar").value.toLowerCase();
    if (searchInput === "beach" || searchInput === "beaches") {
        displayRecommendations(recommendations["beaches"]);
    } else if (searchInput == "temple" || searchInput == "temples") {
        displayRecommendations(recommendations["temples"]);
    } else if (searchInput === "country" || searchInput === "countries") {
        let cityList = [];
        for (let country of recommendations["countries"]) {
            cityList.push(...country.cities);
        }
        displayRecommendations(cityList);
    } else {
        displayNoResult();
    }
}