document.addEventListener('DOMContentLoaded', function () {
    // Firebase Setup and Authentication
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

    signInWithEmailAndPassword(auth, "user-email@example.com", "user-password")
        .then(() => {
            loadDashboardData();  // Load data after authentication
        })
        .catch((error) => {
            console.error("Error signing in: ", error);
        });

    function loadDashboardData() {
        const balanceRef = ref(database, 'Balances');
        const transactionsRef = ref(database, 'Transactions');

        // Fetch and display balances
        onValue(balanceRef, (snapshot) => {
            const balances = snapshot.val();
            document.getElementById("atb").innerText = "$" + balances.ATB;
            document.getElementById("gasBalance").innerText = balances.Gas;
            document.getElementById("insuranceBalance").innerText = balances.Insurance;
            document.getElementById("savingsBalance").innerText = balances.Savings;
            document.getElementById("miscBalance").innerText = balances.Misc;
            document.getElementById("miscSpending").innerText = balances.Misc;
        });

        // Fetch and display last 6 transactions
        onValue(transactionsRef, (snapshot) => {
            const transactions = snapshot.val();
            let transactionList = "";
            const lastTransactions = transactions.slice(-6);
            lastTransactions.forEach(transaction => {
                transactionList += `<li>${transaction.Name}: <span>-$${transaction.Amount}</span></li>`;
            });
            document.getElementById("lastTransactions").innerHTML = transactionList;
        });
    }

    // Modal functionality for New Negative Transaction
    const newTransactionBtn = document.getElementById("newTransactionBtn");
    const transactionModal = document.getElementById("transactionModal");
    const closeTransactionModal = document.getElementById("closeTransactionModal");

    newTransactionBtn.addEventListener('click', function () {
        transactionModal.style.display = "block";
    });

    closeTransactionModal.addEventListener('click', function () {
        transactionModal.style.display = "none";
    });

    // Modal functionality for Calculate Taxes
    const calculateTaxesBtn = document.getElementById("calculateTaxesBtn");
    const taxModal = document.getElementById("taxModal");
    const closeTaxModal = document.getElementById("closeTaxModal");

    calculateTaxesBtn.addEventListener('click', function () {
        taxModal.style.display = "block";
    });

    closeTaxModal.addEventListener('click', function () {
        taxModal.style.display = "none";
    });

    // Add Transaction functionality
    document.getElementById("addTransactionBtn").onclick = () => {
        const amount = parseFloat(document.getElementById("transactionAmount").value);
        const category = document.querySelector('input[name="category"]:checked').value;
        
        if (!isNaN(amount)) {
            const balanceRef = ref(database, 'Balances');
            onValue(balanceRef, (snapshot) => {
                let balances = snapshot.val();
                // Subtract the amount from the selected category
                if (category === "Gas") {
                    balances.Gas -= amount;
                } else if (category === "Misc") {
                    balances.Misc -= amount;
                } else if (category === "Reimbursement") {
                    balances.Reimbursement -= amount;
                }

                // Update Firebase with new balance values
                set(balanceRef, balances);
                alert("Transaction added successfully!");
                transactionModal.style.display = "none";
            });
        } else {
            alert("Please enter a valid amount.");
        }
    };

    // Update Taxes functionality
    document.getElementById("updateTaxesBtn").onclick = () => {
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
    };

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
