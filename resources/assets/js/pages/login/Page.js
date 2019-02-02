import React from 'react'
import {
    Media,
    Navbar,
    NavbarBrand,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    
     } from 'reactstrap';

import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
//import PageHeader from '../../common/pageHeader'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        });

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isLoading: false,
            errors: this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {credentials} = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, credentials})
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log("clicked")
        const {credentials} = this.state;
        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(credentials);
                }
            });
    }

    submit(credentials) {
        this.props.dispatch(AuthService.login(credentials))
            .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({responseError});
                this.setState({
                    isLoading: false
                });
            })

    }

    onSocialClick(event, data) {
       window.location.assign(`redirect/${data.service}`);
    }

    componentDidMount(){
        this.setState({
            isLoading: false
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to='/dashboard'/>
            )
        }
        const {errors} = this.state;

        return (
            <div>
                <br/>
                <br/>
               
                
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4 col-md-offset-6">
                            <center><img src="img/cas-padlock-icon.png" width="100px" height="100px" /></center>
                            <br/>
                            {this.state.responseError.isError && <Alert color="danger">
                                        {this.state.responseError.text}
                                </Alert>}
                            <Form>
                                <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input autoComplete="off" onChange={this.handleChange}
                                    error={errors.has('email')} type="email" name="email" id="exampleEmail" placeholder="Email Address" />
                                {errors.has('email') && <Label size='tiny' className='custom-error' color='red'>
                                    {errors.first('email')}
                                </Label>}
                                </FormGroup>
                                <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input onChange={this.handleChange}
                                    error={errors.has('password')} type="password" name="password" id="examplePassword" placeholder="Password" />
                                {errors.has('password') && <Label size='tiny' className='custom-error' color='red'>
                                    {errors.first('password')}
                                </Label>}
                                </FormGroup>
                                <center><Button onClick={this.handleSubmit}>Login</Button></center>
                            </Form>
                        </div>
                    </div>
 
                    
                </div>
                
            </div>
        );
    }
}

Page.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Page;
