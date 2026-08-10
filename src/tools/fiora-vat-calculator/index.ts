import { Calculator } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.fiora-vat-calculator.title'),
  path: '/fiora-vat-calculator',
  description: translate('tools.fiora-vat-calculator.description'),
  keywords: ['vat', 'thuế', 'tính thuế', 'giá trước thuế', 'giá sau thuế', '174'],
  component: () => import('./fiora-vat-calculator.vue'),
  icon: Calculator,
});
