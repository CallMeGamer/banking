// buttons.js

document.getElementById("addTransactionBtn").addEventListener('click', function () {
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const category = document.querySelector('input[name="category"]:checked').value;
    const reimburserName = document.getElementById("reimburserName").value;
    const transactionName = document.getElementById("transactionName").value;

    if (!isNaN(amount)) {
        if (category === "Reimbursement" && reimburserName && transactionName) {
            // Add reimbursement transaction to the "Reimbursement" card
            addReimbursementTransaction(reimburserName, transactionName, amount);

            // Add transaction to the "Previous Transactions" card
            addTransactionToPrevious(amount, `Reimbursement from ${reimburserName}`, new Date().toLocaleDateString());
        } else if (category === "Gas" || category === "Misc") {
            // Handle regular transactions (Gas, Misc)
            let currentAtb = parseFloat(document.getElementById("atb").textContent.replace('$', ''));
            currentAtb -= amount;
            updateBalancesBasedOnAtb(currentAtb);

            addTransactionToPrevious(amount, category, new Date().toLocaleDateString());
        }

        document.getElementById("transactionModal").style.display = "none";
    } else {
        alert("Please enter a valid amount.");
    }
});

document.getElementById("updateTaxesBtn").addEventListener('click', function () {
    const savings = parseFloat(document.getElementById("taxSavings").value.replace('%', ''));
    const socialSecurity = parseFloat(document.getElementById("taxSS").value.replace('%', ''));
    const medicare = parseFloat(document.getElementById("taxMedicare").value.replace('%', ''));
    const federalTax = parseFloat(document.getElementById("taxFederal").value.replace('%', ''));
    const stateTax = parseFloat(document.getElementById("taxState").value.replace('%', ''));
    const countyTax = parseFloat(document.getElementById("taxCounty").value.replace('%', ''));

    if (!isNaN(savings) && !isNaN(socialSecurity) && !isNaN(medicare) && !isNaN(federalTax) && !isNaN(stateTax) && !isNaN(countyTax)) {
        document.getElementById("taxModal").style.display = "none";
    } else {
        alert("Please enter valid percentages.");
    }
});

document.getElementById("updateAtbBtn").addEventListener('click', function () {
    const newAtb = parseFloat(document.getElementById("atbAmount").value);
    if (!isNaN(newAtb)) {
        // Update ATB and recalculate balances
        updateBalancesBasedOnAtb(newAtb);
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
        currentAtb += payAmount;

        // Recalculate and update balances based on the new ATB
        updateBalancesBasedOnAtb(currentAtb);
        
        // Add payday transaction to the "Previous Transactions" card
        addTransactionToPrevious(payAmount, "Payday", payDate);

        document.getElementById("paydayModal").style.display = "none";
    } else {
        alert("Please enter a valid pay amount and date.");
    }
});

// Adds a reimbursement transaction to the "Reimbursements" card with close functionality
function addReimbursementTransaction(name, reason, amount) {
    const reimbursementCard = document.getElementById("reimbursementContent");
    const newReimbursement = document.createElement('div');

    newReimbursement.innerHTML = `
        <p>${name} - ${reason}: $${amount.toFixed(2)} 
        <button class="close-reimbursement">Close</button></p>
    `;
    
    // Add close functionality to the new reimbursement
    newReimbursement.querySelector('.close-reimbursement').addEventListener('click', function () {
        newReimbursement.remove();  // Removes the reimbursement when the close button is clicked
    });

    reimbursementCard.appendChild(newReimbursement);
}
