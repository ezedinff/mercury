defmodule Mercury.Main.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field(:complicity, :integer)
    field(:content, :string)
    field(:estimated_progress, :integer)
    field(:estimated_time, :string)
    field(:title, :string)
    field(:published, :boolean)
    field(:image_binary, :binary)
    field(:image_binary_type, :string)
    field(:image_url, :string)
    belongs_to(:user, Mercury.Accounts.User)

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [
      :title,
      :content,
      :complicity,
      :estimated_time,
      :estimated_progress,
      :user_id,
      :image_binary_type,
      :image_binary,
      :image_url
    ])
    |> validate_required([:title])
  end
end
