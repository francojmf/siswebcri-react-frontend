export const getNomeTipo = (value) => {
  //SOLUÇÃO 1
  var arr = ['Administrador', 'Gerente', 'Usuário'];
  return arr[value - 1];
};
export const getNomeTipoLabel = (value) => {
  //SOLUÇÃO 1
  var arr = ['success', 'default', 'secondary'];
  return arr[value - 1];
};
