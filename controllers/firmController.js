
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+Path.extname( file.originalname));
    }
});
const upload = multer({ storage: storage });


const addFirm = async (req, res) => {
   try{
    const { firmName, area, category, region, offer, } = req.body;

    const image = req.file? req.file.filename : undefined;
    const vendor = await Vendor.findById(req.vendorId);
     
     if(!vendor){
             res.status(404).json({error:"Vendor Not Found"});
     }


    const firm = new Firm({
        firmName, area, category, region, offer, image, vendor: vendor._id 
        
    })

   const savedFirm = await firm.save();
    vendor.firm.push(savedFirm._id);
    await vendor.save();

    return res.status(201).json({message:"Firm Added Successfully"});
   }catch(error){
         console.error(error);
         res.status(500).json({error:"Internal Server Error"});
   }
    
}
const deleteFirmById = async (req, res) => {
    try{
        const firmId = req.params.firmId;
        const deletedProduct = await Firm.findByIdAndDelete(firmId);
        if(!deletedProduct){
            return res.status(404).json({error:"Product Not Found"});
        }
             
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}
module.exports = {addFirm :[upload.single('image'), addFirm], deleteFirmById};

