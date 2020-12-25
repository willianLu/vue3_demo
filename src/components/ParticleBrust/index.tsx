import { defineComponent, ref, nextTick, watch, PropType, toRefs } from "vue";
import Particle, { SHAPES} from '@/util/particle.ts';

export default defineComponent({
  emits: ['animationend'],
  props: {
    redraw: Boolean,
    backgroundColor: String,
    colors: {
      type: Array as PropType<Array<string>>
    },
    types: {
      type: [Array, Number] as PropType<Array<SHAPES> | SHAPES>
    },
    sideNumber: {
      type: [Array, Number] as PropType<Array<number> | number>
    }
  },
  setup(props, context) {
    const { redraw } = toRefs(props);
    const { emit } = context;
    const canvas = ref<HTMLCanvasElement>();
    const particle = ref<Particle | null>(null);
    watch([redraw], ([bool]) => {
      const { backgroundColor, colors, types, sideNumber } = props;
      if (!bool) {
        return particle.value && particle.value.destory();
      }
      if (particle.value) {
        particle.value.draw();
      } else {
        nextTick(() => {
          const mycanvas = canvas.value as HTMLCanvasElement;
          particle.value = new Particle(mycanvas, {
            backgroundColor,
            colors,
            types,
            sideNumber,
            animationEnd: () => {
              emit('animationend');
            }
          });
        });
      }
    });
    return () => <canvas ref={canvas} style="width: 100%; height: 100%" />;
  }
});
