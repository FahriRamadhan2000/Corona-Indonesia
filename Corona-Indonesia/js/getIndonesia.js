API();

async function API() {
    let kawalcorona = await getData('https://api.kawalcorona.com/');
    kawalcorona.forEach(el => {
        if(el['attributes']['Country_Region'] == 'Indonesia'){
            kawalcorona = el['attributes'];
        }
    });
    document.querySelector('#kasus').innerHTML = kawalcorona.Confirmed;
    document.querySelector('#sembuh').innerHTML = kawalcorona.Recovered;
    document.querySelector('#dirawat').innerHTML = kawalcorona.Active;
    document.querySelector('#meninggal').innerHTML = kawalcorona.Deaths;
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
            function update(detik) {
                var t = new Date(1970, 0, 1);
                t.setSeconds(detik);
                return t;
            };
            const updateWaktu = update(parseInt(kawalcorona['Last_Update'])/1000).toString();
            console.log(updateWaktu);
            const kasus1 = parseInt((kawalcorona.Confirmed));
            const kasus2 = parseInt(covid19[covid19.length - i].Confirmed);
            const sembuh1 = parseInt((kawalcorona.Recovered));
            const sembuh2 = parseInt(covid19[covid19.length - i].Recovered);
            const dirawat1 = parseInt((kawalcorona.Active));
            const dirawat2 = parseInt(covid19[covid19.length - i].Active);
            const meninggal1 = parseInt((kawalcorona.Deaths));
            const meninggal2 = parseInt(covid19[covid19.length - i].Deaths);
            const kasusNaik = kasus1 - kasus2;
            const sembuhNaik = sembuh1 - sembuh2;
            const dirawatNaik = dirawat1 - dirawat2;
            const meninggalNaik = meninggal1 - meninggal2;
            if (kasusNaik !== 0 && sembuhNaik !== 0 && dirawatNaik !== 0 && meninggalNaik !== 0) {
                document.querySelector('.kasusNaik').innerHTML = '+' + kasusNaik;
                document.querySelector('.sembuhNaik').innerHTML = '+' + sembuhNaik;
                if (dirawatNaik >= 0) { document.querySelector('.dirawatNaik').innerHTML = '+' + dirawatNaik; }
                else { document.querySelector('.dirawatNaik').innerHTML = dirawatNaik; }
                document.querySelector('.meninggalNaik').innerHTML = '+' + meninggalNaik;
                document.querySelector('.update').innerHTML = `*Diupdate: ${updateWaktu}`;
                break;
            }
        }
    }
}

