// buttons.js

document.getElementById("addTransactionBtn").addEventListener('click', function () {
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const category = document.querySelector('input[name="category"]:checked').value;

    if (!isNaN(amount)) {
        alert(`Transaction added for ${category}: $${amount}`);
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
        alert("Taxes updated successfully!");
        document.getElementById("taxModal").style.display = "none";
    } else {
        alert("Please enter valid percentages.");
    }
});

document.getElementById("updateAtbBtn").addEventListener('click', function () {
    const newAtb = parseFloat(document.getElementById("atbAmount").value);
    if (!isNaN(newAtb)) {
        alert(`ATB updated to $${newAtb}`);
        document.getElementById("atbModal").style.display = "none";
    } else {
        alert("Please enter a valid amount.");
    }
});

document.getElementById("addPaydayBtn").addEventListener('click', function () {
    const payAmount = parseFloat(document.getElementById("payAmount").value);
    const payDate = document.getElementById("payDate").value;

    if (!isNaN(payAmount) && payDate) {
        alert(`Payday added: $${payAmount} on ${payDate}`);
        document.getElementById("paydayModal").style.display = "none";
    } else {
        alert("Please enter a valid pay amount and date.");
    }
});
