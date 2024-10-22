// buttons.js

document.getElementById("addTransactionBtn").addEventListener('click', function () {
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const category = document.querySelector('input[name="category"]:checked').value;
    const reimburserName = document.getElementById("reimburserName").value;
    const transactionName = document.getElementById("transactionName").value;

    if (!isNaN(amount)) {
        let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
        let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);

        if (category === "Reimbursement" && reimburserName && transactionName) {
            // Subtract from ATB and Misc
            currentAtb -= amount;
            miscBalance -= amount;
            updateBalancesBasedOnAtb(currentAtb, miscBalance);

            // Add reimbursement transaction to the "Reimbursement" card and PTC
            addReimbursementTransaction(reimburserName, transactionName, amount);
            addTransactionToPrevious(amount, `Reimbursement from ${reimburserName}`, new Date().toLocaleDateString(), "red");

        } else if (category === "Gas" || category === "Misc") {
            // Handle regular transactions (Gas, Misc)
            currentAtb -= amount;
            if (category === "Misc") miscBalance -= amount;
            updateBalancesBasedOnAtb(currentAtb, miscBalance);

            addTransactionToPrevious(amount, category, new Date().toLocaleDateString(), "red");
        }

        document.getElementById("transactionModal").style.display = "none";
    } else {
        alert("Please enter a valid amount.");
    }
});

document.getElementById("updateAtbBtn").addEventListener('click', function () {
    const newAtb = parseFloat(document.getElementById("atbAmount").value);
    let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);
    if (!isNaN(newAtb)) {
        // Update ATB and recalculate balances
        updateBalancesBasedOnAtb(newAtb, miscBalance);
        document.getElementById("atbModal").style.display = "none";
    } else {
        alert("Please enter a valid amount.");
    }
});

document.getElementById("addPaydayBtn").addEventListener('click', function () {
    const payAmount = parseFloat(document.getElementById("payAmount").value);
    const payDate = document.getElementById("payDate").value;

    if (!isNaN(payAmount) && payDate) {
        // Update ATB by adding the payday amount
        let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
        let miscBalance = parseFloat(document.getElementById("miscBalance").textContent);
        currentAtb += payAmount;

        // Recalculate and update balances based on the new ATB
        updateBalancesBasedOnAtb(currentAtb, miscBalance);
        
        // Add payday transaction to the "Previous Transactions" card
        addTransactionToPrevious(payAmount, "Payday", payDate, "green");

        document.getElementById("paydayModal").style.display = "none";
    } else {
        alert("Please enter a valid pay amount and date.");
    }
});

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
