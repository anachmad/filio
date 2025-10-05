const prisma = require('../../lib/prisma');
const bcrypt = require('bcryptjs');
const {v7 : uuidv7} = require('uuid');
const jwt = require('jsonwebtoken');

// Fungsi untuk handle registrasi user
const registerUser = async (req, res) => {    
    try {
        // Ambil data dari req body
        const {fullName, email, password} = req.body;

        // Validasi input jika ada data yang tidak terisi
        if (!email || !password || !fullName){
            return res.status(400).json({
                message: 'Nama, email, atau password tidak lengkap'
            });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Buat UUID v7 untuk key
        const newUserId = uuidv7();

        // Simpan user baru ke database
        const newUser = await prisma.user.create({
            data : {
                id : newUserId,
                fullName : fullName,
                email : email,
                password : hashedPassword,
            },
        });

        // Kirim respon sukses
        res.status(201).json({
            message: 'Registrasi user sukses!',
            user: {
                id : newUser.id,
                fullName: newUser.fullName,
                email: newUser.email
            },
        });
    } catch (error) {
        console.error(error);

        // Pesan error jika email sudah digunakan
        if (error.code === 'P2002' && error.meta?.target.includes('email')) {
            return res.status(409).json({ message: 'Email sudah digunakan' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fungsi untuk handle login user
const loginUser = async (req, res) => {
    try {
        // Ambil data dari request body
        const {email, password} = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({
                message : 'Email atau password masih kosong'
            });
        }

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
            where : {
                email : email,
            },
        });

        // Jika user tidak ditemukan atau password tidak cocok, kirim error message
        if (!user || !bcrypt.compare(password, user.password)){
            return res.status(400).json({
                message : 'Email atau password salah'
            });
        }

        // Jika berhasil, buat token JWT
        const token = jwt.sign(
            { userId : user.id },
            process.env.JWT_SECRET,
            { expiresIn : '24h' }
        );

        // Kirimkan token ke client
        res.status(200).json({
            message : 'Login berhasil',
            token : token,
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            message : 'Internal Server Error'
        });
    }
};

// Fungsi untuk menampilkan profil user setelah login
const getMyProfile = async (req, res) => {
    try{
        // Ambil userId dari middleware (setelah verifikasi)
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where: { 
                id: userId
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user){
            return res.status(404).json({
                message: 'User tidak ditemukan'
            });
        }

        res.status(200).json(user);
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMyProfile,
};