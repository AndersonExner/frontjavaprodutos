import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const produtoModel = {
    codigo : 0,
    nome : "",
    marca : ""
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState(produtoModel)

  useEffect(() => {
    fetch("http://localhost:8080/listarprodutos")
    .then(data => data.json())
    .then(dataJson => setProdutos(dataJson));
  }, []);

  return (
    <div>
      <Formulario botao={btnCadastrar} />
      <Tabela vetor={produtos} />
    </div>
  );
}

export default App;
