const overlay = document.querySelector('.overlay')
const sideMenu = document.getElementById('sideMenu')
const hamburgerBtn = document.getElementById('hamburgerBtn')
const dropDownBtn = document.getElementById('dropDown')
const leftCarouselBtn = document.querySelector('.leftBtn')
const rightCarouselBtn = document.querySelector('.rightBtn')
const carouselItems = document.querySelectorAll('.carouselItem')
const carouselOverlay = document.getElementById("carouselOverlay")
const bottomBtns = document.querySelectorAll('.bottomBtnLines')

let num = 0


function matchContNimage(imgId,contId){
    // this function will set containers height = to img height
    const image = document.getElementById(imgId);
    const container = document.getElementById(contId);
    const observer = new ResizeObserver(()=>{  
        container.style.height = `${image.offsetHeight}px`;
    })

    observer.observe(image);
}






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



// -----------------carousell scripts-------------------
function bottomBtnHandler(num){
    bottomBtns.forEach((btn, i) => {
        btn.classList.remove('botBtnActive')
        if(i === num){
            btn.classList.add('botBtnActive')
        }
    });

}

function showItem(num) {
    carouselItems.forEach(item => {
        item.style.display = 'none';
    });
    carouselItems[num].style.display = 'flex';
}

function fade(changeItemCallback){
    carouselOverlay.classList.add('fade')


    setTimeout(() => {
        if (changeItemCallback) changeItemCallback();
    }, 100); 
    carouselOverlay.addEventListener('transitionend',()=>{
        carouselOverlay.classList.remove('fade')
    })

}

bottomBtnHandler(num)


rightCarouselBtn.addEventListener('click', () => {
    fade(() => {
        if (num < carouselItems.length - 1) {
            num += 1;
        } else {
            num = 0;
        }
        bottomBtnHandler(num); // Call after updating num
        showItem(num); // Display the correct item
    });
});

leftCarouselBtn.addEventListener('click', () => {
    fade(() => {
        if (num > 0) {
            num -= 1;
        } else {
            num = carouselItems.length - 1;
        }
        bottomBtnHandler(num); // Call after updating num
        showItem(num); // Display the correct item
    });
});



// this one is for skill lines

const skillsObserver = new IntersectionObserver(([entry],observer) => {
    if (entry.isIntersecting) {
      document.getElementById("green").style.width = "100%"
      document.getElementById("blue").style.width = "90%"
      document.getElementById("yellow").style.width = "80%"
      document.getElementById("red").style.width = "70%"

      observer.unobserve(entry.target);
    }
});

// this  function animates numbers

function displayValue(targetValue, targetDiv,time) {
    let currentValue = 0;
    const displayDiv = document.getElementById(targetDiv);
  
    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue++;
        displayDiv.innerText = currentValue; 
      } else {
        clearInterval(interval);
      }
    }, time);
}

const amountObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        displayValue(100, "staff", 15);
        displayValue(200, "clients", 8); 
        displayValue(300, "projects", 5);
        displayValue(400, "runing", 4); 
  
        observer.unobserve(entry.target);
      }
    },
   
);





amountObserver.observe(document.querySelector(".numbersSection"))
skillsObserver.observe(document.querySelector(".skillsSection"))
showItem(num)