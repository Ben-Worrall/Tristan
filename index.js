
var CharacterHolder = document.querySelector('#CharactersSelection')
var AmountOfChildren = CharacterHolder.children.length - 1
var interval
var interval2



if(localStorage.getItem('HighScore')){
  document.getElementById('HighScore').innerText = "High Score: " + localStorage.getItem('HighScore')
} else {
  localStorage.setItem('HighScore', 0)
}


localStorage.setItem('Character', "./assets/Character1.png")
document.getElementById('GameCharacter').src = "./assets/Character1.png"
document.getElementById('SelectCharacterRight').addEventListener('click', (e)=>{


for(let i = 0; i <= AmountOfChildren; i++){
    //console.log(CharacterHolder.children[i].style.cssText)
    if(CharacterHolder.children[i].style.cssText == "outline: white solid 0.1vh;" ){
        if(CharacterHolder.children[i+1]){
        
        CharacterHolder.children[i].style.cssText = ""
        CharacterHolder.children[i+1].style.cssText = "outline: white solid 0.1vh;"
        CharacterHolder.children[i+1].scrollIntoView({ behavior: 'smooth', block: 'nearest'})
        localStorage.setItem('Character', CharacterHolder.children[i+1].alt)
        document.getElementById('GameCharacter').src = CharacterHolder.children[i+1].alt
        return

        }
        return
    }
    
}



})

document.getElementById('SelectCharacterLeft').addEventListener('click', (e)=>{

    console.log('test')
    for(let i = 0; i <= AmountOfChildren; i++){
        console.log(i)
        if(CharacterHolder.children[i].style.cssText == "outline: white solid 0.1vh;" ){
            
            if(CharacterHolder.children[i-1]){

                

                CharacterHolder.children[i].style.cssText = ""
                CharacterHolder.children[i-1].style.cssText = "outline: white solid 0.1vh;"
                CharacterHolder.children[i-1].scrollIntoView({ behavior: 'smooth', block: 'nearest'})
                console.log(CharacterHolder.children[i-1].alt)
                localStorage.setItem('Character', CharacterHolder.children[i-1].alt)
                document.getElementById('GameCharacter').src = CharacterHolder.children[i-1].alt
                return
        
                }
                return
        }
        
    }
    
    
    })




document.getElementById('ChooseCharacterBNT').addEventListener('click', (e)=>{
    document.getElementById('CharacterBackground').style.display = ""
    document.getElementById('CharacterHolder').style.display = ""
})

document.getElementById('CharacterBackground').addEventListener('click', (e)=>{
    document.getElementById('CharacterBackground').style.display = "none"
    document.getElementById('CharacterHolder').style.display = "none"
})










var KEYPRESS = false

document.addEventListener('keydown', (event) => {
    
    let ArrowKeys = document.getElementById('Arrow-Keys')


    switch (event.key) {
        
      case 'ArrowUp':
        if(document.getElementById('Arrow-Keys').style.display !== "none"){
            if(KEYPRESS == false){

                ArrowKeys.src = "./assets/arrow-keys-Top.png"
                jump()
                console.log(document.getElementById('Game-Canvas').getBoundingClientRect().height)
                KEYPRESS = true
            }
            
        }
        break;
      
      case 'ArrowLeft':
        if(document.getElementById('Arrow-Keys').style.display !== "none"){
            if(KEYPRESS  == false){
                ArrowKeys.src = "./assets/arrow-keys-Left.png"
                //move character left
                if(document.getElementById('Character').getBoundingClientRect().left > (document.getElementById('Game-Canvas').getBoundingClientRect().left)+document.getElementById('Character').getBoundingClientRect().width/2){
                    document.getElementById('Character').style.left = (document.getElementById('Character').getBoundingClientRect().left - document.getElementById('Game-Canvas').getBoundingClientRect().left)-(document.getElementById('Game-Canvas').getBoundingClientRect().width/22) + "px"
                    KEYPRESS = true
                }
               
            }
        }
        break;
      case 'ArrowRight':
        if(document.getElementById('Arrow-Keys').style.display !== "none"){
            if(KEYPRESS  == false){
                ArrowKeys.src = "./assets/arrow-keys-Right.png"
                if(document.getElementById('Character').getBoundingClientRect().left+document.getElementById('Character').getBoundingClientRect().width <= (document.getElementById('Game-Canvas').getBoundingClientRect().left + document.getElementById('Game-Canvas').getBoundingClientRect().width)-document.getElementById('Character').getBoundingClientRect().width/3){
                    document.getElementById('Character').style.left = (document.getElementById('Character').getBoundingClientRect().left - document.getElementById('Game-Canvas').getBoundingClientRect().left)+(document.getElementById('Game-Canvas').getBoundingClientRect().width/22) + "px"
                    KEYPRESS = true
                }
                
            }
        }
    
        
        break;
        
      default:
        break;
        
    }
   
  });



  document.addEventListener('keyup', (event) => {
    
    let ArrowKeys = document.getElementById('Arrow-Keys')


    switch (event.key) {
      case 'ArrowUp':
        if(document.getElementById('Arrow-Keys').style.display !== "none"){
            ArrowKeys.src = "./assets/arrow-keys.png"
            KEYPRESS = false
        }
        break;
      case 'ArrowDown':
        if(document.getElementById('Arrow-Keys').style.display !== "none"){
             ArrowKeys.src = "./assets/arrow-keys.png"
             KEYPRESS = false
        }
        break;
      case 'ArrowLeft':
        if(document.getElementById('Arrow-Keys').style.display !== "none"){
            ArrowKeys.src = "./assets/arrow-keys.png"
            KEYPRESS = false
        }
        break;
      case 'ArrowRight':
        if(document.getElementById('Arrow-Keys').style.display !== "none"){
            ArrowKeys.src = "./assets/arrow-keys.png"
            KEYPRESS = false
        }
        break;
      default:
        break;
        
    }
   
  });

  

  const element = document.getElementById('Character');
  let isJumping = false;
  var jumpHeight; // Pixels to jump
  var jumpDuration = 750; // Duration in ms
  

  function jump() {
    

    if (isJumping) return; // Prevent multiple jumps
    isJumping = true;
    
    const initialTop = parseInt(window.getComputedStyle(element).top, 10);
    const targetTop = initialTop - jumpHeight;
    const startTime = performance.now();

    function animateJump(time) {
      const elapsed = time - startTime;
      const progress = elapsed / jumpDuration;
      
      if (progress < 0.5) {
        // Ascend
        const currentTop = initialTop - (jumpHeight * (progress * 2));
        element.style.top = `${currentTop}px`;
      } else if (progress < 1) {
        // Descend
        const currentTop = targetTop + (jumpHeight * ((progress - 0.5) * 2));
        element.style.top = `${currentTop}px`;
      } else {
        // End of jump
        element.style.top = `${initialTop}px`;
        isJumping = false;
        return;
      }

      requestAnimationFrame(animateJump);
    }

    requestAnimationFrame(animateJump);
  }





 

