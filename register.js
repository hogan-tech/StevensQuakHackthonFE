$(function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.userName) {
        // User is already logged in, redirect to the main page
        window.location.href = "prototype.html";
        return;
    }

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();
        
        const userName = $("#username").val().trim();
        const password = $("#password").val().trim();

        axios
            .post("http://localhost:3000/users/register", {
                userName,
                password,
            })
            .then(function (res) {
                $("#message")
                    .text("Registration successful! Please proceed to login 🦆")
                    .css("color", "green");

                setTimeout(function () {
                    window.location.href = "./login.html";
                }, 1000);
            })
            .catch(function (err) {
                const msg = err.response?.data?.error || "Registration failed, please try again.";
                $("#message").text(msg).css("color", "red");
            });
    });
});
