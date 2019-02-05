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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
      modal:false,
      namabarang: null,
      jumlahbarang:null,
      idbarang:null,
      tbhnamabarang:null,
      tbhjumlahbarang:null,
      page:null,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.tambahBarang = this.tambahBarang.bind(this);
    this.expand_row = this.expand_row.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleLogout() {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
    this.props.history.push("/login");
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  tambahBarang(event){
    event.preventDefault();
    const barang = {
      namabarang: this.state.tbhnamabarang,
      jumlah: this.state.tbhjumlahbarang
    }
    Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
    Http.post('api/barang',barang)
        .then(res => {
            
            let nopage = Math.floor(res.data.barang.length/5);
            //console.log(nopage);
            this.setState({
              barang: res.data.barang,
              page:nopage,
            })
            return true;
            
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

  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
      namabarang : null,
      jumlahbarang : null,
      idbarang: null,
    });
  }

  expand_row(row) {
    var expanded = {...this.state.expanded};
    //console.log(expanded[row.index]);
    if (expanded[row.index] == true) {
      expanded[row.index] = !expanded[row.index];
    } else {
      expanded[row.index] = true;
    }
    //console.log(row);
    //console.log(row.index);
    //console.log()
    this.setState({
      modal: true,
      namabarang : row.original['namabarang'],
      jumlahbarang : row.original['jumlah'],
      idbarang: row.original['id'],
    });
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
                                        <input name="tbhnamabarang" onChange={this.handleFieldChange} type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-md-3 col-form-label">Jumlah</label>
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <input type="number" name="tbhjumlahbarang" onChange={this.handleFieldChange} className="form-control"/>
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
                                    <button onClick={this.tambahBarang} type="submit" className="btn-fill btn btn-primary">Tambah</button>
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
                        <center><h6>Klik barang untuk melakukan update/hapus data</h6></center>
                    </div>
                    <div className="card-body">
                        <ReactTable
                            getTrProps={(state, rowInfo, column, instance) => {
                              return {
                                onClick: e => {
                                  this.expand_row(rowInfo);
                                }
                              };
                            }}
                            data={barang}
                            columns={columns}
                            page={this.state.page}
                            defaultPageSize = {5}
                            pageSizeOptions = {[5]}
                            onPageChange={page => this.setState({page})}
                          
                        />
                    </div>
                </div>

            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
            <ModalHeader toggle={this.toggleModal}>Update Barang</ModalHeader>
            <ModalBody>
                        <form className="form-horizontal">
                            <div className="row">
                                <label className="col-md-3 col-form-label">Nama Barang</label>
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <input style={{color: 'black'}} key={Math.random()} id="namabarang" defaultValue={this.state.namabarang} name="namabarang" type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-md-3 col-form-label">Jumlah</label>
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <input style={{color: 'black'}} key={Math.random()} defaultValue={this.state.jumlahbarang} id="jumlahbarang" type="number" name="jumlah" className="form-control"/>
                                        <input style={{color: 'black'}} defaultValue={this.state.idbarang} id="idbarang" type="hidden" name="jumlah" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleModal}>Simpan</Button>{' '}
              <Button color="danger" onClick={this.toggleModal}>Hapus</Button>
            </ModalFooter>
          </Modal>

            

        </div>
      </>
    );
  }
}

export default FormInput;
