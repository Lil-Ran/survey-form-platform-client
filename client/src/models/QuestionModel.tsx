/**
 * QuestionModel
 */
export interface QuestionModel {
    /**
     * 问题说明
     */
    Explanation: string;
    /**
     * 是否必填
     */
    IsRequire: boolean;
    /**
     * 是否显示
     */
    IsShow: boolean;
    /**
     * 最少选择数
     */
    LeastChoice: number;
    /**
     * 最多选择数
     */
    MaxChoice: number;
    /**
     * 数字填空题数字
     */
    NumFillIns: NumFillIn[];
    /**
     * 选择题选项
     */
    Options: Option[];
    /**
     * 问题ID
     */
    QuestionID: string;
    /**
     * 问题类型(中文)
     */
    QuestionLabel: string;
    /**
     * 问题类型
     */
    QuestionType: string;
    /**
     * 问卷ID
     */
    SurveyID: string;
    /**
     * 文本填空题文本
     */
    TextFillIns: TextFillIn[];
    /**
     * 问题标题
     */
    Title: string;
    [property: string]: any;
}

export interface NumFillIn {
    /**
     * 最小值
     */
    LeastNum: number;
    /**
     * 最大值
     */
    MaxNum: number;
    /**
     * 数字填空
     */
    NumContent: number;
    /**
     * 数字填空ID
     */
    NumFillInID: string;
    /**
     * 小数位数
     */
    Precision: number;
    [property: string]: any;
}

export interface Option {
    /**
     * 选项内容
     */
    OptionContent: string;
    /**
     * 选项ID
     */
    OptionID: string;
    [property: string]: any;
}

export interface TextFillIn {
    /**
     * 文本内容
     */
    TextContent: string;
    /**
     * 文本填空ID
     */
    TextFillInID: string;
    [property: string]: any;
}
