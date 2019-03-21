let firstVar = 20
let secondVar = firstVar + 1

// strings
let firstName = "Anni" 
let lastName = "'Xu'"
let mName = firstName + '' + lastName

// Booleen 
let isTall = true 

// array (can include any type of data type)
let myShoppingList = ['milk', 'flour', 'sugar', 'eggs']
let myShoppingList = [23, true, [sugar], 'eggs']

// object, key-value pair 
let myPersonObject = {
    name:'Anni',
    isTall : true 
}
console.log(myPersonObject)


// DOT NOTATION (.key)
console.log(myPersonObject.name)


// BRACKET NOTATION (to get eggs)
console.log(myPersonObject[3])
console.log(myPersonObject['name'])



// function 
function addTogteher(first, last){
    console.log(arguments)
    console.log (first + " " + last)
                 }
  let firstName ='Anni'
  let lastName = "Xu"
  addtogether(firstName, lastName)









// no scoping issue 
$(function() {
 
    // Add a variable(obejct) "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
     let pet_info = {
         name:'Kobi',
         weight: 60,
         happiness: 10
     }
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    
  
  
  
    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness = pet_info.happiness + 1
      // Increase pet weight
      pet_info.weight += 1;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      // Decrease pet weight
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      // Decrease pet weight
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero, set it back to zero
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info.name);
      $('.weight').text(pet_info.weight);
      $('.happiness').text(pet_info.happiness);
    }
  })




