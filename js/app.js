// takes optional size of array and return that amount of products or all products from api response

const getPhones = (length) => {
    document.getElementById("search-results").classList.add("d-none");
    document.getElementById("loading-sec").classList.remove("d-none");
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

// displays the products 
const displayData = (phones, resultsNum) => {

    const detailsArea = document.getElementById("details-area");
    detailsArea.textContent = "";

    const resultText = document.getElementById("result-text");

    const rowDiv = document.getElementById("row-div");

    rowDiv.textContent = ""

    if (resultsNum == 0) {
        resultText.innerHTML = `<span>${resultsNum} results found.</span><br><span>Please try again with another keyword</span>`;
        document.getElementById("show-more-btn").classList.add("d-none");
        document.getElementById("loading-sec").classList.add("d-none");
        document.getElementById("search-results").classList.remove("d-none");
    }
    else {
        phones.forEach(phone => {
            console.log(phone);
            resultText.innerHTML = `<span>${resultsNum} results found.</span>`
            const cardsCol = document.createElement("div");
            cardsCol.classList.add("col-lg-4", "col-md-6", "col-sm-12", "justify-content-center");
            cardsCol.innerHTML = `
            <div class="card shadow">
            <div class= "text-center">
                        <img src="${phone.image}" class="w-75 p-2" alt="">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.brand}</p>
                            <a href="#details-area" onclick="getDetails('${phone.slug}')" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
            `;
            rowDiv.appendChild(cardsCol);
        });
        if (phones.length == 20) {
            document.getElementById("show-more-btn").classList.remove("d-none");
        }
        else {
            document.getElementById("show-more-btn").classList.add("d-none");
        }
        document.getElementById("loading-sec").classList.add("d-none");
        document.getElementById("search-results").classList.remove("d-none");
    }
}

// gets specific phone details
const getDetails = phoneID => {
    document.getElementById("loading-sec").classList.remove("d-none");
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneID}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

// displays the details
const displayDetails = data => {
    console.log(data);
    const detailsArea = document.getElementById("details-area");
    detailsArea.textContent = "";
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "g-4", "justify-content-center", "border", "border-danger", "border-3", "rounded-3");
    rowDiv.innerHTML = `
    <div class="col-lg-4 col-md-4 col-sm-12 text-center">
                    <img class="w-75" src="${data.image}" alt="">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <h5>Details</h5>
                    <h3>${data.name}</h3>
                    <p>${data.brand}</p>
                    <p><span class="fw-bold">Chipset:</span> ${data.mainFeatures.chipSet}</p>
                    <p><span class="fw-bold">Display:</span> ${data.mainFeatures.displaySize}</p>
                    <p><span class="fw-bold">Memory:</span> ${data.mainFeatures.memory}</p>
                    <p><span class="fw-bold">Storage:</span> ${data.mainFeatures.storage}</p>
                    <p><span class="fw-bold">Sensors:</span> ${data.mainFeatures.sensors.join(", ")}</p>
                    <p><span class="fw-bold">Others:</span>
                    ${data.others ? `<br><span>WLAN: ${data.others.WLAN}</span><br>
                    <span>Bluetooth: ${data.others.Bluetooth}</span><br>
                    <span>GPS: ${data.others.GPS}</span><br>
                    <span>NFC: ${data.others.NFC}</span><br>
                    <span>Radio: ${data.others.Radio}</span><br>
                    <span>USB: ${data.others.USB}</span>` : "N/A"}</p>
                    <p class="fw-light fst-italic">Release Date: ${data.releaseDate ? data.releaseDate : "No release date found"}</p>
                </div>
    `;
    detailsArea.appendChild(rowDiv);
    document.getElementById("loading-sec").classList.add("d-none");
}