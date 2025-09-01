# Vercel Deployment Guide

This guide will help you deploy the AI Teleradiology platform to Vercel.

## Prerequisites

1. Vercel account (https://vercel.com)
2. GitHub account with this repository
3. Database (PostgreSQL recommended)
4. Cloudinary account for file uploads
5. Email service (Gmail/SMTP)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to a GitHub repository.

### 2. Deploy Backend (API)

1. Go to Vercel Dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Set the **Root Directory** to `backend`
5. Configure Environment Variables:

```
NODE_ENV=production
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=your_secure_refresh_secret
JWT_REFRESH_EXPIRE=7d
BCRYPT_SALT_ROUNDS=12
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-frontend.vercel.app
CMS_URL=https://your-cms.vercel.app
VALID_API_KEYS=your_api_keys_comma_separated
```

6. Deploy

### 3. Deploy Frontend (Main App)

1. Create a new Vercel project
2. Import the same GitHub repository
3. Set the **Root Directory** to the project root (leave empty)
4. Configure Environment Variables:

```
VITE_API_URL=https://your-backend.vercel.app/api
```

5. Deploy

### 4. Deploy CMS (Admin Panel)

1. Create a new Vercel project
2. Import the same GitHub repository
3. Set the **Root Directory** to `cms`
4. Configure Environment Variables:

```
VITE_API_URL=https://your-backend.vercel.app/api
```

5. Deploy

### 5. Update CORS Settings

After deployment, update your backend environment variables with the actual Vercel URLs:

```
FRONTEND_URL=https://your-actual-frontend.vercel.app
CMS_URL=https://your-actual-cms.vercel.app
```

## Database Setup

### Option 1: Vercel Postgres
1. Go to your backend project in Vercel
2. Go to Storage tab
3. Create a new Postgres database
4. Copy the connection string to `DATABASE_URL`

### Option 2: External PostgreSQL
Use services like:
- Supabase (recommended)
- Railway
- PlanetScale
- AWS RDS

## Environment Variables Security

⚠️ **Important Security Notes:**

1. **Never commit `.env` files** to your repository
2. Use strong, unique secrets for JWT tokens
3. Use app passwords for Gmail (not your regular password)
4. Rotate API keys regularly
5. Use different secrets for production and development

## Custom Domains (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update environment variables with new URLs

## Monitoring and Logs

- Check Vercel Functions logs for backend issues
- Monitor database connections
- Set up error tracking (Sentry recommended)

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure `FRONTEND_URL` and `CMS_URL` are correctly set
2. **Database Connection**: Verify `DATABASE_URL` format
3. **Email Issues**: Check SMTP settings and app passwords
4. **File Upload Issues**: Verify Cloudinary credentials

### Build Errors:

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build and function logs
3. Verify all environment variables are set correctly

---

**Note**: This is a serverless deployment. The backend will run as Vercel Functions, which have execution time limits and cold starts. For high-traffic applications, consider using Vercel Pro or dedicated hosting.