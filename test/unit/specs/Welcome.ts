import Vue from 'vue';
import Welcome from '../../../src/pages/Welcome.vue';
import {expect} from 'chai';
describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Welcome();
    vm.$mount();
    expect(vm.myVar).to.equal('hi there');
    // expect(vm.$el.querySelector('.hello h1').textContent)
    //   .to.equal('Welcome to Your Vue.js App')
  });
});
