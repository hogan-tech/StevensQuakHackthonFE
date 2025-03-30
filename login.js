$(function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.userName) {
        // User is already logged in, redirect to the main page
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
                // ✅ Save logged-in user information for use on other pages
                localStorage.setItem("loggedInUser", JSON.stringify(res.data));

                $("#message").text("Login successful, redirecting...").css("color", "green");

                setTimeout(function () {
                    window.location.href = "./prototype.html"; // Redirect to the anxiety tracking page
                }, 1000);
            })
            .catch(function (err) {
                const msg = err.response?.data?.error || "Login failed";
                $("#message").text(msg).css("color", "red");
            });
    });
});
