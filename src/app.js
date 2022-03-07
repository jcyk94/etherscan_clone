const feedDisplay = document.querySelector("#feed");
const currentDate = new Date();

fetch("http://localhost:7676/")
  .then((response) => {
    //     console.log(response);
    return response.json();
  })
  .then((object) => {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const data = object[key];

        const articleItem =
          `<div class="card border-primary md-3" style="25rem"> <div> Number : <a href='#'>` +
          JSON.stringify(data.number) +
          `</a></div> <div>` +
          `Miner : ` +
          data.miner +
          `</div>  <div>` +
          timeDifference(currentDate.getTime(), data.timestamp) +
          `&emsp;&emsp; Transaction Number : ` +
          data.transactions.length;
        `</div>` +
          `<div>` +
          ((data.gasLimit / 1000000000) * data.baseFeePerGas * 1.1) /
            1000000000 +
          ` eth</div>`;

        document.getElementById("cards").innerHTML += articleItem;
        //   cards.insertAdjacentHTML("beforeend", card);
        //   for (const key in data) {
        //     if (data.hasOwnProperty.call(data, key)) {
        //       const element = data[key];
        //       const articleItem =
        //         `<div><h3>` +
        //         JSON.stringify(key) +
        //         `:</p></div>` +
        //         `<div><h3>` +
        //         JSON.stringify(element) +
        //         `</p></div>`;
        //       feedDisplay.insertAdjacentHTML("beforeend", articleItem);
        //     }
        //   }
      }
    }
  })
  .catch((err) => console.log(err));

// fetch("http://localhost:7676/results")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     data.forEach((article) => {
//       const articleItem =
//         `<div><h3>` + article.title + `</h3><p>` + article.url + `</p></div>`;
//       feedDisplay.insertAdjacentHTML("beforeend", articleItem);
//     });
//   })
//   .catch((err) => console.log(err));

function timeDifference(date1, date2) {
  var difference = date1 - date2 * 1000;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);

  if (minutesDifference > 0) {
    return minutesDifference + ` minutes ago`;
  } else {
    return secondsDifference + ` seconds ago`;
  }
}
