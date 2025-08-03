
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, UserPlus, FileText, Image, X, Paperclip } from 'lucide-react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

const SendEmail = () => {
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);
  
  const addRecipient = (recipient: string) => {
    if (!selectedRecipients.includes(recipient)) {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };
  
  const removeRecipient = (recipient: string) => {
    setSelectedRecipients(selectedRecipients.filter(r => r !== recipient));
  };
  
  const addAttachment = (attachment: string) => {
    if (!attachments.includes(attachment)) {
      setAttachments([...attachments, attachment]);
    }
  };
  
  const removeAttachment = (attachment: string) => {
    setAttachments(attachments.filter(a => a !== attachment));
  };
  
  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${selectedRecipients.length} recipients.`,
    });
  };
  
  // Example templates
  const emailTemplates = [
    { id: 'welcome', name: 'Welcome Email' },
    { id: 'follow-up', name: 'Follow-up' },
    { id: 'proposal', name: 'Proposal' },
    { id: 'meeting', name: 'Meeting Request' },
  ];
  
  // Example leads
  const leads = [
    { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
    { id: '3', name: 'Michael Brown', email: 'michael.brown@example.com' },
    { id: '4', name: 'Lisa Chen', email: 'lisa.chen@example.com' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@example.com' },
  ];
  
  // Example attachments
  const availableAttachments = [
    'Company Overview.pdf',
    'Product Catalog.pdf',
    'Case Study - Tech Solutions.pdf',
    'Pricing Sheet.xlsx',
    'Service Agreement.docx',
  ];
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Send Email</h1>
              <p className="text-muted-foreground">Reach out to your leads and customers.</p>
            </div>
            <Button onClick={handleSendEmail}>
              <Send className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">To:</label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                      {selectedRecipients.map(recipient => (
                        <Badge key={recipient} variant="secondary" className="flex items-center gap-1">
                          {recipient}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeRecipient(recipient)} 
                          />
                        </Badge>
                      ))}
                      <Input 
                        className="flex-1 border-0 p-0 h-7 focus-visible:ring-0" 
                        placeholder="Add recipient..." 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Subject:</label>
                    <Input placeholder="Enter subject..." />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message:</label>
                    <Textarea 
                      placeholder="Type your message here..." 
                      className="min-h-[200px]" 
                    />
                  </div>
                  
                  {attachments.length > 0 && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">Attachments:</label>
                      <div className="flex flex-wrap gap-2">
                        {attachments.map(attachment => (
                          <Badge key={attachment} variant="outline" className="flex items-center gap-1">
                            <Paperclip className="h-3 w-3" />
                            {attachment}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeAttachment(attachment)} 
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select onValueChange={(value) => {
                    const template = emailTemplates.find(t => t.id === value);
                    if (template) {
                      toast({
                        title: "Template Applied",
                        description: `${template.name} template has been applied.`,
                      });
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {leads.map(lead => (
                      <div 
                        key={lead.id} 
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                        onClick={() => addRecipient(lead.email)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.email}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {availableAttachments.map(attachment => (
                    <div 
                      key={attachment} 
                      className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                      onClick={() => addAttachment(attachment)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm">{attachment}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <Image className="mr-2 h-4 w-4" />
                    Add New Attachment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default SendEmail;
