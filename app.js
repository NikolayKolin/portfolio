/* 
1. Access Symbol -> ["Meta Data"]["2. Symbol"]
2. Access Label for the Chart -> ["Meta Data"]["1. Information"]
3. Access Close price ->["Monthly Adjusted Time Series"]["1999-12-31"]["4. close"]
3. Access Dividend -> ["Monthly Adjusted Time Series"]["1999-12-31"]["7. dividend amount"]
*/
/* fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&datatype=json&symbol=IBM&apikey=DMV9QHVWXNMTQCSP`).
then(response => response.json()).
then(apiData => {

  console.log(apiData)

 
  const dates = Object.keys(apiData["Monthly Adjusted Time Series"]);
  const closedPrices = Object.values(apiData["Monthly Adjusted Time Series"]).map(dateData => dateData["4. close"]);
  const dividendAmounts = Object.values(apiData["Monthly Adjusted Time Series"]).map(dateData => dateData["7. dividend amount"]);
 
  // Chart.js code
  
  // Define data for the chart
  const data = {
    labels: dates.reverse(),
    datasets: [{
        label: "Stock Price",
        data: closedPrices.reverse(),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1
    },
    {
        label: "Dividend per Stock",
        data: dividendAmounts.reverse(),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1
    }
  ]
  };
  
  // Get the canvas element
  const ctx = document.getElementById("myChart").getContext("2d");
  
  // Create the chart
  const chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });


}) */


/* const searchForm = document.getElementById("search-stock");
const stockSymbolInput = document.getElementById("search-bar");

searchForm.addEventListener("submit", updateChart);

const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

startDateInput.addEventListener("change", updateChart);
endDateInput.addEventListener("change", updateChart);

function updateChart(event) {
  event.preventDefault();
  const symbol = stockSymbolInput.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  const filteredDates = Object.keys(apiData["Monthly Adjusted Time Series"]).filter(date => {
    return date >= startDate && date <= endDate;
  });

  const filteredClosedPrices = filteredDates.map(date => {
    return apiData["Monthly Adjusted Time Series"][date]["4. close"];
  });

  chart.data.labels = filteredDates;
  chart.data.datasets[0].data = filteredClosedPrices;
  chart.update();


  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&datatype=json&symbol=${symbol}&apikey=DMV9QHVWXNMTQCSP`)
    .then(response => response.json())
    .then(apiData => {
      console.log(apiData);
      
      const dates = Object.keys(apiData["Monthly Adjusted Time Series"]);
      const closedPrices = Object.values(apiData["Monthly Adjusted Time Series"]).map(dateData => dateData["4. close"]);
      const dividendAmounts = Object.values(apiData["Monthly Adjusted Time Series"]).map(dateData => dateData["7. dividend amount"]);

      // Define data for the chart
      const data = {
        labels: dates.reverse(),
        datasets: [
          {
            label: "Stock Price",
            data: closedPrices.reverse(),
            backgroundColor: "red",
            borderColor: "black",
            borderWidth: 1
          },
          {
            label: "Dividend per Stock",
            data: dividendAmounts.reverse(),
            backgroundColor: "blue",
            borderColor: "black",
            borderWidth: 1
          }
        ]
      };

      // Get the canvas element
      const ctx = document.getElementById("myChart").getContext("2d");

      // Create the chart
      const chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while fetching data for the stock symbol.");
  });

} */


let chart;

const searchForm = document.getElementById("search-stock");
const stockSymbolInput = document.getElementById("search-bar");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

searchForm.addEventListener("submit", updateChart);
startDateInput.addEventListener("change", updateChart);
endDateInput.addEventListener("change", updateChart);

function updateChart(event) {
  event.preventDefault();
  const symbol = stockSymbolInput.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&datatype=json&symbol=${symbol}&apikey=DMV9QHVWXNMTQCSP`)
    .then(response => response.json())
    .then(apiData => {
      console.log(apiData);
      
      const dates = Object.keys(apiData["Monthly Adjusted Time Series"]);
      const closedPrices = Object.values(apiData["Monthly Adjusted Time Series"]).map(dateData => dateData["4. close"]);
      const dividendAmounts = Object.values(apiData["Monthly Adjusted Time Series"]).map(dateData => dateData["7. dividend amount"]);

      // Filter dates by start and end date
      const filteredDates = dates.filter(date => {
        return date >= startDate && date <= endDate;
      });

      // Filter closed prices and dividend amounts by filtered dates
      const filteredClosedPrices = filteredDates.map(date => {
        return closedPrices[dates.indexOf(date)];
      });
      const filteredDividendAmounts = filteredDates.map(date => {
        return dividendAmounts[dates.indexOf(date)];
      });

      // Define data for the chart
      const data = {
        labels: filteredDates.reverse(),
        datasets: [
          {
            label: "Stock Price",
            data: filteredClosedPrices.reverse(),
            backgroundColor: "red",
            borderColor: "black",
            borderWidth: 1
          },
          {
            label: "Dividend per Stock",
            data: filteredDividendAmounts.reverse(),
            backgroundColor: "blue",
            borderColor: "black",
            borderWidth: 1
          }
        ]
      };

      // Get the canvas element
      const ctx = document.getElementById("myChart").getContext("2d");

      // Create the chart
      const chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while fetching data for the stock symbol.");
  });
}


const stockSuggestionsInput = document.getElementById("stock-suggestions-input");
const stockSuggestionsSelect = document.getElementById("stock-suggestions-select");
const suggestionsButton = document.getElementById("suggestions-button");
const stockSymbolField = document.getElementById("stock-symbol-input");

suggestionsButton.addEventListener("click", () => {
  const keyword = stockSuggestionsInput.value;

  fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=DMV9QHVWXNMTQCSP`)
    .then(response => response.json())
    .then(apiData => {
      console.log(apiData);
      
      const symbols = apiData["bestMatches"].map(match => match["1. symbol"]);
      const names = apiData["bestMatches"].map(match => match["2. name"]);

      symbols.forEach((symbol, index) => {
        const option = document.createElement("option");
        option.value = symbol;
        option.innerText = names[index];
        stockSuggestionsSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while fetching stock suggestions.");
    });
});

stockSuggestionsSelect.addEventListener("change", () => {
stockSymbolField.value = stockSuggestionsSelect.value;
});

