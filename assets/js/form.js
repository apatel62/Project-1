const machineEl = document.querySelector('.machine');
const categoryEl = document.querySelector('.category');
const specificIssueEl = document.querySelector('.specific-issue');
const machineDowntimeEl = document.querySelector('.machine-downtime');
const commentsButtonEl = document.querySelector('.comments-button');
const submitButton = document.querySelector('input[type="submit"]');
const shiftSelect = document.getElementById('shift-option');
const machineSelect = document.getElementById('machine-option');
const categorySelect = document.getElementById('category-option');

function selectedSM(selectId, className){
    selectId.addEventListener('change', function(event) {
        const selectValue = event.target.value; //Get's the selected option value from the className element
        if(selectValue === '1' || selectValue === '2') {
            className.style.display = 'block';
        }
    });
} 
selectedSM(shiftSelect,machineEl);
selectedSM(machineSelect,categoryEl);

function specificCategory () {
    const screws = specificIssueEl.querySelector('.screws');
    const caps = specificIssueEl.querySelector('.caps');
    const press1 = specificIssueEl.querySelector('.press-1');
    const press2 = specificIssueEl.querySelector('.press-2');
    const table = specificIssueEl.querySelector('.table');
    const cameraConveyor = specificIssueEl.querySelector('.camera-conveyor');

    categorySelect.addEventListener('change', function(event) {
        const categoryValue = event.target.value;
        if(categoryValue === '1'){
            specificIssueEl.style.display = 'block';
            screws.style.display = 'block';
        }
    });
} 
specificCategory();