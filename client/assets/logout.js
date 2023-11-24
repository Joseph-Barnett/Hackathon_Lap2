document.getElementById("logout").addEventListener("onclick", async (e) => {
    e.preventDefault();
    localStorage.clear()
    window.location.assign('/index')
    console.log('success')
})