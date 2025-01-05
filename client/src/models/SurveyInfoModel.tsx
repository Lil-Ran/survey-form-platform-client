/**
 * ArrayOfSurveyInfoModel，请求响应
 */
export interface Response {
    data: SurveyInfoModel[];
    /**
     * 数据长度
     */
    length: number;
    /**
     * 总长度
     */
    total: number;
    [property: string]: any;
  }
  
  /**
  * SurveyInfoModel
  */
  export interface SurveyInfoModel {
    /**
     * 访问ID
     */
    accessId: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 最后更新时间
     */
    lastUpdateTime: Date;
    /**
     * 所属者ID
     */
    ownerId: string;
    /**
     * 所属者用户名
     */
    ownerName: string;
    /**
     * 答卷数量
     */
    responseCount: number;
    /**
     * 状态
     */
    status: SurveyStatus;
    /**
     * 问卷ID
     */
    surveyId: string;
    /**
     * 问卷名
     */
    title: string;
    [property: string]: any;
  }
  
  /**
  * 状态
  *
  * SurveyStatus
  */
  export enum SurveyStatus {
    Deleted = "Deleted",
    Locked = "Locked",
    Ongoing = "Ongoing",
    OutOfCount = "OutOfCount",
    OutOfTime = "OutOfTime",
    Suspended = "Suspended",
  }
  