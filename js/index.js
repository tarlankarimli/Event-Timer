// variables
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
const eventItemTitle = document.querySelector('.event-item-title');
const eventDescription = document.querySelector('.event-desc');
const removeItem = document.querySelector('.remove-btn');
let evenData;
let currentIndex = 0;
let months;
let days;
let hours;
let minutes;
let seconds;
const calendar = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// check is data existed
//  localStorage.removeItem('eventStorage')
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
// add event
eventBtn.addEventListener('click', ()=> {
    if(checkValidate()==false) {
        return
    }
        addEvent();
        showEvents();
})

const addEvent = () => {
    currentIndex = eventData.length
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
//  show all events
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
    eventItem.setAttribute('draggable', true);

    eventItem.addEventListener('dragstart', (e)=>(e.dataTransfer.setData("item", e.target.id)));

    eventItem.addEventListener('click', ()=> {
        countDown.className = 'event-time-bg time-animation';
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
    
    months = Math.floor((interval % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 *24 * 30))
    days = Math.floor((interval % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 *24))
    hours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((interval % (1000 * 60)) / 1000);

    getItemInfo(days, hours, minutes, seconds, months, id);
}
// writing countdown and item info to display countdown section
const getItemInfo = (days, hours, minutes, seconds,months, id) => {
    showMonths.textContent = months;
    showDays.textContent = days;
    showHours.textContent = hours;
    showMinutes.textContent = minutes;
    showSeconds.textContent = seconds;

    eventItemTitle.textContent = eventData[id].title;
    eventDescription.textContent = eventData[id].description;    
}

