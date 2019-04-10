# convert-to-isdestroying

## Usage

```
npx ember-is-destroying-codemod convert-to-isdestroying path/of/files/ or/some**/*glob.js

# or

yarn global add ember-is-destroying-codemod
ember-is-destroying-codemod convert-to-isdestroying path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [ensure-imports](#ensure-imports)
* [transform-isalive-isdead](#transform-isalive-isdead)
* [transform-isalive](#transform-isalive)
* [transform-isdead](#transform-isdead)
<!--FIXTURES_TOC_END-->

## <!--FIXTURES_CONTENT_START-->
---
<a id="ensure-imports">**ensure-imports**</a>

**Input** (<small>[ensure-imports.input.js](transforms/convert-to-isdestroying/__testfixtures__/ensure-imports.input.js)</small>):
```js
import Component from '@ember/component';
import { later } from '@ember/runloop';
import { weAreToast } from 'toasted';
import { isAlive, isDead, isFooBared } from 'shared/utils/lifecycle-utils';

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

    if (isFooBared()) {
      weAreToast();
    }
  },
});

```

**Output** (<small>[ensure-imports.output.js](transforms/convert-to-isdestroying/__testfixtures__/ensure-imports.output.js)</small>):
```js
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

```
---
<a id="transform-isalive-isdead">**transform-isalive-isdead**</a>

**Input** (<small>[transform-isalive-isdead.input.js](transforms/convert-to-isdestroying/__testfixtures__/transform-isalive-isdead.input.js)</small>):
```js
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

```

**Output** (<small>[transform-isalive-isdead.output.js](transforms/convert-to-isdestroying/__testfixtures__/transform-isalive-isdead.output.js)</small>):
```js
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

```
---
<a id="transform-isalive">**transform-isalive**</a>

**Input** (<small>[transform-isalive.input.js](transforms/convert-to-isdestroying/__testfixtures__/transform-isalive.input.js)</small>):
```js
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

```

**Output** (<small>[transform-isalive.output.js](transforms/convert-to-isdestroying/__testfixtures__/transform-isalive.output.js)</small>):
```js
import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    whenRouteIdle().then(() => {
      if (!this.isDestroying) {
        this.set('isAlive', true);
      }
    });
  },
});

```
---
<a id="transform-isdead">**transform-isdead**</a>

**Input** (<small>[transform-isdead.input.js](transforms/convert-to-isdestroying/__testfixtures__/transform-isdead.input.js)</small>):
```js
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

```

**Output** (<small>[transform-isdead.output.js](transforms/convert-to-isdestroying/__testfixtures__/transform-isdead.output.js)</small>):
```js
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

```
<!--FIXTURES_CONTENT_END-->
