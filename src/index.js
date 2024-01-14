 function handleDogs(dog){
        let DogContainer=document.getElementById('dog-bar')
        let dogButtons=document.createElement('span')
dogButtons.classList.add("dogBtn")
dogButtons.id=dog.id

        dogButtons.innerHTML=`
    <h1>${dog.name}</h1>
        `
        DogContainer.appendChild(dogButtons)
dogButtons.addEventListener('click',function(){
    console.log('i am obedient')
    let dog_id=this.getAttribute('id')
    getDogInfo(dog_id)
})
    }


//alldogs
const getAllDogs=()=>{
    fetch('http://localhost:4000/pups')
    .then(res=>res.json())
    .then(data=>data.map(dog=>handleDogs(dog)))
}
getAllDogs()



//filter dogs
let filterbtn=document.querySelector('#good-dog-filter')
filterbtn.addEventListener('click',()=>{
    toggleFilter()
})
   
const toggleFilter=()=>{
let DogContainer=document.getElementById('dog-bar')
    DogContainer.innerHTML=''
    if(filterbtn.innerText==="Filter good dogs: OFF"){
        filterbtn.innerText="Filter good dogs: ON"
        fetch('http://localhost:4000/pups')
        .then(res=>res.json())
        .then(data=>data.filter(dog=>dog.isGoodDog===true).map(dog=>handleDogs(dog)))
    }else{
        filterbtn.innerText="Filter good dogs: OFF"
        fetch('http://localhost:4000/pups')
        .then(res=>res.json())
        .then(data=>data.map(dog=>handleDogs(dog))) 
    }
}

const getDogInfo=(dog_id)=>{
fetch(`http://localhost:4000/pups/${dog_id}`)
.then(res=>res.json())
.then(singleDog=>handleSingleDog(singleDog))
.catch(error=>console.error(error))
}

function handleSingleDog(single){
    let dogInfo=document.getElementById('dog-info')
    dogInfo.innerHTML=`
    <img src=${single.image} alt=${single.name}/>
    <h2>${single.name}</h2>
    `
 let btns= document.createElement('button')
    if(single.isGoodDog===true){
        btns.innerText="good dog"
        dogInfo.appendChild(btns)
}else{
    btns.innerText="bad dog"
    dogInfo.appendChild(btns)
}

}







