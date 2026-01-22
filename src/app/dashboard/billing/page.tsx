'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { PageHeader } from '@/components/page-header';

const invoices = [
  { invoice: 'INV001', date: '2023-10-15', amount: '$250.00', status: 'Paid' },
  { invoice: 'INV002', date: '2023-11-20', amount: '$150.00', status: 'Pending' },
  { invoice: 'INV003', date: '2023-12-01', amount: '$350.00', 'status': 'Paid' },
  { invoice: 'INV004', date: '2024-01-05', amount: '$450.00', 'status': 'Overdue' },
  { invoice: 'INV005', date: '2024-02-10', amount: '$550.00', 'status': 'Paid' },
];

const chartData = [
    { month: 'Jan', total: 2453 },
    { month: 'Feb', total: 3124 },
    { month: 'Mar', total: 1897 },
    { month: 'Apr', total: 4231 },
    { month: 'May', total: 3890 },
    { month: 'Jun', total: 4876 },
];

const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig

export default function BillingPage() {
    const getBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
          case 'Paid':
            return 'default';
          case 'Pending':
            return 'secondary';
          case 'Overdue':
            return 'destructive';
          default:
            return 'outline';
        }
    };
  
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader 
        title="Billing & Subscription"
        description="Manage your subscription, payments, and review billing history."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Total Balance</CardTitle>
                <CardDescription>Amount pending from your invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">$150.00</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Next Payment Due</CardTitle>
                <CardDescription>For invoice INV002.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">Dec 20, 2023</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Your saved payment cards.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="font-mono">**** **** **** 1234</span>
                    <Button variant="outline" size="sm">Manage</Button>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your current subscription plan.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">Premium</div>
                <p className="text-sm text-muted-foreground mt-1">$19.99 / month</p>
                <Button className="w-full mt-4">Manage Plan</Button>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Billing Overview</CardTitle>
          <CardDescription>Your total billing amounts for the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis hide={true} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>A list of all your past and current invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(invoice.status)}>
                        {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
