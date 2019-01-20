var nunjucks = require('nunjucks');

console.log(nunjucks.render(
    'board.nunjucks', {
      alumni: [
        {
          name: "Alex Krauel",
          path: "../static/images/alumni/alex.jpeg"
        },
        {
          name: "Kevin Li",
          path: "../static/images/alumni/kevin.jpeg"
        },
        {
          name: "Vishesh Shah",
          path: "../static/images/alumni/vishesh.jpeg"
        }
      ]
    }
  ));