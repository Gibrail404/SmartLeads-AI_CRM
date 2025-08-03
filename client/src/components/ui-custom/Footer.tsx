
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold">CR</span>
              </div>
              <span className="font-semibold text-lg">ClientSync</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The intelligent CRM that works for you. Boost your sales with AI-powered insights.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase text-gray-500 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-sm hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/leads" className="text-sm hover:text-primary transition-colors">Leads</Link></li>
              <li><Link to="/customers" className="text-sm hover:text-primary transition-colors">Customers</Link></li>
              <li><Link to="/pipeline" className="text-sm hover:text-primary transition-colors">Pipeline</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase text-gray-500 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-sm hover:text-primary transition-colors">Help Center</Link></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase text-gray-500 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ClientSync. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-2 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for better sales
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
