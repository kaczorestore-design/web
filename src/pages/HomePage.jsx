import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Clock, 
  Shield, 
  Users,
  Award,
  TrendingUp,
  Globe,
  Zap,
  UserPlus,
  Handshake,
  Stethoscope,
  Brain,
  Activity
} from 'lucide-react'
import ConsultationPopup from '../components/ConsultationPopup'
import PartnerPopup from '../components/PartnerPopup'

const HomePage = () => {
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false)
  const [isPartnerPopupOpen, setIsPartnerPopupOpen] = useState(false)

  const openConsultationPopup = () => setIsConsultationPopupOpen(true)
  const closeConsultationPopup = () => setIsConsultationPopupOpen(false)
  const openPartnerPopup = () => setIsPartnerPopupOpen(true)
  const closePartnerPopup = () => setIsPartnerPopupOpen(false)
  const stats = [
    { number: '99.8%', label: 'Report Accuracy', icon: Award },
    { number: '24/7', label: 'Coverage Available', icon: Clock },
    { number: '500+', label: 'Healthcare Partners', icon: Users },
    { number: '<15min', label: 'Average Report Time', icon: Zap },
  ]

  const services = [
    {
      title: 'Nighttime Radiology Coverage',
      subtitle: 'Daytime Peace of Mind',
      description: 'Rapid access to radiologists with expedited reporting for decisive actions. Uninterrupted expert care, around the clock.',
      icon: Clock,
      features: ['Rapid access to radiologists', 'Expedited reporting', 'Uninterrupted expert care']
    },
    {
      title: 'Enhanced 3D Reporting',
      subtitle: 'Adding Depth to Detail',
      description: 'Precision imaging for informed decisions with in-depth insights and 3D visualization for critical imaging.',
      icon: Brain,
      features: ['Precision imaging', '3D visualization', 'Increased confidence']
    },
    {
      title: 'Quality You Can Count On',
      subtitle: 'Excellence in Every Report',
      description: 'Regular feedback and targeted training with detailed audit reports to minimize errors and improve quality.',
      icon: Shield,
      features: ['Regular feedback', 'Detailed audit reports', 'No hidden costs']
    },
    {
      title: 'Expertise When You Need It',
      subtitle: 'Board Certified Excellence',
      description: 'Board certified radiologists available for immediate consultation during critical examinations.',
      icon: Stethoscope,
      features: ['Board certified radiologists', 'Immediate consultation', 'All imaging modalities']
    },
    {
      title: 'Intelligent Workflow',
      subtitle: 'Inspired Care',
      description: 'Seamless integration with existing systems and AI-assisted analysis for faster, more accurate reports.',
      icon: Activity,
      features: ['Seamless integration', 'AI-assisted analysis', 'Future-proof solutions']
    },
    {
      title: 'Advanced Discovery',
      subtitle: 'Accurate Analysis',
      description: 'Specialized reading services with regulatory compliance support and multi-modality expertise.',
      icon: Globe,
      features: ['Specialized services', 'Regulatory compliance', 'Multi-modality expertise']
    },
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Radiologist, Metro General Hospital',
      content: 'AI Teleradiology has transformed our night coverage. The quality and speed of reports are exceptional.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'IT Director, Regional Medical Center',
      content: 'Seamless integration with our PACS system. The AI-enhanced reporting has improved our workflow significantly.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Emergency Department Director',
      content: 'Critical cases get immediate attention. The 24/7 availability has been a game-changer for our emergency department.',
      rating: 5
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-50 via-primary-50 to-white overflow-hidden">
        {/* Background Banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-medical-500/5 to-primary-400/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90" style={{backgroundImage: 'url(/images/teleradiology-banner.webp)'}}></div>
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
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium drop-shadow-md"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Pioneer in AI-Enhanced Teleradiology</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                  Distance shouldn't dictate the 
                  <span className="text-yellow-300 font-extrabold"> quality of care </span>
                  your patients receive
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-md">
                  Professional teleradiology services with AI-enhanced reporting, 24/7 coverage, 
                  and board-certified radiologists. Delivering accurate, timely results when you need them most.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={openConsultationPopup}
                  className="inline-flex items-center justify-center space-x-2 btn-primary text-lg px-8 py-4 rounded-xl"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center space-x-2 btn-secondary text-lg px-8 py-4 rounded-xl"
                >
                  <span>Explore Services</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-yellow-300" />
                      </div>
                      <div className="text-2xl font-bold text-white drop-shadow-md">{stat.number}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="h-96 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI-Enhanced Teleradiology</h3>
                    <p className="text-white/80">Professional medical imaging solutions</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">HIPAA Compliant</div>
                      <div className="text-sm text-gray-600">Secure & Certified</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-medical-100 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              Comprehensive Teleradiology Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional radiology services designed to enhance patient care and streamline your workflow
            </p>
          </motion.div>

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
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-primary-600 font-medium">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="section-padding relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Image with Transparency */}
        <div className="absolute inset-0 opacity-70" style={{
          backgroundImage: `url('/images/Network.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
        {/* Background Network Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent transform -skew-y-12"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-teal-300 rounded-full animate-pulse delay-1500"></div>
            <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-2000"></div>
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="white" opacity="0.3"/>
                  <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" opacity="0.2"/>
                  <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(/images/Network.png)"/>
            </svg>
          </div>
        </div>
        
        {/* Globe Icon Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <Globe className="w-96 h-96 text-white" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-2xl">
              Join Our Growing Network
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 drop-shadow-lg">
              Be part of our mission to deliver exceptional teleradiology services worldwide
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/radiologist-application"
                  className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-cyan-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl border border-cyan-300/30"
                >
                  <UserPlus className="w-6 h-6" />
                  <span>Join as Radiologist</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={openPartnerPopup}
                  className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl border border-emerald-400/30"
                >
                  <Handshake className="w-6 h-6" />
                  <span>Join as Partner</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Read the success stories of our satisfied healthcare partners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding medical-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Radiology Services?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of healthcare facilities that trust us with their radiology needs. 
              Get started today with a free consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={openConsultationPopup}
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 font-medium px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/services"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white font-medium px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Consultation Popup */}
      <ConsultationPopup 
        isOpen={isConsultationPopupOpen} 
        onClose={closeConsultationPopup} 
      />
      <PartnerPopup 
        isOpen={isPartnerPopupOpen} 
        onClose={closePartnerPopup} 
      />
    </div>
  )
}

export default HomePage