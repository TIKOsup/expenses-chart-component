function setChart() {
  let weekday, height;
  let chart = document.getElementsByClassName("chart")[0];
  let data = getChartData();
  data.then(json => {
    console.log(json);
    let maxValue = getMaxValue(json);
    setColorToday();
    json.forEach(element => {
      weekday = document.getElementById(`${element.day}-bar`);
      height = (element.amount * 100) / maxValue;
      weekday.style.height = `${height}%`;
    });
  });
}

function getChartData() {
  return fetch("./data.json")
    .then(res => { return res.json() });
}

function getMaxValue(data) {
  let maxValue = data[0].amount;
  data.forEach(element => {
    if (element.amount > maxValue) {
      maxValue = element.amount;
    }
  });

  return maxValue;
}

function setColorToday() {
  let date = new Date();
  const options = { weekday: "short" };
  let today = new Intl.DateTimeFormat("en-US", options).format(date).toLowerCase();

  let bar = document.getElementById(`${today}-bar`);
  let style = getComputedStyle(document.body);
  bar.style.backgroundColor = style.getPropertyValue("--cyan");
}
