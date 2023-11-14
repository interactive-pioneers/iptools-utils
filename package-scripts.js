const jssrc = './js';
const scsssrc = './scss';
const dist = 'dist';
const tests = 'test';
const config = require('./package.json');
const date = new Date();
const now = date.toLocaleDateString();

const banner = `'
* ${config.name} - v${config.version} - ${now}\n*
* ${config.homepage}\n*
* Copyright © ${date.getFullYear()}
* ${config.author.name}; Licensed ${config.license}\n
'`;

module.exports = {
  scripts: {
    banner: {
      script: `echo ${banner}`
    },
    lint: {
      default: {
        script: 'nps banner lint.eslint lint.stylelint',
        description: 'Exec all linter'
      },
      stylelint: `stylelint ${jssrc}/iptools-utils.scss ${jssrc}/_setup.scss --custom-syntax postcss-scss`,
      eslint: './node_modules/.bin/eslint --config=.eslintrc.json ' +
        `'${jssrc}/**/*.js' ` +
        '--no-error-on-unmatched-pattern',
    },
    build: {
      script: 'nps banner helper.cleandist helper.js helper.sass',
      description: 'Build distribution from source'
    },
    serve: {
      script: `nps banner & nps helper.watchSass & nps helper.watchJS`,
      description: 'Watch for changes and then build'
    },
    helper: {
      cleandist: {
        script: `rm -rf ./${dist}/*`,
        hiddenFromHelp: true
      },
      js: {
        script: `esbuild ${jssrc}/index.js --outfile=${dist}/index.js --bundle --format=esm --minify --target=es6`,
        hiddenFromHelp: true
      },
      sass: {
        script: `sass index.scss ${dist}/iptools-utils.default.css --style expanded --no-source-map`,
        hiddenFormHelp: true
      },
      watchSass: {
        script: `nodemon --exec 'nps helper.sass' --ext scss --watch ${scsssrc}`,
        hiddenFromHelp: true
      },
      watchJS: {
        script: `nodemon --exec 'nps helper.js' --ext js --watch ${jssrc}`,
        hiddenFromHelp: true
      }
    }
  }
};
