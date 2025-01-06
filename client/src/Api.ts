/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum SurveyStatus {
  Ongoing = "Ongoing",
  Suspended = "Suspended",
  OutOfTime = "OutOfTime",
  OutOfCount = "OutOfCount",
  Locked = "Locked",
  Deleted = "Deleted",
}

export interface SurveyInfoModel {
  /** 问卷ID */
  surveyId: string;
  /** 访问ID */
  accessId: string;
  /** 问卷名 */
  title: string;
  /** 状态 */
  status: SurveyStatus;
  /** 答卷数量 */
  responseCount: number;
  /** 所属者ID */
  ownerId: string;
  /** 所属者用户名 */
  ownerName: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime: string;
  /**
   * 最后更新时间
   * @format date-time
   */
  lastUpdateTime: string;
}

/** 请求响应 */
export interface ArrayOfSurveyInfoModel {
  data: SurveyInfoModel[];
  /** 数据长度 */
  length: number;
  /** 总长度 */
  total: number;
}

export interface SurveyCreateModel {
  /** 标题 */
  title: string;
}

export interface SurveyStatusModel {
  /** 问卷ID */
  surveyId: string;
  /** 状态 */
  status: SurveyStatus;
}

export interface SurveyCopyModel {
  /** 问卷ID */
  surveyId: string;
}

export interface SurveyMetaModel {
  surveyId: string;
  accessId: string;
  userId: string;
  title: string;
  description: string;
  createTime: string;
  expireTime?: string | null;
  lastUpdateTime: string;
  lastUpdateUser: string;
  status: string;
  responseCount?: number | null;
  themeColor?: number | null;
  textColor?: number | null;
  pcBackgroundImage?: string | null;
  pcBannerImage?: string | null;
  footer?: string | null;
  displayStyle?: number | null;
  buttonText?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  dayStartTime?: string | null;
  dayEndTime?: string | null;
  passwordStrategy?: number | null;
  password?: any[] | null;
  maxResponseCount?: number | null;
  browserLimit?: boolean | null;
  ipLimit?: boolean | null;
  keepContent?: boolean | null;
  failMessage?: string | null;
  showAfterSubmit?: number | null;
  showContent?: string | null;
}

export interface QuestionModel {
  /** 问题类型 */
  QuestionType: string;
  /** 问题类型(中文) */
  QuestionLabel: string;
  /** 问题id */
  QuestionID: string;
  /** 问题标题 */
  Title: string;
  /** 问题说明 */
  Description: string;
  /** 最少选择数(仅在多选题有用) */
  LeastChoice: number;
  /** 最多选择数(仅在多选题有用) */
  MaxChoice: number;
  /** 问卷id */
  SurveyID: string;
  /** 选项id数组(仅在选择题有用) */
  Options: Option[];
  /** 数字填空数组(仅在数字填空题有用) */
  NumFillIns: NumFillIn[];
  /** 文本填空题(仅在文本填空题有用) */
  TextFillIns: TextFillIn[];
}

export interface NumFillIn {
  /** 数字填空id */
  NumFillInID: string;
  /** 问题id */
  QuestionID: string;
  /** 问卷id */
  SurveyID: string;
}

export interface TextFillIn {
  /** 文本填空id */
  TextFillInID: string;
  /** 问题id */
  QuestionID: string;
  /** 问卷id */
  SurveyID: string;
}

export interface Option {
  /** 选项id */
  OptionID: string;
  /** 选项内容 */
  OptionContent: string;
  /** 问题id */
  QuestionID: string;
  /** 问卷id */
  SurveyID: string;
}

export interface SurveyModel {
  /** 问卷id */
  id: string;
  /** 问卷名 */
  title: string;
  /** 是否开放问卷 */
  isopening: boolean;
  questions: QuestionModel[];
}

export interface ResponseModel {
  ResponseID: string;
  /** 问卷id */
  SurveyID: string;
  QuestionResponse: QuestionResponseModel[];
}

export interface QuestionResponseModel {
  /** 答卷id */
  ResponseID: string;
  /** 问题id */
  QuestionID: string;
  /** 问题类型 */
  QuestionType: string;
  /** 选项数组(仅在选择题有用) */
  Options: OptionResponse[];
  /** 数字填空数组(仅在数字填空题有用) */
  NumFillIns: NumFillInResponse[];
  /** 文本填空题(仅在文本填空题有用) */
  TextFillIns: TextFillInResponse[];
}

