// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// Authenticate the user (dummy email/password for this example)
signInWithEmailAndPassword(auth, "user-email@example.com", "user-password")
    .then(() => {
        // Successfully authenticated, now load data
        loadDashboardData();
    })
    .catch((error) => {
        console.error("Error signing in: ", error);
    });

// Load all balances and transaction data
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

// Toggle Sidebar
document.getElementById('sidebarToggle').onclick = function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-200px';
    } else {
        sidebar.style.left = '0px';
    }
};

// Modal functionality for New Transaction
document.getElementById("newTransactionBtn").onclick = () => {
    document.getElementById("transactionModal").style.display = "block";
};
document.getElementById("closeTransactionModal").onclick = () => {
    document.getElementById("transactionModal").style.display = "none";
};

// Modal functionality for Taxes
document.getElementById("calculateTaxesBtn").onclick = () => {
    document.getElementById("taxModal").style.display = "block";
};
document.getElementById("closeTaxModal").onclick = () => {
    document.getElementById("taxModal").style.display = "none";
};

// Add Transaction functionality
document.getElementById("addTransactionBtn").onclick = () => {
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const category = document.querySelector('input[name="category"]:checked').value;
    
    if (!isNaN(amount)) {
        // Fetch current balances from Firebase
        const balanceRef = ref(database, 'Balances');
        onValue(balanceRef, (snapshot) => {
            let balances = snapshot.val();

            // Subtract the amount from the correct category
            if (category === "Gas") {
                balances.Gas -= amount;
            } else if (category === "Misc") {
                balances.Misc -= amount;
            } else if (category === "Reimbursement") {
                balances.Reimbursement -= amount;
            }

            // Update the balances in Firebase
            set(balanceRef, balances);
            alert("Transaction added successfully!");
            document.getElementById("transactionModal").style.display = "none";
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
        // Save these values back to Firebase for future reference
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
};
