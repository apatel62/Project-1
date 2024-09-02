const machineEl = document.querySelector('.machine');                  //grabs div machine element 
const categoryEl = document.querySelector('.category');                //grabs div category element 
const specificIssueEl = document.querySelector('.specific-issue');     //grabs div specific issue element 
const machineDowntimeEl = document.querySelector('.machine-downtime'); //grabs div machine downtime element
const commentsButtonEl = document.querySelector('.comments-button');   //grabs div comments-button element 
const submitButton = document.querySelector('button[type="submit"]');  //grabs submit button
const shiftSelect = document.getElementById('shift-option');           //grabs shift-option select element
const machineSelect = document.getElementById('machine-option');       //grabs machine-option select element
const categorySelect = document.getElementById('category-option');     //grabs category-option select element
const comments = document.getElementById('comments');                  //grabs comment textarea element

let shiftData = null;     //stores the value of the shift the user selected
let machineVal = null;    //stores which machine user selected
let categoryVal = null;   //stores which category the user selected
let wholeTime = ['00', '00'];  //stores the time user entered in [HH, mm] format
let issueVal = null;           //stores the specifc issue the user selected
let commentsVal = null;        //stores the comments if the user wrote any
const machine1Data = {         //stores the form data in object if machine 1 was selected
    category: null,
    issue: null,
    time: null,
    comments: null
};
const machine2Data = {         //stores the form data in object if machine 2 was selected
    category: null,
    issue: null,
    time: null,  
    comments: null
};
const machine1SavedData = [];  //array to save all machine 1 data from localStorage and current form submission
const machine2SavedData = [];  //array to save all machine 2 data from localStorage and current form submission

//function that appears the next question (className) in the form if the current question (selectId) is answered
function selectedSM(selectId, className){
    //if statement checks if the form was filled out once and pre-selects the shift question
    //else statement does line 33's comment
    shiftData = readLocalStorage(shiftkey);
    if(selectId === shiftSelect && shiftData.length > 0) {
        selectId.selectedIndex = shiftData;
        machineEl.style.display = 'block';
    } else {    
        selectId.addEventListener('change', function(event) {
            const selectValue = event.target.value; //Gets the selected option value from the className element
            const selectText = event.target.options[selectValue].text; //Gets the selected text from the className element
            if(selectValue) {
                className.style.display = 'block';   //next question appears 
            }
    
            if(selectId === shiftSelect) {  //saving shift value into shiftData
                shiftData = selectValue;
            }
    
            if(selectId === machineSelect) { //saving machine number into machineVal
                machineVal = selectText;
            }
            if(selectId === specificIssueEl) {  //saving the specfic issue that the user selected
                issueVal = selectText;
            }
        });

    }
} 

//function is when the user at the category question
//when they select a question, the corresponding specific issue question appears
//function accounts for if user changes the category if they selected the wrong one initially 
function specificCategory () {
    const issues = document.querySelectorAll('.issues');   //grabs all div issues elements
    categorySelect.addEventListener('change', function(event) {
        const categoryValue = event.target.value;
        const categoryIndex = event.target.selectedIndex;
        const categoryText = event.target.options[categoryIndex].text;  //grabs the text of what the user selected 
        specificIssueEl.style.display = 'block';                        //The h2 tag in specific issue class appears

        issues.forEach(function(element) {     //keeps all the specific issues select elements hidden
            element.style.display = 'none';
        });

        //if statement checks to see if the user selected a category
        //then grabs its corresponding issue and displays it with the placeholder shown using the category value
        if(categoryValue) {
            const categoryIssue = document.getElementById(categoryValue);
            if (categoryIssue) {
                categoryIssue.querySelector('select').selectedIndex = 0;
                categoryIssue.style.display = 'block';
            }
        }
        categoryVal = categoryText;   //saves the category that the user selected
    });
} 

