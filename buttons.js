// buttons.js

document.getElementById("addTransactionBtn").addEventListener('click', function () {
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const category = document.querySelector('input[name="category"]:checked').value;
    const reimburserName = document.getElementById("reimburserName").value;
    const transactionName = document.getElementById("transactionName").value;

    if (!isNaN(amount)) {
        let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
        let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);
        let gasBalance = parseFloat(document.getElementById("gasBalance").textContent);

        if (category === "Reimbursement" && reimburserName && transactionName) {
            currentAtb -= amount;
            miscBalance -= amount;
            updateBalancesBasedOnAtb(currentAtb, miscBalance, gasBalance);
            addReimbursementTransaction(reimburserName, transactionName, amount);
            addTransactionToPrevious(amount, `Reimbursement from ${reimburserName}`, new Date().toLocaleDateString(), "red");
        } else if (category === "Gas") {
            if (gasBalance >= amount) {
                currentAtb -= amount;
                gasBalance -= amount;
            } else {
                const remainingGas = gasBalance;
                gasBalance = 0;
                const miscRequired = amount - remainingGas;
                if (miscBalance >= miscRequired) {
                    miscBalance -= miscRequired;
                    currentAtb -= amount;
                } else {
                    alert("Insufficient funds in Gas and Misc.");
                    return;
                }
            }
            updateBalancesBasedOnAtb(currentAtb, miscBalance, gasBalance);
            addTransactionToPrevious(amount, "Gas", new Date().toLocaleDateString(), "red");
        } else if (category === "Misc") {
            currentAtb -= amount;
            miscBalance -= amount;
            updateBalancesBasedOnAtb(currentAtb, miscBalance, gasBalance);
            addTransactionToPrevious(amount, "Misc", new Date().toLocaleDateString(), "red");
        }

        document.getElementById("transactionModal").style.display = "none";
    } else {
        alert("Please enter a valid amount.");
    }
});

document.getElementById("updateAtbBtn").addEventListener('click', function () {
    const newAtb = parseFloat(document.getElementById("atbAmount").value);
    let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);
    let gasBalance = parseFloat(document.getElementById("gasBalance").textContent);
    if (!isNaN(newAtb)) {
        updateBalancesBasedOnAtb(newAtb, miscBalance, gasBalance);
        document.getElementById("atbModal").style.display = "none";
    } else {
        alert("Please enter a valid amount.");
    }
});

document.getElementById("addPaydayBtn").addEventListener('click', function () {
    const payAmount = parseFloat(document.getElementById("payAmount").value);
    const payDate = document.getElementById("payDate").value;

    // Get current calculation values for Savings %, Gas, and Insurance
    const savingsPercentage = parseFloat(document.getElementById("calcSavings").value) / 100;
    const gasAllocation = parseFloat(document.getElementById("calcGas").value);
    const insuranceAllocation = parseFloat(document.getElementById("calcInsurance").value);

    if (!isNaN(payAmount) && payDate) {
        let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
        let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);
        let gasBalance = parseFloat(document.getElementById("gasBalance").textContent);

        // Deduct for savings first, then gas and insurance, and calculate misc
        const savingsAllocation = payAmount * savingsPercentage;
        const miscAddition = payAmount - savingsAllocation - gasAllocation - insuranceAllocation;

        let insuranceBalance = parseFloat(document.getElementById("insuranceBalance").textContent) + insuranceAllocation;
        let savingsBalance = parseFloat(document.getElementById("savingsBalance").textContent) + savingsAllocation;
        gasBalance += gasAllocation;
        miscBalance += miscAddition;
        currentAtb += payAmount;

        updateBalancesBasedOnAtb(currentAtb, miscBalance, gasBalance, insuranceBalance, savingsBalance);
        addTransactionToPrevious(payAmount, "Payday", payDate, "green");

        document.getElementById("paydayModal").style.display = "none";
    } else {
        alert("Please enter a valid pay amount and date.");
    }
});

// Ensure the Calculations tab works
document.getElementById("calculationsBtn").addEventListener('click', function () {
    document.getElementById('calculationsModal').style.display = 'block';
});

// Close calculations modal
document.getElementById("closeCalculationsModal").addEventListener('click', function () {
    document.getElementById('calculationsModal').style.display = 'none';
});

// Update Calculations Modal (save new calculation values)
document.getElementById("updateCalculationsBtn").addEventListener('click', function () {
    const savingsPercentage = parseFloat(document.getElementById("calcSavings").value);
    const gas = parseFloat(document.getElementById("calcGas").value);
    const insurance = parseFloat(document.getElementById("calcInsurance").value);

    if (!isNaN(savingsPercentage) && !isNaN(gas) && !isNaN(insurance)) {
        alert("Calculations updated successfully!");
        document.getElementById("calculationsModal").style.display = "none";
    } else {
        alert("Please enter valid numbers for Savings, Gas, and Insurance.");
    }
});
