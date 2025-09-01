import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Users, Award, Heart, Search } from 'lucide-react'
import { useState } from 'react'

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const jobListings = [
    {
      id: 1,
      title: 'Senior Radiologist',
      department: 'Medical',
      location: 'Remote',
      type: 'Full-time',
      salary: '$250,000 - $350,000',
      description: 'Board-certified radiologist with subspecialty expertise in chest imaging.',
      requirements: ['MD with Radiology residency', 'Board certification', '5+ years experience'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      department: 'Technology',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      description: 'Develop and optimize AI algorithms for medical image analysis.',
      requirements: ['MS/PhD in CS or related field', 'Python, TensorFlow/PyTorch', 'Medical imaging experience'],
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Clinical Operations Manager',
      department: 'Operations',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      description: 'Oversee daily clinical operations and quality assurance programs.',
      requirements: ['Healthcare management experience', 'Strong leadership skills', 'Quality improvement knowledge'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'Sales Representative',
      department: 'Sales',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$70,000 - $100,000 + Commission',
      description: 'Drive business growth by building relationships with healthcare providers.',
      requirements: ['Healthcare sales experience', 'Strong communication skills', 'Travel availability'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $140,000',
      description: 'Maintain and scale our cloud infrastructure and deployment pipelines.',
      requirements: ['AWS/Azure experience', 'Docker/Kubernetes', 'CI/CD pipelines'],
      posted: '1 week ago'
    },
    {
      id: 6,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$80,000 - $110,000',
      description: 'Ensure client satisfaction and drive adoption of our teleradiology platform.',
      requirements: ['Customer success experience', 'Healthcare industry knowledge', 'Project management skills'],
      posted: '4 days ago'
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive medical, dental, and vision insurance'
    },
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries with performance bonuses'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and remote work opportunities'
    },
    {
      icon: Award,
      title: 'Professional Growth',
      description: 'Continuing education and conference attendance support'
    },
    {
      icon: Users,
      title: 'Team Culture',
      description: 'Collaborative environment with brilliant colleagues'
    }
  ]

  const departments = ['all', 'Medical', 'Technology', 'Operations', 'Sales', 'Customer Success']
  const locations = ['all', 'Remote', 'San Francisco, CA', 'New York, NY', 'Chicago, IL', 'Austin, TX']

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation
    
    return matchesSearch && matchesDepartment && matchesLocation
  })

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
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Help us revolutionize healthcare through AI-enhanced teleradiology. 
              Build your career while making a meaningful impact on patient care worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                View Open Positions
              </button>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-300">
                Learn About Our Culture
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600">We offer more than just a job – we offer a career with purpose</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Job Search & Filters */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Open Positions</h2>
            
            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
                
                <button className="btn-primary">
                  Search Jobs
                </button>
              </div>
            </div>
          </motion.div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="btn-primary w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            </div>
          )}
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
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. 
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Submit General Application
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CareersPage