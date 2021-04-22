const routers = require('./pages');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function getEntriesAndHtmls(env = 'production') {
    const entries = {};
    const htmls = [];

    routers.pages.forEach(page => {
        const { name } = page;
        entries[name] = [`./src/Pages/${name}/index.tsx`];
        htmls.push(new HtmlWebpackPlugin({
            filename: page.entry || `${name}.html`,
            chunks: [name],
            templateContent: ({
                css,
            }) => {
                return (
                    `<!DOCTYPE html>
                        <html>
                        <head>
                            <meta http-equiv="content-type" content="text/html;charset=utf-8">
                            <meta name="renderer" content="webkit">
                            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover, minimal-ui">
                            <meta name="apple-mobile-web-app-capable" content="yes" />
                            <meta charset="UTF-8">
                            <title>${page.title || 'Template'}</title>
                        </head>
                        <body>
                            <div id="root"></div>
                        </body>
                    </html>`
                );
            }
        }))
    })

    return {
        entries,
        htmls,
    }
}
