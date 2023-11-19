#!/usr/bin/php
<?php

exit(0);

ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(-1);

/* Init context */
$init = require_once __DIR__ . "/init.php";

/* Add modules */
$init["modules"][] = "Bayrell.CloudOS.Console";

/* Run console app */
$exit_code = \Runtime\rtl::runApp(
    
    /* Entry point */
    'Bayrell.CloudOS.Console.Main',
    
    /* Modules */
    $init["modules"],
    
    /* Context parameters */
    [
        'cli_args' => \Runtime\Collection::from($argv),
    ]
);
exit($exit_code);
