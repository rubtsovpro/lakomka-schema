<?php

declare(strict_types=1);

/**
 * Board storage API for schema.lakom-st.ru (plain PHP, no framework).
 */
class BoardApi
{
    private string $dataDir;
    private string $login = 'guest';
    private string $userName = 'Гость';

    public function __construct(string $dataDir)
    {
        $this->dataDir = rtrim($dataDir, '/');
        if (! is_dir($this->dataDir)) {
            mkdir($this->dataDir, 0775, true);
        }
    }

    public function setUser(string $login, string $name = ''): void
    {
        $login = trim($login);
        if ($login !== '') {
            $this->login = preg_replace('/[^a-zA-Z0-9_.@-]/', '', $login) ?: 'guest';
        }
        $name = trim($name);
        $this->userName = $name !== '' ? mb_substr($name, 0, 80) : $this->login;
    }

    public function handle(string $route, string $method, array $query, array $body): array
    {
        $method = strtoupper($method);
        return match ($route) {
            'comments' => $this->comments($method, $query, $body),
            'checks' => $this->checks($method, $query, $body),
            'presence' => $this->presence($method, $query, $body),
            default => [404, ['ok' => false, 'error' => 'not found']],
        };
    }

    private function comments(string $method, array $query, array $body): array
    {
        if ($method === 'POST') {
            return $this->storeComment($body);
        }
        $data = $this->readStore();
        $node = trim((string) ($query['node'] ?? ''));
        if ($node === '') {
            $counts = [];
            $feed = [];
            foreach ($data['nodes'] as $id => $rows) {
                if (! is_array($rows)) {
                    continue;
                }
                $counts[$id] = count($rows);
                foreach ($rows as $row) {
                    if (! is_array($row)) {
                        continue;
                    }
                    $feed[] = array_merge($row, ['node' => (string) $id]);
                }
            }
            usort($feed, static fn ($a, $b) => strcmp((string) ($b['ts'] ?? ''), (string) ($a['ts'] ?? '')));

            return [200, ['ok' => true, 'counts' => $counts, 'feed' => $feed]];
        }
        if (! $this->validNode($node)) {
            return [422, ['ok' => false, 'error' => 'неверный блок']];
        }

        return [200, ['ok' => true, 'items' => $data['nodes'][$node] ?? []]];
    }

    private function storeComment(array $body): array
    {
        $node = trim((string) ($body['node'] ?? ''));
        $text = trim((string) ($body['text'] ?? ''));
        $parent = trim((string) ($body['parent'] ?? ''));
        if (! $this->validNode($node)) {
            return [422, ['ok' => false, 'error' => 'неверный блок']];
        }
        if ($text === '' || mb_strlen($text) > 2000) {
            return [422, ['ok' => false, 'error' => 'текст 1–2000 символов']];
        }
        $item = [
            'id' => 'c'.bin2hex(random_bytes(6)),
            'parent' => $parent !== '' ? $parent : null,
            'user' => $this->userName,
            'login' => $this->login,
            'text' => $text,
            'ts' => date('c'),
        ];
        $this->withStore(function (array &$data) use ($node, &$item, $parent) {
            if (! isset($data['nodes'][$node])) {
                $data['nodes'][$node] = [];
            }
            if ($parent) {
                $found = false;
                foreach ($data['nodes'][$node] as $row) {
                    if (($row['id'] ?? '') === $parent) {
                        $found = true;
                        break;
                    }
                }
                if (! $found) {
                    $item['parent'] = null;
                }
            }
            $data['nodes'][$node][] = $item;
        });

        return [200, ['ok' => true, 'item' => $item]];
    }

