import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import { getNomeTipo, getNomeTipoLabel } from '../../../functions/static_data';
import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles, StyledTableCell } from '../../../functions/use_styles';

export default function UsuariosListagem() {
  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('/api/usuarios');
      setUsuarios(response.data);
      setLoading(false);
    }
    loadUsuarios();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      var result = await api.delete('/api/usuarios/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/usuarios';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRIA - USUÁRIOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="primary"
                href={'/admin/usuarios/cadastrar'}
              >
                <AddIcon />
                Cadastrar
              </Button>
              <Paper className={classes.paper} style={{ marginBottom: '50px' }}>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {loading ? (
                        <LinearProgress
                          style={{
                            width: '50%',
                            margin: '20px auto',
                          }}
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
                                Email
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Tipo
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
                            {usuarios.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.nome_usuario}
                                </TableCell>
                                <TableCell align="center">
                                  {row.email_usuario}
                                </TableCell>
                                <TableCell align="center">
                                  <Chip
                                    label={getNomeTipo(row.tipo_usuario)}
                                    color={getNomeTipoLabel(row.tipo_usuario)}
                                  />
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
                                      href={'/admin/usuarios/editar/' + row._id}
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
