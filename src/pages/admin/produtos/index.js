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
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ClearIcon from '@material-ui/icons/Clear';
import api from '../../../services/api';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import { useStyles, StyledTableCell } from '../../../functions/use_styles';

export default function ProdutosListagem() {
  const classes = useStyles();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('/api/produtos');
      setProdutos(response.data);
      setLoading(false);
    }
    loadProdutos();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      var result = await api.delete('/admin/produtos/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/produtos';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRIA - PRODUTOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                href={'/admin/produtos/cadastrar'}
              >
                <AddIcon />
                Cadastrar Produto
              </Button>
              <Paper className={classes.paper}>
                <h2>Listagem de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
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
                              <StyledTableCell align="center">
                                Tipo
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Qtd Disponível
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Data de Cadastro
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
                                <TableCell align="center">
                                  {row.tipo_produto}
                                </TableCell>
                                <TableCell align="center">
                                  {row.qtd_produto}
                                </TableCell>
                                <TableCell align="center">
                                  {new Date(row.createdAt).toLocaleString(
                                    'pt-br'
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined success button group">
                                    <Button
                                      variant="contained"
                                      style={{ color: 'green' }}
                                      href={'/admin/produtos/editar/' + row._id}
                                    >
                                      <AutorenewIcon /> Atualizar
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      <ClearIcon />
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </TableContainer>
                  </Grid>
                </Grid>
                <p>
                  Ao clicar em ATUALIZAR aparecerão os demais campos que se pode
                  editar.
                </p>
                <p>
                  Somente delete um Produto se tiver certeza do que está
                  fazendo.
                </p>
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
