const notFoundHandler = (req, res, next) => {
  req.log.error('404');
  res.status(404).json({ message: 'Route not found' });
};

export default notFoundHandler;
