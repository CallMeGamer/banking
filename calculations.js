// calculations.js

function updateBalancesBasedOnAtb(atb, misc) {
    const gasAllocation = 50;  // $50 for Gas
    const insuranceAllocation = 65;  // $65 for Insurance
    const savingsAllocation = atb * 0.5;  // 50% to Savings

    // Update UI
    document.getElementById("gasBalance").textContent = gasAllocation.toFixed(2);
    document.getElementById("insuranceBalance").textContent = insuranceAllocation.toFixed(2);
    document.getElementById("savingsBalance").textContent = savingsAllocation.toFixed(2);
    document.getElementById("miscBalance").textContent = misc.toFixed(2);

    // Update ATB
    document.getElementById("atb").textContent = `$${atb.toFixed(2)}`;
}

function addTransactionToPrevious(amount, name, date, color) {
    const transactionsList = document.getElementById("lastTransactions");
    const newTransaction = `<li>${name}: <span style="color: ${color};">$${amount.toFixed(2)}</span> (${date})</li>`;
    transactionsList.innerHTML += newTransaction;
}
