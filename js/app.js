const getPhones = (length) => {
    const inputField = document.getElementById("input-value");
    const inputValue = inputField.value;
    const inputValueLowerCase = inputValue.toLowerCase();
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValueLowerCase}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.length <= 20) {
                displayData(data.data, data.data.length);
            }
            else {
                length = length || data.data.length;
                const slicedData = data.data.slice(0, length);
                displayData(slicedData, data.data.length);
            }
        });
}


const displayData = (phones, resultsNum) => {

    const detailsArea = document.getElementById("details-area");
    detailsArea.textContent = "";

    const resultText = document.getElementById("result-text");

    const rowDiv = document.getElementById("row-div");

    rowDiv.textContent = ""

    if (resultsNum == 0) {
        resultText.innerHTML = `<span>${resultsNum} results found.</span><br><span>Please try again with another keyword</span>`;
        document.getElementById("show-more-btn").classList.add("d-none");
    }
    else {
        phones.forEach(phone => {
            console.log(phone);
            resultText.innerHTML = `<span>${resultsNum} results found.</span>`
            const cardsCol = document.createElement("div");
            cardsCol.classList.add("col-lg-4", "col-md-6", "col-sm-12");
            cardsCol.innerHTML = `
            <div class="card">
                        <img src="${phone.image}" class="card-img-top p-2" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.brand}</p>
                            <a href="#details-area" onclick="getDetails('${phone.slug}')" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
            `;
            rowDiv.appendChild(cardsCol);
        });
        document.getElementById("show-more-btn").classList.toggle("d-none");
    }
}

const getDetails = phoneID => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneID}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

const displayDetails = data => {
    console.log(data);
    const detailsArea = document.getElementById("details-area");
    detailsArea.textContent = "";
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "g-4", "justify-content-center", "align-item-center");
    rowDiv.innerHTML = `
    <div class="col-lg-4 col-md-4 col-sm-12">
                    <img class="w-75" src="${data.image}" alt="">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <h3>Details</h3>
                    <p>Chipset: ${data.mainFeatures.chipSet}</p>
                    <p>Display: ${data.mainFeatures.displaySize}</p>
                    <p>Memory: ${data.mainFeatures.memory}</p>
                    <p>Storage: ${data.mainFeatures.storage}</p>
                    <p>Sensors: ${data.mainFeatures.sensors.join(", ")}</p>
                    <p>Others:
                    ${data.others ? Object.values(data.others).join(", ") : "N/A"}</p>
                    <p class="fw-light fst-italic">Release Date: ${data.releaseDate ? data.releaseDate : "No release date found"}</p>
                </div>
    `
    detailsArea.appendChild(rowDiv);

}