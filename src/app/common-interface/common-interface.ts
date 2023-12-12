import { E_ActionType, E_SelectMode } from "../Enum/enum";
export interface I_ColumnDef{
  Field : string,
  Name? : string,
  DataType? : string,
}
export interface IActionDef {
  Id: any | null;
  Name: any | null;
  MethodType?: E_ActionType | null;
  selectMode?: E_SelectMode | null;
}
export interface ISelectOptions {
  Id: number | null;
  Name: string | null;
}
export interface IsHideButton{
  Delete:boolean;
  Edit:boolean;
  Create:boolean;
  All:boolean;
}
export interface I_Data{
EntityTypeId:string |null;
RecId?:string |null;
RecVersion?:string |null;
CaseId?:string | null;
CreatedDatetime?:string | null;
AgentName?:string | null;
Field?:string |null;
}