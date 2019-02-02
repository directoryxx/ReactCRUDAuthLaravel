import React from 'react'
import {Link, Redirect} from 'react-router-dom'

class Page extends React.Component {
    constructor(props) {
        super(props);
        
    }

    

    render() {
       
        
        return (
            <Redirect to="/login"></Redirect>
        );
    }
}

export default Page;
