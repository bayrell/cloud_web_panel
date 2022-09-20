<?php

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

namespace App\Api;

use App\Docker;
use App\Models\Domain;
use App\Models\User;
use App\Models\UserAuth;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class UsersCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = User::class;
	var $api_name = "users";
	
	
	/**
	 * Get rules
	 */
	function getRules()
	{
		return
		[
			new AllowFields
			([
				"fields" =>
				[
					"id",
					"login",
					"name",
					"banned",
					"is_deleted",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
		];
	}
	
	
	
	/**
	 * Validate
	 */
	function validate($action)
	{
		if ($action == "actionCreate" || $action == "actionUpdate")
		{
			$password1 = isset($this->update_data["password1"]) ?
				$this->update_data["password1"] : "";
			$password2 = isset($this->update_data["password2"]) ?
				$this->update_data["password2"] : "";
			
			if ($password1 != "" && $password1 != $password2)
			{
				throw new \Exception("Password mismatch");
			}
		}
	}
	
	
	
	/**
	 * Process after
	 */
	function processAfter($action)
	{
		if ($action == "actionCreate" || $action == "actionUpdate")
		{
			$user_id = $this->item->id;
			$password1 = isset($this->update_data["password1"]) ?
				$this->update_data["password1"] : "";
			
			if ($password1 != "")
			{
				$auth = UserAuth::findOrCreate([
					"user_id" => $user_id,
					"method" => "password",
				]);
				$auth->value = password_hash($password1, PASSWORD_BCRYPT);
				$auth->save();
			}
		}
	}
	
}
