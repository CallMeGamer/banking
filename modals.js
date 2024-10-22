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

// Make the "Calculations" button trigger the same functionality as "Calculate Taxes"
document.getElementById("calculationsBtn").addEventListener('click', function () {
    // Perform calculations functionality here (recalculate balances, taxes, etc.)
    alert("Calculations performed!");
});
