; (function () {
    function getDomElements() {
        return {
            cepInput: document.getElementById("cepInput"),
            cepForm: document.getElementById("cepForm"),
            ceptable: document.getElementById("Ceptable"),
            pErrorMessage: document.getElementById("errorMessage")
        }
    }

    const domElements = getDomElements();

    function createTable(prop, value) {

        tr = document.createElement("tr");
        tdProp = document.createElement("td");
        tdValue = document.createElement("td");

        tdProp.innerText = prop.split('_').join(' ');
        tdValue.innerText = value;

        tr.appendChild(tdProp);
        tr.appendChild(tdValue);

        cepInfoBody.appendChild(tr);
        setStyle(domElements.ceptable, 'visible');
        removeStyle(domElements.ceptable, 'hidden');
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

    function setStyle(element, class_) {
        element.classList.add(`${class_}`);
    }

    function removeStyle(element, class_) {
        element.classList.remove(`${class_}`);
    }

    function errorInfo(cepIfoString) {
        const cepIfoObject = typeof cepIfoString == "string" ?
            JSON.parse(cepIfoString) : cepIfoString;

        if (cepIfoObject.message) {
            removeStyle(domElements.pErrorMessage, 'hidden');
            setStyle(domElements.ceptable, 'hidden');
            setStyle(domElements.pErrorMessage, 'visible');
            domElements.pErrorMessage.textContent = cepIfoObject.message;
            cepInfoBody.innerHTML = "";
        } else {
            removeStyle(domElements.pErrorMessage, 'visible');
            setStyle(domElements.pErrorMessage, 'hidden');
            domElements.pErrorMessage.innerHTML = "";
        }
    }

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
        if (!xhttp.send()) {
            alert('CEP Iválido ou inexistente.');
        }
    }

    function run() {
        let url = "https://cep.awesomeapi.com.br/json/";
        domElements.cepForm.addEventListener("submit", (event) => {
            event.preventDefault();
            findCep(domElements.cepInput.value, url);
        })
    }

    run();
})();