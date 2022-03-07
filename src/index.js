const PORT = 7676;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
const Web3 = require("web3");
var Eth = require("web3-eth");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/ef114b43803143be887c35382cdbdb89"
);
app.use(cors());

("use strict");

app.get("/", async function (req, res) {
  //   var ver = web3.version;

  //   var latest = await web3.eth.getBlock("latest");

  var arr = [];
  var arrList = [];
  var latest = await web3.eth.getBlockNumber();

  for (var x = 1; x <= 10; x++) {
    //     if (!arr.includes(latest)) {
    //     arr.push(latest);
    console.log(latest);
    arrList.push(await web3.eth.getBlock(latest));
    latest--;
    //     }
  }

  //   var name = await web3.eth.ens.getAddress(latest.name);
  //   console.log(name);

  //   var reward = await web3.eth.getBlock(14332800);
  //   console.log(reward);

  var hash =
    "0x63e5a415fa4ef667ba0f85b1878ba6444f176fcbebf7cb5e3bb6f669b209aaef";
  web3.eth.getBlock(hash);
  var store;

  web3.eth.getGasPrice().then((value) => {
    store = value;
  });

  //   async function x() {
  //     var obj = await new Promise(function (resolve, reject) {
  //       web3.eth.getBlock("latest").then((value) => {
  //         store = value;
  //         //   console.log(store);
  //         console.log("ok");
  //         res.json(store);
  //       });
  //     });
  //   }

  //   async function x() {
  //     var obj = await new Promise(function (resolve, reject) {
  //       web3.eth.getBlock(hash).then((value) => {
  //         store = value;
  //         //   console.log(store);
  //         console.log("ok");
  //         res.json(store);
  //       });
  //     });
  //   }
  //       x();

  //   var conv = JSON.stringify(latest);
  console.log("ok");
  res.json(arrList);
});

// async function x() {
//   var obj = await new Promise(function (resolve, reject) {
//     var blk = web3.eth.getGasPrice();
//   });
//   obj = "hi";
//   return obj;
// }

app.get("/results", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".fc-item__title", html).each(function () {
        //<-- cannot be a function expression
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
