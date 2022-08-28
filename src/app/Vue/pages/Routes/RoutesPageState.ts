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

import axios, { AxiosResponse, AxiosError } from "axios";
import { deepClone, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";


export class Route extends CrudItem
{
	id: number;
	enable: boolean;
	protocol: string;
	protocol_data: any;
	domain_name: string;
	route: string;
	docker_name: string;
	target_port: number;
	route_prefix: string;
	layer_uid: string;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.enable = false;
		this.protocol = "";
		this.protocol_data = {};
		this.domain_name = "";
		this.route = "";
		this.docker_name = "";
		this.target_port = 0;
		this.route_prefix = "";
		this.layer_uid = "";
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
		else if (key == "enable") this.enable = value == "1" || value == "true";
		else if (key == "protocol") this.protocol = String(value);
		else if (key == "protocol_data")
		{
			let res = {
				"websocket": "0",
			};
			if (typeof value == "object" && value != null)
			{
				res["websocket"] = value.websocket || "0";
			}
			this.protocol_data = res;
		}
		else if (key == "domain_name") this.domain_name = String(value);
		else if (key == "route") this.route = String(value);
		else if (key == "docker_name") this.docker_name = String(value);
		else if (key == "route_prefix") this.route_prefix = String(value);
		else if (key == "layer_uid") this.layer_uid = String(value);
		else if (key == "target_port") this.target_port = Number(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class RoutesPageState extends CrudState<Route>
{
	
	/**
	 * Returns class
	 */
	getClass(): typeof RoutesPageState
	{
		return this.constructor as typeof RoutesPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return Route;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "routes";
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
		
		/* Protocol field */
		let protocol = new FieldInfo();
		protocol.name = "protocol";
		protocol.label = "Protocol";
		protocol.component = "Select";
		protocol.options = [
			new SelectOption().assignValues({ "id": "http", "value": "HTTP" }),
		];
		this.fields.push( deepClone(protocol) );
		
		/* Protocol field */
		let web_socket = new FieldInfo();
		web_socket.name = "protocol_data.websocket";
		web_socket.label = "Web socket";
		web_socket.component = "Select";
		web_socket.options = [
			new SelectOption().assignValues({ "id": 0, "value": "No" }),
			new SelectOption().assignValues({ "id": 1, "value": "Yes" }),
		];
		this.fields.push( deepClone(web_socket) );
		
		/* Domain name field */
		let domain_name = new FieldInfo();
		domain_name.name = "domain_name";
		domain_name.label = "Domain name";
		domain_name.component = "Select";
		domain_name.options = [];
		this.fields.push( deepClone(domain_name) );
		
		/* Route field */
		let route = new FieldInfo();
		route.name = "route";
		route.label = "Route";
		route.component = "Input";
		this.fields.push( deepClone(route) );
		
		/* Route prefix field */
		let target_prefix = new FieldInfo();
		target_prefix.name = "target_prefix";
		target_prefix.label = "Target prefix";
		target_prefix.component = "Input";
		this.fields.push( deepClone(target_prefix) );
		
		/* Target port field */
		let target_port = new FieldInfo();
		target_port.name = "target_port";
		target_port.label = "Target port";
		target_port.component = "Input";
		this.fields.push( deepClone(target_port) );
		
		/* Source port field */
		let source_port = new FieldInfo();
		source_port.name = "source_port";
		source_port.label = "Source port";
		source_port.component = "Input";
		this.fields.push( deepClone(source_port) );
		
		/* Docker name field */
		let docker_name = new FieldInfo();
		docker_name.name = "docker_name";
		docker_name.label = "Docker name";
		docker_name.component = "Select";
		docker_name.options = [];
		this.fields.push( deepClone(docker_name) );
		
		/* Enable field */
		let enable = new FieldInfo();
		enable.name = "enable";
		enable.label = "Enable";
		enable.component = "Select";
		enable.options =
		[
			new SelectOption().assignValues({"id": "0", "value": "No"}),
			new SelectOption().assignValues({"id": "1", "value": "Yes"}),
		];
		this.fields.push( deepClone(enable) );
		
		/* Docker name field */
		let nginx_config = new FieldInfo();
		nginx_config.name = "nginx_config";
		nginx_config.label = "Extended nginx config params";
		nginx_config.component = "TextArea";
		nginx_config.options = [];
		this.fields.push( deepClone(nginx_config) );
		
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
		this.form_save.fields.push( deepClone(enable) );
		this.form_save.fields.push( deepClone(protocol) );
		this.form_save.fields.push( deepClone(web_socket) );
		this.form_save.fields.push( deepClone(docker_name) );
		this.form_save.fields.push( deepClone(route) );
		this.form_save.fields.push( deepClone(domain_name) );
		this.form_save.fields.push( deepClone(source_port) );
		this.form_save.fields.push( deepClone(target_port) );
		this.form_save.fields.push( deepClone(target_prefix) );
		this.form_save.fields.push( deepClone(nginx_config) );
		
		/* Table fields */
		enable.component = "SelectLabel";
		route.component = "Label";
		protocol.component = "SelectLabel";
		docker_name.component = "SelectLabel";
		domain_name.component = "SelectLabel";
		source_port.component = "Label";
		target_port.component = "Label";
		target_prefix.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(enable) );
		this.fields_table.push( deepClone(protocol) );
		this.fields_table.push( deepClone(domain_name) );
		this.fields_table.push( deepClone(source_port) );
		this.fields_table.push( deepClone(route) );
		this.fields_table.push( deepClone(docker_name) );
		this.fields_table.push( deepClone(target_port) );
		this.fields_table.push( deepClone(target_prefix) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: Route | null): string
	{
		return (item) ? item.domain_name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: Route | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	 
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: Route | null): string
	{
		if (message_type == "list_title")
		{
			return "Routes";
		}
		else if (message_type == "item")
		{
			return "route";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
		
		if (kind == "onLoadPageList")
		{
			let response:AxiosResponse = params["response"] as AxiosResponse;
			
			this.setOptionsFromDictionary(
				response,
				["all"],
				"domain_name",
				"domains",
				function (domain: any)
				{
					return {
						"id": domain["domain_name"],
						"value": domain["domain_name"],
					};
				}
			);
			
			this.setOptionsFromDictionary(
				response,
				["all"],
				"docker_name",
				"services",
				function (domain: any)
				{
					return {
						"id": domain["docker_name"],
						"value": domain["docker_name"],
					};
				}
			);
			
		}
		
	}
}
