// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// Authenticate the user
signInWithEmailAndPassword(auth, "user-email@example.com", "user-password")
    .then((userCredential) => {
        const user = userCredential.user;

        // Fetch ATB and balances
        const balanceRef = ref(database, 'Balances');
        onValue(balanceRef, (snapshot) => {
            const balances = snapshot.val();
            document.getElementById("atb").innerText = "$" + balances.ATB;
            document.getElementById("gasBalance").innerText = balances.Gas;
            document.getElementById("insuranceBalance").innerText = balances.Insurance;
            document.getElementById("savingsBalance").innerText = balances.Savings;
            document.getElementById("miscBalance").innerText = balances.Misc;
        });

        // Fetch last 6 transactions
        const transactionsRef = ref(database, 'Transactions');
        onValue(transactionsRef, (snapshot) => {
            const transactions = snapshot.val();
            let transactionList = "";
            const lastTransactions = transactions.slice(-6);
            lastTransactions.forEach(transaction => {
                transactionList += `<li>${transaction.Name}: <span>-$${transaction.Amount}</span></li>`;
            });
            document.getElementById("lastTransactions").innerHTML = transactionList;
        });
    })
    .catch((error) => {
        console.error(error);
    });

// Sidebar toggle
const sidebar = document.querySelector('.sidebar');
document.getElementById('sidebarToggle').onclick = function() {
    sidebar.style.left = sidebar.style.left === '0px' ? '-200px' : '0px';
};

// Modal functionality
const transactionModal = document.getElementById("transactionModal");
document.getElementById("newTransactionBtn").onclick = () => transactionModal.style.display = "block";
document.getElementById("closeTransactionModal").onclick = () => transactionModal.style.display = "none";

const taxModal = document.getElementById("taxModal");
document.getElementById("calculateTaxesBtn").onclick = () => taxModal.style.display = "block";
document.getElementById("closeTaxModal").onclick = () => taxModal.style.display = "none";