export interface NumFillInResponse {
  /** 答卷id */
  ResponseID: string;
  /** 数字填空id */
  NumFillInID: string;
  /** 问题id */
  QuestionID: string;
  /** 数字填空内容 */
  NumContent: number;
}

export interface TextFillInResponse {
  /** 答卷id */
  ResponseID: string;
  /** 文本填空id */
  TextFillInID: string;
  /** 问题id */
  QuestionID: string;
  /** 文本填空内容 */
  TextContent: string;
}

export interface OptionResponse {
  /** 答卷id */
  ResponseID: string;
  /** 选项id */
  OptionID: string;
  /** 选项内容 */
  OptionContent: string;
  /** 问题id */
  QuestionID: string;
  /** 是否被选 */
  IsSelect: boolean;
}

export interface RegisterModel {
  /**
   * @minLength 4
   * @maxLength 64
   */
  userName: string;
  /** @minLength 8 */
  password: string;
  /** @format email */
  email: string;
  /**
   * 邮箱验证码
   * @minLength 6
   * @maxLength 6
   * @pattern [0-9]{6}
   */
  emailCode: string;
}

export interface SendEmailCodeModel {
  /**
   * 邮箱
   * @format email
   */
  email: string;
}

export interface LoginModel {
  /**
   * 用户名或邮箱
   * @minLength 4
   * @maxLength 64
   */
  userName: string;
  /**
   * 密码
   * @minLength 8
   */
  password: string;
}

export interface UserProfileModel {
  userId: string;
  userName: string;
  email: string;
}

export interface ModifyPasswordModel {
  /** @minLength 8 */
  password: string;
  /** @format email */
  email: string;
  /**
   * 邮箱验证码
   * @minLength 6
   * @maxLength 6
   * @pattern [0-9]{6}
   */
  emailCode: string;
}

/** 选项信息 */
export interface OptionModel {
  /** 选项ID */
  OptionID: string;
  /** 问题ID */
  QuestionID: string;
  /** 选项内容 */
  OptionContent: string;
}

/** 文本填空信息 */
export interface TextFillInModel {
  /** 文本填空ID */
  TextFillInID: string;
  /** 问题ID */
  QuestionID: string;
  /** 文本内容 */
  TextContent: string;
}

/** 数字填空信息 */
export interface NumFillInModel {
  /** 数字填空ID */
  NumFillInID: string;
  /** 问题ID */
  QuestionID: string;
  /** 数字填空 */
  NumContent: number;
  /** 最大值 */
  MaxNum: number;
  /** 最小值 */
  LeastNum: number;
  /** 小数位数 */
  Precision: number;
}

export interface ResponseFormModel {
  /** 答卷ID */
  ResponseFormID: string;
  /**
   * 开始时间
   * @format date-time
   */
  StartTime: string;
  /**
   * 提交时间
   * @format date-time
   */
  SubmitTime: string;
  /**
   * 答题时长
   * @format date-time
   */
  AnswerTime: string;
  /** 来源渠道 */
  "Source ": string;
  /** IP */
  IP: string;
  /** 是否星标 */
  IsStar: boolean;
  /** 问卷ID */
  SurveyID: string;
  /** 问题列表 */
  Questions: ResponseQuestionModel[];
}

export interface ResponseBaseInfo {
  /** 答卷ID */
  ResponseFormID: string;
  /**
   * 开始时间
   * @format date-time
   */
  StartTime: string;
  /**
   * 提交时间
   * @format date-time
   */
  SubmitTime: string;
  /**
   * 答题时长
   * @format date-time
   */
  AnswerTime: string;
  /** 来源渠道 */
  "Source ": string;
  /** IP */
  IP: string;
  /** 是否星标 */
  IsStar: boolean;
}

export interface ResponseQuestionModel {
  /** 问题ID */
  QuestionID: string;
  /** 问题类型 */
  QuestionType: string;
  /** 选择题选项 */
  Options: ResponseOptionModel[];
  TextFillIns: ResponseTextFillInModel[];
  NumFillIns: ResponseNumFillInModel[];
}

