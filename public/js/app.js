const dummyapi = 'http://puzzle.mead.io/puzzle'

fetch(dummyapi).then((response) => {
    response.json().then((data) => {
        console.log(data);
        const puzzleanswer = document.getElementById('puzzleoftheday')
        console.log(puzzleanswer);
        puzzleanswer.innerHTML = `<p> the puzzle of the day is ${data.puzzle}. Have a good day!</p>`
    })
})

const searchlocation = document.querySelector('form')
const searchinput = document.querySelector('input')
searchlocation.addEventListener('submit', (e) => {
    e.preventDefault() //default action of page refresh each time you click
    console.log(`test button click event, input value is ${searchinput.value}.`);
    const webserverurl = `/forecast?address=${searchinput.value}`
    fetch(webserverurl).then((response) => {
        response.json().then((data) => {
            const messageOne = document.querySelector('#message-1')
            const messageTwo = document.querySelector('#message-2')
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(messageOne);
            } else {
                messageOne.textContent = `Latest Weather Report for location ${searchinput.value}.`
                messageTwo.textContent = `Temperature is ${data.data.currenttemperature} degC and feels like ${data.data.currentfeelslike} degC.`
                console.log(messageOne);
            }
        })
    })
})