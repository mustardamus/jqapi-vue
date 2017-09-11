let jquery

if (process.browser) {
  jquery = require('jquery/dist/jquery.slim')
} else {
  jquery = require('cheerio')
}

export default jquery
