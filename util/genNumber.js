const seq = () => {
  return (
		Math.floor(Math.random() * 1000000000000) +
		Date.now() +
		1000000000000
  )
		.toString()
		.substring(1)
}

module.exports = seq