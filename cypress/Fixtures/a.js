const data = require("./data.json");

let filtered = data.apiData.data.filter((el) => {
  return el.country.toUpperCase().includes("Fr".toUpperCase());
});

console.log(JSON.stringify(filtered));
