import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  didInsertElement() {
    whenRouteIdle().then(() => {
      if (!this.isDestroying) {
        this.set('isAlive', true);
      }
    });

    later(() => {
      if (this.isDestroying) {
        return;
      }
    }, 1000);
  },
});
