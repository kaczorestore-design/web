import { motion } from 'framer-motion'
import { Shield, Lock, FileCheck, Users, AlertCircle, CheckCircle } from 'lucide-react'

const HIPAACompliance = () => {
  const complianceFeatures = [
    {
      title: 'Data Encryption',
      icon: Lock,
      description: 'End-to-end encryption for all PHI transmission and storage',
      details: [
        'AES-256 encryption for data at rest',
        'TLS 1.3 for data in transit',
        'Encrypted database storage',
        'Secure key management system'
      ]
    },
    {
      title: 'Access Controls',
      icon: Users,
      description: 'Strict user authentication and authorization protocols',
      details: [
        'Multi-factor authentication required',
        'Role-based access permissions',
        'Regular access reviews and audits',
        'Automatic session timeouts'
      ]
    },
    {
      title: 'Audit Logging',
      icon: FileCheck,
      description: 'Comprehensive tracking of all PHI access and modifications',
      details: [
        'Complete audit trail maintenance',
        'Real-time monitoring and alerts',
        'Tamper-proof log storage',
        'Regular audit log reviews'
      ]
    },
    {
      title: 'Risk Assessment',
      icon: AlertCircle,
      description: 'Ongoing security risk evaluation and mitigation',
      details: [
        'Annual security risk assessments',
        'Vulnerability scanning and testing',
        'Incident response procedures',
        'Business continuity planning'
      ]
    }
  ]

  const safeguards = [
    {
      category: 'Administrative Safeguards',
      items: [
        'Designated HIPAA Security Officer',
        'Workforce training and awareness programs',
        'Information access management procedures',
        'Security incident response protocols',
        'Business Associate Agreements (BAAs)'
      ]
    },
    {
      category: 'Physical Safeguards',
      items: [
        'Secure data center facilities',
        'Controlled facility access procedures',
        'Workstation security controls',
        'Device and media disposal protocols',
        'Environmental protection measures'
      ]
    },
    {
      category: 'Technical Safeguards',
      items: [
        'Unique user identification systems',
        'Automatic logoff mechanisms',
        'Data integrity verification',
        'Transmission security protocols',
        'Audit controls and monitoring'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">HIPAA Compliance</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Protecting patient health information with the highest standards of security and privacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Compliance Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our HIPAA Commitment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI Teleradiology is fully committed to HIPAA compliance, implementing comprehensive 
              safeguards to protect patient health information throughout our platform.
            </p>
          </motion.div>

          {/* Compliance Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {complianceFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HIPAA Safeguards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              HIPAA Security Safeguards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We implement all required HIPAA safeguards to ensure comprehensive protection of PHI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {safeguards.map((safeguard, index) => (
              <motion.div
                key={safeguard.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">{safeguard.category}</h3>
                <ul className="space-y-3">
                  {safeguard.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="section-padding bg-green-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Certified & Audited</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our HIPAA compliance is regularly audited by third-party security firms and we maintain 
                current certifications to ensure ongoing compliance with all regulations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-2">Annual Audits</h4>
                  <p className="text-sm text-gray-600">Comprehensive third-party security assessments</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-2">SOC 2 Type II</h4>
                  <p className="text-sm text-gray-600">Certified for security and availability controls</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-2">Penetration Testing</h4>
                  <p className="text-sm text-gray-600">Regular security vulnerability assessments</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Questions or Concerns?</h3>
            <p className="text-gray-600 mb-6">
              Contact our HIPAA Security Officer for any compliance-related questions or to report security incidents.
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>HIPAA Security Officer:</strong> security@aiteleradiology.com</p>
              <p><strong>Security Hotline:</strong> +1 (555) 123-HIPAA</p>
              <p><strong>Incident Reporting:</strong> incidents@aiteleradiology.com</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HIPAACompliance