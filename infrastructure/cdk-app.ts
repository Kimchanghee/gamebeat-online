#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { BaseStaticSiteStack } from '../../../shared/infrastructure/BaseStack';

const app = new App();

new BaseStaticSiteStack(app, 'GameBeatStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION || 'us-east-1',
  },
  domain: 'gamebeat.online',
  buildOutputDir: '../.next/standalone',
  languages: ['ko', 'en', 'ja', 'zh'],
  description: 'GameBeat — E-sports & MMORPG market tracker',
});

app.synth();
