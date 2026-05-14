function ipRestriction(req, res, next) {

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  console.log("Client IP:", ip);

  const allowed =

    ip.includes("127.0.0.1") ||

    ip.includes("::1") ||

    ip.startsWith("10.");

  if (!allowed) {

    return res.status(403).json({
      msg:
        "Access only through college WiFi/VPN",
    });
  }

  next();
}

module.exports = ipRestriction;