// Usage
const targetElement = document.querySelector('#Character');
const otherElements = document.querySelectorAll('.DodgeEl');

function isNotTouching(target, elements) {
  const targetRect = target.getBoundingClientRect();

  return elements.every(element => {
    const rect = element.getBoundingClientRect();
    return (
      targetRect.right < rect.left ||  // Target is to the left
      targetRect.left > rect.right ||  // Target is to the right
      targetRect.bottom < rect.top ||  // Target is above
      targetRect.top > rect.bottom     // Target is below
    );
  });
}


//start game

document.getElementById('StartGameBNT').addEventListener('click', (e)=>{
  document.getElementById('Game-Canvas').style.display = ""
  document.getElementById('Arrow-Keys').style.display = ""
  document.getElementById('Score').style.display = ""
  jumpHeight = document.getElementById('Game-Canvas').getBoundingClientRect().height/5
  document.getElementById('ButtonsHolder').style.display = "none"


 //aply animations
 document.getElementById('MovingElement00').style.animation = `MovingEl00 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
 document.getElementById('MovingElement0').style.animation = `MovingEl0 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
 document.getElementById('MovingElement1').style.animation = `MovingEl1 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
 document.getElementById('MovingElement2').style.animation = `MovingEl2 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
 document.getElementById('MovingElement3').style.animation = `MovingEl3 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
 document.getElementById('MovingElement4').style.animation = `MovingEl4 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`



 //start detection 
 StartCollition()
 Score()
 
})


function Score(){
  if(!interval2){
    interval2 = setInterval(() => {
  
      if (isNotTouching(targetElement, Array.from(otherElements))) {
        //not touching elements
        document.getElementById('NewScore').innerText =  Number(document.getElementById('NewScore').innerText) + 1
        
      } else {
        //touching elements
        
        if(localStorage.getItem('HighScore') < Number(document.getElementById('NewScore').innerText)){
          localStorage.setItem('HighScore', Number(document.getElementById('NewScore').innerText))
          document.getElementById('HighScore').innerText = "High Score: " + Number(document.getElementById('NewScore').innerText)
        }
        

        document.getElementById('NewScore').innerText = 0
  
        clearInterval(interval2)
        interval2 = null
      }
  
    }, 500);
   }
}


function StartCollition(){
  if(!interval){
    interval = setInterval(() => {
  
      if (isNotTouching(targetElement, Array.from(otherElements))) {
        //not touching elements
        
      } else {
        //touching elements
        
        document.getElementById('EndScreen-Holder').style.display = ""
        document.getElementById('Game-Canvas').style.display = "none"
        document.getElementById('Arrow-Keys').style.display = "none"
        document.getElementById('Score').style.display = "none"
        clearInterval(interval)
        interval = null
  
      }
  
    }, 1);
   }
}


document.getElementById('RestartBNT').addEventListener('click', (e)=>{



  document.getElementById('MovingElement00').style.animation = `MovingEl00 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
  document.getElementById('MovingElement0').style.animation = `MovingEl0 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
  document.getElementById('MovingElement1').style.animation = `MovingEl1 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
  document.getElementById('MovingElement2').style.animation = `MovingEl2 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
  document.getElementById('MovingElement3').style.animation = `MovingEl3 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`
  document.getElementById('MovingElement4').style.animation = `MovingEl4 ${Math.floor(Math.random() * 8) + 2.5}s linear infinite`

  document.getElementById('Game-Canvas').style.display = ""
  document.getElementById('Arrow-Keys').style.display = ""
  document.getElementById('Score').style.display = ""
  document.getElementById('EndScreen-Holder').style.display = "none"
  StartCollition()
  Score()
  

})





document.getElementById('HomeScreenBNT').addEventListener('click', (e)=>{


  document.getElementById('EndScreen-Holder').style.display = "none"

  document.getElementById('ButtonsHolder').style.display = ""
  document.getElementById('Title').style.display = ""



})












