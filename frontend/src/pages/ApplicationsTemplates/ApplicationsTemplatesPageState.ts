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
import { CrudButton, CrudItem, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { DialogButton, DialogState } from "vue-helper/Crud/DialogState";
import { FormState } from "vue-helper/Crud/FormState";


export class ApplicationTemplate extends CrudItem
{
	id: number = 0;
	name: string = "";
	content: string = "";
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * Convert value
	 */
	convertValue(key:string, value:any)
	{
		if (key == "id") return Number(value);
		if (key == "name") return String(value);
		if (key == "content") return String(value);
		if (key == "gmtime_created") return String(value);
		if (key == "gmtime_updated") return String(value);
		return super.convertValue(key, value);
	}
	
}



export class ApplicationsTemplatesPageState extends CrudState
{
	form_run: FormState;
	dialog_run: DialogState;
	
	
	/**
	 * Init class
	 */
	init(params:any)
	{
		/* Init variables */
		this.form_run = new FormState();
		this.dialog_run = new DialogState();
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Returns new item
	 */
	static createNewItem(): ApplicationTemplate
	{
		return new ApplicationTemplate();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "applications_templates";
	}
	
	
	
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:applications:templates",
			"add": "app:applications:templates:add",
			"edit": "app:applications:templates:edit",
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
		
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.api_name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Input";
		this.fields.push( deepClone(stack_name) );
		
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
		content.component = "CodeMirror";
		content.component_params["lang"] = "xml";
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
		row_buttons.component_params["buttons"] = [
			new CrudButton().assignValues({ "type": "success", "label": "Run", "action": "run" }),
			new CrudButton().assignValues({ "type": "default", "label": "Edit", "action": "edit", "route": "app:applications:templates:edit" }),
			new CrudButton().assignValues({ "type": "danger", "label": "Delete", "action": "delete" }),
		];
		
		/* Form fields */
		this.form_save.fields.push( deepClone(name) );
		this.form_save.fields.push( deepClone(content) );
		
		/* Table fields */
		name.component = "Label";
		stack_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(row_buttons) );
		
		/* App name field */
		let app_name = new FieldInfo();
		app_name.api_name = "app_name";
		app_name.label = "app_name";
		app_name.component = "Input";
		this.form_run.fields.push( deepClone(app_name) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: ApplicationTemplate | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: ApplicationTemplate | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: ApplicationTemplate | null): string
	{
		if (message_type == "form_run_title")
		{
			return "Do you sure to run application \"" + this.getItemName(item) + "\" ?";
		}
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
	
	
	
	/**
	 * Show run form
	 */
	showRunForm(item:any)
	{
		this.form_run.clear();
		this.form_run.setItem(item);
		this.dialog_run.clear();
		this.dialog_run.show();
	}
	
}