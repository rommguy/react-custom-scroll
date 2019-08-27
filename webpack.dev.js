const { merge } = require('lodash/fp')
const common = require('./webpack.config')

module.exports = [merge(common[0], { mode: 'development' }), merge(common[1], { mode: 'development' })]
