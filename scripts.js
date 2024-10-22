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

    // Modal for New Negative Transaction
    const newTransactionBtn = document.getElementById("newTransactionBtn");
    const transactionModal = document.getElementById("transactionModal");
    const closeTransactionModal = document.getElementById("closeTransactionModal");

    newTransactionBtn.addEventListener('click', function () {
        transactionModal.style.display = "block";
    });

    closeTransactionModal.addEventListener('click', function () {
        transactionModal.style.display = "none";
    });

    // Modal for Calculate Taxes
    const calculateTaxesBtn = document.getElementById("calculateTaxesBtn");
    const taxModal = document.getElementById("taxModal");
    const closeTaxModal = document.getElementById("closeTaxModal");

    calculateTaxesBtn.addEventListener('click', function () {
        taxModal.style.display = "block";
    });

    closeTaxModal.addEventListener('click', function () {
        taxModal.style.display = "none";
    });

    // Close modals if clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === transactionModal) {
            transactionModal.style.display = "none";
        }
        if (event.target === taxModal) {
            taxModal.style.display = "none";
        }
    });
});
