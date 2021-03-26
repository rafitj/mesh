import { ResourceType } from '../types/Resources';
import ClientIcon from '../ui/assets/ClientIcon.svg';
import DatabaseIcon from '../ui/assets/DatabaseIcon.svg';
import ServerIcon from '../ui/assets/ServerIcon.svg';

export const getResourceImg = (resourceType: ResourceType) => {
  if (resourceType === 'CLIENT') {
    return ClientIcon;
  } else if (resourceType === 'SERVER') {
    return ServerIcon;
  } else {
    return DatabaseIcon;
  }
};
