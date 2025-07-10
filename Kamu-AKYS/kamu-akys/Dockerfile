FROM node:21.7.0

# Çalışma dizini
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Diğer tüm dosyaları kopyala
COPY . .

# Vite varsayılan portu
EXPOSE 5173

# Geliştirme sunucusunu başlat (npm run dev script'ine göre)
CMD ["npm", "run", "dev"]
