import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { useStyles } from '../../../functions/use_styles';

export default function ProdutoCadastrar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [qtd, setQtd] = useState('');

  async function handleSubmit() {
    const data = {
      nome_produto: nome,
      descricao_produto: descricao,
      tipo_produto: tipo,
      qtd_produto: qtd,
    };

    if (nome !== '' && descricao !== '' && tipo !== '' && qtd !== '') {
      const response = await api.post('/api/produtos', data);

      if (response.status === 200) {
        alert('Produto cadastrado com sucesso !!');
        window.location.href = '/admin/produtos';
      } else {
        alert('Erro ao cadastrar o produto!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRI - PRODUTOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="primary"
                href={'/admin/produtos'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome do Produto"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Descrição do produto"
                      fullWidth
                      autoComplete="nome"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="name"
                      required
                      id="tipo"
                      name="tipo"
                      label="Tipo"
                      fullWidth
                      autoComplete="tipo"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      required
                      id="qtd"
                      name="qtd"
                      label="Quantidade"
                      fullWidth
                      autoComplete="qtd"
                      value={qtd}
                      onChange={(e) => setQtd(e.target.value)}
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
