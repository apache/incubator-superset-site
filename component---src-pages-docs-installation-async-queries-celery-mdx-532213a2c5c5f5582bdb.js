(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{en00:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return p}));var r=n("wx14"),a=n("zLVn"),s=(n("q1tI"),n("7ljp")),o=n("hhGP"),i=(n("qKvR"),{});void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/pages/docs/installation/async_queries_celery.mdx"}});var l={_frontmatter:i},c=o.a;function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)(c,Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h2",{id:"async-queries-via-celery"},"Async Queries via Celery"),Object(s.b)("h3",{id:"celery"},"Celery"),Object(s.b)("p",null,"On large analytic databases, it’s common to run queries that execute for minutes or hours. To enable\nsupport for long running queries that execute beyond the typical web request’s timeout (30-60\nseconds), it is necessary to configure an asynchronous backend for Superset which consists of:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"one or many Superset workers (which is implemented as a Celery worker), and can be started with\nthe ",Object(s.b)("inlineCode",{parentName:"li"},"celery worker")," command, run ",Object(s.b)("inlineCode",{parentName:"li"},"celery worker --help")," to view the related options."),Object(s.b)("li",{parentName:"ul"},"a celery broker (message queue) for which we recommend using Redis or RabbitMQ"),Object(s.b)("li",{parentName:"ul"},"a results backend that defines where the worker will persist the query results")),Object(s.b)("p",null,"Configuring Celery requires defining a ",Object(s.b)("inlineCode",{parentName:"p"},"CELERY_CONFIG")," in your ",Object(s.b)("inlineCode",{parentName:"p"},"superset_config.py"),". Both the worker\nand web server processes should have the same configuration."),Object(s.b)("pre",null,Object(s.b)("code",{className:"language-python",parentName:"pre"},"class CeleryConfig(object):\n    BROKER_URL = 'redis://localhost:6379/0'\n    CELERY_IMPORTS = (\n        'superset.sql_lab',\n        'superset.tasks',\n    )\n    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'\n    CELERYD_LOG_LEVEL = 'DEBUG'\n    CELERYD_PREFETCH_MULTIPLIER = 10\n    CELERY_ACKS_LATE = True\n    CELERY_ANNOTATIONS = {\n        'sql_lab.get_sql_results': {\n            'rate_limit': '100/s',\n        },\n        'email_reports.send': {\n            'rate_limit': '1/s',\n            'time_limit': 120,\n            'soft_time_limit': 150,\n            'ignore_result': True,\n        },\n    }\n    CELERYBEAT_SCHEDULE = {\n        'email_reports.schedule_hourly': {\n            'task': 'email_reports.schedule_hourly',\n            'schedule': crontab(minute=1, hour='*'),\n        },\n    }\n\nCELERY_CONFIG = CeleryConfig\n")),Object(s.b)("p",null,"To start a Celery worker to leverage the configuration, run the following command:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre"},"celery worker --app=superset.tasks.celery_app:app --pool=prefork -O fair -c 4\n")),Object(s.b)("p",null,"To start a job which schedules periodic background jobs, run the following command:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre"},"celery beat --app=superset.tasks.celery_app:app\n")),Object(s.b)("p",null,"To setup a result backend, you need to pass an instance of a derivative of from\ncachelib.base.BaseCache to the RESULTS_BACKEND configuration key in your superset_config.py. You can\nuse Memcached, Redis, S3 (",Object(s.b)("a",{href:"https://pypi.python.org/pypi/s3werkzeugcache",parentName:"p"},"https://pypi.python.org/pypi/s3werkzeugcache"),"), memory or the file system\n(in a single server-type setup or for testing), or to write your own caching interface. Your\n",Object(s.b)("inlineCode",{parentName:"p"},"superset_config.py")," may look something like:"),Object(s.b)("pre",null,Object(s.b)("code",{className:"language-python",parentName:"pre"},"# On S3\nfrom s3cache.s3cache import S3Cache\nS3_CACHE_BUCKET = 'foobar-superset'\nS3_CACHE_KEY_PREFIX = 'sql_lab_result'\nRESULTS_BACKEND = S3Cache(S3_CACHE_BUCKET, S3_CACHE_KEY_PREFIX)\n\n# On Redis\nfrom cachelib.redis import RedisCache\nRESULTS_BACKEND = RedisCache(\n    host='localhost', port=6379, key_prefix='superset_results')\n")),Object(s.b)("p",null,"For performance gains, ",Object(s.b)("a",{href:"https://github.com/msgpack/msgpack-python",parentName:"p"},"MessagePack")," and\n",Object(s.b)("a",{href:"https://arrow.apache.org/docs/python/",parentName:"p"},"PyArrow")," are now used for results serialization. This can be\ndisabled by setting ",Object(s.b)("inlineCode",{parentName:"p"},"RESULTS_BACKEND_USE_MSGPACK = False")," in your ",Object(s.b)("inlineCode",{parentName:"p"},"superset_config.py"),", should any\nissues arise. Please clear your existing results cache store when upgrading an existing environment."),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"Important Notes")),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},"It is important that all the worker nodes and web servers in the Superset cluster ",Object(s.b)("em",{parentName:"p"},"share a common\nmetadata database"),". This means that SQLite will not work in this context since it has limited\nsupport for concurrency and typically lives on the local file system.")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},"There should ",Object(s.b)("em",{parentName:"p"},"only be one instance of celery beat running")," in your entire setup. If not,\nbackground jobs can get scheduled multiple times resulting in weird behaviors like duplicate\ndelivery of reports, higher than expected load / traffic etc.")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},"SQL Lab will ",Object(s.b)("em",{parentName:"p"},"only run your queries asynchronously if")," you enable ",Object(s.b)("strong",{parentName:"p"},"Asynchronous Query Execution"),"\nin your database settings (Sources > Databases > Edit record)."))),Object(s.b)("h3",{id:"celery-flower"},"Celery Flower"),Object(s.b)("p",null,"Flower is a web based tool for monitoring the Celery cluster which you can install from pip:"),Object(s.b)("pre",null,Object(s.b)("code",{className:"language-python",parentName:"pre"},"pip install flower\n")),Object(s.b)("p",null,"You can run flower using:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre"},"celery flower --app=superset.tasks.celery_app:app\n")))}void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/pages/docs/installation/async_queries_celery.mdx"}}),p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-docs-installation-async-queries-celery-mdx-532213a2c5c5f5582bdb.js.map