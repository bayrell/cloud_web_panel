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

use App\Models\Space;
use App\Models\DockerService;
use App\Models\DomainSSLGroup;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\RouteList;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\Nullable;
use TinyPHP\Rules\ReadOnly;


class DomainsSSLGroupCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = DomainSSLGroup::class;
	var $api_name = "domains_ssl_groups";
	
	
	/**
	 * Declare routes
	 */
	function routes(RouteList $routes)
	{
		parent::routes($routes);
		
		/* Generate service */
		$routes->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/generate/",
			"name" => "api:" . $this->api_name . ":generate",
			"method" => [$this, "actionGenerate"],
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
					"name",
					"cert_info",
					"container_name",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "cert_info" ]),
			new Dictionary([
				"api_name" => "services",
				"class_name" => DockerService::class,
				"buildSearchQuery" => function ($route, $action, $query){
					$query
						->where("is_deleted", "=", "0")
						->orderBy("docker_name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"service_id",
					"docker_name",
				],
			]),
		];
	}
	
	
	
	/**
	 * Action generate
	 */
	function actionGenerate()
	{
		$result = [];
		
		$this->findItem();
		
		if ($this->item)
		{
			$container_name = $this->item->container_name;
			$container_name .= ".bus";
			
			$res = \TinyPHP\Bus::call
			(
				"/" . $container_name . "/ssl/generate/",
				[
					"group_id" => $this->item->id,
				]
			);
			
			$res->debug();
			
			if ($res->isSuccess())
			{
				$content = $res->result["content"];
				$result = [
					"content" => $content,
				];
				
				$error_str = $res->error_str;
				$this->api_result->success($result, $error_str);
			}
			
			else
			{
				$this->api_result->error($result, $res->error_str);
			}
		}
		
		$this->buildResponse("actionGenerate");
	}
	
}
