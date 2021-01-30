; (function () {
    const cepInput = document.getElementById("cepInput");
    const cepForm = document.getElementById("cepForm");
    const cepFindButton = document.getElementById("cepFindButton");
    const cepInfoTable = document.getElementById("cepInfo");

    let url = "https://cep.awesomeapi.com.br/json/";

    cepForm.addEventListener("submit", (event) => {
        event.preventDefault();
        findCep(32210160, url);
    })

    function findCep(cepNumber, url) {

        url += cepNumber;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (xhttp.responseText) {
                    markTable(xhttp.responseText);
                }
            }
        };

        try {
            xhttp.open("GET", url, true);
            xhttp.send();
        } catch (e) {
            markTable("{}");
        }
    }




})()