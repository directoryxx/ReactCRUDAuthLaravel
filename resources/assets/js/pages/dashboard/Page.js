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
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                
                                </CardBody>
                            </Card>
                            </div>
                            <div className="col-md-4">
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                
                                </CardBody>
                            </Card>
                            </div>
                            <div className="col-md-4">
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                
                                </CardBody>
                            </Card>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row-md-12">
                            <Card>
                                <CardBody>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                    
                    
        
                
                
                <br/>
                <br/>
                
                
            </div>
        );
    }
}

export default Page;