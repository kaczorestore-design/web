import { motion } from 'framer-motion'
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Medical Imaging: Trends and Predictions for 2024',
      excerpt: 'Explore the latest developments in artificial intelligence and machine learning that are transforming radiology and medical imaging.',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      category: 'AI & Technology',
      readTime: '8 min read',
      image: '/src/assets/images/hero-medical.svg',
      tags: ['AI', 'Machine Learning', 'Medical Imaging', 'Future Tech']
    },
    {
      id: 2,
      title: 'HIPAA Compliance in Teleradiology: Best Practices and Guidelines',
      excerpt: 'A comprehensive guide to maintaining HIPAA compliance while implementing teleradiology solutions in your healthcare facility.',
      author: 'Michael Chen',
      date: '2024-01-12',
      category: 'Compliance',
      readTime: '6 min read',
      image: '/src/assets/images/3d-brain-scan.svg',
      tags: ['HIPAA', 'Compliance', 'Security', 'Healthcare']
    },
    {
      id: 3,
      title: 'Case Study: Reducing Radiology Turnaround Times by 60% with AI',
      excerpt: 'Learn how Regional Medical Center implemented our AI-enhanced teleradiology platform and achieved remarkable efficiency gains.',
      author: 'Dr. Emily Rodriguez',
      date: '2024-01-10',
      category: 'Case Studies',
      readTime: '10 min read',
      image: '/src/assets/images/emergency-radiology.svg',
      tags: ['Case Study', 'Efficiency', 'ROI', 'Implementation']
    },
    {
      id: 4,
      title: 'Understanding PACS Integration: A Technical Deep Dive',
      excerpt: 'Technical insights into Picture Archiving and Communication Systems integration with modern teleradiology platforms.',
      author: 'James Wilson',
      date: '2024-01-08',
      category: 'Technical',
      readTime: '12 min read',
      image: '/src/assets/images/quality-assurance.svg',
      tags: ['PACS', 'Integration', 'Technical', 'Workflow']
    },
    {
      id: 5,
      title: 'The Economics of Teleradiology: Cost-Benefit Analysis',
      excerpt: 'Analyzing the financial impact of implementing teleradiology services and the long-term benefits for healthcare organizations.',
      author: 'Dr. Robert Kim',
      date: '2024-01-05',
      category: 'Business',
      readTime: '7 min read',
      image: '/src/assets/images/intelligent-workflow.svg',
      tags: ['Economics', 'ROI', 'Cost Analysis', 'Business']
    },
    {
      id: 6,
      title: 'Emergency Radiology: 24/7 Coverage Solutions',
      excerpt: 'How teleradiology enables round-the-clock emergency radiology coverage for hospitals and urgent care facilities.',
      author: 'Dr. Lisa Thompson',
      date: '2024-01-03',
      category: 'Emergency Care',
      readTime: '5 min read',
      image: '/src/assets/images/advanced-discovery.svg',
      tags: ['Emergency', '24/7 Coverage', 'Urgent Care', 'Critical Care']
    }
  ]

  const categories = ['all', 'AI & Technology', 'Compliance', 'Case Studies', 'Technical', 'Business', 'Emergency Care']
  
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1)

  const filteredPosts = recentPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
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
              Blog & News
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay updated with the latest insights, trends, and developments in 
              AI-enhanced teleradiology and medical imaging technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="btn-primary flex items-center gap-2">
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recent Articles</h2>
            
            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
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
              Stay Updated
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest insights on AI-enhanced 
              teleradiology delivered directly to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage