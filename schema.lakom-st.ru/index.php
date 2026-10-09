<?php
declare(strict_types=1);
$csrf = bin2hex(random_bytes(16));
$meLogin = 'guest';
$v = '2026-10-09-audit-branch-fixes';
?><!DOCTYPE html>
<html lang="ru" data-theme="light">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Схема проекта — Лакомка</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/lakom-schema-map.css?v=<?= $v ?>" rel="stylesheet">
    <style>
        html, body { margin: 0; height: 100%; background: #f7f7f5; }
        .sm-page { height: 100vh; min-height: 100vh; }
        .muted { color: #6b7280; }
    </style>
</head>
<body>
<div class="sm-page" id="smPage"
     data-comments-url="api.php?r=comments"
     data-can-comment="1"
     data-presence-url="api.php?r=presence"
     data-me-login="<?= htmlspecialchars($meLogin, ENT_QUOTES, 'UTF-8') ?>"
     data-csrf="<?= htmlspecialchars($csrf, ENT_QUOTES, 'UTF-8') ?>"
     data-map-ls="lakom-schema-standalone-v1"
     data-checks-url="api.php?r=checks">
    <div class="sm-toolbar" id="smToolbar">
        <button type="button" class="sm-chrome-tab" id="btnSmChromeTab" title="Показать панель" aria-label="Показать панель" hidden></button>
        <div class="sm-toolbar-inner">
        <div>
            <h1>Схема проекта</h1>
            <p class="muted">Рабочая доска: правки и версии сохраняются на сервере.</p>
            <div class="sm-presence" id="smPresence">
                <div class="sm-avatars" id="smAvatars"></div>
                <span class="muted" id="smWho"></span>
            </div>
        </div>
        <div class="d-flex flex-wrap gap-2 align-items-center">
            <button type="button" class="btn btn-sm btn-primary" id="btnTabMap">Карта</button>
            <label class="sm-api-toggle mb-0">
                <input type="checkbox" id="chkApi"> Методы и поля
            </label>
            <button type="button" class="btn btn-sm btn-primary" id="btnSaveVer" title="Сохранить текущую схему как именованную версию">Сохранить версию</button>
            <select id="smVerSelect" class="sm-ver-select" title="Открыть сохранённую версию">
                <option value="">Версии…</option>
            </select>
            <div class="sm-hist" role="group" aria-label="История правок">
                <button type="button" class="btn btn-sm btn-outline-secondary" id="btnUndo" title="Назад, Ctrl+Z">← Назад</button>
                <button type="button" class="btn btn-sm btn-outline-secondary" id="btnRedo" title="Вперёд, Ctrl+Shift+Z">Вперёд →</button>
                <select id="smHistSelect" class="sm-hist-select" title="Перейти к шагу"></select>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnCollapse">Свернуть</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnExpand">Раскрыть всё</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnZoomOut">−</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnZoomIn">+</button>
            <button type="button" class="btn btn-sm btn-outline-secondary sm-legend-btn" id="btnLegend" title="Как читать схему">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 9h10M7 13h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                Как читать
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger" id="btnTabQ" title="Подсветить блоки, где ещё нет ответа">Вопросы</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnAllComments" title="Все комментарии по блокам">
                Все комментарии <span id="btnAllCommentsN" class="sm-all-n" hidden></span>
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnSmChromeHide" title="Свернуть панель">Свернуть панель</button>
        </div>
        </div>
    </div>
    <div id="smMapTab" class="sm-body">
        <div class="sm-board-wrap" id="smWrap">
            <div class="sm-board" id="smBoard"></div>
            <div class="sm-cursors" id="smCursors" aria-hidden="true"></div>
        </div>
        <aside id="smComments" class="sm-comments sm-hidden" hidden>
            <div class="sm-comments-head">
                <strong id="smCommentsTitle">Комментарии</strong>
                <button type="button" class="btn btn-sm btn-outline-secondary" id="smCommentsClose">Закрыть</button>
            </div>
            <div id="smCommentsList" class="sm-comments-list"></div>
            <div class="sm-comments-form">
                <div id="smCommentsReply" class="sm-comments-reply sm-hidden" hidden></div>
                <textarea id="smCommentsText" rows="3" placeholder="Комментарий или ответ…"></textarea>
                <div class="d-flex flex-wrap gap-2">
                    <button type="button" class="btn btn-sm btn-primary" id="smCommentsSend">Отправить</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" id="smCommentsNew">Новый</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" id="smCommentsClose2">Закрыть</button>
                </div>
            </div>
        </aside>
    </div>
</div>
<div id="smLegendBox" class="sm-lb sm-hidden" hidden>
    <div class="sm-lb-back" id="smLegendBack"></div>
    <div class="sm-lb-card" role="dialog" aria-labelledby="smLegendTitle">
        <button type="button" class="sm-lb-close" id="smLegendClose" aria-label="Закрыть">×</button>
        <h2 id="smLegendTitle">Как читать схему</h2>
        <ul class="sm-lb-list">
            <li><i style="background:#ca8a04"></i><b>Проверка</b> — ромб, выбор варианта</li>
            <li><i style="background:#2563eb"></i><b>Задание</b> — кто выполняет, указано в тексте</li>
            <li><i style="background:#64748b"></i><b>1С</b> — документ или действие в учёте</li>
            <li><i style="background:#16a34a"></i><b>Факт</b> — резерв, подтверждение, готовый результат</li>
            <li><i style="background:#dc2626"></i><b>Не ясно</b> — открытый вопрос, без ответа ветку в код не ставим</li>
            <li><i style="background:#ea580c"></i><b>Маршрут</b> — имя выбранного пути. Стрелка показывает направление. Пунктир — связь с другой веткой</li>
        </ul>
        <p>Центр — заказ. Справа проверки и выбранный маршрут; цепочка заданий открывается внутри маршрута. «+ / −» скрывает ветку. Тащите карту, Ctrl+колёсико — масштаб.</p>
        <p>ГП — готовая продукция. ПФ — полуфабрикат. КМ — колеровочная машина. ОТК — отдел технического контроля.</p>
        <p>На этой доске можно править блоки, связи и сохранять версии. Правки общие для всех, кто открыл сайт.</p>
    </div>
</div>
<div id="smNoteBox" class="sm-lb sm-hidden" hidden>
    <div class="sm-lb-back" id="smNoteBack"></div>
    <div class="sm-lb-card" role="dialog" aria-labelledby="smNoteTitle">
        <button type="button" class="sm-lb-close" id="smNoteClose" aria-label="Закрыть">×</button>
        <h2 id="smNoteTitle">Пояснение</h2>
        <div id="smNoteBody"></div>
    </div>
</div>
<div id="smApiBox" class="sm-lb sm-hidden" hidden>
    <div class="sm-lb-back" id="smApiBack"></div>
    <div class="sm-lb-card" role="dialog" aria-labelledby="smApiTitle">
        <button type="button" class="sm-lb-close" id="smApiClose" aria-label="Закрыть">×</button>
        <h2 id="smApiTitle">Методы 1С</h2>
        <div id="smApiBody"></div>
    </div>
</div>
<div id="smVerBox" class="sm-lb sm-hidden" hidden>
    <div class="sm-lb-back" id="smVerBack"></div>
    <div class="sm-lb-card" role="dialog" aria-labelledby="smVerTitle">
        <button type="button" class="sm-lb-close" id="smVerClose" aria-label="Закрыть">×</button>
        <h2 id="smVerTitle">Сохранить рабочую версию</h2>
        <p class="muted" style="margin:0 0 10px">Снимок текущей схемы. Потом можно открыть его из списка «Версии».</p>
        <label class="sm-ver-label" for="smVerName">Название</label>
        <input id="smVerName" class="sm-ver-input" type="text" maxlength="80" placeholder="Например: после связи ГП">
        <div class="d-flex flex-wrap gap-2 mt-3">
            <button type="button" class="btn btn-sm btn-primary" id="smVerSaveGo">Сохранить</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="smVerCancel">Отмена</button>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/lakom-schema-data.js?v=<?= $v ?>"></script>
<script src="js/lakom-schema-map.js?v=<?= $v ?>"></script>
</body>
</html>
