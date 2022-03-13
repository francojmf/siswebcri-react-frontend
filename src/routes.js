import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';
import Entidades from './pages/admin/entidades';
import EntidadesCadastrar from './pages/admin/entidades/entidades.cadastrar';
import EntidadesEditar from './pages/admin/entidades/entidades.editar';
import Pedidos from './pages/admin/pedidos';
import PedidosCadastrar from './pages/admin/pedidos/pedidos.cadastrar';
import PedidosEditar from './pages/admin/pedidos/pedidos.editar';
import Produtos from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';
import Usuarios from './pages/admin/usuarios';
import UsuariosEditar from './pages/admin/usuarios/usuarios.editar';
import MeuUsuarioEditar from './pages/admin/usuarios/usuario.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
// IMPORTS CLIENT
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produtos/produtos.details';
import Login from './pages/admin/login';
import UsuarioNovo from './pages/client/home/usuario.novo';
import UsuarioEditar from './pages/client/usuario/usuario.editar';
import PrivateRoute from './services/wAuth';
import MinhaEntidade from './pages/client/entidades';
import EntidadeCadastrar from './pages/client/entidades/entidades.cadastrar';
import EntidadeEditar from './pages/client/entidades/entidades.editar';
import MeusPedidos from './pages/client/pedidos';
import PedidoCadastrar from './pages/client/pedidos/pedidos.cadastrar';
import PedidoEditar from './pages/client/pedidos/pedidos.editar';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/produtos/:idProduto" exact component={ProdutoDetails} />
        <Route path="/client/usuario" exact component={UsuarioNovo} />
        <Route path="/client/pedidos/" exact component={MeusPedidos} />
        <Route path="/client/entidades/" exact component={MinhaEntidade} />
        {/* <Route path="/client/produtos/appCep" exact component={AppCEP} /> */}
        <PrivateRoute path="/usuario" exact component={Dashboard} />
        <PrivateRoute
          path="/usuario/editar/:idUsuario"
          exact
          component={UsuarioEditar}
        />
        <PrivateRoute
          path="/client/entidades/cadastrar"
          exact
          component={EntidadeCadastrar}
        />
        <PrivateRoute
          path="/client/pedidos/cadastrar"
          exact
          component={PedidoCadastrar}
        />
        <PrivateRoute
          path="/client/usuario/editar/:idUsuario"
          exact
          component={UsuarioEditar}
        />
        <Route
          path="/client/entidades/editar/:idPedido"
          exact
          component={EntidadeEditar}
        />
        <Route
          path="/client/pedidos/editar/:idPedido"
          exact
          component={PedidoEditar}
        />
        {/* Rota Admin */}
        <Route path="/" exact component={Home} />
        <Route path="/admin/login" exact component={Login} />
        <PrivateRoute path="/admin" exact component={Dashboard} />
        <PrivateRoute path="/admin/produtos" exact component={Produtos} />
        <Route path="/admin/pedidos/" exact component={Pedidos} />
        <Route path="/admin/entidades/" exact component={Entidades} />
        {/* <Route path="/admin/entidades/appCep" exact component={AppCEP2} /> */}
        <PrivateRoute
          path="/admin/usuario/editar/:idUsuario"
          exact
          component={MeuUsuarioEditar}
        />
        <PrivateRoute
          path="/admin/produtos/cadastrar"
          exact
          component={ProdutoCadastrar}
        />
        <PrivateRoute
          path="/admin/produtos/editar/:idProduto"
          exact
          component={ProdutoEditar}
        />
        <PrivateRoute
          path="/admin/pedidos/cadastrar"
          exact
          component={PedidosCadastrar}
        />
        <PrivateRoute
          path="/admin/pedidos/editar/:idPedido"
          exact
          component={PedidosEditar}
        />
        <PrivateRoute
          path="/admin/entidades/cadastrar"
          exact
          component={EntidadesCadastrar}
        />
        <PrivateRoute
          path="/admin/entidades/editar/:idEntidade"
          exact
          component={EntidadesEditar}
        />
        <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
        <PrivateRoute
          path="/admin/usuarios/cadastrar"
          exact
          component={UsuarioCadastrar}
        />
        <PrivateRoute
          path="/admin/usuarios/editar/:idUsuario"
          exact
          component={UsuariosEditar}
        />
      </Switch>
    </BrowserRouter>
  );
}

//    <Route path="/client/produtos/buscaCEP" exact component={BuscaCEP} />
