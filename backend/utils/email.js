const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs').promises

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

// Email templates
const emailTemplates = {
  verification: {
    subject: 'Verify Your Email - AI Teleradiology',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">AI Teleradiology</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="color: #666; line-height: 1.6;">Hello {{firstName}},</p>
          <p style="color: #666; line-height: 1.6;">
            Thank you for registering with AI Teleradiology. To complete your registration and activate your account, 
            please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationUrl}}" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:
            <br><a href="{{verificationUrl}}">{{verificationUrl}}</a>
          </p>
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            This verification link will expire in 24 hours. If you didn't create an account with us, 
            please ignore this email.
          </p>
        </div>
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">© 2024 AI Teleradiology. All rights reserved.</p>
        </div>
      </div>
    `
  },
  
  passwordReset: {
    subject: 'Reset Your Password - AI Teleradiology',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">AI Teleradiology</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="color: #666; line-height: 1.6;">Hello {{firstName}},</p>
          <p style="color: #666; line-height: 1.6;">
            We received a request to reset your password for your AI Teleradiology account. 
            Click the button below to create a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{resetUrl}}" 
               style="background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:
            <br><a href="{{resetUrl}}">{{resetUrl}}</a>
          </p>
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            This password reset link will expire in 1 hour. If you didn't request a password reset, 
            please ignore this email and your password will remain unchanged.
          </p>
        </div>
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">© 2024 AI Teleradiology. All rights reserved.</p>
        </div>
      </div>
    `
  },
  
  contactNotification: {
    subject: 'New Contact Form Submission - AI Teleradiology',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">AI Teleradiology</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> {{firstName}} {{lastName}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <p><strong>Organization:</strong> {{organization}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Priority:</strong> {{priority}}</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">{{message}}</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Additional Information</h3>
            <p><strong>Services Interested:</strong> {{servicesInterested}}</p>
            <p><strong>Budget Range:</strong> {{budgetRange}}</p>
            <p><strong>Timeline:</strong> {{timeline}}</p>
            <p><strong>Source:</strong> {{source}}</p>
            <p><strong>Submitted:</strong> {{submittedAt}}</p>
          </div>
        </div>
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">© 2024 AI Teleradiology. All rights reserved.</p>
        </div>
      </div>
    `
  },
  
  contactConfirmation: {
    subject: 'Thank You for Contacting AI Teleradiology',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">AI Teleradiology</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Inquiry</h2>
          <p style="color: #666; line-height: 1.6;">Hello {{firstName}},</p>
          <p style="color: #666; line-height: 1.6;">
            Thank you for contacting AI Teleradiology. We have received your inquiry and our team 
            will review it carefully. You can expect to hear from us within {{responseTime}}.
          </p>
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Inquiry Summary</h3>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Priority:</strong> {{priority}}</p>
            <p><strong>Reference ID:</strong> {{referenceId}}</p>
            <p><strong>Submitted:</strong> {{submittedAt}}</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            In the meantime, feel free to explore our services and learn more about how we can 
            help improve your radiology workflow.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{websiteUrl}}/services" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">
              Our Services
            </a>
            <a href="{{websiteUrl}}/about" 
               style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              About Us
            </a>
          </div>
        </div>
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">© 2024 AI Teleradiology. All rights reserved.</p>
          <p style="margin: 10px 0 0 0;">Need immediate assistance? Call us at +1 (555) 123-4567</p>
        </div>
      </div>
    `
  },
  
  welcomeEmail: {
    subject: 'Welcome to AI Teleradiology',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to AI Teleradiology</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome Aboard, {{firstName}}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Congratulations! Your account has been successfully verified and you're now part of 
            the AI Teleradiology community. We're excited to help you revolutionize your radiology workflow.
          </p>
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Complete your profile to get personalized service recommendations</li>
              <li>Explore our comprehensive teleradiology services</li>
              <li>Schedule a consultation with our radiology experts</li>
              <li>Access our knowledge base and resources</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{dashboardUrl}}" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">
              Go to Dashboard
            </a>
            <a href="{{profileUrl}}" 
               style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Complete Profile
            </a>
          </div>
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            If you have any questions or need assistance, our support team is here to help. 
            Don't hesitate to reach out!
          </p>
        </div>
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">© 2024 AI Teleradiology. All rights reserved.</p>
          <p style="margin: 10px 0 0 0;">Support: support@ai-teleradiology.com | +1 (555) 123-4567</p>
        </div>
      </div>
    `
  }
}

// Replace template variables
const replaceTemplateVariables = (template, variables) => {
  let result = template
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    result = result.replace(regex, variables[key] || '')
  })
  return result
}

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: `"AI Teleradiology" <${process.env.EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    }
    
    if (options.attachments) {
      mailOptions.attachments = options.attachments
    }
    
    const result = await transporter.sendMail(mailOptions)
    
    console.log('Email sent successfully:', {
      messageId: result.messageId,
      to: options.to,
      subject: options.subject
    })
    
    return {
      success: true,
      messageId: result.messageId
    }
    
  } catch (error) {
    console.error('Email sending failed:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}

// Send templated email
const sendTemplatedEmail = async (templateName, to, variables = {}) => {
  const template = emailTemplates[templateName]
  
  if (!template) {
    throw new Error(`Email template '${templateName}' not found`)
  }
  
  const html = replaceTemplateVariables(template.template, variables)
  const subject = replaceTemplateVariables(template.subject, variables)
  
  return await sendEmail({
    to,
    subject,
    html
  })
}

// Send verification email
const sendVerificationEmail = async (user, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
  
  return await sendTemplatedEmail('verification', user.email, {
    firstName: user.firstName,
    lastName: user.lastName,
    verificationUrl
  })
}

// Send password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
  
  return await sendTemplatedEmail('passwordReset', user.email, {
    firstName: user.firstName,
    lastName: user.lastName,
    resetUrl
  })
}

// Send contact notification email
const sendContactNotificationEmail = async (contactData) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM
  
  return await sendTemplatedEmail('contactNotification', adminEmail, {
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    email: contactData.email,
    phone: contactData.phone || 'Not provided',
    organization: contactData.organization || 'Not provided',
    subject: contactData.subject,
    message: contactData.message,
    priority: contactData.priority,
    servicesInterested: contactData.servicesInterested?.join(', ') || 'Not specified',
    budgetRange: contactData.budgetRange || 'Not specified',
    timeline: contactData.timeline || 'Not specified',
    source: contactData.source || 'Website',
    submittedAt: new Date(contactData.createdAt).toLocaleString()
  })
}

