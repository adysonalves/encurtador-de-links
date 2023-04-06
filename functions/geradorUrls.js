module.exports = function gerarUrl(){
    const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let url = '';

    for(let i = 0; i < 8; i++){
        url += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }

    return url;
}