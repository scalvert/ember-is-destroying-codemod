import Component from '@ember/component';
import { isAlive } from 'shared/utils/lifecycle-utils';

export default Component.extend({
  didInsertElement() {
    whenRouteIdle().then(() => {
      if (isAlive(this)) {
        this.set('isAlive', true);
      }
    });
  },
});
