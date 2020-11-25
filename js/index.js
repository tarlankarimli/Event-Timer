const titleValue = document.querySelector('#title');
const descValue = document.querySelector('#description');
const dateValue = document.querySelector('#date');
const timeValue = document.querySelector('#time');   
const eventBtn = document.querySelector('.btn-add-event');
const eventsList = document.querySelector('.events');
const formHeading = document.querySelector('.form-heading');
const countDown = document.querySelector('.event-time-bg');
const showMonths = document.querySelector('.months');
const showDays = document.querySelector('.days');
const showHours = document.querySelector('.hours');
const showMinutes = document.querySelector('.minutes');
const showSeconds = document.querySelector('.seconds');
let evenData;
let currentIndex = 0;
let months;
let days;
let hours;
let minutes;
let seconds;
const calendar = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// check is data existed
// localStorage.removeItem('eventStorage')
window.onload = ()=> {
    if (localStorage.getItem('eventStorage') == null) {       
        eventData = [];
    } else {
        eventData = JSON.parse(localStorage.getItem('eventStorage'));
        currentIndex = eventData.length
        showEvents();
    }
}
//  check item is validate
const checkValidate = () => {
    if ((titleValue.value && dateValue.value && timeValue.value) == '') {
    formHeading.textContent = 'Fill the gaps please';
    formHeading.style.color = 'red';
    console.log(eventData)
    return false;
    }
    formHeading.textContent = 'Create new event';
    formHeading.style.color = '#fff';    
}

eventBtn.addEventListener('click', ()=> {
    if(checkValidate()==false) {
        return
    }
        addEvent();
        showEvents();
})

const addEvent = () => {
    let eventItem = {
        id: currentIndex,
        title: titleValue.value,
        description: descValue.value,
        date: `${dateValue.value},${timeValue.value}`
    }
    currentIndex++;
    eventData.push(eventItem)
    localStorage.setItem('eventStorage', JSON.stringify(eventData));

    titleValue.value = '';
    descValue.value = '';
    dateValue.value = '';
    timeValue.value = '';
}

const showEvents = () => {
    eventsList.textContent= '';
    eventData.map((data) => {
        let inputDate = new Date(data.date);
        addEventItem(data.id, data.title, inputDate.getDate(), calendar[inputDate.getMonth()])
    })
}
// creating new event item elements and setting attributes
const addEventItem = (id, title, date, month) => {
    const eventMonth = document.createElement('span');
    eventMonth.setAttribute('class','event-month');

    const eventDay = document.createElement('div');
    eventDay.setAttribute('class','event-day');

    const eventDate = document.createElement('div');
    eventDate.setAttribute('class','event-date');

    const eventItemTitle = document.createElement('h2');
    eventItemTitle.setAttribute('class','event-item-title');

    const eventItem = document.createElement('div');
    eventItem.setAttribute('class','event-item');
    eventItem.setAttribute('id', id);

    eventItem.addEventListener('click', ()=> {
        countDown.className = 'event-time-bg time-animation';
        countDown.style.top = 0;
        convertInterval(id);

    })

    eventMonth.textContent = month;
    eventDay.textContent = date;
    eventItemTitle.textContent = title;

    eventDay.appendChild(eventMonth);
    eventDate.appendChild(eventDay);
    eventItem.appendChild(eventDate);
    eventItem.appendChild(eventItemTitle);
    eventsList.appendChild(eventItem);    
}

const convertInterval = (id) => {
    setInterval(() => {
        let currentDate = new Date();
        let interval = new Date(eventData[id].date) - currentDate;
        console.log(interval)
        months = Math.floor(interval / (1000 * 60 * 60 * 24));
        days = Math.floor(interval / (1000*60*60*24)) % 7
        hours = Math.floor( interval /3600000);
        minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((interval % (1000 * 60)) / 1000);
    
        getItemInfo(days, hours, minutes, seconds, months);
       }, 1000);
    
    
}
const getItemInfo = (days, hours, minutes, seconds,months) => {
    showMonths.textContent = months;
    showDays.textContent = days;
    showHours.textContent = hours;
    showMinutes.textContent = minutes;
    showSeconds.textContent = seconds;
}
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);
