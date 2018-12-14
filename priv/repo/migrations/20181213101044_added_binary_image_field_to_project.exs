defmodule Mercury.Repo.Migrations.AddedBinaryImageFieldToProject do
  use Ecto.Migration

  def change do
    alter table(:projects) do
      add(:image_binary, :binary)
      add(:image_binary_type, :string)
      add(:image_url, :string)
    end
  end
end
