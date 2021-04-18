console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function () {
    loadImages()
    fetchDogBreeds()
    filterBreed()
})

const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
const dogBreedList = []

function loadImages() {
    fetch(imgUrl).then(resp => resp.json()).then(function(json) {
        json.message.forEach(url => addImage(url))
    })
}

function addImage(url) {
    let imageDiv = document.getElementById('dog-image-container')
    let image = document.createElement('img')
    image.src = url
    imageDiv.appendChild(image)
}

function fetchDogBreeds() {
    fetch(breedUrl).then(resp => resp.json()).then(function(json) {
        Object.keys(json.message).forEach(function(breed) {
            dogBreedList.push(breed)
            addBreed(breed)
        })
    })
}

function addBreed(breed) {
    let ul = document.getElementById('dog-breeds')
    let li = document.createElement('li')
    li.innerHTML = breed
    ul.appendChild(li)
    li.addEventListener("click", function(e) {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        li.style.color = '#' + randomColor
    })
}


function filterBreed() {
    const select = document.getElementById('breed-dropdown')
    select.addEventListener("change", function(e) {
        document.querySelectorAll('li').forEach(li => li.remove())
        dogBreedList.filter(dogBreed => dogBreed.startsWith(select.value)).forEach(function(breed) {
            addBreed(breed)
        })
    })
}

