const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const app = express()


const url = "https://carlosdiazgirol.github.io/dashboard"

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
            

            const pageTitle = $('title').text()
            
            const links = []
            const imgs = []

            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })

            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })

            console.log(links);
            

            res.send(`
                <h1>${pageTitle}</h1>
                <ul>
                    ${links.map(link => `<li>${link}</li>`).join('')}
                </ul>
                <h2>Imágenes</h2>
                <ul>
                    ${imgs.map(img => `<li>${img}</li>`).join('')}
                </ul>
                `)
        }
    })
})


app.listen(3000, () => {
    console.log("Está escuchando en el puerto http://localhost:3000")
})

