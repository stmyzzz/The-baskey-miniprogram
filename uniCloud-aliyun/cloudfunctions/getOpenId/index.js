'use strict';
exports.main = async function(event,context) {
    const res = await uniAccountIns.code2Session({
    code: event.code
  })
    return res
}