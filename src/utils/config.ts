/**
 * Configuration utilities for reading environment-specific settings
 * Provides centralized access to timeouts and other configuration values
 */

export interface TimeoutConfig {
  test: number;
  action: number;
  navigation: number;
}

export interface AppConfig {
  testAddress: string;
  environment: string;
  timeouts: TimeoutConfig;
}

/**
 * Get timeout configuration from environment variables
 * @returns TimeoutConfig object with all timeout values
 */
export const getTimeouts = (): TimeoutConfig => ({
  test: parseInt(process.env.TEST_TIMEOUT || '30000', 10),
  action: parseInt(process.env.ACTION_TIMEOUT || '10000', 10),
  navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '15000', 10),
});

/**
 * Get complete application configuration
 * @returns AppConfig object with all configuration values
 */
export const getConfig = (): AppConfig => ({
  testAddress: process.env.TEST_ADDRESS || '12 Smith Street, Surry Hills, NSW 2010',
  environment: process.env.ENVIRONMENT || 'local',
  timeouts: getTimeouts(),
});


/**
 * Log current configuration (useful for debugging)
 */
export const logConfig = (): void => {
  const config = getConfig();
  // eslint-disable-next-line no-console
  console.log('🔧 Configuration:', {
    environment: config.environment,
    testAddress: config.testAddress,
    timeouts: config.timeouts,
  });
};