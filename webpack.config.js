const htmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode:'development', 

    output: {
        clean: true // Limpia el dist y lo vuelve a crear
    },

    module:{
        rules: [
            {
                test: /\.html$/, //Barre cada uno de los archivos del proyecto hasta que encuentre el que tenga esa extension
                loader: 'html-loader', // Si lo encuentra el archivo manda a llamar el loader
                options: {
                    sources: false // Nos permite manipular de manera manual
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/, // Se excluye porque si se aplica esta regla no ejecuta la siguiente, al excluirla continua 
                use: ['style-loader','css-loader'] // Usando los paquetes instalados
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/, // Para cualquier archivo imagen con ese tipo de extension
                loader: 'file-loader'
            }
        ]
    },

    optimization: {},

    plugins: [
        new htmlWebpack({
            template: './src/index.html' // Archivo del cual queremos que se base
        }),

        new MiniCssExtract({
            filename: '[name].css' //hashearlo es para produccion
        }),

        new CopyPlugin({
            patterns: [
               { from: 'src/assets/', to: 'assets/'}
            ]
        })  
    ]
}