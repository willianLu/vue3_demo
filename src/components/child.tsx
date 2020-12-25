import { defineComponent, ref } from "vue";
import ParticleBrust from "./ParticleBrust";
import Child from "./child.module.scss";

export default defineComponent({
  setup() {
    const visible = ref(false)
    const handleClick = () => {
      visible.value = !visible.value;
    }
    return () => <div class={Child.child}>
        <button onClick={handleClick}>打开粒子动画</button>
        <div  v-show={visible.value} class={Child.canvas}>
          <div></div>
          <ParticleBrust {...{ onClick: handleClick, onAnimationend: handleClick }} redraw={visible.value} />
        </div>
    </div>;
  }
});
