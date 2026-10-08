import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Grid,
  Button,
  Badge,
  PricingCard,
  BillingSummary,
  DataTable,
  ColumnDef,
} from '../components/ui';
import { mockInvoices } from '../data/mockData';
import { Invoice } from '../types';
import { CreditCard, Download, Check, ShieldCheck, Zap } from 'lucide-react';

export const BillingView: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$0' : '$0',
      period: 'forever',
      description: 'Ideal for independent developers and micro teams.',
      features: [
        'Up to 3 Workspace Members',
        '500 Copilot AI queries / month',
        '5 GB Secure Asset Storage',
        'Community Discord Support',
      ],
      current: false,
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$29' : '$24',
      period: 'per user / month',
      description: 'For growing fast-paced engineering organizations.',
      features: [
        'Unlimited Workspace Members',
        'Unlimited Gemini 2.5 Copilot Queries',
        '50 GB High-Throughput Storage',
        'Custom Webhook Automations',
        'Priority 24/7 SLA Support',
      ],
      current: true,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'Dedicated infrastructure, custom SLA, and SOC2 compliance.',
      features: [
        'Dedicated Cloud Run Tenant',
        'Self-Hosted LLM Fine-Tuning',
        'Unlimited Object Storage',
        'SAML 2.0 / Okta SSO & SCIM',
        'Dedicated Technical Account Manager',
      ],
      current: false,
    },
  ];

  const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      sortable: true,
      render: (inv) => (
        <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          {inv.invoiceNumber}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Billing Date',
      sortable: true,
      render: (inv) => (
        <span className="text-xs font-mono text-zinc-500">{inv.date}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (inv) => (
        <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
          ${inv.amount.toFixed(2)} USD
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (inv) => (
        <Badge
          variant={inv.status === 'Paid' ? 'success' : 'warning'}
          size="sm"
        >
          {inv.status}
        </Badge>
      ),
    },
    {
      key: 'download',
      header: '',
      render: (inv) => (
        <button
          onClick={() => alert(`Downloading PDF invoice ${inv.invoiceNumber}`)}
          className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded transition-colors"
          title="Download PDF"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription & Billing"
        description="Manage workspace plan tiers, payment methods, and historical tax invoices."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Billing' },
        ]}
      />

      {/* Plan Summary & Payment Method Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BillingSummary
            planName="Pro Tier"
            amount="$87.00"
            cycle="Monthly (3 Active Seats)"
            nextBillingDate="Nov 1, 2026"
            paymentMethod="Mastercard ending in 4242"
            onManagePlan={() => alert('Opening plan manager modal')}
          />
        </div>

        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Payment Method
              </span>
              <Badge variant="outline" size="sm">Primary</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <CreditCard className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
              <div>
                <div className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  •••• •••• •••• 4242
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">Expires 09/29</div>
              </div>
            </div>
          </div>
          <Button variant="outline" size="xs" onClick={() => alert('Update card')}>
            Update Card
          </Button>
        </div>
      </div>

      {/* Plan Tier Switcher */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Available Workspace Plans
          </h3>
          <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-100 dark:bg-zinc-800 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <Grid cols={3} gap="lg">
          {plans.map((p, idx) => (
            <PricingCard
              key={idx}
              name={p.name}
              price={p.price}
              period={p.period}
              description={p.description}
              features={p.features}
              isCurrent={p.current}
              isPopular={p.popular}
              onSelect={() => alert(`Selected ${p.name} plan`)}
            />
          ))}
        </Grid>
      </div>

      {/* Invoices Table */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Billing Invoices
              </h3>
              <p className="text-xs text-zinc-400">Download past invoices for tax and accounting</p>
            </div>
            <Button variant="outline" size="xs">Download All</Button>
          </div>
        }
        noPadding
      >
        <DataTable columns={invoiceColumns} data={invoices} pageSize={5} />
      </Card>
    </div>
  );
};
