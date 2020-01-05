import React, { Component } from 'react'
import {Button,Modal,ModalHeader,Alert,NavLink,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions'
 class registerModal extends Component {
     state={
         modal:false,
         name:'',
         email:'',
         password:'',
         msg:null
     }
     static propTypes={
         isAuthenticated:PropTypes.bool,
         error:PropTypes.object.isRequired,
         register:PropTypes.func.isRequired,
         clearErrors:PropTypes.func.isRequired
     }
     componentDidUpdate(prevProps){
         const {error,isAuthenticated}=this.props;
         if(error!==prevProps.error){
             if(error.id==='REGISTER_FAIL'){
                 this.setState({msg:error.msg.msg})
             }
             else{
                this.setState({msg:null})
             }
         }
         //If authenticated close model
         if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
         }
     }
     toggle=()=>{
         this.props.clearErrors()
         this.setState({
             modal:!this.state.modal
         })
     };
     onSubmit=(e)=>{
         e.preventDefault();
         const {name,email,password}=this.state
         console.log("sd",name,email,password)
         const newUser={
             name,email,password
         }
         this.props.register(newUser)
        //  this.toggle()
     }
     HandleChange=(e)=>{
         this.setState({
             [e.target.name]:e.target.value
         })
     }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" className='mb-3' name="name" id="name" placeholder="Name"
                                onChange={this.HandleChange}/>
                                
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" className='mb-3' id="email" placeholder="Email"
                                onChange={this.HandleChange}/>
                                
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" className='mb-3' id="password" placeholder="Password"
                                onChange={this.HandleChange}/>
                            <Button color="dark"  style={{marginTop:'2rem'}} block>Register</Button> 
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
    
})
const mapDispatchToProps=(dispatch)=>({
    register:(newUser)=>dispatch(register(newUser)),
    clearErrors:()=>dispatch(clearErrors())
    
})
export default connect(mapStateToProps,mapDispatchToProps)(registerModal)
