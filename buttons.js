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
            // Subtract from ATB and Misc
            currentAtb -= amount;
            miscBalance -= amount;
            updateBalancesBasedOnAtb(currentAtb, miscBalance, gasBalance);

            // Add reimbursement transaction to the "Reimbursement" card
            addReimbursementTransaction(reimburserName, transactionName, amount);

            // Add reimbursement to the Previous Transactions Card (PTC)
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

// Ensure the Calculations tab works
document.getElementById("calculationsBtn").addEventListener('click', function () {
    document.getElementById('calculationsModal').style.display = 'block';
});

// Close calculations modal
document.getElementById("closeCalculationsModal").addEventListener('click', function () {
    document.getElementById('calculationsModal').style.display = 'none';
});

// Reimbursement logic - display new reimbursement in the Reimbursements card
function addReimbursementTransaction(name, reason, amount) {
    const reimbursementCard = document.getElementById("reimbursementContent");
    const newReimbursement = document.createElement('div');

    newReimbursement.innerHTML = `
        <p>${name} - ${reason}: $${amount.toFixed(2)} 
        <button class="close-reimbursement" style="background-color: green; color: white;">Close</button></p>
    `;
    
    // Add close functionality to the new reimbursement
    newReimbursement.querySelector('.close-reimbursement').addEventListener('click', function () {
        let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
        let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);

        // Add the reimbursement amount back to ATB and Misc
        currentAtb += amount;
        miscBalance += amount;
        updateBalancesBasedOnAtb(currentAtb, miscBalance);

        // Add positive transaction to the Previous Transactions Card (PTC)
        addTransactionToPrevious(amount, `Reimbursement Closed: ${name}`, new Date().toLocaleDateString(), "green");

        // Remove the reimbursement from the UI
        newReimbursement.remove();
    });

    reimbursementCard.appendChild(newReimbursement);
}
