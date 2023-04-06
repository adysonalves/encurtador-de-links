const geradorUrls = require("../functions/geradorUrls");
const Urls = require("../models/Url");


module.exports = class Url {

    static home(req,res){
        req.session.destroy()
        res.render('index', { title: 'Encurtador de Links' });
    }

    static async acessaLink(req, res) {
        const url = req.params.url;

        if (url) {
            const consulta = await Urls.findOne({ where: { urlEncurtada: url } })

            if (consulta != null) {

                let views = consulta.views;
                views = parseInt(views);
                views += 1;

                await Urls.update({
                    views: views
                },{where: { urlEncurtada: url } })
                res.redirect(consulta.urlOriginal);
                return
            }  

        }

        res.redirect('/')
    }

    static async createLink(req, res) {

        const protocolo = req.protocol;
        const hostname = req.hostname;

        

        let link = req.body.link;

        link = link.trim();
        link = link.replace('http://','');
        link = link.replace('https://','');

        const urlCompleta = `https://${link}`
        const geraUrlCurta = geradorUrls();

        const urlBase = protocolo + "://" + hostname + "/u/" + geraUrlCurta

        await Urls.create({
            urlOriginal: urlCompleta,
            urlEncurtada: geraUrlCurta
        }).then((newUrl) => {
            req.session.urlEncurtada = urlBase;
        });

        res.redirect('/encurtada');


    }

    static encurtada(req,res){
        if(req.session.urlEncurtada){
            res.render('urlEncurtada', { title: "Url encurtada", urlBase: req.session.urlEncurtada });
            return;
        }

        res.redirect('/')
        
    }

    static async viewsUrl(req,res){
        const url = req.params.url;

        const protocolo = req.protocol;
        const hostname = req.hostname;
        const porta = req.port;

        const urlBase = protocolo + "://" + hostname + "/u/" + url

        if(url){
            const buscaLink = await Urls.findOne({where: {urlEncurtada: url}, raw:true})

            if(buscaLink != null){
                res.render('viewsUrl', {title: 'Visualizações do link', buscaLink: buscaLink, urlBase})
                return
            }      
        }

        res.redirect('/')
    }
}