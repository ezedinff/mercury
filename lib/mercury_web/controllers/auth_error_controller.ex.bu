defmodule MercuryWeb.AuthErrorController do
  import Plug.Conn
  use MercuryWeb, :controller

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:unauthorized)
    |> render(MercuryWeb.SessionView, "wrong_credentials.json")
  end
end
