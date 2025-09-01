import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Eye, 
  Microscope, 
  Database, 
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Shield
} from 'lucide-react'

const AdvancedDiscovery = () => {
  const features = [
    {
      title: 'AI-Enhanced Detection',
      description: 'Advanced algorithms identify subtle findings that might be missed',
      icon: Eye
    },
    {
      title: 'Pattern Recognition',
      description: 'Machine learning identifies complex patterns and correlations',
      icon: Search
    },
    {
      title: 'Quantitative Analysis',
      description: 'Precise measurements and quantitative assessments of findings',
      icon: Microscope
    },
    {
      title: 'Research Integration',
      description: 'Access to latest research and clinical trial opportunities',
      icon: Database
    }
  ]

  const discoveryAreas = [
    {
      area: 'Oncology Imaging',
      description: 'Early detection of malignancies and treatment response monitoring',
      technologies: ['AI tumor detection', 'Radiomics analysis', 'Treatment planning'],
      accuracy: '98.5%'
    },
    {
      area: 'Cardiovascular Analysis',
      description: 'Advanced cardiac imaging with risk stratification',
      technologies: ['Coronary analysis', 'Functional assessment', 'Risk prediction'],
      accuracy: '97.2%'
    },
    {
      area: 'Neurological Assessment',
      description: 'Comprehensive brain imaging with cognitive correlation',
      technologies: ['Brain volumetrics', 'Connectivity analysis', 'Biomarker detection'],
      accuracy: '96.8%'
    },
    {
      area: 'Musculoskeletal Evaluation',
      description: 'Detailed analysis of bone, joint, and soft tissue pathology',
      technologies: ['Bone density analysis', 'Joint assessment', 'Sports medicine'],
      accuracy: '95.9%'
    }
  ]

  const technologies = [
    {
      name: 'Deep Learning Networks',
      description: 'Convolutional neural networks trained on millions of medical images',
      application: 'Pattern recognition and anomaly detection'
    },
    {
      name: 'Radiomics Platform',
      description: 'Extraction of quantitative features from medical imaging',
      application: 'Biomarker discovery and treatment prediction'
    },
    {
      name: 'Computer Vision',
      description: 'Advanced image processing and feature extraction algorithms',
      application: 'Automated measurement and assessment'
    },
    {
      name: 'Natural Language Processing',
      description: 'AI-powered analysis of clinical reports and literature',
      application: 'Knowledge extraction and correlation'
    }
  ]

  const benefits = [
    'Earlier detection of pathological conditions',
    'Improved diagnostic accuracy and confidence',
    'Quantitative biomarkers for treatment monitoring',
    'Access to cutting-edge research and trials',
    'Personalized medicine insights',
    'Enhanced clinical decision support'
  ]

  const stats = [
    {
      number: '15%',
      label: 'Earlier Detection',
      description: 'Average improvement in early diagnosis'
    },
    {
      number: '97.1%',
      label: 'AI Accuracy',
      description: 'Overall diagnostic accuracy improvement'
    },
    {
      number: '500K+',
      label: 'Cases Analyzed',
      description: 'Advanced discovery cases processed'
    },
    {
      number: '24/7',
      label: 'AI Processing',
      description: 'Continuous advanced analysis availability'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-white overflow-hidden">
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
                  className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Advanced Discovery</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Advanced Discovery
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> & Research </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Unlock hidden insights with AI-powered advanced discovery services. 
                  Early detection, quantitative analysis, and research-grade imaging for better patient outcomes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-primary text-lg px-8 py-4 rounded-xl"
                >
                  <span>Explore Discovery</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-secondary text-lg px-8 py-4 rounded-xl"
                >
                  <Database className="w-5 h-5" />
                  <span>Research Portal</span>
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
                src="/images/advanced-discovery.svg"
                alt="Advanced discovery"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">15% Earlier</div>
                    <div className="text-sm text-gray-600">Detection Rate</div>
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
              Discovery Performance Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable improvements in detection rates and diagnostic accuracy through advanced AI
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
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Areas Section */}
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
              Discovery Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI-powered discovery across multiple medical imaging specialties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {discoveryAreas.map((area, index) => (
              <motion.div
                key={area.area}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">{area.area}</h3>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium ml-4">
                    {area.accuracy}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
              Advanced Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge AI and machine learning technologies powering our discovery platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tech.name}</h3>
                <p className="text-gray-600 mb-4">{tech.description}</p>
                <div className="border-t pt-4">
                  <span className="text-sm font-medium text-emerald-600">Application: </span>
                  <span className="text-sm text-gray-700">{tech.application}</span>
                </div>
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
              Discovery Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive advanced discovery capabilities for enhanced diagnostic insights
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
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
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
                  Discovery Benefits
                </h2>
                <p className="text-xl text-gray-600">
                  Transform patient care with advanced discovery capabilities that reveal hidden insights and enable precision medicine.
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
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 font-semibold text-sm">✓</span>
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
                  <span>Start Discovery</span>
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
                src="/images/advanced-discovery.svg"
                alt="Discovery benefits"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-emerald-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock Advanced Discovery
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Experience the future of medical imaging with AI-powered advanced discovery and research capabilities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Start Discovery</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                <Database className="w-5 h-5" />
                <span>Research Portal</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AdvancedDiscovery