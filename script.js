const route = document.getElementById('route')
const time1 = document.getElementById('time1')
const time2 = document.getElementById('time2')
const label1 = document.getElementById('label1')
const label2 = document.getElementById('label2')
const price = document.getElementById('num')
const descr = document.getElementById('descr')
let departure = ''
let coming = ''
let time1min = 0
let time2min = 0
let price2 = 0
let path = ''
let multiPrice = 0
let travelTime = 0
let travelTimeMin = 0
let travelTimeHour = 0
let ticketEnd = ''
let currentTimeZone = new Date().getTimezoneOffset() / 60; 
let ourTimeZone = -3  


document.getElementById('price_btn').addEventListener('click', function() {
    calculatePrice()
})

time1.addEventListener('change', function() {
    if(route.value == 'из A в B и обратно в А') {
        reset()
        disableSelect()
    }
})
route.addEventListener('change', function() {
    reset()
    labelVisible()
})

function labelVisible() {
    if(route.value == 'из A в B') {
        time1.style.display ='inline-block'
        time2.style.display ='none'
        label1.style.display = 'inline-block'
        label2.style.display = 'none'
    }
    else if(route.value == 'из B в A') {
        time1.style.display ='none'
        time2.style.display ='inline-block'
        label1.style.display = 'none'
        label2.style.display = 'inline-block'
    }
    else {
        time1.style.display ='inline-block'
        time2.style.display ='inline-block'
        label1.style.display = 'inline-block'
        label2.style.display = 'inline-block'
        disableSelect()
    }
}

function disableSelect() {
    time1min=time1.value.split(':')
        time1min =time1min[0] * 60 + Number(time1min[1])  
        for(i=0;i<time2.length;i++) {
            time2min = time2[i].value.split(':')
            time2min = time2min[0] * 60 + Number(time2min[1])
            if(time1min + 50 > time2min) {
                time2[i].disabled=true
                time2.value=time2[i+1].value
            }
        }
}

function reset() {
    for(j=0;j<time2.length;j++) {
        time2[j].disabled=false
    }
}

function calculatePrice() {
    if(price.value < 1 || !Number.isInteger(Number(price.value))) {
        descr.innerHTML= 'Введите корректное число билетов'
        return false
    }
    else if(price.value > 4 && price.value < 21) {
        ticketEnd ='ов'
    }
    else if(price.value == 1 || price.value % 10 == 1) {
        ticketEnd = ''
    }
    else if(price.value == 2 || price.value == 3 || price.value == 4 ||  price.value % 10 == 2 || price.value % 10 == 3 || price.value % 10 == 4) {
        ticketEnd = 'а'
    }
    else {
        ticketEnd = 'ов'
    }
    multiPrice = 700
    travelTimeMin = 50
    travelTimeHour = ''
    if(route.value == 'из A в B') {
        departure = time1.value
        comingTime()
    }
    else if(route.value == 'из B в A') {
        departure = time2.value
        comingTime()
    }
    else {
        multiPrice = 1200
        time1min = countMin(time1.value)
        time2min = countMin(time2.value) + 50
        travelTimeHour = Math.floor((time2min-time1min) / 60); 
        travelTimeMin = (time2min-time1min) % 60 
        departure = time1.value
        comingTime()
        if (travelTimeHour == 1) {
            travelTimeHour = travelTimeHour + ' час'
        }
        else (travelTimeHour = travelTimeHour + ' часа')
    }
    descr.innerHTML= 'Вы выбрали ' + price.value + ' билет' + ticketEnd +' по маршруту ' + route.value + ' стоимостью ' + price.value * multiPrice + ' р.' +'<br>'
    + 'Это путешествие займет у вас ' + travelTimeHour + ' '+ travelTimeMin +' минут.' + '<br>'
    + 'Теплоход отправляется в ' + departure + ', а прибудет в ' + coming[0] + ':' + coming[1] + '.'
}

function comingTime() {
    coming = departure.split(':')
    if (Number(coming[1]) + travelTimeMin < 60) {
        coming[1] = Number(coming[1]) + travelTimeMin
        if (coming[1] > 60) {
            coming[1] = Number(coming[1]) % 60
            coming[0] = Number(coming[0])++
        }
    }
    else {
        coming[0] = Number(coming[0]) + 1
        coming[1] = (Number(coming[1]) + travelTimeMin) % 60
    }
    if(coming[1] < 10) {
        coming[1] = '0' + coming[1]
    }
    coming[0] = Number(coming[0]) + travelTimeHour
}

function countMin(n) {
    n = n.split(':')
    n = n[0] * 60 + Number(n[1])
    return n
}

function timeZones(list) {
    for (k=0;k<list.length;k++) {
        let arrList = list[k].value.split(':')
        if(Number(arrList[0]) - currentTimeZone + ourTimeZone > 23) {
            arrList[0] = (Number(arrList[0]) - currentTimeZone + ourTimeZone) % 24
        }
        else {
            arrList[0] = (Number(arrList[0]) - currentTimeZone + ourTimeZone)
        }

        list[k].value = arrList[0] + ':' + arrList[1]
        list[k].innerHTML = arrList[0] + ':' + arrList[1]
    }
}

timeZones(time1)
timeZones(time2)