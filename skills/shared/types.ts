/**
 * Skill 共享类型定义
 * 所有 Skill 脚本共享的基础类型
 */

export interface SkillContext {
  /** 教材唯一标识 */
  bookId: string;
  /** 项目根目录绝对路径 */
  projectRoot: string;
  /** 当前教材目录绝对路径: books/{bookId} */
  bookDir: string;
  /** 源 Markdown 文件绝对路径 */
  sourceMdPath: string;
}

export interface SkillResult<T> {
  /** 是否成功 */
  success: boolean;
  /** 返回数据 */
  data?: T;
  /** 错误信息列表 */
  errors: string[];
}

export interface ValidationResult {
  /** 是否通过校验 */
  valid: boolean;
  /** 校验失败的具体信息 */
  messages: string[];
}
