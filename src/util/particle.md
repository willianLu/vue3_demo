### 自定义粒子爆炸动画效果
***
#### 默认抛出对象ParticleBurst
> 使用方法

    new ParticleBurst(canvas, options)

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| canvas | 必填项，canvas-dom元素 | element | — | — |
| options | 可选项，爆炸效果相关配置 | Object | — | {} |

> 参数options说明

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| width | canvas的宽度 | number | — | winodw.innerWidth |
| height | canvas的高度 | number | — | window.innerHeight |
| backgroundColor | canvas背景色 | string | — | 'rgba(20, 24, 41, 0.7)' |
| colors | 粒子颜色数组 | [string] | — | ['#C59D53', '#F0CC88', '#996D1D'] |
| types | 粒子形状类型 | array or number | — | [0,1,2] |
| shapes | 多边形粒子的边数，考虑到粒子较小，边数过多看起来和圆一样，边数合理范围为3 ~ 6 | array or number | 3 ~ 6 | [3,4,5,6] |
| animationEnd | 绘制粒子动画结束时的回调函数 | function | — | — |

> 粒子types枚举说明

    { alias: 'sphere', text: '球形', value: 0 },
    { alias: 'star', text: '五角星', value: 1 },
    { alias: 'polygon', text: '多边形', value: 2 }
    
> 方法说明

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| draw | 绘制粒子动画，当一次动画结束需要重绘时调用 | — |
| destory | 当需要手动销毁粒子动画时调用，默认情况下粒子动画结束时便销毁 | — |

