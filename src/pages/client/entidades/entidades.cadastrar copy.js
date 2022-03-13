import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MenuUsuario from '../../../components/menu-usuario';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { useStyles } from '../../../functions/use_styles';
import { getIdUsuario } from '../../../../src/services/auth';

export default function EntidadeCadastrar() {
  const classes = useStyles();
  const idUsuario = getIdUsuario();
  const [nome, setNome] = useState('');
  const [cpf_cnpj, setCpf] = useState('');
  const [fone, setFone] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [uf, setUf] = React.useState('');
  const [listUf, setListUf] = React.useState([]);
  const [listCity, setListCity] = React.useState([]);
  console.log(uf);
  console.log(estado);
  console.log(cidade);

  function loadUf() {
    let url = 'https://servicodados.ibge.gov.br/';
    url = url + 'api/v1/localidades/estados';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        setListUf([...data]);
      });
  }

  function loadCity(id) {
    let url = 'https://servicodados.ibge.gov.br/api/v1/';
    url = url + `localidades/estados/${id}/municipios`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        setListCity([...data]);
        setEstado(
          listUf.filter((info) => info.id === id).map((info) => info.sigla)
        );
      });
  }

  React.useEffect(() => {
    loadUf();
  }, []);
  React.useEffect(() => {
    if (uf) {
      loadCity(uf);
    }
  }, [uf]);

  async function handleSubmit() {
    const data = {
      user: idUsuario,
      nome_entidade: nome,
      cpf_cnpj: cpf_cnpj,
      fone_entidade: fone,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      cep: cep,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    };

    if (
      nome !== '' &&
      cpf_cnpj !== '' &&
      fone !== '' &&
      logradouro !== '' &&
      numero !== '' &&
      cep !== '' &&
      bairro !== '' &&
      cidade !== '' &&
      estado !== ''
    ) {
      const response = await api.post('/api/entidades', data);
      if (response.status === 200) {
        alert('Entidade cadastrada com sucesso !!');
        window.location.href = '/client/pedidos';
      } else {
        alert('Erro ao cadastrar a entidade!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuUsuario title={'Sis Web CRI - Nova Entidade'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="primary"
                href={'/client/pedidos'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              {/* <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="primary"
                href={'/client/produtos/appCep'}
              >
                Busca CEP com Logradouro
              </Button> */}
              <Paper className={classes.paper}>
                <h2>Cadastro de Nova Entidade</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      type="name"
                      id="nome"
                      name="nome"
                      label="Nome da Entidade"
                      fullWidth
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      type="name"
                      id="cpf_cnpj"
                      name="cpf_cnpj"
                      label="CNPJ da entidade ou seu CPF"
                      fullWidth
                      value={cpf_cnpj}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="name"
                      id="fone"
                      name="fone"
                      label="Telefone de contato"
                      fullWidth
                      value={fone}
                      onChange={(e) => setFone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type="name"
                      required
                      id="logradouro"
                      name="logradouro"
                      label="Logradouro"
                      fullWidth
                      value={logradouro}
                      onChange={(e) => setLogradouro(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="number"
                      required
                      id="numero"
                      name="numero"
                      label="Numero"
                      fullWidth
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="name"
                      id="complemento"
                      name="complemento"
                      label="Complemento"
                      fullWidth
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="name"
                      id="bairro"
                      name="bairro"
                      label="Bairro"
                      fullWidth
                      value={cep}
                      onChange={(e) => setBairro(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <label> Estado : </label>
                    <Select
                      value={uf}
                      onChange={(event) => setUf(event.target.value)}
                    >
                      {listUf.map((a, b) => (
                        <MenuItem key={a.sigla} value={a.id}>
                          {a.sigla} - {a.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <label> Cidade : </label>
                    <Select
                      height="50px"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    >
                      {listCity.map((a, b) => (
                        <option value={a.nome}>{a.nome}</option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="name"
                      id="cep"
                      name="cep"
                      label="CEP do logradouro"
                      fullWidth
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      className={classes.btnSuccess}
                    >
                      <SaveIcon /> Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <p>
              {' '}
              - O endereço informado deve ser o mesmo onde deverá ser entregue o
              kit da cadeira de rodas.
            </p>
            <p>
              {' '}
              - O kit consiste de um conjunto de peças que serão montadas de
              acordo com as instruções enviadas com ele.
            </p>
            <p>
              - Isto foi feito para facilitar o envio do kit, mas a maior parte
              das peças estarão montadas.
            </p>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}

/*

*/
