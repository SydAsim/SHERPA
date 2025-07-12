
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Search,
  Settings,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'AI Project Management',
    href: '/ai-project-management',
    icon: Bot,
  },
  {
    title: 'Conversational AI',
    href: '/conversational-ai',
    icon: MessageSquare,
  },
  {
    title: 'Intelligent Research',
    href: '/intelligent-research',
    icon: Search,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass-effect border-r p-4 z-40"
    >
      <div className="flex items-center space-x-2 mb-8">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">SHERPA AI</span>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
