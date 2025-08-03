import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Star, Crown, X } from 'lucide-react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PremiumPlans = () => {
  const plans = [
    {
      name: 'Free',
      description: 'Basic CRM features to get started',
      price: '₹0',
      period: 'forever',
      features: [
        'Basic lead management',
        'Contact storage',
        'Limited email templates',
        'Basic reporting',
        '1 user'
      ],
      notIncluded: [
        'AI lead scoring',
        'Advanced analytics',
        'Unlimited contacts',
        'Email automation',
        'Priority support'
      ],
      buttonText: 'Current Plan',
      isPopular: false,
      disabled: true,
      icon: Star
    },
    {
      name: 'Pro',
      description: 'Advanced features for growing businesses',
      price: '₹1,999',
      period: 'per month',
      features: [
        'Everything in Free',
        'AI lead scoring',
        'Advanced analytics',
        'Unlimited contacts',
        'Email automation',
        'Priority support',
        'Up to 5 users'
      ],
      notIncluded: [
        'Custom AI training',
        'White-label solution',
        'API access'
      ],
      buttonText: 'Upgrade to Pro',
      isPopular: true,
      disabled: false,
      icon: Zap
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      price: '₹7,499',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Custom AI training',
        'White-label solution',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited users'
      ],
      notIncluded: [],
      buttonText: 'Contact Sales',
      isPopular: false,
      disabled: false,
      icon: Crown
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Premium Plans
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Supercharge Your Sales with AI
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Choose the perfect plan for your business needs and leverage our powerful AI-driven CRM to boost your sales performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex"
            >
              <Card className={`flex flex-col w-full ${plan.isPopular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader className={`pb-8 ${plan.isPopular ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <plan.icon className={`h-5 w-5 mr-2 ${plan.isPopular ? 'text-primary' : 'text-gray-400'}`} />
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                    </div>
                    {plan.isPopular && (
                      <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1 text-sm">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pb-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-500">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.notIncluded.length > 0 && (
                      <>
                        <h4 className="text-sm font-medium text-gray-500 mt-6">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.notIncluded.map((feature) => (
                            <li key={feature} className="flex items-start text-gray-400">
                              <X className="h-5 w-5 mr-2 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.isPopular ? "default" : "outline"} 
                    disabled={plan.disabled}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Our enterprise solutions can be tailored to your specific requirements.
            Contact our sales team to learn more about how we can help your organization.
          </p>
          <Button size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default PremiumPlans;
