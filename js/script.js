const hours = document.querySelectorAll(".hours");
const lastWeek = document.querySelectorAll(".last-week");
const dailyButton = document.getElementById("dailyButton");
const weeklyButton = document.getElementById("weeklyButton");
const monthlyButton = document.getElementById("monthlyButton");
const profileCardContainer = document.querySelector(".profile-card-container");
const statsCard = document.querySelectorAll(".stats-card");
const profileCard = document.querySelector(".profile-card");
const weeks = document.querySelectorAll(".weeks button");

const fetchStatistics = async () => {
  const { data } = await axios.get("./data.json");
  return data;
};

const onLoad = () => {
  weeklyStatistics();
  weeklyButton.classList.add("active");
};

const getDailyStatistics = (data) => {
  for (let index = 0; index < hours.length; index++) {
    data.map((dataStats, i) => {
      hours[i].textContent = dataStats.timeframes.daily.current + "hrs";
      lastWeek[i].textContent = dataStats.timeframes.daily.previous + "hrs";
    });
  }
};

const getWeeklyStatistics = (data) => {
  for (let index = 0; index < hours.length; index++) {
    data.map((dataStats, i) => {
      hours[i].textContent = dataStats.timeframes.weekly.current + "hrs";
      lastWeek[i].textContent = dataStats.timeframes.weekly.previous + "hrs";
    });
  }
};

const getMonthlyStatistics = (data) => {
  for (let index = 0; index < hours.length; index++) {
    data.map((dataStats, i) => {
      hours[i].textContent = dataStats.timeframes.monthly.current + "hrs";
      lastWeek[i].textContent = dataStats.timeframes.monthly.previous + "hrs";
    });
  }
};

const dailyStatistics = async () => {
  const data = await fetchStatistics();
  if (
    weeklyButton.classList.contains("active") ||
    monthlyButton.classList.contains("active")
  ) {
    weeklyButton.classList.remove("active");
    monthlyButton.classList.remove("active");
    dailyButton.classList.add("active");
  }
  getDailyStatistics(data);
};

const weeklyStatistics = async () => {
  const data = await fetchStatistics();
  if (
    dailyButton.classList.contains("active") ||
    monthlyButton.classList.contains("active")
  ) {
    dailyButton.classList.remove("active");
    monthlyButton.classList.remove("active");
    weeklyButton.classList.add("active");
  }
  getWeeklyStatistics(data);
};

const monthlyStatistics = async () => {
  const data = await fetchStatistics();
  if (
    dailyButton.classList.contains("active") ||
    weeklyButton.classList.contains("active")
  ) {
    dailyButton.classList.remove("active");
    weeklyButton.classList.remove("active");
    monthlyButton.classList.add("active");
  }
  getMonthlyStatistics(data);
};

// Event Listeners
dailyButton.addEventListener("click", () => dailyStatistics());
weeklyButton.addEventListener("click", () => weeklyStatistics());
monthlyButton.addEventListener("click", () => monthlyStatistics());

onLoad();

// Animation
const timeline = gsap.timeline();

timeline
  .from(profileCardContainer, {
    autoAlpha: 0,
    y: -100,
    delay: 0.2,
  })
  .from(
    profileCard,
    { autoAlpha: 0, y: -100, stagger: 0.1, delay: 0.1 },
    "-=0.2"
  )
  .from(weeks, { autoAlpha: 0, y: -100, stagger: 0.2, delay: 0.1 }, "-=0.2")
  .from(statsCard, { autoAlpha: 0, y: -100, stagger: 0.1 }, "-=0.2");
