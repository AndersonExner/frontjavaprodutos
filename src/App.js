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

  const aoDigitar = (e) => {
    setProduto({...produto, [e.target.name]:e.target.value});
  };

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(produto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }else{
        setProdutos([...produtos, retorno_convertido]);
        limparForm();
      }
    })
  };

  const remover = () => {
    fetch('http://localhost:8080/remover/'+produto.codigo, {
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert(retorno_convertido.mensagem);

      let vetorTemp = [...produtos];

      let index = vetorTemp.findIndex((p) => {
        return p.codigo === produto.codigo;
      });

      vetorTemp.splice(index, 1);

      setProdutos(vetorTemp);
      limparForm();
    })
  };

  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method:'put',
      body:JSON.stringify(produto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }else{
        let vetorTemp = [...produtos];

        let index = vetorTemp.findIndex((p) => {
          return p.codigo === produto.codigo;
        });
  
        vetorTemp[index] = produto;
  
        setProdutos(vetorTemp);
        limparForm();
      }
    })
  };

  const limparForm = () => {
    setProduto(produto);
    setBtnCadastrar(true);
  };

  const selecionarProduto = (indice) => {
    setProduto(produtos[indice]);
    setBtnCadastrar(false);
  };

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={produto} cancelar={limparForm} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
