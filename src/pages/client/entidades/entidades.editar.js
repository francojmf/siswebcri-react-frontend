import React, { useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuUsuario from '../../../components/menu-usuario';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { useStyles } from '../../../functions/use_styles';
import { useParams } from 'react-router-dom';

export default function EntidadeEditar() {
  const classes = useStyles();
  const entidades = useState([]);
  const [mount, setMount] = useState(false);
  const [nome, setNome] = useState('Entidade');
  const [cpf_cnpj, setCpf] = useState('CPF_cnpj');
  const [fone, setFone] = useState('(12) 981-');
  const [logradouro, setLogradouro] = useState('Avenida');
  const [numero, setNumero] = useState('123');
  const [complemento, setComplemento] = useState('-');
  const [cep, setCep] = useState('12200-000');
  const [bairro, setBairro] = useState('Vila');
  const [cidade, setCidade] = useState('Cidade');
  const [estado, setEstado] = useState('SP');
  const [user, setUser] = useState('0123');
  const id = useParams();
  const idEntidade = id.idPedido;
  //console.log(idEntidade);

  useEffect(() => {
    if (!mount) {
      setMount(true);
      async function getEntidade() {
        var response = await api.get('/api/entidades.details/' + idEntidade);
        setNome(response.data.nome_entidade);
        setCpf(response.data.cpf_cnpj);
        setUser(response.data.user);
        setFone(response.data.fone_entidade);
        setLogradouro(response.data.logradouro);
        setNumero(response.data.numero);
        setComplemento(response.data.complemento);
        setCep(response.data.cep);
        setBairro(response.data.bairro);
        setCidade(response.data.cidade);
        setEstado(response.data.estado);
      }
      getEntidade();
    }
  }, [entidades]);

  async function handleSubmit() {
    const data = {
      nome_entidade: nome,
      cpf_cnpj: cpf_cnpj,
      fone_entidade: fone,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cep: cep,
      cidade: cidade,
      estado: estado,
      user: user,
      _id: idEntidade,
    };

    if (
      nome !== '' &&
      cpf_cnpj !== '' &&
      user !== '' &&
      fone !== '' &&
      logradouro !== '' &&
      numero !== '' &&
      bairro !== '' &&
      cep !== '' &&
      cidade !== '' &&
      estado !== ''
    ) {
      const response = await api.put('/api/entidades', data);

      if (response.status === 200) {
        alert('Entidade editada com sucesso !!');
        window.location.href = '/client/entidades';
      } else {
        alert('Erro ao cadastrar a entidade!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }
  // console.log(idEntidade);

  return (
    <div className={classes.root}>
      <MenuUsuario title={'Sis Web CRI - Editar Entidade'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                href={'/client/entidades'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                href={'/client/entidades/cadastrar'}
              >
                Cadastrar Entidade
              </Button>
              <Paper className={classes.paper}>
                <h2>Editar Entidade</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
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
                  <Grid item xs={12} sm={3}>
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
                      disabled
                      type="text"
                      id="usuario"
                      name="usuario"
                      label="Usuário"
                      fullWidth
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
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
                      required
                      type="text"
                      id="cidade"
                      name="cidade"
                      label="Cidade"
                      fullWidth
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="text"
                      id="estado"
                      name="estado"
                      label="Estado"
                      fullWidth
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="text"
                      id="cep"
                      name="cep"
                      label="CEP do logradouro"
                      fullWidth
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={handleSubmit}>
                      <SaveIcon /> Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <p> </p>
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
