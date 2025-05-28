@echo off
set IMAGE_NAME=huce-backend
set IMAGE_TAG=1.0.0
set CONTAINER_NAME=huce-backend
set PORT=3000:3000

echo 🛠️  Đang build Docker image %IMAGE_NAME%:%IMAGE_TAG%...
docker build -t %IMAGE_NAME%:%IMAGE_TAG% .

IF %ERRORLEVEL% EQU 0 (
    echo ✅ Build thành công.

    echo 🔄 Kiểm tra container cũ...
    docker stop %CONTAINER_NAME% >nul 2>&1
    docker rm %CONTAINER_NAME% >nul 2>&1

    echo 🚀 Đang chạy container mới...
    docker run -d --name %CONTAINER_NAME% -p %PORT% %IMAGE_NAME%:%IMAGE_TAG%

    echo 🟢 Container %CONTAINER_NAME% đang chạy tại http://localhost:%PORT:~0,4%
) ELSE (
    echo ❌ Build thất bại!
)

pause