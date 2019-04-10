import Component from '@ember/component';
import { later } from '@ember/runloop';
import { weAreToast } from 'toasted';
import { isFooBared } from 'shared/utils/lifecycle-utils';

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

    if (isFooBared()) {
      weAreToast();
    }
  },
});
