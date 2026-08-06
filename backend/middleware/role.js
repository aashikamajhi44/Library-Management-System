const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }
    next();
  };
};

const requireApproved = (req, res, next) => {
  if (
    (req.user.role === 'borrower' || req.user.role === 'librarian') &&
    req.user.status !== 'approved'
  ) {
    return res.status(403).json({ message: 'Your account is pending admin/librarian approval' });
  }
  next();
};

module.exports = { authorize, requireApproved };
