
const vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretkey = process.env.whatisyourname;


const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ error: "Token is Required" });
    }
    try {
        const decoded = jwt.verify(token,secretkey)
        const foundVendor = await vendor.findById(decoded.vendorId);
         
        if (!foundVendor) {
            return res.status(404).json({ error: "Vendor Not Found" });
        }

        req.vendorId = foundVendor._id;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;