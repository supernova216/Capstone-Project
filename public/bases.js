let unitBaseSelect = document.querySelector('#unit-base-select')
let baseBtn = document.querySelector('#base')

const getBaseName = () => {
    axios.get(`http://localhost:5432/base`)
        .then(res => {
            console.log(res.data)
            res.data.forEach(unit =>{
                const option = document.createElement('option')
                option.setAttribute('value', unit['unit_name'])
                option.textContent = unit.unit_name
                unitBaseSelect.appendChild(option)
            })
        })
    }
const addBases = (base) => {
    const baseContainer = document.querySelector('#base-container')
    const baseSection = document.createElement('section')
    baseContainer.innerHTML = ''
    baseSection.innerHTML = `
        <p class='name'>name: ${base.unit_name}</p>
        <p class='class'>class: ${base.class}</p>
        <p class='level'>level: ${base.level}</p>
        <p class='hp'>hp: ${base.hp}</p>
        <p class='str'>str: ${base.str}</p>
        <p class='mag'>mag: ${base.mag}</p>
        <p class='dex'>dex: ${base.dex}</p>
        <p class='spd'>spd: ${base.spd}</p>
        <p class='def'>def: ${base.def}</p>
        <p class='res'>res: ${base.res}</p>
        <p class='bld'>bld: ${base.bld}</p>
        `
    baseContainer.appendChild(baseSection)
    }

const getBase = (body) => {
    axios.post(`http://localhost:5432/indBase`,body)
        .then((res)=>{
            addBases(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        }

const displayCaps = (e) => {
    e.preventDefault()
            
    let unitName = document.querySelector('#unit-base-select')
        
    let bodyObj = {
        unit_name: unitName.value,
    }
        
    console.log(bodyObj)
    getBase(bodyObj)
        
    unitName.value = ''
}

getBaseName()
baseBtn.addEventListener('click',displayCaps)