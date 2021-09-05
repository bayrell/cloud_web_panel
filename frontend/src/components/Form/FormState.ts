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

import { BaseObject } from "vue-helper";
import { FieldInfo } from "@/components/Crud";


export class FormState extends BaseObject
{
	title: string = "";
	fields: Array<FieldInfo> = [];
	item: Record<string, any> = {};
	item_original: Record<string, any> = {};
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): FormState
	{
		this.fields = params["fields"] || this.fields;
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		return {
			"fields": this.fields,
		};
	}
	
	
	/**
	 * Returns form value
	 */
	getItemValue(api_name: string): any
	{
		if (this.item[api_name] != undefined)
		{
			return this.item[api_name];
		}
		return "";
	}
	
	
	/**
	 * Set form value
	 */
	setItemValue(api_name: string, value: string)
	{
		this.item[api_name] = value;
	}
}