
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const DashboardCard = ({
  title,
  description,
  footer,
  children,
  className,
  noPadding = false
}: DashboardCardProps) => {
  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn({ "p-0": noPadding })}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="pt-3 border-t">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
