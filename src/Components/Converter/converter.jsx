const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
    });

const exchangeDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});


export {formatter, exchangeDolar}