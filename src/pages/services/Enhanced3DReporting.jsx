import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Eye, 
  Layers, 
  CheckCircle, 
  ArrowRight,
  Monitor,
  Zap,
  Award
} from 'lucide-react'

const Enhanced3DReporting = () => {
  const features = [
    {
      title: 'Advanced 3D Visualization',
      description: 'Multi-planar reconstruction and volume rendering for complex cases',
      icon: Brain
    },
    {
      title: 'Enhanced Accuracy',
      description: 'Improved diagnostic confidence with detailed 3D analysis',
      icon: Eye
    },
    {
      title: 'Multi-Modal Integration',
      description: 'Seamless fusion of CT, MRI, and other imaging modalities',
      icon: Layers
    },
    {
      title: 'Real-Time Processing',
      description: 'Fast 3D reconstruction with minimal delay in reporting',
      icon: Zap
    }
  ]

  const capabilities = [
    'Advanced cardiac imaging with 3D reconstruction',
    'Orthopedic imaging with detailed bone visualization',
    'Vascular imaging with 3D angiography',
    'Neurological imaging with brain mapping',
    'Oncology imaging with tumor volumetrics',
    'Pediatric imaging with age-appropriate protocols'
  ]

  const technologies = [
    {
      name: 'Volume Rendering',
      description: 'High-quality 3D visualization of anatomical structures'
    },
    {
      name: 'Multi-Planar Reconstruction',
      description: 'Detailed cross-sectional analysis in multiple planes'
    },
    {
      name: 'Maximum Intensity Projection',
      description: 'Enhanced visualization of vascular structures'
    },
    {
      name: 'Virtual Endoscopy',
      description: 'Non-invasive exploration of hollow organs'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-50 via-primary-50 to-white overflow-hidden">
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
                  className="inline-flex items-center space-x-2 bg-medical-100 text-medical-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Brain className="w-4 h-4" />
                  <span>Advanced 3D Technology</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Enhanced 3D
                  <span className="text-transparent bg-clip-text medical-gradient"> Reporting </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Advanced 3D visualization and reconstruction services that provide unprecedented detail 
                  and diagnostic confidence for complex medical imaging cases.
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
                  to="/services"
                  className="inline-flex items-center justify-center space-x-2 btn-secondary text-lg px-8 py-4 rounded-xl"
                >
                  <Monitor className="w-5 h-5" />
                  <span>View Demo</span>
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
                src="/src/assets/images/3d-brain-scan.svg"
                alt="3D medical imaging"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-medical-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">FDA Approved</div>
                    <div className="text-sm text-gray-600">3D Technology</div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Advanced 3D Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art 3D reconstruction and visualization technology for enhanced diagnostic accuracy
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
                  <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-medical-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
              Cutting-Edge Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced 3D imaging technologies provide unparalleled visualization capabilities
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
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
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
                  Specialized Capabilities
                </h2>
                <p className="text-xl text-gray-600">
                  Our 3D reporting services cover a wide range of medical specialties with advanced visualization techniques.
                </p>
              </div>

              <div className="space-y-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-medical-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{capability}</span>
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
                src="/src/assets/images/3d-brain-scan.svg"
                alt="3D medical visualization"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-medical-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Future of Medical Imaging
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover how our enhanced 3D reporting can transform your diagnostic capabilities and improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white text-medical-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Request Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-medical-600 transition-colors"
              >
                <Monitor className="w-5 h-5" />
                <span>View All Services</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Enhanced3DReporting