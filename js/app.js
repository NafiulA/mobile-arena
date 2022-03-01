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
        })
}


const displayData = (phones, resultsNum) => {

    const resultText = document.getElementById("result-text");

    const rowDiv = document.getElementById("row-div");

    rowDiv.textContent = ""

    if (resultsNum == 0) {
        resultText.innerHTML = `<span>${resultsNum} results found.</span><br><span>Please try again with another keyword</span>`;
    }
    else {


        phones.forEach(phone => {
            console.log(phone);
            resultText.innerHTML = `<span>${resultsNum} results found.</span>`
            const cardsCol = document.createElement("div");
            cardsCol.classList.add("col-lg-4", "col-md-6", "col-sm-12");
            cardsCol.innerHTML = `
            <div class="card">
                        <img src="${phone.image}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.brand}</p>
                            <a href="#" onclick="displayDetails(${phone.slug})" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
            `;
            rowDiv.appendChild(cardsCol);
        });
        document.getElementById("show-more-btn").classList.remove("d-none");
    }

}