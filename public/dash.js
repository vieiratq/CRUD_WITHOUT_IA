const username = document.getElementById("username");
const email = document.getElementsByName("email");
const plan = document.getElementById("plan");
const level = document.getElementById("level");
const userId = document.getElementById("userId")
async function loadUser() {
    const response = await fetch("/api/users");
    try {
        if (!response.ok) {
            console.log("not okay")
            return window.location.href = "/"
        }
        const user = await response.json()
        username.innerHTML = user.username
        email.innerText = user.email
        level.innerText = user.level
        plan.innerText = user.plan
        userId.innerText = user.id
        console.log(user)
    }
    catch (error) {
        console.log(error)
        window.location.href = "/"

    }

}
loadUser()