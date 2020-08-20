import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';





import ProductsList from "./components/productos.component";
import AddProduct from "./components/addproduct.component";
import Shoppingcar from "./components/shoppingcar.component";



//
function App() {
  return (
    <Router>
    <div >
 

    <Route path="/" exact component={AddProduct} /> 
    <Route path="/teamoisa" exact component={ProductsList} /> 
    <Route path="/tequieroisa" exact component={Shoppingcar} /> 
    
    </div>
  </Router>
  );
}

export default App;
