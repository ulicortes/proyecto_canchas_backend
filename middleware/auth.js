import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).send("Authorization failed. No access token.");
  }
  
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Could not verify token");
    }
    req.user = user;
  });
  
  next();
}