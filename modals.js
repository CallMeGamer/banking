// modals.js

function setupModal(modalId, openButtonId, closeButtonId) {
    const modal = document.getElementById(modalId);
    const openButton = document.getElementById(openButtonId);
    const closeButton = document.getElementById(closeButtonId);

    openButton.addEventListener('click', function () {
        modal.style.display = "block";
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Setup modals for all actions
setupModal('transactionModal', 'newTransactionBtn', 'closeTransactionModal');
setupModal('atbModal', 'atbEditBtn', 'closeAtbModal');
setupModal('paydayModal', 'paydayBtn', 'closePaydayModal');

// Setup Calculations Modal
setupModal('calculationsModal', 'calculationsBtn', 'closeCalculationsModal');

// Reimbursement logic (show/hide fields)
const reimbursementRadio = document.getElementById("reimbursementRadio");
const reimbursementDetails = document.getElementById("reimbursementDetails");

reimbursementRadio.addEventListener('click', () => {
    reimbursementDetails.style.display = "block";
});

document.querySelectorAll('input[name="category"]').forEach((radio) => {
    radio.addEventListener('click', () => {
        if (radio.value !== "Reimbursement") {
            reimbursementDetails.style.display = "none";
        }
    });
});

// Make the "Calculations" button trigger the same functionality as the old Calculate Taxes button
document.getElementById("updateCalculationsBtn").addEventListener('click', function () {
    const newSavings = parseFloat(document.getElementById("calcSavings").value);
    const newGas = parseFloat(document.getElementById("calcGas").value);
    const newInsurance = parseFloat(document.getElementById("calcInsurance").value);

    if (!isNaN(newSavings) && !isNaN(newGas) && !isNaN(newInsurance)) {
        alert("Calculations updated successfully.");
        document.getElementById("calculationsModal").style.display = "none";
    } else {
        alert("Please enter valid numbers.");
    }
});
