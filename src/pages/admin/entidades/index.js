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

export default function EntidadesListagem() {
  const classes = useStyles();

  const [entidades, setEntidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntidades() {
      const response = await api.get('/api/entidades');
      setEntidades(response.data);
      setLoading(false);
    }
    loadEntidades();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esta Entidade?')) {
      var result = await api.delete('/admin/entidades/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/entidades';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRI - ENTIDADES'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                href={'/admin/entidades/cadastrar'}
              >
                <AddIcon />
                Cadastrar Entidade
              </Button>
              <Paper className={classes.paper}>
                <h2>Listagem de entidades</h2>
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
                              <StyledTableCell>Entidade</StyledTableCell>
                              <StyledTableCell align="center">
                                CPF ou CNPJ
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Endereço
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Cidade
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                CEP
                              </StyledTableCell>
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
                                <TableCell component="th" scope="row">
                                  {item.cpf_cnpj}
                                </TableCell>
                                <TableCell align="center">
                                  {item.logradouro}, {item.numero},
                                  {item.complemento} , {item.bairro}
                                </TableCell>
                                <TableCell align="center">
                                  {item.cidade} - {item.estado}
                                </TableCell>
                                <TableCell align="center">{item.cep}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined success button group">
                                    <Button
                                      variant="contained"
                                      style={{ color: 'green' }}
                                      href={
                                        '/admin/entidades/editar/' + item._id
                                      }
                                    >
                                      <AutorenewIcon /> Atualizar
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => handleDelete(item._id)}
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
                    <p>
                      Ao clicar em ATUALIZAR aparecerão os demais campos que se
                      pode editar.
                    </p>

                    <p>
                      Somente delete uma Entidade se tiver certeza do que está
                      fazendo.
                    </p>
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
