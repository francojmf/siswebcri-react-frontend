import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibleIcon from '@material-ui/icons/Accessible';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { getToken, logout } from '../services/auth';
import api from '../services/api';
import { getNomeUsuario, getIdUsuario } from '../services/auth';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/usuario">
      <ListItemIcon>
        <DashboardIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Início" />
    </ListItem>
    <ListItem
      button
      component="a"
      href={'/client/usuario/editar/' + getIdUsuario()}
    >
      <ListItemIcon>
        <PersonIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Editar Usuário" />
    </ListItem>
    <ListItem button component="a" href="/client/pedidos">
      <ListItemIcon>
        <AccessibleIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Meus Pedidos" />
    </ListItem>
    <ListItem button component="a" href="/client/entidades">
      <ListItemIcon>
        <AccountBalanceIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Minha Entidade" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset style={{ color: 'green' }}>
      Opções
    </ListSubheader>
    <ListItem>Logado como:</ListItem>
    <ListItem>
      <ListItemIcon>
        <PersonIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <p> {getNomeUsuario()}</p>
    </ListItem>
    <ListItem button onClick={confirmSair}>
      <ListItemIcon>
        <ExitToApp style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmSair() {
  if (window.confirm('Deseja realmente sair do sistema?')) {
    const response = await api.get('/api/usuarios/destroytoken', {
      headers: { token: getToken() },
    });
    if (response.status === 200) {
      logout();
      window.location.href = '/';
    } else {
      alert('Não foi possível fazer o logout!');
    }
  }
}