    private function checks(string $method, array $query, array $body): array
    {
        if ($method === 'GET') {
            return [200, $this->boardPayload()];
        }
        $schemaAction = trim((string) ($body['schema_action'] ?? ''));
        if ($schemaAction === 'save_version') {
            if (array_key_exists('edits', $body)) {
                $this->writeEdits($this->sanitizeEdits($body['edits']));
            }
            $name = trim((string) ($body['version_name'] ?? ''));
            if ($name === '' || mb_strlen($name) > 80) {
                return [422, ['ok' => false, 'error' => 'название версии 1–80 символов']];
            }
            $this->pushVersion($name, $this->login, $this->userName);

            return [200, $this->boardPayload()];
        }
        if ($schemaAction === 'restore_version') {
            $id = trim((string) ($body['version_id'] ?? ''));
            if (! $this->restoreVersion($id)) {
                return [404, ['ok' => false, 'error' => 'версия не найдена']];
            }

            return [200, $this->boardPayload()];
        }
        if (array_key_exists('edits', $body) && trim((string) ($body['node'] ?? '')) === '') {
            $this->writeEdits($this->sanitizeEdits($body['edits']));

            return [200, $this->boardPayload()];
        }
        if (array_key_exists('open', $body) && trim((string) ($body['node'] ?? '')) === '') {
            $this->writeTreeOpen($this->sanitizeOpen($body['open']));

            return [200, $this->boardPayload()];
        }
        $node = trim((string) ($body['node'] ?? ''));
        if (! $this->validNode($node)) {
            return [422, ['ok' => false, 'error' => 'неверный блок']];
        }
        $on = ! empty($body['checked']) && $body['checked'] !== '0' && $body['checked'] !== false;
        $row = [
            'login' => $this->login,
            'user' => $this->userName,
            'ts' => date('c'),
        ];
        $this->withChecks(function (array &$data) use ($node, $on, $row) {
            if ($on) {
                $data['nodes'][$node] = $row;
            } else {
                unset($data['nodes'][$node]);
            }
        });

        return [200, ['ok' => true, 'checked' => $on, 'item' => $on ? $row : null]];
    }

    private function presence(string $method, array $query, array $body): array
    {
        $cid = trim((string) ($body['cid'] ?? $query['cid'] ?? ''));
        if (! preg_match('/^[a-zA-Z0-9_-]{8,64}$/', $cid)) {
            $cid = '';
        }
        $now = time();
        $me = null;
        if ($method === 'POST') {
            if ($cid === '') {
                return [422, ['ok' => false, 'error' => 'cid']];
            }
            $leave = ! empty($body['leave']) && $body['leave'] !== '0' && $body['leave'] !== false;
            if ($leave) {
                $this->withPresence(function (array &$data) use ($cid) {
                    unset($data['users'][$cid]);
                });
            } else {
                $bx = $body['bx'] ?? null;
                $by = $body['by'] ?? null;
                if (! is_numeric($bx) || ! is_numeric($by)) {
                    return [422, ['ok' => false, 'error' => 'координаты']];
                }
                $bx = round((float) $bx, 1);
                $by = round((float) $by, 1);
                $this->withPresence(function (array &$data) use ($cid, $bx, $by, $now) {
                    $taken = [];
                    foreach ($data['users'] as $id => $row) {
                        if ((string) $id === $cid || ! is_array($row)) {
                            continue;
                        }
                        $n = (string) ($row['nick'] ?? '');
                        if ($n !== '') {
                            $taken[$n] = true;
                        }
                    }
                    $prev = is_array($data['users'][$cid] ?? null) ? $data['users'][$cid] : [];
                    $nick = (string) ($prev['nick'] ?? '');
                    $emoji = (string) ($prev['emoji'] ?? '');
                    $hue = (int) ($prev['hue'] ?? -1);
                    if ($nick === '' || $emoji === '' || $hue < 0) {
                        $fresh = $this->animalNick($cid, $taken);
                        $nick = $fresh['nick'];
                        $emoji = $fresh['emoji'];
                        $hue = $fresh['hue'];
                    }
                    $data['users'][$cid] = [
                        'cid' => $cid,
                        'nick' => $nick,
                        'emoji' => $emoji,
                        'hue' => $hue,
                        'bx' => $bx,
                        'by' => $by,
                        't' => $now,
                    ];
                });
            }
            if (! $leave && array_key_exists('open', $body)) {
                $this->writeTreeOpen($this->sanitizeOpen($body['open']));
            }
        }

        $others = [];
        $data = $this->readPresence();
        foreach ($data['users'] as $id => $row) {
            if (! is_array($row) || (int) ($row['t'] ?? 0) < $now - 20) {
                continue;
            }
            $item = $this->presencePublic($row, (string) $id);
            if ((string) $id === $cid) {
                $me = $item;
                continue;
            }
            $others[] = $item;
        }

        return [200, array_merge($this->boardPayload(), [
            'me' => $me,
            'users' => $others,
        ])];
    }

