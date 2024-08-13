// cloudinaryConfig.js

export const cloudinaryConfig = {
    cloud_name: 'dfajnjzr0',
    api_key: '639812519684449',
    api_secret: 'c69iDEmC68KbHHpdWY64ITh64VM', // Replace with your actual Cloudinary API secret (used for generating signatures)
    folder: 'bangla-bazaar/uploads', // Specify the folder where images will be uploaded
    generateSignature: (paramsToSign) => {
        const crypto = require('crypto');
        const paramsString = Object.keys(paramsToSign)
            .sort()
            .map((key) => `${key}=${paramsToSign[key]}`)
            .join('&');
        return crypto
            .createHash('sha1')
            .update(paramsString + cloudinaryConfig.api_secret)
            .digest('hex');
    },
};
