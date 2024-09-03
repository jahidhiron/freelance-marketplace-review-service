import { Client } from '@elastic/elasticsearch';
import { config } from '@review/config';
import { winstonLogger } from '@jahidhiron/jobber-shared';

const log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

export const checkConnection = async (): Promise<void> => {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health = await elasticSearchClient.cluster.health({});
      log.info(`ReviewService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to Elasticsearch failed. Retrying...');
      log.log('error', 'ReviewService checkConnection() method:', error);
    }
  }
};
