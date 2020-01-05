import React, { Component } from 'react'
import {Container,Button,ListGroup,ListGroupItem} from 'reactstrap'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux';
import {get_items,delete_item} from '../actions/itemActions';
import PropTypes from 'prop-types';
 class ShoppingList extends Component {
    componentDidMount(){
        this.props.getItems()
    }
    static propTypes={
        isAuthenticated:PropTypes.bool
     }
    deleteItem=(id)=>{
        this.props.deleteItem(id)
    }
    render() {
        const{items}=this.props.item
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id,name})=>{
                            return(
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        {this.props.isAuthenticated?(
                                        <Button className="remove-btn" 
                                        color="danger"
                                        size="sm"
                                        onClick={()=>this.deleteItem(_id)}>&times;</Button>
                                        )
                                    :null}
                                    &nbsp;{name}
                                    </ListGroupItem>
                                </CSSTransition>
                            )
                        })
                    }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}
ShoppingList.propTypes={
    get_items:PropTypes.func.isRequired,
    item:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>{
    return{
        item:state.item,
        isAuthenticated:state.auth.isAuthenticated
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getItems:()=>dispatch(get_items()),
        deleteItem:(id)=>dispatch(delete_item(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingList)
