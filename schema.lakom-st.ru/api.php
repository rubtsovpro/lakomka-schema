<?php

declare(strict_types=1);

header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Content-Type: application/json; charset=utf-8');

require __DIR__.'/lib/BoardApi.php';

$route = trim((string) ($_GET['r'] ?? ''));
if ($route === '') {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '';
    if (preg_match('#/api/(comments|checks|presence)/?$#', $path, $m)) {
        $route = $m[1];
    }
}
if (! in_array($route, ['comments', 'checks', 'presence'], true)) {
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'not found'], JSON_UNESCAPED_UNICODE);
    exit;
}

$dataDir = getenv('SCHEMA_DATA_DIR') ?: '';
if ($dataDir === '' || ! is_dir($dataDir)) {
    // Outside webroot when deployed; local fallback under ./data
    $candidates = [
        '/var/www/schema-data',
        dirname(__DIR__).'/../schema-data',
        __DIR__.'/data',
    ];
    foreach ($candidates as $c) {
        if (is_dir($c) || @mkdir($c, 0775, true)) {
            $dataDir = $c;
            break;
        }
    }
}

$raw = file_get_contents('php://input');
$body = [];
if (is_string($raw) && $raw !== '') {
    $json = json_decode($raw, true);
    if (is_array($json)) {
        $body = $json;
    }
}
if ($body === [] && $_POST !== []) {
    $body = $_POST;
}

$login = (string) ($_SERVER['HTTP_X_SCHEMA_LOGIN'] ?? $body['login'] ?? $_COOKIE['schema_login'] ?? 'guest');
$name = (string) ($_SERVER['HTTP_X_SCHEMA_NAME'] ?? $body['name'] ?? $_COOKIE['schema_name'] ?? '');

$api = new BoardApi($dataDir);
$api->setUser($login, $name);

try {
    [$code, $payload] = $api->handle($route, $_SERVER['REQUEST_METHOD'] ?? 'GET', $_GET, $body);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'server'], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code($code);
echo json_encode($payload, JSON_UNESCAPED_UNICODE);
