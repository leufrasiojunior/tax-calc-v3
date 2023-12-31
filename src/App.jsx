import { useState, useEffect } from "react";
import {formatter, exchangeDolar} from "./Components/index"
import getExchange from "./assets/api"

function App() {
  const [price, setPrice] = useState("");
  const [shippingvalue, setShippingValue] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [todaydolar, setTodaydolar] = useState('');
  const [dolarValue, setdolarValue] = useState('');
  const [icmsValor, seticmsValor] = useState('');

const handleSubmit = (e) => {
  e.preventDefault()
  // a
  setdolarValue(parseFloat(price+shippingvalue-discount)/(parseFloat(todaydolar.bid)))
  Lassthen()
}

// Enviar via props os atributos dos calculos

const Lassthen = () => {
  return (price / (1 - 0.17) * 0.17);
}
  
const exchange = async () => {
  await getExchange
    .get("/json/last/USD-BRL")
    .then(
      (response) => setTodaydolar(response.data.USDBRL)
      )
      .catch((err) => {
        console.log("Erro ao carregar" + err);
        setTodaydolar(5)
      });
    };
    
    useEffect(() => {
      exchange();
    }, []);

  

  return (
    <>
    <Lassthen/>
      <h1>Tax-Calculator! Sua calculadora Aliexpress, Shein, Banggood...</h1>
      <div className="container">
        <form>
        <div className="form-group">
            <label htmlFor="dolvalue">Valor do Dolar: </label>
            <input
              type="text"
              className="form-control"
              id="dolvalue" 
              placeholder={formatter.format(parseFloat(todaydolar.bid))}
            />
            <small>O valor é identificado altomaticamente. Caso queira trocar, insira o valor.</small>
          </div>

          <div className="form-group">
            <label htmlFor="price">Digite o preço do produto</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shipping">
              Digite o Valor do Frete
            </label>
            <input
              type="number"
              className="form-control"
              id="shipping"
              value={shippingvalue}
              onChange={(i)=>{setShippingValue(i.target.value)}}
            />
            <small>Deixe em branco para Gratis</small>
          </div>

          <div className="form-group">
            <label htmlFor="discount">Valor do desconto</label>
            <input
              type="number"
              className="form-control"
              id="discount"
              value={discount}
              onChange={(d)=>{setDiscount(d.target.value)}}
            />
            <small>Atualmente as compras do Aliexpress, o imposto é de acordo com o valor pago.</small>
          </div>

          <div className="form-group">
            <label htmlFor="tax">Digite a taxa</label>
            <input type="number" 
            className="form-control" 
            id="tax" 
            value={tax}
            onChange={(t)=>{setTax(t.target.value)}}
            />
          <small>Deixe em branco para o padrão de 17%</small>
          </div>

          <div className="showResults">
          <p>Valor em Dólar: {exchangeDolar.format(dolarValue)}</p>
          </div>

          {/* <div className="form-group">
            <label htmlFor="dol-amount">Valor em Dólar: </label>
            <input
              type="text"
              className="form-control"
              id="dol-amount"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="tax-amount">Valor do Imposto ICMS: </label>
            <input
              type="text"
              className="form-control"
              id="tax-amount"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Valor da a ser pago: </label>
            <input type="text" 
            className="form-control" 
            id="amount" disabled />
          </div> */}

          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Calcular
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
