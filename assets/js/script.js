
let currentStep = 0;
showStep(currentStep);

// Function to display the current step
function showStep(stepIndex) {
    let steps = document.getElementsByClassName("step");
    for (let i = 0; i < steps.length; i++) {
        steps[i].style.display = "none";
    }
    steps[stepIndex].style.display = "block";
}

// Continue button click handler
function nextPrev(stepOffset) {
    if (!validateStep(currentStep)) return;

    let steps = document.getElementsByClassName("step");
    steps[currentStep].style.display = "none";
    currentStep += stepOffset;

    if (currentStep >= steps.length) {
        showPopup();
        return false;
    }

    showStep(currentStep);
}

// Function to validate the current step
function validateStep(stepIndex) {
    let step = document.getElementsByClassName("step")[stepIndex];
    let inputs = step.querySelectorAll("input[required], select[required]");
    for (let input of inputs) {
        if (!input.value) {
            alert("Please fill out all required fields.");
            return false;
        }
    }
    return true;
}

// Show the popup modal on final submission
function showPopup() {
    let modal = document.getElementById("scheduleModal");
    let date = document.getElementById("scheduleDate").value;
    let time = document.getElementById("scheduleTime").value;
    document.getElementById("modalContent").innerHTML = "You have scheduled your meeting for " + date + " at " + time + ".";
    modal.style.display = "block";
}

// Close the popup modal and navigate back to Step 1
function closeModal() {
    let modal = document.getElementById("scheduleModal");
    modal.style.display = "none";
    currentStep = 0;
    resetFormWizard();
    showStep(currentStep);
}

// Function to reset the form wizard
function resetFormWizard() {
    let inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    let selects = document.querySelectorAll('select');
    selects.forEach(select => select.selectedIndex = 0);
}

// When the user clicks on <span> (x), close the modal
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    closeModal();
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    let modal = document.getElementById("scheduleModal");
    if (event.target == modal) {
        closeModal();
    }
}
