import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Your Company Name',
    brandUrl: 'https://your-website.com',
    brandTarget: '_self',
  }),
});
