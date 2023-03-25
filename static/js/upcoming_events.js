let inputSearchCards = document.querySelector('.searchCards');
let checkBoxCategories = document.getElementById('cBCategories');
const cardsAllEvents = document.getElementById('cardsAllEvents');
let btnCleanOffInput = document.getElementById('btnCleanOff');
let orderEvents = [];

// let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

const apiResponse = async () => {
    try {
        const response = await fetch(urlApi)
        let eventsApi = await response.json()
        let amazingApp = await eventsApi
        // ******************************************
        //        CALL FUNCTIONS SYNCHRONIC
        // ******************************************
        cards(amazingApp.events, amazingApp.currentDate);
        checkBox(amazingApp.events);
        // ******************************************
        //                  EVENTS
        //               MEGA  FILTER
        // ******************************************
        // SEARCH CARDS
        function megaFilter() {
            let cardsResult = serchText(amazingApp.events, inputSearchCards.value);
            let filterCheckBox = searchCheckBoxCategories(cardsResult);
            cards (filterCheckBox, amazingApp.currentDate);
        }
        inputSearchCards.addEventListener('input', megaFilter);
        checkBoxCategories.addEventListener('change', megaFilter);
        // BUTTON CLEAR ALL
        btnCleanOffInput.addEventListener('click', () => {
            inputSearchCards.value = '';
            inputSearchCards.focus();
            megaFilter();
        });

    } catch (err) {
        console.log(err);
        // alert('Error en la API');
        // ******************************************
        //               READ FILE JSON
        // ******************************************
        let dataCurrentDate, dataEvents;
        const requestURL = 'static/js/amazingappjson.json';
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            const dateJson = request.response;
            dataCurrentDate =dateJson.currentDate;
            dataEvents = dateJson.events;

            cards(dataEvents, dataCurrentDate);
            checkBox(dataEvents);
            // ******************************************
            //                  EVENTS
            //               MEGA  FILTER
            // ******************************************
            // SEARCH CARDS
            function megaFilter() {
                let cardsResult = serchText(dataEvents, inputSearchCards.value);
                let filterCheckBox = searchCheckBoxCategories(cardsResult);
                cards (filterCheckBox, dataCurrentDate);
            }
            inputSearchCards.addEventListener('input', megaFilter);
            checkBoxCategories.addEventListener('change', megaFilter);
            // BUTTON CLEAR ALL
            btnCleanOffInput.addEventListener('click', () => {
                inputSearchCards.value = '';
                inputSearchCards.focus();
                megaFilter();
            });
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
function cards (events, currentDate) {

    let upcomingEventsArray = events.filter(item => { return currentDate < item.date });

    let template = "";
    
    if(events.length == 0){
        cardsAllEvents.innerHTML = `
        <div class="container mt-3">
            <div class="alert alert-warning fs-5 text-center" role="alert">
                No se han encontrado datos para mostrar!
            </div>
        </div>
        `
    } else {

        upcomingEventsArray.forEach (i => {
            template += `
                <div class="col mb-4" id="${i._id}">
                    <div class="card">
                        <img class="imgSize card-img-top" src="${i.image}" alt="...">
                        <div class="card-body">
                            <h3 class="card-title d-flex justify-content-center">${i.name}</h3>
                            <p class="card-text"><strong>Category: </strong>${i.category}</p>
                            <p class="card-text"><strong>Description: </strong>${i.description}</p>
                            <p class="card-text price"><strong>Price: U$S ${i.price}</strong></p>
                        </div>
                        <div class="d-grid gap-2">
                            <a href="./details.html?_id=${i._id}&currentDate=${currentDate}" class="btn text-white btnColor">Go to Event</a>
                        </div>
                    </div>
                </div>
            `
        });
        cardsAllEvents.innerHTML = template;
    };
};

// SEARCH CARDS
function serchText (arrayEvents, textInput){
    let arrayFiltrado = arrayEvents.filter(i => i.name.toLowerCase().includes(textInput.toLowerCase()));
    return arrayFiltrado;
};

// CREATE CHECKBOX
function checkBox(events) {

    let categoryEvenmtsRepeat = events.map(i => i.category);

    let orderEvents = new Set(categoryEvenmtsRepeat.sort(function (a, b) {
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        return 0;
    }));
    
    orderEvents.forEach(i => {
        checkBoxCategories.innerHTML  += 
        `
            <div>
                <input class="form-check-input" type="checkbox" value="${i}" id="${i}">
                <label class="form-check-label" for="${i}">${i}</label>
            </div>
        `
    });

};

// FILTER CHECKBOXES
function searchCheckBoxCategories(arrayEvents) {
    
    let checkBoxes= document.querySelectorAll("input[type='checkbox']");
    // console.log(checkBoxes)
    let arrayListCheckBoxes = Array.from(checkBoxes);
    // console.log(arrayListCheckBoxes)
    let chechedCheckBoxes = arrayListCheckBoxes.filter(i => i.checked);
    // console.log(chechedCheckBoxes)
    if (chechedCheckBoxes.length == 0) {
        return arrayEvents;
    }
    let valueCheckBoxes = chechedCheckBoxes.map(i => i.value);
    // // console.log(valueCheckBoxes)
    let arrayFilter = arrayEvents.filter(i => valueCheckBoxes.includes(i.category));
    // console.log(arrayFilter);
    return arrayFilter;

};
