import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  AlertTriangle, 
  Heart, 
  Brain, 
  ArrowRight,
  Phone,
  Shield,
  Zap
} from 'lucide-react'

const EmergencyRadiology = () => {
  const features = [
    {
      title: 'Immediate Response',
      description: 'Critical findings reported within 15 minutes of image acquisition',
      icon: Clock
    },
    {
      title: 'Trauma Expertise',
      description: 'Specialized trauma radiologists available for complex emergency cases',
      icon: AlertTriangle
    },
    {
      title: 'Stroke Protocol',
      description: 'Rapid stroke imaging interpretation for time-critical interventions',
      icon: Brain
    },
    {
      title: 'Cardiac Emergency',
      description: 'Emergency cardiac imaging with immediate consultation available',
      icon: Heart
    }
  ]

  const emergencyTypes = [
    {
      type: 'Trauma Cases',
      description: 'Multi-trauma, head injuries, spinal trauma, and complex fractures',
      responseTime: '&lt; 15 minutes',
      icon: AlertTriangle
    },
    {
      type: 'Stroke Imaging',
      description: 'CT/CTA stroke protocols, perfusion studies, and hemorrhage detection',
      responseTime: '&lt; 10 minutes',
      icon: Brain
    },
    {
      type: 'Cardiac Emergency',
      description: 'Acute coronary syndromes, aortic dissection, and pulmonary embolism',
      responseTime: '&lt; 15 minutes',
      icon: Heart
    },
    {
      type: 'Critical Findings',
      description: 'Life-threatening conditions requiring immediate clinical attention',
      responseTime: '&lt; 5 minutes',
      icon: Zap
    }
  ]

  const protocols = [
    'Immediate triage of emergency cases upon receipt',
    'Direct phone communication for critical findings',
    'Subspecialty consultation for complex cases',
    'Real-time collaboration with emergency physicians',
    'Comprehensive preliminary and final reports',
    'Quality assurance and peer review for all emergency cases'
  ]

  const stats = [
    {
      number: '&lt; 15 min',
      label: 'Average Response Time',
      description: 'For critical emergency cases'
    },
    {
      number: '24/7/365',
      label: 'Availability',
      description: 'Round-the-clock emergency coverage'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable emergency service availability'
    },
    {
      number: '100%',
      label: 'Board Certified',
      description: 'Emergency radiology specialists'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-orange-50 to-white overflow-hidden">
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
                  className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Emergency Response</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Emergency Radiology
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600"> When Every Second Counts </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Rapid, accurate emergency radiology services with immediate reporting 
                  for critical cases. Available 24/7 with subspecialty expertise.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-primary text-lg px-8 py-4 rounded-xl"
                >
                  <span>Emergency Setup</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Emergency Hotline</span>
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
                src="/images/emergency-radiology.svg"
                alt="Emergency radiology"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">&lt; 15 min</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              Emergency Response Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our emergency radiology service delivers rapid, accurate interpretations when time is critical
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Types Section */}
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
              Emergency Case Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized emergency radiology coverage for all critical imaging needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {emergencyTypes.map((emergency, index) => {
              const Icon = emergency.icon
              return (
                <motion.div
                  key={emergency.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{emergency.type}</h3>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          {emergency.responseTime}
                        </span>
                      </div>
                      <p className="text-gray-600">{emergency.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Emergency Service Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive emergency radiology capabilities designed for critical care environments
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
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section className="section-padding bg-gray-50">
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
                  Emergency Protocol
                </h2>
                <p className="text-xl text-gray-600">
                  Our streamlined emergency protocol ensures rapid response and accurate interpretation for critical cases.
                </p>
              </div>

              <div className="space-y-4">
                {protocols.map((protocol, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{protocol}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 btn-primary px-8 py-4 rounded-xl"
                >
                  <span>Setup Emergency Service</span>
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
                src="/images/emergency-radiology.svg"
                alt="Emergency radiology workflow"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-red-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Emergency Coverage?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get immediate access to emergency radiology services with rapid response times and expert interpretation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Setup Emergency Service</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Emergency Hotline</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default EmergencyRadiology