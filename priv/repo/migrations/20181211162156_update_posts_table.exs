defmodule Mercury.Repo.Migrations.UpdatePostsTable do
  use Ecto.Migration

  def change do
    alter table(:projects) do
      add(:published, :boolean)
      add(:user_id, references(:users, on_delete: :delete_all))
    end

    create(index(:projects, [:user_id]))
  end
end
