import { Math as MathIcon } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.fiora-number-to-words.title'),
  path: '/fiora-number-to-words',
  description: translate('tools.fiora-number-to-words.description'),
  keywords: ['number', 'words', 'money', 'việt', 'trung', 'đại tả', 'đổi số'],
  component: () => import('./fiora-number-to-words.vue'),
  icon: MathIcon,
});
