const src = 'src';
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
        script: 'nps banner lint.eslint lint.jshint lint.stylelint',
        description: 'Exec all linter'
      },
      jshint: './node_modules/.bin/jshint --config ',
      stylelint: `stylelint ${src}/iptools-utils.scss --custom-syntax postcss-scss`,
      mocha: `./node_modules/mocha/bin/mocha "./${tests}/spec/*.js"`,
      eslint: './node_modules/.bin/eslint --config=.eslintrc.json ' +
        `'${src}/**/*.js' ` +
        '--no-error-on-unmatched-pattern',
    },
    build: {
      script: 'nps banner helper.cleandist helper.terser helper.sass helper.postcss',
      description: 'Build distribution from source'
    },
    watch: {
      script: `nps banner & nps helper.watchSass & nps helper.watchJS`,
      descriptn: 'Watch for changes and then build'
    },
    helper: {
      cleandist: {
        script: `rm -rf ./${dist}/*`,
        hiddenFromHelp: true
      },
      terser: {
        script: `terser ${src}/iptools-utils.js --compress --mangle --output ${dist}/iptools-utils.min.js`,
        hiddenFromHelp: true
      },
      sass: {
        script: `sass ${src}/iptools-utils.scss ${dist}/iptools-utils.min.css --style expanded --no-source-map`,
        hiddenFormHelp: true
      },
      postcss: {
        script: `postcss ${dist}/iptools-utils.min.css --use autoprefixer cssnano --replace --no-map`,
        hiddenFromHelp: true
      },
      watchSass: {
        script: `nodemon --exec 'nps helper.sass helper.postcss' --ext scss --watch ${src}`,
        hiddenFromHelp: true
      },
      watchJS: {
        script: `nodemon --exec 'nps helper.terser' --ext js --watch ${src}`,
        hiddenFromHelp: true
      }
    }
  }
};
