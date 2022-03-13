import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { getTipoUsuario } from '../../../services/auth';
import MenuAdmin from '../../../components/menu-admin';
import MenuGerente from '../../../components/menu-gerente';
import MenuUsuario from '../../../components/menu-usuario';
import Footer from '../../../components/footer-admin';
import DashUsuario from './usuario';
import DashGerente from './gerente';
import DashAdmin from './admin';
import { useStyles } from '../../../functions/use_styles';

function getDashboard() {
  if (getTipoUsuario() === '1') {
    return <DashAdmin />;
  } else if (getTipoUsuario() === '2') {
    return <DashGerente />;
  } else {
    return <DashUsuario />;
  }
}
function getMenu() {
  if (getTipoUsuario() === '1') {
    return <MenuAdmin title={'Sis Web CRI - Tela Administrador'} />;
  } else if (getTipoUsuario() === '2') {
    return <MenuGerente title={'Sis Web CRI - Tela Gerente'} />;
  } else {
    return <MenuUsuario title={'Sis Web CRI - Tela de Usuário'} />;
  }
}

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {getMenu()}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {getDashboard()}
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
