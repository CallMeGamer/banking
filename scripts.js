document.addEventListener('DOMContentLoaded', function () {

    // Sidebar toggle functionality
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    sidebarToggle.addEventListener('click', function () {
        if (sidebar.style.left === '0px') {
            sidebar.style.left = '-200px';
        } else {
            sidebar.style.left = '0px';
        }
    });

    // Modal functionality for opening/closing modals
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
    setupModal('taxModal', 'calculateTaxesBtn', 'closeTaxModal');
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

    // Transaction Handling Logic
    document.getElementById("addTransactionBtn").addEventListener('click', function () {
        const amount = parseFloat(document.getElementById("transactionAmount").value);
        const category = document.querySelector('input[name="category"]:checked').value;

        if (!isNaN(amount)) {
            alert(`Transaction added for ${category}: $${amount}`);
            document.getElementById("transactionModal").style.display = "none";
        } else {
            alert("Please enter a valid amount.");
        }
    });

    // Update Taxes Logic
    document.getElementById("updateTaxesBtn").addEventListener('click', function () {
        const savings = parseFloat(document.getElementById("taxSavings").value.replace('%', ''));
        const socialSecurity = parseFloat(document.getElementById("taxSS").value.replace('%', ''));
        const medicare = parseFloat(document.getElementById("taxMedicare").value.replace('%', ''));
        const federalTax = parseFloat(document.getElementById("taxFederal").value.replace('%', ''));
        const stateTax = parseFloat(document.getElementById("taxState").value.replace('%', ''));
        const countyTax = parseFloat(document.getElementById("taxCounty").value.replace('%', ''));

        if (!isNaN(savings) && !isNaN(socialSecurity) && !isNaN(medicare) && !isNaN(federalTax) && !isNaN(stateTax) && !isNaN(countyTax)) {
            alert("Taxes updated successfully!");
            document.getElementById("taxModal").style.display = "none";
        } else {
            alert("Please enter valid percentages.");
        }
    });

    // Update ATB Logic
    document.getElementById("updateAtbBtn").addEventListener('click', function () {
        const newAtb = parseFloat(document.getElementById("atbAmount").value);
        if (!isNaN(newAtb)) {
            alert(`ATB updated to $${newAtb}`);
            document.getElementById("atbModal").style.display = "none";
        } else {
            alert("Please enter a valid amount.");
        }
    });

    // Add Payday Logic
    document.getElementById("addPaydayBtn").addEventListener('click', function () {
        const payAmount = parseFloat(document.getElementById("payAmount").value);
        const payDate = document.getElementById("payDate").value;

        if (!isNaN(payAmount) && payDate) {
            alert(`Payday added: $${payAmount} on ${payDate}`);
            document.getElementById("paydayModal").style.display = "none";
        } else {
            alert("Please enter a valid pay amount and date.");
        }
    });

});
