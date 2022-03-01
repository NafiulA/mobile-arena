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

    const resultsContainer = document.getElementById("search-results");
    const resultText = document.getElementById("result-text");

    const rowDiv = document.getElementById("row-div");
    resultsContainer.textContent = "";

    if (resultsNum == 0) {

    }
}