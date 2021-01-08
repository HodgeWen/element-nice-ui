import { ElementUIComponent, ElementUIComponentSize } from './component'

export type FormItemLabelPosition = 'left' | 'right' | 'top'

export interface ValidateCallback {
  /**
   * The callback to tell the validation result
   *
   * @param isValid Whether the form is valid
   * @param invalidFields fields that fail validation
   */
  (isValid: boolean, invalidFields: object): void
}

export interface ValidateFieldCallback {
  /**
   * The callback to tell the field validation result
   *
   * @param errorMessage The error message. It will be empty if there is no error
   */
  (errorMessage: string): void
}

type MacherType = 'email' | 'phone' | 'id'

export interface ElFormRule {
  /** 值 */
  value?: any;
  /** 值类型, 默认为字符串 */
  type?: 'string' | 'number' | 'boolean' | 'method' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'email' | 'any'
  /** 表示必填, 如果指定为字符串, 则应用于消息的提示 */
  required?: boolean | string;
  /** 值的范围 */
  range?: [number, number, string?];
  /** 值的最小值, 如果为数组则 第一个值表示最小值, 第二个表示错误提示消息 */
  min?: number | [number, string];
  /** 值的最大值, 如果为数组则 第一个值表示最大值, 第二个表示错误提示消息 */
  max?: number;
  /** 值匹配的正则, 可以是正则表达式和预设的正则表达式别名 */
  match?: MacherType | RegExp | [RegExp | MacherType, string?];
  /** 自定义验证器 */
  validator?: (rule: any, value: any, callback: (msg: string) => void, model: Record<string, any>) => void;
  /** 字符长度 */
  len?: number | [number, string?];
}

export type ElFormModel = Record<string, string | number | Array<any> | null | ElFormRule>

/** Form Component */
export declare class ElForm extends ElementUIComponent {
  /** Data of form component */
  model: object

  /** Validation rules of form */
  rules: object

  /** Whether the form is inline */
  inline: boolean

  /** Whether the form is disabled */
  disabled: boolean

  /** Position of label */
  labelPosition: FormItemLabelPosition

  /** Width of label, and all form items will inherit from Form */
  labelWidth: string

  /** Suffix of the label */
  labelSuffix: string

  /** Whether to show the error message */
  showMessage: boolean

  /** Whether to display the error message inline with the form item */
  inlineMessage: boolean

  /** Whether to display an icon indicating the validation result */
  statusIcon: boolean

  /** Whether to trigger validation when the `rules` prop is changed */
  validateOnRuleChange: boolean

  /** Controls the size of components in this form */
  size: ElementUIComponentSize

  /**
   * Validate the whole form
   *
   * @param callback A callback to tell the validation result
   */
  validate (callback: ValidateCallback): void
  validate (): Promise<boolean>
  /**
   * Validate certain form items
   *
   * @param props The property of `model` or array of prop which is going to validate
   * @param callback A callback to tell the field validation result
   */
  validateField (props: string | string[], callback?: ValidateFieldCallback): void

  /** reset all the fields and remove validation result */
  resetFields (): void

  /** clear validation message for certain fields */
  clearValidate (props?: string | string[]): void

  /** 获取表单值 */
  getValue<T extends Record<string, any> = Record<string, any>>(): T

  /** 设置表单值 */
  setValue<T extends Record<string, any> = Record<string, any>>(value: T): void
}
