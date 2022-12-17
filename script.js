function initialize() {
    tableRow1 = document.getElementById("rollResult");
    tableRow2 = document.getElementById("frequency");
    rollDice();
}

function getInfo() {
    diceQuantity = document.getElementById(("diceQuantity").value);
    console.log(diceQuantity);
}

function getRandomInteger(lower, upper) {
    var multiplier = upper - (lower - 1);
    var rnd = parseInt(Math.random() * multiplier) + lower;

    return rnd;
}

function rollDice() {
    var numRolls = getRandomInteger(1, 10);

    for (var i = 1; i <= 6; i++) {
        var newCell = tableRow1.insertCell();
        newCell.innerHTML = i;
    }
}