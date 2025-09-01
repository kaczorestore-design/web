import { motion } from 'framer-motion'
import { Clock, Users, Globe, Shield, Zap, Phone, CheckCircle, ArrowRight, Calendar, AlertTriangle } from 'lucide-react'

const Coverage24x7 = () => {
  const features = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock radiology coverage with no gaps in service, 365 days a year.'
    },
    {
      icon: Users,
      title: 'Expert Radiologists',
      description: 'Board-certified radiologists with subspecialty expertise available at all hours.'
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: 'Emergency cases prioritized with stat reads delivered within 30 minutes.'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'International team of radiologists ensuring continuous coverage across time zones.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Consistent quality standards maintained across all shifts and coverage periods.'
    },
    {
      icon: Phone,
      title: 'Direct Communication',
      description: 'Immediate consultation available with radiologists for urgent cases and clarifications.'
    }
  ]

  const coverageTypes = [
    {
      title: 'Emergency Coverage',
      description: 'Immediate interpretation for trauma, stroke, and other emergency cases',
      responseTime: '< 30 minutes',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Nighttime Coverage',
      description: 'Comprehensive radiology services during overnight hours',
      responseTime: '< 2 hours',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Weekend Coverage',
      description: 'Full radiology support during weekends and holidays',
      responseTime: '< 4 hours',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Subspecialty Coverage',
      description: 'Specialized reads for complex cases requiring expert interpretation',
      responseTime: '< 6 hours',
      icon: Users,
      color: 'purple'
    }
  ]

  const benefits = [
    'Eliminate coverage gaps and delays',
    'Reduce patient length of stay',
    'Improve emergency department efficiency',
    'Access to subspecialty expertise 24/7',
    'Consistent turnaround times',
    'Enhanced patient satisfaction scores'
  ]

  const stats = [
    {
      number: '< 30min',
      label: 'Emergency Response Time',
      description: 'Critical cases prioritized'
    },
    {
      number: '99.9%',
      label: 'Service Uptime',
      description: 'Reliable coverage guarantee'
    },
    {
      number: '24/7',
      label: 'Continuous Coverage',
      description: 'No gaps in service'
    },
    {
      number: '150+',
      label: 'Expert Radiologists',
      description: 'Global network of specialists'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    }
    return colorMap[color] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Clock className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">24/7 Coverage</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive radiology coverage that never sleeps. Our global network of 
              expert radiologists ensures your patients receive timely, accurate interpretations 
              around the clock.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-50 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coverage Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible coverage solutions tailored to your facility's specific needs and patient volumes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coverageTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`rounded-lg p-3 w-fit mb-4 ${getColorClasses(type.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{type.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Response Time:</span>
                    <span className="text-sm font-semibold text-blue-600">{type.responseTime}</span>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our 24/7 Coverage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the peace of mind that comes with reliable, expert radiology coverage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Clinical Benefits</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our 24/7 coverage solution delivers measurable improvements in patient care, 
                operational efficiency, and clinical outcomes.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Coverage Guarantee</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">No Coverage Gaps</h4>
                    <p className="text-sm text-gray-600">Seamless transitions between shifts with overlap periods</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Guaranteed Response Times</h4>
                    <p className="text-sm text-gray-600">SLA-backed turnaround times for all study types</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Subspecialty Expertise</h4>
                    <p className="text-sm text-gray-600">Access to fellowship-trained specialists 24/7</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Never Miss a Critical Case Again
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your 24/7 coverage today and ensure your patients receive 
              the timely care they deserve, around the clock.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2">
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Coverage24x7