import Component from '@ember/component';
import { later } from '@ember/runloop';
import { isAlive, isDead } from 'shared/utils/lifecycle-utils';

export default Component.extend({
  didInsertElement() {
    whenRouteIdle().then(() => {
      if (isAlive(this)) {
        this.set('isAlive', true);
      }
    });

    later(() => {
      if (isDead(this)) {
        return;
      }
    }, 1000);
  },
});
