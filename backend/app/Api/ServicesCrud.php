<?php

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

namespace App\Api;

use App\Docker;
use App\Models\Service;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\RenderContainer;
use TinyPHP\Exception\HttpMethodNotAllowedException;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class ServicesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Service::class;
	var $api_path = "services";
	
	
	/**
	 * Declare routes
	 */
	function routes(RouteCollector $routes)
	{
		parent::routes($routes);
		
		$routes->addRoute
		(
			'POST',
			'/' . $this->api_path . '/default/stop/{id}/',
			[$this, "actionStop"]
		);
		
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
					"service_id",
					"stack_name",
					"service_name",
					"software_api_name",
					"enable",
					"docker_name",
					"docker_image",
					"docker_json",
					"docker_balancer",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"service_id"]),
			new ReadOnly(["api_name"=>"gmtime_created"]),
			new ReadOnly(["api_name"=>"gmtime_updated"]),
			new JsonField([ "api_name" => "docker_json" ]),
			new JsonField([ "api_name" => "docker_balancer" ]),
		];
	}
	
	
	
	/**
	 * Find query
	 */
	public function findQuery($query)
	{
		return $query
			->where("is_deleted", "=", "0")
			->orderBy("docker_name", "asc")
		;
	}
	
	
	
	/**
	 * Action stop
	 */
	function doActionStop()
	{
		/* Find item */
		$this->findItem();
		
		/* Stop service */
		$result = Docker::removeService($this->item->docker_name);
		
		/* Set enable = 0 */
		$this->item->enable = 0;
		$this->item->is_deleted = true;
		$this->item->timestamp = time();
		$this->item->save();
		$this->item->refresh();
		
		/* From database */
		$this->new_data = $this->fromDatabase($this->item);
		
		/* Set result */
		$this->api_result->success(["item"=>$this->new_data], "Ok");
	}
	
	
	
	/**
	 * Create action
	 */
	function actionCreate(RenderContainer $container)
	{
		throw new HttpMethodNotAllowedException();
	}
	
	
	
	/**
	 * Edit action
	 */
	function actionEdit(RenderContainer $container)
	{
		throw new HttpMethodNotAllowedException();
	}
	
	
	
	/**
	 * Delete action
	 */
	function actionDelete(RenderContainer $container)
	{
		throw new HttpMethodNotAllowedException();
	}
}
