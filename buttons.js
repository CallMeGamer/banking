// buttons.js

// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Event Listeners to Open Modals
document.getElementById("atbEditBtn").addEventListener('click', function () {
    openModal("atbModal");
});

document.getElementById("paydayBtn").addEventListener('click', function () {
    openModal("paydayModal");
});

document.getElementById("newTransactionBtn").addEventListener('click', function () {
    openModal("transactionModal");
});

document.getElementById("calculationsBtn").addEventListener('click', function () {
    openModal("calculationsModal");
});

// Event Listeners to Close Modals
document.getElementById("closeAtbModal").addEventListener('click', function () {
    closeModal("atbModal");
});

document.getElementById("closePaydayModal").addEventListener('click', function () {
    closeModal("paydayModal");
});

document.getElementById("closeTransactionModal").addEventListener('click', function () {
    closeModal("transactionModal");
});

document.getElementById("closeCalculationsModal").addEventListener('click', function () {
    closeModal("calculationsModal");
});

// Update Balances in ATB and other cards
function updateBalancesBasedOnAtb(atb, misc, gas, insurance = 0, savings = 0) {
    document.getElementById("gasBalance").textContent = gas.toFixed(2);
    document.getElementById("insuranceBalance").textContent = insurance.toFixed(2);
    document.getElementById("savingsBalance").textContent = savings.toFixed(2);
    document.getElementById("miscBalance").textContent = misc.toFixed(2);
    document.getElementById("atb").textContent = `$${atb.toFixed(2)}`;
}

// Add transaction to the Previous Transactions Card (PTC)
function addTransactionToPrevious(amount, name, date, color) {
    const transactionsList = document.getElementById("lastTransactions");
    const newTransaction = `<li>${name}: <span style="color: ${color};">$${amount.toFixed(2)}</span> (${date})</li>`;

    transactionsList.innerHTML = newTransaction + transactionsList.innerHTML;

    // Keep only the last 6 transactions
    if (transactionsList.children.length > 6) {
        transactionsList.removeChild(transactionsList.lastChild);
    }
}

// Reimbursement System - display new reimbursement in the Reimbursements card and PTC
function addReimbursementTransaction(name, reason, amount) {
    const reimbursementCard = document.getElementById("reimbursementContent");

    // Create a new reimbursement entry
    const newReimbursement = document.createElement('div');
    newReimbursement.innerHTML = `
        <p>${name} - ${reason}: $${amount.toFixed(2)} 
        <button class="close-reimbursement" style="background-color: green; color: white;">Close</button></p>
    `;
    
    // Add close functionality to the reimbursement
    newReimbursement.querySelector('.close-reimbursement').addEventListener('click', function () {
        let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
        let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);

        // Return reimbursement amount to ATB and Misc
        currentAtb += amount;
        miscBalance += amount;
        updateBalancesBasedOnAtb(currentAtb, miscBalance);

        // Add positive transaction to PTC
        addTransactionToPrevious(amount, `Reimbursement Closed: ${name}`, new Date().toLocaleDateString(), "green");

        // Remove reimbursement from UI
        newReimbursement.remove();
    });

    reimbursementCard.appendChild(newReimbursement);
}

// Add Transaction Button Functionality
document.getElementById("addTransactionBtn").addEventListener('click', function () {
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const category = document.querySelector('input[name="category"]:checked').value;
    const reimburserName = document.getElementById("reimburserName").value;
    const transactionName = document.getElementById("transactionName").value;

    if (!isNaN(amount)) {
        let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
        let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);
        let gasBalance = parseFloat(document.getElementById("gasBalance").textContent);

        // Reimbursement Transaction
        if (category === "Reimbursement" && reimburserName && transactionName) {
            currentAtb -= amount;
            miscBalance -= amount;
            updateBalancesBasedOnAtb(currentAtb, miscBalance, gasBalance);

            // Add the reimbursement to the Reimbursement Card and PTC
            addReimbursementTransaction(reimburserName, transactionName, amount);
            addTransactionToPrevious(amount, `Reimbursement from ${reimburserName}`, new Date().toLocaleDateString(), "red");

        } else if (category === "Gas") {
            // Gas Transaction
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
            // Miscellaneous Transaction
            currentAtb -= amount;
            miscBalance -= amount;
            updateBalancesBasedOnAtb(currentAtb, miscBalance, gasBalance);
            addTransactionToPrevious(amount, "Misc", new Date().toLocaleDateString(), "red");
        }

        // Close modal after transaction
        closeModal("transactionModal");
    } else {
        alert("Please enter a valid amount.");
    }
});

// ATB Edit Button Functionality
document.getElementById("updateAtbBtn").addEventListener('click', function () {
    const newAtb = parseFloat(document.getElementById("atbAmount").value);
    let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);
    let gasBalance = parseFloat(document.getElementById("gasBalance").textContent);
    if (!isNaN(newAtb)) {
        updateBalancesBasedOnAtb(newAtb, miscBalance, gasBalance);
        closeModal("atbModal");
    } else {
        alert("Please enter a valid amount.");
    }
});

// Payday Button Functionality
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

        closeModal("paydayModal");
    } else {
        alert("Please enter a valid pay amount and date.");
    }
});

// Update Calculations Modal (Save new calculation values)
document.getElementById("updateCalculationsBtn").addEventListener('click', function () {
    const savingsPercentage = parseFloat(document.getElementById("calcSavings").value);
    const gas = parseFloat(document.getElementById("calcGas").value);
    const insurance = parseFloat(document.getElementById("calcInsurance").value);

    if (!isNaN(savingsPercentage) && !isNaN(gas) && !isNaN(insurance)) {
        alert("Calculations updated successfully!");
        closeModal("calculationsModal");
    } else {
        alert("Please enter valid numbers for Savings, Gas, and Insurance.");
    }
});
