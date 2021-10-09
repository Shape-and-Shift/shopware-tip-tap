import ActionService from '../services/action.service';

Shopware.Service().register('actionService', container => {
  // const initContainer = Shopware.Application.getContainer('init');
  return new ActionService();
});