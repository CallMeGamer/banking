// calculations.js

function updateBalancesBasedOnAtb(atb, misc, gas) {
    const insuranceAllocation = 65;  // $65 for Insurance
    const savingsAllocation = atb * 0.5;  // 50% to Savings

    // Update UI
    document.getElementById("gasBalance").textContent = gas.toFixed(2);
    document.getElementById("insuranceBalance").textContent = insuranceAllocation.toFixed(2);
    document.getElementById("savingsBalance").textContent = savingsAllocation.toFixed(2);
    document.getElementById("miscBalance").textContent = misc.toFixed(2);

    // Update ATB
    document.getElementById("atb").textContent = `$${atb.toFixed(2)}`;
}

function addTransactionToPrevious(amount, name, date, color) {
    const transactionsList = document.getElementById("lastTransactions");
    const newTransaction = `<li>${name}: <span style="color: ${color};">$${amount.toFixed(2)}</span> (${date})</li>`;

    transactionsList.innerHTML = newTransaction + transactionsList.innerHTML;

    // Keep only the last 6 transactions
    if (transactionsList.children.length > 6) {
        transactionsList.removeChild(transactionsList.lastChild);
    }
}
