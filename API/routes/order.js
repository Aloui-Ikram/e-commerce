const router = require("express").Router();
const { verfierToken, verfierTokenAuthoriz, verfierTokenAdmin } = require("./verifierToken");
const Order = require("../models/Order");
const Product=require('../models/Product')

router.post('/GETPRODUCTS', async (req, res) => {
  try {
    let Produits = [];
    req.body.forEach(element => {
      Produits.push(...element.products);
    });

    let PId = Produits.map(p => p.productId);
    console.log(PId);
    
    let response = [];
    for (const id of PId) {
      try {
        const product = await Product.findById(id);
        console.log("PRODUCT");
        console.log(product);
        response.push(product);
      } catch (err) {
        // Handle error if needed
      }
    }
    
    console.log("RESPONSE");
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    // Handle error if needed
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Create new order
router.post('/',async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update order (admin only)
router.put("/:id", verfierTokenAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user orders (authorized user only)
router.get("/find/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all orders (admin only)
router.get("/", verfierTokenAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete order (admin only)
router.delete("/:id", verfierTokenAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get monthly income (admin only)
router.get("/income", verfierTokenAdmin, async (req, res) => {
  // bch nkhdem lmon7ana f product sale
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      //bch ndir cond jdida ... prodid
      { $match: { createdAt: { $gte: prevMonth  },
          ...(productId && {
            products: { $elemMatch: { productId:productId } },
          }), } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;