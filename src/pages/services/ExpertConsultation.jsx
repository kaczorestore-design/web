import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, 
  MessageCircle, 
  Video, 
  BookOpen, 
  ArrowRight,
  Award,
  Clock,
  Brain
} from 'lucide-react'

const ExpertConsultation = () => {
  const features = [
    {
      title: 'Subspecialty Experts',
      description: 'Access to board-certified subspecialty radiologists for complex cases',
      icon: Award
    },
    {
      title: 'Real-time Consultation',
      description: 'Live video consultations and case discussions with expert radiologists',
      icon: Video
    },
    {
      title: 'Second Opinions',
      description: 'Expert second opinions for challenging or uncertain diagnoses',
      icon: MessageCircle
    },
    {
      title: 'Educational Support',
      description: 'Teaching and mentoring for radiology residents and fellows',
      icon: BookOpen
    }
  ]

  const subspecialties = [
    {
      specialty: 'Neuroradiology',
      description: 'Brain, spine, and head/neck imaging expertise',
      experts: '15+ Experts',
      icon: Brain
    },
    {
      specialty: 'Musculoskeletal',
      description: 'Orthopedic and sports medicine imaging',
      experts: '12+ Experts',
      icon: Users
    },
    {
      specialty: 'Cardiovascular',
      description: 'Cardiac and vascular imaging specialists',
      experts: '10+ Experts',
      icon: Users
    },
    {
      specialty: 'Abdominal',
      description: 'GI, GU, and abdominal imaging expertise',
      experts: '18+ Experts',
      icon: Users
    },
    {
      specialty: 'Thoracic',
      description: 'Chest and pulmonary imaging specialists',
      experts: '8+ Experts',
      icon: Users
    },
    {
      specialty: 'Pediatric',
      description: 'Specialized pediatric imaging expertise',
      experts: '6+ Experts',
      icon: Users
    }
  ]

  const consultationTypes = [
    {
      type: 'Urgent Consultation',
      description: 'Immediate expert consultation for complex emergency cases',
      responseTime: '&lt; 30 minutes',
      availability: '24/7'
    },
    {
      type: 'Routine Second Opinion',
      description: 'Expert review and second opinion for challenging cases',
      responseTime: '&lt; 4 hours',
      availability: 'Business hours'
    },
    {
      type: 'Case Conference',
      description: 'Multidisciplinary case discussions and tumor boards',
      responseTime: 'Scheduled',
      availability: 'As needed'
    },
    {
      type: 'Educational Consultation',
      description: 'Teaching cases and resident/fellow education',
      responseTime: 'Scheduled',
      availability: 'Regular sessions'
    }
  ]

  const benefits = [
    'Access to world-class subspecialty expertise',
    'Improved diagnostic confidence and accuracy',
    'Enhanced patient care and outcomes',
    'Reduced liability and risk management',
    'Continuing education and professional development',
    'Collaborative approach to complex cases'
  ]

  const stats = [
    {
      number: '50+',
      label: 'Expert Radiologists',
      description: 'Subspecialty-trained consultants'
    },
    {
      number: '&lt; 30 min',
      label: 'Response Time',
      description: 'For urgent consultations'
    },
    {
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'Client satisfaction with consultations'
    },
    {
      number: '24/7',
      label: 'Availability',
      description: 'Expert consultation access'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
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
                  className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Users className="w-4 h-4" />
                  <span>Expert Network</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Expert Consultation
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> & Second Opinions </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with subspecialty radiology experts for complex cases, second opinions, 
                  and educational consultations. Access world-class expertise when you need it most.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-primary text-lg px-8 py-4 rounded-xl"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-secondary text-lg px-8 py-4 rounded-xl"
                >
                  <Video className="w-5 h-5" />
                  <span>Schedule Video Call</span>
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
                src="/images/expert-consultation.svg"
                alt="Expert consultation"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">50+ Experts</div>
                    <div className="text-sm text-gray-600">Subspecialty Trained</div>
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
              Expert Consultation Network
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access to the largest network of subspecialty radiology experts for complex case consultation
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
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subspecialties Section */}
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
              Subspecialty Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our network includes leading experts across all radiology subspecialties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subspecialties.map((specialty, index) => {
              const Icon = specialty.icon
              return (
                <motion.div
                  key={specialty.specialty}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{specialty.specialty}</h3>
                      <span className="text-blue-600 text-sm font-medium">{specialty.experts}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{specialty.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Consultation Types Section */}
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
              Consultation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible consultation options to meet your specific needs and timeline
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultationTypes.map((consultation, index) => (
              <motion.div
                key={consultation.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{consultation.type}</h3>
                  <div className="text-right">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-1">
                      {consultation.responseTime}
                    </div>
                    <div className="text-gray-500 text-sm">{consultation.availability}</div>
                  </div>
                </div>
                <p className="text-gray-600">{consultation.description}</p>
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
              Consultation Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive consultation services designed to enhance your diagnostic capabilities
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
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
                  Benefits of Expert Consultation
                </h2>
                <p className="text-xl text-gray-600">
                  Enhance your diagnostic capabilities and patient care with access to subspecialty expertise.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-semibold text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 btn-primary px-8 py-4 rounded-xl"
                >
                  <span>Request Consultation</span>
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
                src="/images/expert-consultation.svg"
                alt="Expert consultation benefits"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect with Expert Radiologists
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get access to subspecialty expertise for complex cases, second opinions, and educational consultations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Video className="w-5 h-5" />
                <span>Schedule Video Call</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ExpertConsultation