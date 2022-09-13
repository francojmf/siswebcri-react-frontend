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
import api from '../../../services/api';
import MenuUsuario from '../../../components/menu-usuario';
import Footer from '../../../components/footer-admin';
import { useStyles, StyledTableCell } from '../../../functions/use_styles';
import { getIdUsuario } from '../../../../src/services/auth';

export default function EntidadesListagem() {
  const classes = useStyles();
  const idUsuario = getIdUsuario();
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
  console.log(entidades);

  return (
    <div className={classes.root}>
      <MenuUsuario title={'Sis Web CRIA - ENTIDADES'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                href={'/client/entidades/cadastrar'}
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
                            {entidades
                              .filter((item) => item.user === idUsuario)
                              .map((item) => (
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
                                  <TableCell align="center">
                                    {item.cep}
                                  </TableCell>
                                  <TableCell align="right">
                                    <ButtonGroup aria-label="outlined success button group">
                                      <Button
                                        variant="contained"
                                        style={{ color: 'green' }}
                                        href={
                                          '/client/entidades/editar/' + item._id
                                        }
                                      >
                                        <AutorenewIcon /> Atualizar
                                      </Button>
                                    </ButtonGroup>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      )}
                    </TableContainer>
                    <p></p>
                    <p>
                      Ao clicar em ATUALIZAR aparecerão os campos que se pode
                      editar.
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
