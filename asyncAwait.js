const request = require('request');
const rp = require('request-promise');
const searchStr1 = 'https://opentable.herokuapp.com/api/restaurants?city=Toronto&per_page=25&name=' + process.argv[2];
const searchStr2 = 'https://opentable.herokuapp.com/api/restaurants?city=Toronto&per_page=25&name=' + process.argv[3];

const getRestaurantInfo = async (searchA, searchB) => {
 let restaurantResult1;
 let restaurantResult2;
 try {

   const apiResults2 = await request(searchB, function (error, response, body) {
     const jsonBody = JSON.parse(body);
     // console.log(jsonBody.total_entries);
     // console.log(jsonBody.restaurants[0]);
     restaurantResult2 = {
       entries   : jsonBody.total_entries,
       firstdata : jsonBody.restaurants[0]}
     return restaurantResult2;
     // console.log('rest2:', restaurantResult2)
   });

   const apiResults1 = await request(searchA, function (error, response, body) {
     const jsonBody = JSON.parse(body);
     // console.log(jsonBody.total_entries);
     // console.log(jsonBody.restaurants[0]); // results show up here
     restaurantResult1 = {
       entries   : jsonBody.total_entries,
       firstdata : jsonBody.restaurants[0]}
     return restaurantResult1;
     // console.log('rest1:', restaurantResult1)
   });

   console.log(restaurantResult2, restaurantResult1) // can't get results to this point
 }

 catch(err){
   return err;
 }


}

getRestaurantInfo(searchStr1, searchStr2)
