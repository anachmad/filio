import prisma from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { v7 as uuidv7 } from 'uuid';
import jwt from 'jsonwebtoken';

// Fungsi untuk handle registrasi user
export const registerUser = async (req, res) => {    
    try {
        // Ambil data dari req body
        const {fullName, email, password, familyName} = req.body;

        // Validasi input jika ada data yang tidak terisi
        if (!email || !password || !fullName || !familyName){
            return res.status(400).json({
                message: 'Nama, nama keluarga, email, atau password belum terisi'
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

                family: {
                    create: {
                        name: familyName,
                    },
                },
            },
            include: {
                family: true,
            },
        });

        // Membuat auth token
        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h'},
        )

        // Kirim respon sukses
        res.status(201).json({
            message: 'Registrasi user sukses!',
            token: token,
            user: {
                id : newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                familyName: newUser.family.name,
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
export const loginUser = async (req, res) => {
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
        if (!user || !bcrypt.compareSync(password, user.password)){
            return res.status(400).json({
                message : 'Email atau password salah'
            });
        }

        // Jika berhasil, buat token JWT berdasarkan user ID
        const token = jwt.sign(
            { userId : user.id },
            process.env.JWT_SECRET,
            { expiresIn : '24h' }
        );

        // Kirimkan token ke client
        res.status(200).json({
            message : 'Login berhasil',
            token : token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            message : 'Internal Server Error'
        });
    }
};

// Fungsi untuk menampilkan profil user setelah login
export const getMyProfile = async (req, res) => {
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