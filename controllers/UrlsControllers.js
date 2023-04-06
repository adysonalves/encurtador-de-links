const Urls = require("../models/Url");

module.exports = class Url {
    static async home(req, res) {
        const url = req.params.url;

        if (url) {
            const consulta = await Urls.findOne({ where: { urlEncurtada: url } })

            if (consulta != null) {
                res.redirect(consulta.urlOriginal);
                return
            }

        }

        res.render('index', { title: 'Encurtador de Links' });
    }

    static async createLink(req, res) {

        const protocolo = req.protocol;
        const hostname = req.hostname;

        const urlBase = protocolo + "://" + hostname + "/"

        let link = req.body.link;

        link = link.trim();
        link = link.replace('http://','');
        link = link.replace('https://','');

        const urlCompleta = `https://${link}`

        const geraUrlCurta = Math.floor(100000 + Math.random() * 10000000);

        await Urls.create({
            urlOriginal: urlCompleta,
            urlEncurtada: geraUrlCurta
        }).then((newUrl) => {
            res.render('urlEncurtada', { title: "Url encurtada", newUrl: newUrl.urlEncurtada, urlBase: urlBase })
        });


    }
}