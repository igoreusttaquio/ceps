; (function () {
    const cepInput = document.getElementById("cepInput");
    const cepForm = document.getElementById("cepForm");
    const ceptable = document.getElementById("Ceptable");
    const pErrorMessage = document.getElementById("errorMessage");

    let url = "https://cep.awesomeapi.com.br/json/";

    cepForm.addEventListener("submit", (event) => {
        event.preventDefault();
        findCep(cepInput.value, url);
    })

    function findCep(cepNumber, url) {

        url += cepNumber;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status == 200)) {
                markTable(xhttp.responseText);
            } else {
                errorInfo(xhttp.responseText);
            }
        };

        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function markTable(cepIfoString) {
        const cepIfoObject = JSON.parse(cepIfoString);

        if (cepIfoObject == {}) {
            alert("cep inválido");
        } else {
            cepInfoBody.innerHTML = "";
            for (prop in cepIfoObject) {
                createTable(prop, cepIfoObject[prop]);
            }
        }
    }


    function errorInfo(cepIfoString) {
        const cepIfoObject = typeof cepIfoString == "string" ?
            JSON.parse(cepIfoString) : cepIfoString;

        if (cepIfoObject.message) {
            setStyle(pErrorMessage, 'visible');
            pErrorMessage.textContent = cepIfoObject.message;
            cepInfoBody.innerHTML = "";
        } else {
            pErrorMessage.style.visibility = "hidden";
            pErrorMessage.innerHTML = "";
        }
    }


    function createTable(prop, value) {

        tr = document.createElement("tr");
        tdProp = document.createElement("td");
        tdValue = document.createElement("td");

        tdProp.innerText = prop.split('_').join(' ');
        tdValue.innerText = value;

        tr.appendChild(tdProp);
        tr.appendChild(tdValue);

        cepInfoBody.appendChild(tr);
        setStyle(ceptable, 'visible');
    }

    function setStyle(element, class_) {
        element.classList.add(`${class_}`);
    }

})();