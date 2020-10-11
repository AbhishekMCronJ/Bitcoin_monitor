class EasyHTTP {

    getData(url) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(url)
            .then(res => res.json())
            .then(function(data) {
                let output = '';
                data.forEach((element) => {
                    output += `<option value="${element.currency}">${element.currency}</option>`
                });
                document.getElementById('select-curr').innerHTML = output;
            })
            .catch(err => console.log(err))
    }
    getStaticData(url) {
        fetch(url)
            .then(res => res.json())
            .then(function(data) {
                let usdDesc = `${data.bpi.USD.description}`;
                let gbpDesc = `${data.bpi.GBP.description}`;
                let eurDesc = `${data.bpi.EUR.description}`;
                //let aedDesc = `${data.bpi.AED.description}`;

                let usdRate = `${data.bpi.USD.rate}`;
                let gbpRate = `${data.bpi.GBP.rate}`;
                let eurRate = `${data.bpi.EUR.rate}`;
                //let aedRate = `${data.bpi.AED.rate}`;

                document.getElementById('usd-desc').innerHTML = usdDesc;
                document.getElementById('gbp-desc').innerHTML = gbpDesc;
                document.getElementById('eur-desc').innerHTML = eurDesc;
                //document.getElementById('dynamic-desc').innerHTML = aedDesc;

                document.getElementById('usd-rate').innerHTML = usdRate;
                document.getElementById('gbp-rate').innerHTML = gbpRate;
                document.getElementById('eur-rate').innerHTML = eurRate;
                // document.getElementById('dynamic-rate').innerHTML = aedRate;
            })
            .catch(err => console.log(err))
    }

    async getSelectedData(url) {
        const response = await fetch(url)
        const data = await response.json();
        return data;
    }
}


const http = new EasyHTTP;

//http.getData('https://api.coindesk.com/v1/bpi/supported-currencies.json');
http.getData("supported-currencies.json");
http.getStaticData('https://api.coindesk.com/v1/bpi/currentprice.json');
let selVal;
var select = document.getElementById('select-curr');
select.addEventListener('change', (e) => {
    selVal = e.target.value;
    http.getSelectedData(`https://api.coindesk.com/v1/bpi/currentprice/${selVal}.json`).then(users => {
        let dat = Object.entries(users.bpi)[1][1].description;
        let dat1 = Object.entries(users.bpi)[1][1].rate;
        document.getElementById('dynamic-desc').innerHTML = dat;
        document.getElementById('dynamic-rate').innerHTML = dat1;
    });;

});