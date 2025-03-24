
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserStats } from '@/services/statsService';
import { FileText, EyeIcon, Users, DollarSign } from 'lucide-react';

const DashboardStats = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['userStats'],
    queryFn: fetchUserStats,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="glass-card p-6 animate-pulse">
            <div className="h-6 bg-secondary/50 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-secondary/50 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-secondary/50 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-md mb-8">
        <p className="text-red-600 dark:text-red-400">Error loading stats: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }

  const statItems = [
    {
      title: 'Total Posts',
      value: stats?.total_posts ?? 0,
      icon: <FileText size={20} className="text-primary" />,
      percentage: 12,
      trend: 'increase'
    },
    {
      title: 'Total Views',
      value: stats?.total_views ?? 0,
      icon: <EyeIcon size={20} className="text-primary" />,
      percentage: 24,
      trend: 'increase'
    },
    {
      title: 'Total Users',
      value: stats?.total_users ?? 0,
      icon: <Users size={20} className="text-primary" />,
      percentage: 8,
      trend: 'increase'
    },
    {
      title: 'Total Earnings',
      value: (stats?.total_earnings ?? 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }),
      icon: <DollarSign size={20} className="text-primary" />,
      percentage: 16,
      trend: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">{item.title}</p>
              <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-md">
              {item.icon}
            </div>
          </div>
          <p className={`text-sm ${item.trend === 'increase' ? 'text-green-600' : 'text-red-600'} mt-4 flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.trend === 'increase' ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
            </svg>
            {item.percentage}% {item.trend}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
