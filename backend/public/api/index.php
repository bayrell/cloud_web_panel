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

require_once __DIR__ . "/../../vendor/autoload.php";

/* Remove api */
$uri = $_SERVER['REQUEST_URI'];
$uri = preg_replace("/^\/api/", "", $uri);
$_SERVER['REQUEST_URI'] = $uri;

/* Run app */
\TinyPHP\Core::start( __DIR__ . "/../../defs.php" );
$app = app();
$app->init();
$app->run();
