# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :mercury,
  ecto_repos: [Mercury.Repo]

# Configures the endpoint
config :mercury, MercuryWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "H5AcfaG9fEz2gjjKEBJ3PNT7peIPEo270GOHwgataQEsfdx8Ujsi3aDlxel77eQH",
  render_errors: [view: MercuryWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Mercury.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Configures Guardian
config :mercury, MercuryWeb.Guardian,
  issuer: "mercury",
  ttl: {30, :days},
  verify_issuer: true
  # serializer: Mercury.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
