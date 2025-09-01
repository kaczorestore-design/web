import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  CheckCircle, 
  BarChart3, 
  Users, 
  ArrowRight,
  FileText,
  Award,
  Target
} from 'lucide-react'

const QualityAssurance = () => {
  const features = [
    {
      title: 'Double-Read Protocol',
      description: 'All critical cases reviewed by two board-certified radiologists',
      icon: Users
    },
    {
      title: 'Continuous Monitoring',
      description: 'Real-time quality metrics and performance tracking',
      icon: BarChart3
    },
    {
      title: 'Audit Reports',
      description: 'Detailed quality audit reports with actionable insights',
      icon: FileText
    },
    {
      title: 'Peer Review',
      description: 'Regular peer review sessions for continuous improvement',
      icon: Target
    }
  ]

  const qualityMetrics = [
    {
      metric: '99.8%',
      label: 'Report Accuracy',
      description: 'Consistently high accuracy rates across all imaging modalities'
    },
    {
      metric: '<0.1%',
      label: 'Critical Miss Rate',
      description: 'Industry-leading low rate of missed critical findings'
    },
    {
      metric: '100%',
      label: 'Board Certification',
      description: 'All radiologists are board-certified with subspecialty training'
    },
    {
      metric: '24/7',
      label: 'Quality Monitoring',
      description: 'Continuous quality assurance and performance monitoring'
    }
  ]

  const processes = [
    'Initial radiologist interpretation and reporting',
    'Automated quality checks and flagging system',
    'Peer review for complex or critical cases',
    'Quality metrics tracking and analysis',
    'Regular feedback and training sessions',
    'Continuous improvement implementation'
  ]

  const certifications = [
    {
      name: 'ACR Accreditation',
      description: 'American College of Radiology accredited facility'
    },
    {
      name: 'HIPAA Compliance',
      description: 'Full compliance with healthcare privacy regulations'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system certification'
    },
    {
      name: 'Joint Commission',
      description: 'Healthcare quality and safety standards compliance'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-success-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom section-padding relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center space-x-2 bg-success-100 text-success-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Shield className="w-4 h-4" />
                  <span>Excellence in Quality</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Quality You Can
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-success-600 to-primary-600"> Count On </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Comprehensive quality assurance programs ensuring the highest standards 
                  in teleradiology reporting with continuous monitoring and improvement.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-primary text-lg px-8 py-4 rounded-xl"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center space-x-2 btn-secondary text-lg px-8 py-4 rounded-xl"
                >
                  <Award className="w-5 h-5" />
                  <span>View Certifications</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/images/quality-assurance.svg"
                alt="Quality assurance in radiology"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-success-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">ACR Accredited</div>
                    <div className="text-sm text-gray-600">Quality Certified</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Metrics Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quality Metrics That Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in our industry-leading quality metrics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{metric.metric}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{metric.label}</h3>
                <p className="text-gray-600 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quality Assurance Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive quality control measures ensuring consistent, accurate reporting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Quality Process
                </h2>
                <p className="text-xl text-gray-600">
                  A systematic approach to quality assurance that ensures every report meets our high standards.
                </p>
              </div>

              <div className="space-y-4">
                {processes.map((process, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-success-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{process}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 btn-primary px-8 py-4 rounded-xl"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/quality-assurance.svg"
                alt="Quality assurance process"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is validated by industry-leading certifications and compliance standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{cert.name}</h3>
                </div>
                <p className="text-gray-600">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-success-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience Uncompromising Quality
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join healthcare facilities worldwide who trust our quality assurance programs for critical patient care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white text-success-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-success-600 transition-colors"
              >
                <Award className="w-5 h-5" />
                <span>View Certifications</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default QualityAssurance