function setChart() {
  let weekday, height;
  let data = getChartData();
  data.then(json => {
    console.log(json);
    let maxValue = getMaxValue(json);
    setColorToday();
    setBarValue(json);
    setBarEvents();
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
  bar.classList.add("today");
}

function setBarValue(data) {
  let bars = document.getElementsByClassName("spend");
  for (let bar of bars) {
    let day = bar.parentElement.id.slice(0, 3);
    let value = data.find(obj => obj.day === day).amount;
    bar.innerText = "$" + value;
  }
}

function setBarEvents() {
  let bars = document.querySelectorAll(".chart-bar");
  bars.forEach((bar) => {
    bar.addEventListener("mouseover", () => {
      setVisible(bar)
    });
    bar.addEventListener("mouseout", () => {
      setHidden(bar)
    });
  });
}

function setVisible(element) {
  element.children[0].classList.add("current");
}

function setHidden(element) {
  element.children[0].classList.remove("current")
}