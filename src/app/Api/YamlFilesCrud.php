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
use App\Models\DockerYamlFile;
use App\Models\Stack;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\ReadOnly;
use TinyPHP\Utils;


class YamlFilesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = DockerYamlFile::class;
	var $api_name = "yaml_files";

	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		parent::routes($route_container);
		
		/* Compose */
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/compose/",
			"name" => "api:" . $this->api_name . ":compose",
			"method" => [$this, "actionCompose"],
		]);
	}
	
	
	
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
					"file_name",
					"stack_name",
					"content",
					"app_status",
					"timestamp",
					"is_deleted",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
			
			new Dictionary([
				"api_name" => "stacks",
				"class_name" => Stack::class,
				"buildSearchQuery" => function ($route, $action, $query){
					$query
						->orderBy("stack_name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"stack_name",
				],
			]),
		];
	}

	
	
	/**
	 * Find query
	 */
	public function buildSearchQuery($action, $query)
	{
		return $query
			->orderBy("stack_name", "asc")
			->orderBy("file_name", "asc")
		;
	}
	
	
	
	/**
	 * Action compose
	 */
	function actionCompose()
	{
		/* Save */
		$this->actionUpdate();
		
		/* Compose */
		if ($this->item)
		{
			$result = Docker::composeYamlFile($this->item->id);
			$this->api_result->error_str = $result;
		}
	}
	
}
