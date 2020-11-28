// variables
const titleValue = document.querySelector('#title');
const descValue = document.querySelector('#description');
const dateValue = document.querySelector('#date');
const timeValue = document.querySelector('#time');   
const eventBtn = document.querySelector('.btn-add-event');
const eventsList = document.querySelector('.events');
const formHeading = document.querySelector('.form-heading');
const showYears = document.querySelector('.years');
const showMonths = document.querySelector('.months');
const showDays = document.querySelector('.days');
const formModal = document.querySelector('.form-container');
const showHours = document.querySelector('.hours');
const showMinutes = document.querySelector('.minutes');
const showSeconds = document.querySelector('.seconds');
const countDown = document.querySelector('.event-time-bg');
const eventItemTitle = document.querySelector('.event-item-title');
const eventDescription = document.querySelector('.event-desc');
const removeItem = document.querySelector('.remove-btn');
const menuBar = document.querySelector('.menu-bar');
const eventTimeModal = document.querySelector('.event-item-time');
let evenData;
let years;
let months;
let days;
let hours;
let minutes;
let seconds;
const calendar = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// check is data existed
window.onload = checkData = ()=> {
    if (localStorage.getItem('eventStorage') == null) {       
        eventData = [];
    } else {
        eventData = JSON.parse(localStorage.getItem('eventStorage'));
        showEvents();    
    }
}

//  check item is validate
const checkValidate = () => {
    if ((titleValue.value && dateValue.value && timeValue.value) == '') {
    formHeading.textContent = 'Fill the gaps please';
    formHeading.style.color = 'red';
    return false;
    }
    formHeading.textContent = 'Create new event';
    formHeading.style.color = '#fff';    
}

// remove event item
removeItem.addEventListener('dragover', (e)=>{e.preventDefault()})
removeItem.addEventListener('drop', (e) => {
    e.preventDefault();
    let id = e.dataTransfer.getData("item");
    eventData.splice(id, 1);
    localStorage.setItem('eventStorage', JSON.stringify(eventData));
    showEvents();
})

// remove all items
removeItem.addEventListener('click', () => {
    localStorage.removeItem('eventStorage');
    eventsList.textContent= '';
    checkData()
})

// add event
eventBtn.addEventListener('click', ()=> {
    if(checkValidate()==false) {
        return
    }
        addEvent();
        showEvents();
})

const addEvent = () => {
    let eventItem = {
        title: titleValue.value,
        description: descValue.value,
        date: `${dateValue.value},${timeValue.value}`
    }
    eventData.push(eventItem)
    localStorage.setItem('eventStorage', JSON.stringify(eventData));

    titleValue.value = '';
    descValue.value = '';
    dateValue.value = '';
    timeValue.value = '';
}

//  show all events
const showEvents = () => {
    eventsList.textContent= '';    
    eventData.map((data, index) => {
        let inputDate = new Date(data.date);
        addEventItem(index, data.title, inputDate.getDate(), calendar[inputDate.getMonth()])
    })
}

// creating new event item elements and setting attributes
const addEventItem = (id, title, date, month) => {
    const eventMonth = document.createElement('div');
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
    eventItem.setAttribute('draggable', true);

    eventItem.addEventListener('dragstart', (e)=>(e.dataTransfer.setData("item", e.target.id)));

    eventItem.addEventListener('click', ()=> {
        countDown.className = 'event-time-bg show-timer';
        removeItem.style.display = 'none';

        countDown.style.top = 0;     
            setInterval(() => {
            convertInterval(id);
           }, 1000);
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

// calculate interval between given and current date
const convertInterval = (id) => {
    let currentDate = new Date().getTime();
    let customDate = new Date(new Date(eventData[id].date).getTime())
    let interval = customDate - currentDate;
    
    if(interval>0){
        years = Math.floor((interval % (1000 * 60 * 60 * 24 * 30 * 12 *1000)) / (1000 * 60 * 60 *24 * 30 *12))
        months = Math.floor((interval % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 *24 * 30))
        days = Math.floor((interval % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 *24))
        hours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((interval % (1000 * 60)) / 1000);
    }

    getItemInfo(days, hours, minutes, seconds, months, years, id);
}

// writing countdown and item info to display countdown section
const getItemInfo = (days=0, hours=0, minutes=0, seconds=0,months=0, years=0,id) => {
    showYears.textContent = years;
    showMonths.textContent = months;
    showDays.textContent = days;
    showHours.textContent = hours;
    showMinutes.textContent = minutes;
    showSeconds.textContent = seconds;

    eventItemTitle.textContent = eventData[id].title;
    eventDescription.textContent = eventData[id].description;    
}

// close countdown modal
countDown.addEventListener('click', (e)=> {
    if (e.target == countDown) {
        location.reload();
    }
})

