function loadAllCountries() {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            let tblCountries = document.getElementById("tbl");

            let tblBody = `<tr>
                            <th>Name</th>
                            <th>Flag</th>
                        </tr>`;

            data.forEach(element => {
                tblBody += `<tr>
                                <td>${element.name.common}</td>
                                <td><img src="${element.flags.png}" alt="${element.name.common} flag" style="width: 50px;"></td>
                            </tr>`;
            });

            tblCountries.innerHTML = tblBody;
        })
        .catch(error => console.error('Error loading countries:', error));
}

function searchCountry() {
    let searchValue = document.getElementById("txtSearchValue").value.trim();

    if (searchValue === "") {
        alert("Please enter a country name.");
        return;
    }

    let officialName = document.getElementById("officialName");
    let name = document.getElementById("name");
    let img = document.getElementById("img");

    fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 404) {
                alert("Country not found. Please try again.");
                return;
            }

            const country = data[0];
            officialName.innerText = country.name.official;
            name.innerText = country.name.common;
            img.innerHTML = `<img src="${country.flags.png}" alt="${country.name.common} flag" style="width: 100px;">`;

            displayCountryDetails(country);
        })
        .catch(error => console.error('Error fetching country:', error));
}

function displayCountryDetails(country) {
    const table = document.getElementById('tbl');
    table.innerHTML = `
        <tr>
            <th>Capital</th>
            <td>${country.capital ? country.capital.join(', ') : 'N/A'}</td>
        </tr>
        <tr>
            <th>Region</th>
            <td>${country.region}</td>
        </tr>
        <tr>
            <th>Subregion</th>
            <td>${country.subregion}</td>
        </tr>
        <tr>
            <th>Population</th>
            <td>${country.population.toLocaleString()}</td>
        </tr>
        <tr>
            <th>Area</th>
            <td>${country.area.toLocaleString()} km²</td>
        </tr>
    `;
}

document.addEventListener("DOMContentLoaded", loadAllCountries);
