import { motion } from 'framer-motion'
import { Shield, Lock, Server, Eye, AlertTriangle, CheckCircle, Globe, Database } from 'lucide-react'

const DataSecurity = () => {
  const securityMeasures = [
    {
      title: 'Infrastructure Security',
      icon: Server,
      description: 'Enterprise-grade cloud infrastructure with multiple layers of protection',
      features: [
        'AWS/Azure enterprise cloud hosting',
        'Multi-region data replication',
        'DDoS protection and mitigation',
        'Network segmentation and firewalls',
        'Intrusion detection systems'
      ]
    },
    {
      title: 'Data Encryption',
      icon: Lock,
      description: 'Military-grade encryption for all data at rest and in transit',
      features: [
        'AES-256 encryption for stored data',
        'TLS 1.3 for data transmission',
        'End-to-end encryption protocols',
        'Hardware security modules (HSM)',
        'Encrypted backup systems'
      ]
    },
    {
      title: 'Access Management',
      icon: Eye,
      description: 'Comprehensive identity and access management controls',
      features: [
        'Multi-factor authentication (MFA)',
        'Single sign-on (SSO) integration',
        'Role-based access control (RBAC)',
        'Privileged access management',
        'Regular access reviews and audits'
      ]
    },
    {
      title: 'Data Protection',
      icon: Database,
      description: 'Advanced data loss prevention and backup strategies',
      features: [
        'Automated daily backups',
        'Point-in-time recovery capabilities',
        'Data loss prevention (DLP) tools',
        'Secure data disposal procedures',
        'Geographic data residency controls'
      ]
    }
  ]

  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality controls',
      icon: CheckCircle
    },
    {
      name: 'ISO 27001',
      description: 'Information security management systems',
      icon: Shield
    },
    {
      name: 'HIPAA Compliant',
      description: 'Healthcare data protection standards',
      icon: Lock
    },
    {
      name: 'GDPR Compliant',
      description: 'European data protection regulations',
      icon: Globe
    }
  ]

  const threatProtection = [
    {
      threat: 'Malware & Ransomware',
      protection: 'Advanced endpoint detection and response (EDR) systems',
      status: 'Protected'
    },
    {
      threat: 'Phishing Attacks',
      protection: 'Email security gateways and user training programs',
      status: 'Protected'
    },
    {
      threat: 'Data Breaches',
      protection: 'Zero-trust architecture and continuous monitoring',
      status: 'Protected'
    },
    {
      threat: 'Insider Threats',
      protection: 'User behavior analytics and access controls',
      status: 'Protected'
    },
    {
      threat: 'DDoS Attacks',
      protection: 'Cloud-based DDoS mitigation and traffic filtering',
      status: 'Protected'
    },
    {
      threat: 'API Vulnerabilities',
      protection: 'API security gateways and regular penetration testing',
      status: 'Protected'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Security</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Enterprise-grade security measures protecting your medical data with the highest standards of cybersecurity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multi-Layered Security Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive security framework protects against evolving cyber threats while ensuring 
              seamless access to critical medical imaging data.
            </p>
          </motion.div>

          {/* Security Measures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {securityMeasures.map((measure, index) => {
              const Icon = measure.icon
              return (
                <motion.div
                  key={measure.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{measure.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{measure.description}</p>
                  <ul className="space-y-2">
                    {measure.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Threat Protection */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Threat Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proactive defense against sophisticated cyber threats targeting healthcare organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threatProtection.map((item, index) => (
              <motion.div
                key={item.threat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{item.threat}</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.protection}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Certifications</h2>
            <p className="text-lg text-gray-600">
              Independently verified security standards and compliance certifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-md"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security Incident Response */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Incident Response</h3>
              <p className="text-gray-600 mb-6">
                Our 24/7 security operations center monitors for threats and responds immediately to any security incidents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Monitoring</h4>
                <p className="text-sm text-gray-600">Continuous threat detection and analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Rapid Response</h4>
                <p className="text-sm text-gray-600">Immediate incident containment and mitigation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Recovery</h4>
                <p className="text-sm text-gray-600">Complete system restoration and forensic analysis</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Security Hotline:</strong> +1 (555) 123-SECURITY | 
                <strong>Email:</strong> security@aiteleradiology.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default DataSecurity