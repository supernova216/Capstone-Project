require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {units_seed,classes_seed,getAllClasses,getAllUnits,addTogether,units_caps_seed,classes_cap_seed,addCaps, getUnitsCaps,getClassesCaps,bases_seed,getAllBases, getSelectBases} = require('./controller.js')
const units = require('./units.json')
const classes = require('./classes.json')
const unitsCaps = require('./unitCap.json')
const classCaps = require('./classesCap.json')
const bases = require('./bases.json')

app.use(express.json())
app.use(cors())


app.post('/units',units_seed)
app.post('/classes',classes_seed)
app.post('/unitsCap',units_caps_seed)
app.post('/classesCap',classes_cap_seed)
app.post('/base',bases_seed)

app.get('/units',getAllUnits)
app.get('/classes',getAllClasses)
app.get('/unitsCap',getUnitsCaps)
app.get('/classesCap',getClassesCaps)
app.get('/base',getAllBases)

app.post('/total',addTogether)
app.post('/totalCap',addCaps)
app.post('/indBase',getSelectBases)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))