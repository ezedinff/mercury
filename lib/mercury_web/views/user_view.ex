defmodule MercuryWeb.UserView do
  use MercuryWeb, :view
  alias MercuryWeb.UserView

  def render("index.json", %{users: users, current_user: %{is_staff: true}}) do
    %{
      data: %{
        users: render_many(users, UserView, "user.json")
      }
    }
  end

  def render("index.json", %{users: users}) do
    %{
      data: %{
        users: render_many(users, UserView, "show_user.json")
      }
    }
  end

  def render("show.json", %{user: user, current_user: %{is_staff: true}}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "show_user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      last_login: user.last_login,
      is_staff: user.is_staff,
      is_superuser: user.is_superuser,
      image_binary_type: user.image_binary_type,
      image_binary: user.image_binary,
      image_url: user.image_url
    }
  end

  def render("show_user.json", %{user: user}) do
    %{id: user.id, username: user.username, name: user.name, last_login: user.last_login}
    # email: user.email
  end

  def render("404.json", _assigns) do
    %{errors: "User not found"}
  end
end
