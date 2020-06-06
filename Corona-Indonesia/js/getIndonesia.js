API();

async function API() {
    const kawalcorona = await getData('https://api.kawalcorona.com/indonesia');
    document.querySelector('#kasus').innerHTML = kawalcorona[0].positif;
    document.querySelector('#sembuh').innerHTML = kawalcorona[0].sembuh;
    document.querySelector('#dirawat').innerHTML = kawalcorona[0].dirawat;
    document.querySelector('#meninggal').innerHTML = kawalcorona[0].meninggal;
    const covid19 = await getData('https://api.covid19api.com/total/country/indonesia');
    updateNaik(kawalcorona, covid19);
}

function getData(url) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return fetch(proxyurl + url)
        .then(response => response.json())
        .then(response => response).
        catch(error => {
            error = 'error';
        });
}

function updateNaik(kawalcorona, covid19) {
    if (covid19 !== undefined) {
        for (let i = 1; i < 3; i++) {
            const kasus1 = parseInt((kawalcorona[0].positif).replace(',', ''));
            const kasus2 = parseInt(covid19[covid19.length - i].Confirmed);
            const sembuh1 = parseInt((kawalcorona[0].sembuh).replace(',', ''));
            const sembuh2 = parseInt(covid19[covid19.length - i].Recovered);
            const dirawat1 = parseInt((kawalcorona[0].dirawat).replace(',', ''));
            const dirawat2 = parseInt(covid19[covid19.length - i].Active);
            const meninggal1 = parseInt((kawalcorona[0].meninggal).replace(',', ''));
            const meninggal2 = parseInt(covid19[covid19.length - i].Deaths);
            const kasusNaik = kasus1 - kasus2;
            const sembuhNaik = sembuh1 - sembuh2;
            const dirawatNaik = dirawat1 - dirawat2;
            const meninggalNaik = meninggal1 - meninggal2;
            if (kasusNaik !== 0) {
                document.querySelector('.kasusNaik').innerHTML = '+' + kasusNaik;
                document.querySelector('.sembuhNaik').innerHTML = '+' + sembuhNaik;
                if (dirawatNaik >= 0) { document.querySelector('.dirawatNaik').innerHTML = '+' + dirawatNaik; }
                else { document.querySelector('.dirawatNaik').innerHTML = dirawatNaik; }
                document.querySelector('.meninggalNaik').innerHTML = '+' + meninggalNaik;
                break;
            }
        }
    }
}

