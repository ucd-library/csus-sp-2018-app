var htmlparser = require("htmlparser2");

exports.hocrParser = function(hocrString){
    let allText = "";

    let parser = new htmlparser.Parser({
        ontext: function(text){
            allText += text;
        },
    }, {decodeEntities: true});
    parser.write(hocrString);
    parser.end();

    // Calling trim() on the string to remove any extraneous whitespace that Tesseract returns around the text
    // It was returning with about 10 newline characters on both the beginning and ending of the string.

    return allText.trim()
};