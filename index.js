if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}

let todayCount = 0;
let weekCount = 0;

// 🦆 鸭子叫声列表
const quackSounds = [
  "./Sound/quack1.mp3",
  "./Sound/quack2.mp3",
  "./Sound/quack3.mp3",
  "./Sound/quack4.mp3",
];

const quackAudio = document.getElementById("quackSound");
let lastClickTime = 0;

function playRandomQuack() {
  const now = Date.now();
  const delta = now - lastClickTime;
  lastClickTime = now;

  // 根据点击速度选择更激动的叫声
  let index;
  if (delta < 400) {
    index = 3; // 非常快
  } else if (delta < 800) {
    index = 2;
  } else if (delta < 1200) {
    index = 1;
  } else {
    index = 0; // 慢慢的点
  }

  quackAudio.src = quackSounds[index];
  quackAudio.currentTime = 0;
  quackAudio.play().catch((e) =>
    console.warn("Audio play failed, maybe user hasn't interacted:", e)
  );
}

const trackButton = document.getElementById("trackButton");
const duckImage = document.getElementById("duckImage");
const todayCountDisplay = document.getElementById("todayCount");
const weekCountDisplay = document.getElementById("weekCount");

// Load counts from localStorage
if (localStorage.getItem("todayCount")) {
  todayCount = parseInt(localStorage.getItem("todayCount"));
  todayCountDisplay.textContent = todayCount;
}
if (localStorage.getItem("weekCount")) {
  weekCount = parseInt(localStorage.getItem("weekCount"));
  weekCountDisplay.textContent = weekCount;
}

// Click event
trackButton.addEventListener("click", async () => {
  todayCount++;
  weekCount++;

  todayCountDisplay.textContent = todayCount;
  weekCountDisplay.textContent = weekCount;

  localStorage.setItem("todayCount", todayCount);
  localStorage.setItem("weekCount", weekCount);
  playRandomQuack();


  // Animate duck image
  duckImage.src = "./images/duck_pressed.png";
  setTimeout(() => {
    duckImage.src = "./images/duck_normal.png";
  }, 200);

  // Log and send to backend
  const now = new Date();
  const dayString = now.toISOString().slice(0, 10);
  const timeString = now.toTimeString().slice(0, 5);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user?.userName) {
    try {
      await axios.post(
        "https://desolate-tor-24628-0ba2463868a2.herokuapp.com/anxiety",
        {
          userName: user.userName,
          day: dayString,
          time: timeString,
        }
      );
    } catch (err) {
      console.error("Failed to send record:", err);
    }
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  // For example, remove the token and redirect to the login page
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

document.getElementById("analysisBtn").addEventListener("click", () => {
  // For example, remove the token and redirect to the login page
  window.location.href = "analysis.html";
});
