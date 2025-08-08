import { ElementUIComponent } from './component'

/** Page Component */
export declare class ElPage extends ElementUIComponent {
  size: string;

  noBacktop: boolean;

  submit: Function;

  /** 获取所有的表单值的集合 */
  getAllFormValues: () => Record<string, any>
}
