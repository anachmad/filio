#!/bin/sh

# Hentikan skrip jika ada perintah yang gagal
set -e

echo "Menjalankan migrasi database produksi..."
# Menjalankan migrasi untuk produksi
npx prisma migrate deploy

echo "Menjalankan database seeder..."
# Menjalankan seeder
npx prisma db seed

echo "Migrasi dan seed selesai. Memulai aplikasi..."
# Menjalankan perintah utama (CMD) dari Dockerfile
exec "$@"