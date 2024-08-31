const machineEl = document.querySelector('.machine');
const categoryEl = document.querySelector('.category');
const specificIssueEl = document.querySelector('.specific-issue');
const machineDowntimeEl = document.querySelector('.machine-downtime');
const commentsButtonEl = document.querySelector('.comments-button');
const submitButton = document.querySelector('button[type="submit"]');
const shiftSelect = document.getElementById('shift-option');
const machineSelect = document.getElementById('machine-option');
const categorySelect = document.getElementById('category-option');
const comments = document.getElementById('comments');
let shiftData = null;
let machineVal = null;    //stores which machine user selected
let categoryVal = null;
let wholeTime = ['00', '00'];  //stores the time user entered in [HH, mm] format
let issueVal = null;
let commentsVal = null;
const machine1Data = {
    category: null,
    issue: null,
    time: null,
    comments: null
};

const machine2Data = {
    category: null,
    issue: null,
    time: null,  // 00,00
    comments: null
};

const machine1SavedData = [];
const machine2SavedData = [];

function selectedSM(selectId, className){
    selectId.addEventListener('change', function(event) {
        const selectValue = event.target.value; //Gets the selected option value from the className element
        const selectText = event.target.options[selectValue].text; //Gets the selected text from the className element
        //console.log(selectText);  //used to see how selectText appears in console
        if(selectValue) {
            className.style.display = 'block';
        }

        if(selectId === shiftSelect) {  //saving shift number into shiftData
            shiftData = selectText;
        }

        if(selectId === machineSelect) { //saving machine number into machineVal
            machineVal = selectText;
        }
        //console.log("MAchine #", machineVal)
        if(selectId === specificIssueEl) {  //saving the specfic issue into corresponding machine data object variable
            issueVal = selectText;
        }
    });
} 

function specificCategory () {
    const issues = document.querySelectorAll('.issues');
    categorySelect.addEventListener('change', function(event) {
        const categoryValue = event.target.value;
        const categoryIndex = event.target.selectedIndex;
        const categoryText = event.target.options[categoryIndex].text;  //used to see how categoryText appears in console
        //console.log(categoryText); 
        specificIssueEl.style.display = 'block';

        issues.forEach(function(element) {
            element.style.display = 'none';
        });

        if(categoryValue) {
            const categoryIssue = document.getElementById(categoryValue);
            if (categoryIssue) {
                categoryIssue.querySelector('select').selectedIndex = 0;
                categoryIssue.style.display = 'block';
            }
        }
        categoryVal = categoryText;
    });
} 

function timeDown () {
    const minutes = document.getElementById('minutes-down');
    const hours = document.getElementById('hours-down');
    let hoursInput = false;
    let minutesInput = false;
    hours.addEventListener('input', function(event){
        hoursInput = true;
        wholeTime[0] = hours.value.toString();
        bothInput();
    });
    
    minutes.addEventListener('input', function(event){
        minutesInput = true;
        wholeTime[1] = minutes.value.toString();
        bothInput();
    });

    function bothInput() {
        if (hoursInput || minutesInput) {
            commentsButtonEl.style.display = 'block';
        }
    }
}

function submitPress(event) {
    event.preventDefault();
    const sI = document.querySelectorAll('.issues');
    const minutes = document.getElementById('minutes-down');
    const hours = document.getElementById('hours-down');
    let formErrors = false;
    for(i=0; i<sI.length; i++) {
        if(sI[i].style.display === 'block') {
            if(sI[i].querySelector('select').value === '0') {
                var checkModal = new bootstrap.Modal(document.getElementById('checkModal'));
                checkModal.show();
                formErrors = true;
            } 
        }
    }
    if(hours.value === '' && minutes.value === '') {
        var numberModal = new bootstrap.Modal(document.getElementById('numberModal'));
        numberModal.show();
        formErrors = true;
    }

    if (hours.value === '') {
        wholeTime[0] = '0'
    } else if (minutes.value === '') {
        wholeTime[1] = "00";
    }

    if(wholeTime[0] > 24 || wholeTime[1] > 60) {
        var timeModal = new bootstrap.Modal(document.getElementById('timeModal'));
        timeModal.show();
        formErrors = true;
    }


    let convertedTime = wholeTime.join(',');
    if (machineVal === 'Machine 1') {
        machine1Data.category = categoryVal;
        machine1Data.issue = issueVal;
        machine1Data.time = convertedTime;
        machine1Data.comments = comments.value;
    } else if (machineVal === 'Machine 2') {
        machine2Data.category = categoryVal;
        machine2Data.issue = issueVal;
        machine2Data.time = convertedTime;
        machine2Data.comments = comments.value;
    }

    //store data to localStorage via storeLocalStorage function in logic.js only if there are no form errors
    if(!formErrors){
        if(machineVal === 'Machine 1') {
            machine1SavedData.push(machine1Data);
            storeLocalStorage(machine1Key, machine1SavedData);
        } else if (machineVal === 'Machine 2') {
            machine2SavedData.push(machine2Data);
            storeLocalStorage(machine2Key, machine2SavedData);
        }
        storeLocalStorage(shiftkey, shiftData);
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        addExtraButton = document.getElementById('add-extra-entryButton');
        addExtraButton.addEventListener('click', function(){
            //TODO: reload page and pre-select shift based on the shiftkey from localStorage
    });
    }
}

//function that call functions in intended order
function fillOutForm() {
    selectedSM(shiftSelect, machineEl);
    selectedSM(machineSelect, categoryEl);
    specificCategory();
    selectedSM(specificIssueEl, machineDowntimeEl);
    timeDown();
    submitButton.addEventListener('click', submitPress);
}

fillOutForm();
