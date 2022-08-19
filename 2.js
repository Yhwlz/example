const fs = require('fs');
const path = require('path');



fs.readFile(path.join(__dirname, './box/index2.html'), 'utf8', (err, htmlStr) => {
    if (err !== null) return console.log(err.message);
    resolveFile(htmlStr);
})


const resolveFile = (htmlStr) => {
    const regStyle = /<style>[\s\S]*<\/style>/.exec(htmlStr)[0].replace('<style>', '').replace('</style>', '').replace(/[\r\n\t]/g, "");
    const regScript = /<script>[\s\S]*<\/script>/.exec(htmlStr)[0].replace('<script>', '').replace('</script>', '');
    const regHtml = htmlStr.
    replace(/<style>[\s\S]*<\/style>/, '<link rel="stylesheet" href="./index.css">').
    replace(/<script>[\s\S]*<\/script>/, '<script src="./index.js"></script>');
    const wirteFileType = [{
            filetype: 'css',
            reg: regStyle
        }, {
            filetype: 'js',
            reg: regScript
        },
        {
            filetype: 'html',
            reg: regHtml
        }
    ];

    wirteFileType.forEach(item => {
        fs.writeFile(path.join(__dirname, './box/index.' + item.filetype), item.reg, (err) => {
            if (err) return console.log(err);
            console.log(item.filetype + '写入成功');
        })
    });
}