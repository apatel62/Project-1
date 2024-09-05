const machine1Sorted = [];     //array to sort the localStorage machine 1 data from greastest to least downtime
const machine2Sorted = [];     //array to sort the localStorage machine 2 data from greastest to least downtime
const machine1Table = document.getElementById('machine-1-table').querySelector('tbody'); //grabs the body of the machine-1 table
const machine2Table = document.getElementById('machine-2-table').querySelector('tbody'); //grabs the body of the machine-2 table
const title = document.querySelector('header').querySelector('h1'); //grabs h1 in header
const machine1Graph = document.getElementById('machine-1-chart');   //grabs machine 1 graph
const machine2Graph = document.getElementById('machine-2-chart');   //grabs machine 2 graph

//function used to sort the each machine's donwtime data from greatest to least downtime
function sortByTime() {
    retObject(machine1Key, machine1Sorted);
    retObject(machine2Key, machine2Sorted);
    machine1Sorted.sort(compareTimes);
    machine2Sorted.sort(compareTimes);
}

//coverts the "HH:mm" time format saved in the machine data into minutes that will be used to compare between the different downtimes
function timeToMintues(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours*60 + minutes;
}

//function that is used to compare the two times from the machine data that will be used as the parameter in the array.sort() function
function compareTimes(a,b) {
    return timeToMintues(b.time) - timeToMintues(a.time)
}


//it takes the data such as issue, time and comments based on user input from local storage and appends it to the corresponding table
function dataToTable(arr, table) { 
    for(i=0; i<arr.length; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        td1.textContent = arr[i].issue;
        td2.textContent = arr[i].time;
        if (arr[i].comments !== ''){
            td3.textContent = arr[i].comments; 
        } else {
            td3.textContent = 'N/A'; 
        }
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        if (table === '1') {
            machine1Table.appendChild(tr);
        } else {
            machine2Table.appendChild(tr);
        }
    }
    
}


//displays the corresponding title of the specific downtime report 
function shiftTitle(){
    const shiftNumber = readLocalStorage(shiftkey); 
    if(shiftNumber === '1'){
        title.textContent = 'Shift 1 Downtime Report';
    } else {
        title.textContent = 'Shift 2 Downtime Report';
    }
} 

//function that converts minutes to "HH:mm"
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
//function that sums up all the times each machine was down and appends to the last row of each machine's table
function totalTime(arr, table) {
    let sumTime = 0;
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    for(i=0; i<arr.length; i++) {
        sumTime+= timeToMintues(arr[i].time);
    }
    let totalTime = minutesToTime(sumTime);
    td1.textContent = 'Total Downtime';
    td1.style.fontWeight = 'bold';
    td2.textContent = totalTime;
    td3.textContent = 'How long the machine was down for during the shift'
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    if (table === '1') {
        machine1Table.appendChild(tr);
    } else {
        machine2Table.appendChild(tr);
    }
}
//function that creates the bar graphs using chart.js
//takes two parameters which are the array (arr) and the machine chart id element (id)
function createBarGraph(arr, id) {
    const issues = arr.map(item => item.issue);
    const timeMin = arr.map(item => timeToMintues(item.time));
    const barGraph = id.getContext('2d');
    new Chart(barGraph, {
        type: 'bar',
        data: {
            labels: issues,
            datasets: [{
                label: 'Time',
                data: timeMin,
                backgroundColor: 'rgba(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192)',
                borderWidth: 0.5
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return minutesToTime(value);
                        }
                    }
                }
            },
        }
    });
}
//function that call functions in intended order
function reportPage() {
    sortByTime();
    dataToTable(machine1Sorted, '1');
    dataToTable(machine2Sorted, '2');
    shiftTitle();
    totalTime(machine1Sorted, '1');
    totalTime(machine2Sorted, '2');
    createBarGraph(machine1Sorted, machine1Graph);
    createBarGraph(machine2Sorted, machine2Graph);
}
reportPage();
//function that is used when the users press the back button in the navbar
function goBack() {
    localStorage.clear();
    redirectPage('index.html');
}