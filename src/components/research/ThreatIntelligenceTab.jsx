import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const threatIntelligence = [
  {
    threat: 'APT Group Activity',
    severity: 'High',
    description: 'Increased activity from state-sponsored threat actors targeting infrastructure.',
    indicators: ['Suspicious network traffic', 'Unusual login patterns', 'File system modifications'],
  },
  {
    threat: 'Phishing Campaign',
    severity: 'Medium',
    description: 'Widespread phishing campaign targeting financial institutions.',
    indicators: ['Spoofed email domains', 'Malicious attachments', 'Social engineering'],
  },
  {
    threat: 'Supply Chain Attack',
    severity: 'Critical',
    description: 'Compromised software supply chain affecting multiple organizations.',
    indicators: ['Unauthorized code changes', 'Suspicious dependencies', 'Integrity violations'],
  },
];

const ThreatIntelligenceTab = () => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Current Threat Intelligence
        </CardTitle>
        <CardDescription>
          Real-time threat intelligence and security alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {threatIntelligence.map((threat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-lg">{threat.threat}</h3>
                    <Badge variant={getSeverityColor(threat.severity)} className="mt-1">
                      {threat.severity}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                {threat.description}
              </p>

              <div>
                <p className="font-medium mb-2">Indicators of Compromise:</p>
                <ul className="space-y-1">
                  {threat.indicators.map((indicator, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatIntelligenceTab;