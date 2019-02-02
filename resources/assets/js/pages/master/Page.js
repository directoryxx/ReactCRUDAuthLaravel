import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    
     } from 'reactstrap';
import * as actions from '../../store/actions'
import { slide as Menu } from 'react-burger-menu'
//import SideBar from "../../menu/menu";
import "../../../../../public/css/styles.css";
import {Link, Redirect} from 'react-router-dom'
//import PageHeader from '../../common/pageHeader'
//import Navigation from '../../common/navigation'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.toggle = this.toggle.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.redirectToSatuan = this.redirectToSatuan.bind(this);
        this.redirectToBarang = this.redirectToBarang.bind(this);
        
    }

    handleLogout() {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    showSettings (event) {
        event.preventDefault();
        
    }

    redirectToSatuan(event){
        event.preventDefault();
        //console.log('satuan');
        <Redirect to='/master/satuan'/>
    }

    redirectToBarang(event){
        event.preventDefault();
        //console.log('barang');
        <Redirect to='/master/satuan'/>
    }
    

    render() {
        return (
            
            <div>
                    <Navbar className="navbar-dashboard"  color="light" light expand="xs">
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                {this.props.userName}
                                </DropdownToggle>
                                <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleLogout}>
                                    Logout
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </Nav>
                        </Collapse>              
                    </Navbar>

                    <div className="container ">
                        <div className="row justify-content-md-center align-items-center">
                            <br/>
                            <br/>
                            <div className="col-md-3">
                            <Card >
                                <CardImg top width="50%" src="https://www.clipartmax.com/png/full/15-151472_trolley-clipart-online-store-shopping-cart-logo-blue.png" alt="Card image cap" />
                                <CardBody>
                                <center>
                                <Button onClick={this.redirectToBarang} color="primary">Barang</Button>{' '}</center>
                                </CardBody>
                            </Card>
                            </div>
                            <div className="col-md-3">
                            <Card>
                                <CardImg top width="50%" src="https://cdn1.iconfinder.com/data/icons/delivery-logistics-1/512/Logistics-11-512.png" alt="Card image cap" />
                                <CardBody>
                                <center>
                                <Button onClick={this.redirectToSatuan} color="primary">Satuan</Button>{' '}</center>
                                </CardBody>
                            </Card>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        
                    </div>
                    
                    
        
                
                
                <br/>
                <br/>
                
                
            </div>
        );
    }
}

export default Page;