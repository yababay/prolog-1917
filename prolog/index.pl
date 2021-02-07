:- use_module(library(pengines)).
:- pengine_application(silver_age).
:- use_module(silver_age:'./persons-1917/index.pl').
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- http_handler(root(.), http_reply_from_files('.', []), [prefix]).
:- initialization
        http_server(http_dispatch, [port(8030)]).
