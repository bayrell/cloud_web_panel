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

namespace App\Routes;

use FastRoute\RouteCollector;
use TinyPHP\RenderContainer;


class DatabaseRoute
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteCollector $routes)
	{
		$routes->addRoute
		(
			'GET',
			'/database/',
			[$this, "actionDatabase"]
		);
		$routes->addRoute
		(
			['GET', 'POST'],
			'/database/adminer/',
			[$this, "actionAdminer"]
		);
	}
	
	
	
	/**
	 * Request before
	 */
	function request_before(RenderContainer $container)
	{
		return $container;
	}
	
	
	
	/**
	 * Request after
	 */
	function request_after(RenderContainer $container)
	{
		return $container;
	}
	
	
	
	/**
	 * Action database
	 */
	function actionDatabase(RenderContainer $container)
	{
		$container->setContext("host", getenv("DB_HOST"));
		$container->setContext("username", getenv("DB_USERNAME"));
		$container->setContext("password", getenv("DB_PASSWORD"));
		
		/* Set result */
		return $container->render("@app/database.html");
	}
	
	
	
	/**
	 * Adminer
	 */
	function actionAdminer(RenderContainer $container)
	{
		$file_path = ROOT_PATH . "/app/Templates/adminer-4.7.6.php";
		
		@ob_start();
		$_SERVER['REQUEST_URI'] = "/api" . $_SERVER['REQUEST_URI'];
		include $file_path;
		$content = ob_get_contents();
		@ob_end_clean();
		
		//$content = "";
		
		/* Set result */
		return $container->setContent($content);
	}
}