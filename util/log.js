const log = (opId, task, uId) => {
  console.log(new Date().getTime() + ':', 'Operator ', opId, task, 'for', uId)
}

module.exports = log