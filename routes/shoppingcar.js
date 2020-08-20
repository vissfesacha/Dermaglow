const router = require('express').Router();
let model = require('../models/product.model.js');





router.get('/',(req,res)=>{
    model.Shoppingcar.findById("5f3bf943577af80ac8360fbd")
      .then(products => res.json(products))
      .catch(err => res.status(400).json('Error: ' + err));


})

router.get('/total', async (req,res)=>{
  const car =await model.Shoppingcar.findById({_id:"5f3bf943577af80ac8360fbd"})
 
  var sumPrice =0, sumCOPprice=0, sumMargen=0 ,sumPV=0; 
  for (let i = 0; i < car.productos.length; i++) {
    sumPrice=sumPrice+car.productos[i].price;
    sumCOPprice=sumCOPprice+car.productos[i].COPprice;
    sumMargen=sumMargen+car.productos[i].margen;
    sumPV=sumPV+car.productos[i].sellprice;
 }
  const tot={
    price:sumPrice,
    COPprice:sumCOPprice,
    margen:sumMargen,
    sellprice:sumPV
   }
    res.json(tot);

})

router.post('/addToCar/:id', async (req,res)=>{
    const producto = await model.Product.findById({_id:req.params.id});
   
    const prod={
      brand:producto.brand,
      name:producto.name,
      quantity:req.body.cantidad,
      price:producto.price*req.body.cantidad,
      COPprice:producto.COPprice*req.body.cantidad,
      sellprice:producto.sellprice*req.body.cantidad,
      margen:(producto.sellprice*req.body.cantidad)-(producto.COPprice*req.body.cantidad)

    }
        
        
     var pr=  await model.Shoppingcar.findOne({"productos.name":producto.name})

        if (pr===null) {
          await model.Shoppingcar.updateOne({"_id":"5f3bf943577af80ac8360fbd"},{$push:{productos:prod}});  
        }else{


          await model.Shoppingcar.updateOne({"productos.name":producto.name},{ $inc:  {"productos.$.quantity":  req.body.cantidad ,"productos.$.price":producto.price*req.body.cantidad
          ,"productos.$.COPprice":producto.COPprice*req.body.cantidad,"productos.$.sellprice":producto.sellprice*req.body.cantidad,"productos.$.margen":(producto.sellprice*req.body.cantidad)-(producto.COPprice*req.body.cantidad)} } 
          
          
          );

        }
         res.json("bien");
        
          

   })

router.post('/buy', async (req,res)=>{
let Array=[];
 await model.Shoppingcar.findByIdAndUpdate({_id:"5f3bf943577af80ac8360fbd"},{productos: Array})
.then(() => res.json('Product updated.'))
.catch(err => res.status(400).json('Error: ' + err));
  

})


module.exports = router;