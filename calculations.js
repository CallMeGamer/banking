// calculations.js

function updateBalancesBasedOnAtb(atb, misc, gas, insurance = 0, savings = 0) {
    document.getElementById("gasBalance").textContent = gas.toFixed(2);
    document.getElementById("insuranceBalance").textContent = insurance.toFixed(2);
    document.getElementById("savingsBalance").textContent = savings.toFixed(2);
    document.getElementById("miscBalance").textContent = misc.toFixed(2);
    document.getElementById("atb").textContent = `$${atb.toFixed(2)}`;
}

function addTransactionToPrevious(amount, name, date, color) {
    const transactionsList = document.getElementById("lastTransactions");
    const newTransaction = `<li>${name}: <span style="color: ${color};">$${amount.toFixed(2)}</span> (${date})</li>`;

    transactionsList.innerHTML = newTransaction + transactionsList.innerHTML;

    if (transactionsList.children.length > 6) {
        transactionsList.removeChild(transactionsList.lastChild);
    }
}
