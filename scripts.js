document.addEventListener('DOMContentLoaded', function () {

    // Firebase Configuration (assuming this is already initialized)
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

    // Modal functionality for all buttons
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

    // Add Transaction Logic
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
                document.getElementById("transactionModal").style.display = "none";
            });
        } else {
            alert("Please enter a valid amount.");
        }
    });

    // Update ATB Logic
    document.getElementById("updateAtbBtn").addEventListener('click', function () {
        const newAtb = parseFloat(document.getElementById("atbAmount").value);
        if (!isNaN(newAtb)) {
            const balanceRef = ref(database, 'Balances');
            onValue(balanceRef, (snapshot) => {
                let balances = snapshot.val();
                balances.ATB = newAtb;
                set(balanceRef, balances);
                alert("ATB updated successfully!");
                document.getElementById("atbModal").style.display = "none";
            });
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
            document.getElementById("taxModal").style.display = "none";
        } else {
            alert("Please enter valid percentages.");
        }
    });

    // Payday Modal Logic
    document.getElementById("addPaydayBtn").addEventListener('click', function () {
        const payAmount = parseFloat(document.getElementById("payAmount").value);
        const payDate = document.getElementById("payDate").value;

        if (!isNaN(payAmount) && payDate) {
            const payRef = ref(database, 'Paychecks');
            set(payRef, {
                amount: payAmount,
                date: payDate
            });

            alert("Payday added successfully!");
            document.getElementById("paydayModal").style.display = "none";
        } else {
            alert("Please enter a valid pay amount and date.");
        }
    });

});
