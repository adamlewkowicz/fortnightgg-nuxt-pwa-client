import Vue from 'vue';
import FgMenu from '@/components/FgMenu';
import FgList from '@/components/FgList';
import FgText from '@/components/FgText';
import FgCheckbox from '@/components/FgCheckbox';

import { addCommasToValue } from '@/plugins/filters';

Vue.component('fg-menu', FgMenu);
Vue.component('fg-list', FgList);
Vue.component('fg-text', FgText);
Vue.component('fg-checkbox', FgCheckbox);

Vue.filter('addCommasToValue', addCommasToValue);
