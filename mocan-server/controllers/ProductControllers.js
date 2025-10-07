const Product = require("../models/Product"); // import model Product
const cloudinary = require('../configurations/cloundinaryConfig');

// helper to upload a buffer to Cloudinary using upload_stream
const streamUpload = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'products', public_id: filename },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

exports.createProduct = async (req, res) => {
  try {
    const body = { ...req.body };

    // if files uploaded via multer, upload them to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadResults = [];
      for (const file of req.files) {
        // file.buffer available because we're using memoryStorage
        const publicId = file.originalname ? file.originalname.replace(/\.[^/.]+$/, '') + '-' + Date.now() : `img-${Date.now()}`;
        // upload buffer
        const result = await streamUpload(file.buffer, publicId);
        uploadResults.push(result.secure_url);
      }
      body.images = uploadResults;
    }

    // If there were no uploaded files, attempt to normalize any images field
    // coming from client (e.g. client sent JSON with preview blob URLs or
    // an array of objects). We only accept real http(s) URLs here.
    if ((!req.files || req.files.length === 0) && body.images) {
      try {
        let imgs = body.images;
        if (typeof imgs === 'string') {
          // sometimes client sends a JSON-stringified array
          imgs = JSON.parse(imgs);
        }
        if (Array.isArray(imgs)) {
          // keep only string URLs (http/https)
          const urls = imgs.filter((it) => typeof it === 'string' && /^https?:\/\//i.test(it));
          if (urls.length > 0) body.images = urls;
          else delete body.images; // nothing valid to save
        } else {
          // not an array, remove invalid images field
          delete body.images;
        }
      } catch (e) {
        // malformed JSON or other problem — ignore images field
        delete body.images;
      }
    }

    const product = new Product(body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('createProduct error', err);
    res.status(400).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    // body may be form-data or JSON; normalize
    const body = { ...req.body };

    // parse remove_images if present (could be JSON string)
    let toRemove = [];
    if (body.remove_images) {
      if (Array.isArray(body.remove_images)) toRemove = body.remove_images;
      else if (typeof body.remove_images === 'string') {
        try { toRemove = JSON.parse(body.remove_images); } catch (e) { toRemove = [body.remove_images]; }
      }
    }

    // remove URLs from product.images and attempt Cloudinary deletion
    if (toRemove.length > 0 && Array.isArray(product.images)) {
      for (const url of toRemove) {
        try {
          // attempt to derive public_id from URL
          const u = new URL(url);
          const parts = u.pathname.split('/').filter(Boolean);
          // find 'upload' index then take remainder as public id
          const uploadIdx = parts.indexOf('upload');
          let publicId = null;
          if (uploadIdx !== -1) {
            const after = parts.slice(uploadIdx + 1).join('/');
            publicId = after.replace(/\.[^/.]+$/, '');
          } else {
            publicId = parts[parts.length - 1].replace(/\.[^/.]+$/, '');
          }
          if (publicId) await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          console.error('Cloudinary delete failed', e);
        }
      }
      product.images = product.images.filter((u) => !toRemove.includes(u));
    }

    // process uploaded files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const publicId = file.originalname ? file.originalname.replace(/\.[^/.]+$/, '') + '-' + Date.now() : `img-${Date.now()}`;
        const result = await streamUpload(file.buffer, publicId);
        product.images = product.images ? [...product.images, result.secure_url] : [result.secure_url];
      }
    }

    // update other fields (handle JSON-stringified values)
    const fields = ['name', 'category', 'description', 'price', 'stock_quantity', 'manufacture_date', 'expiry_date', 'scent', 'skin_type'];
    fields.forEach(k => {
      if (body[k] !== undefined) product[k] = body[k];
    });
    if (body.dimensions) {
      try { product.dimensions = typeof body.dimensions === 'string' ? JSON.parse(body.dimensions) : body.dimensions; } catch (e) { }
    }
    if (body.colors) {
      try { product.colors = typeof body.colors === 'string' ? JSON.parse(body.colors) : body.colors; } catch (e) { }
    }
    if (body.tags) {
      try { product.tags = typeof body.tags === 'string' ? JSON.parse(body.tags) : body.tags; } catch (e) { }
    }

    const saved = await product.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.status(200).json({ message: "Đã xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

