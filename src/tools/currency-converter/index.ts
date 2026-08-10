import { ArrowsRightLeft } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.currency-converter.title'),
  path: '/currency-converter',
  description: translate('tools.currency-converter.description'),
  keywords: ['currency', 'money', 'exchange', 'tỉ giá', 'tiền tệ'],
  component: () => import('./currency-converter.vue'),
  icon: ArrowsRightLeft,
  createdAt: new Date('2026-08-10'),
});
