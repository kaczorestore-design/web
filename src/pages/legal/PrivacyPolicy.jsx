import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

const PrivacyPolicy = () => {
  const lastUpdated = 'January 15, 2024'

  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal identification information (name, email, phone number)',
        'Medical facility information and credentials',
        'Usage data and analytics',
        'Device and browser information',
        'Communication records and preferences'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'Provide teleradiology services and support',
        'Process and fulfill service requests',
        'Communicate about services and updates',
        'Improve our platform and user experience',
        'Comply with legal and regulatory requirements'
      ]
    },
    {
      title: 'Data Protection & Security',
      icon: Lock,
      content: [
        'End-to-end encryption for all medical data',
        'HIPAA-compliant data handling procedures',
        'Regular security audits and assessments',
        'Secure cloud infrastructure with redundancy',
        'Access controls and authentication protocols'
      ]
    },
    {
      title: 'Your Rights',
      icon: Shield,
      content: [
        'Access and review your personal information',
        'Request corrections to inaccurate data',
        'Delete your account and associated data',
        'Opt-out of non-essential communications',
        'Request data portability where applicable'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-medical-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your privacy and data security are our top priorities. Learn how we protect and handle your information.
            </p>
            <div className="mt-6 text-primary-200">
              Last updated: {lastUpdated}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              AI Teleradiology is committed to protecting the privacy and security of your personal and medical information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              teleradiology services and platform. We comply with all applicable privacy laws, including HIPAA, and maintain 
              the highest standards of data protection.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-primary-50 rounded-xl p-8 mt-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About This Policy?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> privacy@aiteleradiology.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Medical Center Dr, Healthcare City, HC 12345</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy