let unitSelect = document.querySelector('#unit-select')
let classSelect = document.querySelector('#class-select')
let growthsBtn = document.querySelector('#growths')


const displayAllUnits = () => {
    axios.get(`http://localhost:5432/units`)
        .then(res => {
            console.log(res.data)
            res.data.forEach(unit =>{
                const option = document.createElement('option')
                option.setAttribute('value', unit['unit_name'])
                option.textContent = unit.unit_name
                unitSelect.appendChild(option)
            })
        })
    }


const displayAllClasses = () => {
    axios.get(`http://localhost:5432/classes`)
        .then(res => {
            console.log(res.data)
            res.data.forEach(classes =>{
                const option = document.createElement('option')
                option.setAttribute('value', classes['class_name'])
                option.textContent = classes.class_name
                classSelect.appendChild(option)
            })
        })
    }


const addGrowths = (growth) => {
    const growthsContainer = document.querySelector('#growths-container')
    const growthSection = document.createElement('section')
    console.log(growth)
    growthsContainer.innerHTML = ''
    growthSection.innerHTML = `
        <p class='name'>name: ${growth.name}</p>
        <p class='name'>class: ${growth.class}</p>
        <p class='hp'>hp: ${growth.hp}%</p>
        <p class='str'>str: ${growth.str}%</p>
        <p class='mag'>mag: ${growth.mag}%</p>
        <p class='dex'>dex: ${growth.dex}%</p>
        <p class='spd'>spd: ${growth.spd}%</p>
        <p class='def'>def: ${growth.def}%</p>
        <p class='res'>res: ${growth.res}%</p>
        <p class='bld'>bld: ${growth.bld}%</p>
        `
    growthsContainer.appendChild(growthSection)
    }


const getGrowths = (body) => {
    axios.post(`http://localhost:5432/total`,body)
        .then((res)=>{
            addGrowths(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}


const displayGrowths = (e) => {
    e.preventDefault()
    
    let unitName = document.querySelector('#unit-select')
    let className = document.querySelector('#class-select')

    let bodyObj = {
        unit_name: unitName.value,
        class_name: className.value
    }

    console.log(bodyObj)
    getGrowths(bodyObj)

    unitName.value = ''
    className.value = ''
}


displayAllUnits()
displayAllClasses()
growthsBtn.addEventListener('click',displayGrowths)

