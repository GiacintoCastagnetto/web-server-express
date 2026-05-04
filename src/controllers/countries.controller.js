const {response, request} = require("express");
const Country = require("../models/country.model");
const {mongoose} = require("mongoose");

const getCountries = async (req = request, res = response) => {
    const {q} = req.query;
    
    try{
        const countries = await Country.find({name: RegExp(q)});
        res.status(200).json(countries);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

const getCountryById = async (req = request, res = response)=>{
    const {id} = req.params;
    try{
        if(!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                msg:"Pais no encontrado"
            });
        }
        const country = await Country.findOne({_id: id});
        if(!country){
            return res.status(404).json({
                msg:"Pais no encontrado"
            });
        }
        res.status(200).json(country);
    }
    catch (error){
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

const createCountry = async (req = request, res = response) => {
    const {name, population, flagUrl, capital, region} = req.body;

    if(!name || !population || !flagUrl || !capital || !region){
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }
    try{
        const newCountry = new Country({
            name: name,
            population: population,
            flagUrl: flagUrl,
            capital: capital,
            region: region
        })
        await newCountry.save();
        res.status(200).json({
            msg: "Pais creado con exito"
        });
    } catch (error){
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

const updateCountry = async (req = request, res = response) => {
    const {id} = req.params;
    const {name, population, flagUrl, capital, region} = req.body;

    if(!name || !population || !flagUrl || !capital || !region){
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }

    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({
            msg: "Pais no encontrado"
        });
    }

    res.status(200).json({
        msg: "PUT Countries"
    })
}

const deleteCountry = async (req = request, res = response) => {
    const {id} = req.params;
    
    try{
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                msg: "Pais no encontrado"
            });
        }

        const result = await Country.deleteOne({_id: id});
        if(result.deletedCount === 1){
            res.status(200).json({
                msg: "Pais eliminado con exito"
            });
        } else {
            res.status(404).json({
                msg: "Pais no encontrado"
            });
        }
    }
    catch (error){
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

module.exports = {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry
}