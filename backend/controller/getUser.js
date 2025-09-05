const userModel = require("../models/userModel")

async function getUserController(req, res){
    try {
        const getAll = await userModel.find()

        res.status(200).json({
            message: "List fetched",
            data: getAll,
            success: true,
            error: false
        })
    } 
    catch (err) {
        res.status(400).json({
            message: err || "Error occurred in getUser.js",
            success: false,
            error: true
        })    
    }
}

module.exports = getUserController