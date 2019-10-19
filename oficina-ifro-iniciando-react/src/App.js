import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  FormGroup,
  Input,
  Button,
  Table} from 'reactstrap'
const App = props =>{
  const [nome,setNome] = React.useState("");
  const [idade,setIdade] = React.useState(0);
  const [email,setEmail] = React.useState("");
  const [alunos,setAlunos] = React.useState([]);

  const submit = async e => {
    e.preventDefault();

    const headers= new Headers();
    headers.append("Content-Type","application/json");

    const response = await fetch("http://localhost:3001/alunos",{
      method:"POST",
      body: JSON.stringify({nome,email,idade}),
      headers
    });
    if(response.ok){
      alert("Enviado com sucesso!")
      return;
    }
    alert("Erro ao enviar:"+response.status)
  }
  const buscarAlunos = async () =>{
    const response = await fetch("http://localhost:3001/alunos");
    if(!response.ok){
      alert("Erro ao buscar: "+response.status)
    }
    const alunos = await response.json();
    setAlunos(alunos);
  }
  return(
    <React.Fragment>
        {/*Navbar*/}
        <Navbar color="primary" dark>
          <NavbarBrand>
            Oficina IFRO ADS
          </NavbarBrand>
        </Navbar>
        <Container>
          <Row>
            <Col>
              <form onSubmit={submit}>
                <FormGroup>
                  <label>Nome</label>
                  <Input 
                  name="nome"
                  value={nome}
                  onChange={e => setNome(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                  <label>Email</label>
                  <Input 
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                  <label>Idade</label>
                  <Input 
                  type="number"
                  name="idade"
                  value={idade}
                  onChange={e => setIdade(e.target.value)}/>
                </FormGroup>
                <Button type="submit" color="primary">Enviar</Button>
              </form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
              color="primary"
              className="my-2"
              type="button"
              onClick={e => buscarAlunos()}>Buscar</Button>
              <Table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Idade</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map(aluno =>
                    <tr>
                      <td>{aluno.nome}</td>  
                      <td>{aluno.email}</td>  
                      <td>{aluno.idade}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
  )
}
export default App;