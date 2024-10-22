// buttons.js

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
