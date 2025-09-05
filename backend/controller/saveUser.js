const userModel = require("../models/userModel")

async function saveUserController(req, res){
    try {
        const {name, email, phone, company, notes} = req.body

        if(!name) return res.status(400).json({ message: "Name is required" });
        if(!email) return res.status(400).json({ message: "Email is required" });
        if(!phone) return res.status(400).json({ message: "Phone number is required" });
        if(!company) return res.status(400).json({ message: "Company is required" });

        const exists = await userModel.findOne({
            $or: [{ email }, { phone }]
        }) 
        if(exists) {
            if (exists.email===email) {
                return res.status(400).json({ message: "Email already exists", success:true });
            }
            if (exists.phone===phone) {
                return res.status(400).json({ message: "Phone number already exists", success:true });
            }
        }

        const payload = {name, email, phone, company, notes}
        const newList = new userModel(payload)
        const stored = await newList.save()

        res.status(201).json({
            message: "List data saved",
            data: stored,
            success: true,
            error: false
        })
    } 
    catch (err) {
        res.status(500).json({
            message: err || "Error occurred in saveUser.js",
            success: false,
            error: true
        })    
    }
}

module.exports = saveUserController