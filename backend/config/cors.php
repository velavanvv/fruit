<?php

// config/cors.php (create if doesn't exist)
return [
    'paths' => ['api/*', 'sanctum/*', 'login', 'register'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'], // Your frontend URL
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // This is crucial
];
