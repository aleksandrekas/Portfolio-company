const overlay = document.querySelector('.overlay')
const sideMenu = document.getElementById('sideMenu')
const hamburgerBtn = document.getElementById('hamburgerBtn')
const dropDownBtn = document.getElementById('dropDown')

window.addEventListener('scroll',()=>{
    if(window.scrollY >=30){
        document.querySelector("header").classList.add('scrolled')
    }else{
        document.querySelector("header").classList.remove('scrolled')
    }
})





overlay.addEventListener('click',()=>{
    sideMenu.style.transform = 'translateX(-260px)'
    overlay.style.display = 'none'
    hamburgerBtn.style.display ='block'
     document.querySelector('body').style.overflow = 'visible'
})


hamburgerBtn.addEventListener('click',()=>{
    sideMenu.style.transform = 'translateX(260px)'
    overlay.style.display = 'flex'
    hamburgerBtn.style.display ='none'
    document.querySelector('body').style.overflow = 'hidden'
})

dropDownBtn.addEventListener('click',()=>{
    const subMenu = dropDownBtn.querySelector('#sideSubMenu')
    if(subMenu.offsetHeight === 0){
        dropDownBtn.querySelector('ion-icon').style.transform = 'rotate(180deg)'
        subMenu.style.height ='200px'
    }else{
        dropDownBtn.querySelector('ion-icon').style.transform = 'rotate(0deg)'
        subMenu.style.height ='0px'
    }
})
