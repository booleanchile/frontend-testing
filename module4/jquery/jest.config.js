module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.min.js",
    "!**/node_modules/**",
  ],
  moduleFileExtensions: [
    'js',
    'html'
  ],
  transform: {  
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html?$': 'html-loader-jest'
  },
  testMatch: [
    '**/?(*.)+(spec).js'
  ]
};