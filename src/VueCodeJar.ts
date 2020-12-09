import {
  defineComponent,
  ref,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue-demi';
import { CodeJar } from 'codejar';
import { VueCodeJarProps } from './types';

const VueCodeJar = defineComponent<Required<VueCodeJarProps>>({
  name: 'VueCodeJar',
  props: {
    value: {
      type: String,
      default: ''
    },
    highlight: {
      type: Function,
      default: () => void 0
    },
    options: {
      type: Object,
      default: () => void 0
    }
  },
  emits: ['input'],
  setup(props, { emit }) {
    const editorElm = ref<HTMLElement | null>(null);
    const codejar = ref<CodeJar | null>(null);
    const innerValue = ref<string>(props.value);

    const onUpdateHandler = (code: string) => {
      innerValue.value = code;
      emit('input', code);
    };

    const createInstance = () => {
      codejar.value?.destroy();

      if (editorElm.value) {
        const instance = CodeJar(
          editorElm.value,
          props.highlight,
          props.options
        );

        instance.onUpdate(onUpdateHandler);
        instance.updateCode(props.value);
        codejar.value = instance;
      }
    };

    watch(
      () => props.value,
      v => {
        if (v !== innerValue.value) {
          codejar.value?.updateCode(v);
          innerValue.value = v;
        }
      }
    );

    watch(
      () => props.options,
      v => {
        codejar.value?.updateOptions(v);
      }
    );

    watch(() => props.highlight, createInstance);

    onMounted(createInstance);

    onBeforeUnmount(() => {
      codejar.value?.destroy();
    });

    return { editorElm, codejar, innerValue };
  },
  render(h) {
    return h('div', { staticClass: 'vue-codejar', ref: 'editorElm' });
  }
});

export default VueCodeJar;
