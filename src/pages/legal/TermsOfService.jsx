import { motion } from 'framer-motion'
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react'

const TermsOfService = () => {
  const lastUpdated = 'January 15, 2024'

  const sections = [
    {
      title: 'Service Description',
      icon: FileText,
      content: [
        'AI-enhanced teleradiology interpretation services',
        '24/7 radiologist coverage and consultation',
        'PACS integration and workflow management',
        'Quality assurance and peer review services',
        'Emergency radiology support'
      ]
    },
    {
      title: 'User Responsibilities',
      icon: CheckCircle,
      content: [
        'Provide accurate and complete information',
        'Maintain confidentiality of login credentials',
        'Use services in compliance with applicable laws',
        'Report any security incidents immediately',
        'Ensure proper medical licensing and credentials'
      ]
    },
    {
      title: 'Limitations & Disclaimers',
      icon: AlertTriangle,
      content: [
        'Services are for professional medical use only',
        'Final diagnostic responsibility remains with attending physician',
        'Emergency cases require immediate local consultation',
        'Technology limitations may affect service availability',
        'Interpretations are professional opinions, not guarantees'
      ]
    },
    {
      title: 'Legal Compliance',
      icon: Scale,
      content: [
        'HIPAA compliance for all medical data handling',
        'State medical licensing requirements adherence',
        'FDA regulations for medical device software',
        'International data transfer regulations',
        'Professional liability and malpractice coverage'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-medical-600 to-primary-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our teleradiology services.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using AI Teleradiology services, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using or accessing our services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              These terms apply to all users of the service, including healthcare professionals, medical facilities, 
              and administrative personnel who access our platform.
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
                    <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-medical-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mt-8"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Important Medical Disclaimer</h3>
                <p className="text-yellow-700 leading-relaxed">
                  Our teleradiology services provide professional radiological interpretations to assist healthcare 
                  providers in patient care. These interpretations are professional opinions and should be considered 
                  in conjunction with clinical findings and other diagnostic information. The final diagnostic and 
                  treatment decisions remain the responsibility of the attending physician.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gray-100 rounded-xl p-8 mt-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact our legal team:
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> legal@aiteleradiology.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Medical Center Dr, Healthcare City, HC 12345</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfService