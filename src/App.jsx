import { useState, useEffect } from "react";
import {formatter} from "./Components/index"
import getExchange from "./assets/api"

function App() {
  const [price, setPrice] = useState("");
  const [shippingvalue, setShippingValue] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [todaydolar, setTodaydolar] = useState('');

const handleSubmit = (e) => {
  e.preventDefault()
  const customsValue = parseFloat(price+shippingvalue-discount)/(parseFloat(todaydolar.bid))
  console.log("customsValue", customsValue)
  if (tax == 0 ){
  setTax(17) 
  console.log("tax",tax)}
  console.log("custom", customsValue * tax)
}

const exchange = async () => {
  await getExchange
    .get("/json/last/USD-BRL")
    .then(
      (response) => setTodaydolar(response.data.USDBRL)
      )
      .catch((err) => {
        console.log("Erro ao carregar" + err);
      });
    };
    
    useEffect(() => {
      exchange();
    }, []);

  

  return (
    <>
      <h1>Tax-Calculator! Sua calculadora Aliexpress, Shein, Banggood...</h1>
      <div className="container">
        <form>
        <div className="form-group">
            <label htmlFor="dolvalue">Valor do Dolar: </label>
            <input
              type="text"
              className="form-control"
              id="dolvalue" 
              value={formatter.format(parseFloat(todaydolar.bid))}
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Digite o preço do produto(2)</label>
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
              Digite o Valor do Frete(Deixe em branco para Gratis)
            </label>
            <input
              type="number"
              className="form-control"
              id="shipping"
              value={shippingvalue}
              onChange={(i)=>{setShippingValue(i.target.value)}}
            />
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
          </div>

          <div className="form-group">
            <label htmlFor="tax">Digite a taxa</label>
            <input type="number" 
            className="form-control" 
            id="tax" 
            value={tax}
            onChange={(t)=>{setTax(t.target.value)}}
            placeholder="Deixe em branco para 17%(Padrão)"/>
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
