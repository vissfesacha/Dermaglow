import React, { Component } from 'react';
import axios from 'axios';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeLink  = this.onChangeLink .bind(this);
    this.onChangeCantidad = this.onChangeCantidad.bind(this);

 
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Link : '',
      Cantidad: '',
      modalInsertar:false
    
    }

  }

  modalInsertar=()=>{
    this.setState({modalInsertar:!this.state.modalInsertar });
     
   }
  componentDidMount() {
   

   

  }


  waitlist=()=>{
    
     
   }
  onChangeLink (e) {
    this.setState({
      Link : e.target.value
    })
  }
  onChangeCantidad(e) {
    this.setState({
      Cantidad: e.target.value
    })
  }
  
  



  onSubmit(e) {
    e.preventDefault();
    
   axios.post('https://dermaglow.herokuapp.com/products/add',  {
    url: this.state.Link,
    quantity: this.state.Cantidad
  }).then(res => console.log(res.data));

  setTimeout(function() {
    window.location = '/teamoisa';
  }, 8000);
  
  }



 

  render() {
    return (
    
      
    <div>
     
     


      <h3>Glow </h3>
      <form onSubmit={this.onSubmit}>
        
        <div className="form-group"> 
          <label>Link : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Link }
              onChange={this.onChangeLink }
              />
        </div>
        
        <div className="form-group">
          <label>Cantidad: </label>
          <input type="text" 
              required
              className="form-control"
              value={this.state.Cantidad}
              onChange={this.onChangeCantidad}
              />
        </div>
      
      
      
      
       
        
       
      
        <div className="form-group">
        
          <input type="submit" value="Agregar producto" className="btn btn-primary"  onClick={()=>{this.modalInsertar()}} />
        </div>

      </form>

      <form action="/teamoisa">
       <input class="btn btn-success" type="submit" value="Productos agregados" />
       </form>
       
       <Modal isOpen ={this.state.modalInsertar}>
       
        <ModalHeader style ={{display:'block'}}>
                <span style={{float :'right'}}></span>
        </ModalHeader>
          

       
          <ModalBody>
          <label>Espera un momento amorcita</label>
          </ModalBody>
         <ModalFooter>
        

         </ModalFooter>

       </Modal>




    </div>

    )
  }
}