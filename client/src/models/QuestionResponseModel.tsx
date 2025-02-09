/**
 * QuestionResponseModel
 */
export interface QuestionResponseModel {
    /**
     * 数字填空数组(仅在数字填空题有用)
     */
    NumFillIns: NumFillInResponse[];
    /**
     * 选项数组(仅在选择题有用)
     */
    Options: OptionResponse[];
    /**
     * 问题id
     */
    QuestionID: string;
    /**
     * 答卷id
     */
    ResponseID: string;
    /**
     * 问题类型
     */
    QuestionType: string;
    /**
     * 文本填空题(仅在文本填空题有用)
     */
    TextFillIns: TextFillInResponse[];
    [property: string]: any;
}

/**
 * NumFillInResponse
 */
export interface NumFillInResponse {
    /**
     * 数字填空内容
     */
    NumContent: number;
    /**
     * 数字填空id
     */
    NumFillInID: string;
    /**
     * 问题id
     */
    QuestionID: string;
    /**
     * 答卷id
     */
    ResponseID: string;
    [property: string]: any;
}

/**
 * OptionResponse
 */
export interface OptionResponse {
    /**
     * 是否被选
     */
    IsSelect: boolean;
    /**
     * 选项内容
     */
    OptionContent: string;
    /**
     * 选项id
     */
    OptionID: string;
    /**
     * 问题id
     */
    QuestionID: string;
    /**
     * 答卷id
     */
    ResponseID: string;
    [property: string]: any;
}

/**
 * TextFillInResponse
 */
export interface TextFillInResponse {
    /**
     * 文本填空内容
     */
    TextContent: string;
    /**
     * 问题id
     */
    QuestionID: string;
    /**
     * 答卷id
     */
    ResponseID: string;
    /**
     * 文本填空id
     */
    TextFillInID: string;
    [property: string]: any;
}