// CLIENT ID
// 3COBHNICUXXIV44MKEL3LNAPPGXKSVHDJPBW1QXFWNLJ3ESA
// CLIENT SECRET
// SMY5SEPCENFFCDHR22ZKZR4ISS4QRRNYRNOK1LWTM5H4GRIO
let axios = require("axios");
let date = "20191107"
let location = "austin"
let clientId = "3COBHNICUXXIV44MKEL3LNAPPGXKSVHDJPBW1QXFWNLJ3ESA";
let clientSecret = "SMY5SEPCENFFCDHR22ZKZR4ISS4QRRNYRNOK1LWTM5H4GRIO";
let queryURL = "https://api.foursquare.com/v2/venues/search?near=" + location + '&client_id=' + clientId + '&client_secret=' + clientSecret + "&v=" + date

axios.get(queryURL).then(function(response) {
    console.log(response.data);
  });
