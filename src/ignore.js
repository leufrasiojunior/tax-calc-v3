const addImposto = (valorProduto) => {
    return valorProduto * 1.6;
}

const addIcmsSimples = (valorProduto, valorIcms) => {
    return (valorProduto / (1 - valorIcms / 100)) - valorProduto;
}

const baseCalculo = (valorProduto, valorIcms) => {
    return addImposto(valorProduto) / (1 - (valorIcms / 100));
}

const calcIcms = (valorProduto, valorIcms) => {
    let calc = baseCalculo(valorProduto, valorIcms)
    return  calc * (valorIcms / 100);
}

const calcularBtn = document.getElementById("calcular");
calcularBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const valorProduto = parseFloat(document.getElementById("valorProduto").value);
    const valorDolar = () => {
        if(parseFloat(document.getElementById("valorDolar").value) > 0) {
            return parseFloat(document.getElementById("valorDolar").value);
        }
        return 5;
    }
    const valorConvertido = valorProduto / valorDolar();
    const valorIcms = () => {
        if(parseFloat(document.getElementById("valorIcms").value) > 0) {
            return parseFloat(document.getElementById("valorIcms").value);
        }
        return 17;
    }
    const info1 = document.getElementById("info1");
    const resultado = document.getElementById("resultado");

    let valor = 0;
    const valorF = valorProduto.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    resultado.style.display = "block";
    if (valorConvertido > 50) {
        valor = calcIcms(valorProduto, valorIcms());
        info1.innerText = `Valor do Produto em Dólar: ${valorConvertido.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
        Valor do Produto em Reais: ${valorF}
        Valor do Imposto (60%): ${(valorProduto * 0.6).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        Valor do ICMS: ${valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        Valor Final com imposto e ICMS: ${(addImposto(valorProduto) + valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        Imposto final de: ${(((addImposto(valorProduto) + valor) / valorProduto - 1)*100).toFixed(2)}%`;
    } else {
        valor = addIcmsSimples(valorProduto, valorIcms());
        info1.innerText = `Valor do Produto em Dólar: ${valorConvertido.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
        Valor do Produto em Reais: ${valorF}
        Valor do ICMS (${valorIcms()}%): ${(valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        Valor Final com ICMS: ${(valor + valorProduto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`;
    }
})