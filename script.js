function spellNumber() {
    const numberInput = document.getElementById('numberInput').value;
    const output = document.getElementById('output');

    const spelledOut = numberToWords(numberInput);
    output.textContent = spelledOut;
}

function numberToWords(input) {
    // Split input to check for exponent notation
    const parts = input.split('^');
    if (parts.length === 2) {
        const base = parts[0];
        const exponent = parts[1];
        return expandExponent(base, exponent);
    }

    const num = input.replace(/\D/g, ''); // Remove non-digit characters
    if (num === "0") return "zero";
    if (!num) return "undefined"; // Handle empty input

    const units = [
        "", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
        "sextillion", "septillion", "octillion", "nonillion", "decillion",
        "undecillion", "duodecillion", "tredecillion", "quattuordecillion", 
        "quindecillion", "sexadecillion", "septendecillion", "octodecillion", 
        "novemdecillion", "vigintillion", "unvigintillion", "duovigintillion", 
        "trevigintillion", "quattuorvigintillion", "quinvigintillion", 
        "sexavigintillion", "septenvigintillion", "octovigintillion", 
        "novemvigintillion", "trigintillion", "untrigintillion", "duotrigintillion", 
        "tretrigintillion", "quattourtrigintillion", "quintrigintillion", 
        "sextrigintillion", "septentrigintillion", "octotrigintillion", 
        "novemtrigintillion", "quadragintillion", "quinquadragintillion",
        "sexquadragintillion", "septenquadragintillion", "octoquadragintillion", 
        "novemquadragintillion", "sexagintillion", "unsexagintillion",  "tresexagintillion",
        "quattoursexagintillion", "quinsexagintillion", "sexsexagintillion", "septensexagintillion", 
        "octosexagintillion", "novemsexagintillion", "septuagintillion", "unseptuagintillion",
        "duoseptuagintillion", "treseptuagintillion", "quattuorseptuagintillion",
        "quinseptuagintillion", "sexseptuagintillion", "septenseptuagintillion",
        "octoseptuagintillion", "novemseptuagintillion", "octogintillion", "unoctogintillion",
        "duoctogintillion", "treoctogintillion", "quattouroctogintillion", "quinoctogintillion", 
        "sexoctogintillion", "septenoctogintillion", "octoctogintillion", "novemoctogintillion", 
        "nonagintillion", "unonagintillion", "duononagintillion", "trenonagintillion", "quattournonagintillion", 
        "quinonagintillion", "sexnonagintillion", "septenonagintillion", "octononagintillion", "novemnonagintillion", 
        "centillion"
    ];
    
    const words = [];
    const chunks = [];
    
    while (num.length > 0) {
        chunks.unshift(num.slice(-3));
        num = num.slice(0, -3);
    }

    chunks.forEach((chunk, index) => {
        const chunkValue = parseInt(chunk, 10);
        if (chunkValue > 0) {
            const chunkWords = threeDigitToWords(chunkValue);
            if (units[chunks.length - 1 - index]) {
                words.push(chunkWords + " " + units[chunks.length - 1 - index]);
            } else {
                words.push(chunkWords);
            }
        }
    });

    return words.join(' ').trim();
}

function expandExponent(base, exponent) {
    const expandedValue = BigInt(base) ** BigInt(exponent);
    return numberToWords(expandedValue.toString());
}

function threeDigitToWords(num) {
    const underTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
                         "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", 
                         "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    if (num < 0 || num > 999) return "undefined"; // Handle out of range numbers

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
