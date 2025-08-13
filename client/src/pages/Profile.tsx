
import { motion } from 'framer-motion';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Globe,
  Calendar,
  Shield,
  Bell,
  Key,
  Edit2,
  Save,
  X,
  Upload,
  Briefcase,
  Target,
  Award
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from 'react';
import { getUser, updateUser } from '@/api/auth';
import Loader from '@/components/ui/loader';

const Profile = () => {
  const [user, setUser] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [skills, setSkills] = useState(user.skills || []);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUser();
        setUser(res);
        console.log("res", res)
      } catch (err) {
        console.error(err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError('User not authenticated');
    }
  }, [token]);

  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage('');
    setError('');
  };

  const handleSaveClick = async () => {
    try {
      const res = await updateUser({
        // name: user.fullName,
        // email: user.email,
        // password: user.password,
        // age: user.age,
        // phone: user.phone,
        // and so on...
      });

      setMessage('Profile updated successfully');
      setError('');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    }
  };

  const handleAddClick = () => setIsAdding(true);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      onchange(updated); // Notify parent to track unsaved changes
    }
    setNewSkill("");
    setIsAdding(false);
  };

  const handleSkillInputKey = (e) => {
    if (e.key === "Enter") handleAddSkill();
    if (e.key === "Escape") {
      setNewSkill("");
      setIsAdding(false);
    }
  };

  const formatted = new Date(user.joined).toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric'
});

  if (loading) return <Loader/>;


  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <Button size="sm" onClick={handleEditClick}>
              <Edit2 className="h-4 w-4 mr-2" />
              <span>Edit Profile</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Profile Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lg:col-span-4"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-background">
                        {/* <div className="bg-primary text-primary-foreground text-lg font-semibold">Gibrail</div> */}
                        <img src="data:image/jpeg;base64,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" alt="Avatar" />
                      </Avatar>
                      <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background shadow">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>

                    <h2 className="mt-4 text-xl font-bold">{user.fullName}</h2>
                    <p className="text-muted-foreground">{user.jobTitle}</p>

                    <div className="mt-3 flex items-center justify-center gap-2">
                      <Badge variant="outline" className="px-3 py-1">
                        <Target className="h-3 w-3 mr-1" />
                        <span>Top Performer</span>
                      </Badge>
                    </div>

                    <div className="mt-6 w-full space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}m</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{user.officeLocation}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatted}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Revenue</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: '87%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Lead</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: '62%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Conversion</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your personal and professional information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal">
                    <TabsList className="mb-4">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="professional">Professional</TabsTrigger>
                      <TabsTrigger value="security">Security</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <label htmlFor="fullName" className="text-sm font-medium">Name:</label>
                        <Input
                          type="text"
                          id="fullName"
                          value={user.fullName}
                          disabled={!isEditing}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <Input
                            id="email"
                            type="email"
                            value={user.email}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                          <Input
                            id="phone"
                            type="phone"
                            value={user.phone}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="address" className="text-sm font-medium">Address</label>
                          <Input
                            id="address"
                            type="text"
                            value={user.address}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-medium">City</label>
                          <Input
                            id="city"
                            type="text"
                            value={user.city}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="state" className="text-sm font-medium">State</label>
                          <Input
                            id="state"
                            type="text"
                            value={user.state}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="zipCode" className="text-sm font-medium">Zip Code</label>
                          <Input
                            id="zipCode"
                            type="text"
                            value={user.zipCode}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={user.bio}
                          disabled={!isEditing}
                          onChange={handleChange}
                        />
                      </div>

                      {isEditing && (<div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>)}
                    </TabsContent>

                    <TabsContent value="professional" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="jobTitle" className="text-sm font-medium">Job Title</label>
                          <Input
                            id="jobTitle"
                            type="text"
                            value={user.jobTitle}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="department" className="text-sm font-medium">Department</label>
                          <Input
                            id="department"
                            type="text"
                            value={user.department}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="manager" className="text-sm font-medium">Manager</label>
                          <Input
                            id="manager"
                            type="text"
                            value={user.manager}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="office" className="text-sm font-medium">Office Location</label>
                          <Input
                            id="office"
                            type="text"
                            value={user.officeLocation}
                            disabled={!isEditing}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <Badge key={index} className="px-3 py-1">{skill}</Badge>
                          ))}
                          {isEditing && (
                            <Input
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyDown={handleSkillInputKey}
                              className="w-32 h-6 px-2 py-1 text-sm"
                              placeholder="New skill"
                              autoFocus
                            />
                          )}
                        </div>
                      </div>


                      <div className="space-y-2">
                        <label className="text-sm font-medium">Professional Experience</label>
                        <div className="space-y-3">
                          {(user.professionalExperience || []).map((exp, idx) => (
                            <div key={idx} className="rounded-md border p-3">
                              {isEditing ? (
                                <div className="grid md:grid-cols-2 gap-2">
                                  <Input
                                    name="company"
                                    value={exp.company}
                                    placeholder="Company Name"
                                    onChange={(e) => {
                                      const updated = [...user.professionalExperience];
                                      updated[idx].company = e.target.value;
                                      setUser({ ...user, experience: updated });
                                    }}
                                  />
                                  <Input
                                    name="title"
                                    value={exp.title}
                                    placeholder="Job Title"
                                    onChange={(e) => {
                                      const updated = [...user.professionalExperience];
                                      updated[idx].title = e.target.value;
                                      setUser({ ...user, experience: updated });
                                    }}
                                  />
                                  <Input
                                    name="startYear"
                                    value={exp.startYear}
                                    placeholder="Start Year"
                                    onChange={(e) => {
                                      const updated = [...user.professionalExperience];
                                      updated[idx].startYear = e.target.value;
                                      setUser({ ...user, experience: updated });
                                    }}
                                  />
                                  <Input
                                    name="endYear"
                                    value={exp.endYear}
                                    placeholder="End Year"
                                    onChange={(e) => {
                                      const updated = [...user.professionalExperience];
                                      updated[idx].endYear = e.target.value;
                                      setUser({ ...user, professionalExperience: updated });
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="text-sm font-medium">{exp.company}</h4>
                                    <p className="text-xs text-muted-foreground">{exp.title}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs">{exp.startYear} - {exp.endYear}</p>
                                    <p className="text-xs text-muted-foreground">{exp.duration}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [
                                  ...(user.professionalExperience || []),
                                  { company: "", title: "", startYear: "", endYear: "" }
                                ];
                                setUser({ ...user, professionalExperience: updated });
                              }}
                            >
                              Add Experience
                            </Button>
                          )}
                        </div>
                      </div>

                      {isEditing && (<div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>)}
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">

                      <div className="space-y-2 pt-4">
                        <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between rounded-md border p-4">
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-medium">Authenticator App</h4>
                            <p className="text-xs text-muted-foreground">Use an authenticator app to generate one-time codes</p>
                          </div>
                          <Button variant="outline" size="sm">Enable</Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between rounded-md border p-4">
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-medium">SMS Recovery</h4>
                            <p className="text-xs text-muted-foreground">Use your phone number for account recovery</p>
                          </div>
                          <Button variant="outline" size="sm">Set up</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-base font-medium">Email Notifications</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">New Leads</h4>
                              <p className="text-xs text-muted-foreground">Receive notifications when new leads are assigned to you</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">Task Reminders</h4>
                              <p className="text-xs text-muted-foreground">Get reminders about upcoming tasks and follow-ups</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">Meeting Notifications</h4>
                              <p className="text-xs text-muted-foreground">Receive alerts about scheduled meetings</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">Deal Updates</h4>
                              <p className="text-xs text-muted-foreground">Get updates when deal statuses change</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">Marketing Emails</h4>
                              <p className="text-xs text-muted-foreground">Receive product updates and marketing information</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <h3 className="text-base font-medium">System Notifications</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">Push Notifications</h4>
                              <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">Browser Notifications</h4>
                              <p className="text-xs text-muted-foreground">Show desktop notifications in your browser</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="text-sm font-medium">Sound Alerts</h4>
                              <p className="text-xs text-muted-foreground">Play sound when notifications arrive</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Profile;
