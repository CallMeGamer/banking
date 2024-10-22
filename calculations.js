// calculations.js

// Example calculation function for ATB
function calculateBalances(atb, gas, insurance, savings, misc) {
    return {
        gasBalance: gas,
        insuranceBalance: insurance,
        savingsBalance: savings,
        miscBalance: misc,
        atb: atb
    };
}

// Assuming this data would come from form inputs or database
function updateBalances() {
    const atb = 1000;  // Example value
    const gas = 50;
    const insurance = 65;
    const savings = 500;
    const misc = 385;

    const balances = calculateBalances(atb, gas, insurance, savings, misc);

    document.getElementById("gasBalance").textContent = balances.gasBalance;
    document.getElementById("insuranceBalance").textContent = balances.insuranceBalance;
    document.getElementById("savingsBalance").textContent = balances.savingsBalance;
    document.getElementById("miscBalance").textContent = balances.miscBalance;
    document.getElementById("atb").textContent = `$${balances.atb}`;
}

// Call this function to update balances wherever needed
updateBalances();
