import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AccessibleIcon from '@material-ui/icons/Accessible';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { getNomeUsuario, getToken, logout } from '../services/auth';
import api from '../services/api';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin">
      <ListItemIcon>
        <HomeIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Início" />
    </ListItem>
    <ListItem button component="a" href="/admin/usuarios">
      <ListItemIcon>
        <PeopleIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItem>
    <ListItem button component="a" href="/admin/produtos">
      <ListItemIcon>
        <EventSeatIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItem>
    <ListItem button component="a" href="/admin/pedidos">
      <ListItemIcon>
        <AccessibleIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Pedidos" />
    </ListItem>
    <ListItem button component="a" href="/admin/entidades">
      <ListItemIcon>
        <AccountBalanceIcon style={{ color: 'green' }} />
      </ListItemIcon>
      <ListItemText primary="Entidades" />
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
