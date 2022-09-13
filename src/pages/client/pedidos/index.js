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
import { getIdUsuario } from '../../../../src/services/auth';
import { useStyles, StyledTableCell } from '../../../functions/use_styles';

export default function PedidosListagem() {
  const classes = useStyles();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entidades, setEntidades] = useState('');
  const idUsuario = getIdUsuario();

  useEffect(() => {
    async function loadPedidos() {
      const response = await api.get('/api/pedidos');
      setPedidos(response.data);
      const response2 = await api.get('/api/entidades');
      setEntidades(response2.data);
      setLoading(false);
    }
    loadPedidos();
  }, []);

  return (
    <div className={classes.root}>
      <MenuUsuario title={'Sis Web CRIA - Meus Pedidos'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listagem de Pedidos</h2>
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
                                    {item.logradouro}, {item.numero} -
                                    {item.complemento} - {item.bairro}
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
                    <div>
                      <p>
                        Para fazer um pedido é preciso "Cadastrar Entidade" com
                        o endereço de entrega, caso ainda não tenha feito isto.
                      </p>
                    </div>

                    <TableContainer component={Paper}>
                      {loading ? (
                        <LinearProgress
                          style={{ width: '50%', margin: '20px auto' }}
                        />
                      ) : (
                        <Table
                          className={classes.table}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Pedido</StyledTableCell>
                              <StyledTableCell align="center">
                                Criança
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Idade
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Aprovado
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Enviado
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Status
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Opções
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pedidos
                              .filter((item) => item.user === idUsuario)
                              .map((item) => (
                                <TableRow key={item._id}>
                                  <TableCell component="th" scope="row">
                                    {item._id.substr(20, 4)}
                                  </TableCell>
                                  <TableCell align="center">
                                    {item.nome_pessoa}
                                  </TableCell>
                                  <TableCell align="center">
                                    {item.idade_pessoa}
                                  </TableCell>
                                  <TableCell align="center">
                                    {item.aprovado_pedido ? (
                                      <i
                                        className="fas fa-check"
                                        style={{ color: 'green' }}
                                      ></i>
                                    ) : (
                                      <i
                                        className="fas fa-times"
                                        style={{ color: 'red' }}
                                      ></i>
                                    )}
                                  </TableCell>
                                  <TableCell align="center">
                                    {item.enviado_pedido ? (
                                      <i
                                        className="fas fa-check"
                                        style={{ color: 'green' }}
                                      ></i>
                                    ) : (
                                      <i
                                        className="fas fa-times"
                                        style={{ color: 'red' }}
                                      ></i>
                                    )}
                                  </TableCell>
                                  <TableCell align="center">
                                    {item.status_pedido}
                                  </TableCell>
                                  <TableCell align="right">
                                    <ButtonGroup aria-label="outlined success button group">
                                      <Button
                                        variant="contained"
                                        style={{ color: 'green' }}
                                        href={
                                          '/client/pedidos/editar/' + item._id
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
                    <div>
                      <p></p>
                      <Button
                        style={({ marginBottom: 10 }, { marginLeft: 10 })}
                        variant="contained"
                        color="primary"
                        href={'/client/entidades/cadastrar'}
                      >
                        <AddIcon />
                        Cadastrar Entidade
                      </Button>
                      <Button
                        style={({ marginBottom: 10 }, { marginLeft: 10 })}
                        variant="contained"
                        color="primary"
                        href={'/client/pedidos/cadastrar'}
                      >
                        <AddIcon />
                        Iniciar Pedido
                      </Button>
                      <p></p>
                      <p>
                        Para iniciar um novo pedido clique em "Iniciar Pedido".
                      </p>
                      <p></p>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <p>
              - Para fazer um pedido é necessário informar alguns dados da
              criaça que receberá a doação.
            </p>
            <p>
              - Podem ser feitos pedidos para outras crianças, desde que o
              endereço de entrega seja o mesmo.
            </p>
            <p>
              - Para entrega em outra cidade, deverá ser informada outra
              entidade ou pessoa responsável pelo recebimento e montagem do kit.
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
