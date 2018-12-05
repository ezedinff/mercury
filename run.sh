#!/bin/sh
# With help from https://dogsnog.blog/2018/02/02/a-docker-based-development-environment-for-elixirphoenix/
set -e
# Wait for Postgres to become available.

mix do deps.get, deps.compile
mix ecto.create
mix ecto.migrate
mix phx.server

