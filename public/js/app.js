console.log('Client side JS loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.querySelector('form input').value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=> {
    response.json().then((data) => {
        if(data.error) {
            let element = document.createElement('p')
            element.textContent = data.error
            document.querySelector('.error').appendChild(element)
            //console.log(data.error)
        } else {
            let element = document.createElement('p')
            element.textContent = data.location
            let element1 = document.createElement('p')
            element.textContent = data.forecast
            document.querySelector('.result').innerHTML = `${data.location} <br> ${data.forecast}`
            // console.log(data.location)
            // console.log(data.forecast)
        }
        
    })
})
})

