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

    // Modal for ATB Edit
    const atbEditBtn = document.getElementById("atbEditBtn");
    const atbModal = document.getElementById("atbModal");
    const closeAtbModal = document.getElementById("closeAtbModal");

    atbEditBtn.addEventListener('click', function () {
        atbModal.style.display = "block";
    });

    closeAtbModal.addEventListener('click', function () {
        atbModal.style.display = "none";
    });

    // Modal for Payday
    const paydayBtn = document.getElementById("paydayBtn");
    const paydayModal = document.getElementById("paydayModal");
    const closePaydayModal = document.getElementById("closePaydayModal");

    paydayBtn.addEventListener('click', function () {
        paydayModal.style.display = "block";
    });

    closePaydayModal.addEventListener('click', function () {
        paydayModal.style.display = "none";
    });

    // Close modals if clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === transactionModal) {
            transactionModal.style.display = "none";
        }
        if (event.target === taxModal) {
            taxModal.style.display = "none";
        }
        if (event.target === atbModal) {
            atbModal.style.display = "none";
        }
        if (event.target === paydayModal) {
            paydayModal.style.display = "none";
        }
    });
});
