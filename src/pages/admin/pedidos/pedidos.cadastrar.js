import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useStyles, StyledTableCell } from '../../../functions/use_styles';
import { getIdUsuario } from '../../../../src/services/auth';
import ImgMedidas from '../../../assets/img/medidas2.jpg';

export default function PedidoCadastrar() {
  const classes = useStyles();
  const idUsuario = getIdUsuario();
  const [pessoa, setPessoa] = useState('');
  const [idade, setIdade] = useState('');
  const [medA, setMedA] = useState('');
  const [medB, setMedB] = useState('');
  const [medC, setMedC] = useState('');
  const [medD, setMedD] = useState('');
  const [medE, setMedE] = useState('');
  const [medF, setMedF] = useState('');

  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [produtoNome, setProdutoNome] = useState('');
  const [entidades, setEntidades] = useState([]);
  const [entidadeId, setEntidadeId] = useState('');
  const [entidadeNome, setEntidadeNome] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntidades() {
      const response = await api.get('/api/entidades');
      setEntidades(response.data);
      setLoading(false);
    }
    loadEntidades();
  }, []);

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('/api/produtos');
      setProdutos(response.data);
      setLoading(false);
    }
    loadProdutos();
  }, []);

  function clickEvent(event, a, b) {}

  // console.log(idUsuario);
  // console.log(produtoId);
  // console.log(entidadeId);

  async function handleSubmit() {
    const data = {
      user: idUsuario,
      nome_pessoa: pessoa,
      idade_pessoa: idade,
      produto: produtoId,
      entidade: entidadeId,
      med_a: medA,
      med_b: medB,
      med_c: medC,
      med_d: medD,
      med_e: medE,
      med_f: medF,
    };
    // console.log(idUsuario);
    // console.log(produtoId);
    // console.log(entidadeId);

    if (
      pessoa !== '' &&
      idade !== '' &&
      medA !== '' &&
      medB !== '' &&
      medC !== '' &&
      medD !== '' &&
      medE !== '' &&
      medF !== ''
    ) {
      const response = await api.post('/api/pedidos', data);
      if (response.status === 200) {
        alert('Pedido cadastrado com sucesso !!');
        window.location.href = '/admin/pedidos';
      } else {
        alert('Erro ao cadastrar o pedido!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <>
      <div className={classes.root}>
        <MenuAdmin title={'Sis Web CRI - Novo Pedido'} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper className={classes.paper}>
                  <h2>Novo Pedido</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                      <TableContainer component={Paper}>
                        {loading ? (
                          <LinearProgress
                            style={{ width: '50%', margin: '20px auto' }}
                          />
                        ) : (
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell align="center">
                                  Descrição
                                </StyledTableCell>

                                <StyledTableCell align="right">
                                  Opções
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {produtos.map((row) => (
                                <TableRow key={row._id}>
                                  <TableCell component="th" scope="row">
                                    {row.nome_produto}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.descricao_produto}
                                  </TableCell>

                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      style={{ color: 'green' }}
                                      onClick={(event) =>
                                        clickEvent(
                                          event,
                                          setProdutoId(row._id),
                                          setProdutoNome(row.nome_produto)
                                        )
                                      }
                                    >
                                      Selecione
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TableContainer component={Paper}>
                        {loading ? (
                          <LinearProgress
                            style={{ width: '50%', margin: '20px auto' }}
                          />
                        ) : (
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Entidade</StyledTableCell>

                                <StyledTableCell align="right">
                                  Opções
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {entidades.map((item) => (
                                <TableRow key={item._id}>
                                  <TableCell component="th" scope="row">
                                    {item.nome_entidade}
                                  </TableCell>

                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      style={{ color: 'green' }}
                                      onClick={(event) =>
                                        clickEvent(
                                          event,
                                          setEntidadeId(item._id),
                                          setEntidadeNome(item.nome_entidade)
                                        )
                                      }
                                    >
                                      Selecione esta
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="name"
                        required
                        id="pessoa"
                        name="pessoa"
                        label="Nome completo da criança"
                        fullWidth
                        autoComplete="pessoa"
                        value={pessoa}
                        onChange={(e) => setPessoa(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        type="number"
                        required
                        id="idade"
                        name="idade"
                        label="Idade da Criança"
                        fullWidth
                        autoComplete="idade"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        disabled
                        type="name"
                        id="produto"
                        name="produto"
                        label="CRI selecionada"
                        fullWidth
                        value={produtoNome}
                        onChange={(e) => setProdutoNome(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        disabled
                        type="name"
                        id="entidade"
                        name="entidade"
                        label="Entidade selecionada"
                        fullWidth
                        value={entidadeNome}
                        onChange={(e) => setEntidadeNome(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medA"
                        name="medA"
                        label="Medida A (cm)"
                        fullWidth
                        autoComplete="medA"
                        value={medA}
                        onChange={(e) => setMedA(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medB"
                        name="medB"
                        label="Medida B (cm)"
                        fullWidth
                        autoComplete="medB"
                        value={medB}
                        onChange={(e) => setMedB(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medC"
                        name="medC"
                        label="Medida C (cm)"
                        fullWidth
                        autoComplete="medC"
                        value={medC}
                        onChange={(e) => setMedC(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medD"
                        name="medD"
                        label="Medida D (cm)"
                        fullWidth
                        autoComplete="medD"
                        value={medD}
                        onChange={(e) => setMedD(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medE"
                        name="medE"
                        label="Medida E (cm)"
                        fullWidth
                        autoComplete="medE"
                        value={medE}
                        onChange={(e) => setMedE(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medF"
                        name="medF"
                        label="Medida F (cm)"
                        fullWidth
                        autoComplete="medF"
                        value={medF}
                        onChange={(e) => setMedF(e.target.value)}
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
                    <Grid item xs={12} sm={6}>
                      <Button
                        style={{ marginBottom: 30 }}
                        variant="contained"
                        color="primary"
                        href={'/admin/pedidos'}
                      >
                        <ArrowBackIcon /> Voltar
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <div>
                <p>- Faça as medidas de acordo com a imagem abaixo.</p>
                <img src={ImgMedidas} alt="medidas" />
              </div>
            </Grid>
            <Box pt={4}>
              <Footer />
            </Box>
          </Container>
        </main>
      </div>
    </>
  );
}
