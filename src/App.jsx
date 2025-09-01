import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import LoginPage from './pages/auth/LoginPage'
import RadiologistApplicationPage from './pages/RadiologistApplicationPage'
import NighttimeCoverage from './pages/services/NighttimeCoverage'
import Enhanced3DReporting from './pages/services/Enhanced3DReporting'
import QualityAssurance from './pages/services/QualityAssurance'
import EmergencyRadiology from './pages/services/EmergencyRadiology'
import ExpertConsultation from './pages/services/ExpertConsultation'
import IntelligentWorkflow from './pages/services/IntelligentWorkflow'
import AdvancedDiscovery from './pages/services/AdvancedDiscovery'
import Teleradiology from './pages/services/Teleradiology'
import AIReporting from './pages/services/AIReporting'
import PACSIntegration from './pages/services/PACSIntegration'
import Coverage24x7 from './pages/services/Coverage24x7'
import AdminDashboard from './pages/admin/AdminDashboard'
import RadiologistPortal from './pages/portals/RadiologistPortal'
import SalesPortal from './pages/portals/SalesPortal'
import DiagnosticCentrePortal from './pages/portals/DiagnosticCentrePortal'
import PatientPortal from './pages/portals/PatientPortal'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsOfService from './pages/legal/TermsOfService'
import HIPAACompliance from './pages/legal/HIPAACompliance'
import DataSecurity from './pages/legal/DataSecurity'
import Accessibility from './pages/legal/Accessibility'
import CookiePolicy from './pages/legal/CookiePolicy'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/radiologist-application" element={<RadiologistApplicationPage />} />
            
            {/* Service Pages */}
            <Route path="/services/nighttime-coverage" element={<NighttimeCoverage />} />
            <Route path="/services/enhanced-3d-reporting" element={<Enhanced3DReporting />} />
            <Route path="/services/quality-assurance" element={<QualityAssurance />} />
            <Route path="/services/emergency-radiology" element={<EmergencyRadiology />} />
            <Route path="/services/expert-consultation" element={<ExpertConsultation />} />
            <Route path="/services/intelligent-workflow" element={<IntelligentWorkflow />} />
            <Route path="/services/advanced-discovery" element={<AdvancedDiscovery />} />
            <Route path="/services/teleradiology" element={<Teleradiology />} />
            <Route path="/services/ai-reporting" element={<AIReporting />} />
            <Route path="/services/pacs" element={<PACSIntegration />} />
            <Route path="/services/coverage" element={<Coverage24x7 />} />
            <Route path="/services/qa" element={<QualityAssurance />} />
            
            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/hipaa-compliance" element={<HIPAACompliance />} />
            <Route path="/data-security" element={<DataSecurity />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* Protected Portal Routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/radiologist/*" element={<RadiologistPortal />} />
            <Route path="/sales/*" element={<SalesPortal />} />
            <Route path="/diagnostic-centre/*" element={<DiagnosticCentrePortal />} />
            <Route path="/patient/*" element={<PatientPortal />} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
