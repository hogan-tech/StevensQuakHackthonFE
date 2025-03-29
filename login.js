$(function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.userName) {
        // 使用者已登入，直接導向主頁
        window.location.href = "prototype.html";
        return;
    }
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        const userName = $("#username").val().trim();
        const password = $("#password").val().trim();

        axios
            .post("http://localhost:3000/users/login", {
                userName,
                password,
            })
            .then(function (res) {
                // ✅ 儲存登入使用者資訊（供其他頁面使用）
                localStorage.setItem("loggedInUser", JSON.stringify(res.data));

                $("#message").text("登入成功，導向中...").css("color", "green");

                setTimeout(function () {
                    window.location.href = "./prototype.html"; // 轉跳到焦慮追蹤頁
                }, 1000);
            })
            .catch(function (err) {
                const msg = err.response?.data?.error || "登入失敗";
                $("#message").text(msg).css("color", "red");
            });
    });
});