    private function presencePublic(array $row, string $id): array
    {
        $hue = (int) ($row['hue'] ?? 200);
        if ($hue < 0 || $hue > 359) {
            $hue = 200;
        }

        return [
            'cid' => (string) ($row['cid'] ?? $id),
            'nick' => (string) ($row['nick'] ?? 'Гость'),
            'emoji' => (string) ($row['emoji'] ?? '🐾'),
            'hue' => $hue,
            'color' => 'hsl('.$hue.' 70% 42%)',
            'bx' => (float) ($row['bx'] ?? 0),
            'by' => (float) ($row['by'] ?? 0),
        ];
    }

    private function animalNick(string $cid, array $taken): array
    {
        $adjs = [
            'Сонный', 'Рыжий', 'Полосатый', 'Пушистый', 'Морской', 'Ночной',
            'Быстрый', 'Тихий', 'Храбрый', 'Золотой', 'Снежный', 'Пятнистый',
            'Весёлый', 'Важный', 'Лунный', 'Огненный', 'Лесной', 'Бирюзовый',
            'Дымчатый', 'Янтарный', 'Анонимный', 'Мохнатый', 'Речной', 'Горный',
        ];
        $animals = [
            ['котик', '🐱'], ['котёнок', '🐈'], ['кит', '🐋'], ['китёнок', '🐳'],
            ['акула', '🦈'], ['акулёнок', '🦈'], ['щенок', '🐶'], ['тигрёнок', '🐯'],
            ['лис', '🦊'], ['енот', '🦝'], ['пингвин', '🐧'], ['хомяк', '🐹'],
            ['ёж', '🦔'], ['волк', '🐺'], ['заяц', '🐰'], ['дельфин', '🐬'],
            ['медвежонок', '🐻'], ['капибара', '🦫'], ['тюлень', '🦭'], ['дракон', '🐲'],
            ['краб', '🦀'], ['попугай', '🦜'], ['олень', '🦌'], ['совушка', '🦉'],
        ];
        $h = crc32($cid);
        if ($h < 0) {
            $h += 4294967296;
        }
        $nAdj = count($adjs);
        $nAn = count($animals);
        $n = $nAdj * $nAn;
        for ($i = 0; $i < $n; $i++) {
            $idx = (int) (($h + $i) % $n);
            $animal = $animals[$idx % $nAn];
            $adj = $adjs[(int) floor($idx / $nAn) % $nAdj];
            $nick = $adj.' '.$animal[0];
            if (! isset($taken[$nick])) {
                return [
                    'nick' => $nick,
                    'emoji' => $animal[1],
                    'hue' => (int) (($h + $i * 47) % 360),
                ];
            }
        }

        return ['nick' => 'Гость '.substr($cid, -4), 'emoji' => '🐾', 'hue' => (int) ($h % 360)];
    }

    private function validNode(string $node): bool
    {
        return (bool) preg_match('/^[a-zA-Z0-9_-]{1,64}$/', $node);
    }

    private function path(string $file): string
    {
        return $this->dataDir.'/'.$file;
    }

    private function boardPayload(): array
    {
        $tree = $this->readTree();
        $data = $this->readChecks();
        $edits = $this->readEdits();

        return [
            'ok' => true,
            'nodes' => $data['nodes'],
            'rev' => (string) ($data['rev'] ?? ''),
            'open' => $tree['open'],
            'openRev' => $tree['rev'],
            'checked' => $data['nodes'],
            'checksRev' => (string) ($data['rev'] ?? ''),
            'edits' => $edits['data'],
            'editsRev' => $edits['rev'],
            'versions' => $this->versionsPublic(),
        ];
    }

