const queryLocationSearch = window.location.search;
// console.log(window.location)
// console.log(window.location.search)
const url_params = new URLSearchParams(queryLocationSearch);
// console.log(url_params)
const id = url_params.get('_id');
let currentDate = url_params.get('currentDate');
// console.log(currentDate)
// let info = data.events.find(i => i._id == id)
// // console.log(info)
let detailEvent = document.getElementById('detailEvent');

// let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

const apiResponse = async () => {
    try {
        const response = await fetch(urlApi)
        let eventsApi = await response.json()
        let amazingApp = await eventsApi
        // console.log(amazingApp)
        let amazingAppEvents = amazingApp.events.find(i => i._id == id);

        detail(amazingAppEvents, currentDate)
        
    } catch (err) {
        console.log(err);
        // alert('Error en la API');
        // ******************************************
        //               READ FILE JSON
        // ******************************************
        // let dataCurrentDate, dataEvents;
        const requestURL = 'static/js/amazingappjson.json';
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            const dateJson = request.response;
            // dataCurrentDate =dateJson.currentDate;
            let amazingAppEvents = dateJson.events.find(i => i._id == id);
            detail(amazingAppEvents, currentDate)
        };
    };
};
// ******************************************
//          CALL ASYNC AWAIT
// ******************************************
apiResponse()

// ******************************************
//                   FUNCTIONS
// ******************************************
function detail(info, currentDate) {
    
    if (currentDate == '1960-01-01') {
        detailEvent.innerHTML = `
        <h3 class="text-center fw-bold text-uppercase"></h3>  
        <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center fw-bold text-uppercase fs-4">${info.name}</h5>
            <p class="card-text"><strong>Category: </strong>${info.category}</p>
            <p class="card-text"><strong>Date: </strong>${info.date}</p>
            <p class="card-text"><strong>Description: </strong>${info.description}</p>
            <p class="card-text"><strong>Place: </strong>${info.place}</p>
            <p class="card-text"><strong>Capacity: </strong>${info.capacity}</p>
            <p class="card-text"><strong>Assistance: </strong>${info.assistance}</p>
            <p class="card-text price"><strong>Price: U$S ${info.price}</strong></p>
            <a href="./index.html" id="backEvent1" class="btn text-white d-flex justify-content-center btnColor">Back</a>
        </div>
    `
    } else if (currentDate < info.date) {
        detailEvent.innerHTML = `
        <h3 class="text-center fw-bold text-uppercase"></h3>  
        <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center fw-bold text-uppercase fs-4">${info.name}</h5>
            <p class="card-text"><strong>Category: </strong>${info.category}</p>
            <p class="card-text"><strong>Date: </strong>${info.date}</p>
            <p class="card-text"><strong>Description: </strong>${info.description}</p>
            <p class="card-text"><strong>Place: </strong>${info.place}</p>
            <p class="card-text"><strong>Capacity: </strong>${info.capacity}</p>
            <p class="card-text"><strong>Assistance: </strong>${info.assistance}</p>
            <p class="card-text price"><strong>Price: U$S ${info.price}</strong></p>
            <a href="./upcoming_events.html" id="backEvent1" class="btn text-white d-flex justify-content-center btnColor">Back</a>
        </div>
    `
    } else if (currentDate >= info.date) {
        detailEvent.innerHTML = `
        <h3 class="text-center fw-bold text-uppercase"></h3>  
        <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center fw-bold text-uppercase fs-4">${info.name}</h5>
            <p class="card-text"><strong>Category: </strong>${info.category}</p>
            <p class="card-text"><strong>Date: </strong>${info.date}</p>
            <p class="card-text"><strong>Description: </strong>${info.description}</p>
            <p class="card-text"><strong>Place: </strong>${info.place}</p>
            <p class="card-text"><strong>Capacity: </strong>${info.capacity}</p>
            <p class="card-text"><strong>Assistance: </strong>${info.assistance}</p>
            <p class="card-text price"><strong>Price: U$S ${info.price}</strong></p>
            <a href="./past_events.html" id="backEvent1" class="btn text-white d-flex justify-content-center btnColor">Back</a>
        </div>
    `
    }

}

