const URL = 'http://localhost:3000/monsters';
const monsterContainer = document.querySelector('#monster-container');
const back = document.querySelector('#back');
const forward = document.querySelector('#forward');
const updateForm = document.querySelector('#update')
const limit = document.querySelector('#limit')
const page = document.querySelector('#page')
const form = document.querySelector('form')

async function fetchFunc(pageNo, num) {
    const response = await fetch(URL)
    const arr = await response.json()
    let start= (pageNo-1) * num
    let end = start + num 
    let display = arr.slice(start, end)
    monsterContainer.replaceChildren()
    display.forEach(displayMonsters);
}

function displayMonsters(monster) {
	const div = document.createElement('div');
	const name = document.createElement('h2');
	name.textContent = monster.name;
	const age = document.createElement('h4');
	age.textContent = monster.age;
	const p = document.createElement('p');
	p.textContent = monster.description;
	div.appendChild(name);
	div.appendChild(age);
	div.appendChild(p);
	monsterContainer.appendChild(div);
}

updateForm.addEventListener('submit', e => {
    e.preventDefault()
    updatePage()
})

updatePage()

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e.defaultPrevented)
    const name = form.querySelector('#name')
    const age = document.querySelector('#age')
    const description = document.querySelector('#description')
    fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            age: age.value,
            description: description.value
        })
    })
    form.reset()
    updatePage()
    // console.log('reached')
})

function updatePage() {
    let pageNo = +page.value
    let num = +limit.value
    fetchFunc(pageNo, num)
}