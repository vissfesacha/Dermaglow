import React, { Component } from 'react';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';




export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    
    this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {
    products: [],
    modalInsertar:false,
    form:{
      brand:'',
      name:'',
      quantity:'',
      price:'',
      COPprice:'',
      unitaryUSDvalue:'',
      unitaryCOPvalue:'',
      margen:'',
      sellprice:'',
      tipoModal:''
   
    }
      
    };
  }

  componentDidMount() {
   this.getProduct();

  }
  modalInsertar=()=>{
   this.setState({modalInsertar:!this.state.modalInsertar });
    
  }
  seleccionarProducto=(products)=>{

    this.setState({
      tipoModal:'actualizar',
      id:products._id,

      form:{
      
      brand: products.brand,
      name:products.name,
      quantity:products.quantity,
      price:products.price,
      COPprice:products.COPprice,
      unitaryUSDvalue:products.unitaryUSDvalue,
      unitaryCOPvalue:products.unitaryCOPvalue,
      margen:products.margen,
      sellprice:products.sellprice,
      }

     });
     
   }


  handleChange= async e=>{
   e.persist();
  await this.setState({
    form:{
    ...this.state.form,
    [e.target.name]:e.target.value

    }
  })

  }

  getProduct=()=> {

    axios.get('https://dermaglow.herokuapp.com/products/')
    .then(response => {
              this.setState({ products: response.data })
    }).catch((error) => {
      console.log(error);
    })


  }
  saveProduct= async()=> {
   await  axios.post('https://dermaglow.herokuapp.com/products/save',this.state.form)
    .then(response => {
      this.modalInsertar(); 
       this.getProduct();
    }).catch(error =>{
      console.log(error);
    })
     
  }

  updateProduct= ()=> {
      axios.post('https://evening-coast-84861.herokuapp.com/products/update/'+this.state.id,this.state.form)
     .then(response => {
       this.modalInsertar(); 
       this.getProduct();
     }).catch(error =>{
       console.log(error);
     })
      
   }

 
   deleteProduct= (id)=> {
    axios.delete('https://evening-coast-84861.herokuapp.com/products/delete/'+id)
   .then(response => {
      this.getProduct();
   }).catch(error =>{
     console.log(error);
   })
    
 }


  

 

  render() {
    const {form}=this.state;
    return (
      <div class="card">


      <h3 class="card-header text-center font-weight-bold text-uppercase py-4">DermaGlow</h3>
      <div class="card-body">
        <div id="table" class="table-editable">
          <span class="table-add float-right mb-3 mr-2"><a href="#!" class="text-success"><i
                class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
          <table class="table table-bordered table-responsive-md table-striped text-center">
               
            <thead>
              
              <tr>
                <th data-field="Marca" data-sortable="true" data-switchable="false">Marca</th>
                <th data-field="Nombre del producto" data-sortable="true" data-switchable="false">Nombre del producto</th>
                <th data-field="Cantidad" data-sortable="true">Cantidad</th>
                <th data-field="Precio(USD)" data-sortable="true">Precio(USD)</th>
                <th data-field="Precio(COP)" data-sortable="true">Precio(COP)</th>
                <th data-field="Valor unitario(USD)" data-sortable="true">Valor unitario(USD)</th>
                <th data-field="Valor unitario(COP)" data-sortable="true">Valor unitario(COP)</th>
                <th data-field="Valor de venta" data-sortable="true">Valor de venta</th>
                <th data-field="Margen ganancia" data-sortable="true">Margen de ganancia</th>
                <th data-field="Opciones" data-sortable="true">Opciones</th>
                             
               
              </tr>
            </thead>
            <tbody>
               { this.state.products.map(producto=>{
                return(
                  <tr>
                  <td>{producto.brand } </td>
                  <td>{producto.name}</td>
                  <td>{producto.quantity}</td>
                  <td>{producto.price}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(producto.COPprice)}</td>
                  <td>{producto.unitaryUSDvalue}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(producto.unitaryCOPvalue)}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(producto.sellprice)}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(producto.margen)}</td>
                  
                  <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarProducto(producto);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.deleteProduct(producto._id)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
               
                  </tr>
                )

               }) }
               
              
              
            </tbody>
          </table>

              <Modal isOpen ={this.state.modalInsertar}>
              <ModalHeader style ={{display:'block'}}>
                <span style={{float :'right'}}></span>
              </ModalHeader>
              <ModalBody>
              <div className="form-group">
                <label htmlFor="brand">Marca</label>
                <input className ="form-control" type="text" name="brand" id="brand" onChange={this.handleChange} value={form?form.brand: ''} ></input>
                <br />

                <label htmlFor="name">Nombre del producto</label>
                <input className ="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name: ''}></input>
                <br />

                <label htmlFor="quantity">Cantidad</label>
                <input className ="form-control" type="text" name="quantity" id="quantity"onChange={this.handleChange} value={form?form.quantity: ''} ></input>
                <br />

                <label htmlFor="price">Precio(USD)</label>
                <input className ="form-control" type="text" name="price" id="price" onChange={this.handleChange} value={form?form.price: ''} ></input>
                <br />
               
                <label htmlFor="sellprice">Precio de venta</label>
                <input className ="form-control" type="text" name="sellprice" id="sellprice" onChange={this.handleChange} value={form?form.sellprice: ''} ></input>
                <br />
          



              </div>

              </ModalBody>



                <ModalFooter>
                {this.state.tipoModal==='insertar'?
              
              <button className ="btn btn-success" onClick={()=>this.saveProduct()}>
                Guardar
              </button>: <button className ="btn btn-primary" onClick={()=>this.updateProduct()}>
                Actualizar
                </button>
              
              }
               
                
  
                <button className ="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>


                </ModalFooter>




              </Modal>

              <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()} }>Agregar Producto</button>

           

          <form action="/">
       <input class="btn btn-warning" type="submit" value="Seguir añadiendo productos" />
       </form>
        </div>
      </div>
    </div>
    )
  }
}