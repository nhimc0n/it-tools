import { LetterCase } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.text-uppercase-converter.title'),
  path: '/text-uppercase-converter',
  description: translate('tools.text-uppercase-converter.description'),
  keywords: ['uppercase', 'lowercase', 'chữ hoa', 'chữ thường', 'in hoa', 'viết hoa', 'chuyển đổi chữ'],
  component: () => import('./text-uppercase-converter.vue'),
  icon: LetterCase,
});
