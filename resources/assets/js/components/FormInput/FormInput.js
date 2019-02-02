import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Http from '../../Http'
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal
} from "reactstrap";
import * as actions from '../../store/actions'
import ReactTable from "react-table";


class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      barang: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
    this.props.history.push("/login");
  }

  
  
  componentDidMount() {
    Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
    Http.get('api/barang',)
        .then(res => {
            
            this.setState({
              barang: res.data.barang
            })
            
        })
        .catch(err => {
            const statusCode = err.response.status;
            const data = {
              error: null,
              statusCode,
            };
            if (statusCode === 401 || statusCode === 422) {
              // status 401 means unauthorized
              // status 422 means unprocessable entity
              data.error = err.response.data.message;
            }
            return reject(data);
        })
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };
  render() {
    const { barang } = this.state
    
    const columns = [{
        Header: 'Nama Barang',
        accessor: 'namabarang'
      },{
        Header: 'Jumlah',
        accessor: 'jumlah'
      },{
        Header: 'Created At',
        accessor: 'created_at'
      },{
        Header: 'Updated At',
        accessor: 'updated_at'
    }];
    return (
      <>
        <div className="content">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Tambah Barang</h4>
                    </div>
                    <div className="card-body">
                        <form className="form-horizontal">
                            <div className="row">
                                <label className="col-md-3 col-form-label">Nama Barang</label>
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <input name="namabarang" type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-md-3 col-form-label">Jumlah</label>
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <input type="number" name="jumlah" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </form>
                    </div>
                    <div className="card-footer">
                        <form className="form-horizontal">
                            <div className="row">
                                <label className="col-md-3 col-form-label"></label>
                                <div className="col-md-9">
                                    <button type="submit" className="btn-fill btn btn-primary">Tambah</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br/>
            <br/>


            <div className="col-md-12">
            <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Data Barang</h4>
                    </div>
                    <div className="card-body">
                        <ReactTable
                            data={barang}
                            columns={columns}
                            defaultPageSize = {5}
                            pageSizeOptions = {[5]}
                        />
                    </div>
                </div>

            </div>

            

        </div>
      </>
    );
  }
}

export default FormInput;
