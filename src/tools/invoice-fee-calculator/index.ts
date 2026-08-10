import { ReceiptTax } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.invoice-fee-calculator.title'),
  path: '/invoice-fee-calculator',
  description: translate('tools.invoice-fee-calculator.description'),
  keywords: ['invoice', 'hóa đơn', 'phí xuất hóa đơn', 'chiết khấu', 'chênh lệch', 'vat', 'hoàn tiền'],
  component: () => import('./invoice-fee-calculator.vue'),
  icon: ReceiptTax,
});
