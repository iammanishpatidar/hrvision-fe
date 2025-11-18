import type { StorybookConfig } from '@storybook/react-vite';

export const viteFinal: StorybookConfig['viteFinal'] = async config => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': '/src',
      },
    },
  };
};