//function is when the user is on the machine downtime question
//it grabs both the hours & minutes number input tags
//then checks to see if any number was wrriten in either input tag
//if it did then have the comments & button elements appear
function timeDown () {
    const minutes = document.getElementById('minutes-down');
    const hours = document.getElementById('hours-down');
    let hoursInput = false;         //local boolean variable used to see if the user typed a number into hours
    let minutesInput = false;       //local boolean variable used to see if the user typed a number into minutes
    hours.addEventListener('input', function(event){
        hoursInput = true;
        wholeTime[0] = hours.value.toString();            //saves the number into the first index of wholeTime
        bothInput();
    });
    
    minutes.addEventListener('input', function(event){
        minutesInput = true;
        wholeTime[1] = minutes.value.toString();         //saves the number into the second index of wholeTime
        bothInput();
    });

    //function is described in line 94-95
    function bothInput() {
        if (hoursInput || minutesInput) {
            commentsButtonEl.style.display = 'block';
        }
    }
}

//function is when the user presses the submit button
//will check to see if there were any errors when filling out the form
//if there were then throws a modal explaining to the user where they made a mistake
//if there were none then store the form data into the corresponding machine object based on the machine the user selected
//checks, grabs any machine data from localStorage, and pushes them to corresponding machine saved data array
//A modal appears saying they filled out the form and asks if they want to add another time a machine was down during their shift
//if they press yes then the page reloads for the form to be filled out again
//if they press no then another modal appears saying end of shift
//end of shift modal is used to redirect the user to the report html page
function submitPress(event) {
    event.preventDefault();
    const sI = document.querySelectorAll('.issues');
    const minutes = document.getElementById('minutes-down');
    const hours = document.getElementById('hours-down');
    let formErrors = false;

    //checks to see which specific issue questions is on the form and checks to see they answered the question
    //if not throws a modal
    for(i=0; i<sI.length; i++) {
        if(sI[i].style.display === 'block') {
            if(sI[i].querySelector('select').value === '0') {
                var checkModal = new bootstrap.Modal(document.getElementById('checkModal'));
                checkModal.show();
                formErrors = true;
            } 
        }
    }

    //checks to see if the user entered nothing in both hours and minutes
    //if so then throws a modal
    if(hours.value === '' && minutes.value === '') {
        var numberModal = new bootstrap.Modal(document.getElementById('numberModal'));
        numberModal.show();
        formErrors = true;
    }

    //checks to see if hours or minutes was left blank and adds the correct zeros to corresponding wholeTime index
    if (hours.value === '') {
        wholeTime[0] = '0'
    } else if (minutes.value === '') {
        wholeTime[1] = "00";
    }

    //checks to see if the user entered the hours and minutes incorrectly
    //if so then throws a modal
    if(wholeTime[0] > 24 || wholeTime[1] > 60) {
        var timeModal = new bootstrap.Modal(document.getElementById('timeModal'));
        timeModal.show();
        formErrors = true;
    }

    //explained in lines 124-129
    if(!formErrors){
        retObject(machine1Key, machine1SavedData);
        retObject(machine2Key, machine2SavedData);
        let convertedTime = wholeTime.join(':');
        if (machineVal === 'Machine 1') {
            machine1Data.category = categoryVal;
            machine1Data.issue = issueVal;
            machine1Data.time = convertedTime;
            machine1Data.comments = comments.value.trim();
        } else if (machineVal === 'Machine 2') {
            machine2Data.category = categoryVal;
            machine2Data.issue = issueVal;
            machine2Data.time = convertedTime;
            machine2Data.comments = comments.value.trim();
        }
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
        endShiftButton = document.getElementById('end-shiftButton');
        addExtraButton.addEventListener('click', function(){
            window.location.reload();
        });

        endShiftButton.addEventListener('click', function(){
            var endModal = new bootstrap.Modal(document.getElementById('endModal'));
            redirectButton = document.getElementById('redirectButton');
            successModal.hide();
            endModal.show();
            redirectButton.addEventListener('click', function(){
                redirectPage('report.html');
            });
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