export interface ResponseOptionModel {
  /** 选项ID */
  OptionID: string;
  /** 是否选择 */
  Value: boolean;
}

export interface ResponseTextFillInModel {
  /** 文本填空ID */
  TextFillInID: string;
  /** 文本填空内容 */
  Value: string;
}

export interface ResponseNumFillInModel {
  /** 数字填空ID */
  NumFillInID: string;
  /** 数字填空内容 */
  Value: number;
}

export interface TypeRequestResponseOfSelectionData {
  /** 响应信息 */
  message: string;
  /**
   * 状态码
   * @format int32
   */
  code: number;
  /** 该选项的选择次数 */
  num: number;
}

export interface RequestResponseOfTextData {
  /** 响应信息 */
  message: string;
  /**
   * 状态码
   * @format int32
   */
  code: number;
  /** 请求的文本数组 */
  stringarray: string[];
}

export interface TypeRequestResponseOfNumData {
  /** 响应信息 */
  message: string;
  /**
   * 状态码
   * @format int32
   */
  code: number;
  numarray: number[];
}

/** 请求响应 */
export interface StatusResponse {
  /** 响应信息 */
  message: string;
  /**
   * 状态码
   * @format int32
   */
  code: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    const debug_log_url = this.instance.defaults.baseURL + path;
    if (!debug_log_url) {
      throw new Error("Must provide a proper URL as target");
    }
    console.log(`Calling API: ${debug_log_url}`);

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

import useSWR, { MutatorOptions, SWRConfiguration, mutate } from "swr";

/**
 * @title SurveyFormPlatform
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  account = {
    /**
     * No description
     *
     * @tags Account
     * @name AccountLoginCreate
     * @summary 用户登录
     * @request POST:/api/account/login
     */
    accountLoginCreate: (data: LoginModel, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/account/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountLogoutCreate
     * @summary 用户退出
     * @request POST:/api/account/logout
     */
    accountLogoutCreate: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/account/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountModifyPasswordCreate
     * @summary 用户重置密码
     * @request POST:/api/account/modifyPassword
     */
    accountModifyPasswordCreate: (
      data: {
        /** @minLength 8 */
        password: string;
        /** @format email */
        email: string;
        /**
         * 邮箱验证码
         * @minLength 6
         * @maxLength 6
         * @pattern [0-9]{6}
         */
        emailCode: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/account/modifyPassword`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountProfileList
     * @summary 获取用户信息
     * @request GET:/api/account/profile
     */
    accountProfileList: (params: RequestParams = {}) =>
      this.request<UserProfileModel, StatusResponse>({
        path: `/api/account/profile`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Account
     * @name AccountProfileList
     * @summary 获取用户信息
     * @request GET:/api/account/profile
     */
    useAccountProfileList: (options?: SWRConfiguration, doFetch: boolean = true) =>
      useSWR<UserProfileModel, StatusResponse>(doFetch ? `/api/account/profile` : null, options),
    /**
     * No description
     *
     * @tags Account
     * @name AccountProfileList
     * @summary 获取用户信息
     * @request GET:/api/account/profile
     */
    mutateAccountProfileList: (data?: UserProfileModel | Promise<UserProfileModel>, options?: MutatorOptions) =>
      mutate<UserProfileModel>(`/api/account/profile`, data, options),

    /**
     * No description
     *
     * @tags Account
     * @name AccountRegisterCreate
     * @summary 用户注册
     * @request POST:/api/account/register
     */
    accountRegisterCreate: (data: RegisterModel, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/account/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountVerifyCreate
     * @summary 发送邮箱验证码
     * @request POST:/api/account/verify
     */
    accountVerifyCreate: (
      data: {
        /**
         * 邮箱
         * @format email
         */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/account/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  surveyManage = {
    /**
     * No description
     *
     * @tags SurveyManage
     * @name SurveyCopyCreate
     * @summary 问卷复制
     * @request POST:/api/survey/copy
     */
    surveyCopyCreate: (data: SurveyCopyModel, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/survey/copy`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SurveyManage
     * @name SurveyCreateCreate
     * @summary 问卷创建
     * @request POST:/api/survey/create
     */
    surveyCreateCreate: (
      data: {
        /** 标题 */
        title: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/survey/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SurveyManage
     * @name SurveyList
     * @summary 问卷列表获取
     * @request GET:/api/survey
     */
    surveyList: (
      query?: {
        count?: number;
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ArrayOfSurveyInfoModel, StatusResponse>({
        path: `/api/survey`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags SurveyManage
     * @name SurveyList
     * @summary 问卷列表获取
     * @request GET:/api/survey
     */
    useSurveyList: (
      query?: {
        count?: number;
        skip?: number;
      },
      options?: SWRConfiguration,
      doFetch: boolean = true,
    ) => useSWR<ArrayOfSurveyInfoModel, StatusResponse>(doFetch ? [`/api/survey`, query] : null, options),
    /**
     * No description
     *
     * @tags SurveyManage
     * @name SurveyList
     * @summary 问卷列表获取
     * @request GET:/api/survey
     */
    mutateSurveyList: (
      query?: {
        count?: number;
        skip?: number;
      },
      data?: ArrayOfSurveyInfoModel | Promise<ArrayOfSurveyInfoModel>,
      options?: MutatorOptions,
    ) => mutate<ArrayOfSurveyInfoModel>([`/api/survey`, query], data, options),

    /**
     * @description 目标状态只允许是 Ongoing / Suspended / Deleted
     *
     * @tags SurveyManage
     * @name SurveySwitchCreate
     * @summary 问卷开始/停止/删除
     * @request POST:/api/survey/switch
     */
    surveySwitchCreate: (
      data: {
        surveyId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/survey/switch`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  questionEdit = {
    /**
     * No description
     *
     * @tags QuestionEdit
     * @name EditDeleteDelete
     * @summary 问卷删除
     * @request DELETE:/api/edit/{surveyId}/delete
     */
    editDeleteDelete: (surveyId: string, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/edit/${surveyId}/delete`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description 问卷设计者可见的数据
     *
     * @tags QuestionEdit
     * @name EditMetaDetail
     * @summary 问卷元数据获取
     * @request GET:/api/edit/{surveyId}/meta
     */
    editMetaDetail: (surveyId: string, params: RequestParams = {}) =>
      this.request<
        {
          surveyId: string;
          accessId: string;
          userId: string;
          title: string;
          description: string;
          createTime: string;
          expireTime: string;
          lastUpdateTime: string;
          lastUpdateUser: string;
          status: string;
          responseCount: number;
          themeColor: number;
          textColor: number;
          pcBackgroundImage: null;
          pcBannerImage: null;
          footer: string;
          displayStyle: number;
          buttonText: string;
          startTime: string;
          endTime: string;
          dayStartTime: string;
          dayEndTime: string;
          passwordStrategy: number;
          password: null;
          maxResponseCount: number;
          browserLimit: boolean;
          ipLimit: boolean;
          keepContent: boolean;
          failMessage: string;
          showAfterSubmit: number;
          showContent: string;
        },
        StatusResponse
      >({
        path: `/api/edit/${surveyId}/meta`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description 问卷设计者可见的数据
     *
     * @tags QuestionEdit
     * @name EditMetaDetail
     * @summary 问卷元数据获取
     * @request GET:/api/edit/{surveyId}/meta
     */
    useEditMetaDetail: (surveyId: string, options?: SWRConfiguration, doFetch: boolean = true) =>
      useSWR<
        {
          surveyId: string;
          accessId: string;
          userId: string;
          title: string;
          description: string;
          createTime: string;
          expireTime: string;
          lastUpdateTime: string;
          lastUpdateUser: string;
          status: string;
          responseCount: number;
          themeColor: number;
          textColor: number;
          pcBackgroundImage: null;
          pcBannerImage: null;
          footer: string;
          displayStyle: number;
          buttonText: string;
          startTime: string;
          endTime: string;
          dayStartTime: string;
          dayEndTime: string;
          passwordStrategy: number;
          password: null;
          maxResponseCount: number;
          browserLimit: boolean;
          ipLimit: boolean;
          keepContent: boolean;
          failMessage: string;
          showAfterSubmit: number;
          showContent: string;
        },
        StatusResponse
      >(doFetch ? `/api/edit/${surveyId}/meta` : null, options),
    /**
     * @description 问卷设计者可见的数据
     *
     * @tags QuestionEdit
     * @name EditMetaDetail
     * @summary 问卷元数据获取
     * @request GET:/api/edit/{surveyId}/meta
     */
    mutateEditMetaDetail: (
      surveyId: string,
      data?:
        | {
            surveyId: string;
            accessId: string;
            userId: string;
            title: string;
            description: string;
            createTime: string;
            expireTime: string;
            lastUpdateTime: string;
            lastUpdateUser: string;
            status: string;
            responseCount: number;
            themeColor: number;
            textColor: number;
            pcBackgroundImage: null;
            pcBannerImage: null;
            footer: string;
            displayStyle: number;
            buttonText: string;
            startTime: string;
            endTime: string;
            dayStartTime: string;
            dayEndTime: string;
            passwordStrategy: number;
            password: null;
            maxResponseCount: number;
            browserLimit: boolean;
            ipLimit: boolean;
            keepContent: boolean;
            failMessage: string;
            showAfterSubmit: number;
            showContent: string;
          }
        | Promise<{
            surveyId: string;
            accessId: string;
            userId: string;
            title: string;
            description: string;
            createTime: string;
            expireTime: string;
            lastUpdateTime: string;
            lastUpdateUser: string;
            status: string;
            responseCount: number;
            themeColor: number;
            textColor: number;
            pcBackgroundImage: null;
            pcBannerImage: null;
            footer: string;
            displayStyle: number;
            buttonText: string;
            startTime: string;
            endTime: string;
            dayStartTime: string;
            dayEndTime: string;
            passwordStrategy: number;
            password: null;
            maxResponseCount: number;
            browserLimit: boolean;
            ipLimit: boolean;
            keepContent: boolean;
            failMessage: string;
            showAfterSubmit: number;
            showContent: string;
          }>,
      options?: MutatorOptions,
    ) =>
      mutate<{
        surveyId: string;
        accessId: string;
        userId: string;
        title: string;
        description: string;
        createTime: string;
        expireTime: string;
        lastUpdateTime: string;
        lastUpdateUser: string;
        status: string;
        responseCount: number;
        themeColor: number;
        textColor: number;
        pcBackgroundImage: null;
        pcBannerImage: null;
        footer: string;
        displayStyle: number;
        buttonText: string;
        startTime: string;
        endTime: string;
        dayStartTime: string;
        dayEndTime: string;
        passwordStrategy: number;
        password: null;
        maxResponseCount: number;
        browserLimit: boolean;
        ipLimit: boolean;
        keepContent: boolean;
        failMessage: string;
        showAfterSubmit: number;
        showContent: string;
      }>(`/api/edit/${surveyId}/meta`, data, options),

    /**
     * No description
     *
     * @tags QuestionEdit
     * @name EditQeditCreate
     * @summary 问卷编辑保存
     * @request POST:/api/edit/{surveyId}/qedit
     */
    editQeditCreate: (surveyId: string, data: SurveyModel, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/edit/${surveyId}/qedit`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 问卷设计者可见的所有题目含选项列表，具体响应格式稍后补充
     *
     * @tags QuestionEdit
     * @name EditQuestionsDetail
     * @summary 问卷题目信息获取
     * @request GET:/api/edit/{surveyId}/questions
     */
    editQuestionsDetail: (surveyId: string, params: RequestParams = {}) =>
      this.request<SurveyModel, StatusResponse>({
        path: `/api/edit/${surveyId}/questions`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description 问卷设计者可见的所有题目含选项列表，具体响应格式稍后补充
     *
     * @tags QuestionEdit
     * @name EditQuestionsDetail
     * @summary 问卷题目信息获取
     * @request GET:/api/edit/{surveyId}/questions
     */
    useEditQuestionsDetail: (surveyId: string, options?: SWRConfiguration, doFetch: boolean = true) =>
      useSWR<SurveyModel, StatusResponse>(doFetch ? `/api/edit/${surveyId}/questions` : null, options),
    /**
     * @description 问卷设计者可见的所有题目含选项列表，具体响应格式稍后补充
     *
     * @tags QuestionEdit
     * @name EditQuestionsDetail
     * @summary 问卷题目信息获取
     * @request GET:/api/edit/{surveyId}/questions
     */
    mutateEditQuestionsDetail: (
      surveyId: string,
      data?: SurveyModel | Promise<SurveyModel>,
      options?: MutatorOptions,
    ) => mutate<SurveyModel>(`/api/edit/${surveyId}/questions`, data, options),
  };
  respondentAccess = {
    /**
     * No description
     *
     * @tags RespondentAccess
     * @name RespondentQuestionsDetail
     * @summary 答题者问卷获取
     * @request GET:/api/respondent/{surveyId}/questions
     */
    respondentQuestionsDetail: (surveyId: string, params: RequestParams = {}) =>
      this.request<SurveyModel, StatusResponse>({
        path: `/api/respondent/${surveyId}/questions`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags RespondentAccess
     * @name RespondentQuestionsDetail
     * @summary 答题者问卷获取
     * @request GET:/api/respondent/{surveyId}/questions
     */
    useRespondentQuestionsDetail: (surveyId: string, options?: SWRConfiguration, doFetch: boolean = true) =>
      useSWR<SurveyModel, StatusResponse>(doFetch ? `/api/respondent/${surveyId}/questions` : null, options),
    /**
     * No description
     *
     * @tags RespondentAccess
     * @name RespondentQuestionsDetail
     * @summary 答题者问卷获取
     * @request GET:/api/respondent/{surveyId}/questions
     */
    mutateRespondentQuestionsDetail: (
      surveyId: string,
      data?: SurveyModel | Promise<SurveyModel>,
      options?: MutatorOptions,
    ) => mutate<SurveyModel>(`/api/respondent/${surveyId}/questions`, data, options),

    /**
     * No description
     *
     * @tags RespondentAccess
     * @name RespondentSubmitCreate
     * @summary 答题者答卷提交
     * @request POST:/api/respondent/{surveyId}/submit
     */
    respondentSubmitCreate: (surveyId: string, data: ResponseModel, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse>({
        path: `/api/respondent/${surveyId}/submit`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  responseDetail = {
    /**
     * No description
     *
     * @tags ResponseDetail
     * @name SurveyDetail
     * @summary 答卷信息获取
     * @request GET:/api/survey/{SurveyID}
     */
    surveyDetail: (surveyId: string, params: RequestParams = {}) =>
      this.request<ResponseModel[], StatusResponse>({
        path: `/api/survey/${surveyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags ResponseDetail
     * @name SurveyDetail
     * @summary 答卷信息获取
     * @request GET:/api/survey/{SurveyID}
     */
    useSurveyDetail: (surveyId: string, options?: SWRConfiguration, doFetch: boolean = true) =>
      useSWR<ResponseModel[], StatusResponse>(doFetch ? `/api/survey/${surveyId}` : null, options),
    /**
     * No description
     *
     * @tags ResponseDetail
     * @name SurveyDetail
     * @summary 答卷信息获取
     * @request GET:/api/survey/{SurveyID}
     */
    mutateSurveyDetail: (
      surveyId: string,
      data?: ResponseModel[] | Promise<ResponseModel[]>,
      options?: MutatorOptions,
    ) => mutate<ResponseModel[]>(`/api/survey/${surveyId}`, data, options),

    /**
     * No description
     *
     * @tags ResponseDetail
     * @name SurveyGetNumCreate
     * @summary 数字数据获取
     * @request POST:/api/survey/{SurveyID}/GetNum
     */
    surveyGetNumCreate: (
      surveyId: string,
      data: {
        NumFIllInID: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          numarray: number[];
        },
        any
      >({
        path: `/api/survey/${surveyId}/GetNum`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ResponseDetail
     * @name SurveyGetOptionCreate
     * @summary 选项数据获取
     * @request POST:/api/survey/{SurveyID}/GetOption
     */
    surveyGetOptionCreate: (
      surveyId: string,
      data: {
        OptionID: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          num: number;
        },
        any
      >({
        path: `/api/survey/${surveyId}/GetOption`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ResponseDetail
     * @name SurveyGetTextCreate
     * @summary 文本数据获取
     * @request POST:/api/survey/{SurveyID}/GetText
     */
    surveyGetTextCreate: (
      surveyId: string,
      data: {
        TextFillinID: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          stringarray: string[];
        },
        any
      >({
        path: `/api/survey/${surveyId}/GetText`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}

const api = new Api();
export default api;

export const fetcher = async (path: string, query?: Record<string, unknown>) => {
  return await api
    .request({ path, query })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data;
    });
};
