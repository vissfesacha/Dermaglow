const router = require('express').Router();
let Products = require('../models/product.model.js');

const puppeteer= require('puppeteer');
const $ =require('cheerio');
const axios=require('axios');


var ProductInformation = [];

async function configureBrowser(link){
      const browser= await puppeteer.launch({args: ['--no-sandbox']});
      const page= await browser.newPage();
      await page.goto(link);
      return page;

}

async function checkPrice(page,consultedpage){
    
      await page.reload();
      let html= await page.evaluate(() => document.body.innerHTML);
      console.log("dabnt");
     if (consultedpage==="sephora") {
                
      $('div > span',html).each(function(){
      
            let dollarPrice=$(this).text();
            if (dollarPrice.indexOf("$")==0){
                 
                  let correctedPrice = Number(dollarPrice.replace(/[^0-9.-]+/g,""));
                  console.log("El precio es :", correctedPrice);
                  ProductInformation.push(correctedPrice);
            }
           
      })

      $('h1 span.css-0',html).each(function(){
            
            let nombre=$(this).text();
            console.log("El nombre es :", nombre);
            ProductInformation.push(nombre);
        
      })
      $('a span.css-57kn72',html).each(function(){
            
            let marca=$(this).text();
            console.log("La marca es :", marca);
            ProductInformation.push(marca);
        
      })
      } 
       
      if (consultedpage==="walmart") {
            console.log("ENTRE");
            
            let precio=$('#price',html).text();
            var pos = precio.indexOf("$", 2);
            var res = precio.slice(0, pos);
            let correctedPrice = Number(res.replace(/[^0-9.-]+/g,""));
            console.log("RESULTADO",correctedPrice)
            ProductInformation.push(correctedPrice);
          
            console.log("UN POOC KEKW")
            $('h1',html).each(function(){
            
                  let marca=$(this).text();
                  console.log("La NOMBRE es :", marca);
                  ProductInformation.push(marca);
              
            })
            console.log("UN POOC KEKW2")
            $(' div >.hf-Bot',html).each(function(){
            
                  let marca=$(this).text();
                  console.log("La NOMBRE es :", marca);
                  ProductInformation.push(marca);
              
            })


      }

      if (consultedpage==="amazon") {

            let precio=$('#priceblock_ourprice',html).text();
           
            let correctedPrice = Number(precio.replace(/[^0-9.-]+/g,""));
            console.log("RESULTADO",precio)
            ProductInformation.push(correctedPrice);
                   
            $('#productTitle',html).each(function(){
                  let nombre=$(this).text();
                  
                  console.log("El nombre es :", nombre);
                  ProductInformation.push(nombre);

                 
              
            })
            $('#bylineInfo',html).each(function(){
            
                  let marca=$(this).text();
                  console.log("la marca es :", marca);
                  ProductInformation.push(marca);
              
            })
          

      }

}

async function monitor(link,consultedpage){
      let page= await configureBrowser(link);
      await checkPrice(page,consultedpage);

}


router.route('/').get((req, res) => {
    Products.find()
      .then(products => res.json(products))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.delete('/delete/:id',(req, res) => {
      Products.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.post('/update/:id', async (req, res) => {
    
      const newPrice = await Products.findById({_id:req.params.id});
      var precioCOP =req.body.COPprice;
      var precioCOPunitario=req.body.unitaryCOPvalue;
      var precioUSDunitario= req.body.unitaryUSDvalue;
      var valordolar=req.body.COPprice/newPrice.price;
     
      if (newPrice.price!==req.body.price  || newPrice.quantity!==req.body.quantity) {
            var precioCOP2=req.body.price*valordolar;
            precioUSDunitario=req.body.price/req.body.quantity;
            var precioCOPunitario2=precioUSDunitario*valordolar;
        
            precioCOP = parseInt(precioCOP2, 10);
            precioCOPunitario = parseInt(precioCOPunitario2, 10);
         }

      var con=req.body.sellprice-req.body.unitaryCOPvalue;

       Products.findByIdAndUpdate({_id:req.params.id},{name: req.body.name ,quantity: req.body.quantity ,price: req.body.price, brand: req.body.brand, 
            COPprice: precioCOP,unitaryUSDvalue: precioUSDunitario ,unitaryCOPvalue: precioCOPunitario,margen: con,sellprice: req.body.sellprice}
            )
       .then(() => res.json('Product updated.'))
       .catch(err => res.status(400).json('Error: ' + err));


    });

  router.post('/add', async (req, res) => {
     const link2=req.body.url;
     const quantity=req.body.quantity;
     
      console.log("xxx",link2);
      var beg = link2.indexOf("www");
      var end = link2.indexOf("com");
      var consultedpage = link2.slice(beg+4, end-1);
      console.log("OJO",consultedpage);




      var newProduct="";


     await monitor(link2,consultedpage);
     console.log(ProductInformation);
   
    var brand=ProductInformation[2];
    var name=ProductInformation[1];
    var price=ProductInformation[0];
    var COPprice2=price*3754.514972;
    var unitaryUSDvalue=price/quantity;
    var unitaryCOPvalue2=unitaryUSDvalue*3754.514972;

    var COPprice = parseInt(COPprice2, 10);
    var unitaryCOPvalue = parseInt(unitaryCOPvalue2, 10);
    var margen=0;
    var sellprice=0;
   /*
    axios.get('https://openexchangerates.org/api/latest.json?app_id=7027f1cf6e4f4278b4e15b803e9a62ce')
    .then(res => console.log("xdd",res.data.rates.COP));
   */
    

    ProductInformation=[];
    console.log("NUEVO",ProductInformation);
    newProduct=new Products({
      brand,
     name,
     quantity,
     price,
     COPprice,
     unitaryUSDvalue,
     unitaryCOPvalue,
     sellprice,
   margen

   })


 console.log("FUNCION",newProduct);
  
  newProduct.save()
    .then(() => res.json('Product added'))
    .catch(err => res.status(400).json('Errororororo: ' + err));

  });

  module.exports = router;