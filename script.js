rollList = [];
var doubles = 0;
var triples = 0;
var mean;
var median;
var mode;

function initialize() {
    tableRow1 = document.getElementById("rollResult");
    tableRow2 = document.getElementById("frequency");
    doublesOutput = document.getElementById("doubles");
    triplesOutput = document.getElementById("triples");
    meanOutput = document.getElementById("mean");
    medianOutput = document.getElementById("median");
    modeOutput = document.getElementById("mode");
}

function getInfo() {
    diceQuantity = (document.getElementById("diceQuantity")).value;
    if (diceQuantity == 1 || diceQuantity == 2 || diceQuantity == 3) {
        reset();
        rollDice();
    }
}

function getRandomInteger(lower, upper) {
    var multiplier = upper - (lower - 1);
    var rnd = parseInt(Math.random() * multiplier) + lower;

    return rnd;
}

function reset() {
    var row1Columns = tableRow1.getElementsByTagName("td").length;
    for (let i = row1Columns; i > 0; i--) {
        tableRow1.deleteCell(i);
        tableRow2.deleteCell(i);
    }
    for (let i = 0; i < rollList.length; i++) {
        rollList.pop();
        i--;
    }
    doubles = 0;
    triples = 0;
}

function rollDice() {
    var numRolls = (document.getElementById("rollAmount")).value;

    for (let i = 0; i < numRolls; i++) {
        if (diceQuantity == 1) {
            rollList.push(getRandomInteger(1, 6));
        }
        else if (diceQuantity == 2) {
            var num1 = getRandomInteger(1, 6);
            var num2 = getRandomInteger(1, 6);
            rollList.push(num1 + num2);
            if (num1 == num2) {
                doubles++;
            }
        }
        else {
            var num1 = getRandomInteger(1, 6);
            var num2 = getRandomInteger(1, 6);
            var num3 = getRandomInteger(1, 6);
            rollList.push(num1 + num2 + num3);  
            if (num1 == num2 || num2 == num3 || num1 == num3) {
                doubles++;
            }
            if (num1 == num2 && num2 == num3) {
                triples++;
            }
        }
    }

    display()
}

function calcFrequency() {
    for (let i = (1 * diceQuantity); i <= (6 * diceQuantity); i++) {
        var newCell = tableRow1.insertCell();
        newCell.innerHTML = i;
        var count = 0;
        for (let j = 0; j < rollList.length; j++) {
            if (rollList[j] == i) {
                count++;
            }
        }
        tableRow2.insertCell().innerHTML = count;
    }
}

function calcMean() {
    var sum = 0;
    for (let i = 0; i < rollList.length; i++) {
        sum += rollList[i];
    }
    mean = sum / rollList.length;
    mean = Math.round(mean * 100) / 100;
}

function calcMedian() {
    rollList = rollList.sort(function(a, b){return a - b});
    var midIndex = rollList.length / 2;
    median = rollList[midIndex - 1];
    if (rollList.length % 2 == 0) {
        var midIndex2 = (rollList.length / 2) + 1;
        median = (rollList[midIndex - 1] + rollList[midIndex2 - 1]) / 2;
    }

}

function calcMode() {
    var highestCount = 0;
    var highestFreqResult = 0;
    for (let i = 0; i < rollList.length; i++) {
        var temp = 1;
        for (let j = i + 1; j < rollList.length; j++) {
            if (rollList[i] == rollList[j]) {
                temp++;
            }
        }
        if (temp > highestCount) {
            highestCount = temp;
            highestFreqResult = rollList[i];
        }
        if (temp == highestCount && rollList[i] != highestFreqResult) {
            highestFreqResult += ", " + rollList[i];
        }
    }
    mode = highestFreqResult;
}

function display() {
    calcFrequency();
    doublesOutput.innerHTML = doubles;
    triplesOutput.innerHTML = triples;
    calcMean();
    meanOutput.innerHTML = mean;
    calcMedian();
    medianOutput.innerHTML = median;
    calcMode();
    modeOutput.innerHTML = mode;
}