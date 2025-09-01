const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  error.statusCode = 404
  error.isOperational = true
  
  // Log the 404 for monitoring
  // console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`, {
  //   ip: req.ip,
  //   userAgent: req.get('User-Agent'),
  //   timestamp: new Date().toISOString()
  // })
  
  next(error)
}

module.exports = notFound