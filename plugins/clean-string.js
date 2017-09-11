export default (str = '') => {
  str = str
    .replace(/<!\[CDATA\[|\]\]>/gi, '') // strip CDATA
    .replace(/^\s+|\s+$/g, '') // trim

  return str
}
