function emailInit() {
    emailjs.init('FRIz7ePDvgzvEl_Cc');
}
emailInit();

window.onload = function() {
    document.getElementById('itinerary-form').addEventListener('submit', function(event) {
        event.preventDefault();

        this.contact_number.value = Math.random() * 100000 | 0;
        this.from_name.value = 'SightCity Travel';
        this.message.value = `Are you ready for your trip to <h3 style ="color: purple">${this.destination.value}</h3>\nfrom <b>${this.start_date.value}</b> to <b>${this.end_date.value}</b>\nYou will be staying at\n<h6 style="color: aqua">${this.hotel.value}</h6>`;

        emailjs.sendForm('service_e25c33t', 'trip_itinerary', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
}

//date function
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

//Input trip dates and activities
function emailFormat(trip, activities) {
    const start_date = trip.start_date;
    const end_date = trip.end_date;
    const tripDates = getDates(start_date, end_date)
    let tableTextArr = []
    // let tableRowsArr = []
    //Render table headers with the dates of the triip
    for (let i=0; i < tripDates.length; i++) {
        tableTextArr.push(`<tr style="border: 1px solid black;"><th style="border: 1px solid black;">${tripDates[i]}</th></tr>`);
    }
    //Creates table data tag with the image, name and address of the activity if the activity date matches the trip date in the calendar
    for (let i=0; i<tripDates.length; i++) {
        for (let j=0; j<activities.length; j++) {
            if(activities[j].activity_date == tripDates[i]) {
                tableTextArr[i] + `<tr><img src="${activities[i].activity_img}">\n <td>${activities[i].activity_name}\n${activities[i].activity_address}\n${activities[i]}</td></tr>`
            }
        }
    }
}

//include in whatever page this will be implemented in, so probably finalpage.handlebars
//<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>