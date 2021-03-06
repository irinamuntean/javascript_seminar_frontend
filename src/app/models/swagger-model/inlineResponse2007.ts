/**
 * globy-backend
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ClassesclassIdprojectsClasses } from './classesclassIdprojectsClasses';

export interface InlineResponse2007 { 
    id?: string;
    classes?: Array<ClassesclassIdprojectsClasses>;
    state?: InlineResponse2007.StateEnum;
    messages?: Array<Array<any>>;
    meetings?: Array<any>;
}
export namespace InlineResponse2007 {
    export type StateEnum = 'pending' | 'ongoing' | 'done';
    export const StateEnum = {
        Pending: 'pending' as StateEnum,
        Ongoing: 'ongoing' as StateEnum,
        Done: 'done' as StateEnum
    };
}