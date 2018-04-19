function int2english(number) {
    var units, tens, scales, start, end, chunks,
        chunksLen, chunk, ints, i, word, words, and = 'and';

    // Is number zero?
    if (parseInt(number) === 0) {
        return 'zero';
    }

    var number_string = number + '';

    // Array of units as words
    units = [
        '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
        'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
        'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    // Array of tens as words
    tens = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
        'eighty', 'ninety'
    ];

    // Array of scales as words
    scales = [
        '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
        'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion',
        'decillion', 'undecillion', 'duodecillion', 'tredecillion',
        'quattuor-decillion', 'quindecillion', 'sexdecillion',
        'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion',
        'centillion'
    ];

    // Split user argument into 3 digit chunks from right to left
    start = number_string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(number_string.slice((start = Math.max(0, start - 3)), end));
    }

    // Check if function has enough scale words to be able to stringify the user argument
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return '';
    }

    // Stringify each integer in each chunk
    words = [];
    for (i = 0; i < chunksLen; i++) {
        chunk = parseInt(chunks[i]);
        if (chunk) {

            // Split chunk into array of individual integers
            ints = chunks[i].split('').reverse().map(parseFloat);

            // If tens integer is 1, i.e. 10, then add 10 to units integer
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            // Add scale word if chunk is not zero and array item exists
            if ((word = scales[i])) {
                words.push(word);
            }

            // Add unit word if array item exists
            if ((word = units[ints[0]])) {
                words.push(word);
            }

            // Add tens word if array item exists
            if ((word = tens[ints[1]])) {
                words.push(word);
            }

            // Add 'and' string after units or tens integer if:
            if (ints[0] || ints[1]) {

                // Chunk has a hundreds integer or chunk is the first of multiple chunks
                if ((ints[2] || !i && chunksLen) && number_string.length >= 3) {
                    words.push(and);
                }
            }

            // Add hundreds word if array item exists
            if ((word = units[ints[2]])) {
                words.push(word + ' hundred');
            }
        }
    }
    return words.reverse().join(' ');
}

function number2english(number) {
    var number_string = number + '';
    var decimal = false;
    var word;
    if (number_string.indexOf('.') >= 0) {
        decimal = true;
    }
    var integerNumberInWords;
    var decimalNumberInWords;
    if (decimal) {
        var fullNumber = number_string.split('.');
        var integerNumber = fullNumber[0].toString();
        var decimalNumber = fullNumber[1];
        integerNumberInWords = int2english(integerNumber);
        if (decimalNumber) {
            decimalNumber = decimalNumber.length === 0 ? decimalNumber + "0" : decimalNumber;
            decimalNumberInWords = int2english(decimalNumber);
        }
        
    } else {
        integerNumberInWords = int2english(number_string);
    }
    word = decimalNumberInWords ? (integerNumberInWords + ' with ' + decimalNumberInWords) : integerNumberInWords;
    return word;
}

module.exports = number2english;