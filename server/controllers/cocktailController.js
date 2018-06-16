"use strict";

const sharp = require("sharp");
const { s3 } = require("../awsConnect");

/**
 * Get cocktail image
 * 
 * @param {Object} req Request object
 * @param {Object} req.query Request query params
 * @param {String} req.query.layer1 Bottom cocktail layer
 * @param {String} req.query.layer2 Second cocktail layer
 * @param {String} req.query.layer3 Third cocktail layer
 * @param {String} req.query.layer4 Top cocktail layer
 * @param {Object} res Response object
 * 
 * @returns {Object<string> | Object<string, string>>} Response with cocktail image OR error
 */
async function getCocktail(req, res) {
    // Validation
    if (!validParams(req.query)) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    const { layer1, layer2, layer3, layer4 } = req.query;
    
    const layers = [ layer1, layer2, layer3, layer4 ].filter(Boolean);

    try {
        // Get glass and layer images
        const images = await getImages(layers);

        // Convert images to appropriate shapes  
        const [ glassShaped, ...layersShaped ] = await getShapedImages(images);
        
        // Compose images
        const result = await composeImages({ glass: glassShaped, layers: layersShaped });

        res.status(200).json({ data: dataToBase64(result) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

/**
 * Perform request parameters validation
 * 
 * @param {Object} params Request parameters
 * @param {Object} params.layer1 Expected bottom layer
 * @param {Object} params.layer2 Expected layer 2
 * @param {Object} params.layer3 Expected layer 3
 * @param {Object} params.layer4 Expected top layer
 * 
 * @returns {Boolean} Are parameters valid
 */
function validParams({ layer1, layer2, layer3, layer4, ...rest }) {
    if (Object.keys(rest).length !== 0) {
        return false;
    }

    const layers = [ layer1, layer2, layer3, layer4 ];

    // Test for prohibited characters
    const allowedRegexp = /^([a-z]|[A-Z])+(-([a-z]|[A-Z])+)*$/;

    if (layers.some( el => !(allowedRegexp).test(el) )) {
        return false;
    }

    // Test for holes
    for (let i = 0; i < layers.length; i++) {
        if (!layers[i]) {
            return layers.slice(i).every( el => !el );
        }
    }

    return true;
}

/**
 * Get images for the glass and layers
 * 
 * @async
 * 
 * @param {String[]} ingredients Keys to fetch from S3
 * 
 * @returns {Promise<[]>} Promise of images array
 */
function getImages(ingredients) {
    const getRequest = params => s3.getObject(params).promise();

    const glassRequest = getRequest({ Bucket: process.env.BUCKET_OTHER, Key: "glass.svg" });

    const ingredientsRequests = ingredients.map( 
        id => getRequest({ Bucket: process.env.BUCKET_GLASS, Key: `${id}.svg` }));

    return Promise.all([ glassRequest, ...ingredientsRequests ]);
}

/**
 * Get shaped images
 * 
 * @async
 * 
 * @param {Object[]} images Array of images to shape
 * 
 * @returns {Promise<[]>} Promise of shaped images array
 */
function getShapedImages(images) {
    const shapeOptions = [
        { width: 250, height: 400 }, // glass
        getImageShape({ width: 165, height: 120, rounded: true }), // bottom layer
        getImageShape({ width: 167, height: 82 }), // layer 2
        getImageShape({ width: 174, height: 73 }), // layer 3
        getImageShape({ width: 178, height: 73 })  // top layer
    ];
    
    const shapedImages = images.map( 
        (image, i) => shapeImage({ image: image.Body, shape: shapeOptions[i] }) 
    );
    
    return Promise.all(shapedImages);
}

/**
 * Get image shape for shaping
 * 
 * @param {Object} params Function parameters
 * @param {Number} width  Image width
 * @param {Number} height Image height
 * @param {Boolean} rounded Should image have round corners
 * 
 * @returns {Object<Number, Number, Buffer>} Generated image shape object 
 */
function getImageShape({ width, height, rounded }) {
    const mask = Buffer.from(
        `<svg style='opacity: 0.95'>
            <rect x='0' y='0' ${rounded ? "rx='44' ry='26'" : ""} width='${width}' height='${height}' />
        </svg>`);

    return { width, height, mask };
}

/**
 * Get shaped images (used in map)
 * 
 * @async
 * 
 * @param {Object} params Function parameters
 * @param {Buffer|String} params.image Image data to shape
 * @param {Object} params.shape Shape to apply to the image
 * @param {Number} shape.width  Image new width
 * @param {Number} shape.height Image new height
 * @param {Buffer} shape.mask   Image mask
 * 
 * @returns {Promise<Buffer>[]} Promises of shaped images
 */
function shapeImage({ image, shape: { width, height, mask } }) {
    let shaped = sharp(image).resize(width, height);

    if (mask) {
        shaped = shaped.overlayWith(mask, { cutout: true });
    }

    return shaped.toBuffer();
}

/**
 * Compose images of glass and layers
 * 
 * @async
 * 
 * @param {Object} params Function parameters
 * @param {Buffer} glass Glass image data
 * @param {Buffer[]} layers Array of layers images data
 * 
 * @returns {Promise<Buffer>} Promise of composed image
 */
function composeImages({ glass, layers }) {
    const positions = [
        { top: 240, left: 46 }, // bottom layer
        { top: 188, left: 46 }, // layer 2
        { top: 115, left: 42 }, // layer 3
        { top: 43, left: 40 }   // top layer
    ];

    const base = sharp(glass).toBuffer();

    const composite = layers.reduce(
        (input, overlay, index) =>
            input.then( data =>
                sharp(data).overlayWith(overlay, positions[index]).toBuffer()
            ),
        base
    );

    return composite;
}

/**
 * Convert data to base64
 * 
 * @param {Any} data Data to convert
 *
 * @returns {String} Data in Base64 format
 */
function dataToBase64(data) {
    const base64 = data.toString("base64");

    return `data:image/png;base64,${base64}`;
}

module.exports = { 
    getCocktail,
    validParams,
    getImages,
    getShapedImages,
    getImageShape,
    shapeImage,
    composeImages,
    dataToBase64
};