import { ElementUIComponent, ElementUIComponentSize } from './component'


/** Context Component */
export declare class ElContext extends ElementUIComponent {
  /** 上下文 */
  ctx: Record<string, any>;

  /** 渲染的标签 默认 dic */
  tag: string;

  /** 作用深度 默认1 */
  depth: number | string
}
