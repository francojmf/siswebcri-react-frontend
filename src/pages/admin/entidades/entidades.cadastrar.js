import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { useStyles } from '../../../functions/use_styles';
import { getIdUsuario } from '../../../../src/services/auth';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import apiCep from './components/apiCep';

export default function EntidadeCadastrar() {
  const classes = useStyles();
  const idUsuario = getIdUsuario();
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf_cnpj, setCpf] = useState('');
  const [fone, setFone] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = React.useState('');
  const cidade2 = remover_acentos(cidade);
  const [estado, setEstado] = React.useState('');
  const [uf, setUf] = React.useState('');
  const [listUf, setListUf] = React.useState([]);
  const [listCity, setListCity] = React.useState([]);
  const [endereco, setPlace] = useState('');
  const [openModal, setOpen] = React.useState(false);

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

  function remover_acentos(cidade) {
    return cidade.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
      bairro !== '' &&
      cep !== '' &&
      cidade !== '' &&
      estado !== ''
    ) {
      const response = await api.post('/api/entidades', data);
      if (response.status === 200) {
        alert('Entidade cadastrada com sucesso !!');
        window.location.href = '/admin/pedidos';
      } else {
        alert('Erro ao cadastrar a entidade!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  async function handleSubmit2(event) {
    var response = await apiCep.get(`/${estado}/${cidade2}/${endereco}/json`);
    setDados(response.data);
    if (endereco.length > 1) {
      handleShow();
    } else {
      setPlace(dados.map((info) => info.logradouro));
      setLogradouro(dados.map((info) => info.logradouro));
      setBairro(dados.map((info) => info.bairro));
      setCep(dados.map((info) => info.cep));
    } //,[listEndereco];
  }

  const handleShow = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInfo = (info) => {
    setBairro(info.bairro);
    setCep(info.cep);
    setLogradouro(info.logradouro);
    console.log(info);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRIA - Nova Entidade'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="primary"
                href={'/admin/pedidos'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Nova Entidade</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      type="text"
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
                      type="text"
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
                      type="text"
                      id="fone"
                      name="fone"
                      label="Telefone de contato"
                      fullWidth
                      value={fone}
                      onChange={(e) => setFone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <label> Estado : </label>
                    <Select value={uf} onChange={(e) => setUf(e.target.value)}>
                      {listUf.map((a, b) => (
                        <option key={a.sigla} value={a.id}>
                          {a.sigla} - {a.nome}
                        </option>
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
                        <option key={a._id} value={a.nome}>
                          {a.nome}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="text"
                      id="endereco"
                      name="endereco"
                      label="Pesquisa logradouro"
                      value={endereco}
                      onChange={(e) => setPlace(e.target.value)}
                    />
                    <Button
                      type="submit"
                      onClick={handleSubmit2}
                      className="handleSubmit2"
                      variant="contained"
                      color="primary"
                    >
                      Encontrar CEP
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type="text"
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
                      type="text"
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
                      type="text"
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
                      type="text"
                      id="bairro"
                      name="bairro"
                      label="Bairro"
                      fullWidth
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled
                      required
                      type="text"
                      id="cidade"
                      name="cidade"
                      label="Cidade"
                      fullWidth
                      value={cidade}
                    //onChange={(e) => setBairro(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled
                      required
                      type="text"
                      id="estado"
                      name="estado"
                      label="Estado"
                      fullWidth
                      value={estado}
                    // onChange={(e) => setBairro(e.target.value)}
                    />
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
                      className="handleSubmit"
                    >
                      <SaveIcon /> Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              <Grid item xs={12} sm={8}>
                <Dialog
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Selecione o endereço clicando em OK'}
                  </DialogTitle>
                  <DialogContent>
                    <Table>
                      <thead>
                        <tr>
                          <th>Logradouro</th>
                          <th>Complemento</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dados.map((info) => (
                          <tr>
                            <td>{info.logradouro}</td>
                            <td>{info.complemento}</td>
                            <td>{info.bairro}</td>
                            <td>
                              <Button
                                key={info._id}
                                onClick={() => handleInfo(info)}
                                type="submit"
                                className="handleInfo"
                                variant="contained"
                                color="primary"
                              >
                                OK
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <p>
                      * Se aparecerem muitos nomes e não encontrar o que
                      procura,
                    </p>
                    <p>refaça a pesquisa com um nome mais completo.</p>
                    <Button
                      onClick={handleClose}
                      type="submit"
                      className="handleInfo"
                      variant="contained"
                      color="primary"
                    >
                      Fechar
                    </Button>
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
            <p>
              {' '}
              - O endereço informado deve ser o mesmo onde deverá ser entregue o
              kit da cadeira de rodas.
            </p>
            <p>- Faça a pesquisa do logradouro para confirmar o CEP correto.</p>
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
