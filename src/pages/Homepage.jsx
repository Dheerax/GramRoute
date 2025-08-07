import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Heart,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Calendar,
  UserCheck,
  Navigation,
  Eye,
  Building,
  Lightbulb
} from 'lucide-react';

const moveParticle = (particle) => ({
  ...particle,
  y: (particle.y + particle.speed) % 100,
});

function Homepage() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
    setIsVisible(true);
  }, []);

  // Animate particles
  useEffect(() => {
    const moveParticles = () => {
      setParticles(prev => prev.map(moveParticle));
    };

    const interval = setInterval(moveParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Stats data
  const stats = [
    { label: "Total Reports", value: "12,847", icon: MapPin, color: "from-red-500 to-pink-600" },
    { label: "Issues Resolved", value: "9,632", icon: CheckCircle, color: "from-green-500 to-emerald-600" },
    { label: "Active Users", value: "25,419", icon: Users, color: "from-blue-500 to-cyan-600" },
    { label: "Cities Covered", value: "156", icon: Building, color: "from-purple-500 to-violet-600" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      content: "GramRoute helped me report a dangerous pothole near my college. Within 2 days, it was fixed!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Daily Commuter",
      content: "Thanks to GramRoute, our entire neighborhood's streetlight issues were resolved quickly.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      role: "Medical Student",
      content: "Reporting broken road signs was so easy. The app made civic participation effortless.",
      rating: 5
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderFloatingParticles = () => (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-400/30 rounded-full backdrop-blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {renderFloatingParticles()}
      </div>

      {/* Hero Section - About GramRoute */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-6xl mx-auto"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-6 py-3 mb-8"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">India's #1 Civic Reporting Platform</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-300"
          >
            Gram<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Route</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-3xl mb-6 text-gray-200 font-light leading-relaxed"
          >
            Empowering Citizens to Build Better Infrastructure
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            GramRoute is a revolutionary platform that connects citizens with authorities to report and resolve infrastructure issues. 
            From potholes to broken streetlights, from traffic problems to public safety concerns - we make civic participation simple, 
            effective, and impactful. Together, we're building a smarter, safer India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={() => navigate('/login')}
              className="group relative px-10 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center space-x-3">
                <span>Start Reporting Today</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>

            <motion.button
              className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>See How It Works</span>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section - Reports & Solutions */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
            >
              Impact That Matters
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Real numbers, real change. See how GramRoute is transforming communities across India.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full overflow-hidden">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Value */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-white mb-2"
                  >
                    {stat.value}
                  </motion.h3>

                  {/* Label */}
                  <p className="text-gray-300 font-medium text-lg">{stat.label}</p>

                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Rate Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 text-center"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Award className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-black text-green-400">75%</span>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Success Rate</h3>
            <p className="text-gray-300 text-lg">
              3 out of 4 reported issues get resolved within 7 days through our platform
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Helps Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6"
            >
              Transforming Lives
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              From students to travelers, GramRoute empowers every citizen to create positive change in their community.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Students Impact */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">For Students</h3>
                  <p className="text-blue-300">Building Tomorrow's Leaders</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Make campus safer by reporting broken infrastructure around colleges</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Learn civic responsibility through direct community participation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Build leadership skills by initiating positive social change</p>
                </div>
                <div className="bg-blue-500/20 rounded-2xl p-4 mt-6">
                  <p className="text-blue-200 font-medium">"Over 8,000 students have contributed to making their campuses safer through GramRoute"</p>
                </div>
              </div>
            </motion.div>

            {/* Travelers Impact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <Navigation className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">For Travelers</h3>
                  <p className="text-orange-300">Safer Journeys For All</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Report dangerous road conditions for immediate attention</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Help fellow travelers by flagging infrastructure issues</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Contribute to nationwide road safety improvements</p>
                </div>
                <div className="bg-orange-500/20 rounded-2xl p-4 mt-6">
                  <p className="text-orange-200 font-medium">"Daily commuters report 40% fewer travel hazards in GramRoute-active areas"</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-center text-white mb-8">What Our Community Says</h3>
            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
                >
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={`star-${currentTestimonial}-${i}`} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-200 mb-6 italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div>
                    <p className="text-white font-bold">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Better India Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-blue-900/30" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-full px-8 py-4 mb-8">
              <Globe className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-semibold text-lg">Building a Better India</span>
              <Heart className="w-6 h-6 text-green-400" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-6">
              A Step Towards Progress
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every report on GramRoute is more than just a complaint - it's a building block for a stronger, 
              more developed India. Together, we're creating the infrastructure our country deserves.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Vision Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Safer Communities</h3>
              <p className="text-gray-300 leading-relaxed">
                By reporting safety hazards, we make our neighborhoods safer for families, children, and elderly citizens.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Faster Development</h3>
              <p className="text-gray-300 leading-relaxed">
                Quick issue identification and resolution accelerates infrastructure development across all regions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:col-span-2 lg:col-span-1"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Governance</h3>
              <p className="text-gray-300 leading-relaxed">
                Data-driven insights help authorities prioritize and allocate resources more effectively.
              </p>
            </motion.div>
          </div>

          {/* India Progress Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500/20 to-green-500/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-12"
          >
            <div className="text-6xl mb-6">🇮🇳</div>
            <blockquote className="text-2xl md:text-3xl font-light text-white italic mb-6">
              "The best way to find yourself is to lose yourself in the service of others."
            </blockquote>
            <p className="text-lg text-gray-300">- Mahatma Gandhi</p>
            <div className="mt-8 flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">156</div>
                <div className="text-orange-300">Cities Impacted</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">28</div>
                <div className="text-green-300">States & UTs</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">1.4B+</div>
                <div className="text-blue-300">Lives Impacted</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-red-500/30 rounded-full px-8 py-4 mb-8">
              <Heart className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-semibold text-lg">Join the Movement</span>
              <Users className="w-6 h-6 text-red-400" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-6">
              Help Make the World Better
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Your voice matters. Your reports create change. Join 25,000+ citizens who are already 
              making a difference in their communities. Together, we can build the India we dream of.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                onClick={() => navigate('/login')}
                className="group relative px-12 py-6 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center space-x-3">
                  <span>Join GramRoute Today</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </motion.button>

              <motion.button
                className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Demo</span>
                </div>
              </motion.button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">Free to Use</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">Instant Impact</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">Secure & Private</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-4">
                  GramRoute
                </h3>
                <p className="text-gray-400 max-w-md leading-relaxed">
                  Empowering citizens to build better infrastructure. Join the movement that's transforming 
                  communities across India, one report at a time.
                </p>
              </motion.div>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">I</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">About Us</button></li>
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">How It Works</button></li>
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">Success Stories</button></li>
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">Help Center</button></li>
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">Report Issue</button></li>
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button type="button" className="text-gray-400 hover:text-white transition-colors text-left">Terms of Service</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 GramRoute. Made with ❤️ for a better India.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Proudly Indian</span>
              <div className="text-2xl">🇮🇳</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;