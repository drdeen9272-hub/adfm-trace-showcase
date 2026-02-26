import { useState } from "react";
import { motion } from "framer-motion";
import { User, Database, Info, Shield, Download, Trash2, Bell, Globe, ChevronRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({ email: true, sms: false, weekly: true, alerts: true });
  const [language, setLanguage] = useState("en");

  const handleExport = (format: string) => {
    toast({ title: "Export started", description: `Your ${format.toUpperCase()} export is being prepared. You'll be notified when ready.` });
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="text-3xl font-bold font-heading">Settings</h1>
        <p className="text-muted-foreground font-body mt-1">Manage your profile, data, and platform preferences.</p>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="gap-1.5"><User className="h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="data" className="gap-1.5"><Database className="h-4 w-4" />Data</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-4 w-4" />Alerts</TabsTrigger>
          <TabsTrigger value="about" className="gap-1.5"><Info className="h-4 w-4" />About</TabsTrigger>
        </TabsList>

        {/* ── Profile ── */}
        <TabsContent value="profile">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Your account details for the ADMFm Trace platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">Admin User</p>
                    <Badge variant="secondary">Programme Manager</Badge>
                  </div>
                </div>
                <Separator />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="admin@sproxil.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Organisation</Label>
                    <Input defaultValue="Sproxil Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select defaultValue="manager">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Programme Manager</SelectItem>
                        <SelectItem value="analyst">Data Analyst</SelectItem>
                        <SelectItem value="field">Field Coordinator</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Label className="flex-1">Display Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ha">Hausa</SelectItem>
                      <SelectItem value="yo">Yorùbá</SelectItem>
                      <SelectItem value="ig">Igbo</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => toast({ title: "Profile saved", description: "Your changes have been applied." })}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ── Data Management ── */}
        <TabsContent value="data">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
                <CardDescription>Download programme data for offline analysis or archival.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Surveillance Data", desc: "Case records, test results, and treatment outcomes", format: "csv" },
                  { label: "PPMV Performance", desc: "Provider compliance scores and incentive history", format: "xlsx" },
                  { label: "Supply Chain Logs", desc: "Product verification, batch tracking, and stock levels", format: "csv" },
                  { label: "Full Platform Backup", desc: "Complete data export across all modules", format: "zip" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleExport(item.format)}>
                      <Download className="h-3.5 w-3.5 mr-1.5" />{item.format.toUpperCase()}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions — proceed with caution.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div>
                    <p className="font-medium text-sm">Clear Cache</p>
                    <p className="text-xs text-muted-foreground">Remove locally cached data and reset filters.</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm"><Trash2 className="h-3.5 w-3.5 mr-1.5" />Clear</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear cached data?</AlertDialogTitle>
                        <AlertDialogDescription>This will reset all local filters and cached dashboard data. Server data is unaffected.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => toast({ title: "Cache cleared" })}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ── Notifications ── */}
        <TabsContent value="notifications">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "email" as const, label: "Email Notifications", desc: "Receive programme updates via email" },
                  { key: "sms" as const, label: "SMS Alerts", desc: "Critical alerts sent to your mobile number" },
                  { key: "weekly" as const, label: "Weekly Digest", desc: "Summary of key metrics every Monday" },
                  { key: "alerts" as const, label: "Stock-Out Alerts", desc: "Immediate notification when ACT or mRDT stock is low" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(v) => setNotifications((prev) => ({ ...prev, [item.key]: v }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ── About ── */}
        <TabsContent value="about">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-4">
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <img src={sproxilLogo} alt="Sproxil" className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <CardTitle>ADMFm Trace Platform</CardTitle>
                  <CardDescription>v1.0.0 · Built by Sproxil Inc.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The <strong>Affordable Medicines Facility – malaria (ADMFm)</strong> is a financing mechanism designed by the Global Fund to increase access to affordable, quality-assured artemisinin-based combination therapies (ACTs). By subsidising ACTs at the manufacturer level, ADMFm drives down retail prices so that first-line malaria treatment is within reach of patients purchasing from private-sector outlets, including Patent and Proprietary Medicine Vendors (PPMVs) in Nigeria.
                </p>
                <Separator />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Sproxil Inc.</strong> is a technology company specialising in product authentication and supply-chain traceability across Africa and South-East Asia. Sproxil's Mobile Authentication Service (MAS) enables consumers to verify the authenticity of medicines via SMS or USSD, while its AISHA AI agent delivers WhatsApp-based diagnostic guidance, test-and-treat workflows, and conditional incentive disbursement to both patients and providers.
                </p>
                <Separator />
                <Accordion type="single" collapsible>
                  <AccordionItem value="glossary">
                    <AccordionTrigger className="text-sm font-semibold">Key Terms & Glossary</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        {[
                          ["ACT", "Artemisinin-based Combination Therapy — WHO-recommended first-line malaria treatment"],
                          ["mRDT", "Malaria Rapid Diagnostic Test — antigen-based point-of-care test"],
                          ["PPMV", "Patent & Proprietary Medicine Vendor — licensed drug retailer in Nigeria"],
                          ["LGA", "Local Government Area — Nigeria's third-tier administrative division"],
                          ["GS1", "Global Standards 1 — international barcode and supply-chain standards body"],
                          ["ADMFm", "Affordable Medicines Facility – malaria — Global Fund subsidy mechanism"],
                          ["AISHA", "AI for Sustainable Health Access — Sproxil's WhatsApp-based health agent"],
                          ["NMEP", "National Malaria Elimination Programme — Nigeria's federal malaria authority"],
                        ].map(([term, def]) => (
                          <div key={term} className="py-1">
                            <span className="font-semibold text-primary">{term}</span>
                            <span className="text-muted-foreground"> — {def}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="partners">
                    <AccordionTrigger className="text-sm font-semibold">Programme Partners</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {["The Global Fund", "NMEP", "WHO Nigeria", "NAFDAC", "PCN", "Society for Family Health", "Clinton Health Access Initiative"].map((p) => (
                          <Badge key={p} variant="outline">{p}</Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security">
                    <AccordionTrigger className="text-sm font-semibold">Security & Compliance</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2"><Shield className="h-4 w-4 mt-0.5 text-primary shrink-0" /><span>All data encrypted in transit (TLS 1.3) and at rest (AES-256).</span></div>
                      <div className="flex items-start gap-2"><Shield className="h-4 w-4 mt-0.5 text-primary shrink-0" /><span>Role-based access control with audit logging.</span></div>
                      <div className="flex items-start gap-2"><Shield className="h-4 w-4 mt-0.5 text-primary shrink-0" /><span>Compliant with Nigeria Data Protection Regulation (NDPR).</span></div>
                      <div className="flex items-start gap-2"><Shield className="h-4 w-4 mt-0.5 text-primary shrink-0" /><span>GS1-compliant serialisation for full product traceability.</span></div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">© 2025 Sproxil Inc. All rights reserved.</p>
                  <Button variant="link" size="sm" className="gap-1" asChild>
                    <a href="https://sproxil.com" target="_blank" rel="noopener noreferrer">sproxil.com <ExternalLink className="h-3 w-3" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
