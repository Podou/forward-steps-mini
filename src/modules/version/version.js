import packageJson from '../../../package.json';

export default async (ctx) => {
  ctx.state.data = `v${packageJson.version}`;
};
