
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LineChart, Users, BarChart3, Zap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui-custom/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900/50">
      <Navbar />
      
      <main className="pt-28 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                The <span className="text-primary">Intelligent</span> CRM That Works For You
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                Boost your sales efficiency with our AI-powered CRM. Identify high-value leads, 
                automate follow-ups, and close more deals with actionable insights.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/auth">
                    Visit Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/auth">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-5xl"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                  alt="Dashboard Preview" 
                  className="w-full rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-6 mt-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Intelligent Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our AI-powered CRM gives you the tools to work smarter, not harder.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <LineChart className="h-10 w-10 text-primary" />,
                title: "AI Analytics",
                description: "Get actionable insights from your sales data with our advanced analytics."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Lead Scoring",
                description: "Let AI identify your hottest leads so you can focus on closing deals."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
                title: "Sales Pipeline",
                description: "Visual Kanban board to track deals from lead to close."
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "AI Assistant",
                description: "Get real-time help and suggestions from your personal AI assistant."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl hover-scale"
              >
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your sales process?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Experience the power of AI-driven insights and automation in your CRM.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/auth">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 md:px-6 py-8 border-t border-gray-200 dark:border-gray-800 mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">SL</span>
            </div>
            <span className="font-semibold text-lg">SmartLeads AI</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} SmartLeads AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
