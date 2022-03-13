import Component from '@ember/component';
import { computed } from '@ember/object';
import runtimeEnv from 'npm:@mars/heroku-js-runtime-env';

export default Component.extend({
    message: computed(function () {
        const env = runtimeEnv();
        return env.RUNTIME_JS_MESSAGE || 'RUNTIME_JS_MESSAGE is empty. Here’s a donut instead: 🍩';
    })
});