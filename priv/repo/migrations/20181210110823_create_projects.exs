defmodule Mercury.Repo.Migrations.CreateProjects do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :title, :string
      add :content, :text
      add :complicity, :integer
      add :estimated_time, :string
      add :estimated_progress, :integer

      timestamps()
    end

  end
end