    private function sanitizeOpen($raw): array
    {
        $out = ['root' => true];
        if (! is_array($raw)) {
            return $out;
        }
        $n = 0;
        foreach ($raw as $id => $on) {
            if ($n >= 400) {
                break;
            }
            $id = (string) $id;
            if (! $this->validNode($id)) {
                continue;
            }
            if ($on === true || $on === 1 || $on === '1') {
                $out[$id] = true;
                $n++;
            }
        }
        $out['root'] = true;

        return $out;
    }

    private function readTree(): array
    {
        $path = $this->path('schema_map_tree.json');
        if (! is_file($path)) {
            return ['open' => null, 'rev' => ''];
        }
        $raw = file_get_contents($path);
        $json = is_string($raw) ? json_decode($raw, true) : null;
        if (! is_array($json) || ! isset($json['open']) || ! is_array($json['open'])) {
            return ['open' => null, 'rev' => ''];
        }

        return [
            'open' => $this->sanitizeOpen($json['open']),
            'rev' => (string) ($json['rev'] ?? ''),
        ];
    }

    private function writeTreeOpen(array $open): void
    {
        $this->writeJsonAtomic($this->path('schema_map_tree.json'), [
            'open' => $open,
            'rev' => (string) round(microtime(true) * 1000),
        ]);
    }

    private function readEdits(): array
    {
        $empty = [
            'titles' => [], 'extra' => [], 'parents' => [],
            'links' => null, 'removed' => [], 'loose' => [],
        ];
        $path = $this->path('schema_map_edits.json');
        if (! is_file($path)) {
            return ['data' => $empty, 'rev' => ''];
        }
        $raw = file_get_contents($path);
        $json = is_string($raw) ? json_decode($raw, true) : null;
        if (! is_array($json)) {
            return ['data' => $empty, 'rev' => ''];
        }
        $data = is_array($json['data'] ?? null) ? $json['data'] : $json;

        return [
            'data' => $this->sanitizeEdits($data),
            'rev' => (string) ($json['rev'] ?? ''),
        ];
    }

    private function sanitizeEdits($raw): array
    {
        $out = [
            'titles' => [], 'extra' => [], 'parents' => [],
            'links' => null, 'removed' => [], 'loose' => [],
        ];
        if (! is_array($raw)) {
            return $out;
        }
        $kinds = ['check', 'route', 'task', 'onec', 'result', 'open'];
        $n = 0;
        foreach ((array) ($raw['titles'] ?? []) as $id => $title) {
            if ($n >= 500) {
                break;
            }
            $id = (string) $id;
            if (! $this->validNode($id)) {
                continue;
            }
            $title = trim((string) $title);
            if ($title === '') {
                continue;
            }
            $out['titles'][$id] = mb_substr($title, 0, 200);
            $n++;
        }
        $n = 0;
        foreach ((array) ($raw['extra'] ?? []) as $row) {
            if ($n >= 200 || ! is_array($row)) {
                continue;
            }
            $id = (string) ($row['id'] ?? '');
            $parent = (string) ($row['parent'] ?? 'root');
            if (! $this->validNode($id) || ! $this->validNode($parent)) {
                continue;
            }
            $title = trim((string) ($row['title'] ?? 'Новый блок'));
            if ($title === '') {
                $title = 'Новый блок';
            }
            $kind = (string) ($row['kind'] ?? 'task');
            if (! in_array($kind, $kinds, true)) {
                $kind = 'task';
            }
            $item = [
                'id' => $id,
                'title' => mb_substr($title, 0, 200),
                'kind' => $kind,
                'parent' => $parent,
                'loose' => ! empty($row['loose']),
            ];
            $after = (string) ($row['after'] ?? '');
            $before = (string) ($row['before'] ?? '');
            if ($after !== '' && $this->validNode($after)) {
                $item['after'] = $after;
            }
            if ($before !== '' && $this->validNode($before)) {
                $item['before'] = $before;
            }
            $out['extra'][] = $item;
            $n++;
        }
        $n = 0;
        foreach ((array) ($raw['parents'] ?? []) as $cid => $pid) {
            if ($n >= 400) {
                break;
            }
            $cid = (string) $cid;
            $pid = (string) $pid;
            if (! $this->validNode($cid) || ! $this->validNode($pid) || $cid === 'root') {
                continue;
            }
            $out['parents'][$cid] = $pid;
            $n++;
        }
        if (array_key_exists('links', $raw) && is_array($raw['links'])) {
            $out['links'] = [];
            $n = 0;
            foreach ($raw['links'] as $row) {
                if ($n >= 2000 || ! is_array($row)) {
                    continue;
                }
                $from = (string) ($row['from'] ?? '');
                $to = (string) ($row['to'] ?? '');
                if (! $this->validNode($from) || ! $this->validNode($to) || $from === $to) {
                    continue;
                }
                $out['links'][] = [
                    'from' => $from,
                    'to' => $to,
                    'label' => mb_substr(trim((string) ($row['label'] ?? '')), 0, 40),
                ];
                $n++;
            }
        }
        foreach (['removed', 'loose'] as $key) {
            $n = 0;
            foreach ((array) ($raw[$key] ?? []) as $id) {
                if ($n >= 400) {
                    break;
                }
                $id = (string) $id;
                if (! $this->validNode($id) || $id === 'root') {
                    continue;
                }
                $out[$key][] = $id;
                $n++;
            }
            $out[$key] = array_values(array_unique($out[$key]));
        }

        return $out;
    }

