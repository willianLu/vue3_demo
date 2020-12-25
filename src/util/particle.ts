// 形状类型枚举
export enum SHAPES {
  sphere, // 球形
  star,  // 五角星
  polygon // 多边形
}
// 形状类型枚举数组
const SHAPES_ARRAY: Array<SHAPES> = [SHAPES.sphere, SHAPES.star, SHAPES.polygon]
/**
* @description 获取两个数字之间的随机数
* @param {number} min 最小值
* @param {number} max 最大值
*/
function randomBetween(min: number, max: number): number {
return Math.floor(Math.random() * max) + min
}

interface ParticleOptions {
  x: number
  y: number
  ctx: CanvasRenderingContext2D
  isFast: boolean
  width: number
  height: number
  sideNumber: number
  type: SHAPES
  colors: Array<string>
}

interface Particle extends ParticleOptions {
color: string
r: number
speed: {
    x: number
    y: number
}
}

/**
* @description 多边形粒子
*/
class Particle {
constructor(options: ParticleOptions) {
  const { x, y, ctx, isFast, colors, width, height, sideNumber, type } = options
  this.x = x
  this.y = y
  this.ctx = ctx
  this.isFast = isFast
  this.width = width
  this.height = height
  this.color = colors[Math.floor(Math.random() * colors.length)]
  this.type = type
  this.sideNumber = sideNumber > 6 ? 6 : sideNumber
  this.r = type === SHAPES.star ? randomBetween(5, 8) : randomBetween(6, 12)
  const angle = Math.PI * 2 * Math.random()
  const multiplier = randomBetween(6, 12)
  this.speed = {
    x: (multiplier + randomBetween(-0.5, 0.5)) * Math.cos(angle),
    y: (multiplier + randomBetween(-0.5, 0.5)) * Math.sin(angle)
  }
}

draw() {
  const { type, x, y, r, width, height } = this
  if (x + r < 0 || x - r > width || y + r < 0 || y - r > height || r <= 0) {
    return false
  }
  if (type === SHAPES.sphere) {
    this.drawSphere()
  } else if (type === SHAPES.star) {
    this.drawStar()
  } else {
    this.drawPolygon()
  }
  return true
}

/**
 * @description 绘制球形
 */
drawSphere() {
  const { ctx, color, x, y, r } = this
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2, false)
  ctx.fill()
  this.update()
  return true
}

/**
 * @description 绘制多边形
 */
drawPolygon() {
  const { ctx, color, x, y, r, sideNumber } = this
  const angle = (Math.PI * 2) / sideNumber
  ctx.save()
  ctx.fillStyle = color
  ctx.translate(x, y)
  ctx.moveTo(0, -r)
  ctx.beginPath()
  for (let i = 0; i < sideNumber; i++) {
    ctx.rotate(angle)
    ctx.lineTo(0, -r)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
  this.update()
  return true
}

/**
 * @description 绘制五角星
 */
drawStar() {
  const { ctx, color, x, y, r } = this
  ctx.save()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.translate(x, y)
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos(((18 + i * 72) / 180) * Math.PI) * 2 * r + r,
      -Math.sin(((18 + i * 72) / 180) * Math.PI) * 2 * r + r
    )
    ctx.lineTo(
      Math.cos(((54 + i * 72) / 180) * Math.PI) * r + r,
      -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + r
    )
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
  this.update()
}

/**
 *@description 更新粒子位置
 */
update() {
  this.x += this.speed.x
  this.y += this.speed.y
  this.r -= this.isFast ? 0.2 : 0.06
  this.speed.x *= this.isFast ? 1.02 : 0.97
  this.speed.y *= this.isFast ? 1.02 : 0.97
}
}

interface ParticleBurstOptions {
  animationEnd?: Function
  width?: number
  height?: number
  colors?: Array<string>
  backgroundColor?: string
  types?: SHAPES | Array<SHAPES>
  sideNumber?: number | Array<number>
}

