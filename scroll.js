let scrollTop = document.querySelector(".scrollToTopButton")
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
        scrollTop.classList.remove("disabled")

    } else {
        scrollTop.classList.add("disabled")
    }
})

scrollTop.addEventListener("click", () => {
    window.scrollTo(0, 0)
})