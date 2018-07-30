const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('ULL5QV-HEQ3H8K997');
const request = require('request');
const rp = require('request-promise');

let search = process.argv[2]
let searchStr =  'https://opentable.herokuapp.com/api/restaurants?city=Toronto&per_page=25&name=' + search;
let userDetails;

const keywordObj = {
  book       : ["book"],
  movie      : ["movie", "academyaward"]
};

let resultsObj = {};


const compareWordCounter = (compareWord, queryresult) => {
  let intMatches = JSON.stringify(queryresult).replace(/\s/g, '').toLowerCase().split(compareWord.toLowerCase()).length - 1;
  return intMatches;
};

const wolframAPICall = (strInput) => {
  return waApi
  .getFull({
    input: strInput,
    format: 'plaintext',
  })
  .then((queryresult) => queryresult) //return queryresult
  .catch((err) => {
    console.error(err);
    return {}
  })
};

const getData = (url) => {
  // Setting URL and headers for request
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request'
    }
  };
  // Return new promise
  return new Promise(function(resolve, reject) {

    request.get(options, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  })
}

const main = () => {
  return getData(searchStr)
  .then(body => {
    const jsonBody = JSON.parse(body)
    if (jsonBody.total_entries === 0){
      return Promise.reject("no result found")
    }


    // if result is zero, return Promise.reject("no result found")
    //return Promise.reject("no result found")
    //have data for opentable
    return Promise.resolve("2") // 2 is the category key for RESTAURANT
  })
  .then(function(result) { //openTable results
    // console.log("userDeets: ", userDetails) // openTable results
    return Promise.resolve(result);

  })
  .catch(err => { // potential WA call 1
    return wolframAPICall(search).then((result)=>{
      if (result.success === false) {
        return Promise.reject("no WA data")
      }
      const apiResults = result;
      for (keywordCategory in keywordObj){

        if (!resultsObj[keywordCategory]) {
          resultsObj[keywordCategory] = 0;
        }

        for (let j of keywordObj[keywordCategory]){

          const compareWord = j;
          const matchCount = compareWordCounter(compareWord, apiResults);
          resultsObj[keywordCategory] += matchCount;

        }
      }
      console.log("resultsObj.book: ", resultsObj.book)
      console.log("resultsObj.movie: ", resultsObj.movie)
      if (resultsObj){
        if (resultsObj.book > resultsObj.movie){
          return Promise.resolve("3")
        } else if(resultsObj.movie > resultObj.book) {
          return Promise.resolve("1")
        } else{
          return Promise.resolve("4")
        }
      }
    })
  })
}

main().then((result) => {
  return result
})
.catch(err => {
  return '4'
})
