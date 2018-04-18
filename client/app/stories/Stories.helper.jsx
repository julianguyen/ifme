// @flow
import { Col, Row } from 'antd';
import React, { type StatelessFunctionalComponent } from 'react';
import backgrounds from '@storybook/addon-backgrounds';
import { withInfo } from '@storybook/addon-info';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addDecorator } from '@storybook/react';

import { loadLocales } from 'libs/i18n/I18nSetup';
import { availableLocalesAsCodeArray, defaultLocale, getMessages } from 'libs/i18n/I18nUtils';

import './stories.scss';

type SingleColumnLayoutProps = {
  children: React$Node,
};

const SingleColumnLayout: StatelessFunctionalComponent<SingleColumnLayoutProps> =
  ({ children }: SingleColumnLayoutProps) => (
    <Row style={{ padding: '24px' }}>
      <Col span={24}>
        {children}
      </Col>
    </Row>
  );

// rubocop:disable MethodLength
const setupStorybookDecorators = () => {
  loadLocales();

  const globalDecorator = (storyFn, context) => withInfo({
    styles: {
      infoBody: {
        margin: '0',
      },
      infoPage: {
        margin: '0',
      },
      infoStory: {
        margin: '0',
        padding: '100px 0',
      },
      source: {
        h1: {
          margin: '0',
        },
      },
    },
  })(() => storyFn())(context);
  addDecorator(globalDecorator);

  setIntlConfig({
    locales: availableLocalesAsCodeArray,
    defaultLocale,
    getMessages,
  });
  addDecorator(withIntl);

  addDecorator(backgrounds([
    { name: 'mulberry-wood', value: '#6D0839' },
    { name: 'dark-gray', value: '#3F3F3F' }, // 25% gray
    { name: 'gray', value: '#7F7F7F' }, // 50% gray
    { name: 'light-gray', value: '#BFBFBF', default: true }, // 75% gray
    { name: 'white', value: '#FFFFFF' },
  ]));
};
// rubocop:enable MethodLength

export {
  SingleColumnLayout,
  setupStorybookDecorators,
};
