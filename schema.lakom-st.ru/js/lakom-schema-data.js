/* Working map version: 2026-10-15-concise-notes */
window.LAKOM_SCHEMA_EXPORT = {
  "rootTopic": {
    "id": "root",
    "title": "Заказ покупателя",
    "kind": "entry",
    "notes": "Общие правила заданий:\n• У задания есть счёт/позиция, продукция, партия, количество, срок, приоритет, место, исполнитель и история.\n• «Взять в работу» фиксирует исполнителя и время начала; «Выполнено» — фактический результат и время завершения.\n• «Проблема» сохраняет причину и выполненное количество. После решения продолжается то же задание. Проблема видна в обеспечении счёта.\n• Оборудование и рецептуру разбирает планировщик; дефицит материалов — снабжение; ошибку обмена — оператор 1С.\n• Паспорт партии доступен из задания, счёта и склада: открыть, напечатать, скачать. До приёмки ОТК показывается его готовность.\n• Из дежи после ОТК продукцию фасуют на производстве в зоне фасовки. Затирку, пигментные пасты и шприцы фасуют сотрудники склада ПФ в помещении склада ПФ.\n• Для перефасовки ГП планировщик выбирает производство или склад ПФ и назначает исполнителя по загрузке.\n• Физическое место работы и склад учёта 1С указываются отдельно.",
    "open": true,
    "links": [],
    "approval_badge_visible": false,
    "review_status": "pending",
    "children": [
      {
        "id": "f_227_4031",
        "title": "Общий выбор маршрута",
        "kind": "route",
        "open": true,
        "links": [],
        "edge": "",
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_227_4040",
            "title": "Проверка наша или перекуп",
            "kind": "check",
            "open": true,
            "links": [
              "f_227_4034",
              "local_purchased_product_route"
            ],
            "edge": "",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_227_4034",
                "title": "Система: перевести в килограммы, если продукция в литрах",
                "kind": "task",
                "open": true,
                "links": [
                  "f_227_4038"
                ],
                "edge": "Наша",
                "approval_badge_visible": false,
                "review_status": "pending",
                "automatic_step": true,
                "children": [
                  {
                    "id": "f_227_4038",
                    "title": "ГП нужной фасовки покрывает объём с учётом резервов и минимального остатка? Точное совпадение или замена этикетки",
                    "kind": "check",
                    "notes": "Первичный поиск: нужная продукция и цвет, нужная фасовка; допускается другая этикетка. Другую фасовку здесь не учитывать. Да — маршрут ГП: полностью подходит либо замена этикетки. Нет или хватает частично — определить незакрытый объём. Другую фасовку проверять позже, после нехватки ПФ, для объёма до 250 кг.",
                    "open": true,
                    "links": [
                      "f_227_4177",
                      "local_initial_gp_partial_reserve"
                    ],
                    "edge": "Количество в килограммах",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "local_initial_gp_partial_reserve",
                        "title": "Система: зарезервировать найденную часть ГП; зафиксировать партии",
                        "kind": "task",
                        "notes": "Использовать только точное совпадение или замену этикетки, нужную фасовку и доступный объём с учётом действующих резервов и минимального остатка. Если найдено 0 — резерв не создаётся. Найденная часть идёт в маршрут ГП; оставшийся дефицит продолжает выбор обеспечения. Сохранять обе части одной позиции и не создавать повторный резерв.",
                        "open": true,
                        "links": [
                          "f_227_4048",
                          "f_227_4177"
                        ],
                        "edge": "Нет — полное покрытие отсутствует",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "f_227_4048",
                            "title": "Система: определить незакрытый объём позиции и дальнейший маршрут",
                            "kind": "task",
                            "notes": "Незакрытый объём = потребность позиции минус обеспеченный и зарезервированный объём ГП. Дальнейшие проверки выполняются только на этот дефицит. Найденная часть ГП параллельно проходит свой маршрут до готовности; это не частичная отгрузка.",
                            "open": true,
                            "links": [
                              "f_227_4033"
                            ],
                            "edge": "Дальше — только незакрытый объём",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "automatic_step": true,
                            "children": [
                              {
                                "id": "f_227_4033",
                                "title": "Проверить тип продукции",
                                "kind": "check",
                                "open": true,
                                "links": [
                                  "f_262_6981",
                                  "f_227_4035"
                                ],
                                "edge": "",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "f_227_4035",
                                    "title": "Проверить наличие цвета",
                                    "kind": "check",
                                    "open": true,
                                    "links": [
                                      "f_257_6365",
                                      "f_227_4049"
                                    ],
                                    "edge": "Тип продукции — остальное",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "children": [
                                      {
                                        "id": "f_227_4049",
                                        "title": "Больше N (250 кг)?",
                                        "kind": "check",
                                        "open": true,
                                        "links": [
                                          "f_227_4058",
                                          "f_265_5077"
                                        ],
                                        "edge": "Без цвета",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "children": [
                                          {
                                            "id": "f_227_4058",
                                            "title": "Проверить: ПФ полностью закрывает незакрытый объём с учётом минимального остатка?",
                                            "kind": "check",
                                            "open": true,
                                            "links": [
                                              "f_227_4063",
                                              "local_gp_other_pack_check"
                                            ],
                                            "edge": "Нет",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "children": [
                                              {
                                                "id": "f_227_4063",
                                                "title": "Система: зарезервировать весь необходимый объём ПФ и зафиксировать партию",
                                                "kind": "task",
                                                "open": true,
                                                "links": [
                                                  "f_227_4133"
                                                ],
                                                "edge": "Да",
                                                "approval_badge_visible": false,
                                                "review_status": "pending",
                                                "automatic_step": true,
                                                "children": [
                                                  {
                                                    "id": "f_227_4133",
                                                    "title": "Маршрут Обеспечение из ПФ",
                                                    "kind": "route",
                                                    "open": true,
                                                    "links": [
                                                      "f_258_5065"
                                                    ],
                                                    "edge": "",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "route_target_id": "f_258_5065",
                                                    "children": []
                                                  }
                                                ]
                                              },
                                              {
                                                "id": "local_gp_other_pack_check",
                                                "title": "Проверить: ГП этой же продукции в другой фасовке полностью закрывает незакрытый объём с учётом минимального остатка?",
                                                "kind": "check",
                                                "open": true,
                                                "links": [
                                                  "f_227_4045",
                                                  "f_227_4068"
                                                ],
                                                "edge": "Нет — ПФ недостаточно",
                                                "approval_badge_visible": false,
                                                "review_status": "pending",
                                                "children": []
                                              }
                                            ]
                                          },
                                          {
                                            "id": "f_265_5077",
                                            "title": "Экран «Задания технолога»",
                                            "kind": "screen",
                                            "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nРешить, использовать ли переработку для неколерованной продукции\nРоль: Химик-технолог; также главный технолог, технолог по колеровке и сотрудник по планированию производства. Окончательное решение до замеса — химик-технолог.\nМесто: Лаборатория ОТК.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя.\n• «Используем» — сохранить решение и продолжить существующую ветку.\n• «Нет» — сохранить отказ от переработки и продолжить ветку без переработки.\n• «Проблема» — указать причину.\n\nПравила процесса:\nЗадание технологу — использовать переработку или нет? Для неколерованной продукции при большом объёме. Весь доступный список переработки: 1. Совпадает база и цвет. 2. Совпадает только цвет. 3. Все остальные позиции. Фильтр по базе; остальные позиции доступны для ручного выбора. Использовать: подтвердить совместимость, партии и массу; новый замес — на оставшийся объём, выбранная переработка — в этот замес. Не использовать / 30 минут без решения: новый замес на весь объём.\nРешение по переработке: уведомление всем ответственным; приоритет главный технолог → технолог → планировщик. Общие 30 минут; более высокая роль может изменить решение в этом же окне.\n\nТаймер:\n• 30 минут без решения — автоматически продолжить ветку без переработки.\n• Если решение уже принято, таймер не запускает повторное продолжение.",
                                            "open": true,
                                            "links": [
                                              "local_5f255159617746bd9e46f86e07d2d037",
                                              "f_227_4068",
                                              "local_rework_decision_timer_30m"
                                            ],
                                            "edge": "Да",
                                            "approval_badge_visible": false,
                                            "screen_task": "Решить, использовать ли переработку для неколерованной продукции",
                                            "screen_id": "technology_tasks",
                                            "review_status": "pending",
                                            "ui_review_status": "pending",
                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                            "approval_sources": [
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                "comment_id": "AAACArc6Lfc",
                                                "author": "Данила"
                                              },
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                "points": [
                                                  17
                                                ],
                                                "date": "2026-10-15",
                                                "scope": "assignment role and physical place"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "local_5f255159617746bd9e46f86e07d2d037",
                                                "title": "Система: резерв со склада Переработки",
                                                "kind": "task",
                                                "notes": "",
                                                "open": true,
                                                "links": [
                                                  "f_227_4068"
                                                ],
                                                "edge": "Используем",
                                                "approval_badge_visible": false,
                                                "review_status": "pending",
                                                "automatic_step": true,
                                                "children": []
                                              },
                                              {
                                                "id": "local_rework_decision_timer_30m",
                                                "title": "30 минут без решения",
                                                "kind": "event",
                                                "notes": "Автоматическое событие, не кнопка. Продолжить без переработки только если за 30 минут решение не принято. После принятого решения повторный переход не выполнять.",
                                                "open": true,
                                                "links": [
                                                  "f_227_4068"
                                                ],
                                                "edge": "Таймер",
                                                "approval_badge_visible": false,
                                                "review_status": "pending",
                                                "children": []
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_262_6981",
        "title": "Маршрут затирки",
        "kind": "route",
        "open": true,
        "links": [],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_227_4054",
            "title": "Затирка",
            "kind": "entry",
            "open": true,
            "links": [
              "f_227_4145"
            ],
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_227_4145",
                "title": "Затирка — отвердитель (компонент Б) и перчатки. Есть ли на складе?",
                "kind": "check",
                "notes": "",
                "open": true,
                "links": [
                  "f_227_4131",
                  "f_227_4147"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "f_227_4131",
                    "title": "В позиции затирки есть цвет?",
                    "kind": "check",
                    "notes": "После общей проверки отвердителя и перчаток. Для цветного заказа сначала выбрать способ получения цвета, затем обеспечить прозрачный компонент А.",
                    "open": true,
                    "links": [
                      "local_grout_clear_route",
                      "f_227_4154"
                    ],
                    "edge": "Да",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "local_grout_clear_route",
                        "title": "Затирка без цвета",
                        "kind": "route",
                        "notes": "Общий маршрут обеспечения прозрачного компонента А. Сохранять назначение исходной позиции: без цвета, цвет со шприцами или колеровка А на производстве. Прозрачная база для цветной позиции не превращает заказ в бесцветный. Перед колеровкой не фасовать А в конечную тару без технологической необходимости.",
                        "open": true,
                        "links": [
                          "f_227_4144",
                          "f_227_4157"
                        ],
                        "edge": "Нет — затирка без цвета",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "f_227_4144",
                            "title": "Затирка — компонент А: незакрытый объём больше 50 кг?",
                            "kind": "check",
                            "open": true,
                            "links": [
                              "f_227_4146",
                              "f_227_4130"
                            ],
                            "edge": "Определить обеспечение прозрачного А",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "f_227_4146",
                                "title": "Проверить: ПФ компонента А полностью закрывает незакрытый объём с учётом минимального остатка?",
                                "kind": "check",
                                "open": true,
                                "links": [
                                  "f_227_4148",
                                  "f_227_4130"
                                ],
                                "edge": "Нет",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "f_227_4148",
                                    "title": "Система: зарезервировать весь необходимый объём ПФ компонента А и зафиксировать партию",
                                    "kind": "task",
                                    "open": true,
                                    "links": [
                                      "f_227_4152"
                                    ],
                                    "edge": "Да",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "automatic_step": true,
                                    "children": [
                                      {
                                        "id": "f_227_4152",
                                        "title": "Маршрут обеспечения из ПФ",
                                        "kind": "route",
                                        "notes": "После резерва компонента А перейти в общий маршрут обеспечения из ПФ. Сохранить исходную позицию, цвет и наличие шприцев.",
                                        "open": true,
                                        "links": [
                                          "f_258_5065"
                                        ],
                                        "edge": "",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_258_5065",
                                        "children": []
                                      }
                                    ]
                                  },
                                  {
                                    "id": "f_227_4130",
                                    "title": "Маршрут Новый замес",
                                    "kind": "route",
                                    "notes": "Выполнить новый замес прозрачной базы А. После приёмки базы ОТК вернуться к продолжению по назначению исходной позиции: комплектация либо колеровка. Не завершать цветную позицию как бесцветную.",
                                    "open": true,
                                    "links": [
                                      "f_227_4068",
                                      "local_grout_base_ready"
                                    ],
                                    "edge": "Нет",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "route_target_id": "f_227_4068",
                                    "continuation_after_route": true,
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "f_227_4154",
                        "title": "В позиции есть шприцы?",
                        "kind": "check",
                        "open": true,
                        "links": [
                          "local_grout_clear_gp_kit",
                          "local_grout_clear_route"
                        ],
                        "edge": "Да — есть цвет",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "local_grout_clear_gp_kit",
                            "title": "Есть готовый прозрачный комплект на складе ГП: компонент А + компонент Б + перчатки, без учёта шприцев?",
                            "kind": "check",
                            "notes": "Проверять подходящий прозрачный комплект и свободное количество на незакрытый объём заказа. Шприцы нужного цвета обеспечиваются отдельно.",
                            "open": true,
                            "links": [
                              "local_grout_clear_gp_reserve",
                              "local_grout_clear_route"
                            ],
                            "edge": "Да — в заказе есть шприцы",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "local_grout_clear_gp_reserve",
                                "title": "Система: зарезервировать готовый прозрачный комплект А + Б + перчатки; зафиксировать количество и партии",
                                "kind": "task",
                                "notes": "",
                                "open": true,
                                "links": [
                                  "f_227_4157"
                                ],
                                "edge": "Да — комплект есть",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "automatic_step": true,
                                "children": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "f_227_4147",
                    "title": "Экран «Снабжение»",
                    "kind": "screen",
                    "notes": "Данные:\n• Список заданий и карточка: Исходная позиция/замес, недостающие материалы и количества, сроки и статус обеспечения.\n• Фильтры / сортировка: Материал, срок, статус.\n\nТекущее задание:\nЗадача снабжению\nРоль: Снабжение.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПополнение без нового заказа:\n• При падении остатка закупаемой позиции ниже минимального создать сигнал и задание снабжению.\n• Показывать склад, текущий и минимальный остаток, открытые закупки, согласованный объём пополнения.\n• До пересечения порога сигнал не создаётся. Не дублировать уже открытое задание.\n• Объём закупки согласовать отдельно: минимальный остаток задаёт порог сигнала.\n• Производимый ПФ пополняется через план замеса и счёт пополнения, а не закупку.",
                    "open": true,
                    "links": [
                      "local_b93b71843809415bad27c69d83255b95"
                    ],
                    "edge": "Нет",
                    "approval_badge_visible": false,
                    "screen_task": "Задача снабжению",
                    "screen_id": "supply_tasks",
                    "review_status": "pending",
                    "ui_review_status": "pending",
                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                    "approval_sources": [
                      {
                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                        "points": [
                          7
                        ],
                        "date": "2026-10-15",
                        "scope": "assignment role and physical place"
                      }
                    ],
                    "children": [
                      {
                        "id": "local_b93b71843809415bad27c69d83255b95",
                        "title": "Система: уведомить менеджера о задержке",
                        "kind": "task",
                        "open": true,
                        "links": [],
                        "edge": "Выполнено",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "automatic_step": true,
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "local_colored_grout_route",
            "title": "Маршрут колерованной затирки",
            "kind": "route",
            "notes": "Вход: прозрачный компонент А уже обеспечен из ПФ или нового замеса; исходная позиция требует цвет. Здесь выбирается продолжение со шприцами либо колеровка А на производстве. Поиск и изготовление прозрачной базы повторно не выполнять.",
            "open": true,
            "links": [
              "local_grout_base_syringes"
            ],
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "local_grout_base_syringes",
                "title": "В исходной позиции предусмотрены шприцы?",
                "kind": "check",
                "notes": "",
                "open": true,
                "links": [
                  "f_227_4157",
                  "f_227_4155"
                ],
                "edge": "Компонент А обеспечен; нужен цвет",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "f_227_4155",
                    "title": "Маршрут Колеровка затирки на производстве",
                    "kind": "route",
                    "open": true,
                    "links": [
                      "f_241_5130"
                    ],
                    "edge": "Нет — колеровка А на производстве",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "route_target_id": "f_241_5114",
                    "children": [
                      {
                        "id": "f_241_5130",
                        "title": "Далее → схема «Колеровка на производстве»",
                        "kind": "route",
                        "open": true,
                        "links": [
                          "f_241_5114"
                        ],
                        "edge": "",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "route_target_id": "f_241_5114",
                        "children": []
                      }
                    ]
                  },
                  {
                    "id": "f_227_4157",
                    "title": "Маршрут колеровка шприцами",
                    "kind": "route",
                    "open": true,
                    "links": [
                      "f_227_4159"
                    ],
                    "edge": "Да — обеспечить шприцы и комплектовать",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "f_227_4159",
                        "title": "Шприцы нужного цвета и фасовки есть на складе?",
                        "kind": "check",
                        "notes": "Проверить конкретную номенклатуру и количество. Шприцы одного цвета 5 мл и 12,5 мл — разные фасовки; готовые шприцы не перефасовывать из одной в другую. При дефиците — изготовление нужной фасовки.",
                        "open": true,
                        "links": [
                          "f_227_4161",
                          "f_227_4170"
                        ],
                        "edge": "",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "f_227_4161",
                            "title": "Система: зарезервировать шприцы нужного цвета",
                            "kind": "task",
                            "open": true,
                            "links": [
                              "f_227_4169"
                            ],
                            "edge": "Да",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "automatic_step": true,
                            "children": [
                              {
                                "id": "f_227_4169",
                                "title": "Система: подтвердить резерв обеспеченного прозрачного А, компонента Б и перчаток",
                                "kind": "task",
                                "open": true,
                                "links": [
                                  "f_227_4171"
                                ],
                                "edge": "",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "automatic_step": true,
                                "children": [
                                  {
                                    "id": "f_227_4171",
                                    "title": "Схема «Комплектация затирки»",
                                    "kind": "route",
                                    "open": true,
                                    "links": [
                                      "f_241_5186"
                                    ],
                                    "edge": "",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "route_target_id": "f_241_5170",
                                    "children": [
                                      {
                                        "id": "f_241_5186",
                                        "title": "Схема «Комплектация затирки»",
                                        "kind": "route",
                                        "open": true,
                                        "links": [
                                          "f_241_5170"
                                        ],
                                        "edge": "",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_241_5170",
                                        "children": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": "f_227_4170",
                            "title": "Маршрут Изготовление колерованных шприцов",
                            "kind": "route",
                            "open": true,
                            "links": [
                              "f_258_5072"
                            ],
                            "edge": "Нет: изготовить шприцы",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "route_target_id": "f_258_5068",
                            "children": [
                              {
                                "id": "f_258_5072",
                                "title": "Далее → схема «Изготовление колерованных шприцов»",
                                "kind": "route",
                                "open": true,
                                "links": [
                                  "f_258_5068"
                                ],
                                "edge": "",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "route_target_id": "f_258_5068",
                                "children": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "f_241_5170",
            "title": "Схема «Комплектация затирки»",
            "kind": "route",
            "open": true,
            "links": [
              "f_230_5034"
            ],
            "edge": "",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_230_5034",
                "title": "Вход: готовый компонент А нужного цвета либо прозрачный А и шприцы.",
                "kind": "result",
                "notes": "",
                "open": true,
                "links": [
                  "f_230_5038"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "f_230_5038",
                    "title": "Отвердитель (Б) и перчатки обеспечены в нужном количестве?",
                    "kind": "check",
                    "open": true,
                    "links": [
                      "f_262_7031",
                      "f_230_5078"
                    ],
                    "edge": "",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "f_262_7031",
                        "title": "Шприцы для комплекта обеспечены или не требуются?",
                        "kind": "check",
                        "notes": "Если в позиции нет шприцов, сразу идти к проверке фасованного отвердителя. Если нужны и есть — тот же выход. Если нужны и отсутствуют — изготовление шприцов; после выпуска вернуться к общей комплектации. Пигменты и пустые шприцы проверяются в маршруте изготовления, не блокировать этот вход из-за отсутствия готовых шприцов.",
                        "open": true,
                        "links": [
                          "f_262_7102",
                          "f_262_7058"
                        ],
                        "edge": "Да",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "f_262_7102",
                            "title": "Отвердитель есть фасованный?",
                            "kind": "check",
                            "open": true,
                            "links": [
                              "f_262_7262",
                              "f_262_7299"
                            ],
                            "edge": "Да — есть или не нужны",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "f_262_7262",
                                "title": "Система: автоматически подготовить макет и документ печати",
                                "kind": "task",
                                "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки.",
                                "open": true,
                                "links": [
                                  "mark_ready_f_262_7262"
                                ],
                                "edge": "Да",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "automatic_step": true,
                                "children": [
                                  {
                                    "id": "mark_ready_f_262_7262",
                                    "title": "Макет и документ печати готовы; задание маркировки доступно после готовности продукции",
                                    "kind": "result",
                                    "notes": "Макет связан с позицией и заданием маркировки. Печать доступна из карточки маркировки; исполнение — после готовности продукции.",
                                    "open": true,
                                    "links": [
                                      "f_230_5042"
                                    ],
                                    "edge": "Макет и документ печати сформированы",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "children": [
                                      {
                                        "id": "f_230_5042",
                                        "title": "Экран «Фасовка»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: физическое место фасовки, тип работы, продукция, исполнитель, статус, срок и приоритет.\n\nТекущее задание:\nСотрудник склада ПФ: фасовать А, собрать А + Б + перчатки; при необходимости добавить шприцы\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ — отдельное помещение, участок мелкой фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nКомпонент А с производства передать на склад ПФ к месту комплектации; подтвердить массу, партию и получение.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                        "open": true,
                                        "links": [
                                          "f_230_5046",
                                          "equipment_wash_decision"
                                        ],
                                        "edge": "",
                                        "approval_badge_visible": false,
                                        "screen_task": "Сотрудник склада ПФ: фасовать А, собрать А + Б + перчатки; при необходимости добавить шприцы",
                                        "screen_id": "packing_tasks",
                                        "review_status": "partial",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Роль — Сотрудник склада ПФ; фасовка затирки на складе ПФ; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "comment_id": "AAACIF6YlTM",
                                            "author": "Данила"
                                          },
                                          {
                                            "comment_id": "AAACIF6YlTQ",
                                            "author": "Данила"
                                          },
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              4,
                                              28,
                                              29,
                                              30
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          },
                                          {
                                            "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                            "date": "2026-10-15",
                                            "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "f_230_5046",
                                            "title": "Экран «Маркировка»",
                                            "kind": "screen",
                                            "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить этикетки и стикеры на комплекты затирки; подтвердить комплектность и количество.\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                            "open": true,
                                            "links": [
                                              "f_230_5050"
                                            ],
                                            "edge": "Выполнено",
                                            "approval_badge_visible": false,
                                            "screen_task": "Наклеить этикетки и стикеры на комплекты затирки; подтвердить комплектность и количество.",
                                            "screen_id": "marking",
                                            "review_status": "pending",
                                            "ui_review_status": "pending",
                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                            "approval_sources": [
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                "points": [
                                                  4,
                                                  28,
                                                  29,
                                                  30
                                                ],
                                                "date": "2026-10-15",
                                                "scope": "assignment role and physical place"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "f_230_5050",
                                                "title": "1С: производство готового комплекта затирки",
                                                "kind": "onec",
                                                "notes": "Продукция — готовый комплект. Материалы — компонент А, отвердитель как сырьё, перчатки, тара и шприцы при наличии. Отдельный выпуск отвердителя не создавать. Название операции «Сборка», точные поля и схема списания требуют подтверждения 1С.",
                                                "open": true,
                                                "links": [
                                                  "local_grout_assembly_output_onec"
                                                ],
                                                "edge": "",
                                                "approval_badge_visible": false,
                                                "review_status": "partial",
                                                "approved_scope": "Отвердитель — сырьё; название операции ещё уточняется",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACGqcevZc",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF4yhsU",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "local_grout_assembly_output_onec",
                                                    "title": "1С: оформить МХ-18 — передачу выпущенных комплектов на склад ГП",
                                                    "kind": "onec",
                                                    "notes": "Оформить МХ-18 для передачи готового комплекта в рамках производства. Физическое место комплектации — склад ПФ; выпуск учитывается через склад Производство.",
                                                    "open": true,
                                                    "links": [
                                                      "f_262_7160"
                                                    ],
                                                    "edge": "Комплекты выпущены",
                                                    "approval_badge_visible": false,
                                                    "review_status": "approved",
                                                    "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACGqcevZg",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      }
                                                    ],
                                                    "children": [
                                                      {
                                                        "id": "f_262_7160",
                                                        "title": "Экран «Задания склада»",
                                                        "kind": "screen",
                                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику на перемещение на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                                        "open": true,
                                                        "links": [
                                                          "f_262_7159"
                                                        ],
                                                        "edge": "Передача оформлена",
                                                        "approval_badge_visible": false,
                                                        "screen_task": "Задание кладовщику на перемещение на склад ГП",
                                                        "screen_id": "warehouse_tasks",
                                                        "review_status": "pending",
                                                        "ui_review_status": "pending",
                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                        "approval_sources": [
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                            "points": [
                                                              42
                                                            ],
                                                            "date": "2026-10-15",
                                                            "scope": "assignment role and physical place"
                                                          }
                                                        ],
                                                        "children": [
                                                          {
                                                            "id": "f_262_7159",
                                                            "title": "Экран «Задания склада»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику Подготовка позиций к отгрузке\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                                            "open": true,
                                                            "links": [
                                                              "local_c4fc033279a04f0c8b11f7929854de1e"
                                                            ],
                                                            "edge": "Выполнено",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Задание кладовщику Подготовка позиций к отгрузке",
                                                            "screen_id": "warehouse_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  1,
                                                                  44
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "local_c4fc033279a04f0c8b11f7929854de1e",
                                                                "title": "Готов к отгрузке",
                                                                "kind": "result",
                                                                "open": true,
                                                                "links": [],
                                                                "edge": "Выполнено",
                                                                "approval_badge_visible": false,
                                                                "review_status": "pending",
                                                                "children": []
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": "f_262_7299",
                                "title": "Экран «Фасовка»",
                                "kind": "screen",
                                "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: место фасовки, тип продукции, статус, срок, приоритет.\n\nТекущее задание:\nЗадание на фасовку отвердителя\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ — отдельное помещение, участок мелкой фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФизически расфасовать нужный объём отвердителя. В 1С отвердитель — сырьё в спецификации комплекта; отдельный выпуск фасованного отвердителя не подтверждён и не требуется по текущему ответу. Роль и реализация учёта фасованного запаса требуют уточнения.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                "open": true,
                                "links": [
                                  "f_262_7262",
                                  "equipment_wash_decision"
                                ],
                                "edge": "Нет — расфасовать",
                                "approval_badge_visible": false,
                                "screen_task": "Задание на фасовку отвердителя",
                                "screen_id": "packing_tasks",
                                "review_status": "partial",
                                "ui_review_status": "pending",
                                "approved_scope": "Отвердитель списывается как сырьё в спецификации; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                "approval_sources": [
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACGqcevZc",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                    "points": [
                                      4,
                                      28,
                                      29,
                                      30
                                    ],
                                    "date": "2026-10-15",
                                    "scope": "assignment role and physical place"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                    "date": "2026-10-15",
                                    "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                  }
                                ],
                                "children": []
                              }
                            ]
                          },
                          {
                            "id": "f_262_7058",
                            "title": "Схема «Изготовление колерованных шприцов»",
                            "kind": "route",
                            "open": true,
                            "links": [
                              "f_258_5068"
                            ],
                            "edge": "Нет — нужные шприцы отсутствуют",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "route_target_id": "f_258_5068",
                            "children": []
                          }
                        ]
                      },
                      {
                        "id": "f_230_5078",
                        "title": "Экран «Снабжение»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: Исходная позиция/замес, недостающие материалы и количества, сроки и статус обеспечения.\n• Фильтры / сортировка: Материал, срок, статус.\n\nТекущее задание:\nОбеспечить недостающие отвердитель, перчатки или шприцы\nРоль: Снабжение.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПополнение без нового заказа:\n• При падении остатка закупаемой позиции ниже минимального создать сигнал и задание снабжению.\n• Показывать склад, текущий и минимальный остаток, открытые закупки, согласованный объём пополнения.\n• До пересечения порога сигнал не создаётся. Не дублировать уже открытое задание.\n• Объём закупки согласовать отдельно: минимальный остаток задаёт порог сигнала.\n• Производимый ПФ пополняется через план замеса и счёт пополнения, а не закупку.",
                        "open": true,
                        "links": [
                          "f_230_5038"
                        ],
                        "edge": "Нет",
                        "approval_badge_visible": false,
                        "screen_task": "Обеспечить недостающие отвердитель, перчатки или шприцы",
                        "screen_id": "supply_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                        "approval_sources": [
                          {
                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                            "points": [
                              7
                            ],
                            "date": "2026-10-15",
                            "scope": "assignment role and physical place"
                          }
                        ],
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "f_258_5068",
            "title": "Изготовление колерованных шприцов",
            "kind": "route",
            "notes": "Вход: не хватает готовых шприцов нужной номенклатуры. Шприцы могут быть отдельной позицией заказа или частью комплекта затирки. Другую фасовку готовых шприцов не перефасовывают.",
            "open": true,
            "links": [
              "f_227_4163"
            ],
            "edge": "",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_227_4163",
                "title": "Экран «Задания технолога»",
                "kind": "screen",
                "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nРассчитать рецепт пасты, массу от 1 кг и количество шприцов\nРоль: Технолог по колеровке.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nМинимальный замес пигментной пасты — 1 кг. Учитывать потребность заказа и пополнение; распределение между шприцами 5, 10 и 12,5 мл задавать явно. Правило совместного пополнения двух фасовок обсуждалось без окончательного алгоритма: не заменять его автоматическим одинаковым Max. Историю комментариев по цвету показывать при расчёте.\n\nФасовки шприцов: 5 мл / 10 мл / 12,5 мл. Количество рассчитывается отдельно по каждой фасовке.",
                "open": true,
                "links": [
                  "local_syringe_material_check"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "screen_task": "Рассчитать рецепт пасты, массу от 1 кг и количество шприцов",
                "screen_id": "technology_tasks",
                "review_status": "pending",
                "ui_review_status": "pending",
                "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                    "points": [
                      31
                    ],
                    "date": "2026-10-15",
                    "scope": "assignment role"
                  }
                ],
                "children": [
                  {
                    "id": "local_syringe_material_check",
                    "title": "Пигменты и пустые шприцы есть на производстве по учёту 1С?",
                    "kind": "check",
                    "notes": "Пигменты обычно числятся на производстве. При нехватке — перемещение со склада сырья. Уточнить место хранения пустых шприцов.",
                    "open": true,
                    "links": [
                      "local_syringe_paste_mix",
                      "local_syringe_material_move"
                    ],
                    "edge": "Подтвердить рецепт / решение — Рецепт и объём заданы",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "local_syringe_paste_mix",
                        "title": "Экран «Колеровка»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nСотрудник склада ПФ: смешать пасту по рецепту; записать фактический расход\nРоль: Сотрудник склада ПФ; при отсутствии — колеровщик производства.\nМесто: Цех колеровки на производстве.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                        "open": true,
                        "links": [
                          "f_227_4165"
                        ],
                        "edge": "Да",
                        "approval_badge_visible": false,
                        "screen_task": "Сотрудник склада ПФ: смешать пасту по рецепту; записать фактический расход",
                        "screen_id": "coloring_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                        "approval_sources": [
                          {
                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                            "points": [
                              32
                            ],
                            "date": "2026-10-15",
                            "scope": "assignment role and physical place"
                          }
                        ],
                        "children": [
                          {
                            "id": "f_227_4165",
                            "title": "Экран «Колеровка»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nПробная колеровка на 1 кг прозрачного А; передать выкрас на проверку\nРоль: Сотрудник склада ПФ; при отсутствии — колеровщик производства.\nМесто: Цех колеровки на производстве.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПроверка цвета:\nПосле «Выполнено» открывается этап проверки цвета в том же задании. Сохранить исполнителя, время начала / конца, дельту и весь дополнительный расход пигментов. Задание не завершать до принятия цвета; при повторении прежнего цвета ждать лабораторного сравнения и решения лаборатории после внешнего согласования в Битриксе.",
                            "open": true,
                            "links": [
                              "f_230_5118"
                            ],
                            "edge": "Выполнено — Паста приготовлена",
                            "approval_badge_visible": false,
                            "screen_task": "Пробная колеровка на 1 кг прозрачного А; передать выкрас на проверку",
                            "screen_id": "coloring_tasks",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  32
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": [
                              {
                                "id": "f_230_5118",
                                "title": "Поле «Исходный счёт» заполнено?",
                                "kind": "check",
                                "notes": "Проверить поле «Исходный счёт» в исходной позиции / задании колеровки.\n• Заполнено — повторяем цвет прежнего заказа: лабораторное сравнение старого и нового выкрасов, затем решение лаборатории после переписки с менеджером в Битриксе.\n• Пустое — колеровщик самостоятельно принимает цвет в текущем задании.\nСсылка на исходный счёт сохраняется в лабораторном задании и лабораторном задании. Если прежний образец / выкрас недоступен, фиксировать проблему; не переключать автоматически на самостоятельное принятие.",
                                "open": true,
                                "links": [
                                  "quality_syringe_self",
                                  "quality_syringe_lab"
                                ],
                                "edge": "Колеровка выполнена — перейти к проверке цвета",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "quality_syringe_self",
                                    "title": "Экран «Колеровка»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• База, цвет, партия, исходный рецепт, выкрас / образец.\n• Фактические и дополнительные пигменты, исполнитель, начало / конец колеровки, дельта.\n• Решение по цвету и история доведений.\n\nТекущее задание:\nПроверить цвет и принять решение в текущем задании колеровки\nРоль: Сотрудник склада ПФ или колеровщик производства — исполнитель колеровки.\n\nДействия:\n• «Цвет принят» — подтвердить соответствие.\n• «На доведение» — сохранить причину и продолжить доведение.\n• «Проблема» — сохранить причину в том же задании.\n\nРезультат:\nКолеровщик сам решает, выпускать цвет или нет. Отдельное лабораторное задание не создаётся. При сложности консультируется с автором рецепта / главным технологом; исходное задание сохраняется.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.\n\nЦвет принимает сам исполнитель колеровки; при необходимости обращается к технологу по колеровке. Точное место этой проверки остаётся на согласовании.",
                                    "open": true,
                                    "links": [
                                      "local_syringe_paste_to_pf",
                                      "f_230_5126",
                                      "local_quality_unfixable_defect_route"
                                    ],
                                    "edge": "Пустое — самостоятельное принятие",
                                    "approval_badge_visible": true,
                                    "screen_task": "Проверить цвет и принять решение в текущем задании колеровки",
                                    "screen_id": "coloring_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          33
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "local_syringe_paste_to_pf",
                                        "title": "Экран «Задания склада»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса / количество, место отправления и назначения, факт перемещения.\n• Фильтры / сортировка: Роль, рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nСотрудник склада ПФ: принять и перенести пасту на склад ПФ для фасовки\nРоль: Сотрудник склада ПФ.\nМесто: Цех колеровки → склад ПФ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nТолько физическая передача для фасовки. В 1С паста остаётся на Производстве: отдельного выпуска пасты и перемещения Производство → ПФ в этой цепочке нет.",
                                        "open": true,
                                        "links": [
                                          "f_227_4167"
                                        ],
                                        "edge": "Цвет принят",
                                        "approval_badge_visible": false,
                                        "screen_task": "Сотрудник склада ПФ: принять и перенести пасту на склад ПФ для фасовки",
                                        "screen_id": "warehouse_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              34
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          },
                                          {
                                            "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                            "date": "2026-10-15",
                                            "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "f_227_4167",
                                            "title": "Экран «Фасовка»",
                                            "kind": "screen",
                                            "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: физическое место фасовки, тип работы, продукция, исполнитель, статус, срок и приоритет.\n\nТекущее задание:\nСотрудник склада ПФ: наполнить шприцы; подтвердить количество по фасовкам и партию\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ — отдельное помещение, участок мелкой фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФасовка принятой пасты выполняется на складе ПФ. Подтверждать фактический выпуск отдельно по каждой номенклатуре/фасовке.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.\n\nФасовки: 5 мл / 10 мл / 12,5 мл; фактический выход по каждой отдельно. Исполнитель фасовки — сотрудник склада ПФ; физическое место — склад ПФ.",
                                            "open": true,
                                            "links": [
                                              "local_syringe_labels",
                                              "equipment_wash_decision"
                                            ],
                                            "edge": "Выполнено — Физически; без перемещения пасты в 1С",
                                            "approval_badge_visible": false,
                                            "screen_task": "Сотрудник склада ПФ: наполнить шприцы; подтвердить количество по фасовкам и партию",
                                            "screen_id": "packing_tasks",
                                            "review_status": "partial",
                                            "ui_review_status": "pending",
                                            "approved_scope": "Роль — Сотрудник склада ПФ; фасовка затирки на складе ПФ; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                            "approval_sources": [
                                              {
                                                "comment_id": "AAACIF6YlTM",
                                                "author": "Данила"
                                              },
                                              {
                                                "comment_id": "AAACIF6YlTQ",
                                                "author": "Данила"
                                              },
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                "points": [
                                                  34
                                                ],
                                                "date": "2026-10-15",
                                                "scope": "assignment role and physical place"
                                              },
                                              {
                                                "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                "date": "2026-10-15",
                                                "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "local_syringe_labels",
                                                "title": "Система: автоматически подготовить макет и документ печати",
                                                "kind": "task",
                                                "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки. Состав маркировки шприцев требует уточнения; правило дополнительного стикера для шприцев отдельно не утверждено.",
                                                "open": true,
                                                "links": [
                                                  "mark_ready_local_syringe_labels"
                                                ],
                                                "edge": "Выполнено — Факт фасовки подтверждён",
                                                "approval_badge_visible": false,
                                                "review_status": "pending",
                                                "automatic_step": true,
                                                "children": [
                                                  {
                                                    "id": "mark_ready_local_syringe_labels",
                                                    "title": "Экран «Маркировка»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить маркировку шприцов: цвет, фасовка и партия.\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ.\nСостав маркировки шприцев требует уточнения; правило дополнительного стикера для шприцев отдельно не утверждено.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                                    "open": true,
                                                    "links": [
                                                      "local_syringe_production"
                                                    ],
                                                    "edge": "Макет и документ печати сформированы",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "Наклеить маркировку шприцов: цвет, фасовка и партия.",
                                                    "screen_id": "marking",
                                                    "review_status": "pending",
                                                    "ui_review_status": "pending",
                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                        "points": [
                                                          34
                                                        ],
                                                        "date": "2026-10-15",
                                                        "scope": "assignment role and physical place"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                        "date": "2026-10-15",
                                                        "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                                      }
                                                    ],
                                                    "children": [
                                                      {
                                                        "id": "local_syringe_production",
                                                        "title": "1С: выпуск готовых шприцов по фактическому количеству",
                                                        "kind": "onec",
                                                        "notes": "В продукции — выпущенные шприцы нужного цвета и фасовки; в материалах — фактически использованные пигменты, добавки и пустые шприцы. Один метод производства; не выпускать промежуточную пасту повторно.",
                                                        "open": true,
                                                        "links": [
                                                          "local_syringe_output_allocation"
                                                        ],
                                                        "edge": "",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": [
                                                          {
                                                            "id": "local_syringe_output_allocation",
                                                            "title": "Экран «План замеса и оборудования»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nРаспределить готовые шприцы: в комплект, отдельный заказ или на склад\nРоль: Сотрудник по планированию производства.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nшприцы продаются отдельно или с затиркой. замес от 1 кг, остаток выпуска — пополнение. Сохранить количество и партии по назначениям; отгружать отдельные шприцы без обязательной комплектации затирки.",
                                                            "open": true,
                                                            "links": [
                                                              "f_258_5076",
                                                              "local_syringe_gp_transfer"
                                                            ],
                                                            "edge": "Выпуск подтверждён",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Распределить готовые шприцы: в комплект, отдельный заказ или на склад",
                                                            "screen_id": "batch_planning",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "children": [
                                                              {
                                                                "id": "f_258_5076",
                                                                "title": "Схема «Комплектация затирки»",
                                                                "kind": "route",
                                                                "open": true,
                                                                "links": [
                                                                  "f_241_5170"
                                                                ],
                                                                "edge": "Подтвердить план — Для комплекта затирки",
                                                                "approval_badge_visible": false,
                                                                "review_status": "pending",
                                                                "route_target_id": "f_241_5170",
                                                                "children": []
                                                              },
                                                              {
                                                                "id": "local_syringe_gp_transfer",
                                                                "title": "1С: оформить МХ-18 — передачу выпущенных шприцов на склад ГП",
                                                                "kind": "onec",
                                                                "notes": "Только шприцы, назначенные в отдельный заказ или пополнение ГП. Передача в контексте уже проведённого производства, без отдельного дублирующего перемещения. Пасту в 1С отдельно не производить и не перемещать. Точные склады метода выпуска требуют сверки с 1С.\nпри передаче произведённой ГП на склад МХ-18 оформляют всегда.",
                                                                "open": true,
                                                                "links": [
                                                                  "local_syringe_gp_move"
                                                                ],
                                                                "edge": "Подтвердить план — Отдельный заказ / пополнение",
                                                                "approval_badge_visible": false,
                                                                "review_status": "approved",
                                                                "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                    "comment_id": "AAACGqcevZg",
                                                                    "author": "Данила",
                                                                    "date": "2026-10-08"
                                                                  }
                                                                ],
                                                                "children": [
                                                                  {
                                                                    "id": "local_syringe_gp_move",
                                                                    "title": "Экран «Задания склада»",
                                                                    "kind": "screen",
                                                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание складу: перенести отдельные шприцы и пополнение со склада ПФ на ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФизическое место фасовки — склад ПФ; учёт выпуска — по действующей схеме производства. Передача в комплектацию на том же участке не требует повторной перевозки.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "local_syringe_gp_ready"
                                                                    ],
                                                                    "edge": "Передача оформлена",
                                                                    "approval_badge_visible": false,
                                                                    "screen_task": "Задание складу: перенести отдельные шприцы и пополнение со склада ПФ на ГП",
                                                                    "screen_id": "warehouse_tasks",
                                                                    "review_status": "pending",
                                                                    "ui_review_status": "pending",
                                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                    "approval_sources": [
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                        "points": [
                                                                          42
                                                                        ],
                                                                        "date": "2026-10-15",
                                                                        "scope": "assignment role and physical place"
                                                                      }
                                                                    ],
                                                                    "children": [
                                                                      {
                                                                        "id": "local_syringe_gp_ready",
                                                                        "title": "Шприцы на ГП: резерв под отдельный заказ или свободный остаток",
                                                                        "kind": "result",
                                                                        "notes": "",
                                                                        "open": true,
                                                                        "links": [],
                                                                        "edge": "Выполнено — Шприцы физически приняты на ГП",
                                                                        "approval_badge_visible": false,
                                                                        "review_status": "pending",
                                                                        "children": []
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "id": "f_230_5126",
                                        "title": "Экран «Колеровка»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nСкорректировать пасту; дописать расход; повторить пробный выкрас\nРоль: Сотрудник склада ПФ; при отсутствии — колеровщик производства.\nМесто: Цех колеровки на производстве.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                        "open": true,
                                        "links": [
                                          "f_227_4165"
                                        ],
                                        "edge": "На доведение",
                                        "approval_badge_visible": false,
                                        "screen_task": "Скорректировать пасту; дописать расход; повторить пробный выкрас",
                                        "screen_id": "coloring_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              32
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": []
                                      }
                                    ]
                                  },
                                  {
                                    "id": "quality_syringe_lab",
                                    "title": "Экран «ОТК»",
                                    "kind": "screen",
                                    "notes": "Роль: Сотрудник ОТК.\nМесто: Лаборатория ОТК.\n\nДанные:\n• Текущий счёт / позиция, партия, поле «Исходный счёт» и прежний образец.\n• Старый и новый выкрасы рядом, результат сравнения и итоговое решение.\n\nВход:\nПоле «Исходный счёт» заполнено; после колеровки пробу передают в лабораторию. Задание остаётся в очереди ОТК до решения.\n\nЗадание:\nСделать выкрасы и обсудить результат с ответственным менеджером / производством. Переписку проводят самостоятельно в Битриксе; отдельного экрана менеджера и автоматической отправки сообщений нет.\n\nДействия:\n• «Взять в работу» — начать лабораторную проверку.\n• «Продолжить маршрут» — зафиксировать положительное решение после согласования и разрешить следующий этап.\n• «Отправить на доведение» — указать согласованные замечания и вернуть текущую колеровку на доведение.\n• «Проблема» — указать причину и оставить задание на ожидании.\n\nРезультат:\nРешение фиксирует лаборатория в том же задании ОТК. До решения маршрут не продолжается. После доведения повторная проба возвращается на проверку; сохраняются история, счёт, партия и исходное задание.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.\n\nВопрос: согласовать формат поля итогового решения лаборатории.",
                                    "open": true,
                                    "links": [
                                      "local_syringe_paste_to_pf",
                                      "f_230_5126",
                                      "local_quality_unfixable_defect_route"
                                    ],
                                    "edge": "Заполнено — повторение цвета",
                                    "approval_badge_visible": true,
                                    "screen_task": "Сравнить выкрасы; после согласования продолжить маршрут или вернуть на доведение",
                                    "screen_id": "quality_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          11
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "local_syringe_material_move",
                        "title": "Экран «Задания склада»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание складу: передать недостающие пигменты и пустые шприцы\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nИсточник пустых шприцов уточнить. Если материала нет и на исходном складе, задача остаётся в ожидании снабжения; смешивание не запускать.",
                        "open": true,
                        "links": [
                          "local_syringe_material_transfer"
                        ],
                        "edge": "Нет",
                        "approval_badge_visible": false,
                        "screen_task": "Задание складу: передать недостающие пигменты и пустые шприцы",
                        "screen_id": "warehouse_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "children": [
                          {
                            "id": "local_syringe_material_transfer",
                            "title": "1С: перемещение недостающих материалов на Производство",
                            "kind": "onec",
                            "notes": "Пигменты — со склада сырья, если они не были на производстве. Пустые шприцы — с фактического склада учёта. Уже находящиеся на производстве материалы повторно не перемещать.",
                            "open": true,
                            "links": [
                              "local_syringe_paste_mix"
                            ],
                            "edge": "Выполнено — Материалы переданы",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_257_6365",
        "title": "Маршрут колерованной продукции",
        "kind": "route",
        "open": true,
        "links": [],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_227_4050",
            "title": "Больше N (250 кг)?",
            "kind": "check",
            "open": true,
            "links": [
              "f_227_4075",
              "f_271_5169"
            ],
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_227_4075",
                "title": "Экран «Задания технолога»",
                "kind": "screen",
                "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nРешить, использовать ли переработку; выбрать партии и массу\nРоль: Химик-технолог; также главный технолог, технолог по колеровке и сотрудник по планированию производства. Окончательное решение до замеса — химик-технолог.\nМесто: Лаборатория ОТК.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nЗадание технологу — использовать переработку или нет? Весь доступный список переработки: 1. Совпадает база и цвет. 2. Совпадает только цвет. 3. Все остальные позиции. Фильтр по базе; остальные позиции доступны для ручного выбора. Технолог проверяет совместимость и выбирает партии и массу. Срок решения — 30 минут.\nРешение по переработке: уведомление всем ответственным; приоритет главный технолог → технолог → планировщик. Общие 30 минут; более высокая роль может изменить решение в этом же окне.",
                "open": true,
                "links": [
                  "f_227_4094"
                ],
                "edge": "Да",
                "approval_badge_visible": false,
                "screen_task": "Решить, использовать ли переработку; выбрать партии и массу",
                "screen_id": "technology_tasks",
                "review_status": "pending",
                "ui_review_status": "pending",
                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                    "comment_id": "AAACArc6Lfc",
                    "author": "Данила"
                  },
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                    "points": [
                      17
                    ],
                    "date": "2026-10-15",
                    "scope": "assignment role and physical place"
                  }
                ],
                "children": [
                  {
                    "id": "f_227_4094",
                    "title": "Технолог разрешил переработку и указал массу?",
                    "kind": "check",
                    "notes": "Решение по переработке: уведомление всем ответственным; приоритет главный технолог → технолог → планировщик. Общие 30 минут; более высокая роль может изменить решение в этом же окне.",
                    "open": true,
                    "links": [
                      "f_227_4096",
                      "f_227_4101"
                    ],
                    "edge": "Подтвердить рецепт / решение — Решение",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "approval_sources": [
                      {
                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                        "comment_id": "AAACArc6Lfc",
                        "author": "Данила"
                      }
                    ],
                    "children": [
                      {
                        "id": "f_227_4096",
                        "title": "Система: зафиксировать согласованные партию и массу переработки",
                        "kind": "task",
                        "open": true,
                        "links": [
                          "f_227_4097"
                        ],
                        "edge": "Да",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "automatic_step": true,
                        "children": [
                          {
                            "id": "f_227_4097",
                            "title": "Система: рассчитать оставшийся объём после переработки",
                            "kind": "task",
                            "open": true,
                            "links": [
                              "f_227_4098"
                            ],
                            "edge": "",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "automatic_step": true,
                            "children": [
                              {
                                "id": "f_227_4098",
                                "title": "Объема ПФ достаточно для оставшегося объёма с учетом лимитов?",
                                "kind": "check",
                                "notes": "Две линии в карте не подписаны: к резерву ПФ — достаточный объём, к новому замесу — недостаточный. Уточнение следует из текста самих узлов; при импорте использовать явные подписи.",
                                "open": true,
                                "links": [
                                  "f_227_4099",
                                  "f_227_4100"
                                ],
                                "edge": "",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "f_227_4099",
                                    "title": "Система: зарезервировать ПФ на оставшийся объём и зафиксировать партию",
                                    "kind": "task",
                                    "open": true,
                                    "links": [
                                      "f_227_4107"
                                    ],
                                    "edge": "Да — ПФ достаточно",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "automatic_step": true,
                                    "children": [
                                      {
                                        "id": "f_227_4107",
                                        "title": "Маршрут обеспечения из ПФ",
                                        "kind": "route",
                                        "notes": "Сохранить выбранную колеровку на производстве и согласованную переработку. Подготовка и перемещение ПФ выполняются через обеспечение из ПФ.\nПоказанная далее колеровка начинается после выполнения обеспечения ПФ; не параллельно ему.",
                                        "open": true,
                                        "links": [
                                          "f_258_5065",
                                          "f_241_5154"
                                        ],
                                        "edge": "",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_258_5065",
                                        "continuation_after_route": true,
                                        "children": [
                                          {
                                            "id": "f_241_5154",
                                            "title": "Далее → схема «Колеровка на производстве»",
                                            "kind": "route",
                                            "open": true,
                                            "links": [
                                              "f_241_5114"
                                            ],
                                            "edge": "После подготовки ПФ",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "route_target_id": "f_241_5114",
                                            "children": []
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "id": "f_227_4100",
                                    "title": "Система: направить недостающий объём в маршрут «Новый замес»",
                                    "kind": "task",
                                    "open": true,
                                    "links": [
                                      "f_241_5050"
                                    ],
                                    "edge": "Нет — ПФ недостаточно",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "automatic_step": true,
                                    "children": [
                                      {
                                        "id": "f_241_5050",
                                        "title": "Маршрут новый замес",
                                        "kind": "route",
                                        "notes": "После нового замеса продолжить по сохранённому назначению: проверить, задано ли место колеровки этой части. Базу повторно не искать и не обеспечивать.",
                                        "open": true,
                                        "links": [
                                          "f_227_4068",
                                          "local_resume_coloring_after_batch"
                                        ],
                                        "edge": "",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_227_4068",
                                        "continuation_after_route": true,
                                        "children": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "f_227_4101",
                        "title": "Система: направить весь объём в маршрут «Новый замес» без переработки",
                        "kind": "task",
                        "open": true,
                        "links": [
                          "f_227_4119"
                        ],
                        "edge": "Нет / срок истёк",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "automatic_step": true,
                        "children": [
                          {
                            "id": "f_227_4119",
                            "title": "Маршрут новый замес",
                            "kind": "route",
                            "notes": "После нового замеса продолжить по сохранённому назначению: проверить, задано ли место колеровки этой части. Базу повторно не искать и не обеспечивать.",
                            "open": true,
                            "links": [
                              "f_227_4068",
                              "local_resume_coloring_after_batch"
                            ],
                            "edge": "",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "route_target_id": "f_227_4068",
                            "continuation_after_route": true,
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "f_271_5169",
                "title": "Колеруем образец объёмом 1 кг?",
                "kind": "check",
                "open": true,
                "links": [
                  "f_300_6438",
                  "f_227_4198"
                ],
                "edge": "Нет",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "f_300_6438",
                    "title": "Образец 1 кг: Есть нужная база на складе ГП в фасовке 1 кг?",
                    "kind": "check",
                    "notes": "",
                    "open": true,
                    "links": [
                      "f_271_5173",
                      "f_300_6454"
                    ],
                    "edge": "Да — образец 1 кг",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "f_271_5173",
                        "title": "Экран «Задания технолога»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nЗадание технологу: рассчитать рецепт образца 1 кг и выбрать КМ или производство\nРоль: Технолог по колеровке.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nБаза уже найдена на ГП либо ПФ. Технолог рассчитывает рецепт образца, определяет необходимую массу выбранной базы и выбирает КМ или производство. После подтверждения — резерв и фиксация партии. Повторный поиск базы и новый замес в этой ветке не нужны. Штукатурка — только производство.",
                        "open": true,
                        "links": [
                          "f_305_6994"
                        ],
                        "edge": "Да — база на ГП",
                        "approval_badge_visible": false,
                        "screen_task": "Задание технологу: рассчитать рецепт образца 1 кг и выбрать КМ или производство",
                        "screen_id": "technology_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                        "approval_sources": [
                          {
                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                            "points": [
                              15,
                              16
                            ],
                            "date": "2026-10-15",
                            "scope": "assignment role and physical place"
                          }
                        ],
                        "children": [
                          {
                            "id": "f_305_6994",
                            "title": "Система: зарезервировать весь необходимый объём выбранной базы и зафиксировать партию",
                            "kind": "task",
                            "notes": "Внутреннее действие Лакомки. Использовать источник ГП или ПФ, найденный до расчёта рецепта образца. Сохранить источник и количество по партии.",
                            "open": true,
                            "links": [
                              "local_sample_reserved_source"
                            ],
                            "edge": "Подтвердить рецепт / решение — Рецепт и место подтверждены",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "automatic_step": true,
                            "children": [
                              {
                                "id": "local_sample_reserved_source",
                                "title": "Выбранная база образца — ПФ?",
                                "kind": "check",
                                "open": true,
                                "links": [
                                  "local_sample_pf_supply",
                                  "local_sample_gp_place"
                                ],
                                "edge": "База зарезервирована",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "local_sample_gp_place",
                                    "title": "Где технолог назначил колеровку образца из ГП?",
                                    "kind": "check",
                                    "open": true,
                                    "links": [
                                      "f_300_6524",
                                      "f_300_6530"
                                    ],
                                    "edge": "Нет — готовые вёдра ГП",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "children": [
                                      {
                                        "id": "f_300_6524",
                                        "title": "Маршрут колеровки на КМ",
                                        "kind": "route",
                                        "open": true,
                                        "links": [
                                          "f_241_5098"
                                        ],
                                        "edge": "Технолог выбрал КМ; не штукатурка",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_241_5098",
                                        "children": []
                                      },
                                      {
                                        "id": "f_300_6530",
                                        "title": "Маршрут колеровки на производстве",
                                        "kind": "route",
                                        "open": true,
                                        "links": [
                                          "f_241_5114"
                                        ],
                                        "edge": "Технолог выбрал производство / штукатурка",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_241_5114",
                                        "children": []
                                      }
                                    ]
                                  },
                                  {
                                    "id": "local_sample_pf_supply",
                                    "title": "Маршрут обеспечения из ПФ",
                                    "kind": "route",
                                    "open": true,
                                    "links": [
                                      "f_258_5065",
                                      "local_sample_pf_coloring_destination"
                                    ],
                                    "edge": "Да — источник ПФ",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "route_target_id": "f_258_5065",
                                    "continuation_after_route": true,
                                    "children": [
                                      {
                                        "id": "local_sample_pf_coloring_destination",
                                        "title": "Где технолог назначил колеровку образца?",
                                        "kind": "check",
                                        "open": true,
                                        "links": [
                                          "f_241_5098",
                                          "f_241_5114"
                                        ],
                                        "edge": "После подготовки ПФ",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "children": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "f_300_6454",
                        "title": "Образец 1 кг: ПФ обеспечивает необходимый объём с учётом минимального остатка?",
                        "kind": "check",
                        "open": true,
                        "links": [
                          "f_271_5173",
                          "local_sample_missing_base_recipe"
                        ],
                        "edge": "Нет — проверить ПФ",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "local_sample_missing_base_recipe",
                            "title": "Экран «Задания технолога»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nЗадание технологу: рассчитать рецепт образца 1 кг для новой базы и выбрать КМ или производство\nРоль: Технолог по колеровке.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nБазы нет ни на ГП, ни на ПФ. До планирования нового замеса технолог определяет необходимую массу базы и рецепт образца, выбирает место колеровки. Решение сохраняется: после готовности новой базы образец направляется на выбранную колеровку. Штукатурка — только производство.",
                            "open": true,
                            "links": [
                              "local_sample_new_batch_route"
                            ],
                            "edge": "Нет — нужна новая база",
                            "approval_badge_visible": false,
                            "screen_task": "Задание технологу: рассчитать рецепт образца 1 кг для новой базы и выбрать КМ или производство",
                            "screen_id": "technology_tasks",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  15,
                                  16
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": [
                              {
                                "id": "local_sample_new_batch_route",
                                "title": "Маршрут новый замес",
                                "kind": "route",
                                "notes": "Выполнить новый замес по потребности, заранее рассчитанной технологом. После готовности ПФ зарезервировать выпущенную базу, зафиксировать партию и направить образец на ранее выбранную колеровку. Не резервировать отсутствующую базу до её выпуска.",
                                "open": true,
                                "links": [
                                  "f_227_4068",
                                  "local_sample_fresh_batch_destination"
                                ],
                                "edge": "Подтвердить рецепт / решение — Рецепт и место подтверждены",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "route_target_id": "f_227_4068",
                                "continuation_after_route": true,
                                "children": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "f_227_4198",
                    "title": "Сравнить очереди КМ и производства: выбрать меньшую; при равенстве — производство",
                    "kind": "check",
                    "notes": "Первичное сравнение очередей для обычного объёма до 250 кг. При равенстве — производство. Если база отсутствует, решение предварительное: после готовности нового ПФ повторить сравнение. Образец идёт по решению технолога, большой объём — по распределению частей замеса. Штукатурка только на производстве.",
                    "open": true,
                    "links": [
                      "f_227_4102",
                      "f_227_4060"
                    ],
                    "edge": "Нет — обычный объём",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "f_227_4102",
                        "title": "Система: рассчитать количество вёдер: получить из спецификации",
                        "kind": "task",
                        "open": true,
                        "links": [
                          "f_227_4104"
                        ],
                        "edge": "КМ свободнее; не штукатурка",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "automatic_step": true,
                        "children": [
                          {
                            "id": "f_227_4104",
                            "title": "Количество вёдер допустимо для КМ? Получить из справочника порогов",
                            "kind": "check",
                            "open": true,
                            "links": [
                              "f_227_4059",
                              "f_227_4060"
                            ],
                            "edge": "",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "f_227_4059",
                                "title": "Проверка готовой продукции в вёдрах на складе ГП",
                                "kind": "check",
                                "open": true,
                                "links": [
                                  "f_227_4064",
                                  "f_227_4061"
                                ],
                                "edge": "Да — допустимо для КМ",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "f_227_4064",
                                    "title": "Система: зарезервировать все необходимое кол-во ведер и зафиксировать партию",
                                    "kind": "task",
                                    "open": true,
                                    "links": [
                                      "f_227_4105"
                                    ],
                                    "edge": "Да",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "automatic_step": true,
                                    "children": [
                                      {
                                        "id": "f_227_4105",
                                        "title": "Маршрут Колеровка на КМ",
                                        "kind": "route",
                                        "open": true,
                                        "links": [
                                          "f_241_5106"
                                        ],
                                        "edge": "ГП уже в вёдрах: без фасовки",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_241_5098",
                                        "children": [
                                          {
                                            "id": "f_241_5106",
                                            "title": "Далее → схема «Колеровка на КМ»",
                                            "kind": "route",
                                            "open": true,
                                            "links": [
                                              "f_241_5098"
                                            ],
                                            "edge": "",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "route_target_id": "f_241_5098",
                                            "children": []
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "id": "f_227_4061",
                                    "title": "ПФ полностью обеспечивает объём для КМ с учётом минимального остатка?",
                                    "kind": "check",
                                    "open": true,
                                    "links": [
                                      "local_colored_km_pf_reserve",
                                      "f_227_4132"
                                    ],
                                    "edge": "Нет",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "children": [
                                      {
                                        "id": "local_colored_km_pf_reserve",
                                        "title": "Система: зарезервировать весь необходимый объём ПФ и зафиксировать партию",
                                        "kind": "task",
                                        "notes": "После резерва перейти в обеспечение из ПФ; сохранить назначение КМ. Там выполняются набор вёдер, физическая передача и перемещение ПФ → Производство в 1С.",
                                        "open": true,
                                        "links": [
                                          "local_colored_km_pf_supply"
                                        ],
                                        "edge": "Да — ПФ достаточно",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "automatic_step": true,
                                        "children": [
                                          {
                                            "id": "local_colored_km_pf_supply",
                                            "title": "Маршрут обеспечения из ПФ",
                                            "kind": "route",
                                            "notes": "Продолжение после подготовки и перемещения базы, назначение КМ сохраняется.",
                                            "open": true,
                                            "links": [
                                              "f_258_5065",
                                              "f_241_5098"
                                            ],
                                            "edge": "Назначена КМ",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "route_target_id": "f_258_5065",
                                            "continuation_after_route": true,
                                            "children": []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": "f_227_4060",
                                "title": "ПФ полностью обеспечивает объём для производства с учётом минимального остатка?",
                                "kind": "check",
                                "notes": "Для штукатурки при выборе базы под колеровку сначала проверить ПФ, затем ГП в вёдрах, затем новый замес. Отдельный поиск уже готовой нужной продукции не является выбором базы.",
                                "open": true,
                                "links": [
                                  "f_227_4065",
                                  "f_227_4203",
                                  "f_227_4132"
                                ],
                                "edge": "Нет — недопустимо для КМ",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "f_227_4065",
                                    "title": "Система: зарезервировать весь необходимый объем ПФ и зафиксировать партию",
                                    "kind": "task",
                                    "open": true,
                                    "links": [
                                      "f_227_4106"
                                    ],
                                    "edge": "Да",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "automatic_step": true,
                                    "children": [
                                      {
                                        "id": "f_227_4106",
                                        "title": "Маршрут обеспечения из ПФ",
                                        "kind": "route",
                                        "notes": "Сохранить выбранную колеровку на производстве и согласованную переработку. Подготовка и перемещение ПФ выполняются через обеспечение из ПФ.\nПоказанная далее колеровка начинается после выполнения обеспечения ПФ; не параллельно ему.",
                                        "open": true,
                                        "links": [
                                          "f_258_5065",
                                          "f_241_5162"
                                        ],
                                        "edge": "Источник: ПФ",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_258_5065",
                                        "continuation_after_route": true,
                                        "children": [
                                          {
                                            "id": "f_241_5162",
                                            "title": "Далее → схема «Колеровка на производстве»",
                                            "kind": "route",
                                            "open": true,
                                            "links": [
                                              "f_241_5114"
                                            ],
                                            "edge": "После подготовки ПФ",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "route_target_id": "f_241_5114",
                                            "children": []
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "id": "f_227_4203",
                                    "title": "Штукатурка: есть необходимая база в готовой продукции в вёдрах на складе ГП?",
                                    "kind": "check",
                                    "open": true,
                                    "links": [
                                      "local_colored_plaster_gp_reserve",
                                      "local_plaster_new_batch_route"
                                    ],
                                    "edge": "Нет: штукатурка",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "children": [
                                      {
                                        "id": "local_colored_plaster_gp_reserve",
                                        "title": "Система: зарезервировать необходимый объём ГП для штукатурки и зафиксировать партию",
                                        "kind": "task",
                                        "notes": "Локальный резерв в Лакомке. Колеровка штукатурки допускается только на производстве.",
                                        "open": true,
                                        "links": [
                                          "f_241_5114"
                                        ],
                                        "edge": "Да — ГП достаточно",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "automatic_step": true,
                                        "children": []
                                      },
                                      {
                                        "id": "local_plaster_new_batch_route",
                                        "title": "Маршрут новый замес",
                                        "kind": "route",
                                        "notes": "Для штукатурки: после готовности новой базы сразу колеровка на производстве. Без сравнения очередей КМ и производства. Штукатурку на КМ не направляем.",
                                        "open": true,
                                        "links": [
                                          "f_227_4068",
                                          "f_241_5114"
                                        ],
                                        "edge": "Нет — нужен новый замес",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "route_target_id": "f_227_4068",
                                        "continuation_after_route": true,
                                        "children": []
                                      }
                                    ]
                                  },
                                  {
                                    "id": "f_227_4132",
                                    "title": "Маршрут Новый замес",
                                    "kind": "route",
                                    "notes": "После нового замеса продолжить по сохранённому назначению: проверить, задано ли место колеровки этой части. Базу повторно не искать и не обеспечивать.",
                                    "open": true,
                                    "links": [
                                      "f_227_4068",
                                      "local_resume_coloring_after_batch"
                                    ],
                                    "edge": "Нет: остальные",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "route_target_id": "f_227_4068",
                                    "continuation_after_route": true,
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_257_6364",
        "title": "ГП",
        "kind": "route",
        "open": true,
        "links": [],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_227_4043",
            "title": "Система: резерв",
            "kind": "task",
            "open": true,
            "links": [
              "f_227_4177"
            ],
            "approval_badge_visible": false,
            "review_status": "pending",
            "automatic_step": true,
            "children": [
              {
                "id": "f_227_4177",
                "title": "Маршрут «Готовая продукция со склада»",
                "kind": "route",
                "open": true,
                "links": [
                  "f_227_4199"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "f_227_4199",
                    "title": "В каком виде есть ГП на складе?",
                    "kind": "check",
                    "open": true,
                    "links": [
                      "f_227_4044",
                      "f_227_4045",
                      "f_227_4046"
                    ],
                    "edge": "",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "f_227_4044",
                        "title": "Маршрут подготовки готовой продукции к отгрузке",
                        "kind": "route",
                        "open": true,
                        "links": [
                          "local_gp_sticker_required"
                        ],
                        "edge": "Полностью подходит",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "local_gp_sticker_required",
                            "title": "Нужен дополнительный текст на стикере?",
                            "kind": "check",
                            "notes": "Для полностью совпадающей ГП маркировка уже есть. Печатать дополнительный стикер только при дополнительном требовании менеджера. Простая замена этикетки и перефасовка остаются в своих ветках.",
                            "open": true,
                            "links": [
                              "f_227_4076",
                              "f_227_4081"
                            ],
                            "edge": "ГП полностью подходит",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "f_227_4076",
                                "title": "Экран «Задания склада»",
                                "kind": "screen",
                                "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику: подготовить позиции к отгрузке\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:",
                                "open": true,
                                "links": [
                                  "f_227_4092"
                                ],
                                "edge": "Нет — маркировка подходит",
                                "approval_badge_visible": false,
                                "screen_task": "Задание кладовщику: подготовить позиции к отгрузке",
                                "screen_id": "warehouse_tasks",
                                "review_status": "partial",
                                "ui_review_status": "pending",
                                "approved_scope": "Роль и место подготовки заказа; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                "approval_sources": [
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACIF6YlPg",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACIF6YlPY",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACIF6YlPU",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                    "points": [
                                      1,
                                      44
                                    ],
                                    "date": "2026-10-15",
                                    "scope": "assignment role and physical place"
                                  }
                                ],
                                "children": [
                                  {
                                    "id": "f_227_4092",
                                    "title": "Перемещение в 1с со склада ГП Лакма на Склад ГП",
                                    "kind": "onec",
                                    "open": true,
                                    "links": [
                                      "f_227_4093"
                                    ],
                                    "edge": "Выполнено",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "children": [
                                      {
                                        "id": "f_227_4093",
                                        "title": "Готов к отгрузке",
                                        "kind": "result",
                                        "open": true,
                                        "links": [],
                                        "edge": "",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "children": []
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": "f_227_4081",
                                "title": "Система: автоматически подготовить макет и документ печати",
                                "kind": "task",
                                "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки. Только если дополнительная маркировка нужна по требованиям позиции; существующий корректный стикер не перепечатывать без необходимости.",
                                "open": true,
                                "links": [
                                  "mark_ready_f_227_4081"
                                ],
                                "edge": "Да",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "automatic_step": true,
                                "children": [
                                  {
                                    "id": "mark_ready_f_227_4081",
                                    "title": "Экран «Маркировка»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить дополнительный стикер на готовую продукцию.\nРоль: Сотрудник склада; этикеровщик выдаёт этикетки.\nМесто: Склад ГП.\nТолько если дополнительная маркировка нужна по требованиям позиции; существующий корректный стикер не перепечатывать без необходимости.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                    "open": true,
                                    "links": [
                                      "f_227_4076"
                                    ],
                                    "edge": "Макет и документ печати сформированы",
                                    "approval_badge_visible": false,
                                    "screen_task": "Наклеить дополнительный стикер на готовую продукцию.",
                                    "screen_id": "marking",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          3
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "f_227_4045",
                        "title": "Маршрут перефасовки готовой продукции",
                        "kind": "route",
                        "open": true,
                        "links": [
                          "f_227_4077"
                        ],
                        "edge": "Есть объём, но другая фасовка",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "f_227_4077",
                            "title": "Система: автоматически подготовить макет и документ печати",
                            "kind": "task",
                            "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки.",
                            "open": true,
                            "links": [
                              "mark_ready_f_227_4077"
                            ],
                            "edge": "",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "automatic_step": true,
                            "children": [
                              {
                                "id": "mark_ready_f_227_4077",
                                "title": "Макет и документ печати готовы; задание маркировки доступно после готовности продукции",
                                "kind": "result",
                                "notes": "Макет связан с позицией и заданием маркировки. Печать доступна из карточки маркировки; исполнение — после готовности продукции.",
                                "open": true,
                                "links": [
                                  "local_repacking_assign_place"
                                ],
                                "edge": "Макет и документ печати сформированы",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "local_repacking_assign_place",
                                    "title": "Экран «Фасовка»",
                                    "kind": "screen",
                                    "notes": "Текущее задание:\nПланировщик: выбрать место и исполнителя перефасовки ГП по загрузке сотрудников\nРоль: Сотрудник по планированию производства.\nМесто: Назначение в системе; выполнение — производство или склад ПФ.\n\nДанные:\n• Счёт, позиция, партия, масса, тара и фасовка.\n• Загрузка сотрудников производства и склада ПФ.\n• Место выполнения, доступные исполнители и срок.\n\nДействие:\nНазначить место и исполнителя; затем создать передачу ГП и задание на перефасовку.\n\nРезультат:\nНазначение видно в заданиях склада и фасовки. На производстве выполняет фасовщик производства, на складе ПФ — сотрудник склада ПФ.",
                                    "open": true,
                                    "links": [
                                      "f_227_4084"
                                    ],
                                    "edge": "",
                                    "approval_badge_visible": false,
                                    "screen_task": "Планировщик: выбрать место и исполнителя перефасовки ГП по загрузке сотрудников",
                                    "screen_id": "packing_tasks",
                                    "review_status": "partial",
                                    "ui_review_status": "pending",
                                    "children": [
                                      {
                                        "id": "f_227_4084",
                                        "title": "Экран «Задания склада»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nПередать ГП на назначенное планировщиком место перефасовки\nРоль: Сотрудник склада ГП — передача; назначенный сотрудник производства или склада ПФ — приёмка.\nМесто: Склад ГП → производство или склад ПФ по назначению планировщика.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                        "open": true,
                                        "links": [
                                          "local_repacking_gp_production_transfer"
                                        ],
                                        "edge": "Место и исполнитель назначены",
                                        "approval_badge_visible": false,
                                        "screen_task": "Передать ГП на назначенное планировщиком место перефасовки",
                                        "screen_id": "warehouse_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              23,
                                              41
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          },
                                          {
                                            "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                            "date": "2026-10-15",
                                            "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "local_repacking_gp_production_transfer",
                                            "title": "1С: документ перемещения со склада ГП на склад производства",
                                            "kind": "onec",
                                            "notes": "Физическое место перефасовки выбирает планировщик: производство или склад ПФ. Данный блок описывает существующий учёт в 1С; физическое помещение и склад учёта не отождествлять.",
                                            "open": true,
                                            "links": [
                                              "f_227_4090"
                                            ],
                                            "edge": "Выполнено",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "children": [
                                              {
                                                "id": "f_227_4090",
                                                "title": "Экран «Фасовка»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: место фасовки, тип продукции, статус, срок, приоритет.\n\nТекущее задание:\nПерефасовать ГП в месте и сотрудником, назначенными планировщиком\nРоль: Фасовщик производства или сотрудник склада ПФ — назначает планировщик по загрузке.\nМесто: Производство или склад ПФ — выбранное планировщиком место.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПерефасовка — на производстве или на складе ПФ. Место и сотрудника назначает планировщик с учётом загрузки. Этикеровщик получает стикеры, готовит и оклеивает пустую тару. После перефасовки обязательное задание на наклейку этикеток и стикеров сохраняется.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                                "open": true,
                                                "links": [
                                                  "equipment_wash_decision",
                                                  "local_repacking_parallel_outputs"
                                                ],
                                                "edge": "",
                                                "approval_badge_visible": false,
                                                "screen_task": "Перефасовать ГП в месте и сотрудником, назначенными планировщиком",
                                                "screen_id": "packing_tasks",
                                                "review_status": "partial",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Место перефасовки, роли и обязательная маркировка; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF6YlPk",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF6YlSE",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF6YlSA",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF6YlS8",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      2
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role and physical place"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                    "date": "2026-10-15",
                                                    "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "local_repacking_parallel_outputs",
                                                    "title": "Перефасовка завершена: основной объём и остаток обрабатываются параллельно",
                                                    "kind": "task",
                                                    "notes": "Основной объём позиции всегда продолжает маркировку, производство в 1С и готовность к отгрузке. Остаток обрабатывается отдельно; его направление не заменяет маршрут основного объёма. В каждом документе учитывать свою фактическую массу без повторного списания.",
                                                    "open": true,
                                                    "links": [
                                                      "local_repacking_label_task",
                                                      "local_repacking_remainder_destination"
                                                    ],
                                                    "edge": "Выполнено",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "children": [
                                                      {
                                                        "id": "local_repacking_label_task",
                                                        "title": "Экран «Маркировка»",
                                                        "kind": "screen",
                                                        "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить / переклеить этикетки и стикеры после перефасовки.\nМесто: производство. Задание обязательно после перефасовки; не повторять в подготовке заказа на складе.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                                        "open": true,
                                                        "links": [
                                                          "local_repacking_main_production"
                                                        ],
                                                        "edge": "Основная продукция — всегда",
                                                        "approval_badge_visible": false,
                                                        "screen_task": "Наклеить / переклеить этикетки и стикеры после перефасовки.",
                                                        "screen_id": "marking",
                                                        "review_status": "partial",
                                                        "ui_review_status": "pending",
                                                        "approved_scope": "Обязательная маркировка после перефасовки",
                                                        "approval_sources": [
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                            "comment_id": "AAACIF6YlPk",
                                                            "author": "Данила",
                                                            "date": "2026-10-08"
                                                          },
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                            "comment_id": "AAACIF6YlSE",
                                                            "author": "Данила",
                                                            "date": "2026-10-08"
                                                          }
                                                        ],
                                                        "children": [
                                                          {
                                                            "id": "local_repacking_main_production",
                                                            "title": "1С: производство ГП в новой фасовке по фактическому количеству",
                                                            "kind": "onec",
                                                            "notes": "выпуск новой фасовки; в материалах — исходная готовая продукция. Указывать фактически использованную исходную ГП и новую тару, выпуск привязать к заказу покупателя. Остатки, отправленные на образцы или в ПФ, учитывать в своих ветках, не списывать один объём дважды. Состав материалов подтвердить с 1С: в обсуждении это было сформулировано предварительно.",
                                                            "open": true,
                                                            "links": [
                                                              "local_repacking_output_onec"
                                                            ],
                                                            "edge": "Фасовка и маркировка завершены",
                                                            "approval_badge_visible": false,
                                                            "review_status": "pending",
                                                            "children": [
                                                              {
                                                                "id": "local_repacking_output_onec",
                                                                "title": "1С: оформить МХ-18 — передачу перефасованной ГП на склад ГП",
                                                                "kind": "onec",
                                                                "notes": "В контексте производства новой фасовки. Не повторять перемещение ГП Лакма → ГП из маршрута подбора ранее готовой продукции.\nпри передаче произведённой ГП на склад МХ-18 оформляют всегда.",
                                                                "open": true,
                                                                "links": [
                                                                  "f_227_4089"
                                                                ],
                                                                "edge": "Производство проведено",
                                                                "approval_badge_visible": false,
                                                                "review_status": "approved",
                                                                "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                    "comment_id": "AAACGqcevZg",
                                                                    "author": "Данила",
                                                                    "date": "2026-10-08"
                                                                  }
                                                                ],
                                                                "children": [
                                                                  {
                                                                    "id": "f_227_4089",
                                                                    "title": "Экран «Задания склада»",
                                                                    "kind": "screen",
                                                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику на перемещение на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "local_repacking_prepare_ready"
                                                                    ],
                                                                    "edge": "Передача оформлена",
                                                                    "approval_badge_visible": false,
                                                                    "screen_task": "Задание кладовщику на перемещение на склад ГП",
                                                                    "screen_id": "warehouse_tasks",
                                                                    "review_status": "pending",
                                                                    "ui_review_status": "pending",
                                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                    "approval_sources": [
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                        "points": [
                                                                          42
                                                                        ],
                                                                        "date": "2026-10-15",
                                                                        "scope": "assignment role and physical place"
                                                                      }
                                                                    ],
                                                                    "children": [
                                                                      {
                                                                        "id": "local_repacking_prepare_ready",
                                                                        "title": "Экран «Задания склада»",
                                                                        "kind": "screen",
                                                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: подготовить перефасованные позиции к отгрузке\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПроверить количество и комплектность. Маркировка уже наклеена после перефасовки; повторную наклейку не выполнять.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "f_227_4093"
                                                                        ],
                                                                        "edge": "Выполнено — ГП физически принята",
                                                                        "approval_badge_visible": false,
                                                                        "screen_task": "Кладовщик: подготовить перефасованные позиции к отгрузке",
                                                                        "screen_id": "warehouse_tasks",
                                                                        "review_status": "pending",
                                                                        "ui_review_status": "pending",
                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                        "approval_sources": [
                                                                          {
                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                            "points": [
                                                                              1,
                                                                              44
                                                                            ],
                                                                            "date": "2026-10-15",
                                                                            "scope": "assignment role and physical place"
                                                                          }
                                                                        ],
                                                                        "children": []
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      },
                                                      {
                                                        "id": "local_repacking_remainder_destination",
                                                        "title": "Есть остаток после перефасовки? Если есть — куда направить?",
                                                        "kind": "check",
                                                        "notes": "",
                                                        "open": true,
                                                        "links": [
                                                          "local_2072f40c1e824f81b2482a3720797b08",
                                                          "local_14565bca119a4b0a8cb1781e02cad8a7",
                                                          "local_repacking_no_remainder"
                                                        ],
                                                        "edge": "Параллельно — остаток",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": [
                                                          {
                                                            "id": "local_2072f40c1e824f81b2482a3720797b08",
                                                            "title": "Экран «Обеспечение счёта»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Счёт, позиция, объём, источник, партия, связанные задания и план/факт.\n• Фильтры / сортировка: Счёт, позиция, статус, срок.\n\nТекущее задание:\nСоздать счет на пополнение ГП образцов\nРоль: Ответственный за обеспечение позиции; роль требует утверждения.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nЗафиксировать количество остатка в кг и продукцию для выпуска образцов. Эта ветка относится только к выделенному остатку, а не ко всему объёму перефасовки.\nДля пополнения ГП создать счёт на контрагента «Пополнение склада», далее обработка как у клиентского счёта. Инициатор — менеджер, руководитель склада или планировщик.",
                                                            "open": true,
                                                            "links": [
                                                              "local_repacking_samples_fill"
                                                            ],
                                                            "edge": "Есть остаток, на ГП",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Создать счет на пополнение ГП образцов",
                                                            "screen_id": "order_supply",
                                                            "review_status": "partial",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Пополнение ГП через счёт",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                "comment_id": "AAACIF4yhr4",
                                                                "author": "Данила",
                                                                "date": "2026-10-08"
                                                              },
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                "comment_id": "AAACIF6YlTw",
                                                                "author": "Данила",
                                                                "date": "2026-10-08"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "local_repacking_samples_fill",
                                                                "title": "Экран «Фасовка»",
                                                                "kind": "screen",
                                                                "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: место фасовки, тип продукции, статус, срок, приоритет.\n\nТекущее задание:\nФасовщик: расфасовать остаток на образцы по позициям счёта\nРоль: Фасовщик или сотрудник склада ПФ — согласно текущему заданию и месту выполнения.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПодтвердить фактический объём, фасовку, количество ёмкостей и расход тары. Только масса, выделенная на образцы; не списывать её повторно в основной перефасовке.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.\n\nМесто и исполнителя фасовки образцов назначает планировщик в задании.",
                                                                "open": true,
                                                                "links": [
                                                                  "local_repacking_samples_labels",
                                                                  "equipment_wash_decision"
                                                                ],
                                                                "edge": "Выполнено — Счёт пополнения создан",
                                                                "approval_badge_visible": false,
                                                                "screen_task": "Фасовщик: расфасовать остаток на образцы по позициям счёта",
                                                                "screen_id": "packing_tasks",
                                                                "review_status": "pending",
                                                                "ui_review_status": "pending",
                                                                "children": [
                                                                  {
                                                                    "id": "local_repacking_samples_labels",
                                                                    "title": "Система: автоматически подготовить макет и документ печати",
                                                                    "kind": "task",
                                                                    "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "mark_ready_local_repacking_samples_labels"
                                                                    ],
                                                                    "edge": "Выполнено — Образцы расфасованы",
                                                                    "approval_badge_visible": false,
                                                                    "review_status": "pending",
                                                                    "automatic_step": true,
                                                                    "children": [
                                                                      {
                                                                        "id": "mark_ready_local_repacking_samples_labels",
                                                                        "title": "Экран «Маркировка»",
                                                                        "kind": "screen",
                                                                        "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить этикетки и стикеры на образцы после фасовки.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "local_repacking_samples_production"
                                                                        ],
                                                                        "edge": "Макет и документ печати сформированы",
                                                                        "approval_badge_visible": false,
                                                                        "screen_task": "Наклеить этикетки и стикеры на образцы после фасовки.",
                                                                        "screen_id": "marking",
                                                                        "review_status": "pending",
                                                                        "ui_review_status": "pending",
                                                                        "children": [
                                                                          {
                                                                            "id": "local_repacking_samples_production",
                                                                            "title": "1С: производство образцов из выделенного остатка",
                                                                            "kind": "onec",
                                                                            "notes": "В продукции — фактически выпущенные образцы; в материалах — использованный остаток исходной ГП и тара. Применять существующий метод производства, не списывать исходный объём повторно в другой ветке.",
                                                                            "open": true,
                                                                            "links": [
                                                                              "local_repacking_samples_transfer"
                                                                            ],
                                                                            "edge": "Образцы маркированы",
                                                                            "approval_badge_visible": false,
                                                                            "review_status": "pending",
                                                                            "children": [
                                                                              {
                                                                                "id": "local_repacking_samples_transfer",
                                                                                "title": "1С: оформить МХ-18 — передачу выпущенных образцов на склад ГП Лакма",
                                                                                "kind": "onec",
                                                                                "notes": "Передача образцов в контексте выпуска по счёту пополнения. Не создавать самостоятельное перемещение того же выпуска; если метод производства сразу оформляет передачу, использовать результат без дубля. Склад-получатель — ГП Лакма.\nпри передаче произведённой ГП на склад МХ-18 оформляют всегда.",
                                                                                "open": true,
                                                                                "links": [
                                                                                  "local_repacking_samples_warehouse"
                                                                                ],
                                                                                "edge": "Производство проведено",
                                                                                "approval_badge_visible": false,
                                                                                "review_status": "approved",
                                                                                "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                                                "approval_sources": [
                                                                                  {
                                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                                    "comment_id": "AAACGqcevZg",
                                                                                    "author": "Данила",
                                                                                    "date": "2026-10-08"
                                                                                  }
                                                                                ],
                                                                                "children": [
                                                                                  {
                                                                                    "id": "local_repacking_samples_warehouse",
                                                                                    "title": "Экран «Задания склада»",
                                                                                    "kind": "screen",
                                                                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику: переместить образцы на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                                                                    "open": true,
                                                                                    "links": [
                                                                                      "local_repacking_samples_done"
                                                                                    ],
                                                                                    "edge": "Передача оформлена",
                                                                                    "approval_badge_visible": false,
                                                                                    "screen_task": "Задание кладовщику: переместить образцы на склад ГП",
                                                                                    "screen_id": "warehouse_tasks",
                                                                                    "review_status": "pending",
                                                                                    "ui_review_status": "pending",
                                                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                    "approval_sources": [
                                                                                      {
                                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                        "points": [
                                                                                          42
                                                                                        ],
                                                                                        "date": "2026-10-15",
                                                                                        "scope": "assignment role and physical place"
                                                                                      }
                                                                                    ],
                                                                                    "children": [
                                                                                      {
                                                                                        "id": "local_repacking_samples_done",
                                                                                        "title": "Образцы учтены на складе ГП Лакма",
                                                                                        "kind": "result",
                                                                                        "notes": "",
                                                                                        "open": true,
                                                                                        "links": [],
                                                                                        "edge": "Выполнено — Образцы физически приняты",
                                                                                        "approval_badge_visible": false,
                                                                                        "review_status": "pending",
                                                                                        "children": []
                                                                                      }
                                                                                    ]
                                                                                  }
                                                                                ]
                                                                              }
                                                                            ]
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "id": "local_14565bca119a4b0a8cb1781e02cad8a7",
                                                            "title": "Экран «Задания склада»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику: переместить остаток на склад ПФ\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФизическое перемещение выделенного нерасфасованного остатка на склад ПФ. Зафиксировать количество и партию.",
                                                            "open": true,
                                                            "links": [
                                                              "local_repacking_remainder_pf_onec"
                                                            ],
                                                            "edge": "Есть остаток, на ПФ",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Задание кладовщику: переместить остаток на склад ПФ",
                                                            "screen_id": "warehouse_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "children": [
                                                              {
                                                                "id": "local_repacking_remainder_pf_onec",
                                                                "title": "1С: производство ПФ из остатка ГП",
                                                                "kind": "onec",
                                                                "notes": "Производство: материалы — фактический остаток исходной ГП; продукция — соответствующий ПФ с выпуском на склад ПФ. Сохранить исходную партию и массу остатка.",
                                                                "open": true,
                                                                "links": [
                                                                  "local_repacking_remainder_pf_done"
                                                                ],
                                                                "edge": "Выполнено — Физически передано на ПФ",
                                                                "approval_badge_visible": false,
                                                                "review_status": "approved",
                                                                "approved_scope": "Документ и направление перемещения; смена номенклатуры требует уточнения",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                    "comment_id": "AAACIU-xD6o",
                                                                    "author": "Данила",
                                                                    "date": "2026-10-08"
                                                                  },
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.e3s14e9xbdhf",
                                                                    "basis": "Актуальные алгоритмы 1С: пункты 2, 8 и 11; список документов пользователя от 12.10.2026."
                                                                  }
                                                                ],
                                                                "children": [
                                                                  {
                                                                    "id": "local_repacking_remainder_pf_done",
                                                                    "title": "Остаток учтён как ПФ на складе ПФ",
                                                                    "kind": "result",
                                                                    "notes": "ПФ выпущен на склад ПФ. Сохранить документ производства, фактическую массу и исходную партию ГП.",
                                                                    "open": true,
                                                                    "links": [],
                                                                    "edge": "Производство ПФ подтверждено",
                                                                    "approval_badge_visible": false,
                                                                    "review_status": "pending",
                                                                    "children": []
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "id": "local_repacking_no_remainder",
                                                            "title": "Остатка нет; дополнительная обработка не требуется",
                                                            "kind": "result",
                                                            "notes": "Основная продукция уже продолжает параллельную цепочку маркировки и готовности.",
                                                            "open": true,
                                                            "links": [],
                                                            "edge": "Без остатка",
                                                            "approval_badge_visible": false,
                                                            "review_status": "pending",
                                                            "children": []
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "f_227_4046",
                        "title": "Маршрут замены этикеток готовой продукции",
                        "kind": "route",
                        "open": true,
                        "links": [
                          "f_227_4078"
                        ],
                        "edge": "Есть объём, но другая этикетка",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "f_227_4078",
                            "title": "Система: автоматически подготовить макет и документ печати",
                            "kind": "task",
                            "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки.",
                            "open": true,
                            "links": [
                              "mark_ready_f_227_4078"
                            ],
                            "edge": "",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "automatic_step": true,
                            "children": [
                              {
                                "id": "mark_ready_f_227_4078",
                                "title": "Макет и документ печати готовы; задание маркировки доступно после готовности продукции",
                                "kind": "result",
                                "notes": "Макет связан с позицией и заданием маркировки. Печать доступна из карточки маркировки; исполнение — после готовности продукции.",
                                "open": true,
                                "links": [
                                  "f_227_4087"
                                ],
                                "edge": "Макет и документ печати сформированы",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "f_227_4087",
                                    "title": "Экран «Маркировка»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nПереклеить этикетки и стикеры на готовой продукции.\nРоль: Сотрудник склада; этикеровщик выдаёт этикетки.\nМесто: Склад ГП.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                    "open": true,
                                    "links": [
                                      "f_227_4076"
                                    ],
                                    "edge": "",
                                    "approval_badge_visible": false,
                                    "screen_task": "Переклеить этикетки и стикеры на готовой продукции.",
                                    "screen_id": "marking",
                                    "review_status": "partial",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Место переклейки и роли исполнителей; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                        "comment_id": "AAACIF6YlTA",
                                        "author": "Данила",
                                        "date": "2026-10-08"
                                      },
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                        "comment_id": "AAACIF6YlTE",
                                        "author": "Данила",
                                        "date": "2026-10-08"
                                      },
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                        "comment_id": "AAACIF6YlTI",
                                        "author": "Данила",
                                        "date": "2026-10-08"
                                      },
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          3
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "local_purchased_product_route",
            "title": "Маршрут обеспечения покупной продукции",
            "kind": "route",
            "open": true,
            "links": [
              "f_227_4123"
            ],
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_227_4123",
                "title": "Проверка ГП",
                "kind": "check",
                "open": true,
                "links": [
                  "f_227_4125",
                  "f_227_4188"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "f_227_4125",
                    "title": "Система: резерв с ГП",
                    "kind": "task",
                    "open": true,
                    "links": [
                      "f_227_4044"
                    ],
                    "edge": "Есть",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "automatic_step": true,
                    "children": []
                  },
                  {
                    "id": "f_227_4188",
                    "title": "Экран «Обеспечение счёта»",
                    "kind": "screen",
                    "notes": "Данные:\n• Список заданий и карточка: Счёт, позиция, объём, источник, партия, связанные задания и план/факт.\n• Фильтры / сортировка: Счёт, позиция, статус, срок.\n\nТекущее задание:\nЗадача для менеджера ответственного за счет\nРоль: Ответственный за обеспечение позиции; роль требует утверждения.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                    "open": true,
                    "links": [],
                    "edge": "Нет",
                    "approval_badge_visible": false,
                    "screen_task": "Задача для менеджера ответственного за счет",
                    "screen_id": "order_supply",
                    "review_status": "pending",
                    "ui_review_status": "pending",
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_258_5065",
        "title": "Маршрут обеспечения из ПФ",
        "kind": "route",
        "notes": "Вход: ПФ выбран и зарезервирован; известны масса, партия и исходные позиции. Сохранять тип продукции, признак цвета и выбранный способ колеровки. Общая основа — подтверждение фактического количества и партии при подготовке ПФ. Форма подготовки различается: конечная фасовка, вёдра для КМ, технологическая ёмкость или компонент А для комплектации. Не выпускать окончательную ГП до необходимых колеровки и комплектации.\nМесто выполнения определяется следующей операцией: прямая фасовка и комплектация затирки — склад ПФ; КМ — набрать вёдра на складе ПФ и передать на КМ; колеровка на производстве — передать базу в технологической ёмкости. Физическое место и склад учёта 1С хранить отдельно. Перемещение не создавать повторно, если база уже доставлена и учтена на нужном складе. Исполнительные шаги передачи находятся в соответствующем маршруте колеровки.",
        "open": true,
        "links": [
          "pilot_pf_order_supply"
        ],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "pilot_pf_order_supply",
            "title": "Экран «Обеспечение счёта»",
            "kind": "screen",
            "notes": "Данные:\n• Позиции счёта: продукция, необходимый объём, источник, партия и резерв.\n• По каждой позиции: задания, исполнитель, план/факт и статус.\n• При проблеме: причина и ответственный в строке этой позиции.\n\nВход — как здесь оказаться:\n• Из карточки счёта — открыть его обеспечение (предложение).\n• При выборе маршрута из ПФ — источник и объём уже рассчитаны.\n• После сообщения сотрудника о проблеме — открыть ту же позицию.\n\nДействия:\n• «Отправить в работу» — создать задания по выбранному обеспечению позиции.\n• «Открыть задание» — посмотреть его факт, исполнителя и причину проблемы.\n• «Возобновить задание» — после решения проблемы продолжить существующее задание; сохранить факт, не создавать дубль.\n\nРезультат:\nСклад ПФ получает связанное со счётом и позицией задание. Проблема возвращается в эту же позицию; дальнейшая работа ждёт решения.",
            "open": true,
            "links": [
              "local_pf_supply_type"
            ],
            "edge": "ПФ выбран; обеспечение рассчитано",
            "approval_badge_visible": false,
            "screen_task": "Отправить задания по обеспечению позиции счёта",
            "screen_id": "order_supply",
            "review_status": "pending",
            "ui_review_status": "pending",
            "children": [
              {
                "id": "local_pf_supply_type",
                "title": "Проверить тип продукции",
                "kind": "check",
                "notes": "",
                "open": true,
                "links": [
                  "local_pf_supply_grout",
                  "local_pf_supply_color"
                ],
                "edge": "Отправить в работу — выдать задания",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "local_pf_supply_grout",
                    "title": "Экран «Задания склада»",
                    "kind": "screen",
                    "notes": "Данные:\n• Фильтр по складу: ПФ, ГП, сырьё, переработка; можно выбрать несколько складов.\n• Сортировка: по складу, статусу, сроку и приоритету задания.\n• Список заданий: склад, счёт, позиция, действие, статус и исполнитель.\n• Карточка задания: База А, масса, партия, позиции заказов, тара.\n• План/факт, причина проблемы и история действий.\n\nТекущее задание:\nПодготовить компонент А; подтвердить массу и партию.\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ.\n\nВход — как здесь оказаться:\n• Источник задания: Позиция счёта обеспечивается из ПФ; после «Отправить в работу» выдано задание подготовить компонент А.\n• Сотрудник открывает общий экран заданий склада, выбирает нужный склад и задание.\n• Из обеспечения счёта — «Открыть задание» по исходной позиции.\n\nДействия:\n• «Взять в работу» — назначить себя исполнителем и начать это задание.\n• «Выполнено» — сохранить фактическое количество и продолжить цепочку; при недостаче не отмечать полное выполнение.\n• «Проблема» — указать причину в этой карточке, сохранить факт и приостановить задание.\n\nРезультат:\nВыполнение или проблема отображается в исходной позиции на экране обеспечения счёта. После решения продолжается то же задание с сохранённым фактом.",
                    "open": true,
                    "links": [
                      "local_grout_base_ready",
                      "pilot_pf_order_supply"
                    ],
                    "edge": "Затирка",
                    "approval_badge_visible": false,
                    "screen_task": "Подготовить компонент А; подтвердить массу и партию.",
                    "screen_id": "warehouse_tasks",
                    "review_status": "partial",
                    "ui_review_status": "pending",
                    "approved_scope": "Роль / место — в пределах ответа Данилы. Детали действий требуют утверждения.; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                    "approval_sources": [
                      {
                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                        "comment_id": "AAACIF6YlTM",
                        "author": "Данила",
                        "date": "2026-10-08"
                      },
                      {
                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                        "comment_id": "AAACIF6YlTU",
                        "author": "Данила",
                        "date": "2026-10-08"
                      },
                      {
                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                        "comment_id": "AAACIF6YlTQ",
                        "author": "Данила",
                        "date": "2026-10-08"
                      },
                      {
                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                        "points": [
                          4,
                          29
                        ],
                        "date": "2026-10-15",
                        "scope": "assignment role and physical place"
                      }
                    ],
                    "children": [
                      {
                        "id": "local_grout_base_ready",
                        "title": "Компонент А обеспечен; зафиксированы масса, партия и исходная позиция",
                        "kind": "result",
                        "notes": "",
                        "open": true,
                        "links": [
                          "local_grout_base_color"
                        ],
                        "edge": "Выполнено — Компонент А подготовлен",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "local_grout_base_color",
                            "title": "В исходной позиции нужен цвет?",
                            "kind": "check",
                            "notes": "",
                            "open": true,
                            "links": [
                              "f_241_5170",
                              "local_colored_grout_route"
                            ],
                            "edge": "Продолжить исходный заказ",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": []
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "local_pf_supply_color",
                    "title": "В исходной позиции нужен цвет?",
                    "kind": "check",
                    "notes": "",
                    "open": true,
                    "links": [
                      "f_227_4079",
                      "local_pf_supply_coloring_place"
                    ],
                    "edge": "Краска / остальные типы",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "f_227_4079",
                        "title": "Система: автоматически подготовить макет и документ печати",
                        "kind": "task",
                        "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки.",
                        "open": true,
                        "links": [
                          "mark_ready_f_227_4079"
                        ],
                        "edge": "Нет — конечная фасовка",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "approved_scope": "Роль / место — в пределах ответа Данилы. Детали действий требуют утверждения.",
                        "approval_sources": [
                          {
                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                            "comment_id": "AAACIF6YlTE",
                            "author": "Данила",
                            "date": "2026-10-08"
                          },
                          {
                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                            "comment_id": "AAACIF6YlSE",
                            "author": "Данила",
                            "date": "2026-10-08"
                          }
                        ],
                        "automatic_step": true,
                        "children": [
                          {
                            "id": "mark_ready_f_227_4079",
                            "title": "Макет и документ печати готовы; задание маркировки доступно после готовности продукции",
                            "kind": "result",
                            "notes": "Макет связан с позицией и заданием маркировки. Печать доступна из карточки маркировки; исполнение — после готовности продукции.",
                            "open": true,
                            "links": [
                              "f_227_4085",
                              "pilot_pf_order_supply"
                            ],
                            "edge": "Макет и документ печати сформированы",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "f_227_4085",
                                "title": "Экран «Фасовка»",
                                "kind": "screen",
                                "notes": "Данные:\n• Фильтр по складу: ПФ, ГП, сырьё, переработка; можно выбрать несколько складов.\n• Сортировка: по складу, статусу, сроку и приоритету задания.\n• Список заданий: склад, счёт, позиция, действие, статус и исполнитель.\n• Карточка задания: ПФ, партия, план/факт кг, фасовка, тара, этикетки и стикеры.\n• План/факт, причина проблемы и история действий.\n\nТекущее задание:\nРасфасовать продукцию из ПФ; подтвердить массу, тару и партию.\nРоль: Фасовщик производства при фасовке из дежи; сотрудник склада ПФ при фасовке затирки, паст и шприцов.\nМесто: Из дежи после ОТК — производство, зона фасовки; затирка, пигментные пасты и шприцы — склад ПФ.\n\nВход — как здесь оказаться:\n• Источник задания: После подготовки стикеров выдано задание расфасовать продукцию.\n• Сотрудник открывает экран фасовки, выбирает место выполнения и задание.\n• Из обеспечения счёта — «Открыть задание» по исходной позиции.\n\nДействия:\n• «Взять в работу» — назначить себя исполнителем и начать это задание.\n• «Выполнено» — сохранить фактическое количество и продолжить цепочку; при недостаче не отмечать полное выполнение.\n• «Проблема» — указать причину в этой карточке, сохранить факт и приостановить задание.\n\nРезультат:\nВыполнение или проблема отображается в исходной позиции на экране обеспечения счёта. После решения продолжается то же задание с сохранённым фактом.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                "open": true,
                                "links": [
                                  "mark_apply_f_227_4085",
                                  "pilot_pf_order_supply",
                                  "equipment_wash_decision"
                                ],
                                "edge": "Выполнено",
                                "approval_badge_visible": false,
                                "screen_task": "Расфасовать продукцию из ПФ; подтвердить массу, тару и партию.",
                                "screen_id": "packing_tasks",
                                "review_status": "partial",
                                "ui_review_status": "pending",
                                "approved_scope": "Роль / место — в пределах ответа Данилы. Детали действий требуют утверждения.; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                "approval_sources": [
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACIF6YlTM",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACIF4yhsQ",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                    "points": [
                                      4,
                                      29
                                    ],
                                    "date": "2026-10-15",
                                    "scope": "assignment role and physical place"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                    "date": "2026-10-15",
                                    "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                  }
                                ],
                                "children": [
                                  {
                                    "id": "mark_apply_f_227_4085",
                                    "title": "Экран «Маркировка»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить этикетки и стикеры на расфасованную продукцию.\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                    "open": true,
                                    "links": [
                                      "f_227_4228"
                                    ],
                                    "edge": "Фасовка выполнена",
                                    "approval_badge_visible": false,
                                    "screen_task": "Наклеить этикетки и стикеры на расфасованную продукцию.",
                                    "screen_id": "marking",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          4,
                                          28,
                                          29,
                                          30
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "f_227_4228",
                                        "title": "1С: производство из ПФ с выпуском на склад ГП",
                                        "kind": "onec",
                                        "notes": "Из заказа покупателя создать документ «Производство», операция «Сборка». Материалы — фактически использованный ПФ, добавки при наличии, тара и комплектующие; продукция — фасованная ГП по заказу. Сохранить фактические количества, источник материалов и склад-получатель. Для этой ветки получатель — склад ГП. После выпуска — передача произведённой ГП с МХ-18, без повторного прихода или дублирующего перемещения того же результата.",
                                        "open": true,
                                        "links": [
                                          "pilot_pf_gp_mh18"
                                        ],
                                        "edge": "Выполнено — Фасовка подтверждена",
                                        "approval_badge_visible": false,
                                        "review_status": "partial",
                                        "approved_scope": "Склад материалов ПФ; название операции требует уточнения",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                            "comment_id": "AAACIF4yhsQ",
                                            "author": "Данила",
                                            "date": "2026-10-08"
                                          },
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                            "comment_id": "AAACIF4yhsU",
                                            "author": "Данила",
                                            "date": "2026-10-08"
                                          },
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                            "comment_id": "AAACGqcevZg",
                                            "author": "Данила",
                                            "date": "2026-10-08"
                                          },
                                          {
                                            "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.e3s14e9xbdhf",
                                            "basis": "Актуальные алгоритмы 1С: пункты 2, 8 и 11; список документов пользователя от 12.10.2026."
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "pilot_pf_gp_mh18",
                                            "title": "1С: оформить МХ-18 на передачу выпущенной ГП",
                                            "kind": "onec",
                                            "notes": "Всегда при передаче произведённой ГП на склад; физическое перемещение — отдельное задание сотруднику склада.",
                                            "open": true,
                                            "links": [
                                              "f_227_4222"
                                            ],
                                            "edge": "Производство проведено",
                                            "approval_badge_visible": false,
                                            "review_status": "approved",
                                            "approved_scope": "Обязательность МХ-18",
                                            "approval_sources": [
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                "comment_id": "AAACGqcevZg",
                                                "author": "Данила"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "f_227_4222",
                                                "title": "Экран «Задания склада»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Фильтр по складу: ПФ, ГП, сырьё, переработка; можно выбрать несколько складов.\n• Сортировка: по складу, статусу, сроку и приоритету задания.\n• Список заданий: склад, счёт, позиция, действие, статус и исполнитель.\n• Карточка задания: ГП, партия, количество упаковок, план/факт, источник и получатель.\n• План/факт, причина проблемы и история действий.\n\nТекущее задание:\nФизически переместить произведённую ГП; подтвердить факт.\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nВход — как здесь оказаться:\n• Источник задания: После выпуска ГП в 1С и оформления МХ-18 выдано задание физически переместить ГП.\n• Сотрудник открывает общий экран заданий склада, выбирает нужный склад и задание.\n• Из обеспечения счёта — «Открыть задание» по исходной позиции.\n\nДействия:\n• «Взять в работу» — назначить себя исполнителем и начать это задание.\n• «Выполнено» — сохранить фактическое количество и продолжить цепочку; при недостаче не отмечать полное выполнение.\n• «Проблема» — указать причину в этой карточке, сохранить факт и приостановить задание.\n\nРезультат:\nВыполнение или проблема отображается в исходной позиции на экране обеспечения счёта. После решения продолжается то же задание с сохранённым фактом.",
                                                "open": true,
                                                "links": [
                                                  "f_227_4221",
                                                  "pilot_pf_order_supply"
                                                ],
                                                "edge": "Передача оформлена",
                                                "approval_badge_visible": false,
                                                "screen_task": "Физически переместить произведённую ГП; подтвердить факт.",
                                                "screen_id": "warehouse_tasks",
                                                "review_status": "partial",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Роль / место — в пределах ответа Данилы. Детали действий требуют утверждения.; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF6YlPg",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      42
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role and physical place"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "f_227_4221",
                                                    "title": "Экран «Задания склада»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Фильтр по складу: ПФ, ГП, сырьё, переработка; можно выбрать несколько складов.\n• Сортировка: по складу, статусу, сроку и приоритету задания.\n• Список заданий: склад, счёт, позиция, действие, статус и исполнитель.\n• Карточка задания: Счёт, позиции, партия, количество, фактическое место хранения.\n• План/факт, причина проблемы и история действий.\n\nТекущее задание:\nСобрать заказ; переместить на склад ГП; отметить «Готово к отгрузке». Повторно маркировку не наклеивать.\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nВход — как здесь оказаться:\n• Источник задания: После перемещения ГП выдано задание собрать заказ и подготовить его к отгрузке.\n• Сотрудник открывает общий экран заданий склада, выбирает нужный склад и задание.\n• Из обеспечения счёта — «Открыть задание» по исходной позиции.\n\nДействия:\n• «Взять в работу» — назначить себя исполнителем и начать это задание.\n• «Выполнено» — сохранить фактическое количество и продолжить цепочку; при недостаче не отмечать полное выполнение.\n• «Проблема» — указать причину в этой карточке, сохранить факт и приостановить задание.\n\nРезультат:\nВыполнение или проблема отображается в исходной позиции на экране обеспечения счёта. После решения продолжается то же задание с сохранённым фактом.",
                                                    "open": true,
                                                    "links": [
                                                      "f_227_4229",
                                                      "pilot_pf_order_supply"
                                                    ],
                                                    "edge": "Выполнено",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "Собрать заказ; переместить на склад ГП; отметить «Готово к отгрузке». Повторно маркировку не наклеивать.",
                                                    "screen_id": "warehouse_tasks",
                                                    "review_status": "partial",
                                                    "ui_review_status": "pending",
                                                    "approved_scope": "Роль / место — в пределах ответа Данилы. Детали действий требуют утверждения.; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIF6YlPg",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIF6YlPU",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIF6YlPY",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                        "points": [
                                                          1,
                                                          44
                                                        ],
                                                        "date": "2026-10-15",
                                                        "scope": "assignment role and physical place"
                                                      }
                                                    ],
                                                    "children": [
                                                      {
                                                        "id": "f_227_4229",
                                                        "title": "Готов к отгрузке",
                                                        "kind": "result",
                                                        "open": true,
                                                        "links": [],
                                                        "edge": "Выполнено",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": []
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "local_pf_supply_coloring_place",
                        "title": "Где назначена колеровка этой позиции?",
                        "kind": "check",
                        "notes": "Использовать ранее выбранный способ колеровки. Не сравнивать очереди повторно для уже принятого назначения; если назначение отсутствует, запросить его у ответственного до выдачи исполнительных заданий. Штукатурка — только производство. Для образца 1 кг — решение технолога.",
                        "open": true,
                        "links": [
                          "local_pf_to_km_physical",
                          "local_pf_to_prod_physical"
                        ],
                        "edge": "Да — сначала колеровка",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "local_pf_to_km_physical",
                            "title": "Экран «Фасовка»",
                            "kind": "screen",
                            "notes": "Данные:\n• Фильтр по складу: ПФ, ГП, сырьё, переработка; можно выбрать несколько складов.\n• Сортировка: по складу, статусу, сроку и приоритету задания.\n• Список заданий: склад, счёт, позиция, действие, статус и исполнитель.\n• Карточка задания: ПФ, партия, масса, фасовка, число вёдер, место назначения.\n• План/факт, причина проблемы и история действий.\n\nТекущее задание:\nНабрать базу в вёдра; физически передать на КМ.\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ → КМ.\n\nВход — как здесь оказаться:\n• Источник задания: По позиции выбраны источник ПФ и колеровка на КМ; выдано задание подготовить и передать вёдра.\n• Сотрудник открывает экран фасовки, выбирает место выполнения и задание.\n• Из обеспечения счёта — «Открыть задание» по исходной позиции.\n\nДействия:\n• «Взять в работу» — назначить себя исполнителем и начать это задание.\n• «Выполнено» — сохранить фактическое количество и продолжить цепочку; при недостаче не отмечать полное выполнение.\n• «Проблема» — указать причину в этой карточке, сохранить факт и приостановить задание.\n\nРезультат:\nВыполнение или проблема отображается в исходной позиции на экране обеспечения счёта. После решения продолжается то же задание с сохранённым фактом.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                            "open": true,
                            "links": [
                              "local_pf_to_km_onec",
                              "pilot_pf_order_supply",
                              "equipment_wash_decision"
                            ],
                            "edge": "КМ",
                            "approval_badge_visible": false,
                            "screen_task": "Набрать базу в вёдра; физически передать на КМ.",
                            "screen_id": "packing_tasks",
                            "review_status": "partial",
                            "ui_review_status": "pending",
                            "approved_scope": "Роль / место — в пределах ответа Данилы. Детали действий требуют утверждения.; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                "comment_id": "AAACIF6YlTM",
                                "author": "Данила",
                                "date": "2026-10-08"
                              },
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  18
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": [
                              {
                                "id": "local_pf_to_km_onec",
                                "title": "1С: переместить ПФ со склада ПФ на склад Производство",
                                "kind": "onec",
                                "notes": "На фактически переданный объём и партии. Сохранить документ и признак учётной подготовки; при уже выполненном перемещении повторный документ не создавать.",
                                "open": true,
                                "links": [
                                  "f_241_5098"
                                ],
                                "edge": "Выполнено — Вёдра получены",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": []
                              }
                            ]
                          },
                          {
                            "id": "local_pf_to_prod_physical",
                            "title": "Экран «Задания склада»",
                            "kind": "screen",
                            "notes": "Данные:\n• Фильтр по складу: ПФ, ГП, сырьё, переработка; можно выбрать несколько складов.\n• Сортировка: по складу, статусу, сроку и приоритету задания.\n• Список заданий: склад, счёт, позиция, действие, статус и исполнитель.\n• Карточка задания: ПФ, партия, масса, ёмкость, место назначения.\n• План/факт, причина проблемы и история действий.\n\nТекущее задание:\nПередать базу в ёмкости; подтвердить массу и партию.\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ → производство.\n\nВход — как здесь оказаться:\n• Источник задания: По позиции выбраны источник ПФ и колеровка на производстве; выдано задание передать базу в ёмкости.\n• Сотрудник открывает общий экран заданий склада, выбирает нужный склад и задание.\n• Из обеспечения счёта — «Открыть задание» по исходной позиции.\n\nДействия:\n• «Взять в работу» — назначить себя исполнителем и начать это задание.\n• «Выполнено» — сохранить фактическое количество и продолжить цепочку; при недостаче не отмечать полное выполнение.\n• «Проблема» — указать причину в этой карточке, сохранить факт и приостановить задание.\n\nРезультат:\nВыполнение или проблема отображается в исходной позиции на экране обеспечения счёта. После решения продолжается то же задание с сохранённым фактом.",
                            "open": true,
                            "links": [
                              "local_pf_to_prod_onec",
                              "pilot_pf_order_supply"
                            ],
                            "edge": "Производство / штукатурка",
                            "approval_badge_visible": false,
                            "screen_task": "Передать базу в ёмкости; подтвердить массу и партию.",
                            "screen_id": "warehouse_tasks",
                            "review_status": "partial",
                            "ui_review_status": "pending",
                            "approved_scope": "Роль / место — в пределах ответа Данилы. Детали действий требуют утверждения.; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                "comment_id": "AAACIF6YlTM",
                                "author": "Данила",
                                "date": "2026-10-08"
                              },
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  23
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": [
                              {
                                "id": "local_pf_to_prod_onec",
                                "title": "1С: переместить ПФ со склада ПФ на склад Производство",
                                "kind": "onec",
                                "notes": "На фактически переданный объём и партии. Сохранить документ; если материалы уже учтены на Производстве, повторного перемещения нет.",
                                "open": true,
                                "links": [
                                  "f_241_5114"
                                ],
                                "edge": "Выполнено — База получена",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_227_4068",
        "title": "Новый замес",
        "kind": "route",
        "open": true,
        "links": [
          "f_227_4095"
        ],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_227_4095",
            "title": "Вход: масса, состав, оборудование и назначения замеса определены",
            "kind": "result",
            "notes": "Выполнить подтверждённый план. Сохранить позиции заказов, складское пополнение, партии, сроки и этап внесения переработки. Для прямого входа без утверждённого плана сначала открыть планирование.\nТип и номенклатура базы определены для всего замеса. Краска и смола для затирки не могут быть частями одного замеса; совместимость проверена в плане.",
            "open": true,
            "links": [
              "local_new_batch_plan_ready"
            ],
            "edge": "",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "local_new_batch_plan_ready",
                "title": "План замеса подтверждён?",
                "kind": "check",
                "notes": "",
                "open": true,
                "links": [
                  "local_new_batch_recipe",
                  "f_241_5090"
                ],
                "edge": "Параметры замеса определены",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": [
                  {
                    "id": "local_new_batch_recipe",
                    "title": "1С: получить рецептуру базы на подтверждённую массу замеса",
                    "kind": "onec",
                    "notes": "Получить состав сырья новой базы по спецификации, с согласованными технологом изменениями и переработкой. Масса и состав утверждены в планировании. Ошибка или отсутствие рецептуры блокирует подготовку и запуск; показать причину ответственному.",
                    "open": true,
                    "links": [
                      "local_new_batch_raw_available"
                    ],
                    "edge": "Да",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "local_new_batch_raw_available",
                        "title": "Сырьё для замеса обеспечено без запаса доведения?",
                        "kind": "check",
                        "notes": "Проверить наличие с учётом резервов; обеспечить только дефицит. Физический запас доведения оставить для ОТК и не использовать в основном резерве замеса. В 1С добавки находятся на общем складе Производство. Способ отделения доступного для резерва количества в Лакомке требует утверждения.",
                        "open": true,
                        "links": [
                          "local_new_batch_raw_pick",
                          "f_227_4223"
                        ],
                        "edge": "Рецептура получена",
                        "approval_badge_visible": false,
                        "review_status": "partial",
                        "approved_scope": "Общий склад учёта Производство; механизм ограничения резерва ещё не утверждён",
                        "approval_sources": [
                          {
                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                            "comment_id": "AAACIU-xD6w",
                            "author": "Данила",
                            "date": "2026-10-08"
                          }
                        ],
                        "children": [
                          {
                            "id": "local_new_batch_raw_pick",
                            "title": "Экран «Задания склада»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список складских заданий; склад ПФ, вид работы, статус, срок и исполнитель.\n• В карточке: рецептура, компоненты, исходные партии, план/факт массы, откуда → куда, кому передать.\n• Кто и когда взял задание, недостача, причина проблемы и история.\n\nТекущее задание:\nПодборщик сырья: набрать компоненты по рецептуре на складе ПФ\nРоль: Подборщик сырья — сотрудник склада ПФ.\nМесто: Склад ПФ — отдельное помещение.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nподборщик отмеряет компоненты, комплектует и подписывает палет под замес/оборудование. Подбор выполняется на складе ПФ. Сохранить фактические количества и партии, передать оператору. Перемещения со склада сырья выполняются только при недостатке на Производстве.\n\nЗамесчик получает подготовленные материалы и подтверждает их приёмку в своём задании.",
                            "open": true,
                            "links": [
                              "local_new_batch_rework_check"
                            ],
                            "edge": "Да",
                            "approval_badge_visible": false,
                            "screen_task": "Подборщик сырья: набрать компоненты по рецептуре на складе ПФ",
                            "screen_id": "warehouse_tasks",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  45
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              },
                              {
                                "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                "date": "2026-10-15",
                                "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                              }
                            ],
                            "children": [
                              {
                                "id": "local_new_batch_rework_check",
                                "title": "В рецептуре этого замеса согласована переработка?",
                                "kind": "check",
                                "notes": "Только переработка, назначенная именно в изготовление новой базы. Если технолог назначил её позже при колеровке, здесь материал не заказывать. Использовать уже согласованные партии и массу; не вычитать объём повторно.",
                                "open": true,
                                "links": [
                                  "local_new_batch_rework_move",
                                  "f_227_4237"
                                ],
                                "edge": "Выполнено — Сырьё подобрано",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "local_new_batch_rework_move",
                                    "title": "Экран «Задания склада»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nСотрудник склада переработки: передать согласованные партии и массу на производство\nРоль: Сотрудник склада ПФ; при занятости — оператор погрузчика производства по команде технолога или старшего смены.\nМесто: Склад ПФ / переработки → производство.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nСохранить резерв, если ещё не закреплён, фактические партии и массу. Подтвердить получение. Использовать ранее выполненную передачу без дубля; при недостаче уточнить состав у технолога.",
                                    "open": true,
                                    "links": [
                                      "local_new_batch_rework_onec"
                                    ],
                                    "edge": "Да",
                                    "approval_badge_visible": false,
                                    "screen_task": "Сотрудник склада переработки: передать согласованные партии и массу на производство",
                                    "screen_id": "warehouse_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          40,
                                          41
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "local_new_batch_rework_onec",
                                        "title": "1С: переместить переработку со склада переработки на склад Производство",
                                        "kind": "onec",
                                        "notes": "Передать в учёте только фактическую массу. Исходная переработка должна быть учтена; документ её постановки относится к отдельной цепочке. Повторно выполненный документ не создавать. Это передача материалов перед выпуском, не перемещение результата производства.",
                                        "open": true,
                                        "links": [
                                          "f_227_4237"
                                        ],
                                        "edge": "Выполнено — Переработка получена",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "children": []
                                      }
                                    ]
                                  },
                                  {
                                    "id": "f_227_4237",
                                    "title": "Система: выдать задание замесчику и печатную рецептуру",
                                    "kind": "task",
                                    "notes": "Оператор и замесчик — один исполнитель. Задание: оборудование/ёмкость, партия, масса, компоненты и порядок внесения, назначения по позициям и фасовкам. Печатная рецептура — привычная форма 1С. Не запускать до обеспечения материалов.\nПоказать ТЗ на фасовку по партии: назначения, количества и фасовки.\nСистема выдаёт задание и рецептуру после обеспечения материалов; исполнитель открывает его на общем экране заданий производства.\n\nПечать рецептуры: замесчик; инициирование при подборе — подборщик сырья. Текущий принтер — офис производства. Электронная рецептура и новое размещение принтера остаются на согласовании.",
                                    "open": true,
                                    "links": [
                                      "f_227_4239"
                                    ],
                                    "edge": "Нет — без переработки в замесе",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "automatic_step": true,
                                    "children": [
                                      {
                                        "id": "f_227_4239",
                                        "title": "Экран «Замес»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиции, база, масса, оборудование, ёмкость, партия, рецептура, материалы, план/факт и результат ОТК.\n• Фильтры / сортировка: Роль, рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nЗамесчик: принять материалы и задание; начать замес\nРоль: Замесчик.\nМесто: Производство; для затирки — склад ПФ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПодтвердить фактическую ёмкость/оборудование, партии и количество материалов, время начала. Не изменять оборудование на недопустимое и не запускать неподготовленный замес.\n\nУчёт времени: фиксировать начало и завершение операций замеса. Передачу пробы выполняет замесчик. Отклонения от заданного времени сохраняются в архиве нарушений.",
                                        "open": true,
                                        "links": [
                                          "f_227_4243"
                                        ],
                                        "edge": "Выполнено",
                                        "approval_badge_visible": false,
                                        "screen_task": "Замесчик: принять материалы и задание; начать замес",
                                        "screen_id": "mixing_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              9,
                                              10,
                                              12
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "f_227_4243",
                                            "title": "Экран «Замес»",
                                            "kind": "screen",
                                            "notes": "Данные:\n• Список заданий и карточка: счёт / позиции, база, масса, оборудование, ёмкость, партия, рецептура, материалы, план/факт и результат ОТК.\n• Фильтры / сортировка: Роль, рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nПередать пробу партии в лабораторию ОТК\nРоль: Замесчик.\nМесто: Производство; для затирки — склад ПФ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nФиксировать время отбора и передачи пробы; исполнитель — замесчик.",
                                            "open": true,
                                            "links": [
                                              "f_227_4244"
                                            ],
                                            "edge": "Выполнено",
                                            "approval_badge_visible": false,
                                            "screen_task": "Передать пробу партии в лабораторию ОТК",
                                            "screen_id": "mixing_tasks",
                                            "review_status": "pending",
                                            "ui_review_status": "pending",
                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                            "approval_sources": [
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                "points": [
                                                  9,
                                                  10,
                                                  12
                                                ],
                                                "date": "2026-10-15",
                                                "scope": "assignment role and physical place"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "f_227_4244",
                                                "title": "Экран «ОТК»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: Партия, исходное задание, проба/выкрас, результат проверки, назначенные добавки и масса.\n• Фильтры / сортировка: Участок, партия, статус.\n\nТекущее задание:\nПроверить пробу партии и принять её либо назначить доведение\nРоль: Сотрудник ОТК.\nМесто: Лаборатория ОТК.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя.\n• «Назначить доведение» — сохранить решение и продолжить существующую ветку.\n• «Принять партию» — сохранить решение и продолжить существующую ветку.\n• «Проблема» — указать причину.\n\nПравила процесса:\nЛаборатория фиксирует время начала/завершения, измеренные показатели и решение по партии. ОТК качества базы отличается от внутреннего контроля цвета колеровщиком.\n\nДанные лабораторного контроля базы:\n• Номер партии, продукция и связанные позиции счетов.\n• Вязкость, плотность, степень перетира, температура, pH; применимость и допуски — по таблице ОТК конкретного продукта.\n• Выкрасы на специальных подложках, измеренные показатели, исполнитель и решение.\nПосле «Принять партию» система формирует паспорт; лаборатория не составляет его вручную.\nИсточник: https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.vfbyua7848qd\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.",
                                                "open": true,
                                                "links": [
                                                  "f_227_4245",
                                                  "f_227_4248",
                                                  "local_quality_unfixable_defect_route"
                                                ],
                                                "edge": "Выполнено",
                                                "approval_badge_visible": false,
                                                "screen_task": "Проверить пробу: принять, назначить доведение или признать неисправимый брак",
                                                "screen_id": "quality_tasks",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      11,
                                                      12
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role and physical place"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "f_227_4245",
                                                    "title": "Экран «ОТК»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Список заданий и карточка: Партия, исходное задание, проба/выкрас, результат проверки, назначенные добавки и масса.\n• Фильтры / сортировка: Участок, партия, статус.\n\nТекущее задание:\nОТК: указать компоненты и массу для доведения; вернуть задание замесчику\nРоль: Сотрудник ОТК.\nМесто: Лаборатория ОТК.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nОТК указывает компоненты и массу доведения. Замесчик подтверждает фактическое внесение по партии; расход включается в итоговое производство. Запас добавок общий; в 1С он учитывается на существующем складе Производство. Отдельный виртуальный склад не требуется.\n\nДоведение: указать время перемешивания 5 / 10 / 15 / 20 / 25 / 30 минут и обороты — минимальные / средние / максимальные. Эти параметры передаются замесчику вместе с добавками и массами.",
                                                    "open": true,
                                                    "links": [
                                                      "local_new_batch_extra_available"
                                                    ],
                                                    "edge": "Назначить доведение",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "ОТК: указать компоненты и массу для доведения; вернуть задание замесчику",
                                                    "screen_id": "quality_tasks",
                                                    "review_status": "partial",
                                                    "ui_review_status": "pending",
                                                    "approved_scope": "Общий запас добавок, склад учёта — Производство; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIU-xD6w",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                        "points": [
                                                          11,
                                                          12
                                                        ],
                                                        "date": "2026-10-15",
                                                        "scope": "assignment role and physical place"
                                                      }
                                                    ],
                                                    "children": [
                                                      {
                                                        "id": "local_new_batch_extra_available",
                                                        "title": "Добавок для доведения хватает на производстве?",
                                                        "kind": "check",
                                                        "notes": "Проверить назначенные ОТК количества в физическом запасе доведения. Учёт в 1С — общий склад Производство. Если хватает — довести; иначе доставить дефицит. Не создавать новый виртуальный склад.",
                                                        "open": true,
                                                        "links": [
                                                          "local_new_batch_apply_correction",
                                                          "local_new_batch_extra_move"
                                                        ],
                                                        "edge": "Выполнено — Доведение назначено",
                                                        "approval_badge_visible": false,
                                                        "review_status": "approved",
                                                        "approved_scope": "Производственное действие и указанное место",
                                                        "approval_sources": [
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                            "comment_id": "AAACIU-xD6w",
                                                            "author": "Данила",
                                                            "date": "2026-10-08"
                                                          }
                                                        ],
                                                        "children": [
                                                          {
                                                            "id": "local_new_batch_apply_correction",
                                                            "title": "Экран «Замес»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: счёт / позиции, база, масса, оборудование, ёмкость, партия, рецептура, материалы, план/факт и результат ОТК.\n• Фильтры / сортировка: Роль, рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nЗамесчик: внести добавки ОТК; записать расход и передать повторную пробу\nРоль: Замесчик.\nМесто: Производство; для затирки — склад ПФ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nСохранить массы, партии, время и номер попытки по той же партии замеса. Не повторять первоначальную загрузку сырья или переработки.\n\nСоблюдать назначенные ОТК время и обороты. В карточке: 5 / 10 / 15 / 20 / 25 / 30 минут; минимальные / средние / максимальные обороты. Фиксировать фактическое начало и завершение; отклонения по времени — в архив нарушений.",
                                                            "open": true,
                                                            "links": [
                                                              "f_227_4243"
                                                            ],
                                                            "edge": "Да",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Замесчик: внести добавки ОТК; записать расход и передать повторную пробу",
                                                            "screen_id": "mixing_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  9,
                                                                  10,
                                                                  12
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": []
                                                          },
                                                          {
                                                            "id": "local_new_batch_extra_move",
                                                            "title": "Экран «Задания склада»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nПодборщик сырья: пополнить запас доведения у замесчика\nРоль: Подборщик сырья.\nМесто: Склад ПФ → запас доведения на производстве.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nДоставить только недостающие компоненты и количества. Указать фактический источник и место передачи на производстве. При отсутствии материала ждать обеспечения; партию не принимать.\n\nЗамесчик контролирует остаток и инициирует пополнение. Подборщик сырья доставляет недостающее со склада ПФ в запас доведения на производстве. Виртуальный склад 1С остаётся на согласовании.",
                                                            "open": true,
                                                            "links": [
                                                              "local_new_batch_extra_onec"
                                                            ],
                                                            "edge": "Нет — пополнить запас",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Подборщик сырья: пополнить запас доведения у замесчика",
                                                            "screen_id": "warehouse_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  46
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "local_new_batch_extra_onec",
                                                                "title": "1С: переместить недостающие добавки на склад Производство",
                                                                "kind": "onec",
                                                                "notes": "Если источник имеет другой склад учёта: документ перемещения источник → Производство. Если материалы уже на складе Производство, учётное перемещение не нужно. Физическую доставку к замесчику подтвердить отдельно. Фактические добавки включить в итоговое производство.",
                                                                "open": true,
                                                                "links": [
                                                                  "local_new_batch_apply_correction"
                                                                ],
                                                                "edge": "Выполнено — Материалы доставлены",
                                                                "approval_badge_visible": false,
                                                                "review_status": "partial",
                                                                "approved_scope": "Склад-получатель Производство; детали движения требуют утверждения",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                    "comment_id": "AAACIU-xD6w",
                                                                    "author": "Данила",
                                                                    "date": "2026-10-08"
                                                                  }
                                                                ],
                                                                "children": []
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "id": "f_227_4248",
                                                    "title": "Партия принята ОТК; показатели сохранены",
                                                    "kind": "result",
                                                    "notes": "Лаборатория сохраняет фактические показатели конкретной партии и решение. Паспорт формирует система по этим данным.\nИсточник: https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.vfbyua7848qd",
                                                    "open": true,
                                                    "links": [
                                                      "quality_generate_passport"
                                                    ],
                                                    "edge": "Принять партию",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "children": [
                                                      {
                                                        "id": "quality_generate_passport",
                                                        "title": "Система: сформировать паспорт качества; прикрепить к партии и связанным счетам",
                                                        "kind": "task",
                                                        "notes": "Данные — принятые показатели ОТК конкретной партии. Сохранить связь с номенклатурной позицией каждого счёта. Сейчас паспорта делают менеджеры; автоматическое формирование — целевое поведение Лакомки. Формат паспорта и правила обязательности показателей требуют подтверждения; не заполнять отсутствующие данные вымышленными значениями.\nИсточник: https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.vfbyua7848qd\n\nСостав паспорта:\n• Продукция, номер партии, дата выпуска.\n• Применимые показатели из таблицы ОТК данной продукции: фактические значения и нормативы.\n• Результат приёмки и связь с партией и позициями счетов.\n• Не подставлять отсутствующие измерения. Шаблон и обязательные поля требуют подтверждения.\n\nДоступ:\nПросмотр, печать и скачивание из карточки партии и связанного счёта. Паспорт создаётся после приёмки ОТК; не требует ручного задания менеджеру.\n\nОткрытое уточнение:\nПосле принятия цвета нужно связать паспорт с итоговой колерованной продукцией и её партией. Пока не подтверждено, наследуется ли документ базы или создаётся новый итоговый паспорт, включая колеровку из складской ГП/ПФ. Не подменять подтверждённый паспорт базы вымышленным итоговым документом.\n\nПодтверждено: сотрудник ОТК вводит показатели и отпускает партию; система подставляет результаты в шаблон паспорта бренда Lakom / Marble / Застрой. Сохранить идентификатор сотрудника, отпустившего партию. Партия соответствует замесу.",
                                                        "open": true,
                                                        "links": [
                                                          "f_227_4249"
                                                        ],
                                                        "edge": "Показатели приняты",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": [
                                                          {
                                                            "id": "f_227_4249",
                                                            "title": "Экран «Фасовка»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Принятая партия, масса, исходная дежа и назначения по позициям.\n• Масса каждой части, ёмкости для отбора, фасовки и фактические количества.\n\nТекущее задание:\nФасовщик производства: разделить принятый замес по готовому заданию на фасовку\nРоль: Фасовщик производства.\nМесто: Производство, зона фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено» — подтвердить фактическое разделение по готовому заданию.\n• «Проблема» — указать причину.\n\nПравила процесса:\nРаспределить фактический выход одной базы по позициям заказов и пополнению ПФ согласно плану. В ТЗ на фасовку указать, что и сколько расфасовать, включая ПФ. Пополнение ПФ сейчас без отдельного счёта. Сумма частей равна фактическому выходу; краску и смолу затирки в одном замесе не объединять.\n\nПосле ОТК фасовщики разделяют партию по подтверждённому плану. Границы автоматического планирования остаются на согласовании.",
                                                            "open": true,
                                                            "links": [
                                                              "local_new_batch_part_destination"
                                                            ],
                                                            "edge": "Паспорт сохранён",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Фасовщик производства: разделить принятый замес по готовому заданию на фасовку",
                                                            "screen_id": "packing_tasks",
                                                            "review_status": "partial",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Одна база; разделение по ТЗ на фасовку, включая ПФ; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                "comment_id": "AAACIF4yhr8",
                                                                "author": "Данила",
                                                                "date": "2026-10-08"
                                                              },
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  13
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              },
                                                              {
                                                                "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                                "date": "2026-10-15",
                                                                "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "local_new_batch_part_destination",
                                                                "title": "Этот объём предназначен для пополнения склада ПФ?",
                                                                "kind": "check",
                                                                "notes": "Проверить назначение части по плану: пополнение ПФ или дальнейшее изготовление по позиции заказа. Пополнение ПФ сейчас без счёта; связь с замесом и объём сохраняются в плане. Здесь не выбирают тип базы или источник.",
                                                                "open": true,
                                                                "links": [
                                                                  "f_230_4702",
                                                                  "local_new_batch_pf_stock_move"
                                                                ],
                                                                "edge": "Подтвердить план — Объёмы закреплены за позициями",
                                                                "approval_badge_visible": false,
                                                                "review_status": "pending",
                                                                "children": [
                                                                  {
                                                                    "id": "f_230_4702",
                                                                    "title": "1С: производство базы ПФ как пополнение склада ПФ",
                                                                    "kind": "onec",
                                                                    "notes": "Первый выпуск ПФ — пополнение склада ПФ, без заказа покупателя и без счёта пополнения ГП. Продукция — произведённая база ПФ; получатель — склад ПФ. Использовать итоговый фактический расход сырья, добавок и согласованной переработки. Связь с позициями заказов сохраняется в плане и заданиях на фасовку. Точные поля и разделение расхода в 1С требуют утверждения.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "local_new_batch_grout_type"
                                                                    ],
                                                                    "edge": "Нет — объём под заказ",
                                                                    "approval_badge_visible": false,
                                                                    "review_status": "partial",
                                                                    "approved_scope": "Первый выпуск ПФ как пополнение склада ПФ, без заказа покупателя",
                                                                    "approval_sources": [
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                        "comment_id": "AAACIF4yhro",
                                                                        "author": "Данила",
                                                                        "date": "2026-10-08"
                                                                      },
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                        "comment_id": "AAACIF4yhr4",
                                                                        "author": "Данила",
                                                                        "date": "2026-10-08"
                                                                      }
                                                                    ],
                                                                    "children": [
                                                                      {
                                                                        "id": "local_new_batch_grout_type",
                                                                        "title": "Тип базы этого замеса — для затирки?",
                                                                        "kind": "check",
                                                                        "notes": "Проверить тип базы, сохранённый при планировании всего замеса. Это не выбор нового типа продукции для выделенного объёма. Один замес содержит одну совместимую базу: смолу для затирки либо базу другой продукции. Все заказные объёмы одного замеса проходят одну и ту же ветку типа; могут отличаться цветом, фасовкой и назначением.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "local_grout_base_ready",
                                                                          "f_227_4257"
                                                                        ],
                                                                        "edge": "Выпуск базы ПФ учтён",
                                                                        "approval_badge_visible": false,
                                                                        "review_status": "pending",
                                                                        "children": [
                                                                          {
                                                                            "id": "f_227_4257",
                                                                            "title": "Для выделенной части нужна колеровка?",
                                                                            "kind": "check",
                                                                            "open": true,
                                                                            "links": [
                                                                              "f_227_4259",
                                                                              "local_resume_coloring_after_batch"
                                                                            ],
                                                                            "edge": "Нет — другая продукция",
                                                                            "approval_badge_visible": false,
                                                                            "review_status": "pending",
                                                                            "children": [
                                                                              {
                                                                                "id": "f_227_4259",
                                                                                "title": "Система: автоматически подготовить макет и документ печати",
                                                                                "kind": "task",
                                                                                "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки.",
                                                                                "open": true,
                                                                                "links": [
                                                                                  "mark_ready_f_227_4259"
                                                                                ],
                                                                                "edge": "Нет",
                                                                                "approval_badge_visible": false,
                                                                                "review_status": "pending",
                                                                                "automatic_step": true,
                                                                                "children": [
                                                                                  {
                                                                                    "id": "mark_ready_f_227_4259",
                                                                                    "title": "Макет и документ печати готовы; задание маркировки доступно после готовности продукции",
                                                                                    "kind": "result",
                                                                                    "notes": "Макет связан с позицией и заданием маркировки. Печать доступна из карточки маркировки; исполнение — после готовности продукции.",
                                                                                    "open": true,
                                                                                    "links": [
                                                                                      "f_227_4261"
                                                                                    ],
                                                                                    "edge": "Макет и документ печати сформированы",
                                                                                    "approval_badge_visible": false,
                                                                                    "review_status": "pending",
                                                                                    "children": [
                                                                                      {
                                                                                        "id": "f_227_4261",
                                                                                        "title": "Экран «Фасовка»",
                                                                                        "kind": "screen",
                                                                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: место фасовки, тип продукции, статус, срок, приоритет.\n\nТекущее задание:\nЗадание фасовщику: расфасовать продукцию на производстве\nРоль: Фасовщик производства.\nМесто: Производство, зона фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                                                                        "open": true,
                                                                                        "links": [
                                                                                          "mark_apply_f_227_4261",
                                                                                          "equipment_wash_decision"
                                                                                        ],
                                                                                        "edge": "",
                                                                                        "approval_badge_visible": false,
                                                                                        "screen_task": "Задание фасовщику: расфасовать продукцию на производстве",
                                                                                        "screen_id": "packing_tasks",
                                                                                        "review_status": "pending",
                                                                                        "ui_review_status": "pending",
                                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                        "approval_sources": [
                                                                                          {
                                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                            "points": [
                                                                                              14,
                                                                                              25
                                                                                            ],
                                                                                            "date": "2026-10-15",
                                                                                            "scope": "assignment role and physical place"
                                                                                          },
                                                                                          {
                                                                                            "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                                                            "date": "2026-10-15",
                                                                                            "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                                                                          }
                                                                                        ],
                                                                                        "children": [
                                                                                          {
                                                                                            "id": "mark_apply_f_227_4261",
                                                                                            "title": "Экран «Маркировка»",
                                                                                            "kind": "screen",
                                                                                            "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить этикетки и стикеры на расфасованную продукцию.\nМесто: Производство.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                                                                            "open": true,
                                                                                            "links": [
                                                                                              "local_new_batch_fill_production"
                                                                                            ],
                                                                                            "edge": "Выполнено — Фасовка выполнена",
                                                                                            "approval_badge_visible": false,
                                                                                            "screen_task": "Наклеить этикетки и стикеры на расфасованную продукцию.",
                                                                                            "screen_id": "marking",
                                                                                            "review_status": "pending",
                                                                                            "ui_review_status": "pending",
                                                                                            "children": [
                                                                                              {
                                                                                                "id": "local_new_batch_fill_production",
                                                                                                "title": "1С: производство ГП в нужной фасовке из выпущенного ПФ и тары",
                                                                                                "kind": "onec",
                                                                                                "notes": "После фактической фасовки: продукция — ГП исходной позиции, материалы — выпущенный ПФ, фактическая тара и добавки. Сырьё и переработку, уже списанные при выпуске ПФ, повторно не указывать. Для контрактной продукции использовать клиентское наименование в продукции и фактическую базу в материалах.",
                                                                                                "open": true,
                                                                                                "links": [
                                                                                                  "f_227_4266"
                                                                                                ],
                                                                                                "edge": "Фасовка и маркировка завершены",
                                                                                                "approval_badge_visible": false,
                                                                                                "review_status": "pending",
                                                                                                "children": [
                                                                                                  {
                                                                                                    "id": "f_227_4266",
                                                                                                    "title": "1С: оформить МХ-18 — передачу выпущенной ГП на склад ГП",
                                                                                                    "kind": "onec",
                                                                                                    "notes": "Передача в контексте выпуска ГП; отдельное перемещение того же выпуска не создавать.\nпри передаче произведённой ГП на склад МХ-18 оформляют всегда.",
                                                                                                    "open": true,
                                                                                                    "links": [
                                                                                                      "f_227_4264"
                                                                                                    ],
                                                                                                    "edge": "Производство проведено",
                                                                                                    "approval_badge_visible": false,
                                                                                                    "review_status": "approved",
                                                                                                    "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                                                                    "approval_sources": [
                                                                                                      {
                                                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                                                        "comment_id": "AAACGqcevZg",
                                                                                                        "author": "Данила",
                                                                                                        "date": "2026-10-08"
                                                                                                      }
                                                                                                    ],
                                                                                                    "children": [
                                                                                                      {
                                                                                                        "id": "f_227_4264",
                                                                                                        "title": "Экран «Задания склада»",
                                                                                                        "kind": "screen",
                                                                                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику на перемещение на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                                                                                        "open": true,
                                                                                                        "links": [
                                                                                                          "f_227_4263"
                                                                                                        ],
                                                                                                        "edge": "МХ-18 оформлена",
                                                                                                        "approval_badge_visible": false,
                                                                                                        "screen_task": "Задание кладовщику на перемещение на склад ГП",
                                                                                                        "screen_id": "warehouse_tasks",
                                                                                                        "review_status": "pending",
                                                                                                        "ui_review_status": "pending",
                                                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                                        "approval_sources": [
                                                                                                          {
                                                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                                            "points": [
                                                                                                              42
                                                                                                            ],
                                                                                                            "date": "2026-10-15",
                                                                                                            "scope": "assignment role and physical place"
                                                                                                          }
                                                                                                        ],
                                                                                                        "children": [
                                                                                                          {
                                                                                                            "id": "f_227_4263",
                                                                                                            "title": "Экран «Задания склада»",
                                                                                                            "kind": "screen",
                                                                                                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику Подготовка позиций к отгрузке\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                                                                                            "open": true,
                                                                                                            "links": [
                                                                                                              "f_227_4267"
                                                                                                            ],
                                                                                                            "edge": "Выполнено — Продукция передана на ГП",
                                                                                                            "approval_badge_visible": false,
                                                                                                            "screen_task": "Задание кладовщику Подготовка позиций к отгрузке",
                                                                                                            "screen_id": "warehouse_tasks",
                                                                                                            "review_status": "pending",
                                                                                                            "ui_review_status": "pending",
                                                                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                                            "approval_sources": [
                                                                                                              {
                                                                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                                                "points": [
                                                                                                                  1,
                                                                                                                  44
                                                                                                                ],
                                                                                                                "date": "2026-10-15",
                                                                                                                "scope": "assignment role and physical place"
                                                                                                              }
                                                                                                            ],
                                                                                                            "children": [
                                                                                                              {
                                                                                                                "id": "f_227_4267",
                                                                                                                "title": "Готов к отгрузке",
                                                                                                                "kind": "result",
                                                                                                                "open": true,
                                                                                                                "links": [],
                                                                                                                "edge": "Выполнено — Подготовка завершена",
                                                                                                                "approval_badge_visible": false,
                                                                                                                "review_status": "pending",
                                                                                                                "children": []
                                                                                                              }
                                                                                                            ]
                                                                                                          }
                                                                                                        ]
                                                                                                      }
                                                                                                    ]
                                                                                                  }
                                                                                                ]
                                                                                              }
                                                                                            ]
                                                                                          },
                                                                                          {
                                                                                            "id": "equipment_wash_decision",
                                                                                            "title": "Экран «Оборудование»",
                                                                                            "kind": "screen",
                                                                                            "notes": "Данные:\n• Дежа/оборудование, партия, последняя продукция, состояние, исполнитель.\n\nВход:\n• После фасовки, когда ресурс освобождён от всех запланированных частей замеса.\n• Если в нём остаётся продукция, задание ожидает освобождения.\n\nДействия:\n• Инициировать мойку — создать задание на мойку.\n• Не сейчас — оставить ресурс недоступным; задание можно открыть повторно.\n\nРезультат:\n• Готовая продукция продолжает свой маршрут независимо от мойки.\n• Один открытый процесс мойки на ресурс; повторное событие не создаёт дубль.\n• Ресурс остаётся недоступным до подтверждённого завершения мойки.",
                                                                                            "open": true,
                                                                                            "links": [
                                                                                              "equipment_wash_task",
                                                                                              "equipment_wash_waiting"
                                                                                            ],
                                                                                            "edge": "Параллельно: ресурс освобождён",
                                                                                            "approval_badge_visible": true,
                                                                                            "screen_task": "Старший смены: инициировать мойку использованного ресурса?",
                                                                                            "screen_id": "equipment_tasks",
                                                                                            "review_status": "pending",
                                                                                            "ui_review_status": "pending",
                                                                                            "children": [
                                                                                              {
                                                                                                "id": "equipment_wash_task",
                                                                                                "title": "Экран «Оборудование»",
                                                                                                "kind": "screen",
                                                                                                "notes": "Данные:\n• Номер ресурса, партия, предыдущая продукция, следующее назначение, указания по мойке.\n\nВход:\n• Старший смены инициировал мойку освобождённого ресурса.\n\nДействия:\n• Взять в работу.\n• Мойка завершена — подтвердить выполнение.\n• Проблема — указать причину; ресурс остаётся недоступным.\n\nРезультат:\nПосле подтверждённой мойки снять блокировку ресурса. Проблема отображается в том же задании, без отдельного экрана.",
                                                                                                "open": true,
                                                                                                "links": [
                                                                                                  "equipment_wash_available"
                                                                                                ],
                                                                                                "edge": "Инициировать мойку",
                                                                                                "approval_badge_visible": true,
                                                                                                "screen_task": "Мойщик: вымыть указанную дежу/оборудование",
                                                                                                "screen_id": "equipment_tasks",
                                                                                                "review_status": "pending",
                                                                                                "ui_review_status": "pending",
                                                                                                "children": [
                                                                                                  {
                                                                                                    "id": "equipment_wash_available",
                                                                                                    "title": "Мойка завершена; ресурс доступен для планирования",
                                                                                                    "kind": "result",
                                                                                                    "notes": "",
                                                                                                    "open": true,
                                                                                                    "links": [],
                                                                                                    "edge": "Мойка завершена",
                                                                                                    "approval_badge_visible": false,
                                                                                                    "review_status": "pending",
                                                                                                    "children": []
                                                                                                  }
                                                                                                ]
                                                                                              },
                                                                                              {
                                                                                                "id": "equipment_wash_waiting",
                                                                                                "title": "Ресурс недоступен; ожидает запуска мойки",
                                                                                                "kind": "result",
                                                                                                "notes": "Старший смены возвращается к существующему заданию и инициирует мойку. До этого ресурс не участвует в распределении.\n«Не сейчас» откладывает запуск, не завершает мойку и не делает ресурс доступным. Старший смены возвращается в то же задание; повторный экземпляр не создаётся.",
                                                                                                "open": true,
                                                                                                "links": [
                                                                                                  "equipment_wash_decision"
                                                                                                ],
                                                                                                "edge": "Не сейчас",
                                                                                                "approval_badge_visible": false,
                                                                                                "review_status": "pending",
                                                                                                "children": []
                                                                                              }
                                                                                            ]
                                                                                          }
                                                                                        ]
                                                                                      }
                                                                                    ]
                                                                                  }
                                                                                ]
                                                                              },
                                                                              {
                                                                                "id": "local_resume_coloring_after_batch",
                                                                                "title": "Место колеровки этой части уже назначено?",
                                                                                "kind": "check",
                                                                                "notes": "После проверки необходимости цвета. Если место колеровки уже назначено, использовать сохранённое назначение КМ или производства, в том числе для образца 1 кг. Если не назначено, сравнить колеруемые части замеса и определить, какую оставить в деже. База уже изготовлена и обеспечена. Штукатурку на КМ не направлять: только производство, включая колеровку в деже.\n\nВопрос для согласования:\nДля обычного малого объёма очередь могла измениться за время изготовления базы. Нужно подтвердить: сохранить предварительное место колеровки или повторно проверить очереди после готовности базы. До решения действуют текущие связи. Для образца сохраняется решение технолога; штукатурку на КМ не направлять.",
                                                                                "open": true,
                                                                                "links": [
                                                                                  "local_sample_fresh_batch_destination",
                                                                                  "local_large_batch_color_allocation"
                                                                                ],
                                                                                "edge": "Да",
                                                                                "approval_badge_visible": false,
                                                                                "review_status": "pending",
                                                                                "children": [
                                                                                  {
                                                                                    "id": "local_sample_fresh_batch_destination",
                                                                                    "title": "Куда назначена колеровка этой части?",
                                                                                    "kind": "check",
                                                                                    "notes": "Использовать сохранённое назначение КМ или производства. Для образца — решение технолога до нового замеса. Источник — готовая база нового замеса, количество и партия известны; повторно обеспечение ПФ не выполнять. Для штукатурки допустимо только производство.\n\nВопрос для согласования:\nДля обычного малого объёма очередь могла измениться за время изготовления базы. Нужно подтвердить: сохранить предварительное место колеровки или повторно проверить очереди после готовности базы. До решения действуют текущие связи. Для образца сохраняется решение технолога; штукатурку на КМ не направлять.",
                                                                                    "open": true,
                                                                                    "links": [
                                                                                      "f_241_5098",
                                                                                      "f_241_5114"
                                                                                    ],
                                                                                    "edge": "Да — назначение сохранено",
                                                                                    "approval_badge_visible": false,
                                                                                    "review_status": "pending",
                                                                                    "children": []
                                                                                  },
                                                                                  {
                                                                                    "id": "local_large_batch_color_allocation",
                                                                                    "title": "Эта колеруемая часть — самая большая по объёму и может остаться в деже?",
                                                                                    "kind": "check",
                                                                                    "notes": "Место колеровки заранее не назначено. Сравнить все колеруемые части этого замеса. Самую большую по возможности оставить и колеровать в деже; остальные выделить и слить в отдельные технологические ёмкости для колеровки на производстве. Если колеруемая часть одна, она самая большая. Учитывать технологические ограничения и оборудование. Порог 250 кг здесь не проверяется.",
                                                                                    "open": true,
                                                                                    "links": [
                                                                                      "local_keep_largest_colored_base_in_deja",
                                                                                      "local_other_colored_base_container"
                                                                                    ],
                                                                                    "edge": "Нет — выбрать по частям замеса",
                                                                                    "approval_badge_visible": false,
                                                                                    "review_status": "pending",
                                                                                    "children": [
                                                                                      {
                                                                                        "id": "local_keep_largest_colored_base_in_deja",
                                                                                        "title": "Экран «Фасовка»",
                                                                                        "kind": "screen",
                                                                                        "notes": "Данные:\n• Принятая партия, масса, исходная дежа и назначения по позициям.\n• Масса каждой части, ёмкости для отбора, фасовки и фактические количества.\n\nТекущее задание:\nФасовщик производства: оставить назначенную наибольшую колеруемую часть в исходной деже\nРоль: Фасовщик производства.\nМесто: Производство, зона фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено» — подтвердить фактическое разделение по готовому заданию.\n• «Проблема» — указать причину.",
                                                                                        "open": true,
                                                                                        "links": [
                                                                                          "local_deja_coloring_route"
                                                                                        ],
                                                                                        "edge": "Да",
                                                                                        "approval_badge_visible": false,
                                                                                        "screen_task": "Фасовщик производства: оставить назначенную наибольшую колеруемую часть в исходной деже",
                                                                                        "screen_id": "packing_tasks",
                                                                                        "review_status": "pending",
                                                                                        "ui_review_status": "pending",
                                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                        "approval_sources": [
                                                                                          {
                                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                            "points": [
                                                                                              13
                                                                                            ],
                                                                                            "date": "2026-10-15",
                                                                                            "scope": "assignment role and physical place"
                                                                                          },
                                                                                          {
                                                                                            "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                                                            "date": "2026-10-15",
                                                                                            "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                                                                          }
                                                                                        ],
                                                                                        "children": []
                                                                                      },
                                                                                      {
                                                                                        "id": "local_other_colored_base_container",
                                                                                        "title": "Экран «Фасовка»",
                                                                                        "kind": "screen",
                                                                                        "notes": "Данные:\n• Принятая партия, масса, исходная дежа и назначения по позициям.\n• Масса каждой части, ёмкости для отбора, фасовки и фактические количества.\n\nТекущее задание:\nФасовщик производства: отобрать остальные колеруемые части в отдельные ёмкости\nРоль: Фасовщик производства.\nМесто: Производство, зона фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                                                                        "open": true,
                                                                                        "links": [
                                                                                          "f_241_5114"
                                                                                        ],
                                                                                        "edge": "Нет",
                                                                                        "approval_badge_visible": false,
                                                                                        "screen_task": "Фасовщик производства: отобрать остальные колеруемые части в отдельные ёмкости",
                                                                                        "screen_id": "packing_tasks",
                                                                                        "review_status": "pending",
                                                                                        "ui_review_status": "pending",
                                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                        "approval_sources": [
                                                                                          {
                                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                            "points": [
                                                                                              13
                                                                                            ],
                                                                                            "date": "2026-10-15",
                                                                                            "scope": "assignment role and physical place"
                                                                                          },
                                                                                          {
                                                                                            "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                                                            "date": "2026-10-15",
                                                                                            "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                                                                          }
                                                                                        ],
                                                                                        "children": []
                                                                                      }
                                                                                    ]
                                                                                  }
                                                                                ]
                                                                              }
                                                                            ]
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  },
                                                                  {
                                                                    "id": "local_new_batch_pf_stock_move",
                                                                    "title": "Экран «Задания склада»",
                                                                    "kind": "screen",
                                                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: передать объём пополнения на склад ПФ\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nТолько выделенная масса пополнения, а не весь замес. Подтвердить фактическое количество, партии и место хранения.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "local_new_batch_pf_stock_account"
                                                                    ],
                                                                    "edge": "Да — пополнение ПФ",
                                                                    "approval_badge_visible": false,
                                                                    "screen_task": "Кладовщик: передать объём пополнения на склад ПФ",
                                                                    "screen_id": "warehouse_tasks",
                                                                    "review_status": "pending",
                                                                    "ui_review_status": "pending",
                                                                    "children": [
                                                                      {
                                                                        "id": "local_new_batch_pf_stock_account",
                                                                        "title": "1С: производство ПФ на пополнение; получатель — склад ПФ",
                                                                        "kind": "onec",
                                                                        "notes": "Пополнение ПФ инициирует планировщик; в текущем порядке счёт не создают. Продукция — произведённый ПФ, получатель — склад ПФ. Учесть соответствующий фактический расход один раз. Объёмы заказов и пополнения фиксировать в плане и ТЗ на фасовку. Точные поля и разделение документов требуют подтверждения 1С.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "local_new_batch_pf_stock_ready"
                                                                        ],
                                                                        "edge": "Выполнено — ПФ физически принят",
                                                                        "approval_badge_visible": false,
                                                                        "review_status": "partial",
                                                                        "approved_scope": "Получатель — склад ПФ; пополнение без счёта",
                                                                        "approval_sources": [
                                                                          {
                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                            "comment_id": "AAACIF6YlTw",
                                                                            "author": "Данила",
                                                                            "date": "2026-10-08"
                                                                          },
                                                                          {
                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                            "comment_id": "AAACIF4yhr4",
                                                                            "author": "Данила",
                                                                            "date": "2026-10-08"
                                                                          }
                                                                        ],
                                                                        "children": [
                                                                          {
                                                                            "id": "local_new_batch_pf_stock_ready",
                                                                            "title": "Пополнение ПФ принято и учтено на складе",
                                                                            "kind": "result",
                                                                            "notes": "",
                                                                            "open": true,
                                                                            "links": [],
                                                                            "edge": "Учёт подтверждён",
                                                                            "approval_badge_visible": false,
                                                                            "review_status": "pending",
                                                                            "children": []
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "id": "local_quality_unfixable_defect_route",
                                                    "title": "Маршрут «Брак и возвраты» — неисправимая партия",
                                                    "kind": "route",
                                                    "notes": "Войти в ветку «Брак» существующей схемы. Сохранить исходное задание, партию, продукцию, фактическую массу и причину. Заблокировать выпуск/использование забракованного объёма до решения по назначению; не объявлять его автоматически доступной переработкой.",
                                                    "open": true,
                                                    "links": [
                                                      "f_269_5088"
                                                    ],
                                                    "edge": "Исправить нельзя",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "route_target_id": "f_269_5088",
                                                    "children": []
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": "f_227_4223",
                            "title": "Экран «Задания склада»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: доставить недостающее сырьё со склада сырья на производство\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                            "open": true,
                            "links": [
                              "f_227_4224"
                            ],
                            "edge": "Нет — пополнить дефицит",
                            "approval_badge_visible": false,
                            "screen_task": "Кладовщик: доставить недостающее сырьё со склада сырья на производство",
                            "screen_id": "warehouse_tasks",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "children": [
                              {
                                "id": "f_227_4224",
                                "title": "1С: переместить недостающее сырьё на склад Производство",
                                "kind": "onec",
                                "notes": "На фактически переданное количество; не дублировать ранее выполненные документы. Если материалы уже на Производстве в 1С, требуется только недостающая физическая доставка.",
                                "open": true,
                                "links": [
                                  "local_new_batch_raw_pick"
                                ],
                                "edge": "Выполнено — Сырьё доставлено",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "f_241_5090",
                    "title": "Схема «Планирование оборудования»",
                    "kind": "route",
                    "open": true,
                    "links": [
                      "f_230_4726"
                    ],
                    "edge": "Нет — сначала планирование",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "route_target_id": "f_230_4726",
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_230_4726",
        "title": "План замеса и оборудования",
        "kind": "route",
        "notes": "Ручное изменение плана: объединить с ожидаемым аналогичным счётом, учесть срок годности и фактическую инвентаризацию; причина сохраняется. Мин/макс определяют пополнение. Алгоритм интерфейса требует утверждения.",
        "open": true,
        "links": [
          "f_274_5232"
        ],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_274_5232",
            "title": "Для позиции нужна колеровка?",
            "kind": "check",
            "notes": "ДО ПЛАНИРОВАНИЯ МАССЫ ЗАМЕСА Неколерованная продукция: определить потребность в базе ПФ по спецификации 1С. Колерованная: технолог подтверждает отдельно массу базы ПФ, пигменты и добавки; масса готового цвета не равна автоматически массе ПФ. Для каждой позиции определить, сколько ПФ уже обеспечено и сколько нужно изготовить. Переработку учесть один раз, по согласованному рецепту. Без подтверждённого рецепта колеровки массу соответствующей части замеса окончательно не утверждать.",
            "open": true,
            "links": [
              "local_batch_colored_pf_mass",
              "local_batch_uncolored_pf_mass"
            ],
            "edge": "Расчёт базы для каждой позиции",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "local_batch_colored_pf_mass",
                "title": "Экран «Задания технолога»",
                "kind": "screen",
                "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nТехнолог: подтвердить массу базы ПФ по рецепту цвета\nРоль: Технолог по колеровке.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nИспользовать рассчитанный рецепт; при его отсутствии выдать задание технологу. Отдельно сохранить массу ПФ, пигментов и добавок. Массу конечной цветной продукции не принимать автоматически за массу базы. Учесть согласованную переработку в составе один раз. До подтверждения не утверждать массу замеса этой позиции.",
                "open": true,
                "links": [
                  "f_230_4728"
                ],
                "edge": "Колерованная",
                "approval_badge_visible": false,
                "screen_task": "Технолог: подтвердить массу базы ПФ по рецепту цвета",
                "screen_id": "technology_tasks",
                "review_status": "pending",
                "ui_review_status": "pending",
                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                    "points": [
                      15,
                      16
                    ],
                    "date": "2026-10-15",
                    "scope": "assignment role and physical place"
                  }
                ],
                "children": [
                  {
                    "id": "f_230_4728",
                    "title": "Система: зафиксировать подтверждённую потребность в ПФ и недостающую массу по каждой позиции",
                    "kind": "task",
                    "notes": "Для каждой исходной позиции сохранить: базу ПФ, подтверждённую потребность, уже обеспеченную массу, согласованную переработку и недостающую массу на новый замес; также срок и дальнейший маршрут. Уже обеспеченный объём повторно не планировать, переработку учесть один раз. Здесь фиксируется потребность по строкам, объединение совместимых строк в общий замес — отдельный следующий шаг.",
                    "open": true,
                    "links": [
                      "f_230_4732"
                    ],
                    "edge": "Подтвердить рецепт / решение — Масса ПФ подтверждена",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "automatic_step": true,
                    "children": [
                      {
                        "id": "f_230_4732",
                        "title": "Есть совместимый неначатый замес, в который можно добавить требуемый объём без нарушения технологии, вместимости и сроков?",
                        "kind": "check",
                        "open": true,
                        "links": [
                          "f_273_5194",
                          "f_273_5198"
                        ],
                        "edge": "На замес — только недостающая масса",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "children": [
                          {
                            "id": "f_273_5194",
                            "title": "Экран «План замеса и оборудования»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nДобавить потребность в неначатый замес и пересчитать план\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.",
                            "open": true,
                            "links": [
                              "f_230_4736"
                            ],
                            "edge": "Да",
                            "approval_badge_visible": false,
                            "screen_task": "Добавить потребность в неначатый замес и пересчитать план",
                            "screen_id": "batch_planning",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  5
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": [
                              {
                                "id": "f_230_4736",
                                "title": "Система: сложить совместимые объёмы ПФ под заказы или пополнение склада",
                                "kind": "task",
                                "notes": "Объединить необеспеченную потребность в совместимой базе ПФ. Сохранить массу и назначение по каждой исходной позиции. Пополнение склада добавляется отдельным следующим шагом, чтобы не учитывать его дважды.\nСовместимость означает одну технологически совместимую базу. Краска и смола для затирки в один замес не объединяются.\nПополнение ПФ: однородная база, учитываются мин/макс. Для ПФ из реестра хранения в кубах — от 300 кг; отдельный счёт ПФ сейчас не создают. Автоматизация в Лакомке требует утверждения.",
                                "open": true,
                                "links": [
                                  "local_batch_rework_approved"
                                ],
                                "edge": "Подтвердить план",
                                "approval_badge_visible": false,
                                "review_status": "partial",
                                "approved_scope": "Правила однородности и порога 300 кг для ПФ в кубах",
                                "approval_sources": [
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACIF4yhr8",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                    "comment_id": "AAACIF6YlTw",
                                    "author": "Данила",
                                    "date": "2026-10-08"
                                  }
                                ],
                                "automatic_step": true,
                                "children": [
                                  {
                                    "id": "local_batch_rework_approved",
                                    "title": "Технолог согласовал переработку для этого замеса?",
                                    "kind": "check",
                                    "notes": "Использовать решение технолога из предварительного расчёта: материал, исходные партии, масса, совместимость и этап внесения. Не повторять уже выполненный подбор переработки. Отсутствие подтверждения не разрешает добавлять материал автоматически; план без переработки либо уточнение технологом по ранее назначенному заданию.\nРешение по переработке: уведомление всем ответственным; приоритет главный технолог → технолог → планировщик. Общие 30 минут; более высокая роль может изменить решение в этом же окне.",
                                    "open": true,
                                    "links": [
                                      "local_batch_rework_account",
                                      "local_batch_without_rework"
                                    ],
                                    "edge": "Совместимые потребности собраны",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                        "comment_id": "AAACArc6Lfc",
                                        "author": "Данила"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "local_batch_rework_account",
                                        "title": "Экран «План замеса и оборудования»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nУчесть партии и массу переработки; подтвердить состав и массу нового замеса\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nПо подтверждённому составу технолога показать отдельно новое сырьё/базу и согласованную переработку. Учитывать её фактический объём при подборе ёмкости, если переработка вносится именно в этот замес. Если она будет добавлена позже при колеровке выделенной части, сохранить это назначение и не прибавлять её к базовому замесу. Уже уменьшенную потребность повторно не вычитать. Массу переработки нельзя автоматически считать заменой ПФ один к одному без подтверждённого рецепта. Сохранить назначение партий и количества по исходным позициям; резерв согласованной переработки должен быть закреплён, без дубля ранее поставленного резерва.",
                                        "open": true,
                                        "links": [
                                          "local_batch_stock_topup_selected"
                                        ],
                                        "edge": "Да — партии и масса согласованы",
                                        "approval_badge_visible": false,
                                        "screen_task": "Учесть партии и массу переработки; подтвердить состав и массу нового замеса",
                                        "screen_id": "batch_planning",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              5
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "local_batch_stock_topup_selected",
                                            "title": "Добавляем пополнение склада ПФ в этот замес?",
                                            "kind": "check",
                                            "notes": "Согласованное дополнительное пополнение необязательно. Нет — перейти к подбору оборудования без создания дополнительного счёта. Да — проверить порог, согласовать массу и создать связанный счёт в Bitrix и Лакомке.\nПополнение ПФ: однородная база, учитываются мин/макс. Для ПФ из реестра хранения в кубах — от 300 кг; отдельный счёт ПФ сейчас не создают. Автоматизация в Лакомке требует утверждения.",
                                            "open": true,
                                            "links": [
                                              "f_230_4740",
                                              "local_pf_replenishment_registry"
                                            ],
                                            "edge": "Подтвердить план — Состав замеса подтверждён",
                                            "approval_badge_visible": false,
                                            "review_status": "partial",
                                            "approved_scope": "Правила однородности и порога 300 кг для ПФ в кубах",
                                            "approval_sources": [
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                "comment_id": "AAACIF4yhr8",
                                                "author": "Данила",
                                                "date": "2026-10-08"
                                              },
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                "comment_id": "AAACIF6YlTw",
                                                "author": "Данила",
                                                "date": "2026-10-08"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "local_pf_replenishment_registry",
                                                "title": "ПФ на пополнение склада есть в реестре с минимальным порогом пополнения?",
                                                "kind": "check",
                                                "notes": "Проверка относится к дополнительному объёму для пополнения склада ПФ, а не к потребности заказов. Для ПФ из реестра минимальное добавляемое пополнение — 300 кг.\nПополнение ПФ: однородная база, учитываются мин/макс. Для ПФ из реестра хранения в кубах — от 300 кг; отдельный счёт ПФ сейчас не создают. Автоматизация в Лакомке требует утверждения.",
                                                "open": true,
                                                "links": [
                                                  "local_pf_replenishment_min300",
                                                  "local_pf_replenishment_any"
                                                ],
                                                "edge": "Да — добавить пополнение",
                                                "approval_badge_visible": false,
                                                "review_status": "partial",
                                                "approved_scope": "Правила однородности и порога 300 кг для ПФ в кубах",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF4yhr8",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  },
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                    "comment_id": "AAACIF6YlTw",
                                                    "author": "Данила",
                                                    "date": "2026-10-08"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "local_pf_replenishment_min300",
                                                    "title": "Экран «План замеса и оборудования»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nДобавить согласованное пополнение ПФ от 300 кг\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nУчитывать потребность склада, min/max, уже запланированное пополнение и допустимую вместимость. Добавляемый складской объём должен быть не меньше 300 кг: масса заказов в эти 300 кг не входит. Если нет потребности или допустимого места для такого пополнения, не добавлять меньший объём и продолжить без пополнения. Сохранить отдельное назначение складского объёма.\nПополнение ПФ: однородная база, учитываются мин/макс. Для ПФ из реестра хранения в кубах — от 300 кг; отдельный счёт ПФ сейчас не создают. Автоматизация в Лакомке требует утверждения.",
                                                    "open": true,
                                                    "links": [
                                                      "local_batch_replenishment_invoice"
                                                    ],
                                                    "edge": "Да — минимум 300 кг",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "Добавить согласованное пополнение ПФ от 300 кг",
                                                    "screen_id": "batch_planning",
                                                    "review_status": "partial",
                                                    "ui_review_status": "pending",
                                                    "approved_scope": "Правила однородности и порога 300 кг для ПФ в кубах; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIF4yhr8",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIF6YlTw",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                        "points": [
                                                          5
                                                        ],
                                                        "date": "2026-10-15",
                                                        "scope": "assignment role and physical place"
                                                      }
                                                    ],
                                                    "children": [
                                                      {
                                                        "id": "local_batch_replenishment_invoice",
                                                        "title": "Экран «План замеса и оборудования»",
                                                        "kind": "screen",
                                                        "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nЗафиксировать пополнение ПФ в плане замеса\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nТекущий порядок: планировщик добавляет объём пополнения ПФ без создания счёта. Сохранить базу, массу и связь с замесом. Создание отдельного счёта в Bitrix и Лакомке остаётся предложением для обсуждения, не обязательным шагом. Для пополнения ГП счёт на контрагента «Пополнение склада» нужен.",
                                                        "open": true,
                                                        "links": [
                                                          "f_230_4740"
                                                        ],
                                                        "edge": "Подтвердить план — Объём пополнения согласован",
                                                        "approval_badge_visible": false,
                                                        "screen_task": "Зафиксировать пополнение ПФ в плане замеса",
                                                        "screen_id": "batch_planning",
                                                        "review_status": "partial",
                                                        "ui_review_status": "pending",
                                                        "approved_scope": "Текущий порядок пополнения ПФ без счёта; вариант реализации в Лакомке требует утверждения; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                        "approval_sources": [
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                            "comment_id": "AAACIF6YlTw",
                                                            "author": "Данила",
                                                            "date": "2026-10-08"
                                                          },
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                            "comment_id": "AAACIF4yhr4",
                                                            "author": "Данила",
                                                            "date": "2026-10-08"
                                                          },
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                            "points": [
                                                              5
                                                            ],
                                                            "date": "2026-10-15",
                                                            "scope": "assignment role and physical place"
                                                          }
                                                        ],
                                                        "children": [
                                                          {
                                                            "id": "f_230_4740",
                                                            "title": "Экран «План замеса и оборудования»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nПодобрать допустимые пары «ёмкость + оборудование»\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nПолучить NF, тип продукции, подтверждённую массу базы, плотность и фасовку. Для литровых разделов объём = масса / плотность; для затирки использовать кг. Проверить дежи в порядке таблицы распределения, получить ДС из сопряжений. Исключить неисправные, запрещённые и технологически несовместимые пары. Сначала проверить весь объём одним замесом. Занятость учитывать при планировании времени, а не как постоянный запрет. После разделения повторить подбор для каждой части.",
                                                            "open": true,
                                                            "links": [
                                                              "planning_minmax_sources"
                                                            ],
                                                            "edge": "Подтвердить план — Пополнение ПФ включено в план",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Подобрать допустимые пары «ёмкость + оборудование»",
                                                            "screen_id": "batch_planning",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  5
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "planning_minmax_sources",
                                                                "title": "Система: получить минимумы и максимум для пары «ПФ + дежа + ДС»",
                                                                "kind": "task",
                                                                "notes": "Минимум — три источника:\n• Тип ПФ: полученные от клиента минимумы; отдельный реестр типов ПФ нужно хранить в Лакомке.\n• Выбранная ёмкость: поле min_load_kg в карточке оборудования, всегда в кг. Значения 29 ёмкостей уже внесены.\n• Индивидуальная пара NF + ДС: справочник «Ограничения загрузки».\n\nУ стационарных деж Дс6/7/8 общие минимумы 1500/1500/1600 кг указаны для случая без индивидуального значения продукции. Прочерк минимума ДС3/ДС9 не отменяет минимум типа ПФ или выбранной ёмкости. Прежние универсальные 250 кг у ДС не использовать как окончательное правило после новых вводных.\n\nПорядок совместного применения трёх источников требует подтверждения. Не считать автоматически, что индивидуальный минимум отменяет оба других, и не брать максимум всех трёх без согласованного правила.\n\nМаксимум: индивидуальный NF + ДС, иначе стандартный по типу ПФ + ДС; если готового предела нет — расчёт рабочей вместимости по действующему алгоритму. Готовые кг повторно коэффициентом плотности не уменьшать. Явный запрет исключает пару. Сохранить каждый предел и его источник.",
                                                                "open": true,
                                                                "links": [
                                                                  "planning_minimum_rule_confirmed"
                                                                ],
                                                                "edge": "Допустимые пары подобраны",
                                                                "approval_badge_visible": false,
                                                                "automatic_step": true,
                                                                "children": [
                                                                  {
                                                                    "id": "planning_minimum_rule_confirmed",
                                                                    "title": "Для пары определён итоговый минимум по подтверждённому правилу?",
                                                                    "kind": "check",
                                                                    "notes": "Да — применить согласованный итоговый минимум и проверить массу. Нет — показать значения типа ПФ, ёмкости и NF + ДС планировщику для уточнения; автоматический запуск и угадывание приоритета запрещены. Приоритет источников остаётся конкретным открытым вопросом, а не пометкой о неподтверждённости всей карты.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "f_273_5214",
                                                                      "planning_no_feasible_plan"
                                                                    ],
                                                                    "edge": "Источники ограничений получены",
                                                                    "approval_badge_visible": false,
                                                                    "children": [
                                                                      {
                                                                        "id": "f_273_5214",
                                                                        "title": "Для каждого замеса найдена пара, проходящая минимум, максимум и вместимость?",
                                                                        "kind": "check",
                                                                        "notes": "Проверить каждую часть: масса не ниже подтверждённого итогового минимума, не выше применимого максимума и вместимости выбранной дежи. Проверить запреты, кратность фасовке и сумму частей. Если правило минимума не определено, пройти ветку уточнения до этой проверки. Причину отказа сохранить.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "f_230_4744",
                                                                          "planning_below_all_minima"
                                                                        ],
                                                                        "edge": "Да — итоговый минимум определён",
                                                                        "approval_badge_visible": false,
                                                                        "review_status": "pending",
                                                                        "children": [
                                                                          {
                                                                            "id": "f_230_4744",
                                                                            "title": "Экран «План замеса и оборудования»",
                                                                            "kind": "screen",
                                                                            "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nЗапланировать начало и окончание замесов с учётом очереди и срочности\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nРассчитать начало и окончание всех замесов: очередь ДС, занятость дежи, подготовка и мойка, доступность сотрудника, дальнейшая колеровка этой же партии. Отвод дежи не освобождает ДС, зарезервированный для возврата партии. Обычная очередь — по первому появлению потребности; срочность — поле Bitrix. Учесть правила срочных слотов. Сравнить готовность всего объёма, а не первого замеса. Если в пределах пяти замесов для позиции до 10 т успеть нельзя, показать варианты планировщику.",
                                                                            "open": true,
                                                                            "links": [
                                                                              "f_230_4748"
                                                                            ],
                                                                            "edge": "Да",
                                                                            "approval_badge_visible": false,
                                                                            "screen_task": "Запланировать начало и окончание замесов с учётом очереди и срочности",
                                                                            "screen_id": "batch_planning",
                                                                            "review_status": "pending",
                                                                            "ui_review_status": "pending",
                                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                            "approval_sources": [
                                                                              {
                                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                "points": [
                                                                                  5
                                                                                ],
                                                                                "date": "2026-10-15",
                                                                                "scope": "assignment role and physical place"
                                                                              }
                                                                            ],
                                                                            "children": [
                                                                              {
                                                                                "id": "f_230_4748",
                                                                                "title": "Экран «План замеса и оборудования»",
                                                                                "kind": "screen",
                                                                                "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nСотрудник по планированию производства: подтвердить замесы и очередь\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nРабочее место — офис на производстве. Планировщик №1 задаёт замесы, очередь, сроки и резервы. Планировщик №2 — очередь, сроки и резервы. Права и наименования ролей настраиваются; ФИО не нужны.\n\nРезультат подбора:\nПоказать выбранные ДС и дежи, число замесов и массу каждого, минимум и максимум каждой пары и отдельный источник обоих пределов, время готовности и риск опоздания. После ручного изменения пересчитать все части и повторно проверить диапазон, сумму и кратность фасовке до подтверждения.",
                                                                                "open": true,
                                                                                "links": [
                                                                                  "f_273_5246"
                                                                                ],
                                                                                "edge": "Подтвердить план",
                                                                                "approval_badge_visible": false,
                                                                                "screen_task": "Сотрудник по планированию производства: подтвердить замесы и очередь",
                                                                                "screen_id": "batch_planning",
                                                                                "review_status": "partial",
                                                                                "ui_review_status": "pending",
                                                                                "approved_scope": "Роль, место и распределение обязанностей планировщиков; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                "approval_sources": [
                                                                                  {
                                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                                    "comment_id": "AAACIF6YlUE",
                                                                                    "author": "Данила",
                                                                                    "date": "2026-10-08"
                                                                                  },
                                                                                  {
                                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                                    "comment_id": "AAACIF6YlUQ",
                                                                                    "author": "Данила",
                                                                                    "date": "2026-10-08"
                                                                                  },
                                                                                  {
                                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                                    "comment_id": "AAACIF2Btsw",
                                                                                    "author": "Данила",
                                                                                    "date": "2026-10-08"
                                                                                  },
                                                                                  {
                                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                    "points": [
                                                                                      5
                                                                                    ],
                                                                                    "date": "2026-10-15",
                                                                                    "scope": "assignment role and physical place"
                                                                                  }
                                                                                ],
                                                                                "children": [
                                                                                  {
                                                                                    "id": "f_273_5246",
                                                                                    "title": "Схема «Новый замес»",
                                                                                    "kind": "route",
                                                                                    "notes": "После подтверждения плана перейти к выполнению нового замеса. Проверка и подготовка сырья выполняются в цепочке нового замеса до запуска.",
                                                                                    "open": true,
                                                                                    "links": [
                                                                                      "f_227_4068"
                                                                                    ],
                                                                                    "edge": "Подтвердить план — План подтверждён",
                                                                                    "approval_badge_visible": false,
                                                                                    "review_status": "pending",
                                                                                    "route_target_id": "f_227_4068",
                                                                                    "children": []
                                                                                  }
                                                                                ]
                                                                              }
                                                                            ]
                                                                          },
                                                                          {
                                                                            "id": "planning_below_all_minima",
                                                                            "title": "Масса ниже минимума всех допустимых пар?",
                                                                            "kind": "check",
                                                                            "notes": "После проверки всех совместимых пар. Да — разделение не помогает, требуется решение планировщика. Нет — проверить допустимое разделение. Если нужные данные отсутствуют или нет ни одной совместимой пары, не считать это подтверждённым нарушением минимума; показать конкретную причину в результате подбора.",
                                                                            "open": true,
                                                                            "links": [
                                                                              "planning_no_feasible_plan",
                                                                              "f_273_5218"
                                                                            ],
                                                                            "edge": "Нет",
                                                                            "approval_badge_visible": false,
                                                                            "children": [
                                                                              {
                                                                                "id": "planning_no_feasible_plan",
                                                                                "title": "Экран «План замеса и оборудования»",
                                                                                "kind": "screen",
                                                                                "notes": "Текущее задание:\nРазобрать причину отсутствия допустимого плана.\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДанные:\nNF, масса и фасовка; проверенные пары; минимум, максимум и источник каждого; причина отказа; сохранённая потребность и варианты решения.\n\nВход:\nМасса ниже минимумов всех пар либо допустимая схема разделения не найдена.\n\nДействия:\nПланировщик изменяет исходный план: выбирает меньшую допустимую пару, объединяет совместимую потребность или согласует пополнение. Затем повторяет подбор. Без изменений автоматический повтор не выполняется.\n\nРезультат:\nДо допустимого решения новый замес не запускается. Клиентский объём не округлять и пополнение без согласования не добавлять.\n\nЕсли не подтверждён приоритет минимумов:\nПоказать отдельно минимум типа ПФ, ёмкости и NF + ДС. Получить решение о том, какие ограничения применяются или заменяются, сохранить основание. После подтверждения повторить подбор в этой же карте; автоматический запуск по предположению не выполнять.",
                                                                                "open": true,
                                                                                "links": [
                                                                                  "f_230_4740"
                                                                                ],
                                                                                "edge": "Да — разделение не поможет",
                                                                                "approval_badge_visible": false,
                                                                                "screen_task": "Разобрать причину отсутствия допустимого плана",
                                                                                "screen_id": "batch_planning",
                                                                                "ui_review_status": "pending",
                                                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                "approval_sources": [
                                                                                  {
                                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                    "points": [
                                                                                      5
                                                                                    ],
                                                                                    "date": "2026-10-15",
                                                                                    "scope": "assignment role and physical place"
                                                                                  }
                                                                                ],
                                                                                "children": []
                                                                              },
                                                                              {
                                                                                "id": "f_273_5218",
                                                                                "title": "Экран «План замеса и оборудования»",
                                                                                "kind": "screen",
                                                                                "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nПодобрать минимальное число замесов и максимально равные части\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nСначала проверить варианты с минимальным числом замесов. Части сделать максимально равными и кратными фасовке; каждая проходит минимум, максимум и вместимость своей пары. Если равные части не проходят, проверить ближайшие допустимые размеры либо другое оборудование / число замесов. Сумма частей равна подтверждённой потребности с согласованным пополнением. Сохранить назначения по исходным позициям. Для срочного заказа выбрать минимальное число, позволяющее успеть; до 10 т на позицию — не более пяти замесов. При отсутствии допустимого варианта сохранить причину и не выполнять бесконечный повтор.",
                                                                                "open": true,
                                                                                "links": [
                                                                                  "planning_split_found"
                                                                                ],
                                                                                "edge": "Нет — проверить разделение",
                                                                                "approval_badge_visible": false,
                                                                                "screen_task": "Подобрать минимальное число замесов и максимально равные части",
                                                                                "screen_id": "batch_planning",
                                                                                "review_status": "pending",
                                                                                "ui_review_status": "pending",
                                                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                "approval_sources": [
                                                                                  {
                                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                    "points": [
                                                                                      5
                                                                                    ],
                                                                                    "date": "2026-10-15",
                                                                                    "scope": "assignment role and physical place"
                                                                                  }
                                                                                ],
                                                                                "children": [
                                                                                  {
                                                                                    "id": "planning_split_found",
                                                                                    "title": "Найдена допустимая схема разделения?",
                                                                                    "kind": "check",
                                                                                    "notes": "Для каждой части есть допустимая пара; масса проходит минимум и максимум, части кратны фасовке, их сумма равна подтверждённой потребности с согласованным пополнением. Если варианты исчерпаны, вернуть проблему планировщику; автоматический подбор не повторяет одинаковый вариант бесконечно.",
                                                                                    "open": true,
                                                                                    "links": [
                                                                                      "f_230_4740",
                                                                                      "planning_no_feasible_plan"
                                                                                    ],
                                                                                    "edge": "Варианты разделения проверены",
                                                                                    "approval_badge_visible": false,
                                                                                    "children": []
                                                                                  }
                                                                                ]
                                                                              }
                                                                            ]
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "id": "local_pf_replenishment_any",
                                                    "title": "Экран «План замеса и оборудования»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nДобавить любой согласованный объём пополнения ПФ\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nОбъём выбирается с учётом потребности склада, min/max, ранее запланированного пополнения и допустимой вместимости замеса. Порог 300 кг не применяется. При отсутствии потребности продолжить без пополнения; сохранить отдельное назначение добавленной массы.\nПополнение ПФ: однородная база, учитываются мин/макс. Для ПФ из реестра хранения в кубах — от 300 кг; отдельный счёт ПФ сейчас не создают. Автоматизация в Лакомке требует утверждения.",
                                                    "open": true,
                                                    "links": [
                                                      "local_batch_replenishment_invoice"
                                                    ],
                                                    "edge": "Нет — без порога 300 кг",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "Добавить любой согласованный объём пополнения ПФ",
                                                    "screen_id": "batch_planning",
                                                    "review_status": "partial",
                                                    "ui_review_status": "pending",
                                                    "approved_scope": "Правила однородности и порога 300 кг для ПФ в кубах; Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIF4yhr8",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                        "comment_id": "AAACIF6YlTw",
                                                        "author": "Данила",
                                                        "date": "2026-10-08"
                                                      },
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                        "points": [
                                                          5
                                                        ],
                                                        "date": "2026-10-15",
                                                        "scope": "assignment role and physical place"
                                                      }
                                                    ],
                                                    "children": []
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "id": "local_batch_without_rework",
                                        "title": "Экран «План замеса и оборудования»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nПланировать замес без переработки\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nИспользовать подтверждённую потребность в новой базе. Материал переработки в состав и доступное обеспечение не включать. Если исходный расчёт был выполнен с переработкой, а решение изменилось, вернуть массу на подтверждение технологу до утверждения плана.",
                                        "open": true,
                                        "links": [
                                          "local_batch_stock_topup_selected"
                                        ],
                                        "edge": "Нет — переработку не используем",
                                        "approval_badge_visible": false,
                                        "screen_task": "Планировать замес без переработки",
                                        "screen_id": "batch_planning",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              5
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": "f_273_5198",
                            "title": "Экран «План замеса и оборудования»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: Потребности позиций, ПФ, пополнение, переработка, совместимые замесы, ёмкости, оборудование и очередь.\n• Фильтры / сортировка: База, статус замеса, оборудование, срок и срочность.\n\nТекущее задание:\nСоздать план нового замеса по совместимым потребностям\nРоль: Сотрудник по планированию производства.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить план» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.",
                            "open": true,
                            "links": [
                              "f_230_4736"
                            ],
                            "edge": "Нет",
                            "approval_badge_visible": false,
                            "screen_task": "Создать план нового замеса по совместимым потребностям",
                            "screen_id": "batch_planning",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  5
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "local_batch_uncolored_pf_mass",
                "title": "1С: определить массу ПФ по спецификации неколерованной продукции",
                "kind": "onec",
                "notes": "Расчёт на требуемый объём исходной позиции. Сохранить нужную базу ПФ и количество; при ошибке или отсутствии спецификации требуется уточнение, а не расчёт по предположению.",
                "open": true,
                "links": [
                  "f_230_4728"
                ],
                "edge": "Неколерованная",
                "approval_badge_visible": false,
                "review_status": "pending",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "f_241_5098",
        "title": "Колеровка на КМ",
        "kind": "route",
        "open": true,
        "links": [
          "f_230_4798"
        ],
        "edge": "",
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_230_4798",
            "title": "Вход: выбраны КМ и источник базы; зафиксированы резерв, партии и количество по позициям",
            "kind": "result",
            "notes": "Источники: готовые вёдра ГП, складской ПФ или принятая ОТК база нового замеса. Сохранить отдельно физическое место и склад учёта 1С. Если подготовка выполнена в обеспечении ПФ, использовать её факты: задания и документы ниже повторно не создавать.",
            "open": true,
            "links": [
              "f_230_4814"
            ],
            "edge": "",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_230_4814",
                "title": "Экран «Задания технолога»",
                "kind": "screen",
                "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nПодтвердить рецепт цвета для КМ\nРоль: Технолог по колеровке.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nСразу после выбора базы, источника и объёма — задание технологу: рассчитать / подтвердить рецепт цвета для нужной фасовки. Показать комментарии предыдущих колеровок по этой связке.\nОбразец 1 кг: использовать подтверждённый рецепт и место колеровки из предварительного выбора. Повторное самостоятельное задание на расчёт не создавать; корректировка нужна только при изменении источника, объёма или состава.",
                "open": true,
                "links": [
                  "local_km_pigment_supply_check"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "screen_task": "Подтвердить рецепт цвета для КМ",
                "screen_id": "technology_tasks",
                "review_status": "pending",
                "ui_review_status": "pending",
                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                    "points": [
                      15,
                      16
                    ],
                    "date": "2026-10-15",
                    "scope": "assignment role and physical place"
                  }
                ],
                "children": [
                  {
                    "id": "local_km_pigment_supply_check",
                    "title": "Пигменты и добавки по рецепту обеспечены на производстве?",
                    "kind": "check",
                    "notes": "Проверить доступное количество с учётом резервов и фактическое наличие у места колеровки. Требуемое количество берётся из подтверждённого рецепта. Если запас в 1С и физическое наличие различаются, выполнить только недостающую доставку или учётный шаг. Пока обеспечение не подтверждено, колеровку не начинать.",
                    "open": true,
                    "links": [
                      "local_km_pigment_reserve",
                      "local_km_pigment_move"
                    ],
                    "edge": "Подтвердить рецепт / решение — Рецепт подтверждён",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "local_km_pigment_reserve",
                        "title": "Система: зарезервировать пигменты и добавки по рецепту",
                        "kind": "task",
                        "notes": "Сохранить номенклатуру, количество и назначение по заданию. Уже обеспеченную часть можно резервировать при выявлении дефицита; после пополнения закрепить остаток без повторного резерва. Окончательный расход фиксируется исполнителем, включая доведение.",
                        "open": true,
                        "links": [
                          "f_230_4802"
                        ],
                        "edge": "Да",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "automatic_step": true,
                        "children": [
                          {
                            "id": "f_230_4802",
                            "title": "Какой источник обеспечения базы выбран?",
                            "kind": "check",
                            "notes": "Использовать источник выбранной позиции: ГП, ПФ либо новый замес. Повторный поиск остатков не выполнять. Для новой базы переход разрешён после приёмки ОТК; штукатурку на КМ не направлять.",
                            "open": true,
                            "links": [
                              "local_km_gp_transfer_onec",
                              "local_km_base_to_production_onec",
                              "local_km_new_batch_fill"
                            ],
                            "edge": "Пигменты и добавки обеспечены",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "local_km_gp_transfer_onec",
                                "title": "1С: переместить готовые вёдра со склада ГП на склад Производство",
                                "kind": "onec",
                                "notes": "Использовать фактический склад ГП и зарезервированные партии. Если документ уже выполнен, сохранить ссылку и не создавать дубль.",
                                "open": true,
                                "links": [
                                  "local_km_gp_move"
                                ],
                                "edge": "ГП",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "local_km_gp_move",
                                    "title": "Экран «Задания склада»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nСотрудник склада ГП: передать готовые вёдра на КМ\nРоль: Сотрудник склада.\nМесто: Склад ГП → назначенный участок производства / КМ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПередать зарезервированные вёдра в нужном количестве; повторная фасовка не требуется.",
                                    "open": true,
                                    "links": [
                                      "f_230_4810"
                                    ],
                                    "edge": "Перемещение учтено",
                                    "approval_badge_visible": false,
                                    "screen_task": "Сотрудник склада ГП: передать готовые вёдра на КМ",
                                    "screen_id": "warehouse_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          23,
                                          41
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": []
                                  }
                                ]
                              },
                              {
                                "id": "local_km_base_to_production_onec",
                                "title": "ПФ подготовлен и передан",
                                "kind": "result",
                                "notes": "Результат маршрута обеспечения из ПФ: необходимый объём подготовлен, физически передан к месту колеровки и перемещение ПФ → Производство в 1С подтверждено. Использовать сохранённые массу, партии и документы; повторных заданий на набор, передачу и перемещение не создавать. Если обеспечение не завершено, продолжение к колеровке недоступно.",
                                "open": true,
                                "links": [
                                  "f_230_4810"
                                ],
                                "edge": "ПФ",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "f_230_4810",
                                    "title": "Экран «Колеровка»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nКолеровщик КМ: принять вёдра; подтвердить количество и партии\nРоль: Колеровщик КМ.\nМесто: КМ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nОбщий шаг для ГП, ПФ и нового замеса. Использовать ранее подтверждённую приёмку, если она уже выполнена. Дальше колеровать каждое ведро отдельно.",
                                    "open": true,
                                    "links": [
                                      "f_230_4818"
                                    ],
                                    "edge": "Подготовка ПФ завершена",
                                    "approval_badge_visible": false,
                                    "screen_task": "Колеровщик КМ: принять вёдра; подтвердить количество и партии",
                                    "screen_id": "coloring_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          19,
                                          20,
                                          21,
                                          22,
                                          26
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "f_230_4818",
                                        "title": "Экран «Колеровка»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nЗаколеровать каждое ведро на КМ; подтвердить фактический расход\nРоль: Колеровщик КМ.\nМесто: КМ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПроверка цвета:\nПосле «Выполнено» открывается этап проверки цвета в том же задании. Сохранить исполнителя, время начала / конца, дельту и весь дополнительный расход пигментов. Задание не завершать до принятия цвета; при повторении прежнего цвета ждать лабораторного сравнения и решения лаборатории после внешнего согласования в Битриксе.",
                                        "open": true,
                                        "links": [
                                          "f_230_4822"
                                        ],
                                        "edge": "Выполнено — Приёмка подтверждена",
                                        "approval_badge_visible": false,
                                        "screen_task": "Заколеровать каждое ведро на КМ; подтвердить фактический расход",
                                        "screen_id": "coloring_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              19,
                                              20,
                                              21,
                                              22,
                                              26
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "f_230_4822",
                                            "title": "Поле «Исходный счёт» заполнено?",
                                            "kind": "check",
                                            "notes": "Проверить поле «Исходный счёт» в исходной позиции / задании колеровки.\n• Заполнено — повторяем цвет прежнего заказа: лабораторное сравнение старого и нового выкрасов, затем решение лаборатории после переписки с менеджером в Битриксе.\n• Пустое — колеровщик самостоятельно принимает цвет в текущем задании.\nСсылка на исходный счёт сохраняется в лабораторном задании и лабораторном задании. Если прежний образец / выкрас недоступен, фиксировать проблему; не переключать автоматически на самостоятельное принятие.",
                                            "open": true,
                                            "links": [
                                              "quality_km_self",
                                              "quality_km_lab"
                                            ],
                                            "edge": "Колеровка выполнена — перейти к проверке цвета",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "children": [
                                              {
                                                "id": "quality_km_self",
                                                "title": "Экран «Колеровка»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• База, цвет, партия, исходный рецепт, выкрас / образец.\n• Фактические и дополнительные пигменты, исполнитель, начало / конец колеровки, дельта.\n• Решение по цвету и история доведений.\n\nТекущее задание:\nПроверить цвет и принять решение в текущем задании колеровки\nРоль: Колеровщик КМ.\nМесто: КМ.\n\nДействия:\n• «Цвет принят» — подтвердить соответствие.\n• «На доведение» — сохранить причину и продолжить доведение.\n• «Проблема» — сохранить причину в том же задании.\n\nРезультат:\nКолеровщик сам решает, выпускать цвет или нет. Отдельное лабораторное задание не создаётся. При сложности консультируется с автором рецепта / главным технологом; исходное задание сохраняется.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.",
                                                "open": true,
                                                "links": [
                                                  "f_230_4826",
                                                  "f_230_4878",
                                                  "local_quality_unfixable_defect_route"
                                                ],
                                                "edge": "Пустое — самостоятельное принятие",
                                                "approval_badge_visible": true,
                                                "screen_task": "Проверить цвет и принять решение в текущем задании колеровки",
                                                "screen_id": "coloring_tasks",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      19,
                                                      20,
                                                      21,
                                                      22,
                                                      26
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role and physical place"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "f_230_4826",
                                                    "title": "Система: автоматически подготовить макет и документ печати",
                                                    "kind": "task",
                                                    "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки. Для колерованной продукции: число стикеров = число единиц тары + 1 на арбитражный образец. Этикетки — по товарной таре; после КМ повторная фасовка не нужна.",
                                                    "open": true,
                                                    "links": [
                                                      "mark_ready_f_230_4826"
                                                    ],
                                                    "edge": "Цвет принят",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "automatic_step": true,
                                                    "children": [
                                                      {
                                                        "id": "mark_ready_f_230_4826",
                                                        "title": "Экран «Маркировка»",
                                                        "kind": "screen",
                                                        "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nПромаркировать вёдра после КМ и арбитражный образец.\nРоль: Колеровщик КМ.\nМесто: КМ.\nДля колерованной продукции: число стикеров = число единиц тары + 1 на арбитражный образец. Этикетки — по товарной таре; после КМ повторная фасовка не нужна.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                                        "open": true,
                                                        "links": [
                                                          "f_230_4830"
                                                        ],
                                                        "edge": "Макет и документ печати сформированы",
                                                        "approval_badge_visible": false,
                                                        "screen_task": "Промаркировать вёдра после КМ и арбитражный образец.",
                                                        "screen_id": "marking",
                                                        "review_status": "pending",
                                                        "ui_review_status": "pending",
                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                        "approval_sources": [
                                                          {
                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                            "points": [
                                                              19,
                                                              20,
                                                              21,
                                                              22,
                                                              26
                                                            ],
                                                            "date": "2026-10-15",
                                                            "scope": "assignment role and physical place"
                                                          }
                                                        ],
                                                        "children": [
                                                          {
                                                            "id": "f_230_4830",
                                                            "title": "1С: провести производство колерованной ГП из неколерованной ГП или ПФ, пигментов и добавок",
                                                            "kind": "onec",
                                                            "notes": "После приёмки цвета и завершения фактического расхода провести документ производства. Продукция: заказанная колерованная ГП нужной фасовки. Материалы: исходная неколерованная ГП из вёдер либо ПФ изготовленной базы, фактические пигменты и добавки; новая тара — только если действительно использована. Исходное сырьё уже выпущенного ПФ повторно не списывать. Сохранить исходные партии и партию выпуска. Далее МХ-18 для передачи выпуска на ГП; отдельный документ перемещения этого же выпуска не создавать.",
                                                            "open": true,
                                                            "links": [
                                                              "f_262_6523"
                                                            ],
                                                            "edge": "",
                                                            "approval_badge_visible": false,
                                                            "review_status": "pending",
                                                            "children": [
                                                              {
                                                                "id": "f_262_6523",
                                                                "title": "1С: оформить МХ-18 — передачу выпущенной продукции с производства на склад ГП",
                                                                "kind": "onec",
                                                                "notes": "Документ передачи оформляется в контексте проведённого производства. Сохранить связь с выпуском, партии и фактическое количество. вторую учётную операцию перемещения не создавать.\nпри передаче произведённой ГП на склад МХ-18 оформляют всегда.",
                                                                "open": true,
                                                                "links": [
                                                                  "f_262_6522"
                                                                ],
                                                                "edge": "Производство проведено",
                                                                "approval_badge_visible": false,
                                                                "review_status": "approved",
                                                                "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                    "comment_id": "AAACGqcevZg",
                                                                    "author": "Данила",
                                                                    "date": "2026-10-08"
                                                                  }
                                                                ],
                                                                "children": [
                                                                  {
                                                                    "id": "f_262_6522",
                                                                    "title": "Экран «Задания склада»",
                                                                    "kind": "screen",
                                                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику на перемещение на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nВыполнить физическое перемещение продукции на склад ГП; подтвердить количество и партии. Оформление документов 1С — отдельный шаг системы.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "f_262_6521"
                                                                    ],
                                                                    "edge": "МХ-18 оформлена",
                                                                    "approval_badge_visible": false,
                                                                    "screen_task": "Задание кладовщику на перемещение на склад ГП",
                                                                    "screen_id": "warehouse_tasks",
                                                                    "review_status": "pending",
                                                                    "ui_review_status": "pending",
                                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                    "approval_sources": [
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                        "points": [
                                                                          42
                                                                        ],
                                                                        "date": "2026-10-15",
                                                                        "scope": "assignment role and physical place"
                                                                      }
                                                                    ],
                                                                    "children": [
                                                                      {
                                                                        "id": "f_262_6521",
                                                                        "title": "Экран «Задания склада»",
                                                                        "kind": "screen",
                                                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику: подготовить позиции к отгрузке\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПодготовить уже маркированные позиции к отгрузке. Повторную наклейку этикеток и стикеров не выполнять.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "f_262_6524"
                                                                        ],
                                                                        "edge": "Выполнено — Продукция принята на ГП",
                                                                        "approval_badge_visible": false,
                                                                        "screen_task": "Задание кладовщику: подготовить позиции к отгрузке",
                                                                        "screen_id": "warehouse_tasks",
                                                                        "review_status": "pending",
                                                                        "ui_review_status": "pending",
                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                        "approval_sources": [
                                                                          {
                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                            "points": [
                                                                              1,
                                                                              44
                                                                            ],
                                                                            "date": "2026-10-15",
                                                                            "scope": "assignment role and physical place"
                                                                          }
                                                                        ],
                                                                        "children": [
                                                                          {
                                                                            "id": "f_262_6524",
                                                                            "title": "Готов к отгрузке",
                                                                            "kind": "result",
                                                                            "open": true,
                                                                            "links": [],
                                                                            "edge": "Выполнено",
                                                                            "approval_badge_visible": false,
                                                                            "review_status": "pending",
                                                                            "children": []
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "id": "f_230_4878",
                                                    "title": "Экран «Колеровка»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Причина отклонения, дополнительные пигменты / добавки, количество, история фактического расхода.\n\nТекущее задание:\nУказать пигменты и добавки для доведения цвета в том же задании\nРоль: Колеровщик КМ.\nМесто: КМ.\n\nДействия:\n• «Подтвердить доведение» — перейти к обеспечению добавок.\n• «Проблема» — указать причину.\n\nРезультат:\nДоведение выполняет колеровщик. При необходимости — консультация с автором рецепта / технологом. После доведения повторяется проверка цвета; новый экземпляр задания не создаётся.",
                                                    "open": true,
                                                    "links": [
                                                      "local_km_correction_supply"
                                                    ],
                                                    "edge": "На доведение",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "Указать пигменты и добавки для доведения цвета в том же задании",
                                                    "screen_id": "coloring_tasks",
                                                    "review_status": "pending",
                                                    "ui_review_status": "pending",
                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                        "points": [
                                                          19,
                                                          20,
                                                          21,
                                                          22,
                                                          26
                                                        ],
                                                        "date": "2026-10-15",
                                                        "scope": "assignment role and physical place"
                                                      }
                                                    ],
                                                    "children": [
                                                      {
                                                        "id": "local_km_correction_supply",
                                                        "title": "Пигменты и добавки для доведения есть на производстве?",
                                                        "kind": "check",
                                                        "notes": "Проверить назначенные количества с учётом резервов и склада учёта 1С. Если материал отсутствует и на складе сырья, ждать снабжения; доведение не подтверждать до получения.",
                                                        "open": true,
                                                        "links": [
                                                          "local_km_correction_apply",
                                                          "local_km_correction_move"
                                                        ],
                                                        "edge": "Выполнено — Доведение назначено",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": [
                                                          {
                                                            "id": "local_km_correction_apply",
                                                            "title": "Экран «Колеровка»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nКолеровщик КМ: довести цвет; записать расход и повторить проверку\nРоль: Колеровщик КМ.\nМесто: КМ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nВнести только назначенные дополнительные количества. Сохранить партии, фактический расход и комментарии по исходному заданию. Затем повторный ОТК; не повторять всю первоначальную колеровку.",
                                                            "open": true,
                                                            "links": [
                                                              "f_230_4822"
                                                            ],
                                                            "edge": "Да",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Колеровщик КМ: довести цвет; записать расход и повторить проверку",
                                                            "screen_id": "coloring_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  19,
                                                                  20,
                                                                  21,
                                                                  22,
                                                                  26
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": []
                                                          },
                                                          {
                                                            "id": "local_km_correction_move",
                                                            "title": "Экран «Задания склада»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: доставить недостающие пигменты и добавки для доведения\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nСо склада сырья на производство. Передать только дефицит, подтвердить фактические материалы и количества.",
                                                            "open": true,
                                                            "links": [
                                                              "local_km_correction_onec"
                                                            ],
                                                            "edge": "Нет — доставить дефицит",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Кладовщик: доставить недостающие пигменты и добавки для доведения",
                                                            "screen_id": "warehouse_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "children": [
                                                              {
                                                                "id": "local_km_correction_onec",
                                                                "title": "1С: переместить недостающие материалы для доведения на Производство",
                                                                "kind": "onec",
                                                                "notes": "Со склада сырья на склад Производство. Если материалы уже учтены на Производстве, отдельное учётное перемещение не создавать. Фактический расход добавок включить в итоговое производство.",
                                                                "open": true,
                                                                "links": [
                                                                  "local_km_correction_apply"
                                                                ],
                                                                "edge": "Выполнено — Материалы доставлены",
                                                                "approval_badge_visible": false,
                                                                "review_status": "pending",
                                                                "children": []
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              },
                                              {
                                                "id": "quality_km_lab",
                                                "title": "Экран «ОТК»",
                                                "kind": "screen",
                                                "notes": "Роль: Сотрудник ОТК.\nМесто: Лаборатория ОТК.\n\nДанные:\n• Текущий счёт / позиция, партия, поле «Исходный счёт» и прежний образец.\n• Старый и новый выкрасы рядом, результат сравнения и итоговое решение.\n\nВход:\nПоле «Исходный счёт» заполнено; после колеровки пробу передают в лабораторию. Задание остаётся в очереди ОТК до решения.\n\nЗадание:\nСделать выкрасы и обсудить результат с ответственным менеджером / производством. Переписку проводят самостоятельно в Битриксе; отдельного экрана менеджера и автоматической отправки сообщений нет.\n\nДействия:\n• «Взять в работу» — начать лабораторную проверку.\n• «Продолжить маршрут» — зафиксировать положительное решение после согласования и разрешить следующий этап.\n• «Отправить на доведение» — указать согласованные замечания и вернуть текущую колеровку на доведение.\n• «Проблема» — указать причину и оставить задание на ожидании.\n\nРезультат:\nРешение фиксирует лаборатория в том же задании ОТК. До решения маршрут не продолжается. После доведения повторная проба возвращается на проверку; сохраняются история, счёт, партия и исходное задание.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.\n\nВопрос: согласовать формат поля итогового решения лаборатории.",
                                                "open": true,
                                                "links": [
                                                  "f_230_4826",
                                                  "f_230_4878",
                                                  "local_quality_unfixable_defect_route"
                                                ],
                                                "edge": "Заполнено — повторение цвета",
                                                "approval_badge_visible": true,
                                                "screen_task": "Сравнить выкрасы; после согласования продолжить маршрут или вернуть на доведение",
                                                "screen_id": "quality_tasks",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      11
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role and physical place"
                                                  }
                                                ],
                                                "children": []
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": "local_km_new_batch_fill",
                                "title": "Экран «Фасовка»",
                                "kind": "screen",
                                "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: место фасовки, тип продукции, статус, срок, приоритет.\n\nТекущее задание:\nФасовщик на производстве: разлить принятую базу замеса в вёдра для КМ\nРоль: Фасовщик производства.\nМесто: Производство, зона фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nСвежую базу после ОТК фасует фасовщик производства в зоне фасовки. Сохранить партию и фактическую массу вёдер. База учтена на складе Производство; затем физически передать вёдра на КМ.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                "open": true,
                                "links": [
                                  "local_km_new_batch_move",
                                  "equipment_wash_decision"
                                ],
                                "edge": "Новый замес; база принята ОТК",
                                "approval_badge_visible": false,
                                "screen_task": "Фасовщик на производстве: разлить принятую базу замеса в вёдра для КМ",
                                "screen_id": "packing_tasks",
                                "review_status": "pending",
                                "ui_review_status": "pending",
                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                "approval_sources": [
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                    "points": [
                                      14,
                                      25
                                    ],
                                    "date": "2026-10-15",
                                    "scope": "assignment role and physical place"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                    "date": "2026-10-15",
                                    "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                  }
                                ],
                                "children": [
                                  {
                                    "id": "local_km_new_batch_move",
                                    "title": "Экран «Колеровка»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nСотрудник производства: передать вёдра новой базы на КМ\nРоль: Колеровщик / оператор КМ — по назначенному месту выполнения.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФизическая передача внутри производства. Отдельный документ перемещения между складами 1С не нужен, если база уже учтена на Производстве. Если склад выпуска другой, учётный маршрут нужно уточнить до колеровки.",
                                    "open": true,
                                    "links": [
                                      "f_230_4810"
                                    ],
                                    "edge": "Выполнено — Вёдра наполнены",
                                    "approval_badge_visible": false,
                                    "screen_task": "Сотрудник производства: передать вёдра новой базы на КМ",
                                    "screen_id": "coloring_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "local_km_pigment_move",
                        "title": "Экран «Задания склада»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: доставить недостающие пигменты и добавки со склада сырья на производство\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПередать только недостающее количество; исполнитель подтверждает получение. Если на складе сырья тоже нет материалов — показать дефицит ответственному за снабжение и ждать поступления. Не считать задание выполненным до фактической передачи.",
                        "open": true,
                        "links": [
                          "local_km_pigment_transfer_onec"
                        ],
                        "edge": "Нет — требуется пополнение",
                        "approval_badge_visible": false,
                        "screen_task": "Кладовщик: доставить недостающие пигменты и добавки со склада сырья на производство",
                        "screen_id": "warehouse_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "children": [
                          {
                            "id": "local_km_pigment_transfer_onec",
                            "title": "1С: переместить недостающие пигменты и добавки со склада сырья на склад Производство",
                            "kind": "onec",
                            "notes": "Оформить на фактически переданные материалы. Если они уже числятся на Производстве, повторный документ не создавать. Ошибка 1С не считается завершённым обеспечением: сохранить причину и повторить учётный шаг без повторной физической доставки.",
                            "open": true,
                            "links": [
                              "local_km_pigment_reserve"
                            ],
                            "edge": "Выполнено — Материалы доставлены",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_241_5114",
        "title": "Колеровка на производстве",
        "kind": "route",
        "open": true,
        "links": [
          "f_230_4904"
        ],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_230_4904",
            "title": "Вход: выбраны производство и источник базы; зафиксированы масса, цвет, партии и позиции",
            "kind": "result",
            "notes": "Источник базы: ГП, ПФ или принятый ОТК новый замес. Согласованная переработка и фактические добавки сохраняются в рецепте, а не как отдельные проверки под картой. Использовать выполненную подготовку из обеспечения ПФ без повторных заданий и документов.",
            "open": true,
            "links": [
              "f_230_4916"
            ],
            "edge": "",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "f_230_4916",
                "title": "Экран «Задания технолога»",
                "kind": "screen",
                "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nПодтвердить рецепт цвета до передачи базы на производство\nРоль: Технолог по колеровке.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nПри выборе маршрута и объёма — задание технологу: рассчитать / подтвердить рецепт с учётом базы и выбранной переработки. Показать прежние комментарии по базе и цвету. Расчёт можно выполнять параллельно новому замесу, до передачи базы на колеровку.\nОбразец 1 кг: использовать подтверждённый рецепт и место колеровки из предварительного выбора. Повторное самостоятельное задание на расчёт не создавать; корректировка нужна только при изменении источника, объёма или состава.",
                "open": true,
                "links": [
                  "local_prod_pigment_supply_check"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "screen_task": "Подтвердить рецепт цвета до передачи базы на производство",
                "screen_id": "technology_tasks",
                "review_status": "pending",
                "ui_review_status": "pending",
                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                    "points": [
                      15,
                      16
                    ],
                    "date": "2026-10-15",
                    "scope": "assignment role and physical place"
                  }
                ],
                "children": [
                  {
                    "id": "local_prod_pigment_supply_check",
                    "title": "Пигменты и добавки по рецепту обеспечены на производстве?",
                    "kind": "check",
                    "notes": "Проверить доступное количество с учётом резервов и фактическое наличие у места колеровки. Требуемое количество берётся из подтверждённого рецепта. Если запас в 1С и физическое наличие различаются, выполнить только недостающую доставку или учётный шаг. Пока обеспечение не подтверждено, колеровку не начинать.",
                    "open": true,
                    "links": [
                      "local_prod_pigment_reserve",
                      "local_prod_pigment_move"
                    ],
                    "edge": "Подтвердить рецепт / решение — Рецепт подтверждён",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "local_prod_pigment_reserve",
                        "title": "Система: зарезервировать пигменты и добавки по рецепту",
                        "kind": "task",
                        "notes": "Сохранить номенклатуру, количество и назначение по заданию. Уже обеспеченную часть можно резервировать при выявлении дефицита; после пополнения закрепить остаток без повторного резерва. Окончательный расход фиксируется исполнителем, включая доведение.",
                        "open": true,
                        "links": [
                          "local_prod_preparation_done"
                        ],
                        "edge": "Да",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "automatic_step": true,
                        "children": [
                          {
                            "id": "local_prod_preparation_done",
                            "title": "Какой источник обеспечения базы выбран?",
                            "kind": "check",
                            "notes": "Источник уже определён при расчёте маршрута. По каждому шагу использовать подтверждённые факты подготовки; повторно выполненные передачи и документы не создавать.\nДля затирки без шприцов источник компонента А — только ПФ или новый замес; готовые комплекты ГП не вскрывать и не использовать как базу колеровки. Ветка ГП здесь относится к остальным типам продукции.",
                            "open": true,
                            "links": [
                              "local_prod_gp_transfer_onec",
                              "f_230_4912",
                              "local_prod_new_batch_prepare"
                            ],
                            "edge": "Пигменты и добавки обеспечены",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": [
                              {
                                "id": "local_prod_gp_transfer_onec",
                                "title": "1С: переместить неколерованную ГП со склада ГП на склад Производство",
                                "kind": "onec",
                                "notes": "На фактические партии и количество. Использовать исходную ГП как материал последующего производства колерованной продукции, без повторного списания сырья этой ГП.",
                                "open": true,
                                "links": [
                                  "local_prod_gp_move"
                                ],
                                "edge": "ГП — кроме затирки",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "local_prod_gp_move",
                                    "title": "Экран «Задания склада»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nСотрудник склада ГП: передать вёдра на производство\nРоль: Сотрудник склада.\nМесто: Склад ГП → назначенный участок производства / КМ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                                    "open": true,
                                    "links": [
                                      "local_prod_gp_pour"
                                    ],
                                    "edge": "Перемещение учтено",
                                    "approval_badge_visible": false,
                                    "screen_task": "Сотрудник склада ГП: передать вёдра на производство",
                                    "screen_id": "warehouse_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          23,
                                          41
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "local_prod_gp_pour",
                                        "title": "Экран «Колеровка»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nИсполнитель на производстве: слить базу из вёдер в технологическую ёмкость\nРоль: Фасовщик производства или колеровщик производства — по назначению старшего смены.\nМесто: Производство, технологическая ёмкость.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПодтвердить фактическую массу и исходные партии; вёдра после перелива не считать новой тарой готового выпуска.",
                                        "open": true,
                                        "links": [
                                          "f_230_4908"
                                        ],
                                        "edge": "Выполнено — Вёдра переданы",
                                        "approval_badge_visible": false,
                                        "screen_task": "Исполнитель на производстве: слить базу из вёдер в технологическую ёмкость",
                                        "screen_id": "coloring_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              23
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": []
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": "f_230_4912",
                                "title": "ПФ подготовлен и передан",
                                "kind": "result",
                                "notes": "Результат маршрута обеспечения из ПФ: необходимый объём подготовлен, физически передан к месту колеровки и перемещение ПФ → Производство в 1С подтверждено. Использовать сохранённые массу, партии и документы; повторных заданий на набор, передачу и перемещение не создавать. Если обеспечение не завершено, продолжение к колеровке недоступно.",
                                "open": true,
                                "links": [
                                  "local_prod_coloring_rework_check"
                                ],
                                "edge": "ПФ",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "local_prod_coloring_rework_check",
                                    "title": "Для этой колеровки технолог согласовал переработку?",
                                    "kind": "check",
                                    "notes": "Проверка относится только к ветке готового ПФ: после результата «ПФ подготовлен и передан» использовать согласованное технологом назначение переработки. Для ГП и нового замеса этой проверки здесь нет. Решение сохраняется из предварительного маршрута; заново подбор переработки не запускать. Переработку, уже вошедшую в новый замес базы, повторно не добавлять.\nРешение по переработке: уведомление всем ответственным; приоритет главный технолог → технолог → планировщик. Общие 30 минут; более высокая роль может изменить решение в этом же окне.",
                                    "open": true,
                                    "links": [
                                      "local_prod_coloring_rework_move",
                                      "f_230_4908"
                                    ],
                                    "edge": "Подготовка ПФ завершена",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                        "comment_id": "AAACArc6Lfc",
                                        "author": "Данила"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "local_prod_coloring_rework_move",
                                        "title": "Экран «Задания склада»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nСотрудник склада переработки: передать согласованные партии и массу на производство\nРоль: Сотрудник склада ПФ; при занятости — оператор погрузчика производства по команде технолога или старшего смены.\nМесто: Склад ПФ / переработки → производство.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nЗакрепить резерв под задание, если он ещё не создан. Передать только утверждённый объём, сохранить исходные партии и подтвердить фактическое получение. Если доставка уже выполнена, использовать её факт без повторного задания. При недостаче сообщить планировщику/технологу и не начинать колеровку по неподтверждённому составу.",
                                        "open": true,
                                        "links": [
                                          "local_prod_coloring_rework_transfer"
                                        ],
                                        "edge": "Да",
                                        "approval_badge_visible": false,
                                        "screen_task": "Сотрудник склада переработки: передать согласованные партии и массу на производство",
                                        "screen_id": "warehouse_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              40,
                                              41
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "local_prod_coloring_rework_transfer",
                                            "title": "1С: переместить переработку со склада переработки на склад Производство",
                                            "kind": "onec",
                                            "notes": "Оформить на фактически переданную номенклатуру, партии и массу. Использовать документ уже выполненного перемещения без дубля. Предполагается, что материал уже поставлен на учёт переработки; порядок такой постановки относится к отдельной схеме. Здесь подготовительное перемещение материалов, не передача готового выпуска.",
                                            "open": true,
                                            "links": [
                                              "f_230_4908"
                                            ],
                                            "edge": "Выполнено — Переработка передана",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "children": [
                                              {
                                                "id": "f_230_4908",
                                                "title": "Экран «Колеровка»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nИсполнитель колеровки: принять подготовленную базу и материалы; подтвердить массы и партии\nРоль: Колеровщик производства; для затирки — сотрудник склада ПФ, при отсутствии — колеровщик производства.\nМесто: Производство, назначенная ёмкость.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nОбщая приёмка после подготовки ГП, ПФ или новой базы. В ветке ПФ при согласованной переработке также принять её партии и массу. Для ГП и нового замеса проход к этой приёмке прямой. Колеровку выполнять по подтверждённому рецепту.",
                                                "open": true,
                                                "links": [
                                                  "f_230_4920"
                                                ],
                                                "edge": "Материалы готовы",
                                                "approval_badge_visible": false,
                                                "screen_task": "Исполнитель колеровки: принять подготовленную базу и материалы; подтвердить массы и партии",
                                                "screen_id": "coloring_tasks",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      24
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role and physical place"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "f_230_4920",
                                                    "title": "Экран «Колеровка»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nЗаколеровать базу в назначенной ёмкости; подтвердить расход\nРоль: Колеровщик производства; для затирки — сотрудник склада ПФ, при отсутствии — колеровщик производства.\nМесто: Производство, назначенная ёмкость.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nЕсли технолог назначил переработку на колеровку, добавить её по рецепту и записать фактическую массу каждой исходной партии. Материал, уже вошедший в состав базы при замесе, повторно не учитывать.\n\nПроверка цвета:\nПосле «Выполнено» открывается этап проверки цвета в том же задании. Сохранить исполнителя, время начала / конца, дельту и весь дополнительный расход пигментов. Задание не завершать до принятия цвета; при повторении прежнего цвета ждать лабораторного сравнения и решения лаборатории после внешнего согласования в Битриксе.",
                                                    "open": true,
                                                    "links": [
                                                      "f_230_4924"
                                                    ],
                                                    "edge": "Выполнено — Приёмка подтверждена",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "Заколеровать базу в назначенной ёмкости; подтвердить расход",
                                                    "screen_id": "coloring_tasks",
                                                    "review_status": "pending",
                                                    "ui_review_status": "pending",
                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                    "approval_sources": [
                                                      {
                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                        "points": [
                                                          24
                                                        ],
                                                        "date": "2026-10-15",
                                                        "scope": "assignment role and physical place"
                                                      }
                                                    ],
                                                    "children": [
                                                      {
                                                        "id": "f_230_4924",
                                                        "title": "Поле «Исходный счёт» заполнено?",
                                                        "kind": "check",
                                                        "notes": "Проверить поле «Исходный счёт» в исходной позиции / задании колеровки.\n• Заполнено — повторяем цвет прежнего заказа: лабораторное сравнение старого и нового выкрасов, затем решение лаборатории после переписки с менеджером в Битриксе.\n• Пустое — колеровщик самостоятельно принимает цвет в текущем задании.\nСсылка на исходный счёт сохраняется в лабораторном задании и лабораторном задании. Если прежний образец / выкрас недоступен, фиксировать проблему; не переключать автоматически на самостоятельное принятие.",
                                                        "open": true,
                                                        "links": [
                                                          "quality_prod_self",
                                                          "quality_prod_lab"
                                                        ],
                                                        "edge": "Колеровка выполнена — перейти к проверке цвета",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": [
                                                          {
                                                            "id": "quality_prod_self",
                                                            "title": "Экран «Колеровка»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• База, цвет, партия, исходный рецепт, выкрас / образец.\n• Фактические и дополнительные пигменты, исполнитель, начало / конец колеровки, дельта.\n• Решение по цвету и история доведений.\n\nТекущее задание:\nПроверить цвет и принять решение в текущем задании колеровки\nРоль: Колеровщик производства; для затирки — сотрудник склада ПФ, при отсутствии — колеровщик производства.\nМесто: Производство, назначенная ёмкость.\n\nДействия:\n• «Цвет принят» — подтвердить соответствие.\n• «На доведение» — сохранить причину и продолжить доведение.\n• «Проблема» — сохранить причину в том же задании.\n\nРезультат:\nКолеровщик сам решает, выпускать цвет или нет. Отдельное лабораторное задание не создаётся. При сложности консультируется с автором рецепта / главным технологом; исходное задание сохраняется.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.",
                                                            "open": true,
                                                            "links": [
                                                              "f_230_4928",
                                                              "f_230_4980",
                                                              "local_quality_unfixable_defect_route"
                                                            ],
                                                            "edge": "Пустое — самостоятельное принятие",
                                                            "approval_badge_visible": true,
                                                            "screen_task": "Проверить цвет и принять решение в текущем задании колеровки",
                                                            "screen_id": "coloring_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  24
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "f_230_4928",
                                                                "title": "Это компонент А затирки?",
                                                                "kind": "check",
                                                                "open": true,
                                                                "links": [
                                                                  "f_230_4932",
                                                                  "local_prod_colored_a_release_pending"
                                                                ],
                                                                "edge": "Цвет принят",
                                                                "approval_badge_visible": false,
                                                                "review_status": "pending",
                                                                "children": [
                                                                  {
                                                                    "id": "f_230_4932",
                                                                    "title": "Экран «Фасовка»",
                                                                    "kind": "screen",
                                                                    "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: место фасовки, тип продукции, статус, срок, приоритет.\n\nТекущее задание:\nРасфасовать принятую колерованную продукцию\nРоль: Фасовщик производства; для затирки и пигментной пасты — сотрудник склада ПФ.\nМесто: Производство, зона фасовки; для затирки и пигментной пасты — склад ПФ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФасовать по исходным позициям; подтвердить фактическое количество, тару и партию. Маркировка — следующим заданием.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "mark_check_f_230_4932",
                                                                      "equipment_wash_decision"
                                                                    ],
                                                                    "edge": "Нет",
                                                                    "approval_badge_visible": false,
                                                                    "screen_task": "Расфасовать принятую колерованную продукцию",
                                                                    "screen_id": "packing_tasks",
                                                                    "review_status": "pending",
                                                                    "ui_review_status": "pending",
                                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                    "approval_sources": [
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                        "points": [
                                                                          14,
                                                                          25
                                                                        ],
                                                                        "date": "2026-10-15",
                                                                        "scope": "assignment role and physical place"
                                                                      },
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                                        "date": "2026-10-15",
                                                                        "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                                                      }
                                                                    ],
                                                                    "children": [
                                                                      {
                                                                        "id": "mark_check_f_230_4932",
                                                                        "title": "Система: автоматически подготовить макет и документ печати",
                                                                        "kind": "task",
                                                                        "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки. Стикеры: число товарных ёмкостей + 1 на арбитражный образец; этикетки — по товарной таре.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "mark_ready_mark_check_f_230_4932"
                                                                        ],
                                                                        "edge": "Выполнено — Продукция расфасована",
                                                                        "approval_badge_visible": false,
                                                                        "review_status": "pending",
                                                                        "automatic_step": true,
                                                                        "children": [
                                                                          {
                                                                            "id": "mark_ready_mark_check_f_230_4932",
                                                                            "title": "Экран «Маркировка»",
                                                                            "kind": "screen",
                                                                            "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить этикетки и стикеры на колерованную продукцию.\nСтикеры: число товарных ёмкостей + 1 на арбитражный образец; этикетки — по товарной таре.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                                                            "open": true,
                                                                            "links": [
                                                                              "f_230_4936"
                                                                            ],
                                                                            "edge": "Макет и документ печати сформированы",
                                                                            "approval_badge_visible": false,
                                                                            "screen_task": "Наклеить этикетки и стикеры на колерованную продукцию.",
                                                                            "screen_id": "marking",
                                                                            "review_status": "pending",
                                                                            "ui_review_status": "pending",
                                                                            "children": [
                                                                              {
                                                                                "id": "f_230_4936",
                                                                                "title": "1С: производство колерованной ГП из базы, согласованной переработки, пигментов и добавок",
                                                                                "kind": "onec",
                                                                                "notes": "После приёмки цвета и завершения фактического расхода провести документ производства. Продукция: заказанная колерованная ГП нужной фасовки. Материалы: исходная неколерованная ГП из вёдер либо ПФ изготовленной базы, фактические пигменты и добавки; новая тара — только если действительно использована. Исходное сырьё уже выпущенного ПФ повторно не списывать. Сохранить исходные партии и партию выпуска. Далее МХ-18 для передачи выпуска на ГП; отдельный документ перемещения этого же выпуска не создавать.\nПереработку, фактически добавленную при колеровке, указать отдельным материалом с исходными партиями и массой. Если она ранее вошла в изготовленный ПФ, повторно её материалом не указывать.",
                                                                                "open": true,
                                                                                "links": [
                                                                                  "f_262_6911"
                                                                                ],
                                                                                "edge": "",
                                                                                "approval_badge_visible": false,
                                                                                "review_status": "pending",
                                                                                "children": [
                                                                                  {
                                                                                    "id": "f_262_6911",
                                                                                    "title": "1С: оформить МХ-18 — передачу выпущенной продукции с производства на склад ГП",
                                                                                    "kind": "onec",
                                                                                    "notes": "Документ передачи оформляется в контексте проведённого производства. Сохранить связь с выпуском, партии и фактическое количество. вторую учётную операцию перемещения не создавать.\nпри передаче произведённой ГП на склад МХ-18 оформляют всегда.",
                                                                                    "open": true,
                                                                                    "links": [
                                                                                      "f_262_6910"
                                                                                    ],
                                                                                    "edge": "Производство проведено",
                                                                                    "approval_badge_visible": false,
                                                                                    "review_status": "approved",
                                                                                    "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                                                    "approval_sources": [
                                                                                      {
                                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                                        "comment_id": "AAACGqcevZg",
                                                                                        "author": "Данила",
                                                                                        "date": "2026-10-08"
                                                                                      }
                                                                                    ],
                                                                                    "children": [
                                                                                      {
                                                                                        "id": "f_262_6910",
                                                                                        "title": "Экран «Задания склада»",
                                                                                        "kind": "screen",
                                                                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику на перемещение на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nВыполнить физическое перемещение продукции на склад ГП; подтвердить количество и партии. Оформление документов 1С — отдельный шаг системы.",
                                                                                        "open": true,
                                                                                        "links": [
                                                                                          "f_262_6909"
                                                                                        ],
                                                                                        "edge": "МХ-18 оформлена",
                                                                                        "approval_badge_visible": false,
                                                                                        "screen_task": "Задание кладовщику на перемещение на склад ГП",
                                                                                        "screen_id": "warehouse_tasks",
                                                                                        "review_status": "pending",
                                                                                        "ui_review_status": "pending",
                                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                        "approval_sources": [
                                                                                          {
                                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                            "points": [
                                                                                              42
                                                                                            ],
                                                                                            "date": "2026-10-15",
                                                                                            "scope": "assignment role and physical place"
                                                                                          }
                                                                                        ],
                                                                                        "children": [
                                                                                          {
                                                                                            "id": "f_262_6909",
                                                                                            "title": "Экран «Задания склада»",
                                                                                            "kind": "screen",
                                                                                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику: подготовить позиции к отгрузке\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПодготовить уже маркированные позиции к отгрузке. Повторную наклейку этикеток и стикеров не выполнять.",
                                                                                            "open": true,
                                                                                            "links": [
                                                                                              "f_262_6912"
                                                                                            ],
                                                                                            "edge": "Выполнено — Продукция принята на ГП",
                                                                                            "approval_badge_visible": false,
                                                                                            "screen_task": "Задание кладовщику: подготовить позиции к отгрузке",
                                                                                            "screen_id": "warehouse_tasks",
                                                                                            "review_status": "pending",
                                                                                            "ui_review_status": "pending",
                                                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                                            "approval_sources": [
                                                                                              {
                                                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                                                "points": [
                                                                                                  1,
                                                                                                  44
                                                                                                ],
                                                                                                "date": "2026-10-15",
                                                                                                "scope": "assignment role and physical place"
                                                                                              }
                                                                                            ],
                                                                                            "children": [
                                                                                              {
                                                                                                "id": "f_262_6912",
                                                                                                "title": "Готов к отгрузке",
                                                                                                "kind": "result",
                                                                                                "open": true,
                                                                                                "links": [],
                                                                                                "edge": "Выполнено",
                                                                                                "approval_badge_visible": false,
                                                                                                "review_status": "pending",
                                                                                                "children": []
                                                                                              }
                                                                                            ]
                                                                                          }
                                                                                        ]
                                                                                      }
                                                                                    ]
                                                                                  }
                                                                                ]
                                                                              }
                                                                            ]
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  },
                                                                  {
                                                                    "id": "local_prod_colored_a_release_pending",
                                                                    "title": "1С: производство колерованного ПФ компонента А",
                                                                    "kind": "onec",
                                                                    "notes": "Для собственных стандартных цветов подтверждён выпуск ПФ с номером цвета. Продукция — колерованный компонент А; фактические материалы и склад-получатель нужно согласовать с 1С. Для нестандартного клиентского цвета порядок выпуска также требует уточнения. После колеровки компонент А передают на склад ПФ для фасовки и комплектации.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "local_colored_a_to_pf"
                                                                    ],
                                                                    "edge": "Да — компонент А затирки",
                                                                    "approval_badge_visible": false,
                                                                    "review_status": "partial",
                                                                    "approved_scope": "Колерованный ПФ с номером собственного стандартного цвета",
                                                                    "approval_sources": [
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                        "comment_id": "AAACGqcevZs",
                                                                        "author": "Данила",
                                                                        "date": "2026-10-08"
                                                                      }
                                                                    ],
                                                                    "children": [
                                                                      {
                                                                        "id": "local_colored_a_to_pf",
                                                                        "title": "Экран «Задания склада»",
                                                                        "kind": "screen",
                                                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание сотруднику склада: передать принятый компонент А на склад ПФ для комплектации\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФизическая передача с производства к месту комплектации на складе ПФ. Подтвердить массу, партию и получение. Если А уже доставлен, повторную передачу не выдавать. Документ перемещения в 1С автоматически не создавать: физическое место и склад учёта различаются; необходимость учётного движения А требует подтверждения 1С.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "f_241_5194"
                                                                        ],
                                                                        "edge": "Далее — передача на склад ПФ",
                                                                        "approval_badge_visible": false,
                                                                        "screen_task": "Задание сотруднику склада: передать принятый компонент А на склад ПФ для комплектации",
                                                                        "screen_id": "warehouse_tasks",
                                                                        "review_status": "pending",
                                                                        "ui_review_status": "pending",
                                                                        "children": [
                                                                          {
                                                                            "id": "f_241_5194",
                                                                            "title": "Схема «Комплектация затирки»",
                                                                            "kind": "route",
                                                                            "open": true,
                                                                            "links": [
                                                                              "f_241_5170"
                                                                            ],
                                                                            "edge": "Выполнено — Передача подтверждена",
                                                                            "approval_badge_visible": false,
                                                                            "review_status": "pending",
                                                                            "route_target_id": "f_241_5170",
                                                                            "children": []
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              },
                                                              {
                                                                "id": "f_230_4980",
                                                                "title": "Экран «Колеровка»",
                                                                "kind": "screen",
                                                                "notes": "Данные:\n• Причина отклонения, дополнительные пигменты / добавки, количество, история фактического расхода.\n\nТекущее задание:\nУказать пигменты и добавки для доведения цвета в том же задании\nРоль: Колеровщик производства; для затирки — сотрудник склада ПФ, при отсутствии — колеровщик производства.\nМесто: Производство, назначенная ёмкость.\n\nДействия:\n• «Подтвердить доведение» — перейти к обеспечению добавок.\n• «Проблема» — указать причину.\n\nРезультат:\nДоведение выполняет колеровщик. При необходимости — консультация с автором рецепта / технологом. После доведения повторяется проверка цвета; новый экземпляр задания не создаётся.",
                                                                "open": true,
                                                                "links": [
                                                                  "local_prod_correction_supply"
                                                                ],
                                                                "edge": "На доведение",
                                                                "approval_badge_visible": false,
                                                                "screen_task": "Указать пигменты и добавки для доведения цвета в том же задании",
                                                                "screen_id": "coloring_tasks",
                                                                "review_status": "pending",
                                                                "ui_review_status": "pending",
                                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                    "points": [
                                                                      24
                                                                    ],
                                                                    "date": "2026-10-15",
                                                                    "scope": "assignment role and physical place"
                                                                  }
                                                                ],
                                                                "children": [
                                                                  {
                                                                    "id": "local_prod_correction_supply",
                                                                    "title": "Пигменты и добавки для доведения есть на производстве?",
                                                                    "kind": "check",
                                                                    "notes": "Проверить назначенные количества с учётом резервов и склада учёта 1С. Если материал отсутствует и на складе сырья, ждать снабжения; доведение не подтверждать до получения.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "local_prod_correction_apply",
                                                                      "local_prod_correction_move"
                                                                    ],
                                                                    "edge": "Выполнено — Доведение назначено",
                                                                    "approval_badge_visible": false,
                                                                    "review_status": "pending",
                                                                    "children": [
                                                                      {
                                                                        "id": "local_prod_correction_apply",
                                                                        "title": "Экран «Колеровка»",
                                                                        "kind": "screen",
                                                                        "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nКолеровщик: довести цвет; записать расход и передать повторную пробу\nРоль: Колеровщик производства; для затирки — сотрудник склада ПФ, при отсутствии — колеровщик производства.\nМесто: Производство, назначенная ёмкость.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nВнести только назначенные дополнительные количества. Сохранить партии, фактический расход и комментарии по исходному заданию. Затем повторный ОТК; не повторять всю первоначальную колеровку.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "f_230_4924"
                                                                        ],
                                                                        "edge": "Да",
                                                                        "approval_badge_visible": false,
                                                                        "screen_task": "Колеровщик: довести цвет; записать расход и передать повторную пробу",
                                                                        "screen_id": "coloring_tasks",
                                                                        "review_status": "pending",
                                                                        "ui_review_status": "pending",
                                                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                        "approval_sources": [
                                                                          {
                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                            "points": [
                                                                              24
                                                                            ],
                                                                            "date": "2026-10-15",
                                                                            "scope": "assignment role and physical place"
                                                                          }
                                                                        ],
                                                                        "children": []
                                                                      },
                                                                      {
                                                                        "id": "local_prod_correction_move",
                                                                        "title": "Экран «Задания склада»",
                                                                        "kind": "screen",
                                                                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: доставить недостающие пигменты и добавки для доведения\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nСо склада сырья на производство. Передать только дефицит, подтвердить фактические материалы и количества.",
                                                                        "open": true,
                                                                        "links": [
                                                                          "local_prod_correction_onec"
                                                                        ],
                                                                        "edge": "Нет — доставить дефицит",
                                                                        "approval_badge_visible": false,
                                                                        "screen_task": "Кладовщик: доставить недостающие пигменты и добавки для доведения",
                                                                        "screen_id": "warehouse_tasks",
                                                                        "review_status": "pending",
                                                                        "ui_review_status": "pending",
                                                                        "children": [
                                                                          {
                                                                            "id": "local_prod_correction_onec",
                                                                            "title": "1С: переместить недостающие материалы для доведения на Производство",
                                                                            "kind": "onec",
                                                                            "notes": "Со склада сырья на склад Производство. Если материалы уже учтены на Производстве, отдельное учётное перемещение не создавать. Фактический расход добавок включить в итоговое производство.",
                                                                            "open": true,
                                                                            "links": [
                                                                              "local_prod_correction_apply"
                                                                            ],
                                                                            "edge": "Выполнено — Материалы доставлены",
                                                                            "approval_badge_visible": false,
                                                                            "review_status": "pending",
                                                                            "children": []
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "id": "quality_prod_lab",
                                                            "title": "Экран «ОТК»",
                                                            "kind": "screen",
                                                            "notes": "Роль: Сотрудник ОТК.\nМесто: Лаборатория ОТК.\n\nДанные:\n• Текущий счёт / позиция, партия, поле «Исходный счёт» и прежний образец.\n• Старый и новый выкрасы рядом, результат сравнения и итоговое решение.\n\nВход:\nПоле «Исходный счёт» заполнено; после колеровки пробу передают в лабораторию. Задание остаётся в очереди ОТК до решения.\n\nЗадание:\nСделать выкрасы и обсудить результат с ответственным менеджером / производством. Переписку проводят самостоятельно в Битриксе; отдельного экрана менеджера и автоматической отправки сообщений нет.\n\nДействия:\n• «Взять в работу» — начать лабораторную проверку.\n• «Продолжить маршрут» — зафиксировать положительное решение после согласования и разрешить следующий этап.\n• «Отправить на доведение» — указать согласованные замечания и вернуть текущую колеровку на доведение.\n• «Проблема» — указать причину и оставить задание на ожидании.\n\nРезультат:\nРешение фиксирует лаборатория в том же задании ОТК. До решения маршрут не продолжается. После доведения повторная проба возвращается на проверку; сохраняются история, счёт, партия и исходное задание.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.\n\nВопрос: согласовать формат поля итогового решения лаборатории.",
                                                            "open": true,
                                                            "links": [
                                                              "f_230_4928",
                                                              "f_230_4980",
                                                              "local_quality_unfixable_defect_route"
                                                            ],
                                                            "edge": "Заполнено — повторение цвета",
                                                            "approval_badge_visible": true,
                                                            "screen_task": "Сравнить выкрасы; после согласования продолжить маршрут или вернуть на доведение",
                                                            "screen_id": "quality_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  11
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": []
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": "local_prod_new_batch_prepare",
                                "title": "Экран «Фасовка»",
                                "kind": "screen",
                                "notes": "Данные:\n• Принятая партия, масса, исходная дежа и назначения по позициям.\n• Масса каждой части, ёмкости для отбора, фасовки и фактические количества.\n\nТекущее задание:\nФасовщик производства: выделить принятую часть замеса в ёмкость для колеровки\nРоль: Фасовщик производства.\nМесто: Производство, зона фасовки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nБаза уже принята ОТК. Зафиксировать массу, партию и назначение по исходным позициям. Физически доставить ёмкость к месту колеровки, если нужно. Если база уже учтена на Производстве, межскладское перемещение 1С не создавать. Колеровка в оставленной деже — отдельный существующий маршрут; здесь подготовка для колеровки в выделенной ёмкости.",
                                "open": true,
                                "links": [
                                  "f_230_4908"
                                ],
                                "edge": "Новый замес; база принята ОТК",
                                "approval_badge_visible": false,
                                "screen_task": "Фасовщик производства: выделить принятую часть замеса в ёмкость для колеровки",
                                "screen_id": "packing_tasks",
                                "review_status": "pending",
                                "ui_review_status": "pending",
                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                "approval_sources": [
                                  {
                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                    "points": [
                                      13
                                    ],
                                    "date": "2026-10-15",
                                    "scope": "assignment role and physical place"
                                  },
                                  {
                                    "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                    "date": "2026-10-15",
                                    "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                  }
                                ],
                                "children": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "local_prod_pigment_move",
                        "title": "Экран «Задания склада»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: доставить недостающие пигменты и добавки со склада сырья на производство\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПередать только недостающее количество; исполнитель подтверждает получение. Если на складе сырья тоже нет материалов — показать дефицит ответственному за снабжение и ждать поступления. Не считать задание выполненным до фактической передачи.",
                        "open": true,
                        "links": [
                          "local_prod_pigment_transfer_onec"
                        ],
                        "edge": "Нет — требуется пополнение",
                        "approval_badge_visible": false,
                        "screen_task": "Кладовщик: доставить недостающие пигменты и добавки со склада сырья на производство",
                        "screen_id": "warehouse_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "children": [
                          {
                            "id": "local_prod_pigment_transfer_onec",
                            "title": "1С: переместить недостающие пигменты и добавки со склада сырья на склад Производство",
                            "kind": "onec",
                            "notes": "Оформить на фактически переданные материалы. Если они уже числятся на Производстве, повторный документ не создавать. Ошибка 1С не считается завершённым обеспечением: сохранить причину и повторить учётный шаг без повторной физической доставки.",
                            "open": true,
                            "links": [
                              "local_prod_pigment_reserve"
                            ],
                            "edge": "Выполнено — Материалы доставлены",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "f_269_5088",
        "title": "Брак и возвраты → переработка",
        "kind": "route",
        "open": true,
        "links": [
          "f_269_5090",
          "f_269_5094"
        ],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "f_269_5090",
            "title": "Экран «Брак и возвраты»",
            "kind": "screen",
            "notes": "Данные:\n• Список заданий и карточка: Исходный счёт/задание, продукция, партия, количество, причина, место и решение.\n• Фильтры / сортировка: Брак/возврат, статус, партия.\n\nТекущее задание:\nОТК / исполнитель: зафиксировать брак и исходное задание\nРоль: Сотрудник, обнаруживший отклонение; брак подтверждает технолог.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nЦвет или качество, фактическое количество, партия, исходная позиция счёта, текущее место. Обычное исправимое отклонение ОТК доводится в том же задании; не считать его уже принятым остатком переработки.",
            "open": true,
            "links": [
              "local_defect_notify_otk"
            ],
            "edge": "Брак",
            "approval_badge_visible": false,
            "screen_task": "ОТК / исполнитель: зафиксировать брак и исходное задание",
            "screen_id": "defect_return_tasks",
            "review_status": "pending",
            "ui_review_status": "pending",
            "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
            "approval_sources": [
              {
                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                "points": [
                  35
                ],
                "date": "2026-10-15",
                "scope": "assignment role"
              }
            ],
            "children": [
              {
                "id": "local_defect_notify_otk",
                "title": "Экран «Брак и возвраты»",
                "kind": "screen",
                "notes": "Данные:\n• Список заданий и карточка: Исходный счёт/задание, продукция, партия, количество, причина, место и решение.\n• Фильтры / сортировка: Брак/возврат, статус, партия.\n\nТекущее задание:\nСообщить технологу / ОТК о браке и его фактическом объёме\nРоль: Сотрудник, обнаруживший отклонение; брак подтверждает технолог.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nпри неудачной колеровке отдельного ведра на КМ сотрудник сообщает технологу / ОТК о браке, который нужно поставить на переработку. Зафиксировать конкретные вёдра, массу и партию. Это не автоматическое направление всей позиции на переработку; пригодность и назначение подтверждает ответственный.",
                "open": true,
                "links": [
                  "f_269_5098"
                ],
                "edge": "Выполнено — Брак зафиксирован",
                "approval_badge_visible": false,
                "screen_task": "Сообщить технологу / ОТК о браке и его фактическом объёме",
                "screen_id": "defect_return_tasks",
                "review_status": "pending",
                "ui_review_status": "pending",
                "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                    "points": [
                      35
                    ],
                    "date": "2026-10-15",
                    "scope": "assignment role"
                  }
                ],
                "children": [
                  {
                    "id": "f_269_5098",
                    "title": "Экран «Брак и возвраты»",
                    "kind": "screen",
                    "notes": "Данные:\n• Список заданий и карточка: Исходный счёт/задание, продукция, партия, количество, причина, место и решение.\n• Фильтры / сортировка: Брак/возврат, статус, партия.\n\nТекущее задание:\nСоздать заявку: исходная продукция, масса, партия и место\nРоль: Сотрудник, обнаруживший переработку; запись подтверждает технолог.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nреестр заявок на переработку. Сохранить дату, причину брака/возврата, продукцию, базу, цвет, исходную партию, счёт, фактическую массу и местонахождение. Статус — ждёт решения; не включать в доступный остаток переработки до назначения и приёмки.",
                    "open": true,
                    "links": [
                      "f_269_5110"
                    ],
                    "edge": "Выполнено — Брак передан на рассмотрение",
                    "approval_badge_visible": false,
                    "screen_task": "Создать заявку: исходная продукция, масса, партия и место",
                    "screen_id": "defect_return_tasks",
                    "review_status": "pending",
                    "ui_review_status": "pending",
                    "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
                    "approval_sources": [
                      {
                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                        "points": [
                          35,
                          38
                        ],
                        "date": "2026-10-15",
                        "scope": "assignment role"
                      }
                    ],
                    "children": [
                      {
                        "id": "f_269_5110",
                        "title": "Экран «Брак и возвраты»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: Исходный счёт/задание, продукция, партия, количество, причина, место и решение.\n• Фильтры / сортировка: Брак/возврат, статус, партия.\n\nТекущее задание:\nЗафиксировать согласованное назначение брака / возврата\nРоль: Технолог / главный технолог.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя.\n• «На ГП» — сохранить решение и продолжить существующую ветку.\n• «На переработку» — сохранить решение и продолжить существующую ветку.\n• «На доведение» — сохранить решение и продолжить существующую ветку.\n• «Решение не принято» — сохранить решение и продолжить существующую ветку.\n• «Проблема» — указать причину.\n\nПравила процесса:\nОсновная ветки «ГП» и «На переработку». ГП допускается только для продукции, качество которой позволяет хранение и дальнейшую реализацию, с согласованием ответственного. Исправимый брак возвращается в исходное задание. Не определять назначение автоматически; критерии назначения остаются на согласовании; решение подтверждает технолог / главный технолог.",
                        "open": true,
                        "links": [
                          "local_defect_gp_release_order",
                          "f_269_5134",
                          "f_269_5126",
                          "f_269_5118"
                        ],
                        "edge": "Выполнено — Заявка создана",
                        "approval_badge_visible": false,
                        "screen_task": "Зафиксировать согласованное назначение брака / возврата",
                        "screen_id": "defect_return_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
                        "approval_sources": [
                          {
                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                            "points": [
                              37
                            ],
                            "date": "2026-10-15",
                            "scope": "assignment role"
                          }
                        ],
                        "children": [
                          {
                            "id": "local_defect_gp_release_order",
                            "title": "Экран «Обеспечение счёта»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: Счёт, позиция, объём, источник, партия, связанные задания и план/факт.\n• Фильтры / сортировка: Счёт, позиция, статус, срок.\n\nТекущее задание:\nСнять привязку объёма к исходному счёту; оформить пополнение ГП\nРоль: Ответственный за обеспечение позиции; роль требует утверждения.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\n«Расформировать счет / переместить на склад ГП». Сохранить историю исходного счёта; не удалять весь клиентский счёт из-за части продукции. Для согласованного пополнения оформить связанный счёт Bitrix/Лакомка. Смысл расформирования и порядок действий для уже учтённого возврата требуют уточнения. По исходному описанию цветная продукция на ГП — по согласованию руководства.\nДля пополнения ГП создать счёт на контрагента «Пополнение склада», далее обработка как у клиентского счёта. Инициатор — менеджер, руководитель склада или планировщик.",
                            "open": true,
                            "links": [
                              "local_defect_gp_onec_pending"
                            ],
                            "edge": "На ГП",
                            "approval_badge_visible": false,
                            "screen_task": "Снять привязку объёма к исходному счёту; оформить пополнение ГП",
                            "screen_id": "order_supply",
                            "review_status": "partial",
                            "ui_review_status": "pending",
                            "approved_scope": "Пополнение ГП через счёт",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                "comment_id": "AAACIF4yhr4",
                                "author": "Данила",
                                "date": "2026-10-08"
                              },
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                "comment_id": "AAACIF6YlTw",
                                "author": "Данила",
                                "date": "2026-10-08"
                              }
                            ],
                            "children": [
                              {
                                "id": "local_defect_gp_onec_pending",
                                "title": "1С: оформить постановку на ГП — ждём уточнения Данилы",
                                "kind": "onec",
                                "notes": "Если продукция ещё не выпущена в учёте — производство по счёту пополнения и передача в контексте выпуска. Если уже учтена — не производить повторно; уточнить складское движение и освобождение от исходного заказа. Для возврата сперва учесть документ возврата. Точный сценарий требует подтверждения.",
                                "open": true,
                                "links": [
                                  "local_defect_gp_move"
                                ],
                                "edge": "Выполнено — Назначение согласовано",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "local_defect_gp_move",
                                    "title": "Экран «Задания склада»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: передать согласованную продукцию на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПодтвердить фактическое количество, партии и место хранения. Отбраковку автоматически на ГП не принимать.",
                                    "open": true,
                                    "links": [
                                      "local_defect_gp_ready"
                                    ],
                                    "edge": "После уточнения учёта",
                                    "approval_badge_visible": false,
                                    "screen_task": "Кладовщик: передать согласованную продукцию на склад ГП",
                                    "screen_id": "warehouse_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          42
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "local_defect_gp_ready",
                                        "title": "Продукция принята на ГП; назначение и остаток обновлены",
                                        "kind": "result",
                                        "notes": "",
                                        "open": true,
                                        "links": [],
                                        "edge": "Выполнено — ГП принята",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "children": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": "f_269_5134",
                            "title": "Экран «Реестр переработки»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: Исходная партия, материал, количество, место, номер записи, выкрас и согласованное назначение.\n• Фильтры / сортировка: База, цвет, место хранения, статус.\n\nТекущее задание:\nСоздать запись в журнале переработки\nРоль: Сотрудник, обнаруживший переработку; технолог — подтверждение и инициирование передачи.\nМесто: Лаборатория ОТК.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nТолько после согласования переработки: дата, причина, исходная продукция, база, цвет, партия, счёт, фактическая масса и местонахождение. Цвет и выкрас сохранить в журнале даже если в 1С учитывается база без цвета. Не создавать счёт пополнения для передачи на переработку — исходное описание клиента.",
                            "open": true,
                            "links": [
                              "f_269_5142"
                            ],
                            "edge": "На переработку",
                            "approval_badge_visible": false,
                            "screen_task": "Создать запись в журнале переработки",
                            "screen_id": "rework_registry",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  38
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": [
                              {
                                "id": "f_269_5142",
                                "title": "Экран «Реестр переработки»",
                                "kind": "screen",
                                "notes": "Данные:\n• Список заданий и карточка: Исходная партия, материал, количество, место, номер записи, выкрас и согласованное назначение.\n• Фильтры / сортировка: База, цвет, место хранения, статус.\n\nТекущее задание:\nПрисвоить номер записи переработки и приложить выкрас\nРоль: Ответственный за переработку; точную роль уточнить.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nОтдельный порядковый номер журнала переработки не заменяет исходный номер партии. Сохранить связь исходной партии с каждым ведром/бочкой/кубом, количество и выкрас.",
                                "open": true,
                                "links": [
                                  "mark_check_rework"
                                ],
                                "edge": "Выполнено — Запись создана",
                                "approval_badge_visible": false,
                                "screen_task": "Присвоить номер записи переработки и приложить выкрас",
                                "screen_id": "rework_registry",
                                "review_status": "pending",
                                "ui_review_status": "pending",
                                "children": [
                                  {
                                    "id": "mark_check_rework",
                                    "title": "Система: автоматически подготовить макет и документ печати",
                                    "kind": "task",
                                    "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки. Указать номер записи переработки и исходную партию; сохранить связь с количеством и выкрасом. Номер записи не заменяет номер партии.",
                                    "open": true,
                                    "links": [
                                      "mark_ready_mark_check_rework"
                                    ],
                                    "edge": "Выполнено — Запись создана; номер присвоен",
                                    "approval_badge_visible": false,
                                    "review_status": "pending",
                                    "automatic_step": true,
                                    "children": [
                                      {
                                        "id": "mark_ready_mark_check_rework",
                                        "title": "Экран «Маркировка»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nПромаркировать ёмкость переработки.\nУказать номер записи переработки и исходную партию; сохранить связь с количеством и выкрасом. Номер записи не заменяет номер партии.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                        "open": true,
                                        "links": [
                                          "local_rework_stock_form"
                                        ],
                                        "edge": "Макет и документ печати сформированы",
                                        "approval_badge_visible": false,
                                        "screen_task": "Промаркировать ёмкость переработки.",
                                        "screen_id": "marking",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "children": [
                                          {
                                            "id": "local_rework_stock_form",
                                            "title": "Материал уже расфасован в товарные вёдра?",
                                            "kind": "check",
                                            "notes": "Исходное описание клиента: ГП в готовых вёдрах учитывается по фасовке в штуках; нерасфасованный материал — как ПФ в кг. Цвет в учёте отделяется, но сохраняется в реестре переработки.",
                                            "open": true,
                                            "links": [
                                              "local_rework_gp_base",
                                              "local_rework_pf_base"
                                            ],
                                            "edge": "Ёмкость промаркирована",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "children": [
                                              {
                                                "id": "local_rework_gp_base",
                                                "title": "Экран «Реестр переработки»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: Исходная партия, материал, количество, место, номер записи, выкрас и согласованное назначение.\n• Фильтры / сортировка: База, цвет, место хранения, статус.\n\nТекущее задание:\nЗафиксировать базовую ГП: фасовка, штуки и масса\nРоль: Сотрудник, обнаруживший переработку; запись подтверждает технолог.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nНе создавать отдельную товарную позицию цвета на остатках переработки; сохранить исходный цвет и выкрас в журнале.",
                                                "open": true,
                                                "links": [
                                                  "f_269_5182"
                                                ],
                                                "edge": "Да — ГП в вёдрах",
                                                "approval_badge_visible": false,
                                                "screen_task": "Зафиксировать базовую ГП: фасовка, штуки и масса",
                                                "screen_id": "rework_registry",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      38
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role"
                                                  }
                                                ],
                                                "children": [
                                                  {
                                                    "id": "f_269_5182",
                                                    "title": "1С: переместить базу ГП / ПФ на склад «Переработка ПФ»",
                                                    "kind": "onec",
                                                    "notes": "Клиентское описание «Переработка, движение в 1С», пункт Б: создать документ перемещения; поставить только базу ПФ или ГП без признака колеровки. ГП в товарной фасовке — по штукам, нерасфасованный ПФ — по кг. Исходный цвет и выкрас сохраняются в реестре. Склад-получатель учёта — Переработка ПФ; исходный склад соответствует фактическому остатку 1С. Физически материал принимает сотрудник склада ПФ. Если исходный материал ещё не учтён в 1С, порядок первоначального учёта требует уточнения.",
                                                    "open": true,
                                                    "links": [
                                                      "local_rework_pigment_account_pending"
                                                    ],
                                                    "edge": "Выполнено — Материал определён",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "children": [
                                                      {
                                                        "id": "local_rework_pigment_account_pending",
                                                        "title": "1С: списать пигменты документом списания",
                                                        "kind": "onec",
                                                        "notes": "При постановке колерованного материала на переработку база учитывается отдельно от цвета; пигменты списать документом списания. Отдельный документ списания уточнён пользователем 07.10.2026; исходное описание клиента «Переработка, движение в 1С», пункт Б, прямо требует отдельного списания пигментов. Связать документ с заявкой, исходной партией и фактическим расходом. Для материала без пигментов этот шаг пропустить. Уже учтённый расход не списывать повторно. Точное имя документа в конфигурации, поля и API уточняются при интеграции — это не вопрос о необходимости отдельного списания.",
                                                        "open": true,
                                                        "links": [
                                                          "f_269_5150"
                                                        ],
                                                        "edge": "База учтена",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": [
                                                          {
                                                            "id": "f_269_5150",
                                                            "title": "Экран «Задания склада»",
                                                            "kind": "screen",
                                                            "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик склада ПФ: забрать материал и поставить на хранение переработки\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ / переработки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nВзять из фактического места материала; для возврата — из согласованного места приёмки. Физический участок склада ПФ и склад учёта переработки в 1С не обязательно одно название: уточнить место хранения.",
                                                            "open": true,
                                                            "links": [
                                                              "f_269_5158"
                                                            ],
                                                            "edge": "Учёт переработки оформлен",
                                                            "approval_badge_visible": false,
                                                            "screen_task": "Кладовщик склада ПФ: забрать материал и поставить на хранение переработки",
                                                            "screen_id": "warehouse_tasks",
                                                            "review_status": "pending",
                                                            "ui_review_status": "pending",
                                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                "points": [
                                                                  40
                                                                ],
                                                                "date": "2026-10-15",
                                                                "scope": "assignment role and physical place"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "f_269_5158",
                                                                "title": "Экран «Задания склада»",
                                                                "kind": "screen",
                                                                "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nСотрудник склада ПФ: подтвердить массу, партии и место хранения\nРоль: Сотрудник склада ПФ.\nМесто: Склад ПФ / переработки.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nОсновная Обновить электронный журнал: кто, когда и сколько принял; сохранить маркировку, исходную партию и выкрас.",
                                                                "open": true,
                                                                "links": [
                                                                  "f_269_5166"
                                                                ],
                                                                "edge": "Выполнено — Материал передан",
                                                                "approval_badge_visible": false,
                                                                "screen_task": "Сотрудник склада ПФ: подтвердить массу, партии и место хранения",
                                                                "screen_id": "warehouse_tasks",
                                                                "review_status": "pending",
                                                                "ui_review_status": "pending",
                                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                    "points": [
                                                                      40
                                                                    ],
                                                                    "date": "2026-10-15",
                                                                    "scope": "assignment role and physical place"
                                                                  }
                                                                ],
                                                                "children": [
                                                                  {
                                                                    "id": "f_269_5166",
                                                                    "title": "Переработка принята: в реестре видны партия, цвет, выкрас и масса",
                                                                    "kind": "result",
                                                                    "notes": "Различать физическую приёмку и подтверждение учёта 1С. Не считать этот результат разрешением использовать материал; партии и массу для конкретной продукции выбирает технолог.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "f_269_5174"
                                                                    ],
                                                                    "edge": "Выполнено — Приёмка сохранена",
                                                                    "approval_badge_visible": false,
                                                                    "review_status": "pending",
                                                                    "children": [
                                                                      {
                                                                        "id": "f_269_5174",
                                                                        "title": "Материал доступен для рассмотрения технологом при подборе переработки",
                                                                        "kind": "result",
                                                                        "notes": "Выбор и использование описаны в планировании замеса и колеровке на производстве. Здесь цепочка постановки заканчивается; не запускать производство автоматически. Сортировка списка: совпадение базы + цвета, затем цвета, затем остальные. Технолог подтверждает совместимость, партии, массу и этап внесения.\nРешение по переработке: уведомление всем ответственным; приоритет главный технолог → технолог → планировщик. Общие 30 минут; более высокая роль может изменить решение в этом же окне.",
                                                                        "open": true,
                                                                        "links": [],
                                                                        "edge": "Показать в реестре подбора",
                                                                        "approval_badge_visible": false,
                                                                        "review_status": "pending",
                                                                        "approval_sources": [
                                                                          {
                                                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                            "comment_id": "AAACArc6Lfc",
                                                                            "author": "Данила"
                                                                          }
                                                                        ],
                                                                        "children": []
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              },
                                              {
                                                "id": "local_rework_pf_base",
                                                "title": "Экран «Реестр переработки»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: Исходная партия, материал, количество, место, номер записи, выкрас и согласованное назначение.\n• Фильтры / сортировка: База, цвет, место хранения, статус.\n\nТекущее задание:\nЗафиксировать базовый ПФ и фактическую массу в кг\nРоль: Сотрудник, обнаруживший переработку; запись подтверждает технолог.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nДля нерасфасованного материала. Исходный номер партии, цвет и выкрас сохраняются в журнале.",
                                                "open": true,
                                                "links": [
                                                  "f_269_5182"
                                                ],
                                                "edge": "Нет — ПФ в кг",
                                                "approval_badge_visible": false,
                                                "screen_task": "Зафиксировать базовый ПФ и фактическую массу в кг",
                                                "screen_id": "rework_registry",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Задание: роль по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      38
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role"
                                                  }
                                                ],
                                                "children": []
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": "f_269_5126",
                            "title": "Вернуть на доведение в исходном задании и повторный ОТК",
                            "kind": "result",
                            "notes": "Это продолжение того задания и партии, где возникло отклонение, а не новый замес. Доведение, обеспечение добавок и повторный ОТК уже описаны в соответствующих маршрутах. При невозможности исправления вернуться к решению о назначении. Связать с исходным заданием в системе.",
                            "open": true,
                            "links": [],
                            "edge": "На доведение",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": []
                          },
                          {
                            "id": "f_269_5118",
                            "title": "Ожидать решения; не включать материал в доступные остатки",
                            "kind": "result",
                            "notes": "Сохранить материал и заявку без назначения в ГП или переработку. После решения повторно выбрать согласованное направление.",
                            "open": true,
                            "links": [
                              "f_269_5110"
                            ],
                            "edge": "Решение не принято",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "f_269_5094",
            "title": "Экран «Брак и возвраты»",
            "kind": "screen",
            "notes": "Данные:\n• Список заданий и карточка: Исходный счёт/задание, продукция, партия, количество, причина, место и решение.\n• Фильтры / сортировка: Брак/возврат, статус, партия.\n\nТекущее задание:\nПринять возврат: продукция, партия, количество и причина\nРоль: Сотрудник склада — количество на ГП; сотрудник склада ПФ — количество на ПФ / переработке; технолог — качество.\nМесто: Склад ГП / склад ПФ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФактически вернувшийся объём, состояние, место приёмки и связь с исходной отгрузкой/счётом. Сам факт возврата не означает доступность переработки.",
            "open": true,
            "links": [
              "local_return_onec_pending"
            ],
            "edge": "Возврат",
            "approval_badge_visible": false,
            "screen_task": "Принять возврат: продукция, партия, количество и причина",
            "screen_id": "defect_return_tasks",
            "review_status": "pending",
            "ui_review_status": "pending",
            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
            "approval_sources": [
              {
                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                "points": [
                  36
                ],
                "date": "2026-10-15",
                "scope": "assignment role and physical place"
              }
            ],
            "children": [
              {
                "id": "local_return_onec_pending",
                "title": "1С: приходная накладная — «Возврат от покупателя»",
                "kind": "onec",
                "notes": "Документ: «Приходная накладная», операция «Возврат от покупателя». Указать исходный документ продажи, возвращаемые позиции, фактическое количество и склад-получатель. Сохранить связь с исходным счётом и отгрузкой. Если возврат уже проведён, использовать существующий документ без второго прихода. После учёта возврат идёт на решение о дальнейшем назначении. Роль принимающего сотрудника и критерии оценки качества остаются отдельными вопросами; название документа подтверждено.",
                "open": true,
                "links": [
                  "f_269_5098"
                ],
                "edge": "Выполнено — Возврат фактически принят",
                "approval_badge_visible": false,
                "review_status": "approved",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.e3s14e9xbdhf",
                    "basis": "Актуальные алгоритмы 1С: пункты 2, 8 и 11; список документов пользователя от 12.10.2026."
                  }
                ],
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "local_deja_coloring_route",
        "title": "Колеровка в деже после замеса",
        "kind": "route",
        "notes": "Черновик отдельного маршрута для правки пользователем. Вход — новая база принята ОТК, распределена; самая большая колеруемая часть оставлена в деже. Повторного поиска базы, нового замеса и передачи базы со склада нет. Рецепт рассчитывают заранее; здесь используют подтверждённый рецепт на выделенную массу.",
        "open": true,
        "links": [
          "local_deja_coloring_ready"
        ],
        "approval_badge_visible": false,
        "review_status": "pending",
        "children": [
          {
            "id": "local_deja_coloring_ready",
            "title": "База после замеса принята ОТК; колеруемая часть оставлена в деже. Зафиксировать массу, партию и связанные позиции",
            "kind": "result",
            "notes": "",
            "open": true,
            "links": [
              "local_deja_coloring_recipe"
            ],
            "edge": "",
            "approval_badge_visible": false,
            "review_status": "pending",
            "children": [
              {
                "id": "local_deja_coloring_recipe",
                "title": "Экран «Задания технолога»",
                "kind": "screen",
                "notes": "Данные:\n• Список заданий и карточка: Позиции, база, цвет, масса, рецепт, источник, переработка и выбранный способ колеровки.\n• Фильтры / сортировка: Тип задания, база, цвет, статус, срок.\n\nТекущее задание:\nТехнолог подтверждает ранее рассчитанный рецепт на массу части, оставленной в деже\nРоль: Технолог по колеровке.\nМесто: Офис производства.\n\nДействия:\n• «Взять в работу».\n• «Подтвердить рецепт / решение» — сохранить факт / решение и продолжить маршрут по существующим связям.\n• «Проблема» — указать причину.\n\nПравила процесса:\nЕсли масса или состав изменились после распределения замеса — скорректировать рецепт. Повторное задание на расчёт без изменения исходных данных не создавать. Показать историю комментариев по базе и цвету.",
                "open": true,
                "links": [
                  "local_deja_pigment_check"
                ],
                "edge": "",
                "approval_badge_visible": false,
                "screen_task": "Технолог подтверждает ранее рассчитанный рецепт на массу части, оставленной в деже",
                "screen_id": "technology_tasks",
                "review_status": "pending",
                "ui_review_status": "pending",
                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                "approval_sources": [
                  {
                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                    "points": [
                      15,
                      16
                    ],
                    "date": "2026-10-15",
                    "scope": "assignment role and physical place"
                  }
                ],
                "children": [
                  {
                    "id": "local_deja_pigment_check",
                    "title": "Пигменты и добавки по рецепту обеспечены на производстве?",
                    "kind": "check",
                    "notes": "",
                    "open": true,
                    "links": [
                      "local_deja_coloring_materials",
                      "local_deja_pigment_move"
                    ],
                    "edge": "Подтвердить рецепт / решение — Рецепт подтверждён",
                    "approval_badge_visible": false,
                    "review_status": "pending",
                    "children": [
                      {
                        "id": "local_deja_coloring_materials",
                        "title": "Система: зарезервировать пигменты и добавки для колеровки в деже",
                        "kind": "task",
                        "notes": "Свежую базу не перемещать со склада: она уже в деже на производстве. Необходимые перемещения пигментов и добавок учитывать по действующей общей логике.",
                        "open": true,
                        "links": [
                          "local_deja_f_230_4920"
                        ],
                        "edge": "Да",
                        "approval_badge_visible": false,
                        "review_status": "pending",
                        "automatic_step": true,
                        "children": [
                          {
                            "id": "local_deja_f_230_4920",
                            "title": "Экран «Колеровка»",
                            "kind": "screen",
                            "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nЗаколеровать часть в деже; подтвердить расход\nРоль: Колеровщик производства; при необходимости — колеровщик КМ.\nМесто: Производство, исходная дежа замеса.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПроверка цвета:\nПосле «Выполнено» открывается этап проверки цвета в том же задании. Сохранить исполнителя, время начала / конца, дельту и весь дополнительный расход пигментов. Задание не завершать до принятия цвета; при повторении прежнего цвета ждать лабораторного сравнения и решения лаборатории после внешнего согласования в Битриксе.\n\nПосле приёмки базы замесчик передаёт оборудование исполнителю колеровки.",
                            "open": true,
                            "links": [
                              "local_deja_f_230_4924"
                            ],
                            "edge": "Материалы готовы",
                            "approval_badge_visible": false,
                            "screen_task": "Заколеровать часть в деже; подтвердить расход",
                            "screen_id": "coloring_tasks",
                            "review_status": "pending",
                            "ui_review_status": "pending",
                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                            "approval_sources": [
                              {
                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                "points": [
                                  47
                                ],
                                "date": "2026-10-15",
                                "scope": "assignment role and physical place"
                              }
                            ],
                            "children": [
                              {
                                "id": "local_deja_f_230_4924",
                                "title": "Поле «Исходный счёт» заполнено?",
                                "kind": "check",
                                "notes": "Проверить поле «Исходный счёт» в исходной позиции / задании колеровки.\n• Заполнено — повторяем цвет прежнего заказа: лабораторное сравнение старого и нового выкрасов, затем решение лаборатории после переписки с менеджером в Битриксе.\n• Пустое — колеровщик самостоятельно принимает цвет в текущем задании.\nСсылка на исходный счёт сохраняется в лабораторном задании и лабораторном задании. Если прежний образец / выкрас недоступен, фиксировать проблему; не переключать автоматически на самостоятельное принятие.",
                                "open": true,
                                "links": [
                                  "quality_deja_self",
                                  "quality_deja_lab"
                                ],
                                "edge": "Колеровка выполнена — перейти к проверке цвета",
                                "approval_badge_visible": false,
                                "review_status": "pending",
                                "children": [
                                  {
                                    "id": "quality_deja_self",
                                    "title": "Экран «Колеровка»",
                                    "kind": "screen",
                                    "notes": "Данные:\n• База, цвет, партия, исходный рецепт, выкрас / образец.\n• Фактические и дополнительные пигменты, исполнитель, начало / конец колеровки, дельта.\n• Решение по цвету и история доведений.\n\nТекущее задание:\nПроверить цвет и принять решение в текущем задании колеровки\nРоль: Колеровщик производства; при необходимости — колеровщик КМ.\nМесто: Производство, исходная дежа замеса.\n\nДействия:\n• «Цвет принят» — подтвердить соответствие.\n• «На доведение» — сохранить причину и продолжить доведение.\n• «Проблема» — сохранить причину в том же задании.\n\nРезультат:\nКолеровщик сам решает, выпускать цвет или нет. Отдельное лабораторное задание не создаётся. При сложности консультируется с автором рецепта / главным технологом; исходное задание сохраняется.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.",
                                    "open": true,
                                    "links": [
                                      "local_deja_f_230_4928",
                                      "local_deja_f_230_4980",
                                      "local_quality_unfixable_defect_route"
                                    ],
                                    "edge": "Пустое — самостоятельное принятие",
                                    "approval_badge_visible": true,
                                    "screen_task": "Проверить цвет и принять решение в текущем задании колеровки",
                                    "screen_id": "coloring_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          47
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": [
                                      {
                                        "id": "local_deja_f_230_4928",
                                        "title": "Это компонент А затирки?",
                                        "kind": "check",
                                        "open": true,
                                        "links": [
                                          "local_deja_f_230_4932",
                                          "local_deja_colored_a_release_pending"
                                        ],
                                        "edge": "Цвет принят",
                                        "approval_badge_visible": false,
                                        "review_status": "pending",
                                        "children": [
                                          {
                                            "id": "local_deja_f_230_4932",
                                            "title": "Экран «Фасовка»",
                                            "kind": "screen",
                                            "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, продукция, партия, масса, фасовка, тара, план/факт количества; состав комплекта для затирки.\n• Фильтры / сортировка: место фасовки, тип продукции, статус, срок, приоритет.\n\nТекущее задание:\nРасфасовать принятую колерованную продукцию\nРоль: Фасовщик производства; для затирки и пигментной пасты — сотрудник склада ПФ.\nМесто: Производство, зона фасовки; для затирки и пигментной пасты — склад ПФ.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФасовать по исходным позициям; подтвердить фактическое количество, тару и партию. Маркировка — следующим заданием.\n\nПосле фасовки:\nПри полном освобождении ресурса — задание старшему смены на запуск мойки. До её завершения ресурс недоступен. Продукция продолжает маршрут.",
                                            "open": true,
                                            "links": [
                                              "mark_check_local_deja_f_230_4932",
                                              "equipment_wash_decision"
                                            ],
                                            "edge": "Нет",
                                            "approval_badge_visible": false,
                                            "screen_task": "Расфасовать принятую колерованную продукцию",
                                            "screen_id": "packing_tasks",
                                            "review_status": "pending",
                                            "ui_review_status": "pending",
                                            "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                            "approval_sources": [
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                "points": [
                                                  14,
                                                  25
                                                ],
                                                "date": "2026-10-15",
                                                "scope": "assignment role and physical place"
                                              },
                                              {
                                                "document": "https://docs.google.com/document/d/1bS2i0qdXFwkMjFGi_PzyQF0tBPofNzP08rw1OIoEaw4/edit?tab=t.yqvh0lnc737k",
                                                "date": "2026-10-15",
                                                "scope": "Прямое уточнение пользователя: физическое место фасовки и назначение исполнителя"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "mark_check_local_deja_f_230_4932",
                                                "title": "Система: автоматически подготовить макет и документ печати",
                                                "kind": "task",
                                                "notes": "Сформировать этикетки и стикеры автоматически по данным позиции: продукция, фасовка, количество, партия и требования к маркировке, включая кольцо и дополнительный текст при необходимости. Сохранить макет и документ печати в задании маркировки. Стикеры: число товарных ёмкостей + 1 на арбитражный образец; этикетки — по товарной таре.",
                                                "open": true,
                                                "links": [
                                                  "mark_ready_mark_check_local_deja_f_230_4932"
                                                ],
                                                "edge": "Выполнено — Продукция расфасована",
                                                "approval_badge_visible": false,
                                                "review_status": "pending",
                                                "automatic_step": true,
                                                "children": [
                                                  {
                                                    "id": "mark_ready_mark_check_local_deja_f_230_4932",
                                                    "title": "Экран «Маркировка»",
                                                    "kind": "screen",
                                                    "notes": "Данные:\n• Задания: счёт/позиция, продукция, количество, фасовка, партия, место выполнения, макет и статус.\n• Карточка: этикетки и стикеры, документ печати, план/факт и причина проблемы.\n\nТекущее задание:\nНаклеить этикетки и стикеры на колерованную продукцию.\nСтикеры: число товарных ёмкостей + 1 на арбитражный образец; этикетки — по товарной таре.\n\nВход — как здесь оказаться:\n• Из списка заданий маркировки или из обеспечения позиции счёта.\n• Задание создаётся по маршруту; макет и документ печати формируются автоматически по данным позиции.\n• После фасовки / перефасовки либо при переклейке уже готовой ГП. Для маркировки ёмкости переработки — после регистрации материала.\n\nДействия:\n• «Взять в работу» — закрепить исполнителя после готовности продукции.\n• «Напечатать стикеры» — печать сформированного документа по актуальному макету.\n• «Выполнено» — подтвердить фактическое количество маркированной продукции и продолжить цепочку.\n• «Проблема» — указать причину; сохранить факт и показать проблему в исходной позиции/задании.\n\nРезультат:\nМаркировка подтверждена. Требования к макету учитываются автоматически.",
                                                    "open": true,
                                                    "links": [
                                                      "local_deja_f_230_4936"
                                                    ],
                                                    "edge": "Макет и документ печати сформированы",
                                                    "approval_badge_visible": false,
                                                    "screen_task": "Наклеить этикетки и стикеры на колерованную продукцию.",
                                                    "screen_id": "marking",
                                                    "review_status": "pending",
                                                    "ui_review_status": "pending",
                                                    "children": [
                                                      {
                                                        "id": "local_deja_f_230_4936",
                                                        "title": "1С: провести производство колерованной ГП из неколерованной ГП или ПФ, пигментов и добавок",
                                                        "kind": "onec",
                                                        "notes": "После приёмки цвета и завершения фактического расхода провести документ производства. Продукция: заказанная колерованная ГП нужной фасовки. Материалы: исходная неколерованная ГП из вёдер либо ПФ изготовленной базы, фактические пигменты и добавки; новая тара — только если действительно использована. Исходное сырьё уже выпущенного ПФ повторно не списывать. Сохранить исходные партии и партию выпуска. Далее МХ-18 для передачи выпуска на ГП; отдельный документ перемещения этого же выпуска не создавать.",
                                                        "open": true,
                                                        "links": [
                                                          "local_deja_f_262_6911"
                                                        ],
                                                        "edge": "",
                                                        "approval_badge_visible": false,
                                                        "review_status": "pending",
                                                        "children": [
                                                          {
                                                            "id": "local_deja_f_262_6911",
                                                            "title": "1С: оформить МХ-18 — передачу выпущенной продукции с производства на склад ГП",
                                                            "kind": "onec",
                                                            "notes": "Документ передачи оформляется в контексте проведённого производства. Сохранить связь с выпуском, партии и фактическое количество. вторую учётную операцию перемещения не создавать.\nпри передаче произведённой ГП на склад МХ-18 оформляют всегда.",
                                                            "open": true,
                                                            "links": [
                                                              "local_deja_f_262_6910"
                                                            ],
                                                            "edge": "Производство проведено",
                                                            "approval_badge_visible": false,
                                                            "review_status": "approved",
                                                            "approved_scope": "Обязательность МХ-18 при передаче произведённой ГП",
                                                            "approval_sources": [
                                                              {
                                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                                "comment_id": "AAACGqcevZg",
                                                                "author": "Данила",
                                                                "date": "2026-10-08"
                                                              }
                                                            ],
                                                            "children": [
                                                              {
                                                                "id": "local_deja_f_262_6910",
                                                                "title": "Экран «Задания склада»",
                                                                "kind": "screen",
                                                                "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику на перемещение на склад ГП\nРоль: Сотрудник склада — приёмка; старший смены — сдача.\nМесто: Участок выпуска → склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nВыполнить физическое перемещение продукции на склад ГП; подтвердить количество и партии. Оформление документов 1С — отдельный шаг системы.",
                                                                "open": true,
                                                                "links": [
                                                                  "local_deja_f_262_6909"
                                                                ],
                                                                "edge": "МХ-18 оформлена",
                                                                "approval_badge_visible": false,
                                                                "screen_task": "Задание кладовщику на перемещение на склад ГП",
                                                                "screen_id": "warehouse_tasks",
                                                                "review_status": "pending",
                                                                "ui_review_status": "pending",
                                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                "approval_sources": [
                                                                  {
                                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                    "points": [
                                                                      42
                                                                    ],
                                                                    "date": "2026-10-15",
                                                                    "scope": "assignment role and physical place"
                                                                  }
                                                                ],
                                                                "children": [
                                                                  {
                                                                    "id": "local_deja_f_262_6909",
                                                                    "title": "Экран «Задания склада»",
                                                                    "kind": "screen",
                                                                    "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание кладовщику: подготовить позиции к отгрузке\nРоль: Сотрудник склада; руководитель склада.\nМесто: Склад ГП.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nПодготовить уже маркированные позиции к отгрузке. Повторную наклейку этикеток и стикеров не выполнять.",
                                                                    "open": true,
                                                                    "links": [
                                                                      "local_deja_f_262_6912"
                                                                    ],
                                                                    "edge": "Выполнено — Продукция принята на ГП",
                                                                    "approval_badge_visible": false,
                                                                    "screen_task": "Задание кладовщику: подготовить позиции к отгрузке",
                                                                    "screen_id": "warehouse_tasks",
                                                                    "review_status": "pending",
                                                                    "ui_review_status": "pending",
                                                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                                    "approval_sources": [
                                                                      {
                                                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                                        "points": [
                                                                          1,
                                                                          44
                                                                        ],
                                                                        "date": "2026-10-15",
                                                                        "scope": "assignment role and physical place"
                                                                      }
                                                                    ],
                                                                    "children": [
                                                                      {
                                                                        "id": "local_deja_f_262_6912",
                                                                        "title": "Готов к отгрузке",
                                                                        "kind": "result",
                                                                        "open": true,
                                                                        "links": [],
                                                                        "edge": "Выполнено",
                                                                        "approval_badge_visible": false,
                                                                        "review_status": "pending",
                                                                        "children": []
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          },
                                          {
                                            "id": "local_deja_colored_a_release_pending",
                                            "title": "1С: производство колерованного ПФ компонента А",
                                            "kind": "onec",
                                            "notes": "Для собственных стандартных цветов подтверждён выпуск ПФ с номером цвета. Продукция — колерованный компонент А; фактические материалы и склад-получатель нужно согласовать с 1С. Для нестандартного клиентского цвета порядок выпуска также требует уточнения. После колеровки компонент А передают на склад ПФ для фасовки и комплектации.",
                                            "open": true,
                                            "links": [
                                              "local_deja_colored_a_to_pf"
                                            ],
                                            "edge": "Да — компонент А затирки",
                                            "approval_badge_visible": false,
                                            "review_status": "partial",
                                            "approved_scope": "Колерованный ПФ с номером собственного стандартного цвета",
                                            "approval_sources": [
                                              {
                                                "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit",
                                                "comment_id": "AAACGqcevZs",
                                                "author": "Данила",
                                                "date": "2026-10-08"
                                              }
                                            ],
                                            "children": [
                                              {
                                                "id": "local_deja_colored_a_to_pf",
                                                "title": "Экран «Задания склада»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nЗадание сотруднику склада: передать принятый компонент А на склад ПФ для комплектации\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nФизическая передача с производства к месту комплектации на складе ПФ. Подтвердить массу, партию и получение. Если А уже доставлен, повторную передачу не выдавать. Документ перемещения в 1С автоматически не создавать: физическое место и склад учёта различаются; необходимость учётного движения А требует подтверждения 1С.",
                                                "open": true,
                                                "links": [
                                                  "local_deja_f_241_5194"
                                                ],
                                                "edge": "Далее — передача на склад ПФ",
                                                "approval_badge_visible": false,
                                                "screen_task": "Задание сотруднику склада: передать принятый компонент А на склад ПФ для комплектации",
                                                "screen_id": "warehouse_tasks",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "children": [
                                                  {
                                                    "id": "local_deja_f_241_5194",
                                                    "title": "Схема «Комплектация затирки»",
                                                    "kind": "route",
                                                    "open": true,
                                                    "links": [
                                                      "f_241_5170"
                                                    ],
                                                    "edge": "Выполнено — Передача подтверждена",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "route_target_id": "f_241_5170",
                                                    "children": []
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "id": "local_deja_f_230_4980",
                                        "title": "Экран «Колеровка»",
                                        "kind": "screen",
                                        "notes": "Данные:\n• Причина отклонения, дополнительные пигменты / добавки, количество, история фактического расхода.\n\nТекущее задание:\nУказать пигменты и добавки для доведения цвета в том же задании\nРоль: Колеровщик производства; при необходимости — колеровщик КМ.\nМесто: Производство, исходная дежа замеса.\n\nДействия:\n• «Подтвердить доведение» — перейти к обеспечению добавок.\n• «Проблема» — указать причину.\n\nРезультат:\nДоведение выполняет колеровщик. При необходимости — консультация с автором рецепта / технологом. После доведения повторяется проверка цвета; новый экземпляр задания не создаётся.",
                                        "open": true,
                                        "links": [
                                          "local_deja_correction_supply"
                                        ],
                                        "edge": "На доведение",
                                        "approval_badge_visible": false,
                                        "screen_task": "Указать пигменты и добавки для доведения цвета в том же задании",
                                        "screen_id": "coloring_tasks",
                                        "review_status": "pending",
                                        "ui_review_status": "pending",
                                        "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                        "approval_sources": [
                                          {
                                            "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                            "points": [
                                              47
                                            ],
                                            "date": "2026-10-15",
                                            "scope": "assignment role and physical place"
                                          }
                                        ],
                                        "children": [
                                          {
                                            "id": "local_deja_correction_supply",
                                            "title": "Пигменты и добавки для доведения есть на производстве?",
                                            "kind": "check",
                                            "notes": "Проверить назначенные количества с учётом резервов и склада учёта 1С. Если материал отсутствует и на складе сырья, ждать снабжения; доведение не подтверждать до получения.",
                                            "open": true,
                                            "links": [
                                              "local_deja_correction_apply",
                                              "local_deja_correction_move"
                                            ],
                                            "edge": "Выполнено — Доведение назначено",
                                            "approval_badge_visible": false,
                                            "review_status": "pending",
                                            "children": [
                                              {
                                                "id": "local_deja_correction_apply",
                                                "title": "Экран «Колеровка»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: счёт / позиция, база и источник, цвет, рецепт, масса / число вёдер, партии, пигменты и добавки, план/факт расхода и результат проверки цвета.\n• Фильтры / сортировка: КМ, производство или дежа; рабочее место, статус, срок, приоритет.\n\nТекущее задание:\nКолеровщик в деже: довести цвет; записать расход и передать повторную пробу\nРоль: Колеровщик производства; при необходимости — колеровщик КМ.\nМесто: Производство, исходная дежа замеса.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nВнести только назначенные дополнительные количества. Сохранить партии, фактический расход и комментарии по исходному заданию. Затем повторный ОТК; не повторять всю первоначальную колеровку.",
                                                "open": true,
                                                "links": [
                                                  "local_deja_f_230_4924"
                                                ],
                                                "edge": "Да",
                                                "approval_badge_visible": false,
                                                "screen_task": "Колеровщик в деже: довести цвет; записать расход и передать повторную пробу",
                                                "screen_id": "coloring_tasks",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                                "approval_sources": [
                                                  {
                                                    "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                                    "points": [
                                                      47
                                                    ],
                                                    "date": "2026-10-15",
                                                    "scope": "assignment role and physical place"
                                                  }
                                                ],
                                                "children": []
                                              },
                                              {
                                                "id": "local_deja_correction_move",
                                                "title": "Экран «Задания склада»",
                                                "kind": "screen",
                                                "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: доставить недостающие пигменты и добавки для доведения\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.\n\nПравила процесса:\nСо склада сырья на производство. Передать только дефицит, подтвердить фактические материалы и количества.",
                                                "open": true,
                                                "links": [
                                                  "local_deja_correction_onec"
                                                ],
                                                "edge": "Нет — доставить дефицит",
                                                "approval_badge_visible": false,
                                                "screen_task": "Кладовщик: доставить недостающие пигменты и добавки для доведения",
                                                "screen_id": "warehouse_tasks",
                                                "review_status": "pending",
                                                "ui_review_status": "pending",
                                                "children": [
                                                  {
                                                    "id": "local_deja_correction_onec",
                                                    "title": "1С: переместить недостающие материалы для доведения на Производство",
                                                    "kind": "onec",
                                                    "notes": "Со склада сырья на склад Производство. Если материалы уже учтены на Производстве, отдельное учётное перемещение не создавать. Фактический расход добавок включить в итоговое производство.",
                                                    "open": true,
                                                    "links": [
                                                      "local_deja_correction_apply"
                                                    ],
                                                    "edge": "Выполнено — Материалы доставлены",
                                                    "approval_badge_visible": false,
                                                    "review_status": "pending",
                                                    "children": []
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "id": "quality_deja_lab",
                                    "title": "Экран «ОТК»",
                                    "kind": "screen",
                                    "notes": "Роль: Сотрудник ОТК.\nМесто: Лаборатория ОТК.\n\nДанные:\n• Текущий счёт / позиция, партия, поле «Исходный счёт» и прежний образец.\n• Старый и новый выкрасы рядом, результат сравнения и итоговое решение.\n\nВход:\nПоле «Исходный счёт» заполнено; после колеровки пробу передают в лабораторию. Задание остаётся в очереди ОТК до решения.\n\nЗадание:\nСделать выкрасы и обсудить результат с ответственным менеджером / производством. Переписку проводят самостоятельно в Битриксе; отдельного экрана менеджера и автоматической отправки сообщений нет.\n\nДействия:\n• «Взять в работу» — начать лабораторную проверку.\n• «Продолжить маршрут» — зафиксировать положительное решение после согласования и разрешить следующий этап.\n• «Отправить на доведение» — указать согласованные замечания и вернуть текущую колеровку на доведение.\n• «Проблема» — указать причину и оставить задание на ожидании.\n\nРезультат:\nРешение фиксирует лаборатория в том же задании ОТК. До решения маршрут не продолжается. После доведения повторная проба возвращается на проверку; сохраняются история, счёт, партия и исходное задание.\n\nНеисправимый брак:\n• Кнопка «Исправить нельзя» — указать причину и забракованный объём; перейти в существующую ветку брака.\n• Сохранить исходное задание и партию. Решение о переработке принимается отдельно.\n\nПаспорт итоговой продукции:\nСохранить связь принятого цвета, исходной базы и итоговой партии. Правило наследования/формирования итогового паспорта после колеровки требует уточнения.\n\nВопрос: согласовать формат поля итогового решения лаборатории.",
                                    "open": true,
                                    "links": [
                                      "local_deja_f_230_4928",
                                      "local_deja_f_230_4980",
                                      "local_quality_unfixable_defect_route"
                                    ],
                                    "edge": "Заполнено — повторение цвета",
                                    "approval_badge_visible": true,
                                    "screen_task": "Сравнить выкрасы; после согласования продолжить маршрут или вернуть на доведение",
                                    "screen_id": "quality_tasks",
                                    "review_status": "pending",
                                    "ui_review_status": "pending",
                                    "approved_scope": "Задание: роль и место по подтверждённым ответам, 15.10.2026",
                                    "approval_sources": [
                                      {
                                        "document": "https://docs.google.com/document/d/1Ntr---4zZwMs9tB4augJXX60sO7YnmjbJVDA0QyFlVM/edit?tab=t.c8aj3hlyz7dv",
                                        "points": [
                                          11
                                        ],
                                        "date": "2026-10-15",
                                        "scope": "assignment role and physical place"
                                      }
                                    ],
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "local_deja_pigment_move",
                        "title": "Экран «Задания склада»",
                        "kind": "screen",
                        "notes": "Данные:\n• Список заданий и карточка: Склад, источник/получатель, продукция, партия, план/факт количества.\n• Фильтры / сортировка: Склады ПФ, ГП, сырья и переработки; статус, срок, приоритет.\n\nТекущее задание:\nКладовщик: доставить недостающие пигменты и добавки на производство\nРоль: Сотрудник склада; конкретный склад указан в задании.\nМесто: указано в задании; неподтверждённые места требуют уточнения.\n\nДействия:\n• «Взять в работу».\n• «Выполнено».\n• «Проблема» — указать причину.",
                        "open": true,
                        "links": [
                          "local_deja_pigment_transfer"
                        ],
                        "edge": "Нет — пополнить",
                        "approval_badge_visible": false,
                        "screen_task": "Кладовщик: доставить недостающие пигменты и добавки на производство",
                        "screen_id": "warehouse_tasks",
                        "review_status": "pending",
                        "ui_review_status": "pending",
                        "children": [
                          {
                            "id": "local_deja_pigment_transfer",
                            "title": "1С: переместить недостающие пигменты и добавки на склад Производство",
                            "kind": "onec",
                            "notes": "Только недостающее количество со склада сырья. Уже учтённые на Производстве материалы повторно не перемещать.",
                            "open": true,
                            "links": [
                              "local_deja_coloring_materials"
                            ],
                            "edge": "Выполнено — Материалы доставлены",
                            "approval_badge_visible": false,
                            "review_status": "pending",
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "relationships": [
    {
      "end1Id": "root",
      "end2Id": "f_227_4031",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_262_6981",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_257_6365",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_257_6364",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_258_5065",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_227_4068",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_230_4726",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_241_5098",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_241_5114",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "f_269_5088",
      "label": ""
    },
    {
      "end1Id": "root",
      "end2Id": "local_deja_coloring_route",
      "label": ""
    },
    {
      "end1Id": "f_227_4031",
      "end2Id": "f_227_4040",
      "label": ""
    },
    {
      "end1Id": "f_227_4040",
      "end2Id": "f_227_4034",
      "label": "Наша"
    },
    {
      "end1Id": "f_227_4033",
      "end2Id": "f_227_4035",
      "label": "Тип продукции — остальное"
    },
    {
      "end1Id": "f_227_4034",
      "end2Id": "f_227_4038",
      "label": "Количество в килограммах"
    },
    {
      "end1Id": "f_227_4035",
      "end2Id": "f_227_4049",
      "label": "Без цвета"
    },
    {
      "end1Id": "f_227_4038",
      "end2Id": "local_initial_gp_partial_reserve",
      "label": "Нет — полное покрытие отсутствует"
    },
    {
      "end1Id": "f_227_4048",
      "end2Id": "f_227_4033",
      "label": ""
    },
    {
      "end1Id": "f_227_4049",
      "end2Id": "f_227_4058",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4049",
      "end2Id": "f_265_5077",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4058",
      "end2Id": "f_227_4063",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4058",
      "end2Id": "local_gp_other_pack_check",
      "label": "Нет — ПФ недостаточно"
    },
    {
      "end1Id": "f_227_4063",
      "end2Id": "f_227_4133",
      "label": ""
    },
    {
      "end1Id": "f_265_5077",
      "end2Id": "local_5f255159617746bd9e46f86e07d2d037",
      "label": "Используем"
    },
    {
      "end1Id": "f_265_5077",
      "end2Id": "local_rework_decision_timer_30m",
      "label": "Таймер"
    },
    {
      "end1Id": "f_262_6981",
      "end2Id": "f_227_4054",
      "label": ""
    },
    {
      "end1Id": "f_262_6981",
      "end2Id": "local_colored_grout_route",
      "label": ""
    },
    {
      "end1Id": "f_262_6981",
      "end2Id": "f_241_5170",
      "label": ""
    },
    {
      "end1Id": "f_262_6981",
      "end2Id": "f_258_5068",
      "label": ""
    },
    {
      "end1Id": "f_227_4054",
      "end2Id": "f_227_4145",
      "label": ""
    },
    {
      "end1Id": "f_227_4145",
      "end2Id": "f_227_4131",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4145",
      "end2Id": "f_227_4147",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4144",
      "end2Id": "f_227_4146",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4146",
      "end2Id": "f_227_4148",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4146",
      "end2Id": "f_227_4130",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4148",
      "end2Id": "f_227_4152",
      "label": ""
    },
    {
      "end1Id": "f_227_4147",
      "end2Id": "local_b93b71843809415bad27c69d83255b95",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4131",
      "end2Id": "local_grout_clear_route",
      "label": "Нет — затирка без цвета"
    },
    {
      "end1Id": "f_227_4131",
      "end2Id": "f_227_4154",
      "label": "Да — есть цвет"
    },
    {
      "end1Id": "f_227_4154",
      "end2Id": "local_grout_clear_gp_kit",
      "label": "Да — в заказе есть шприцы"
    },
    {
      "end1Id": "f_227_4155",
      "end2Id": "f_241_5130",
      "label": ""
    },
    {
      "end1Id": "f_227_4157",
      "end2Id": "f_227_4159",
      "label": ""
    },
    {
      "end1Id": "f_227_4159",
      "end2Id": "f_227_4161",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4159",
      "end2Id": "f_227_4170",
      "label": "Нет: изготовить шприцы"
    },
    {
      "end1Id": "f_227_4161",
      "end2Id": "f_227_4169",
      "label": ""
    },
    {
      "end1Id": "f_227_4169",
      "end2Id": "f_227_4171",
      "label": ""
    },
    {
      "end1Id": "f_227_4171",
      "end2Id": "f_241_5186",
      "label": ""
    },
    {
      "end1Id": "f_227_4170",
      "end2Id": "f_258_5072",
      "label": ""
    },
    {
      "end1Id": "f_241_5170",
      "end2Id": "f_230_5034",
      "label": ""
    },
    {
      "end1Id": "f_230_5034",
      "end2Id": "f_230_5038",
      "label": ""
    },
    {
      "end1Id": "f_230_5038",
      "end2Id": "f_262_7031",
      "label": "Да"
    },
    {
      "end1Id": "f_230_5038",
      "end2Id": "f_230_5078",
      "label": "Нет"
    },
    {
      "end1Id": "f_262_7031",
      "end2Id": "f_262_7102",
      "label": "Да — есть или не нужны"
    },
    {
      "end1Id": "f_262_7031",
      "end2Id": "f_262_7058",
      "label": "Нет — нужные шприцы отсутствуют"
    },
    {
      "end1Id": "f_262_7102",
      "end2Id": "f_262_7262",
      "label": "Да"
    },
    {
      "end1Id": "f_262_7102",
      "end2Id": "f_262_7299",
      "label": "Нет — расфасовать"
    },
    {
      "end1Id": "f_262_7262",
      "end2Id": "mark_ready_f_262_7262",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "f_230_5042",
      "end2Id": "f_230_5046",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_230_5046",
      "end2Id": "f_230_5050",
      "label": ""
    },
    {
      "end1Id": "f_230_5050",
      "end2Id": "local_grout_assembly_output_onec",
      "label": "Комплекты выпущены"
    },
    {
      "end1Id": "f_262_7160",
      "end2Id": "f_262_7159",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_262_7159",
      "end2Id": "local_c4fc033279a04f0c8b11f7929854de1e",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_258_5068",
      "end2Id": "f_227_4163",
      "label": ""
    },
    {
      "end1Id": "f_227_4163",
      "end2Id": "local_syringe_material_check",
      "label": "Подтвердить рецепт / решение — Рецепт и объём заданы"
    },
    {
      "end1Id": "f_227_4165",
      "end2Id": "f_230_5118",
      "label": "Колеровка выполнена — перейти к проверке цвета"
    },
    {
      "end1Id": "f_230_5118",
      "end2Id": "quality_syringe_self",
      "label": "Пустое — самостоятельное принятие"
    },
    {
      "end1Id": "f_230_5118",
      "end2Id": "quality_syringe_lab",
      "label": "Заполнено — повторение цвета"
    },
    {
      "end1Id": "f_227_4167",
      "end2Id": "local_syringe_labels",
      "label": "Выполнено — Факт фасовки подтверждён"
    },
    {
      "end1Id": "f_257_6365",
      "end2Id": "f_227_4050",
      "label": ""
    },
    {
      "end1Id": "f_227_4050",
      "end2Id": "f_227_4075",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4050",
      "end2Id": "f_271_5169",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4075",
      "end2Id": "f_227_4094",
      "label": "Подтвердить рецепт / решение — Решение"
    },
    {
      "end1Id": "f_227_4094",
      "end2Id": "f_227_4096",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4094",
      "end2Id": "f_227_4101",
      "label": "Нет / срок истёк"
    },
    {
      "end1Id": "f_227_4096",
      "end2Id": "f_227_4097",
      "label": ""
    },
    {
      "end1Id": "f_227_4097",
      "end2Id": "f_227_4098",
      "label": ""
    },
    {
      "end1Id": "f_227_4098",
      "end2Id": "f_227_4099",
      "label": "Да — ПФ достаточно"
    },
    {
      "end1Id": "f_227_4098",
      "end2Id": "f_227_4100",
      "label": "Нет — ПФ недостаточно"
    },
    {
      "end1Id": "f_227_4099",
      "end2Id": "f_227_4107",
      "label": ""
    },
    {
      "end1Id": "f_227_4107",
      "end2Id": "f_241_5154",
      "label": "После подготовки ПФ"
    },
    {
      "end1Id": "f_227_4100",
      "end2Id": "f_241_5050",
      "label": ""
    },
    {
      "end1Id": "f_227_4101",
      "end2Id": "f_227_4119",
      "label": ""
    },
    {
      "end1Id": "f_271_5169",
      "end2Id": "f_300_6438",
      "label": "Да — образец 1 кг"
    },
    {
      "end1Id": "f_271_5169",
      "end2Id": "f_227_4198",
      "label": "Нет — обычный объём"
    },
    {
      "end1Id": "f_227_4198",
      "end2Id": "f_227_4102",
      "label": "КМ свободнее; не штукатурка"
    },
    {
      "end1Id": "f_227_4102",
      "end2Id": "f_227_4104",
      "label": ""
    },
    {
      "end1Id": "f_227_4104",
      "end2Id": "f_227_4059",
      "label": "Да — допустимо для КМ"
    },
    {
      "end1Id": "f_227_4104",
      "end2Id": "f_227_4060",
      "label": "Нет — недопустимо для КМ"
    },
    {
      "end1Id": "f_227_4060",
      "end2Id": "f_227_4065",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4060",
      "end2Id": "f_227_4203",
      "label": "Нет: штукатурка"
    },
    {
      "end1Id": "f_227_4060",
      "end2Id": "f_227_4132",
      "label": "Нет: остальные"
    },
    {
      "end1Id": "f_227_4065",
      "end2Id": "f_227_4106",
      "label": "Источник: ПФ"
    },
    {
      "end1Id": "f_227_4106",
      "end2Id": "f_241_5162",
      "label": "После подготовки ПФ"
    },
    {
      "end1Id": "f_227_4203",
      "end2Id": "local_colored_plaster_gp_reserve",
      "label": "Да — ГП достаточно"
    },
    {
      "end1Id": "f_227_4203",
      "end2Id": "local_plaster_new_batch_route",
      "label": "Нет — нужен новый замес"
    },
    {
      "end1Id": "f_227_4059",
      "end2Id": "f_227_4064",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4059",
      "end2Id": "f_227_4061",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4064",
      "end2Id": "f_227_4105",
      "label": "ГП уже в вёдрах: без фасовки"
    },
    {
      "end1Id": "f_227_4105",
      "end2Id": "f_241_5106",
      "label": ""
    },
    {
      "end1Id": "f_227_4061",
      "end2Id": "local_colored_km_pf_reserve",
      "label": "Да — ПФ достаточно"
    },
    {
      "end1Id": "f_271_5173",
      "end2Id": "f_305_6994",
      "label": "Подтвердить рецепт / решение — Рецепт и место подтверждены"
    },
    {
      "end1Id": "f_257_6364",
      "end2Id": "f_227_4043",
      "label": ""
    },
    {
      "end1Id": "f_257_6364",
      "end2Id": "local_purchased_product_route",
      "label": ""
    },
    {
      "end1Id": "f_227_4043",
      "end2Id": "f_227_4177",
      "label": ""
    },
    {
      "end1Id": "f_227_4177",
      "end2Id": "f_227_4199",
      "label": ""
    },
    {
      "end1Id": "f_227_4199",
      "end2Id": "f_227_4044",
      "label": "Полностью подходит"
    },
    {
      "end1Id": "f_227_4199",
      "end2Id": "f_227_4045",
      "label": "Есть объём, но другая фасовка"
    },
    {
      "end1Id": "f_227_4199",
      "end2Id": "f_227_4046",
      "label": "Есть объём, но другая этикетка"
    },
    {
      "end1Id": "f_227_4044",
      "end2Id": "local_gp_sticker_required",
      "label": "ГП полностью подходит"
    },
    {
      "end1Id": "f_227_4081",
      "end2Id": "mark_ready_f_227_4081",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "f_227_4076",
      "end2Id": "f_227_4092",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4092",
      "end2Id": "f_227_4093",
      "label": ""
    },
    {
      "end1Id": "f_227_4045",
      "end2Id": "f_227_4077",
      "label": ""
    },
    {
      "end1Id": "f_227_4077",
      "end2Id": "mark_ready_f_227_4077",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "f_227_4084",
      "end2Id": "local_repacking_gp_production_transfer",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4090",
      "end2Id": "local_repacking_parallel_outputs",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4089",
      "end2Id": "local_repacking_prepare_ready",
      "label": "Выполнено — ГП физически принята"
    },
    {
      "end1Id": "f_227_4046",
      "end2Id": "f_227_4078",
      "label": ""
    },
    {
      "end1Id": "f_227_4078",
      "end2Id": "mark_ready_f_227_4078",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "f_227_4123",
      "end2Id": "f_227_4125",
      "label": "Есть"
    },
    {
      "end1Id": "f_227_4123",
      "end2Id": "f_227_4188",
      "label": "Нет"
    },
    {
      "end1Id": "f_258_5065",
      "end2Id": "pilot_pf_order_supply",
      "label": "ПФ выбран; обеспечение рассчитано"
    },
    {
      "end1Id": "f_227_4079",
      "end2Id": "mark_ready_f_227_4079",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "f_227_4085",
      "end2Id": "mark_apply_f_227_4085",
      "label": "Фасовка выполнена"
    },
    {
      "end1Id": "f_227_4222",
      "end2Id": "f_227_4221",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4221",
      "end2Id": "f_227_4229",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4228",
      "end2Id": "pilot_pf_gp_mh18",
      "label": "Производство проведено"
    },
    {
      "end1Id": "f_227_4068",
      "end2Id": "f_227_4095",
      "label": ""
    },
    {
      "end1Id": "f_227_4095",
      "end2Id": "local_new_batch_plan_ready",
      "label": "Параметры замеса определены"
    },
    {
      "end1Id": "f_227_4223",
      "end2Id": "f_227_4224",
      "label": "Выполнено — Сырьё доставлено"
    },
    {
      "end1Id": "f_227_4237",
      "end2Id": "f_227_4239",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4239",
      "end2Id": "f_227_4243",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4243",
      "end2Id": "f_227_4244",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_227_4244",
      "end2Id": "f_227_4245",
      "label": "Назначить доведение"
    },
    {
      "end1Id": "f_227_4244",
      "end2Id": "f_227_4248",
      "label": "Принять партию"
    },
    {
      "end1Id": "f_227_4244",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя"
    },
    {
      "end1Id": "f_227_4245",
      "end2Id": "local_new_batch_extra_available",
      "label": "Выполнено — Доведение назначено"
    },
    {
      "end1Id": "f_227_4248",
      "end2Id": "quality_generate_passport",
      "label": "Показатели приняты"
    },
    {
      "end1Id": "f_230_4702",
      "end2Id": "local_new_batch_grout_type",
      "label": "Выпуск базы ПФ учтён"
    },
    {
      "end1Id": "f_227_4249",
      "end2Id": "local_new_batch_part_destination",
      "label": "Подтвердить план — Объёмы закреплены за позициями"
    },
    {
      "end1Id": "f_227_4257",
      "end2Id": "f_227_4259",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4257",
      "end2Id": "local_resume_coloring_after_batch",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4259",
      "end2Id": "mark_ready_f_227_4259",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "f_227_4261",
      "end2Id": "mark_apply_f_227_4261",
      "label": "Выполнено — Фасовка выполнена"
    },
    {
      "end1Id": "f_227_4261",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "f_227_4264",
      "end2Id": "f_227_4263",
      "label": "Выполнено — Продукция передана на ГП"
    },
    {
      "end1Id": "f_227_4263",
      "end2Id": "f_227_4267",
      "label": "Выполнено — Подготовка завершена"
    },
    {
      "end1Id": "f_227_4266",
      "end2Id": "f_227_4264",
      "label": "МХ-18 оформлена"
    },
    {
      "end1Id": "f_230_4726",
      "end2Id": "f_274_5232",
      "label": "Расчёт базы для каждой позиции"
    },
    {
      "end1Id": "f_230_4728",
      "end2Id": "f_230_4732",
      "label": "На замес — только недостающая масса"
    },
    {
      "end1Id": "f_230_4732",
      "end2Id": "f_273_5194",
      "label": "Да"
    },
    {
      "end1Id": "f_230_4732",
      "end2Id": "f_273_5198",
      "label": "Нет"
    },
    {
      "end1Id": "f_273_5194",
      "end2Id": "f_230_4736",
      "label": "Подтвердить план"
    },
    {
      "end1Id": "f_230_4736",
      "end2Id": "local_batch_rework_approved",
      "label": "Совместимые потребности собраны"
    },
    {
      "end1Id": "f_230_4744",
      "end2Id": "f_230_4748",
      "label": "Подтвердить план"
    },
    {
      "end1Id": "f_230_4748",
      "end2Id": "f_273_5246",
      "label": "Подтвердить план — План подтверждён"
    },
    {
      "end1Id": "f_274_5232",
      "end2Id": "local_batch_colored_pf_mass",
      "label": "Колерованная"
    },
    {
      "end1Id": "f_274_5232",
      "end2Id": "local_batch_uncolored_pf_mass",
      "label": "Неколерованная"
    },
    {
      "end1Id": "f_241_5098",
      "end2Id": "f_230_4798",
      "label": ""
    },
    {
      "end1Id": "f_230_4798",
      "end2Id": "f_230_4814",
      "label": ""
    },
    {
      "end1Id": "f_230_4814",
      "end2Id": "local_km_pigment_supply_check",
      "label": "Подтвердить рецепт / решение — Рецепт подтверждён"
    },
    {
      "end1Id": "f_230_4802",
      "end2Id": "local_km_gp_transfer_onec",
      "label": "ГП"
    },
    {
      "end1Id": "f_230_4802",
      "end2Id": "local_km_base_to_production_onec",
      "label": "ПФ"
    },
    {
      "end1Id": "f_230_4802",
      "end2Id": "local_km_new_batch_fill",
      "label": "Новый замес; база принята ОТК"
    },
    {
      "end1Id": "f_230_4810",
      "end2Id": "f_230_4818",
      "label": "Выполнено — Приёмка подтверждена"
    },
    {
      "end1Id": "f_230_4818",
      "end2Id": "f_230_4822",
      "label": "Колеровка выполнена — перейти к проверке цвета"
    },
    {
      "end1Id": "f_230_4822",
      "end2Id": "quality_km_self",
      "label": "Пустое — самостоятельное принятие"
    },
    {
      "end1Id": "f_230_4822",
      "end2Id": "quality_km_lab",
      "label": "Заполнено — повторение цвета"
    },
    {
      "end1Id": "f_230_4826",
      "end2Id": "mark_ready_f_230_4826",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "f_230_4830",
      "end2Id": "f_262_6523",
      "label": "Производство проведено"
    },
    {
      "end1Id": "f_262_6522",
      "end2Id": "f_262_6521",
      "label": "Выполнено — Продукция принята на ГП"
    },
    {
      "end1Id": "f_262_6523",
      "end2Id": "f_262_6522",
      "label": "МХ-18 оформлена"
    },
    {
      "end1Id": "f_262_6521",
      "end2Id": "f_262_6524",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_230_4878",
      "end2Id": "local_km_correction_supply",
      "label": "Выполнено — Доведение назначено"
    },
    {
      "end1Id": "f_241_5114",
      "end2Id": "f_230_4904",
      "label": ""
    },
    {
      "end1Id": "f_230_4904",
      "end2Id": "f_230_4916",
      "label": ""
    },
    {
      "end1Id": "f_230_4916",
      "end2Id": "local_prod_pigment_supply_check",
      "label": "Подтвердить рецепт / решение — Рецепт подтверждён"
    },
    {
      "end1Id": "f_230_4908",
      "end2Id": "f_230_4920",
      "label": "Выполнено — Приёмка подтверждена"
    },
    {
      "end1Id": "f_230_4912",
      "end2Id": "local_prod_coloring_rework_check",
      "label": "Подготовка ПФ завершена"
    },
    {
      "end1Id": "f_230_4920",
      "end2Id": "f_230_4924",
      "label": "Колеровка выполнена — перейти к проверке цвета"
    },
    {
      "end1Id": "f_230_4924",
      "end2Id": "quality_prod_self",
      "label": "Пустое — самостоятельное принятие"
    },
    {
      "end1Id": "f_230_4924",
      "end2Id": "quality_prod_lab",
      "label": "Заполнено — повторение цвета"
    },
    {
      "end1Id": "f_230_4928",
      "end2Id": "f_230_4932",
      "label": "Нет"
    },
    {
      "end1Id": "f_230_4928",
      "end2Id": "local_prod_colored_a_release_pending",
      "label": "Да — компонент А затирки"
    },
    {
      "end1Id": "f_230_4932",
      "end2Id": "mark_check_f_230_4932",
      "label": "Выполнено — Продукция расфасована"
    },
    {
      "end1Id": "f_230_4936",
      "end2Id": "f_262_6911",
      "label": "Производство проведено"
    },
    {
      "end1Id": "f_262_6910",
      "end2Id": "f_262_6909",
      "label": "Выполнено — Продукция принята на ГП"
    },
    {
      "end1Id": "f_262_6911",
      "end2Id": "f_262_6910",
      "label": "МХ-18 оформлена"
    },
    {
      "end1Id": "f_262_6909",
      "end2Id": "f_262_6912",
      "label": "Выполнено"
    },
    {
      "end1Id": "f_230_4980",
      "end2Id": "local_prod_correction_supply",
      "label": "Выполнено — Доведение назначено"
    },
    {
      "end1Id": "f_269_5088",
      "end2Id": "f_269_5090",
      "label": "Брак"
    },
    {
      "end1Id": "f_269_5088",
      "end2Id": "f_269_5094",
      "label": "Возврат"
    },
    {
      "end1Id": "f_269_5090",
      "end2Id": "local_defect_notify_otk",
      "label": "Выполнено — Брак зафиксирован"
    },
    {
      "end1Id": "f_269_5098",
      "end2Id": "f_269_5110",
      "label": "Выполнено — Заявка создана"
    },
    {
      "end1Id": "f_269_5110",
      "end2Id": "local_defect_gp_release_order",
      "label": "На ГП"
    },
    {
      "end1Id": "f_269_5110",
      "end2Id": "f_269_5134",
      "label": "На переработку"
    },
    {
      "end1Id": "f_269_5110",
      "end2Id": "f_269_5126",
      "label": "На доведение"
    },
    {
      "end1Id": "f_269_5110",
      "end2Id": "f_269_5118",
      "label": "Решение не принято"
    },
    {
      "end1Id": "f_269_5134",
      "end2Id": "f_269_5142",
      "label": "Выполнено — Запись создана"
    },
    {
      "end1Id": "f_269_5142",
      "end2Id": "mark_check_rework",
      "label": "Выполнено — Запись создана; номер присвоен"
    },
    {
      "end1Id": "f_269_5150",
      "end2Id": "f_269_5158",
      "label": "Выполнено — Материал передан"
    },
    {
      "end1Id": "f_269_5158",
      "end2Id": "f_269_5166",
      "label": "Выполнено — Приёмка сохранена"
    },
    {
      "end1Id": "f_269_5166",
      "end2Id": "f_269_5174",
      "label": "Показать в реестре подбора"
    },
    {
      "end1Id": "f_269_5182",
      "end2Id": "local_rework_pigment_account_pending",
      "label": "База учтена"
    },
    {
      "end1Id": "f_269_5094",
      "end2Id": "local_return_onec_pending",
      "label": "Выполнено — Возврат фактически принят"
    },
    {
      "end1Id": "local_repacking_gp_production_transfer",
      "end2Id": "f_227_4090",
      "label": ""
    },
    {
      "end1Id": "local_repacking_label_task",
      "end2Id": "local_repacking_main_production",
      "label": "Фасовка и маркировка завершены"
    },
    {
      "end1Id": "local_repacking_remainder_destination",
      "end2Id": "local_2072f40c1e824f81b2482a3720797b08",
      "label": "Есть остаток, на ГП"
    },
    {
      "end1Id": "local_repacking_remainder_destination",
      "end2Id": "local_14565bca119a4b0a8cb1781e02cad8a7",
      "label": "Есть остаток, на ПФ"
    },
    {
      "end1Id": "local_repacking_remainder_destination",
      "end2Id": "local_repacking_no_remainder",
      "label": "Без остатка"
    },
    {
      "end1Id": "local_purchased_product_route",
      "end2Id": "f_227_4123",
      "label": ""
    },
    {
      "end1Id": "f_300_6438",
      "end2Id": "f_271_5173",
      "label": "Да — база на ГП"
    },
    {
      "end1Id": "f_300_6438",
      "end2Id": "f_300_6454",
      "label": "Нет — проверить ПФ"
    },
    {
      "end1Id": "f_300_6454",
      "end2Id": "local_sample_missing_base_recipe",
      "label": "Нет — нужна новая база"
    },
    {
      "end1Id": "f_305_6994",
      "end2Id": "local_sample_reserved_source",
      "label": "База зарезервирована"
    },
    {
      "end1Id": "local_colored_km_pf_reserve",
      "end2Id": "local_colored_km_pf_supply",
      "label": "Назначена КМ"
    },
    {
      "end1Id": "local_large_batch_color_allocation",
      "end2Id": "local_keep_largest_colored_base_in_deja",
      "label": "Да"
    },
    {
      "end1Id": "local_large_batch_color_allocation",
      "end2Id": "local_other_colored_base_container",
      "label": "Нет"
    },
    {
      "end1Id": "local_resume_coloring_after_batch",
      "end2Id": "local_sample_fresh_batch_destination",
      "label": "Да — назначение сохранено"
    },
    {
      "end1Id": "local_resume_coloring_after_batch",
      "end2Id": "local_large_batch_color_allocation",
      "label": "Нет — выбрать по частям замеса"
    },
    {
      "end1Id": "local_sample_missing_base_recipe",
      "end2Id": "local_sample_new_batch_route",
      "label": "Подтвердить рецепт / решение — Рецепт и место подтверждены"
    },
    {
      "end1Id": "local_deja_coloring_route",
      "end2Id": "local_deja_coloring_ready",
      "label": ""
    },
    {
      "end1Id": "local_deja_coloring_ready",
      "end2Id": "local_deja_coloring_recipe",
      "label": ""
    },
    {
      "end1Id": "local_deja_coloring_recipe",
      "end2Id": "local_deja_pigment_check",
      "label": "Подтвердить рецепт / решение — Рецепт подтверждён"
    },
    {
      "end1Id": "local_deja_coloring_materials",
      "end2Id": "local_deja_f_230_4920",
      "label": "Материалы готовы"
    },
    {
      "end1Id": "local_deja_f_230_4920",
      "end2Id": "local_deja_f_230_4924",
      "label": "Колеровка выполнена — перейти к проверке цвета"
    },
    {
      "end1Id": "local_deja_f_230_4924",
      "end2Id": "quality_deja_self",
      "label": "Пустое — самостоятельное принятие"
    },
    {
      "end1Id": "local_deja_f_230_4924",
      "end2Id": "quality_deja_lab",
      "label": "Заполнено — повторение цвета"
    },
    {
      "end1Id": "local_deja_f_230_4928",
      "end2Id": "local_deja_f_230_4932",
      "label": "Нет"
    },
    {
      "end1Id": "local_deja_f_230_4928",
      "end2Id": "local_deja_colored_a_release_pending",
      "label": "Да — компонент А затирки"
    },
    {
      "end1Id": "local_deja_f_230_4932",
      "end2Id": "mark_check_local_deja_f_230_4932",
      "label": "Выполнено — Продукция расфасована"
    },
    {
      "end1Id": "local_deja_f_230_4936",
      "end2Id": "local_deja_f_262_6911",
      "label": "Производство проведено"
    },
    {
      "end1Id": "local_deja_f_262_6910",
      "end2Id": "local_deja_f_262_6909",
      "label": "Выполнено — Продукция принята на ГП"
    },
    {
      "end1Id": "local_deja_f_262_6911",
      "end2Id": "local_deja_f_262_6910",
      "label": "МХ-18 оформлена"
    },
    {
      "end1Id": "local_deja_f_262_6909",
      "end2Id": "local_deja_f_262_6912",
      "label": "Выполнено"
    },
    {
      "end1Id": "local_deja_f_230_4980",
      "end2Id": "local_deja_correction_supply",
      "label": "Выполнено — Доведение назначено"
    },
    {
      "end1Id": "local_grout_clear_route",
      "end2Id": "f_227_4144",
      "label": "Определить обеспечение прозрачного А"
    },
    {
      "end1Id": "local_grout_clear_gp_kit",
      "end2Id": "local_grout_clear_gp_reserve",
      "label": "Да — комплект есть"
    },
    {
      "end1Id": "local_grout_base_ready",
      "end2Id": "local_grout_base_color",
      "label": "Продолжить исходный заказ"
    },
    {
      "end1Id": "local_grout_base_syringes",
      "end2Id": "f_227_4155",
      "label": "Нет — колеровка А на производстве"
    },
    {
      "end1Id": "local_grout_base_syringes",
      "end2Id": "f_227_4157",
      "label": "Да — обеспечить шприцы и комплектовать"
    },
    {
      "end1Id": "local_colored_grout_route",
      "end2Id": "local_grout_base_syringes",
      "label": "Компонент А обеспечен; нужен цвет"
    },
    {
      "end1Id": "local_syringe_material_check",
      "end2Id": "local_syringe_paste_mix",
      "label": "Да"
    },
    {
      "end1Id": "local_syringe_material_check",
      "end2Id": "local_syringe_material_move",
      "label": "Нет"
    },
    {
      "end1Id": "local_syringe_material_move",
      "end2Id": "local_syringe_material_transfer",
      "label": "Выполнено — Материалы переданы"
    },
    {
      "end1Id": "local_syringe_paste_mix",
      "end2Id": "f_227_4165",
      "label": "Выполнено — Паста приготовлена"
    },
    {
      "end1Id": "local_syringe_paste_to_pf",
      "end2Id": "f_227_4167",
      "label": "Выполнено — Физически; без перемещения пасты в 1С"
    },
    {
      "end1Id": "local_syringe_labels",
      "end2Id": "mark_ready_local_syringe_labels",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "local_syringe_production",
      "end2Id": "local_syringe_output_allocation",
      "label": "Выпуск подтверждён"
    },
    {
      "end1Id": "local_syringe_output_allocation",
      "end2Id": "f_258_5076",
      "label": "Подтвердить план — Для комплекта затирки"
    },
    {
      "end1Id": "local_syringe_output_allocation",
      "end2Id": "local_syringe_gp_transfer",
      "label": "Подтвердить план — Отдельный заказ / пополнение"
    },
    {
      "end1Id": "local_syringe_gp_move",
      "end2Id": "local_syringe_gp_ready",
      "label": "Выполнено — Шприцы физически приняты на ГП"
    },
    {
      "end1Id": "local_syringe_gp_transfer",
      "end2Id": "local_syringe_gp_move",
      "label": "Передача оформлена"
    },
    {
      "end1Id": "local_2072f40c1e824f81b2482a3720797b08",
      "end2Id": "local_repacking_samples_fill",
      "label": "Выполнено — Счёт пополнения создан"
    },
    {
      "end1Id": "local_14565bca119a4b0a8cb1781e02cad8a7",
      "end2Id": "local_repacking_remainder_pf_onec",
      "label": "Выполнено — Физически передано на ПФ"
    },
    {
      "end1Id": "local_repacking_samples_labels",
      "end2Id": "mark_ready_local_repacking_samples_labels",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "local_repacking_samples_warehouse",
      "end2Id": "local_repacking_samples_done",
      "label": "Выполнено — Образцы физически приняты"
    },
    {
      "end1Id": "local_repacking_samples_production",
      "end2Id": "local_repacking_samples_transfer",
      "label": "Производство проведено"
    },
    {
      "end1Id": "local_repacking_samples_transfer",
      "end2Id": "local_repacking_samples_warehouse",
      "label": "Передача оформлена"
    },
    {
      "end1Id": "local_repacking_remainder_pf_onec",
      "end2Id": "local_repacking_remainder_pf_done",
      "label": "Производство ПФ подтверждено"
    },
    {
      "end1Id": "local_repacking_main_production",
      "end2Id": "local_repacking_output_onec",
      "label": "Производство проведено"
    },
    {
      "end1Id": "local_pf_supply_type",
      "end2Id": "local_pf_supply_grout",
      "label": "Затирка"
    },
    {
      "end1Id": "local_pf_supply_type",
      "end2Id": "local_pf_supply_color",
      "label": "Краска / остальные типы"
    },
    {
      "end1Id": "local_pf_supply_grout",
      "end2Id": "local_grout_base_ready",
      "label": "Выполнено — Компонент А подготовлен"
    },
    {
      "end1Id": "local_pf_supply_color",
      "end2Id": "f_227_4079",
      "label": "Нет — конечная фасовка"
    },
    {
      "end1Id": "local_pf_supply_color",
      "end2Id": "local_pf_supply_coloring_place",
      "label": "Да — сначала колеровка"
    },
    {
      "end1Id": "local_pf_supply_coloring_place",
      "end2Id": "local_pf_to_km_physical",
      "label": "КМ"
    },
    {
      "end1Id": "local_pf_supply_coloring_place",
      "end2Id": "local_pf_to_prod_physical",
      "label": "Производство / штукатурка"
    },
    {
      "end1Id": "local_km_base_to_production_onec",
      "end2Id": "f_230_4810",
      "label": "Подготовка ПФ завершена"
    },
    {
      "end1Id": "local_colored_a_to_pf",
      "end2Id": "f_241_5194",
      "label": "Выполнено — Передача подтверждена"
    },
    {
      "end1Id": "local_deja_colored_a_to_pf",
      "end2Id": "local_deja_f_241_5194",
      "label": "Выполнено — Передача подтверждена"
    },
    {
      "end1Id": "local_pf_to_km_physical",
      "end2Id": "local_pf_to_km_onec",
      "label": "Выполнено — Вёдра получены"
    },
    {
      "end1Id": "local_pf_to_prod_physical",
      "end2Id": "local_pf_to_prod_onec",
      "label": "Выполнено — База получена"
    },
    {
      "end1Id": "local_prod_preparation_done",
      "end2Id": "local_prod_gp_transfer_onec",
      "label": "ГП — кроме затирки"
    },
    {
      "end1Id": "local_prod_preparation_done",
      "end2Id": "f_230_4912",
      "label": "ПФ"
    },
    {
      "end1Id": "local_prod_preparation_done",
      "end2Id": "local_prod_new_batch_prepare",
      "label": "Новый замес; база принята ОТК"
    },
    {
      "end1Id": "local_sample_reserved_source",
      "end2Id": "local_sample_gp_place",
      "label": "Нет — готовые вёдра ГП"
    },
    {
      "end1Id": "local_sample_reserved_source",
      "end2Id": "local_sample_pf_supply",
      "label": "Да — источник ПФ"
    },
    {
      "end1Id": "local_sample_gp_place",
      "end2Id": "f_300_6524",
      "label": "Технолог выбрал КМ; не штукатурка"
    },
    {
      "end1Id": "local_sample_gp_place",
      "end2Id": "f_300_6530",
      "label": "Технолог выбрал производство / штукатурка"
    },
    {
      "end1Id": "local_sample_pf_supply",
      "end2Id": "local_sample_pf_coloring_destination",
      "label": "После подготовки ПФ"
    },
    {
      "end1Id": "local_km_gp_transfer_onec",
      "end2Id": "local_km_gp_move",
      "label": "Перемещение учтено"
    },
    {
      "end1Id": "local_km_new_batch_fill",
      "end2Id": "local_km_new_batch_move",
      "label": "Выполнено — Вёдра наполнены"
    },
    {
      "end1Id": "local_prod_gp_transfer_onec",
      "end2Id": "local_prod_gp_move",
      "label": "Перемещение учтено"
    },
    {
      "end1Id": "local_prod_gp_move",
      "end2Id": "local_prod_gp_pour",
      "label": "Выполнено — Вёдра переданы"
    },
    {
      "end1Id": "local_km_pigment_supply_check",
      "end2Id": "local_km_pigment_reserve",
      "label": "Да"
    },
    {
      "end1Id": "local_km_pigment_supply_check",
      "end2Id": "local_km_pigment_move",
      "label": "Нет — требуется пополнение"
    },
    {
      "end1Id": "local_km_pigment_reserve",
      "end2Id": "f_230_4802",
      "label": "Пигменты и добавки обеспечены"
    },
    {
      "end1Id": "local_km_pigment_move",
      "end2Id": "local_km_pigment_transfer_onec",
      "label": "Выполнено — Материалы доставлены"
    },
    {
      "end1Id": "local_prod_pigment_supply_check",
      "end2Id": "local_prod_pigment_reserve",
      "label": "Да"
    },
    {
      "end1Id": "local_prod_pigment_supply_check",
      "end2Id": "local_prod_pigment_move",
      "label": "Нет — требуется пополнение"
    },
    {
      "end1Id": "local_prod_pigment_reserve",
      "end2Id": "local_prod_preparation_done",
      "label": "Пигменты и добавки обеспечены"
    },
    {
      "end1Id": "local_prod_pigment_move",
      "end2Id": "local_prod_pigment_transfer_onec",
      "label": "Выполнено — Материалы доставлены"
    },
    {
      "end1Id": "local_batch_colored_pf_mass",
      "end2Id": "f_230_4728",
      "label": "Подтвердить рецепт / решение — Масса ПФ подтверждена"
    },
    {
      "end1Id": "local_pf_replenishment_registry",
      "end2Id": "local_pf_replenishment_min300",
      "label": "Да — минимум 300 кг"
    },
    {
      "end1Id": "local_pf_replenishment_registry",
      "end2Id": "local_pf_replenishment_any",
      "label": "Нет — без порога 300 кг"
    },
    {
      "end1Id": "local_pf_replenishment_min300",
      "end2Id": "local_batch_replenishment_invoice",
      "label": "Подтвердить план — Объём пополнения согласован"
    },
    {
      "end1Id": "local_batch_rework_approved",
      "end2Id": "local_batch_rework_account",
      "label": "Да — партии и масса согласованы"
    },
    {
      "end1Id": "local_batch_rework_approved",
      "end2Id": "local_batch_without_rework",
      "label": "Нет — переработку не используем"
    },
    {
      "end1Id": "local_batch_rework_account",
      "end2Id": "local_batch_stock_topup_selected",
      "label": "Подтвердить план — Состав замеса подтверждён"
    },
    {
      "end1Id": "local_prod_coloring_rework_check",
      "end2Id": "local_prod_coloring_rework_move",
      "label": "Да"
    },
    {
      "end1Id": "local_prod_coloring_rework_move",
      "end2Id": "local_prod_coloring_rework_transfer",
      "label": "Выполнено — Переработка передана"
    },
    {
      "end1Id": "local_prod_coloring_rework_transfer",
      "end2Id": "f_230_4908",
      "label": "Материалы готовы"
    },
    {
      "end1Id": "local_new_batch_plan_ready",
      "end2Id": "local_new_batch_recipe",
      "label": "Да"
    },
    {
      "end1Id": "local_new_batch_plan_ready",
      "end2Id": "f_241_5090",
      "label": "Нет — сначала планирование"
    },
    {
      "end1Id": "local_new_batch_recipe",
      "end2Id": "local_new_batch_raw_available",
      "label": "Рецептура получена"
    },
    {
      "end1Id": "local_new_batch_raw_available",
      "end2Id": "local_new_batch_raw_pick",
      "label": "Да"
    },
    {
      "end1Id": "local_new_batch_raw_available",
      "end2Id": "f_227_4223",
      "label": "Нет — пополнить дефицит"
    },
    {
      "end1Id": "local_new_batch_raw_pick",
      "end2Id": "local_new_batch_rework_check",
      "label": "Выполнено — Сырьё подобрано"
    },
    {
      "end1Id": "local_new_batch_rework_check",
      "end2Id": "local_new_batch_rework_move",
      "label": "Да"
    },
    {
      "end1Id": "local_new_batch_rework_check",
      "end2Id": "f_227_4237",
      "label": "Нет — без переработки в замесе"
    },
    {
      "end1Id": "local_new_batch_rework_move",
      "end2Id": "local_new_batch_rework_onec",
      "label": "Выполнено — Переработка получена"
    },
    {
      "end1Id": "local_new_batch_extra_available",
      "end2Id": "local_new_batch_apply_correction",
      "label": "Да"
    },
    {
      "end1Id": "local_new_batch_extra_available",
      "end2Id": "local_new_batch_extra_move",
      "label": "Нет — пополнить запас"
    },
    {
      "end1Id": "local_new_batch_extra_move",
      "end2Id": "local_new_batch_extra_onec",
      "label": "Выполнено — Материалы доставлены"
    },
    {
      "end1Id": "local_new_batch_part_destination",
      "end2Id": "f_230_4702",
      "label": "Нет — объём под заказ"
    },
    {
      "end1Id": "local_new_batch_part_destination",
      "end2Id": "local_new_batch_pf_stock_move",
      "label": "Да — пополнение ПФ"
    },
    {
      "end1Id": "local_new_batch_pf_stock_move",
      "end2Id": "local_new_batch_pf_stock_account",
      "label": "Выполнено — ПФ физически принят"
    },
    {
      "end1Id": "local_new_batch_pf_stock_account",
      "end2Id": "local_new_batch_pf_stock_ready",
      "label": "Учёт подтверждён"
    },
    {
      "end1Id": "local_new_batch_fill_production",
      "end2Id": "f_227_4266",
      "label": "Производство проведено"
    },
    {
      "end1Id": "local_batch_replenishment_invoice",
      "end2Id": "f_230_4740",
      "label": "Подтвердить план — Пополнение ПФ включено в план"
    },
    {
      "end1Id": "local_new_batch_grout_type",
      "end2Id": "f_227_4257",
      "label": "Нет — другая продукция"
    },
    {
      "end1Id": "local_batch_stock_topup_selected",
      "end2Id": "local_pf_replenishment_registry",
      "label": "Да — добавить пополнение"
    },
    {
      "end1Id": "local_grout_assembly_output_onec",
      "end2Id": "f_262_7160",
      "label": "Передача оформлена"
    },
    {
      "end1Id": "local_repacking_output_onec",
      "end2Id": "f_227_4089",
      "label": "Передача оформлена"
    },
    {
      "end1Id": "local_deja_pigment_check",
      "end2Id": "local_deja_coloring_materials",
      "label": "Да"
    },
    {
      "end1Id": "local_deja_pigment_check",
      "end2Id": "local_deja_pigment_move",
      "label": "Нет — пополнить"
    },
    {
      "end1Id": "local_deja_pigment_move",
      "end2Id": "local_deja_pigment_transfer",
      "label": "Выполнено — Материалы доставлены"
    },
    {
      "end1Id": "local_repacking_samples_fill",
      "end2Id": "local_repacking_samples_labels",
      "label": "Выполнено — Образцы расфасованы"
    },
    {
      "end1Id": "local_prod_colored_a_release_pending",
      "end2Id": "local_colored_a_to_pf",
      "label": "Далее — передача на склад ПФ"
    },
    {
      "end1Id": "local_deja_colored_a_release_pending",
      "end2Id": "local_deja_colored_a_to_pf",
      "label": "Далее — передача на склад ПФ"
    },
    {
      "end1Id": "local_km_correction_supply",
      "end2Id": "local_km_correction_apply",
      "label": "Да"
    },
    {
      "end1Id": "local_km_correction_supply",
      "end2Id": "local_km_correction_move",
      "label": "Нет — доставить дефицит"
    },
    {
      "end1Id": "local_km_correction_move",
      "end2Id": "local_km_correction_onec",
      "label": "Выполнено — Материалы доставлены"
    },
    {
      "end1Id": "local_prod_correction_supply",
      "end2Id": "local_prod_correction_apply",
      "label": "Да"
    },
    {
      "end1Id": "local_prod_correction_supply",
      "end2Id": "local_prod_correction_move",
      "label": "Нет — доставить дефицит"
    },
    {
      "end1Id": "local_prod_correction_move",
      "end2Id": "local_prod_correction_onec",
      "label": "Выполнено — Материалы доставлены"
    },
    {
      "end1Id": "local_deja_correction_supply",
      "end2Id": "local_deja_correction_apply",
      "label": "Да"
    },
    {
      "end1Id": "local_deja_correction_supply",
      "end2Id": "local_deja_correction_move",
      "label": "Нет — доставить дефицит"
    },
    {
      "end1Id": "local_deja_correction_move",
      "end2Id": "local_deja_correction_onec",
      "label": "Выполнено — Материалы доставлены"
    },
    {
      "end1Id": "local_defect_gp_release_order",
      "end2Id": "local_defect_gp_onec_pending",
      "label": "Выполнено — Назначение согласовано"
    },
    {
      "end1Id": "local_defect_gp_onec_pending",
      "end2Id": "local_defect_gp_move",
      "label": "После уточнения учёта"
    },
    {
      "end1Id": "local_defect_gp_move",
      "end2Id": "local_defect_gp_ready",
      "label": "Выполнено — ГП принята"
    },
    {
      "end1Id": "local_rework_stock_form",
      "end2Id": "local_rework_gp_base",
      "label": "Да — ГП в вёдрах"
    },
    {
      "end1Id": "local_rework_stock_form",
      "end2Id": "local_rework_pf_base",
      "label": "Нет — ПФ в кг"
    },
    {
      "end1Id": "local_rework_gp_base",
      "end2Id": "f_269_5182",
      "label": "Выполнено — Материал определён"
    },
    {
      "end1Id": "local_rework_pigment_account_pending",
      "end2Id": "f_269_5150",
      "label": "Учёт переработки оформлен"
    },
    {
      "end1Id": "local_defect_notify_otk",
      "end2Id": "f_269_5098",
      "label": "Выполнено — Брак передан на рассмотрение"
    },
    {
      "end1Id": "local_gp_sticker_required",
      "end2Id": "f_227_4076",
      "label": "Нет — маркировка подходит"
    },
    {
      "end1Id": "local_gp_sticker_required",
      "end2Id": "f_227_4081",
      "label": "Да"
    },
    {
      "end1Id": "pilot_pf_gp_mh18",
      "end2Id": "f_227_4222",
      "label": "Передача оформлена"
    },
    {
      "end1Id": "pilot_pf_order_supply",
      "end2Id": "local_pf_supply_type",
      "label": "Отправить в работу — выдать задания"
    },
    {
      "end1Id": "mark_ready_f_262_7262",
      "end2Id": "f_230_5042",
      "label": ""
    },
    {
      "end1Id": "mark_ready_f_227_4077",
      "end2Id": "local_repacking_assign_place",
      "label": ""
    },
    {
      "end1Id": "mark_ready_f_227_4078",
      "end2Id": "f_227_4087",
      "label": ""
    },
    {
      "end1Id": "mark_ready_f_227_4259",
      "end2Id": "f_227_4261",
      "label": ""
    },
    {
      "end1Id": "mark_ready_f_227_4079",
      "end2Id": "f_227_4085",
      "label": "Выполнено"
    },
    {
      "end1Id": "mark_apply_f_227_4085",
      "end2Id": "f_227_4228",
      "label": "Выполнено — Фасовка подтверждена"
    },
    {
      "end1Id": "mark_apply_f_227_4261",
      "end2Id": "local_new_batch_fill_production",
      "label": "Фасовка и маркировка завершены"
    },
    {
      "end1Id": "mark_ready_f_230_4826",
      "end2Id": "f_230_4830",
      "label": ""
    },
    {
      "end1Id": "mark_check_f_230_4932",
      "end2Id": "mark_ready_mark_check_f_230_4932",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "mark_ready_mark_check_f_230_4932",
      "end2Id": "f_230_4936",
      "label": ""
    },
    {
      "end1Id": "mark_check_local_deja_f_230_4932",
      "end2Id": "mark_ready_mark_check_local_deja_f_230_4932",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "mark_ready_mark_check_local_deja_f_230_4932",
      "end2Id": "local_deja_f_230_4936",
      "label": ""
    },
    {
      "end1Id": "mark_ready_local_syringe_labels",
      "end2Id": "local_syringe_production",
      "label": ""
    },
    {
      "end1Id": "mark_ready_local_repacking_samples_labels",
      "end2Id": "local_repacking_samples_production",
      "label": "Образцы маркированы"
    },
    {
      "end1Id": "mark_check_rework",
      "end2Id": "mark_ready_mark_check_rework",
      "label": "Макет и документ печати сформированы"
    },
    {
      "end1Id": "mark_ready_mark_check_rework",
      "end2Id": "local_rework_stock_form",
      "label": "Ёмкость промаркирована"
    },
    {
      "end1Id": "quality_km_self",
      "end2Id": "f_230_4826",
      "label": "Цвет принят"
    },
    {
      "end1Id": "quality_km_self",
      "end2Id": "f_230_4878",
      "label": "На доведение"
    },
    {
      "end1Id": "quality_prod_self",
      "end2Id": "f_230_4928",
      "label": "Цвет принят"
    },
    {
      "end1Id": "quality_prod_self",
      "end2Id": "f_230_4980",
      "label": "На доведение"
    },
    {
      "end1Id": "quality_deja_self",
      "end2Id": "local_deja_f_230_4928",
      "label": "Цвет принят"
    },
    {
      "end1Id": "quality_deja_self",
      "end2Id": "local_deja_f_230_4980",
      "label": "На доведение"
    },
    {
      "end1Id": "quality_syringe_self",
      "end2Id": "local_syringe_paste_to_pf",
      "label": "Цвет принят"
    },
    {
      "end1Id": "quality_syringe_self",
      "end2Id": "f_230_5126",
      "label": "На доведение"
    },
    {
      "end1Id": "quality_generate_passport",
      "end2Id": "f_227_4249",
      "label": "Паспорт сохранён"
    },
    {
      "end1Id": "equipment_wash_decision",
      "end2Id": "equipment_wash_task",
      "label": "Инициировать мойку"
    },
    {
      "end1Id": "equipment_wash_decision",
      "end2Id": "equipment_wash_waiting",
      "label": "Не сейчас"
    },
    {
      "end1Id": "equipment_wash_task",
      "end2Id": "equipment_wash_available",
      "label": "Мойка завершена"
    },
    {
      "end1Id": "local_repacking_parallel_outputs",
      "end2Id": "local_repacking_label_task",
      "label": "Основная продукция — всегда"
    },
    {
      "end1Id": "local_repacking_parallel_outputs",
      "end2Id": "local_repacking_remainder_destination",
      "label": "Параллельно — остаток"
    },
    {
      "end1Id": "local_initial_gp_partial_reserve",
      "end2Id": "f_227_4048",
      "label": "Дальше — только незакрытый объём"
    },
    {
      "end1Id": "f_227_4038",
      "end2Id": "f_227_4177",
      "label": "Полностью, с учетом Min остатка"
    },
    {
      "end1Id": "f_227_4058",
      "end2Id": "local_gp_other_pack_check",
      "label": "Нет — ПФ недостаточно"
    },
    {
      "end1Id": "f_227_4133",
      "end2Id": "f_258_5065",
      "label": ""
    },
    {
      "end1Id": "f_241_5130",
      "end2Id": "f_241_5114",
      "label": "Далее → схема «Колеровка на производстве»"
    },
    {
      "end1Id": "f_241_5186",
      "end2Id": "f_241_5170",
      "label": "Далее → схема «Комплектация затирки»"
    },
    {
      "end1Id": "f_258_5072",
      "end2Id": "f_258_5068",
      "label": "Далее → схема «Изготовление колерованных шприцов»"
    },
    {
      "end1Id": "f_230_5078",
      "end2Id": "f_230_5038",
      "label": "Выполнено — Поступили: повторная проверка"
    },
    {
      "end1Id": "f_258_5076",
      "end2Id": "f_241_5170",
      "label": "Далее → схема «Комплектация затирки»"
    },
    {
      "end1Id": "f_230_5126",
      "end2Id": "f_227_4165",
      "label": "Выполнено — Повторная проба"
    },
    {
      "end1Id": "f_241_5154",
      "end2Id": "f_241_5114",
      "label": "Далее → схема «Колеровка на производстве»"
    },
    {
      "end1Id": "f_241_5162",
      "end2Id": "f_241_5114",
      "label": "Далее → схема «Колеровка на производстве»"
    },
    {
      "end1Id": "f_241_5106",
      "end2Id": "f_241_5098",
      "label": "Далее → схема «Колеровка на КМ»"
    },
    {
      "end1Id": "f_227_4087",
      "end2Id": "f_227_4076",
      "label": ""
    },
    {
      "end1Id": "f_227_4125",
      "end2Id": "f_227_4044",
      "label": ""
    },
    {
      "end1Id": "f_241_5090",
      "end2Id": "f_230_4726",
      "label": "Далее → схема «План замеса и оборудования»"
    },
    {
      "end1Id": "f_273_5246",
      "end2Id": "f_227_4068",
      "label": "Далее → схема «Новый замес»"
    },
    {
      "end1Id": "f_273_5198",
      "end2Id": "f_230_4736",
      "label": "Подтвердить план"
    },
    {
      "end1Id": "f_241_5194",
      "end2Id": "f_241_5170",
      "label": "Далее → схема «Комплектация затирки»"
    },
    {
      "end1Id": "local_gp_other_pack_check",
      "end2Id": "f_227_4045",
      "label": "Да — хватает полностью"
    },
    {
      "end1Id": "local_gp_other_pack_check",
      "end2Id": "f_227_4068",
      "label": "Нет / хватает только частично"
    },
    {
      "end1Id": "f_300_6524",
      "end2Id": "f_241_5098",
      "label": ""
    },
    {
      "end1Id": "f_300_6530",
      "end2Id": "f_241_5114",
      "label": ""
    },
    {
      "end1Id": "f_227_4198",
      "end2Id": "f_227_4060",
      "label": "Производство свободнее / равно / тип = штукатурка"
    },
    {
      "end1Id": "f_227_4061",
      "end2Id": "f_227_4132",
      "label": "Нет — новый замес"
    },
    {
      "end1Id": "local_colored_plaster_gp_reserve",
      "end2Id": "f_241_5114",
      "label": "Маршрут колеровки на производстве"
    },
    {
      "end1Id": "local_other_colored_base_container",
      "end2Id": "f_241_5114",
      "label": "Выполнено — Колеровка на производстве"
    },
    {
      "end1Id": "f_300_6454",
      "end2Id": "f_271_5173",
      "label": "Да — база на ПФ"
    },
    {
      "end1Id": "local_sample_new_batch_route",
      "end2Id": "f_227_4068",
      "label": ""
    },
    {
      "end1Id": "local_sample_new_batch_route",
      "end2Id": "local_sample_fresh_batch_destination",
      "label": "Образец 1 кг — база готова"
    },
    {
      "end1Id": "local_plaster_new_batch_route",
      "end2Id": "f_227_4068",
      "label": ""
    },
    {
      "end1Id": "local_plaster_new_batch_route",
      "end2Id": "f_241_5114",
      "label": "После готовности базы — только производство"
    },
    {
      "end1Id": "local_deja_f_241_5194",
      "end2Id": "f_241_5170",
      "label": "Далее → схема «Комплектация затирки»"
    },
    {
      "end1Id": "local_keep_largest_colored_base_in_deja",
      "end2Id": "local_deja_coloring_route",
      "label": "Подтвердить план — Колеровка в деже после замеса"
    },
    {
      "end1Id": "f_227_4040",
      "end2Id": "local_purchased_product_route",
      "label": "Перекуп"
    },
    {
      "end1Id": "f_227_4033",
      "end2Id": "f_262_6981",
      "label": "Тип продукции — затирка"
    },
    {
      "end1Id": "f_227_4035",
      "end2Id": "f_257_6365",
      "label": "С цветом"
    },
    {
      "end1Id": "local_5f255159617746bd9e46f86e07d2d037",
      "end2Id": "f_227_4068",
      "label": ""
    },
    {
      "end1Id": "f_265_5077",
      "end2Id": "f_227_4068",
      "label": "Нет"
    },
    {
      "end1Id": "f_227_4144",
      "end2Id": "f_227_4130",
      "label": "Да"
    },
    {
      "end1Id": "f_227_4131",
      "end2Id": "local_grout_clear_route",
      "label": "Нет — затирка без цвета"
    },
    {
      "end1Id": "f_227_4154",
      "end2Id": "local_grout_clear_route",
      "label": "Нет — А потребуется колеровать на производстве"
    },
    {
      "end1Id": "local_grout_clear_gp_kit",
      "end2Id": "local_grout_clear_route",
      "label": "Нет — обеспечить прозрачный А"
    },
    {
      "end1Id": "local_grout_clear_gp_reserve",
      "end2Id": "f_227_4157",
      "label": "Подготовить шприцы и передать на комплектацию"
    },
    {
      "end1Id": "f_227_4130",
      "end2Id": "f_227_4068",
      "label": ""
    },
    {
      "end1Id": "f_227_4130",
      "end2Id": "local_grout_base_ready",
      "label": "После нового замеса и приёмки базы"
    },
    {
      "end1Id": "local_grout_base_color",
      "end2Id": "f_241_5170",
      "label": "Нет — комплектация без цвета"
    },
    {
      "end1Id": "local_grout_base_color",
      "end2Id": "local_colored_grout_route",
      "label": "Да — колерованная затирка"
    },
    {
      "end1Id": "local_syringe_material_transfer",
      "end2Id": "local_syringe_paste_mix",
      "label": "Перемещение подтверждено"
    },
    {
      "end1Id": "local_grout_clear_route",
      "end2Id": "f_227_4157",
      "label": "После обеспечения А — если в заказе есть шприцы"
    },
    {
      "end1Id": "f_227_4152",
      "end2Id": "f_258_5065",
      "label": "ПФ зарезервирован"
    },
    {
      "end1Id": "local_pf_to_km_onec",
      "end2Id": "f_241_5098",
      "label": "Колеровка на КМ"
    },
    {
      "end1Id": "local_pf_to_prod_onec",
      "end2Id": "f_241_5114",
      "label": "Колеровка на производстве"
    },
    {
      "end1Id": "f_227_4106",
      "end2Id": "f_258_5065",
      "label": "Открыть обеспечение из ПФ"
    },
    {
      "end1Id": "f_227_4107",
      "end2Id": "f_258_5065",
      "label": "Открыть обеспечение из ПФ"
    },
    {
      "end1Id": "local_colored_km_pf_supply",
      "end2Id": "f_258_5065",
      "label": "Открыть обеспечение из ПФ"
    },
    {
      "end1Id": "local_colored_km_pf_supply",
      "end2Id": "f_241_5098",
      "label": "После подготовки ПФ — колеровка на КМ"
    },
    {
      "end1Id": "local_sample_pf_supply",
      "end2Id": "f_258_5065",
      "label": "Открыть обеспечение из ПФ"
    },
    {
      "end1Id": "local_sample_pf_coloring_destination",
      "end2Id": "f_241_5098",
      "label": "Технолог выбрал КМ"
    },
    {
      "end1Id": "local_sample_pf_coloring_destination",
      "end2Id": "f_241_5114",
      "label": "Технолог выбрал производство"
    },
    {
      "end1Id": "local_km_gp_move",
      "end2Id": "f_230_4810",
      "label": "Выполнено — Вёдра переданы"
    },
    {
      "end1Id": "local_km_new_batch_move",
      "end2Id": "f_230_4810",
      "label": "Выполнено — Вёдра переданы; без межскладского движения 1С"
    },
    {
      "end1Id": "local_prod_gp_pour",
      "end2Id": "f_230_4908",
      "label": "Выполнено — База подготовлена"
    },
    {
      "end1Id": "local_prod_new_batch_prepare",
      "end2Id": "f_230_4908",
      "label": "Выполнено — База подготовлена; без межскладского движения 1С"
    },
    {
      "end1Id": "local_km_pigment_transfer_onec",
      "end2Id": "local_km_pigment_reserve",
      "label": "Пополнение подтверждено"
    },
    {
      "end1Id": "local_prod_pigment_transfer_onec",
      "end2Id": "local_prod_pigment_reserve",
      "label": "Пополнение подтверждено"
    },
    {
      "end1Id": "local_batch_uncolored_pf_mass",
      "end2Id": "f_230_4728",
      "label": "Масса ПФ рассчитана"
    },
    {
      "end1Id": "local_pf_replenishment_any",
      "end2Id": "local_batch_replenishment_invoice",
      "label": "Подтвердить план — Итоговая масса согласована"
    },
    {
      "end1Id": "local_prod_coloring_rework_check",
      "end2Id": "f_230_4908",
      "label": "Нет — без переработки при колеровке"
    },
    {
      "end1Id": "f_227_4224",
      "end2Id": "local_new_batch_raw_pick",
      "label": "Пополнение подтверждено"
    },
    {
      "end1Id": "local_new_batch_rework_onec",
      "end2Id": "f_227_4237",
      "label": "Материалы обеспечены"
    },
    {
      "end1Id": "local_new_batch_extra_onec",
      "end2Id": "local_new_batch_apply_correction",
      "label": "Материалы обеспечены"
    },
    {
      "end1Id": "local_new_batch_apply_correction",
      "end2Id": "f_227_4243",
      "label": "Выполнено — Повторный ОТК той же партии"
    },
    {
      "end1Id": "local_sample_fresh_batch_destination",
      "end2Id": "f_241_5098",
      "label": "КМ"
    },
    {
      "end1Id": "local_sample_fresh_batch_destination",
      "end2Id": "f_241_5114",
      "label": "Производство"
    },
    {
      "end1Id": "local_new_batch_grout_type",
      "end2Id": "local_grout_base_ready",
      "label": "Да — база затирки"
    },
    {
      "end1Id": "local_batch_without_rework",
      "end2Id": "local_batch_stock_topup_selected",
      "label": "Подтвердить план — Состав замеса подтверждён"
    },
    {
      "end1Id": "local_batch_stock_topup_selected",
      "end2Id": "f_230_4740",
      "label": "Нет — только потребность заказов"
    },
    {
      "end1Id": "f_262_7058",
      "end2Id": "f_258_5068",
      "label": "Изготовить шприцы"
    },
    {
      "end1Id": "local_repacking_prepare_ready",
      "end2Id": "f_227_4093",
      "label": "Выполнено — Готовность подтверждена"
    },
    {
      "end1Id": "local_syringe_output_allocation",
      "end2Id": "f_258_5076",
      "label": "Подтвердить план — Для комплекта затирки"
    },
    {
      "end1Id": "local_deja_pigment_transfer",
      "end2Id": "local_deja_coloring_materials",
      "label": "Пополнение подтверждено"
    },
    {
      "end1Id": "f_241_5050",
      "end2Id": "f_227_4068",
      "label": "Открыть новый замес"
    },
    {
      "end1Id": "f_241_5050",
      "end2Id": "local_resume_coloring_after_batch",
      "label": "После приёмки и распределения базы"
    },
    {
      "end1Id": "f_227_4119",
      "end2Id": "f_227_4068",
      "label": "Открыть новый замес"
    },
    {
      "end1Id": "f_227_4119",
      "end2Id": "local_resume_coloring_after_batch",
      "label": "После приёмки и распределения базы"
    },
    {
      "end1Id": "f_227_4132",
      "end2Id": "f_227_4068",
      "label": "Открыть новый замес"
    },
    {
      "end1Id": "f_227_4132",
      "end2Id": "local_resume_coloring_after_batch",
      "label": "После приёмки и распределения базы"
    },
    {
      "end1Id": "local_km_correction_onec",
      "end2Id": "local_km_correction_apply",
      "label": "Материалы обеспечены"
    },
    {
      "end1Id": "local_km_correction_apply",
      "end2Id": "f_230_4822",
      "label": "Доведение выполнено — повторить проверку цвета"
    },
    {
      "end1Id": "local_prod_correction_onec",
      "end2Id": "local_prod_correction_apply",
      "label": "Материалы обеспечены"
    },
    {
      "end1Id": "local_prod_correction_apply",
      "end2Id": "f_230_4924",
      "label": "Доведение выполнено — повторить проверку цвета"
    },
    {
      "end1Id": "local_deja_correction_onec",
      "end2Id": "local_deja_correction_apply",
      "label": "Материалы обеспечены"
    },
    {
      "end1Id": "local_deja_correction_apply",
      "end2Id": "local_deja_f_230_4924",
      "label": "Доведение выполнено — повторить проверку цвета"
    },
    {
      "end1Id": "local_return_onec_pending",
      "end2Id": "f_269_5098",
      "label": "Далее — решение по материалу"
    },
    {
      "end1Id": "f_269_5118",
      "end2Id": "f_269_5110",
      "label": "Решение получено"
    },
    {
      "end1Id": "local_rework_pf_base",
      "end2Id": "f_269_5182",
      "label": "Выполнено — Материал определён"
    },
    {
      "end1Id": "f_262_7299",
      "end2Id": "f_262_7262",
      "label": "Выполнено — Отвердитель расфасован"
    },
    {
      "end1Id": "f_227_4222",
      "end2Id": "pilot_pf_order_supply",
      "label": "Проблема — показать в позиции счёта"
    },
    {
      "end1Id": "f_227_4221",
      "end2Id": "pilot_pf_order_supply",
      "label": "Проблема — показать в позиции счёта"
    },
    {
      "end1Id": "local_pf_supply_grout",
      "end2Id": "pilot_pf_order_supply",
      "label": "Проблема — показать в позиции счёта"
    },
    {
      "end1Id": "local_pf_to_km_physical",
      "end2Id": "pilot_pf_order_supply",
      "label": "Проблема — показать в позиции счёта"
    },
    {
      "end1Id": "local_pf_to_prod_physical",
      "end2Id": "pilot_pf_order_supply",
      "label": "Проблема — показать в позиции счёта"
    },
    {
      "end1Id": "mark_ready_f_227_4079",
      "end2Id": "pilot_pf_order_supply",
      "label": "Проблема — показать в позиции счёта"
    },
    {
      "end1Id": "f_227_4085",
      "end2Id": "pilot_pf_order_supply",
      "label": "Проблема — показать в позиции счёта"
    },
    {
      "end1Id": "mark_ready_f_227_4081",
      "end2Id": "f_227_4076",
      "label": "Стикер подготовлен"
    },
    {
      "end1Id": "local_rework_decision_timer_30m",
      "end2Id": "f_227_4068",
      "label": "Без переработки"
    },
    {
      "end1Id": "quality_km_lab",
      "end2Id": "f_230_4826",
      "label": "Продолжить маршрут"
    },
    {
      "end1Id": "quality_km_lab",
      "end2Id": "f_230_4878",
      "label": "Отправить на доведение"
    },
    {
      "end1Id": "quality_prod_lab",
      "end2Id": "f_230_4928",
      "label": "Продолжить маршрут"
    },
    {
      "end1Id": "quality_prod_lab",
      "end2Id": "f_230_4980",
      "label": "Отправить на доведение"
    },
    {
      "end1Id": "quality_deja_lab",
      "end2Id": "local_deja_f_230_4928",
      "label": "Продолжить маршрут"
    },
    {
      "end1Id": "quality_deja_lab",
      "end2Id": "local_deja_f_230_4980",
      "label": "Отправить на доведение"
    },
    {
      "end1Id": "quality_syringe_lab",
      "end2Id": "local_syringe_paste_to_pf",
      "label": "Продолжить маршрут"
    },
    {
      "end1Id": "quality_syringe_lab",
      "end2Id": "f_230_5126",
      "label": "Отправить на доведение"
    },
    {
      "end1Id": "f_230_5042",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "f_262_7299",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "f_227_4167",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "f_227_4090",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "f_227_4085",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "f_230_4932",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "local_deja_f_230_4932",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "local_pf_to_km_physical",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "local_km_new_batch_fill",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "local_repacking_samples_fill",
      "end2Id": "equipment_wash_decision",
      "label": "Параллельно: ресурс освобождён"
    },
    {
      "end1Id": "local_initial_gp_partial_reserve",
      "end2Id": "f_227_4177",
      "label": "Найденная часть > 0 — маршрут ГП"
    },
    {
      "end1Id": "local_quality_unfixable_defect_route",
      "end2Id": "f_269_5088",
      "label": "Открыть ветку брака"
    },
    {
      "end1Id": "quality_km_self",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "quality_km_lab",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "quality_prod_self",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "quality_prod_lab",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "quality_deja_self",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "quality_deja_lab",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "quality_syringe_self",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "quality_syringe_lab",
      "end2Id": "local_quality_unfixable_defect_route",
      "label": "Исправить нельзя — брак"
    },
    {
      "end1Id": "equipment_wash_waiting",
      "end2Id": "equipment_wash_decision",
      "label": "Позже: открыть то же задание и запустить мойку"
    },
    {
      "end1Id": "f_230_4740",
      "end2Id": "planning_minmax_sources",
      "label": "Допустимые пары подобраны"
    },
    {
      "end1Id": "f_273_5214",
      "end2Id": "f_230_4744",
      "label": "Да"
    },
    {
      "end1Id": "f_273_5214",
      "end2Id": "planning_below_all_minima",
      "label": "Нет"
    },
    {
      "end1Id": "planning_below_all_minima",
      "end2Id": "planning_no_feasible_plan",
      "label": "Да — разделение не поможет"
    },
    {
      "end1Id": "planning_below_all_minima",
      "end2Id": "f_273_5218",
      "label": "Нет — проверить разделение"
    },
    {
      "end1Id": "f_273_5218",
      "end2Id": "planning_split_found",
      "label": "Варианты разделения проверены"
    },
    {
      "end1Id": "planning_split_found",
      "end2Id": "f_230_4740",
      "label": "Да — проверить каждую часть"
    },
    {
      "end1Id": "planning_split_found",
      "end2Id": "planning_no_feasible_plan",
      "label": "Нет — допустимого плана нет"
    },
    {
      "end1Id": "planning_no_feasible_plan",
      "end2Id": "f_230_4740",
      "label": "Повторить подбор после изменения плана"
    },
    {
      "end1Id": "planning_minmax_sources",
      "end2Id": "planning_minimum_rule_confirmed",
      "label": "Источники ограничений получены"
    },
    {
      "end1Id": "planning_minimum_rule_confirmed",
      "end2Id": "f_273_5214",
      "label": "Да — итоговый минимум определён"
    },
    {
      "end1Id": "planning_minimum_rule_confirmed",
      "end2Id": "planning_no_feasible_plan",
      "label": "Нет — уточнить порядок минимумов"
    },
    {
      "end1Id": "local_repacking_assign_place",
      "end2Id": "f_227_4084",
      "label": "Место и исполнитель назначены"
    }
  ],
  "issues": [
    "Положительный ответ после проверки материалов и рецептуры в плане замеса не подписан; при импорте это «Да», а отрицательный ведёт к разбору дефицита / ошибки 1С.",
    "Ветка достаточности ПФ после переработки имеет две неподписанные линии; в экспорте подписи уточнены по названиям конечных действий.",
    "Раздельный выпуск ПФ до колеровки помечен в карте как вопрос. Не считать согласованным окончательный порядок документов 1С для всех вариантов.",
    "Учёт колеровки ГП в вёдрах, предварительной фасовки ПФ перед КМ и перемещения ПФ перед сборкой требует подтверждения 1С.",
    "В карте нет отдельной схемы стоп-счёта / изменения общих замесов. Экспорт не добавляет её из других документов.",
    "При наличии ГП и ПФ критерий выбора между переклейкой, перефасовкой и новой фасовкой ПФ отдельно не утверждён.",
    "Неколеруемая часть нового замеса в карте доходит до склада и отгрузки, но отдельный узел 1С «Сборка ГП из ПФ» на этой ветке отсутствует. Порядок учёта нужно сверить; дополнительный переход не выдуман.",
    "В схеме указан порог большого объёма 250 кг, а для компонента А затирки — 50 кг; предел количества вёдер КМ берётся из справочника. Не подменять все проверки одним лимитом."
  ],
  "source": {
    "figmaFileKey": "tTdSOGT3A62xn5gbtORIyw",
    "figmaRoot": "227:4031",
    "date": "2026-10-04"
  },
  "entryId": "root"
};
