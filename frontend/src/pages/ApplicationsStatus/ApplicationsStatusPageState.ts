/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2021 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { deepClone } from "vue-helper";
import { CrudItem, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { ApplicationModificator } from "../ApplicationsModificators/ApplicationsModificatorsPageState";
import { ApplicationTemplate } from "../ApplicationsTemplates/ApplicationsTemplatesPageState";



export class ApplicationStatus extends CrudItem
{
	id: number = 0;
	name: string = "";
	template: ApplicationTemplate | null = null;
	modificators: Array<number> = [];
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): ApplicationStatus
	{
		this.id = Number(params["id"] || this.id);
		this.name = String(params["name"] || this.name);
		this.gmtime_created = String(params["gmtime_created"] || this.gmtime_created);
		this.gmtime_updated = String(params["gmtime_updated"] || this.gmtime_updated);
		
		/* Set template */
		if (params["template"])
		{
			this.template = new ApplicationTemplate();
			this.template.assignValues(params["template"]);
		}
		
		/* Set modificators */
		if (params["modificators"] && params["modificators"] instanceof Array)
		{
			this.modificators = params["modificators"].map
			(
				(item: any) => { return Number(item); }
			);
		}
		
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		let res: Record<string, any> = super.getValues();
		return Object.assign(res, {
			"id": this.id,
			"name": this.name,
			"template": this.template,
			"modificators": this.modificators,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		});
	}
}



export class ApplicationsStatusPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	static createNewItem(): ApplicationStatus
	{
		return new ApplicationStatus();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "applications";
	}
	
	
	
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:applications:status",
			"edit": "app:applications:status:edit",
		};
	}
	
	
	 
	/**
	 * Crud init
	 */
	crudInit()
	{
		/* ID field */
		let id = new FieldInfo();
		id.api_name = "id";
		id.primary = true;
		this.fields.push( deepClone(id) );
		
		/* Name field */
		let name = new FieldInfo();
		name.api_name = "name";
		name.label = "name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Content field */
		let content = new FieldInfo();
		content.api_name = "content";
		content.label = "Content";
		content.component = "TextArea";
		this.fields.push( deepClone(content) );
		
		/* Row number */
		let row_number = new FieldInfo();
		row_number.api_name = "row_number";
		row_number.label = "";
		row_number.component = "RowNumber";
		
		/* Row buttons */
		let row_buttons = new FieldInfo();
		row_buttons.api_name = "row_buttons";
		row_buttons.label = "";
		row_buttons.component = "RowButtons";
		
		/* Form fields */
		this.form_save.fields.push( deepClone(name) );
		
		/* Table fields */
		name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: ApplicationStatus | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: ApplicationStatus | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: ApplicationStatus | null): string
	{
		if (message_type == "dialog_delete_title")
		{
			return "Delete application";
		}
		if (message_type == "dialog_delete_text")
		{
			return "Do you sure to delete application \"" + this.getItemName(item) + "\" ?";
		}
		return super.getMessage(message_type, item);
	}
	
}