interface ParticleBurst {
animationEnd?: Function
width: number
height: number
types: Array<SHAPES>
backgroundColor: string
sideNumber: Array<number>
colors: Array<string>
canvas: HTMLCanvasElement
ctx: CanvasRenderingContext2D
particleQueues: Array<Particle>
isQueuesEnd: boolean
isAnimationEnd: boolean
timeout: null | number
}
/**
* @description canvas粒子动画
*/
class ParticleBurst {
constructor(canvas: HTMLCanvasElement, options: ParticleBurstOptions = {}) {
  const { animationEnd, width, height, colors, backgroundColor } = options
  let { types, sideNumber } = options
  this.canvas = canvas
  this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  this.animationEnd = animationEnd
  this.colors = colors || ['#C59D53', '#F0CC88', '#996D1D']
  this.backgroundColor = backgroundColor || 'rgba(20, 24, 41, 0.7)'
  if (types && !Array.isArray(types)) types = [types]
  types = types || SHAPES_ARRAY
  this.types = types
  if (sideNumber && !Array.isArray(sideNumber)) sideNumber = [sideNumber]
  sideNumber = sideNumber || [3, 4, 5, 6]
  this.sideNumber = sideNumber as Array<number>
  this.width = width || window.innerWidth
  this.height = height || window.innerHeight
  this.particleQueues = [] // 粒子队列
  this.isQueuesEnd = false // 构建粒子队列结束
  this.isAnimationEnd = false // 粒子动画结束
  this.timeout = null
  this.init()
  this.draw()
}

/**
 * @description 初始化canvas基本数据
 */
init() {
  const { canvas, width, height } = this
  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
}

/**
 * 绘制粒子动画
 */
draw() {
  this.buildParticleQueues()
  this.loop()
}

/**
 * @description 构建粒子队列
 */
buildParticleQueues(count = 3) {
  const { width, height } = this
  const bool = count > 1
  this.add(
    (count>1 ? 1.5 : 1) * randomBetween(bool ? 40 : 8, bool ? 80 : 16),
    width / 2,
    height / 2,
    bool
  )
  count -= 1
  if (count === 0) {
    this.isQueuesEnd = true
    this.timeout = null
  } else {
    this.isAnimationEnd = false
    this.isQueuesEnd = false
    this.timeout = setTimeout(() => {
      this.buildParticleQueues(count)
    }, 250)
  }
}

/**
 * @description 执行canvas动画绘制
 */
loop() {
  if (this.isAnimationEnd) return
  const { canvas, ctx, particleQueues, isQueuesEnd, backgroundColor } = this
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  let i = 0
  while (i < particleQueues.length) {
    const particle = particleQueues[i]
    if (!particle.draw()) {
      particleQueues.splice(i, 1)
    } else {
      i += 1
    }
  }
  if (particleQueues.length === 0 && isQueuesEnd) {
    this.animationEnd && this.animationEnd()
    return
  }
  requestAnimationFrame(this.loop.bind(this))
}

/**
 * @description 添加新的粒子
 */
add(count = 1, x: number, y: number, isFast = false) {
  const { ctx, colors, width, height, sideNumber, types } = this
  for (let i = 0; i < count; i++) {
    const type = types[randomBetween(0, types.length)]
    const shape = sideNumber[randomBetween(0, sideNumber.length)]
    const particle = new Particle({
      x,
      y,
      isFast,
      ctx,
      colors,
      width,
      height,
      type,
      sideNumber: shape
    })
    this.particleQueues.push(particle)
  }
}

/**
 * @description 销毁正在执行的动画
 */
destory() {
  this.isAnimationEnd = true
  this.isQueuesEnd = false
  if (this.timeout) {
    clearTimeout(this.timeout)
  }
  const { ctx, width, height } = this
  ctx.clearRect(0, 0, width, height)
  this.particleQueues = []
}
}

export default ParticleBurst
