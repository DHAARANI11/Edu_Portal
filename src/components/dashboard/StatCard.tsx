
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="flex flex-row items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-end gap-1">
            <h2 className="text-3xl font-bold">{value}</h2>
            {trend && (
              <span 
                className={cn(
                  "text-xs font-medium flex items-center pb-1",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
        <div className="rounded-full p-3 bg-muted/50">
          {React.cloneElement(icon as React.ReactElement, { 
            className: "h-6 w-6 text-foreground/80",
          })}
        </div>
      </CardContent>
    </Card>
  );
};
