const express = require('express');
const cors = require('cors');
const dbconfig = require('./database/connection.js');
const {info, error} = require('console');
const Product = require('./database/models/ProductModels.js');
const app = express();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dfajnjzr0',
    api_key: '639812519684449',
    api_secret: 'c69iDEmC68KbHHpdWY64ITh64VM',
});

// Function to delete an image from Cloudinary
const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted:', result);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

// Example usage within an Express route
app.post('/ads/deleteImage', async function (req, res) {
    try {
        const {publicId} = req.body; // The public ID of the image to delete
        const deleteResult = await deleteImageFromCloudinary(publicId);
        res.status(200).send({message: "Image deleted successfully", result: deleteResult});
    } catch (error) {
        res.status(500).send({error: 'An error occurred while deleting the image'});
    }
});


//use cors middleware to allow cross-origin requests localhost
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let imageurls = [];

app.post('/ads/posting/getImageUrls', async function (req, res) {
    try {
        const {imageData} = req.body;
        console.log('Received image data:', imageData);

        // Assuming imageData is an array of objects, each containing a `url` property
        if (imageData && Array.isArray(imageData)) {
            imageurls = []; // Clear any previous data
            for (const item of imageData) {
                imageurls.push({imageKey: item.imageKey, url: item.url});
            }
            res.status(200).send({message: "Image URLs processed successfully!"});
        } else {
            res.status(400).send({error: "Invalid image data format"});
        }
    } catch (e) {
        console.error("Error processing image URLs:", e);
        res.status(500).send({error: "An error occurred while processing image URLs"});
    }
});


//post ads
app.post('/ads/posting', async function (req, res) {
    try {
        const {userId, title, address, city, state, zipCode, description, category, phoneNumber, price} = req.body;
        console.log('Ad data received:', req.body);

        if (imageurls.length === 0) {
            console.log('No image URLs found!!!');
            res.status(400).send({error: 'No image URLs provided'});
        } else {
            console.log('Image URLs:', imageurls);
            const newProduct = new Product({
                userId,
                title,
                address,
                city,
                state,
                zipCode,
                description,
                category,
                phoneNumber,
                price,
                photoURLs: imageurls, // Use imageurls array populated earlier
            });
            await newProduct.save();
            imageurls = []; // Clear imageurls after use
            res.status(200).send(newProduct);
        }

    } catch (error) {
        console.error('Error in posting ad:', error);
        res.status(500).send({error: 'An error occurred while posting the ad'});
    }
});

//get the products
app.get(`/ads/allads`, async function (req, res) {
    try {
        const getAllAds = await Product.find({});
        if (getAllAds) {
            res.status(200).send(getAllAds);
        } else {
            res.status(500).send("Internal Server error!")
        }
    } catch (error) {

    }
});

//get single products
app.get(`/ads/products/:id`, async function (req, res) {
    try {
        const {id} = req.params;
        const productDetails = await Product.findById(id);
        if (!productDetails) {
            return res.status(404).send({message: 'Product not found'});
        }
        res.status(200).send(productDetails);
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching product details'});
    }
})

app.get(`/ads/:id/manageAds`, async function (req, res) {
    try {
        const {id} = req.params;
        const getUserProducts = await Product.find({userId: id});
        if (!getUserProducts) {
            return res.status(404).send({message: "Product not found"});
        }
        res.status(200).send(getUserProducts)

    } catch (e) {
        res.status(500).send({error: "An Error occured while fetching the product"})
    }
})

app.post('/ads/:id/manageAds/delete', async function (req, res) {
    try {
        const {id} = req.params;
        const productDetails = await Product.findById(id);
        let publicKeys = [];
        if (productDetails) {
            const photos = await productDetails.photoURLs;
            if (photos) {
                for (const p of photos) {
                    await cloudinary.uploader.destroy(p.imageKey);
                }
            }
            await Product.deleteOne({_id: id});
        }
        if (!productDetails) {
            return res.status(404).send({message: 'Product not found!!'})
        }
        res.status(200).send({message: "Product Deleted Successfully!", keys: publicKeys});
    } catch (err) {
        console.log(err)
        res.status(500).send({error: "Unknown server error!"})
    }
})

app.get(`/ads/products/category/:category`, async function(req, res){
    try{
        const {category} = req.params;
        if(!category)
            return;
        console.log(req.params)
        const product = await Product.find({category: category});
        if(product){
            console.log(res);
            res.status(200).send(product);
        } else {
            res.status(404).send({message: 'Category not found'})
        }
    } catch(error){
        console.error('Failed')
        res.status(404).send({message: 'Category not found'})
    }
})

app.listen(5100, async () => {
    try {
        info('Server is running on port 5000');
        await dbconfig();
    } catch (err) {

    }
});