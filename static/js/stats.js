let eStatistics = document.getElementById('eStatistics');
let upcomingEents = document.getElementById('upcomingEents');
let pastEvents = document.getElementById('pastEvents');
let categoriesReduce = [];
let upcomingCapacity = 0;
let upcomingEstimate = 0;
let pastRevenues = 0.00;
let pastCapacity = 0;
let pastAssistance = 0;
let upcomingPercentage = 0.00;
let pastPercentage = 0.00;
let upcomingRevenues = 0.00;
let revenues = 0.00;
let upcomingCategory;

let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

const apiResponse = async () => {
    try {
        const response = await fetch(urlApi)
        let eventsApi = await response.json()
        let amazingApp = await eventsApi
        // ******************************************
        //        CALL FUNCTIONS SYNCHRONIC
        // ******************************************
        resultPercentage(amazingApp.events, amazingApp.currentDate);
        statisticsByCategories(amazingApp.events, amazingApp.currentDate);

    } catch (err) {
        console.log(err)
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

            // ******************************************
            //        CALL FUNCTIONS SYNCHRONIC
            // ******************************************
            resultPercentage(dataEvents, dataCurrentDate);
            statisticsByCategories(dataEvents, dataCurrentDate);
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
// CALCULATE PERCENTAGE
function calculatePercentage(assistance, capacity) {
    // (asistenca * 100)/capacidad
    let result = (assistance * 100)/capacity;
    return result;
};

// TABLE EVENTS STATISTICS
function resultPercentage(events, currentDate) {

    let highestPercentage = 0.00;
    let highestEvent;
    let lowestPercentage = 100.00;
    let lowestEvent;
    let percentage = 0.0;
    let largerCapacity = 0;
    let largerEvent;

    for (i in events) {
        if (currentDate >= events[i].date) {
            
            // percentage = (events[i].assistance*100)/events[i].capacity)
            percentage = calculatePercentage(events[i].assistance, events[i].capacity)

            if (highestPercentage < percentage) {
                highestPercentage = percentage.toFixed(2);
                highestEvent = events[i].name;
            };

            if (lowestPercentage > percentage){
                lowestPercentage = percentage.toFixed(2);
                lowestEvent = events[i].name;
            };

            if (largerCapacity < events[i].capacity) {
                largerCapacity = events[i].capacity;
                largerEvent = events[i].name;
            };
        };
    };

    eStatistics.innerHTML += `
        <tr>
            <td>${highestEvent} ${highestPercentage} %</td>
            <td>${lowestEvent} ${lowestPercentage} %</td>
            <td>${largerEvent} ${largerCapacity}</td>
        </tr>
    `
}

// UPCOMING EVENTS STATISTICS BY CATEGORY
//                 AND
// PAST EVENTS STATISTIC BY CATEGORY
function statisticsByCategories(events, currentDate){

    let categoryEvenmtsRepeat = events.map(item => item.category);

    let categoriesReduce = new Set(categoryEvenmtsRepeat.sort(function (a, b) {
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        return 0;
    }));
    
    // ARRAY UPCOMING EVENTS
    let upcomingEventsArray = events.filter(item => { return currentDate < item.date });
    // ARRAY PAST EVENTS
    let pastEventsArray = events.filter(item => { return currentDate >= item.date });

    categoriesReduce.forEach(itemCategory => {
        
        let flag = upcomingEventsArray.some(iArray => iArray.category == itemCategory);

        if (flag == true) {

            upcomingEventsArray.forEach(eve => {

                if (eve.category == itemCategory) {
                    upcomingRevenues += eve.estimate * eve.price;
                    upcomingCapacity += eve.capacity;
                    upcomingEstimate += eve.estimate;
                    upcomingCategory = eve.category;  
                };
            });

            upcomingPercentage = calculatePercentage(upcomingEstimate, upcomingCapacity);
                
            upcomingEents.innerHTML += `
                <tr>
                    <td>${upcomingCategory}</td>
                    <td>U$S ${upcomingRevenues}</td>
                    <td>${upcomingPercentage.toFixed(2)} %</td>
                </tr>
            `
            upcomingCapacity = 0, upcomingEstimate = 0, upcomingPercentage = 0,  upcomingRevenues = 0, upcomingCategory = '';
        }

        let flag2 = pastEventsArray.some(iArray2 => iArray2.category == itemCategory);

        if (flag2 == true) {

            pastEventsArray.forEach(evePast => {

                if (evePast.category == itemCategory) {
                    pastRevenues += evePast.assistance * evePast.price;
                    pastCapacity += evePast.capacity;
                    pastAssistance += evePast.assistance;
                    PastCategory = evePast.category;
                };
            });

            pastPercentage = calculatePercentage(pastAssistance, pastCapacity);

            pastEvents.innerHTML += `
                <tr>
                    <td>${PastCategory}</td>
                    <td>U$S ${pastRevenues} </td>
                    <td>${pastPercentage.toFixed(2)} %</td>
                </tr>
            `
            
            pastCapacity = 0, pastAssistance = 0, pastPercentage = 0, pastRevenues = 0, PastCategory = '';

        }
    });
    
};
