const getElement = (el) => document.querySelector(el);
getElement(".open").addEventListener("click", () => {
    getElement("nav").classList.add('active')
})
getElement(".close").addEventListener("click", () => {
    getElement("nav").classList.remove('active')
})