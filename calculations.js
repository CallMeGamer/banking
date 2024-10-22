// calculations.js

function calculateBalances(atb, gas, insurance, savings, misc) {
    return {
        gasBalance: gas,
        insuranceBalance: insurance,
        savingsBalance: savings,
        miscBalance: misc,
        atb: atb
    };
}

// Example function to update balances
function updateBalances() {
    const atb = 1000;  // Example value
    const gas = 50;
    const insurance = 65;
    const savings = 500;
    const misc = 385;

    const balances = calculateBalances(atb, gas, insurance, savings, misc);

    document.getElementById("gasBalance").textContent = balances.gasBalance.toFixed(2);
    document.getElementById("insuranceBalance").textContent = balances.insuranceBalance.toFixed(2);
    document.getElementById("savingsBalance").textContent = balances.savingsBalance.toFixed(2);
    document.getElementById("miscBalance").textContent = balances.miscBalance.toFixed(2);
    document.getElementById("atb").textContent = `$${balances.atb.toFixed(2)}`;
}

// Call this function to update balances when necessary
updateBalances();
