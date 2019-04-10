import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    whenRouteIdle().then(() => {
      if (this.isDestroying) {
        return;
      }

      this.set('isAlive', true);
    });
  },
});
