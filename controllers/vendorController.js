

const Vendor = require('../models/Vendor');
const Firm = require('../models/Firm'); // Add this line to require the Firm model

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const secretkey = process.env.whatisyourname;

const vendorRegister = async (req, res) =>{
    const {username, email, password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            email,
            password : hashedPassword
    })
    await newVendor.save();

    res.status(201).json({message:"Vendor Registered Successfully"});
    console.log("Vendor Registered Successfully");
    
    
  }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }        
}

const vendorLogin = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error:"Invalid Credentials"});
        }
         const token = jwt.sign({vendorId:vendor._id}, secretkey,{expiresIn:"1h"}); 

        res.status(200).json({message:" Login  Successfully",token});
        console.log(email , "this is token", token);
            
    }
    catch(error){
        console.error(error.stack);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getAllVendors = async (req, res) =>{
    try{
        const vendors = await Vendor.find().populate('firm');
        res.json(vendors);
    }catch(error){
        console.error(error.stack);
        res.status(500).json({error:"Internal Server Error"});
    }      
}

const getVendorById = async (req, res) =>{
    const vendorId = req.params.apple;

    try{
        const vendor = await Vendor.findById(vendorId);
        if(!vendor){
            return res.status(404).json({error:"Vendor not found"});
        }
        res.status(200).json(vendor);
            
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error"});
    }
        
}

module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById}; 
    
