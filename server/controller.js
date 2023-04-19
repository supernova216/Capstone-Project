require('dotenv').config()
const {CONNECTION_STRING}=process.env

const units = require('./units.json')
const classes = require('./classes.json')
const unitsCaps = require('./unitCap.json')
const classCaps = require('./classesCap.json')
const base = require('./bases.json')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    units_seed: (req,res) => {
        sequelize.query(`drop table if exists units;
        CREATE TABLE units (
            unit_id serial primary key, 
            unit_name varchar,
            hp integer, 
            str integer,
            mag integer,
            dex integer,
            spd integer,
            def integer,
            res integer,
            lck integer,
            bld integer
        );`).then(()=>{ 
            for (let i = 0; i < units.length; i++) {
                sequelize.query(`
                INSERT INTO units (unit_name,hp,str,mag,dex,spd,def,res,lck,bld)
                VALUES ('${units[i].Unit_name}',${units[i].HP},${units[i].Str},${units[i].Mag},${units[i].Dex},${units[i].Spd},${units[i].Def},${units[i].Res},${units[i].Lck},${units[i].Bld}) 
                ;`)
            }
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    },
    classes_seed: (req, res) => {
        sequelize.query(`drop table if exists classes;
        CREATE TABLE classes (
            class_id serial primary key, 
            class_name varchar,
            hp integer, 
            str integer,
            mag integer,
            dex integer,
            spd integer,
            def integer,
            res integer,
            lck integer,
            bld integer
        );`).then(() => {

            for (let i = 0; i < classes.length; i++) {
                sequelize.query(`
                INSERT INTO classes (class_name,hp,str,mag,dex,spd,def,res,lck,bld)
                VALUES ('${classes[i].Class_name}',${classes[i].HP},${classes[i].Str},${classes[i].Mag},${classes[i].Dex},${classes[i].Spd},${classes[i].Def},${classes[i].Res},${classes[i].Lck},${classes[i].Bld}) 
                `)
            }

            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    },
    getAllUnits:(req,res)=>{
        sequelize.query(`
        SELECT * FROM units
        `).then(dbRes=> res.status(200).send(dbRes[0]))
        .catch(theseHands=>console.log(theseHands))
    },
    getAllClasses:(req,res)=>{
        sequelize.query(`
        SELECT * FROM classes
        `).then(dbRes=>res.status(200).send(dbRes[0]))
        .catch(theseHands=>console.log(theseHands))
    },
    addTogether:(req,res)=>{
        let {unit_name,class_name}=req.body
        console.log(req.body)
        let unitStats = ''
        let classStats = ''
        sequelize.query(`
        SELECT unit_name,hp,str,mag,dex,spd,def,res,lck,bld FROM units
        WHERE unit_name='${unit_name}'
        `).then(dbRes=>{
            unitStats = dbRes[0][0]
            sequelize.query(`
        SELECT class_name,hp,str,mag,dex,spd,def,res,lck,bld FROM classes
        WHERE class_name='${class_name}'
        `).then(dbRes=>{
            classStats = dbRes[0][0]
            let obj = {
                "name":unitStats.unit_name,
                "class":classStats.class_name,
                "hp": unitStats.hp+classStats.hp,
                "str":unitStats.str+classStats.str,
                "mag":unitStats.mag+classStats.mag,
                "dex":unitStats.dex+classStats.dex,
                "spd":unitStats.spd+classStats.spd,
                "def":unitStats.def+classStats.def,
                "res":unitStats.res+classStats.res,
                "lck":unitStats.lck+classStats.lck,
                "bld":unitStats.bld+classStats.bld
        }
            res.status(200).send(obj)
        })
        .catch(theseHands=>console.log(theseHands))
        })
    },

    units_caps_seed: (req,res) => {
        sequelize.query(`drop table if exists unitsCaps;
        CREATE TABLE unitsCaps (
            unit_id serial primary key, 
            unit_name varchar,
            hp integer, 
            str integer,
            mag integer,
            dex integer,
            spd integer,
            def integer,
            res integer,
            lck integer,
            bld integer
        );`).then(()=>{ 
            for (let i = 0; i < units.length; i++) {
                sequelize.query(`
                INSERT INTO unitsCaps (unit_name,hp,str,mag,dex,spd,def,res,lck,bld)
                VALUES ('${unitsCaps[i].Name}',${unitsCaps[i].HP},${unitsCaps[i].Str},${unitsCaps[i].Mag},${unitsCaps[i].Dex},${unitsCaps[i].Spd},${unitsCaps[i].Def},${unitsCaps[i].Res},${unitsCaps[i].Lck},${unitsCaps[i].Bld}) 
                ;`)
            }
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    },
    classes_cap_seed: (req, res) => {
        sequelize.query(`drop table if exists classesCaps;
        CREATE TABLE classesCaps (
            class_id serial primary key, 
            class_name varchar,
            hp integer, 
            str integer,
            mag integer,
            dex integer,
            spd integer,
            def integer,
            res integer,
            lck integer,
            bld integer
        );`).then(() => {

            for (let i = 0; i < classes.length; i++) {
                sequelize.query(`
                INSERT INTO classesCaps (class_name,hp,str,mag,dex,spd,def,res,lck,bld)
                VALUES ('${classCaps[i].Class_name}',${classCaps[i].HP},${classCaps[i].Str},${classCaps[i].Mag},${classCaps[i].Dex},${classCaps[i].Spd},${classCaps[i].Def},${classCaps[i].Res},${classCaps[i].Lck},${classCaps[i].Bld}) 
                `)
            }

            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))  
},
    bases_seed: (req,res)=>{
        sequelize.query(`drop table if exists base;
        CREATE TABLE base (
            base_id serial primary key,
            unit_name varchar,
            class varchar,
            level integer,
            hp integer, 
            str integer,
            mag integer,
            dex integer,
            spd integer,
            def integer,
            res integer,
            lck integer,
            bld integer
        );`).then(()=>{
        for (let i = 0; i < base.length; i++) {
            sequelize.query(`
            INSERT INTO base (unit_name,class,level,hp,str,mag,dex,spd,def,res,lck,bld)
            VALUES ('${base[i].Name}','${base[i].Class}',${base[i].Level},${base[i].HP},${base[i].Str},${base[i].Mag},${base[i].Dex},${base[i].Spd},${base[i].Def},${base[i].Res},${base[i].Lck},${base[i].Bld}) 
            `)
        }

        res.sendStatus(200)
    })
    .catch(err => console.log('error seeding DB', err))  
},

  
    getUnitsCaps:(req,res)=>{
        sequelize.query(`
        SELECT * FROM units
        `).then(dbRes=> res.status(200).send(dbRes[0]))
        .catch(theseHands=>console.log(theseHands))
    },
    getClassesCaps:(req,res)=>{
        sequelize.query(`
        SELECT * FROM classes
        `).then(dbRes=>res.status(200).send(dbRes[0]))
        .catch(theseHands=>console.log(theseHands))
    },
    addCaps:(req,res)=>{
        let {unit_name,class_name}=req.body
        tempName = unit_name
        tempClass = class_name
        console.log(req.body)
        let unitStats = ''
        let classStats = ''
        sequelize.query(`
        SELECT unit_name,hp,str,mag,dex,spd,def,res,lck,bld FROM unitsCaps
        WHERE unit_name='${unit_name}'
        `).then(dbRes=>{
            unitStats = dbRes[0][0]
            console.log(unitStats)
            sequelize.query(`
        SELECT class_name,hp,str,mag,dex,spd,def,res,lck,bld FROM classesCaps
        WHERE class_name='${class_name}'
        `).then(dbRes=>{
            classStats = dbRes[0][0]
            console.log(tempName)
            let obj = {
                "name":unitStats.unit_name,
                "class":classStats.class_name,
                "hp": unitStats.hp+classStats.hp,
                "str":unitStats.str+classStats.str,
                "mag":unitStats.mag+classStats.mag,
                "dex":unitStats.dex+classStats.dex,
                "spd":unitStats.spd+classStats.spd,
                "def":unitStats.def+classStats.def,
                "res":unitStats.res+classStats.res,
                "lck":unitStats.lck+classStats.lck,
                "bld":unitStats.bld+classStats.bld
        }
        console.log(obj)
            res.status(200).send(obj)
        })
        .catch(theseHands=>console.log(theseHands))
        })
    },
    getAllBases:(req,res)=>{
        sequelize.query(`
        SELECT * FROM base
        `).then(dbRes=>res.status(200).send(dbRes[0]))
        .catch(theseHands=>console.log(theseHands))
    },
    getSelectBases:(req,res)=>{
        let {unit_name}=req.body
        sequelize.query(`
        SELECT unit_name,class,level,hp,str,mag,dex,spd,def,res,lck,bld FROM base
        WHERE unit_name='${unit_name}'
        `).then(dbRes=>{
            baseStats = dbRes[0][0]
            res.status(200).send(baseStats)
        })
        .catch(theseHands=>console.log(theseHands))
    }
    }