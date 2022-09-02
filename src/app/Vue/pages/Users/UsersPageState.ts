/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2022 "Ildar Bikmamatov" <support@bayrell.org>
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

import { deepClone, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";



export class User extends CrudItem
{
	id: number;
	login: string;
	name: string;
	banned: number;
	is_deleted: number;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.login = "";
		this.name = "";
		this.banned = 0;
		this.is_deleted = 0;
		this.gmtime_created = "";
		this.gmtime_updated = "";
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Assign value
	 */
	assignValue(key:string, value:any)
	{
		if (key == "id") this.id = Number(value);
		else if (key == "login") this.login = String(value);
		else if (key == "name") this.name = String(value);
		else if (key == "banned") this.banned = Number(value);
		else if (key == "is_deleted") this.is_deleted = Number(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class UsersPageState extends CrudState<User>
{
	
	/**
	 * Returns class
	 */
	getClass(): typeof UsersPageState
	{
		return this.constructor as typeof UsersPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return User;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "users";
	}
	
	
	
	/**
	 * Crud init
	 */
	initCrud()
	{
		/* ID field */
		let id = new FieldInfo();
		id.name = "id";
		id.primary = true;
		this.fields.push( deepClone(id) );
		
		/* Login field */
		let login = new FieldInfo();
		login.name = "login";
		login.label = "Login";
		login.component = "Input";
		this.fields.push( deepClone(login) );
		
		/* Name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "Name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Password field */
		let password1 = new FieldInfo();
		password1.name = "password1";
		password1.label = "Password";
		password1.component = "Input";
		password1.type = "password";
		this.fields.push( deepClone(password1) );
		
		/* Password field */
		let password2 = new FieldInfo();
		password2.name = "password2";
		password2.label = "Repeat password";
		password2.component = "Input";
		password2.type = "password";
		this.fields.push( deepClone(password2) );
		
		/* Banned field */
		let banned = new FieldInfo();
		banned.name = "banned";
		banned.label = "Banned";
		banned.component = "Select";
		banned.options =
		[
			new SelectOption().assignValues({"id": "0", "value": "No"}),
			new SelectOption().assignValues({"id": "1", "value": "Yes"}),
		];
		this.fields.push( deepClone(banned) );
		
		/* Is deleted field */
		let is_deleted = new FieldInfo();
		is_deleted.name = "is_deleted";
		is_deleted.label = "Is deleted";
		is_deleted.component = "Select";
		is_deleted.options =
		[
			new SelectOption().assignValues({"id": "0", "value": "No"}),
			new SelectOption().assignValues({"id": "1", "value": "Yes"}),
		];
		this.fields.push( deepClone(is_deleted) );
		
		/* Row number */
		let row_number = new FieldInfo();
		row_number.name = "row_number";
		row_number.label = "";
		row_number.component = "RowNumber";
		
		/* Row buttons */
		let row_buttons = new FieldInfo();
		row_buttons.name = "row_buttons";
		row_buttons.label = "";
		row_buttons.component = "RowButtons";
		
		/* Form fields */
		this.form_save.fields.push( deepClone(login) );
		this.form_save.fields.push( deepClone(name) );
		this.form_save.fields.push( deepClone(banned) );
		this.form_save.fields.push( deepClone(is_deleted) );
		this.form_save.fields.push( deepClone(password1) );
		this.form_save.fields.push( deepClone(password2) );
		
		/* Table fields */
		login.component = "Label";
		name.component = "Label";
		banned.component = "SelectLabel";
		is_deleted.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(login) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(banned) );
		this.fields_table.push( deepClone(is_deleted) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: User | null): string
	{
		return (item) ? item.login : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: User | null): string
	{
		if (message_type == "list_title")
		{
			return "Users";
		}
		else if (message_type == "item")
		{
			return "user";
		}
		return super.getMessage(message_type, item);
	}
}