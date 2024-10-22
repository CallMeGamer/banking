document.addEventListener('DOMContentLoaded', function () {

    // Firebase Configuration
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
    import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

    const firebaseConfig = {
        apiKey: "AIzaSyAoj9XAvXwbUp5Ak0aKrQp3ctkfRi3zYx0",
        authDomain: "cmg-banking.firebaseapp.com",
        databaseURL: "https://cmg-banking-default-rtdb.firebaseio.com",
        projectId: "cmg-banking",
        storageBucket: "cmg-banking.appspot.com",
        messagingSenderId: "690885218349",
        appId: "1:690885218349:web:e7219f3b8d817ddc3fa8a4"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const database = getDatabase(app);

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

    // Handle modals for new transaction, ATB, payday, etc.
    const newTransactionBtn = document.getElementById("newTransactionBtn");
    const transactionModal = document.getElementById("transactionModal");
    const closeTransactionModal = document.getElementById("closeTransactionModal");

    const calculateTaxesBtn = document.getElementById("calculateTaxesBtn");
    const taxModal = document.getElementById("taxModal");
    const closeTaxModal = document.getElementById("closeTaxModal");

    const atbEditBtn = document.getElementById("atbEditBtn");
    const atbModal = document.getElementById("atbModal");
    const closeAtbModal = document.getElementById("closeAtbModal");

    const paydayBtn = document.getElementById("paydayBtn");
    const paydayModal = document.getElementById("paydayModal");
    const closePaydayModal = document.getElementById("closePaydayModal");

    // Show modals
    newTransactionBtn.addEventListener('click', () => transactionModal.style.display = "block");
    closeTransactionModal.addEventListener('click', () => transactionModal.style.display = "none");

    calculateTaxesBtn.addEventListener('click', () => taxModal.style.display = "block");
    closeTaxModal.addEventListener('click', () => taxModal.style.display = "none");

    atbEditBtn.addEventListener('click', () => atbModal.style.display = "block");
    closeAtbModal.addEventListener('click', () => atbModal.style.display = "none");

    paydayBtn.addEventListener('click', () => paydayModal.style.display = "block");
    closePaydayModal.addEventListener('click', () => paydayModal.style.display = "none");

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

    // Handle Transaction Calculations
    document.getElementById("addTransactionBtn").addEventListener('click', function () {
        const amount = parseFloat(document.getElementById("transactionAmount").value);
        const category = document.querySelector('input[name="category"]:checked').value;

        if (!isNaN(amount)) {
            const balanceRef = ref(database, 'Balances');
            onValue(balanceRef, (snapshot) => {
                let balances = snapshot.val();
                if (category === "Gas") {
                    balances.Gas -= amount;
                } else if (category === "Misc") {
                    balances.Misc -= amount;
                } else if (category === "Reimbursement") {
                    const reimburserName = document.getElementById("reimburserName").value;
                    const transactionName = document.getElementById("transactionName").value;
                    // Add the reimbursement details to the database
                    if (reimburserName && transactionName) {
                        if (!balances.Reimbursement) balances.Reimbursement = [];
                        balances.Reimbursement.push({
                            name: reimburserName,
                            transaction: transactionName,
                            amount: amount
                        });
                    }
                }
                set(balanceRef, balances);
                alert("Transaction added successfully!");
                transactionModal.style.display = "none";
            });
        } else {
            alert("Please enter a valid amount.");
        }
    });

    // Update Taxes
    document.getElementById("updateTaxesBtn").addEventListener('click', function () {
        const savings = parseFloat(document.getElementById("taxSavings").value.replace('%', ''));
        const socialSecurity = parseFloat(document.getElementById("taxSS").value.replace('%', ''));
        const medicare = parseFloat(document.getElementById("taxMedicare").value.replace('%', ''));
        const federalTax = parseFloat(document.getElementById("taxFederal").value.replace('%', ''));
        const stateTax = parseFloat(document.getElementById("taxState").value.replace('%', ''));
        const countyTax = parseFloat(document.getElementById("taxCounty").value.replace('%', ''));

        if (!isNaN(savings) && !isNaN(socialSecurity) && !isNaN(medicare) && !isNaN(federalTax) && !isNaN(stateTax) && !isNaN(countyTax)) {
            const calculationsRef = ref(database, 'Calculations');
            set(calculationsRef, {
                Savings: savings,
                SocialSecurity: socialSecurity,
                Medicare: medicare,
                FederalTax: federalTax,
                StateTax: stateTax,
                CountyTax: countyTax
            });

            alert("Taxes updated successfully!");
            taxModal.style.display = "none";
        } else {
            alert("Please enter valid percentages.");
        }
    });

    // Update ATB
    document.getElementById("updateAtbBtn").addEventListener('click', function () {
        const newAtb = parseFloat(document.getElementById("atbAmount").value);
        if (!isNaN(newAtb)) {
            const balanceRef = ref(database, 'Balances');
            onValue(balanceRef, (snapshot) => {
                let balances = snapshot.val();
                balances.ATB = newAtb;
                set(balanceRef, balances);
                alert("ATB updated successfully!");
                atbModal.style.display = "none";
            });
        } else {
            alert("Please enter a valid amount.");
        }
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