    private function writeEdits(array $edits): void
    {
        $this->writeJsonAtomic($this->path('schema_map_edits.json'), [
            'data' => $edits,
            'rev' => (string) round(microtime(true) * 1000),
        ]);
    }

    private function versionsPublic(): array
    {
        $out = [];
        foreach ($this->readVersions()['items'] as $row) {
            if (! is_array($row)) {
                continue;
            }
            $out[] = [
                'id' => (string) ($row['id'] ?? ''),
                'name' => (string) ($row['name'] ?? ''),
                'user' => (string) ($row['user'] ?? ''),
                'ts' => (string) ($row['ts'] ?? ''),
            ];
        }

        return $out;
    }

    private function readVersions(): array
    {
        $path = $this->path('schema_map_versions.json');
        if (! is_file($path)) {
            return ['items' => []];
        }
        $raw = file_get_contents($path);
        $json = is_string($raw) ? json_decode($raw, true) : null;
        if (! is_array($json) || ! isset($json['items']) || ! is_array($json['items'])) {
            return ['items' => []];
        }

        return ['items' => array_values($json['items'])];
    }

    private function pushVersion(string $name, string $login, string $user): void
    {
        $edits = $this->readEdits()['data'];
        $path = $this->path('schema_map_versions.json');
        $this->withLockedJson($path, function (array &$data) use ($name, $login, $user, $edits) {
            if (! isset($data['items']) || ! is_array($data['items'])) {
                $data = ['items' => []];
            }
            array_unshift($data['items'], [
                'id' => 'v'.bin2hex(random_bytes(6)),
                'name' => $name,
                'user' => $user !== '' ? $user : $login,
                'login' => $login,
                'ts' => date('c'),
                'edits' => $edits,
            ]);
            $data['items'] = array_slice(array_values($data['items']), 0, 50);
            $data['rev'] = (string) round(microtime(true) * 1000);
        }, ['items' => []]);
    }

    private function restoreVersion(string $id): bool
    {
        if (! preg_match('/^v[a-f0-9]{8,24}$/', $id)) {
            return false;
        }
        foreach ($this->readVersions()['items'] as $row) {
            if (! is_array($row) || (string) ($row['id'] ?? '') !== $id) {
                continue;
            }
            $this->writeEdits($this->sanitizeEdits($row['edits'] ?? []));

            return true;
        }

        return false;
    }

