const authAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: "Access forbidden, user is not an admin. "})
    }

    next();
}
export default authAdmin;