// Send contact confirmation email
const sendContactConfirmationEmail = async (contactData) => {
  const responseTime = contactData.priority === 'urgent' ? '2-4 hours' : 
                      contactData.priority === 'high' ? '4-8 hours' : '24-48 hours'
  
  return await sendTemplatedEmail('contactConfirmation', contactData.email, {
    firstName: contactData.firstName,
    subject: contactData.subject,
    priority: contactData.priority,
    referenceId: contactData._id.toString().slice(-8).toUpperCase(),
    responseTime,
    submittedAt: new Date(contactData.createdAt).toLocaleString(),
    websiteUrl: process.env.FRONTEND_URL
  })
}

// Send welcome email
const sendWelcomeEmail = async (user) => {
  return await sendTemplatedEmail('welcomeEmail', user.email, {
    firstName: user.firstName,
    lastName: user.lastName,
    dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
    profileUrl: `${process.env.FRONTEND_URL}/profile`
  })
}

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log('Email configuration is valid')
    return true
  } catch (error) {
    console.error('Email configuration error:', error)
    return false
  }
}

module.exports = {
  sendEmail,
  sendTemplatedEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendContactNotificationEmail,
  sendContactConfirmationEmail,
  sendWelcomeEmail,
  testEmailConfig,
  emailTemplates
}