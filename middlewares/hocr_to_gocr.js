var htmlparser = require("htmlparser2");

//Class for text annotation response
class vertices { 
  constructor(leftX, topY, rightX, bottomY ){
    this.vertices = [{"x" : leftX, "y" : topY}, {"x" : rightX, "y" : topY}, {"x" : rightX, "y" : bottomY}, {"x" : leftX, "y" : bottomY}]
  }
}

//Factory for vertices to conveniently apply an offset to vertices.
class verticesFactory { 
  constructor(xOffset, yOffset){
    this.xOffset = xOffset;
    this.yOffset = yOffset;
  }
  //Converting the strings to ints as well as applying the offset.
  createVertices(leftX, topY, rightX, bottomY){
    let leftXInt = parseInt(leftX) + this.xOffset;
    let topYInt = parseInt(topY) + this.yOffset;
    let rightXInt = parseInt(rightX) + this.xOffset;
    let bottomYInt = parseInt(bottomY) + this.yOffset;
    return new vertices(leftXInt, topYInt, rightXInt, bottomYInt);
  }
}

//Class creates object that gets return by the parser.
class textAnnotations {
  constructor(){
    this.textAnnotations = [];
  }
  //Google Vision API requires that the phrase be the first element in the array.
  addPhrase(locale, description, vertices){
    this.textAnnotations.unshift({"locale": locale, "description": description, "boundingPoly": vertices});
  }
  addWord(description, vertices){
     this.textAnnotations.push({"description": description, "boundingPoly": vertices});
  }
}

exports.hocrToGocr = function(hocrString, request){
  let phrase = "";
  let count = -1;
  let parsedObjs = [];
  let wordVertices = null;
  let phraseVertices = null;
  let ta = new textAnnotations();
  
  let vertFactory = new verticesFactory(request.x_box_loc, request.y_box_loc);
  
  let parser = new htmlparser.Parser({
    onattribute: function(name, value){
      if(name === "title"){
        if(value.includes('image')){
          let valueSplit = value.split(" ");
          phraseVertices =  vertFactory.createVertices(valueSplit[3], valueSplit[4], valueSplit[5], valueSplit[6].slice(0,-1));
        }
        else if(value.includes('x_wconf')){
          let valueSplit = value.split(" ");
          wordVertices = vertFactory.createVertices(valueSplit[1], valueSplit[2], valueSplit[3], valueSplit[4].slice(0,-1));
        }
      }
    },
    ontext: function(text){
      phrase += text;
      if(text.trim() != ""){
        ta.addWord(text, wordVertices);
      }
    },
  }, {decodeEntities: true});
  parser.write(hocrString);
  parser.end();
  ta.addPhrase("en", phrase.trim(), phraseVertices);
  return ta
};
