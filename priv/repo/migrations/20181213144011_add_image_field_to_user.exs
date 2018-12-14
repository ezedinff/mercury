defmodule Mercury.Repo.Migrations.AddImageFieldToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:image_binary, :binary)
      add(:image_binary_type, :string)
      add(:image_url, :string)
    end
  end
end
