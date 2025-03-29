// prototype.js

let count = 0;
const trackButton = document.getElementById("trackButton");
const counterDisplay = document.getElementById("counter");
const logList = document.getElementById("logList");
const clearLogButton = document.getElementById("clearLog");

// 從本地存儲加載數據
if (localStorage.getItem("anxietyCount")) {
    count = parseInt(localStorage.getItem("anxietyCount"));
    counterDisplay.textContent = `今日焦慮次數: ${count}`;
}

if (localStorage.getItem("anxietyLog")) {
    logList.innerHTML = localStorage.getItem("anxietyLog");
}

// 處理按鈕點擊
trackButton.addEventListener("click", function () {
    count++;
    counterDisplay.textContent = `今日焦慮次數: ${count}`;

    // 記錄時間戳
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();

    const logItem = document.createElement("li");
    logItem.textContent = `${dateString} ${timeString}`;
    logList.prepend(logItem);

    // 保存到本地存儲
    localStorage.setItem("anxietyCount", count);
    localStorage.setItem("anxietyLog", logList.innerHTML);

    // 切換按鈕圖案（短暫效果）
    trackButton.style.backgroundImage = "url('./images/duck_pressed.png')";
    setTimeout(() => {
        trackButton.style.backgroundImage = "url('./images/duck_normal.png')";
    }, 200);
});

// 清除紀錄功能
clearLogButton.addEventListener("click", function () {
    count = 0;
    counterDisplay.textContent = `今日焦慮次數: 0`;
    logList.innerHTML = "";

    // 清除本地存儲
    localStorage.removeItem("anxietyCount");
    localStorage.removeItem("anxietyLog");
});
