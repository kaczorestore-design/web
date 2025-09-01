import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Monitor, Stethoscope, Clock, Shield, Zap, ArrowRight, Moon, Eye, Award, AlertCircle, Users, Workflow, Search } from 'lucide-react'
import ConsultationPopup from '../components/ConsultationPopup'

const ServicesPage = () => {
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false)

  const openConsultationPopup = () => setIsConsultationPopupOpen(true)
  const closeConsultationPopup = () => setIsConsultationPopupOpen(false)

  const services = [
    {
      icon: Brain,
      title: 'AI-Enhanced Radiology',
      description: 'Advanced AI algorithms assist our radiologists in detecting abnormalities with unprecedented accuracy.',
      features: ['Machine Learning Detection', 'Pattern Recognition', 'Automated Measurements', 'Quality Assurance']
    },
    {
      icon: Monitor,
      title: 'PACS Integration',
      description: 'Seamless integration with Picture Archiving and Communication Systems for efficient workflow.',
      features: ['Cloud-based Storage', 'Multi-format Support', 'Real-time Sync', 'Secure Access']
    },
    {
      icon: Stethoscope,
      title: 'Teleradiology Services',
      description: 'Remote radiology interpretations by board-certified radiologists available 24/7.',
      features: ['24/7 Coverage', 'Sub-specialty Expertise', 'Rapid Turnaround', 'Emergency Reads']
    },
    {
      icon: Clock,
      title: 'Urgent Reporting',
      description: 'Critical findings reported within minutes, ensuring timely patient care.',
      features: ['STAT Reads', 'Critical Alerts', 'Direct Communication', 'Mobile Notifications']
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Comprehensive QA programs ensuring the highest standards of radiological interpretation.',
      features: ['Peer Review', 'Continuous Monitoring', 'Performance Metrics', 'Compliance Tracking']
    },
    {
      icon: Zap,
      title: 'Workflow Optimization',
      description: 'Streamlined processes and automation to improve efficiency and reduce costs.',
      features: ['Automated Routing', 'Priority Queuing', 'Load Balancing', 'Analytics Dashboard']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-medical-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive AI-enhanced teleradiology solutions designed to improve 
              patient outcomes and streamline healthcare workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Specialized Services</h2>
            <p className="text-xl text-gray-600">Explore our comprehensive range of teleradiology services</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Moon,
                title: 'Nighttime Coverage',
                description: 'Round-the-clock radiology coverage ensuring continuous patient care during off-hours.',
                link: '/services/nighttime-coverage',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                icon: Eye,
                title: 'Enhanced 3D Reporting',
                description: 'Advanced 3D visualization and reporting for complex anatomical structures.',
                link: '/services/enhanced-3d-reporting',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: Award,
                title: 'Quality Assurance',
                description: 'Comprehensive quality control programs ensuring the highest diagnostic standards.',
                link: '/services/quality-assurance',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: AlertCircle,
                title: 'Emergency Radiology',
                description: 'Rapid emergency imaging interpretation for critical patient care situations.',
                link: '/services/emergency-radiology',
                color: 'from-red-500 to-rose-600'
              },
              {
                icon: Users,
                title: 'Expert Consultation',
                description: 'Access to subspecialty radiologists for complex cases and second opinions.',
                link: '/services/expert-consultation',
                color: 'from-orange-500 to-amber-600'
              },
              {
                icon: Workflow,
                title: 'Intelligent Workflow',
                description: 'AI-powered workflow optimization for enhanced efficiency and productivity.',
                link: '/services/intelligent-workflow',
                color: 'from-cyan-500 to-blue-600'
              },
              {
                icon: Search,
                title: 'Advanced Discovery',
                description: 'Cutting-edge AI discovery tools for enhanced diagnostic insights and research.',
                link: '/services/advanced-discovery',
                color: 'from-emerald-500 to-teal-600'
              }
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors group-hover:translate-x-1 transform duration-300"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Radiology Specialties</h2>
            <p className="text-xl text-gray-600">Expert interpretation across all imaging modalities</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Chest Imaging',
              'Musculoskeletal',
              'Neuroradiology',
              'Abdominal Imaging',
              'Cardiac Imaging',
              'Pediatric Radiology',
              'Emergency Radiology',
              'Mammography',
              'Nuclear Medicine',
              'Interventional',
              'Oncology Imaging',
              'Women\'s Imaging'
            ].map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-sm font-medium text-gray-900">{specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Radiology Workflow?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Contact us today to learn how our AI-enhanced teleradiology services 
              can improve your patient care and operational efficiency.
            </p>
            <button 
              onClick={openConsultationPopup}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Consultation Popup */}
      <ConsultationPopup 
        isOpen={isConsultationPopupOpen} 
        onClose={closeConsultationPopup} 
      />
    </div>
  )
}

export default ServicesPage