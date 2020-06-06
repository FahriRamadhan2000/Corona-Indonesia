const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'https://api.kawalcorona.com/indonesia/provinsi';
let array = [];

fetch(proxyurl + url)
    .then(response => response.json())
    .then(response => {
        let html = [];
        response.forEach(data => {
            array.push(data);
            html.push(card(data));
        });
        //array html dijadikan string, dipecah menjad array dengan pemisah "," , kemudian di gabung menjadi string
        html = html.toString().split(',').join('');
        document.querySelector('#info').innerHTML = html;
    })
    .catch(error => console.log(error));
document.querySelector('.inputProvinsi').addEventListener('keyup', function () {
    let input = document.querySelector('.inputProvinsi');
    let html = [];
    array.forEach(data => {
        let x = data.attributes.Provinsi.toLowerCase();
        if (x.includes(input.value.toLowerCase())) {
            html.push(card(data));
        }
    });
    html = html.toString().split(',').join('');
    document.querySelector('#info').innerHTML = html;
});
function card(data) {
    return `
                <div class="box">
                    <h5>${data.attributes.Provinsi}</h5>
                    <div class="row d-flex mb-0">

                        <div class="col text-center">
                            <img src="images/icons/disease.svg" alt="Kasus" width="50" title="Kasus">
                            <p><b class="text-warning">${data.attributes.Kasus_Posi}</b></p>
                        </div>

                        <div class="col text-center">
                            <img src="images/icons/recover.svg" alt="Kasus" width="50" title="Kasus">
                            <p><b class="text-success">${data.attributes.Kasus_Semb}</b></p>
                        </div>
                        
                        <div class="col text-center">
                            <img src="images/icons/death.svg" alt="Kasus" width="50" title="Kasus">
                            <p><b class="text-danger">${data.attributes.Kasus_Meni}</b></p>
                        </div>

                    </div>
                    <hr>
                </div>
            `
;}