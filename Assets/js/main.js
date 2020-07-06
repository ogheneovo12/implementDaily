const getElement = (el) => document.querySelector(el);
getElement(".open").addEventListener("click", () => {
    getElement("nav").classList.add('active')
})
getElement(".close").addEventListener("click", () => {
    getElement("nav").classList.remove('active')
})

const getAllElement = (el) => document.querySelectorAll(el)

const implementedIMG = getAllElement(".set-bg");

//LOOP THROUGH ALL ITEM AND SET BACKGROUND

implementedIMG.forEach(el =>{
    const bg = el.dataset['setbg'];
    console.log(bg)
    el.style.backgroundImage=`url(${bg})`;
})