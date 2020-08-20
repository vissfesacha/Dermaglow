import React, { Component } from 'react';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt,faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import '../styles/stylesheet.css';
import car from '../images/fondo7.jpeg';

export default class ProductsList extends Component {
    constructor(props) {
      super(props);
      
      this.deleteProduct = this.deleteProduct.bind(this)
  
      this.state = {
      products: [],
      modalInsertar:false,
      totalprice: '',
      totalCOPprice:'',
      totalMargen:'',
      totalPV:''
        
      };
    }
  
    componentDidMount() {
     this.getProduct();
     this.getTotal();
     
    }

    modalInsertar=()=>{
     this.setState({modalInsertar:!this.state.modalInsertar });
      
    }
    
  
  
   
  
    getProduct=()=> {
      //axios.get('https://dermaglow.herokuapp.com/products/') 
     axios.get('https://dermaglow.herokuapp.com/shoppingcar/') 
     .then(response => {
               
                this.setState({ products: response.data.productos })
      }).catch((error) => {
        console.log(error);
      })
         
      
       
  
    }
    getTotal=()=> {
      axios.get('https://dermaglow.herokuapp.com/shoppingcar/total/') 
      .then(response => {
               
                 this.setState({ totalprice: response.data.price ,
                                 totalCOPprice:response.data.COPprice,
                                 totalMargen:response.data.margen,
                                 totalPV:response.data.sellprice})
       }).catch((error) => {
         console.log(error);
       })

    }
  
   
   
     deleteProduct= (id)=> {
     
    //  axios.delete('https://dermaglow.herokuapp.com/products/delete/'+id)
       axios.delete('https://dermaglow.herokuapp.com/products/delete/'+id)
       .then(response => {
        this.getProduct();
     }).catch(error =>{
       console.log(error);
     })
      
   }
  
   cart= (id)=> {
    axios.post('https://dermaglow.herokuapp.com/shoppingcar/addToCar/'+id)
    .then(response => {
     this.getProduct();
  }).catch(error =>{
    console.log(error);
  })
  
  
   }
  
   buy() {
     
    axios.post('https://dermaglow.herokuapp.com/shoppingcar/buy/')
    .then(response => {
     this.getProduct();
     this.getTotal();
  }).catch(error =>{
    console.log(error);
  })
  
  
   }
  
   gotofrontpage(){
  
    window.location = '/teamoisa';
  
   }
    
  
   
  
    render() {
      
      return (
        <div class="card" style ={ { backgroundImage: "url("+car+")" } }>
            
  
        <h3 class="card-header  text-center  text-capitalize py-4" >Dermaglow</h3>
        
           
  
        <div class="card-body">
  
  
       
       
  
  
          <div id="table" >
            <span class="table-add float-right mb-3 mr-2"><a href="#!" class="text-success"><i
                  class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
            <table class="table table-sm table-bordered table-responsive-md table-striped table-hover text-center">
                 
              <thead>
                
              <tr>
                  <th data-field="Marca" >Marca</th>
                  <th data-field="Nombre del producto" >Nombre del producto</th>
                  <th data-field="Cantidad" >Cantidad</th>
                  <th data-field="Precio(USD)" >Precio(USD)</th>
                  <th data-field="Precio(COP)" >Precio(COP)</th>
                
                  <th data-field="Valor de venta" >Valor de venta</th>
                  <th data-field="Margen ganancia" >Margen de ganancia</th>
                  <th data-field="Opciones" >Opciones</th>
                               
                 
                </tr>
              </thead>
              <tbody>
                
              { this.state.products.map(producto=>{
                return(
                  <tr>
                  <td>{producto.brand } </td>
                  <td>{producto.name } </td>
                  <td>{producto.quantity}</td>
                  <td>{producto.price}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(producto.COPprice)}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(producto.sellprice)}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(producto.margen)}</td>
                  
                  <td>
                  <button className="btn btn-danger" onClick={()=>{this.deleteProduct(producto._id)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
               
                  </tr>
                )

               }) }
                   <tr>
                   <td></td>
                    </tr>
                   <tr>
                   <td></td>
                   </tr>

                      <tr>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td>{new Intl.NumberFormat("en-EN").format(this.state.totalprice)} </td>
                      <td>{new Intl.NumberFormat("en-EN").format(this.state.totalCOPprice)} </td>
                      <td>{new Intl.NumberFormat("en-EN").format(this.state.totalPV)} </td>
                      <td>{new Intl.NumberFormat("en-EN").format(this.state.totalMargen)} </td>
                      <td></td>
                      
                      
                      <td></td>
                     </tr>

                   



               
                 
                
                
              </tbody>
            </table>
  
               
  
                <div align="left" >
                <button className="login2-form-btn" onClick={()=>{this.gotofrontpage()} }>Seguir añadiendo productos</button>
                </div>
                <div align="right" >
              <button className="login-form-btn" onClick={()=>{this.buy()} }>Vaciar carrito</button>
             
              </div>
  
             
  
          
          </div>
         
         
        </div>
      </div>
      )
    }
  }