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

    // Calling match() on the string to remove any extraneous whitespace and "\n" "\" quotations that tesseract adds.

    return allText.match(/([^\\(\\n)"\s]).*([^\\(\\n)"\s])/g)[0];
};
