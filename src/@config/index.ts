import * as envs from './envs';

export interface IEnvConfig {
  name?: string
  DEEPLINK_WEBSITE: string
  CONNECTORS: {
    ROOT: {
      baseUrl: string
    }
  }
}
let envConfig: IEnvConfig
export function configEnv(): IEnvConfig {
  if (envConfig) {
    return envConfig
  }
  const envName = process.env.REACT_APP_ENV || 'qa'
  const currentConfig = (envs as any)[envName]
  return {
    ...currentConfig,
    name: envName,
  }
}
