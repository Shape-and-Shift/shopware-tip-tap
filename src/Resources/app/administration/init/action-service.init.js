import ActionService from '../services/action.service';

Shopware.Service().register('actionService', container => {
  return new ActionService();
});