    private function readChecks(): array
    {
        $path = $this->path('schema_map_checks.json');
        if (! is_file($path)) {
            return ['nodes' => [], 'rev' => ''];
        }
        $raw = file_get_contents($path);
        $json = is_string($raw) ? json_decode($raw, true) : null;
        if (! is_array($json) || ! isset($json['nodes']) || ! is_array($json['nodes'])) {
            return ['nodes' => [], 'rev' => ''];
        }

        return $json;
    }

    private function withChecks(callable $fn): void
    {
        $this->withLockedJson($this->path('schema_map_checks.json'), function (array &$data) use ($fn) {
            if (! isset($data['nodes']) || ! is_array($data['nodes'])) {
                $data = ['nodes' => []];
            }
            $fn($data);
            $data['rev'] = (string) round(microtime(true) * 1000);
        }, ['nodes' => []]);
    }

    private function readPresence(): array
    {
        $path = $this->path('schema_map_presence.json');
        if (! is_file($path)) {
            return ['users' => []];
        }
        $raw = file_get_contents($path);
        $json = is_string($raw) ? json_decode($raw, true) : null;
        if (! is_array($json) || ! isset($json['users']) || ! is_array($json['users'])) {
            return ['users' => []];
        }

        return $json;
    }

    private function withPresence(callable $fn): void
    {
        $this->withLockedJson($this->path('schema_map_presence.json'), function (array &$data) use ($fn) {
            if (! isset($data['users']) || ! is_array($data['users'])) {
                $data = ['users' => []];
            }
            $now = time();
            foreach ($data['users'] as $id => $row) {
                if (! is_array($row) || (int) ($row['t'] ?? 0) < $now - 20) {
                    unset($data['users'][$id]);
                }
            }
            $fn($data);
        }, ['users' => []]);
    }

    private function readStore(): array
    {
        $path = $this->path('schema_map_comments.json');
        if (! is_file($path)) {
            return ['nodes' => []];
        }
        $raw = file_get_contents($path);
        $json = is_string($raw) ? json_decode($raw, true) : null;
        if (! is_array($json) || ! isset($json['nodes']) || ! is_array($json['nodes'])) {
            return ['nodes' => []];
        }

        return $json;
    }

    private function withStore(callable $fn): void
    {
        $this->withLockedJson($this->path('schema_map_comments.json'), function (array &$data) use ($fn) {
            if (! isset($data['nodes']) || ! is_array($data['nodes'])) {
                $data = ['nodes' => []];
            }
            $fn($data);
        }, ['nodes' => []], true);
    }

    private function writeJsonAtomic(string $path, array $payload): void
    {
        $dir = dirname($path);
        if (! is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        $fh = fopen($path, 'c+');
        if ($fh === false) {
            throw new RuntimeException('не открыть '.$path);
        }
        try {
            flock($fh, LOCK_EX);
            rewind($fh);
            ftruncate($fh, 0);
            fwrite($fh, json_encode($payload, JSON_UNESCAPED_UNICODE));
            fflush($fh);
        } finally {
            flock($fh, LOCK_UN);
            fclose($fh);
        }
    }

    private function withLockedJson(string $path, callable $fn, array $default, bool $pretty = false): void
    {
        $dir = dirname($path);
        if (! is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        $fh = fopen($path, 'c+');
        if ($fh === false) {
            throw new RuntimeException('не открыть '.$path);
        }
        try {
            flock($fh, LOCK_EX);
            $raw = stream_get_contents($fh);
            $data = is_string($raw) && $raw !== '' ? json_decode($raw, true) : $default;
            if (! is_array($data)) {
                $data = $default;
            }
            $fn($data);
            $flags = JSON_UNESCAPED_UNICODE;
            if ($pretty) {
                $flags |= JSON_PRETTY_PRINT;
            }
            rewind($fh);
            ftruncate($fh, 0);
            fwrite($fh, json_encode($data, $flags));
            fflush($fh);
        } finally {
            flock($fh, LOCK_UN);
            fclose($fh);
        }
    }
}
