(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{razt:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return l})),t.d(n,"default",(function(){return d}));var a=t("wx14"),r=t("zLVn"),o=(t("q1tI"),t("7ljp")),i=t("hhGP"),l=(t("qKvR"),{});void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/pages/docs/installation/email_reports.mdx"}});var s={_frontmatter:l},c=i.a;function d(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)(c,Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"scheduling-and-emailing-reports"},"Scheduling and Emailing Reports"),Object(o.b)("h3",{id:"email-reports"},"Email Reports"),Object(o.b)("p",null,"Email reports allow users to schedule email reports for:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"chart and dashboard visualization (attachment or inline)"),Object(o.b)("li",{parentName:"ul"},"chart data (CSV attachment on inline table)")),Object(o.b)("p",null,"Enable email reports in your ",Object(o.b)("inlineCode",{parentName:"p"},"superset_config.py")," file:"),Object(o.b)("pre",null,Object(o.b)("code",{className:"language-python",parentName:"pre"},"ENABLE_SCHEDULED_EMAIL_REPORTS = True\n")),Object(o.b)("p",null,"Now you will find two new items in the navigation bar that allow you to schedule email reports:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Manage > Dashboard Emails")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Manage > Chart Email Schedules"))),Object(o.b)("p",null,"Schedules are defined in ",Object(o.b)("a",{href:"https://crontab.guru/",parentName:"p"},"crontab format")," and each schedule can have a list\nof recipients (all of them can receive a single mail, or separate mails). For audit purposes, all\noutgoing mails can have a mandatory BCC."),Object(o.b)("p",null,"In order get picked up you need to configure a celery worker and a celery beat (see section above\n“Celery Tasks”). Your celery configuration also needs an entry ",Object(o.b)("inlineCode",{parentName:"p"},"email_reports.schedule_hourly")," for\n",Object(o.b)("inlineCode",{parentName:"p"},"CELERYBEAT_SCHEDULE"),"."),Object(o.b)("p",null,"To send emails you need to configure SMTP settings in your ",Object(o.b)("inlineCode",{parentName:"p"},"superset_config.py")," configuration file."),Object(o.b)("pre",null,Object(o.b)("code",{className:"language-python",parentName:"pre"},'EMAIL_NOTIFICATIONS = True\n\nSMTP_HOST = "email-smtp.eu-west-1.amazonaws.com"\nSMTP_STARTTLS = True\nSMTP_SSL = False\nSMTP_USER = "smtp_username"\nSMTP_PORT = 25\nSMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")\nSMTP_MAIL_FROM = "insights@komoot.com"\n')),Object(o.b)("p",null,"To render dashboards you need to install a local browser on your Superset instance:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{href:"https://github.com/mozilla/geckodriver",parentName:"li"},"geckodriver")," for Firefox"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{href:"http://chromedriver.chromium.org/",parentName:"li"},"chromedriver")," for Chrome")),Object(o.b)("p",null,"You'll need to adjust the ",Object(o.b)("inlineCode",{parentName:"p"},"EMAIL_REPORTS_WEBDRIVER")," accordingly in your configuration. You also need\nto specify on behalf of which username to render the dashboards. In general dashboards and charts\nare not accessible to unauthorized requests, that is why the worker needs to take over credentials\nof an existing user to take a snapshot."),Object(o.b)("pre",null,Object(o.b)("code",{className:"language-python",parentName:"pre"},"EMAIL_REPORTS_USER = 'username_with_permission_to_access_dashboards'\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Important notes")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Be mindful of the concurrency setting for celery (using ",Object(o.b)("inlineCode",{parentName:"li"},"-c 4"),"). Selenium/webdriver instances can\nconsume a lot of CPU / memory on your servers."),Object(o.b)("li",{parentName:"ul"},"In some cases, if you notice a lot of leaked geckodriver processes, try running your celery\nprocesses with ",Object(o.b)("inlineCode",{parentName:"li"},"celery worker --pool=prefork --max-tasks-per-child=128 ...")),Object(o.b)("li",{parentName:"ul"},"It is recommended to run separate workers for the ",Object(o.b)("inlineCode",{parentName:"li"},"sql_lab")," and ",Object(o.b)("inlineCode",{parentName:"li"},"email_reports")," tasks. This can be\ndone using the ",Object(o.b)("inlineCode",{parentName:"li"},"queue")," field in ",Object(o.b)("inlineCode",{parentName:"li"},"CELERY_ANNOTATIONS"),"."),Object(o.b)("li",{parentName:"ul"},"Adjust ",Object(o.b)("inlineCode",{parentName:"li"},"WEBDRIVER_BASEURL")," in your configuration file if celery workers can’t access Superset via\nits default value of ",Object(o.b)("inlineCode",{parentName:"li"},"http://0.0.0.0:8080/"),".")),Object(o.b)("h3",{id:"schedule-reports"},"Schedule Reports"),Object(o.b)("p",null,"You can optionally allow your users to schedule queries directly in SQL Lab. This is done by addding\nextra metadata to saved queries, which are then picked up by an external scheduled (like\n",Object(o.b)("a",{href:"https://airflow.apache.org/",parentName:"p"},"Apache Airflow"),")."),Object(o.b)("p",null,"To allow scheduled queries, add the following to your configuration file:"),Object(o.b)("pre",null,Object(o.b)("code",{className:"language-python",parentName:"pre"},"FEATURE_FLAGS = {\n    # Configuration for scheduling queries from SQL Lab. This information is\n    # collected when the user clicks \"Schedule query\", and saved into the `extra`\n    # field of saved queries.\n    # See: https://github.com/mozilla-services/react-jsonschema-form\n    'SCHEDULED_QUERIES': {\n        'JSONSCHEMA': {\n            'title': 'Schedule',\n            'description': (\n                'In order to schedule a query, you need to specify when it '\n                'should start running, when it should stop running, and how '\n                'often it should run. You can also optionally specify '\n                'dependencies that should be met before the query is '\n                'executed. Please read the documentation for best practices '\n                'and more information on how to specify dependencies.'\n            ),\n            'type': 'object',\n            'properties': {\n                'output_table': {\n                    'type': 'string',\n                    'title': 'Output table name',\n                },\n                'start_date': {\n                    'type': 'string',\n                    'title': 'Start date',\n                    # date-time is parsed using the chrono library, see\n                    # https://www.npmjs.com/package/chrono-node#usage\n                    'format': 'date-time',\n                    'default': 'tomorrow at 9am',\n                },\n                'end_date': {\n                    'type': 'string',\n                    'title': 'End date',\n                    # date-time is parsed using the chrono library, see\n                    # https://www.npmjs.com/package/chrono-node#usage\n                    'format': 'date-time',\n                    'default': '9am in 30 days',\n                },\n                'schedule_interval': {\n                    'type': 'string',\n                    'title': 'Schedule interval',\n                },\n                'dependencies': {\n                    'type': 'array',\n                    'title': 'Dependencies',\n                    'items': {\n                        'type': 'string',\n                    },\n                },\n            },\n        },\n        'UISCHEMA': {\n            'schedule_interval': {\n                'ui:placeholder': '@daily, @weekly, etc.',\n            },\n            'dependencies': {\n                'ui:help': (\n                    'Check the documentation for the correct format when '\n                    'defining dependencies.'\n                ),\n            },\n        },\n        'VALIDATION': [\n            # ensure that start_date <= end_date\n            {\n                'name': 'less_equal',\n                'arguments': ['start_date', 'end_date'],\n                'message': 'End date cannot be before start date',\n                # this is where the error message is shown\n                'container': 'end_date',\n            },\n        ],\n        # link to the scheduler; this example links to an Airflow pipeline\n        # that uses the query id and the output table as its name\n        'linkback': (\n            'https://airflow.example.com/admin/airflow/tree?'\n            'dag_id=query_${id}_${extra_json.schedule_info.output_table}'\n        ),\n    },\n}\n")),Object(o.b)("p",null,"This feature flag is based on\n",Object(o.b)("a",{href:"https://github.com/mozilla-services/react-jsonschema-form",parentName:"p"},"react-jsonschema-form")," and will add a\nbutton called “Schedule Query” to SQL Lab. When the button is clicked, a modal will show up where\nthe user can add the metadata required for scheduling the query."),Object(o.b)("p",null,"This information can then be retrieved from the endpoint ",Object(o.b)("inlineCode",{parentName:"p"},"/savedqueryviewapi/api/read")," and used to\nschedule the queries that have ",Object(o.b)("inlineCode",{parentName:"p"},"scheduled_queries")," in their JSON metadata. For schedulers other than\nAirflow, additional fields can be easily added to the configuration file above."))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/pages/docs/installation/email_reports.mdx"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-docs-installation-email-reports-mdx-6babb6ae3aebc529adaa.js.map