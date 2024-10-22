// buttons.js

// Function to update the displayed ATB value
function updateAtbUI(newAtb) {
    document.getElementById("atb").textContent = `$${newAtb.toFixed(2)}`;
}

document.getElementById("addTransactionBtn").addEventListener('click', function () {
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const category = document.querySelector('input[name="category"]:checked').value;

    if (!isNaN(amount)) {
        const balances = {
            gas: parseFloat(document.getElementById("gasBalance").textContent),
            misc: parseFloat(document.getElementById("miscBalance").textContent),
        };

        if (category === "Gas") {
            balances.gas -= amount;
            document.getElementById("gasBalance").textContent = balances.gas.toFixed(2);
        } else if (category === "Misc") {
            balances.misc -= amount;
            document.getElementById("miscBalance").textContent = balances.misc.toFixed(2);
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
        // You can store these tax values in a variable if needed
        document.getElementById("taxModal").style.display = "none";
    } else {
        alert("Please enter valid percentages.");
    }
});

document.getElementById("updateAtbBtn").addEventListener('click', function () {
    const newAtb = parseFloat(document.getElementById("atbAmount").value);
    if (!isNaN(newAtb)) {
        updateAtbUI(newAtb); // Call the function to update the UI
        document.getElementById("atbModal").style.display = "none";
    } else {
        alert("Please enter a valid amount.");
    }
});

document.getElementById("addPaydayBtn").addEventListener('click', function () {
    const payAmount = parseFloat(document.getElementById("payAmount").value);
    const payDate = document.getElementById("payDate").value;

    if (!isNaN(payAmount) && payDate) {
        // For now, simply hide the modal and assume that payday is added
        document.getElementById("paydayModal").style.display = "none";
    } else {
        alert("Please enter a valid pay amount and date.");
    }
});
