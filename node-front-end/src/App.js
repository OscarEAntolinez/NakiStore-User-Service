import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import { Container } from 'reactstrap';
import { Modal } from 'reactstrap';
import { ModalBody } from 'reactstrap';
import { ModalHeader } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { ModalFooter } from 'reactstrap';
import axios from 'axios'
import './App.css';

const url = "http://localhost:3001/api/users"

class App extends React.Component {

  //Petición GET a la API 
  getUsers=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data})
    })
  }

  //Petición POST a la API
  postUsers=()=>{
    axios.post(url, this.state.form).then(response=>{
      this.cerrarModalInsertar()
      this.getUsers()
    }).catch(error => {
      console.log(error)
    })
  }

  //Petición PUT a la API
  putUsers=()=>{
    axios.put(url+"/"+this.state.form.id, this.state.form).then(response=>{
      this.cerrarModalActualizar()
      this.getUsers()
    }).catch(error => {
      console.log(error)
    })
  }

  //Petición DELETE a la API
  deleteUsers=(dato)=>{
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.userName);

    if (opcion === true) {
      axios.delete(url+"/"+dato.id).then(response=>{
        this.getUsers()
      }).catch(error => {
        console.log(error)
      })
    }
  }

  //Permite ejecutar la función getUsers() al ejecutar el programa
  componentDidMount(){
    this.getUsers()
  }

  //data: todos los registros traidos por la petición GET a la API
  //Modales: hacen que las ventanas popup de actualizar y crear se mantentan ocultas por defecto
  //form: variable donde se guardan los datos ingresados en los formularios de crear y actualizar los usuarios
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      userName: "",
      password: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Un Nuevo Usuario</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Nombre de Usuario</th>
                <th>Contraseña</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.userName}</td>
                  <td>{dato.password}</td>
                  <td>
                    <Button
                      style={{backgroundColor: "#0D6EFD", padding: "10px", border: "0px", borderRadius: "10px", color: "white"}}
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button style={{backgroundColor: "#DB3649", padding: "10px", border: "0px", borderRadius: "10px", color: "white"}} 
                    onClick={()=> this.deleteUsers(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        
        {/*Popup de editar usuario*/}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
              Nombre Usuario: 
              </label>
              <input
                className="form-control"
                name="userName"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.userName}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
                className="form-control"
                name="password"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.password}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              style={{backgroundColor: "#0D6EFD", padding: "10px", border: "0px", borderRadius: "10px", color: "white"}}
              onClick={() => this.putUsers()}
            >
              Actualizar
            </Button>
            <Button
              style={{backgroundColor: "#DB3649", padding: "10px", border: "0px", borderRadius: "10px", color: "white"}}
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/*Popup de crear usuario*/}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Crear Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Usuario: 
              </label>
              <input
                className="form-control"
                name="userName"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
                className="form-control"
                name="password"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              style={{backgroundColor: "#0D6EFD", padding: "10px", border: "0px", borderRadius: "10px", color: "white"}}
              onClick={() => this.postUsers()}
            >
              Crear
            </Button>
            <Button
              style={{backgroundColor: "#DB3649", padding: "10px", border: "0px", borderRadius: "10px", color: "white"}}
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
