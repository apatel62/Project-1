const machine1Sorted = [];     //array to sort the localStorage machine 1 data from greastest to least downtime
const machine2Sorted = [];     //array to sort the localStorage machine 2 data from greastest to least downtime
const machine1Table = document.getElementById('machine-1-table').querySelector('tbody'); //grabs the body of the machine-1 table
const machine2Table = document.getElementById('machine-2-table').querySelector('tbody'); //grabs the body of the machine-2 table
const title = document.querySelector('header').querySelector('h1'); //grabs h1 in header

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
sortByTime();

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
dataToTable(machine1Sorted, '1');
dataToTable(machine2Sorted, '2');

//displays the corresponding title of the specific downtime report 
function shiftTitle(){
    const shiftNumber = readLocalStorage(shiftkey); 
    if(shiftNumber === '1'){
        title.textContent = 'Shift 1 Downtime Report';
    } else {
        title.textContent = 'Shift 2 Downtime Report';
    }
} 
shiftTitle();