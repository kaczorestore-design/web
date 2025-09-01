# AI Teleradiology Platform

A comprehensive teleradiology platform built with React, Node.js, and modern web technologies. This platform enables remote radiology services with AI-powered diagnostic assistance.

## 🏗️ Project Structure

```
AI-Teleradiology/
├── src/                    # Frontend React application
├── cms/                    # Content Management System
├── backend/                # Node.js API server
├── vercel.json            # Vercel deployment configuration
├── DEPLOYMENT.md          # Detailed deployment guide
└── deploy.js              # Deployment helper script
```

## 🚀 Features

- **Patient Portal**: Secure patient registration and case management
- **Radiologist Dashboard**: Professional interface for image analysis
- **AI Integration**: Advanced diagnostic assistance
- **CMS**: Content management for administrators
- **Real-time Communication**: Instant messaging and notifications
- **HIPAA Compliance**: Healthcare data security standards
- **Multi-tenant Architecture**: Support for multiple healthcare facilities

## 🛠️ Technology Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API communication
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **PostgreSQL** database with Sequelize ORM
- **JWT** authentication
- **Cloudinary** for image storage
- **Nodemailer** for email services
- **Swagger** for API documentation

### CMS
- **React** with Vite
- **React Query** for data fetching
- **React Hook Form** for form management
- **Recharts** for analytics

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL database
- Cloudinary account
- Email service (Gmail/SMTP)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Teleradiology
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install CMS dependencies
   cd ../cms
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment example
   cp .env.example .env
   
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev
   
   # Terminal 2: Frontend
   npm run dev
   
   # Terminal 3: CMS
   cd cms
   npm run dev
   ```

## 🌐 Deployment

### Vercel Deployment (Recommended)

This project is optimized for Vercel deployment with serverless functions.

#### Quick Deployment

1. **Run deployment helper**
   ```bash
   npm run deploy:help
   ```

2. **Follow the deployment guide**
   See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

#### Manual Deployment

1. **Deploy Backend**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Deploy Frontend**
   ```bash
   vercel --prod
   ```

3. **Deploy CMS**
   ```bash
   cd cms
   vercel --prod
   ```

### Environment Variables

Required environment variables for production:

```env
# Database
DATABASE_URL=postgresql://...

# JWT Secrets
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email
EMAIL_PASS=your_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# URLs
FRONTEND_URL=https://your-app.vercel.app
CMS_URL=https://your-cms.vercel.app
VITE_API_URL=https://your-api.vercel.app/api
```

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment instructions
- [Backend API Documentation](./backend/README.md) - API endpoints and usage
- [Environment Configuration](./.env.example) - Required environment variables

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation and sanitization
- XSS protection
- HIPAA compliance measures

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
npm test

# Run CMS tests
cd cms
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Check the [deployment guide](./DEPLOYMENT.md)
- Review the [backend documentation](./backend/README.md)
- Open an issue on GitHub

## 🔗 Links

- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

**Built with ❤️ for healthcare professionals**
