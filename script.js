function spellNumber() {
    const numberInput = document.getElementById('numberInput').value;
    const output = document.getElementById('output');
    const spelledOut = numberToWords(numberInput);
    output.textContent = spelledOut;
}

function numberToWords(num) {
    if (num === "0") return "zero";

    const units = [
        "", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
        "sextillion", "septillion", "octillion", "nonillion", "decillion",
        "undecillion", "duodecillion", "tredecillion", "quattuordecillion", 
        "quindecillion", "sexadecillion", "septendecillion", "octodecillion", 
        "novemdecillion", "vigintillion"
    ];
    
    const words = [];

    // Split the number into groups of three digits
    const chunks = [];
    while (num.length > 0) {
        chunks.unshift(num.slice(-3));
        num = num.slice(0, -3);
    }

    chunks.forEach((chunk, index) => {
        const chunkValue = parseInt(chunk, 10);
        if (chunkValue > 0) {
            words.push(threeDigitToWords(chunkValue) + " " + units[chunks.length - 1 - index]);
        }
    });

    return words.join(' ').trim();
}

function threeDigitToWords(num) {
    const underTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
                         "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", 
                         "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    let word = '';

    if (num >= 100) {
        word += underTwenty[Math.floor(num / 100)] + " hundred ";
        num %= 100;
    }

    if (num >= 20) {
        word += tens[Math.floor(num / 10)] + " ";
        num %= 10;
    }

    if (num > 0) {
        word += underTwenty[num] + " ";
    }

    return word.trim();
}
