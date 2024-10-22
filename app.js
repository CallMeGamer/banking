// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// Your provided Firebase configuration
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
const sidebar = document.getElementById('sidebar');
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
