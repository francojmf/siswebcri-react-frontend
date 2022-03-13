import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { useStyles } from '../../../functions/use_styles';

export default function UsuarioEditar() {
  const classes = useStyles();
  const usuario = useState([]);
  const [mount, setMount] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const { idUsuario } = useParams();

  useEffect(() => {
    if (!mount) {
      setMount(true);
      async function getUsuario() {
        var response = await api.get('/api/usuarios.details/' + idUsuario);
        setNome(response.data.nome_usuario);
        setEmail(response.data.email_usuario);
        setSenha(response.data.senha_usuario);
        setTipo(response.data.tipo_usuario);
      }
      getUsuario();
    }
  }, [usuario]);

  async function handleSubmit() {
    const data = {
      nome_usuario: nome,
      email_usuario: email,
      senha_usuario: senha,
      tipo_usuario: tipo,
      _id: idUsuario,
    };

    if (nome !== '' && email !== '' && senha !== '' && tipo !== '') {
      const response = await api.put('/api/usuarios/', data);
      if (senha !== confirmaSenha) {
        alert('Senhas não estão iguais');
      }
      if (response.status === 200) {
        window.location.href = '/usuario';
      } else {
        alert('Erro ao atualizar o usuário!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuUsuario title={'Sis Web CRI - MEU USUÁRIO'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 20, marginRight: 5 }}
                variant="contained"
                href={'/usuario'}
              >
                <ArrowBackIcon /> Voltar
              </Button>

              <Paper className={classes.paper}>
                <h2>Atualizar dados de Usuário</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="senha"
                      name="senha"
                      label="Nova Senha"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="confirmaSenha"
                      name="confirmaSenha"
                      label="Repita a Senha"
                      fullWidth
                      autoComplete="confirmaSenha"
                      value={confirmaSenha}
                      onChange={(e) => setConfirmaSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
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
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
