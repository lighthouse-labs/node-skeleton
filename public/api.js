module.exports = function apiCategoryDecider(taskStr){

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('ULL5QV-HEQ3H8K997');

const argvInput = process.argv[2];
const strArray = [" Book", " Movie", " Restaurant"];


function wolframAPICall(strInput, compareWord) {
    waApi.getFull({
    input: strInput,
    format: 'plaintext',
  }).then((queryresult) => {
    let objString = JSON.stringify(queryresult);
    // let count = (objString.match(//g) || []).length
    console.log(strInput, ":: ", objString.split(compareWord).length - 1);
    // console.log(`${strInput} ${objString}`);

  }).catch(console.error)
};

for (let i = 0; i < strArray.length; i++){
  strInput = argvInput + strArray[i];
  wolframAPICall(strInput, "text");
};
