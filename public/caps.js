let unitCapSelect = document.querySelector('#unit-cap-select')
let classCapSelect = document.querySelector('#class-cap-select')
let capBtn = document.querySelector('#cap')

const displayUnitsCaps = () => {
    axios.get(`http://localhost:5432/unitsCap`)
        .then(res => {
            console.log(res.data)
            res.data.forEach(unit =>{
                const option = document.createElement('option')
                option.setAttribute('value', unit['unit_name'])
                option.textContent = unit.unit_name
                unitCapSelect.appendChild(option)
            })
        })
    }

const displayClassCaps = () => {
    axios.get(`http://localhost:5432/classesCap`)
        .then(res => {
            console.log(res.data)
            res.data.forEach(classes =>{
                const option = document.createElement('option')
                option.setAttribute('value', classes['class_name'])
                option.textContent = classes.class_name
                classCapSelect.appendChild(option)
            })
        })
    }

const addCaps = (caps) => {
    const capsContainer = document.querySelector('#caps-container')
    const capSection = document.createElement('section')
    capsContainer.innerHTML = ''
    capSection.innerHTML = `
        <p class ='name'>name: ${caps.name}</p>
        <p class='name'>class: ${caps.class}</p>
        <p class='hp'>hp: ${caps.hp}</p>
        <p class='str'>str: ${caps.str}</p>
        <p class='mag'>mag: ${caps.mag}</p>
        <p class='dex'>dex: ${caps.dex}</p>
        <p class='spd'>spd: ${caps.spd}</p>
        <p class='def'>def: ${caps.def}</p>
        <p class='res'>res: ${caps.res}</p>
        <p class='bld'>bld: ${caps.bld}</p>
        `
        capsContainer.appendChild(capSection)
        }   
        
const getCaps = (body) => {
    axios.post(`http://localhost:5432/totalCap`,body)
        .then((res)=>{
            addCaps(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        }

const displayCaps = (e) => {
    e.preventDefault()
            
    let unitName = document.querySelector('#unit-cap-select')
    let className = document.querySelector('#class-cap-select')
        
    let bodyObj = {
        unit_name: unitName.value,
        class_name: className.value
    }
        
    console.log(bodyObj)
    getCaps(bodyObj)
        
    unitName.value = ''
    className.value = ''
}

displayUnitsCaps()
displayClassCaps()
capBtn.addEventListener('click',displayCaps)