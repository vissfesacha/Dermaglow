import React, { Component } from 'react';
import axios from 'axios';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import '../styles/main.css';
import '../styles/util.css';
import car from '../images/skincarenatural-850x567.jpg';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeLink=this.onChangeLink.bind(this);
    this.onChangeCantidad=this.onChangeCantidad.bind(this);

 
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
    
   //axios.post('https://dermaglow.herokuapp.com/products/add',  {
    axios.post('http://localhost:5000/products/add',  {
    url: this.state.Link,
    quantity: this.state.Cantidad
  }).then(res => console.log(res.data));

  setTimeout(function() {
    window.location = '/teamoisa';
  }, 8000);
  
  }

  goTolanding(e){

    window.location = '/teamoisa';

  }


 

  render() {
    return (
    
      
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
             <form class="login100-form validate-form" onSubmit={this.onSubmit}>
               <span class="login100-form-title p-b-43">
						    DermaGlow
					     </span>
               
                <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					    	<input type="text" required className="input100" value={this.state.Link} onChange={this.onChangeLink} />
				    		<span class="focus-input100"></span>
					    	<span class="label-input100">Link</span>
					      </div>
                

                <div class="wrap-input100 validate-input" data-validate="Password is required">
                <input type="text" required className="input100" value={this.state.Cantidad} onChange={this.onChangeCantidad} />
					    	<span class="focus-input100"></span>
					     	<span class="label-input100">Cantidad</span>
					      </div>

               

                <div className="form-group">
                <input type="submit" value="Agregar producto" className=" login100-form-btn"  onClick={()=>{this.modalInsertar()}} />
                </div>

                <form action="/teamoisa">
                <input class="login100-form-btn" type="button" value="Productos agregados"  onClick={()=>{this.goTolanding()}}/>
                </form>
 
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

        
            <div class="login100-more" style ={ { backgroundImage: "url("+car+")" } }>
            </div>
         </div>
        </div>
      </div>


    )
  }
}