import Component from '@ember/component';
import { isDead } from 'shared/utils/lifecycle-utils';

export default Component.extend({
  didInsertElement() {
    whenRouteIdle().then(() => {
      if (isDead(this)) {
        return;
      }

      this.set('isAlive', true);
    });
  },
});
