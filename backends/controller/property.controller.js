
const Property = require('../model/property.schema');

const addProperty = async (req, res) => {
    try {
        const {
            property_name,
            description,
            price,
        } = req.body;
        if (!property_name || !price || !description) {
            return res.send({ message: "please fill all fields" })
        }
        let product_data = await Property.create(req.body)
        return res.status(201).send({
            message: "product add successfully",
            statusCode: 201,
            data: product_data,
        });
    }
    catch (err) {
        console.log(err.message)
        res.status(200).send({ message: "there is someting error..", error: err.message });
    }
}



const getAllProperties = async (req, res) => {
    try {
        const product_data = await Property.find({ status: true })
        if (product_data.length > 0) {
            return res.send({
                message: "get all data sucessfully!",
                data: product_data,
            })
        } else {
            return res.send({ message: "data not found" })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}


const propertyDetails = async (req, res) => {
    const property_id = req.params.id
    try {
        const product_data = await Property.findById({ _id: property_id })
        if (product_data) {
            console.log("product_data", product_data)
            return res.send({ message: "get datails successfully!", data: product_data })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}


const updatePropertyDetails = async (req, res) => {
    const property_id = req.params.id
    const {
        property_name,
        description,
        price,
        address,
        rating,
        property_type,
        aminites,
        booking_start_date,
        booking_end_date
    } = req.body
    try {
        const product_data = await Property.updateOne({ _id: property_id }, {
            $set: {
                property_name,
                description,
                price,
                address,
                rating,
                aminites,
                property_type,  
                booking_start_date,
                booking_end_date,
                status: false
            }
        })
        if (product_data) {
            console.log("product_data", product_data)
            return res.send({ message: "update successfully!", data: product_data })
        }else{
            console.log("product_data", product_data)
            return res.send({ message: "Data not found!" })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}


const deletePropertyDetails = async (req, res) => {
    const property_id = req.params.id
    try {
        const product_data = await Property.updateOne({ _id: property_id }, {
            $set: {
                status: false
            }
        })
        if (product_data) {
            console.log("product_data", product_data)
            return res.send({ message: "update successfully!", data: product_data })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}


const searchProperty = async (req, res) => {
    const query = req.query.query || ''; // Search query
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Infinity;
    const property_type = req.query.property_type || '';
    const property_name = req.query.property_name || '';
    const city = req.query.city || '';
    const available_from = req.query.available_from || '';
    try {
        const items = await Property.find({
            property_name: { $regex: property_name, $options: 'i' },
            price: { $gte: minPrice, $lte: maxPrice },
            property_type: { $regex: property_type, $options: 'i' }, 
            city: { $regex: city, $options: 'i' }, 
            available_from: { $regex: available_from, $options: 'i' }, 
        });
        res.send({ data: items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    addProperty,
    getAllProperties,
    propertyDetails,
    updatePropertyDetails,
    deletePropertyDetails,
    searchProperty
}
