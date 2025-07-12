import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const researchData = [
  {
    id: 1,
    title: 'CVE-2024-0001: Critical SQL Injection in Web Applications',
    category: 'Vulnerability',
    severity: 'Critical',
    description: 'A critical SQL injection vulnerability affecting multiple web application frameworks.',
    source: 'NIST NVD',
    date: '2024-01-15',
    tags: ['SQL Injection', 'Web Security', 'Critical'],
    patchRiskNotes: 'High impact on database integrity. Immediate patching required.',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2024-0001',
  },
  {
    id: 2,
    title: 'Zero-Day Exploit in Popular CMS Platform',
    category: 'Threat Intelligence',
    severity: 'High',
    description: 'Recently discovered zero-day exploit targeting content management systems.',
    source: 'Security Research Lab',
    date: '2024-01-12',
    tags: ['Zero-Day', 'CMS', 'Exploit'],
    patchRiskNotes: 'No official patch available. Implement workarounds immediately.',
    url: 'https://example.com/research/zero-day-cms',
  },
  {
    id: 3,
    title: 'Best Practices for Container Security',
    category: 'Best Practices',
    severity: 'Medium',
    description: 'Comprehensive guide on securing containerized applications and infrastructure.',
    source: 'Cloud Security Alliance',
    date: '2024-01-10',
    tags: ['Containers', 'Docker', 'Security'],
    patchRiskNotes: 'Implementation guidelines for enhanced container security posture.',
    url: 'https://example.com/container-security-guide',
  },
  {
    id: 4,
    title: 'Emerging Ransomware Tactics and Mitigation',
    category: 'Threat Intelligence',
    severity: 'High',
    description: 'Analysis of new ransomware attack vectors and defensive strategies.',
    source: 'Cybersecurity Institute',
    date: '2024-01-08',
    tags: ['Ransomware', 'Malware', 'Defense'],
    patchRiskNotes: 'Update backup strategies and implement advanced threat detection.',
    url: 'https://example.com/ransomware-analysis',
  },
];

const ResearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredResearch, setFilteredResearch] = useState(researchData);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  const handleSearch = () => {
    let results = researchData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredResearch(results);
    toast({
      title: "Search Complete",
      description: `Found ${results.length} items matching your criteria.`,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    let results = researchData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = category === 'All' || item.category === category;
        return matchesSearch && matchesCategory;
    });
    setFilteredResearch(results);
  };

  const handleDownload = (item) => {
    toast({
      title: "Saved to Library",
      description: `"${item.title}" has been saved to your personal research library.`,
    });
  };

  const handleViewExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Database</CardTitle>
        <CardDescription>
          Search through curated security research and vulnerability data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search research papers, CVEs, threat reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          {['All', 'Vulnerability', 'Threat Intelligence', 'Best Practices'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredResearch.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border rounded-lg p-6 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <Badge variant={getSeverityColor(item.severity)}>
                      {item.severity}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>Source: {item.source}</span>
                    <span>Date: {item.date}</span>
                    <span>Category: {item.category}</span>
                  </div>

                  <div className="bg-accent/30 rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">Patch Risk Notes:</p>
                    <p className="text-sm">{item.patchRiskNotes}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewExternal(item.url)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(item)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
           {filteredResearch.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No research found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchTab;