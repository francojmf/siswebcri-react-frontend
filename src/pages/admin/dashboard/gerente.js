import React from 'react';
import ImgCri from '../../../assets/img/cri01.jpg';

export default function Dashboard() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colspan="12">
              <h1 align="center">Bem-vindo ao SisWeb-CRI </h1>
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colspan="12">
              <h4 align="center">- Acesse as opções no menu lateral.</h4>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td colspan="6">Este é o modelo de cadeira de rodas disponível:</td>
            <td rowspan="2" colspan="6">
              <p>- Você tem acesso como Gerente e pode:</p>
              <p>- Editar usuários, produtos e pedidos.</p>
              <p>- Gerar novos pedidos.</p>
            </td>
          </tr>
          <tr>
            <td>
              <img src={ImgCri} alt="CRI disponivel" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
