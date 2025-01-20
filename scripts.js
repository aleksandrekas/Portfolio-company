const overlay = document.querySelector('.overlay')
const sideMenu = document.getElementById('sideMenu')
const hamburgerBtn = document.getElementById('hamburgerBtn')
const dropDownBtn = document.getElementById('dropDown')
const leftCarouselBtn = document.querySelector('.leftBtn')
const rightCarouselBtn = document.querySelector('.rightBtn')
const carouselItems = document.querySelectorAll('.carouselItem')
const carouselOverlay = document.getElementById("carouselOverlay")
const bottomBtns = document.querySelectorAll('.bottomBtnLines')
const portfolioImgs = document.querySelectorAll('.categoryImg')
const portfolioItems = document.querySelectorAll('.categoryItem')
const filterBtns = document.querySelectorAll('.filterButtons button')
const categoriesOverlay = document.querySelector('.categoriesOverlay')


let num = 0


// this function sets height of parent to = height of its child image
function updateHeights() {
    portfolioItems.forEach((cont, index) => {
        cont.style.height = `${portfolioImgs[index].offsetHeight}px`;
    });
  }

  portfolioImgs.forEach(image => {
    const observer = new ResizeObserver(() => {
        updateHeights();
    });
    observer.observe(image);
});
// ---------



window.addEventListener('scroll',()=>{
    if(window.scrollY >=30){
        document.querySelector("header").classList.add('scrolled')
        document.querySelector('.scrollUp').style.opacity = '1'
    }else{
        document.querySelector("header").classList.remove('scrolled')
        document.querySelector('.scrollUp').style.opacity = '0'
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


// fade effect for portfolio container
function fadePortfolio(changeItemCallback){
    categoriesOverlay.classList.add('fadeWhite')
    setTimeout(() => {
        if (changeItemCallback) changeItemCallback();
    }, 500); 
    categoriesOverlay.addEventListener('transitionend',()=>{
        categoriesOverlay.classList.remove('fadeWhite')
    })

}




// filtering through items
filterBtns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        filterBtns.forEach(item =>{
            item.classList.remove('Active')
        })
        btn.classList.add('Active')
        const filterValue = btn.getAttribute('data-filter')
        fadePortfolio(()=>{
            portfolioItems.forEach(pItem =>{
                const itemValue = pItem.getAttribute('data-category')
                pItem.style.display = 'flex'
                if(filterValue === 'all'){
                    pItem.style.display = 'flex'
                }else if(filterValue != itemValue){
                    pItem.style.display = 'none'
                }else{
                    pItem.style.display = 'flex'
                }
            })
        })
    })
})










amountObserver.observe(document.querySelector(".numbersSection"))
skillsObserver.observe(document.querySelector(".skillsSection"))
showItem(num)