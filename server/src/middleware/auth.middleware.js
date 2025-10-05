const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Ambil token dari header auth
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // Cek apakah ada token. Jika tidak, kirim error
    if (!token) {
        return res.status(401).json({
            message : 'Akses ditolak. Tidak ada token yang disediakan.'
        });
    }

    try{
        // Verifikasi token menggunakan kunci rahasia
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Simpan payload token (berisi userID) ke object request agar dapat digunakan kembali
        req.user = decoded;

        // Lanjut ke proses berikutnya
        next();
    } catch(error) {
        // Jika token tidak valid, kirim error
        req.status(403).json({
            message : 'Token tidak valid atau sudah kadaluarsa'
        });
    }

};

module.exports = authMiddleware;