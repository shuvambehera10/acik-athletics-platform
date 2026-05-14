function admin(req, res, next) {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      msg: "Admin only",
    });
  }

  next();
}

module.exports = admin;