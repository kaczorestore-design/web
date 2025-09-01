# AI Teleradiology Backend API

A comprehensive backend API and Content Management System for AI-powered teleradiology services.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user lifecycle management with email verification
- **Content Management System**: Full CMS for managing pages, blog posts, services, and testimonials
- **File Upload System**: Secure file uploads with Cloudinary integration
- **Contact Management**: Contact form submissions with inquiry tracking
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Security**: Comprehensive security middleware (helmet, CORS, rate limiting, XSS protection)
- **Database**: PostgreSQL with Sequelize ORM
- **Email System**: Nodemailer integration for transactional emails
- **Validation**: Robust input validation and sanitization
- **Error Handling**: Centralized error handling with detailed logging

## 📋 Prerequisites

- Node.js (>= 16.0.0)
- npm (>= 8.0.0)
- PostgreSQL (>= 12.0)
- Cloudinary account (for file uploads)
- Email service (SMTP)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ai-teleradiology/backend.git
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/ai_teleradiology
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your-refresh-secret-key
   JWT_REFRESH_EXPIRE=30d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@ai-teleradiology.com
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Frontend URLs
   FRONTEND_URL=http://localhost:3000
   CMS_URL=http://localhost:3001
   
   # API Keys
   API_KEY_SECRET=your-api-key-secret
   
   # File Upload
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
- **Swagger UI**: `http://localhost:5000/api-docs`
- **Health Check**: `http://localhost:5000/health`
- **API Info**: `http://localhost:5000/api`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/resend-verification` - Resend verification email

### User Management
- `GET /api/users` - Get all users (admin)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)
- `POST /api/users/:id/activate` - Activate user account
- `POST /api/users/:id/deactivate` - Deactivate user account
- `GET /api/users/stats` - Get user statistics

### Content Management
- `GET /api/cms/content` - Get all content
- `POST /api/cms/content` - Create new content
- `GET /api/cms/content/:id` - Get content by ID
- `PUT /api/cms/content/:id` - Update content
- `DELETE /api/cms/content/:id` - Delete content
- `GET /api/cms/content/slug/:slug` - Get content by slug
- `GET /api/cms/content/type/:type` - Get content by type
- `POST /api/cms/content/:id/publish` - Publish content
- `POST /api/cms/content/:id/unpublish` - Unpublish content

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `GET /api/services/:id` - Get service by ID
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/services/featured` - Get featured services
- `GET /api/services/types` - Get service types
- `POST /api/services/:id/toggle-active` - Toggle service status

### Contact Management
- `GET /api/contact` - Get all contact submissions
- `POST /api/contact` - Submit contact form
- `GET /api/contact/:id` - Get contact submission by ID
- `PUT /api/contact/:id` - Update contact submission
- `DELETE /api/contact/:id` - Delete contact submission
- `POST /api/contact/:id/follow-up` - Add follow-up note
- `GET /api/contact/stats` - Get contact statistics

### File Uploads
- `POST /api/uploads/image` - Upload image
- `POST /api/uploads/medical` - Upload medical file
- `POST /api/uploads/document` - Upload document
- `POST /api/uploads/avatar` - Upload avatar
- `GET /api/uploads/:filename` - Serve uploaded file
- `DELETE /api/uploads/:filename` - Delete uploaded file

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- `user` - Regular user
- `radiologist` - Medical professional
- `cms_editor` - Content editor
- `admin` - System administrator

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request rate limiting
- **XSS Protection**: Cross-site scripting prevention
- **SQL Injection**: PostgreSQL injection prevention
- **HPP**: HTTP parameter pollution prevention
- **Input Validation**: Comprehensive input validation
- **Password Hashing**: bcrypt password hashing
- **JWT Security**: Secure token implementation

## 📁 Project Structure

```
backend/
├── docs/
│   └── swagger.js          # API documentation
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── errorHandler.js     # Error handling
│   └── notFound.js         # 404 handler
├── models/
│   ├── User.js             # User model
│   ├── Content.js          # Content model
│   └── Contact.js          # Contact model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User management routes
│   ├── cms.js              # Content management routes
│   ├── services.js         # Services routes
│   ├── contact.js          # Contact routes
│   └── uploads.js          # File upload routes
├── utils/
│   ├── database.js         # Database utilities
│   ├── email.js            # Email utilities
│   ├── fileUpload.js       # File upload utilities
│   └── validation.js       # Validation utilities
├── uploads/                # Local file storage
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── README.md              # Documentation
└── server.js              # Main server file
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://username:password@hostname:5432/ai_teleradiology
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-frontend-domain.com
CMS_URL=https://your-cms-domain.com
```

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring

- **Health Check**: `/health` endpoint for monitoring
- **Logging**: Morgan for HTTP request logging
- **Error Tracking**: Centralized error handling
- **Performance**: Compression middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@ai-teleradiology.com or create an issue in the repository.

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete API implementation
- Authentication system
- Content management system
- File upload system
- Contact management
- API documentation
- Security implementation

---

**Built with ❤️ by the AI Teleradiology Team**