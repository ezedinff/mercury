defmodule Mercury.MainTest do
  use Mercury.DataCase

  alias Mercury.Main

  describe "projects" do
    alias Mercury.Main.Project

    @valid_attrs %{complicity: 42, content: "some content", estimated_progress: 42, estimated_time: "some estimated_time", title: "some title"}
    @update_attrs %{complicity: 43, content: "some updated content", estimated_progress: 43, estimated_time: "some updated estimated_time", title: "some updated title"}
    @invalid_attrs %{complicity: nil, content: nil, estimated_progress: nil, estimated_time: nil, title: nil}

    def project_fixture(attrs \\ %{}) do
      {:ok, project} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Main.create_project()

      project
    end

    test "list_projects/0 returns all projects" do
      project = project_fixture()
      assert Main.list_projects() == [project]
    end

    test "get_project!/1 returns the project with given id" do
      project = project_fixture()
      assert Main.get_project!(project.id) == project
    end

    test "create_project/1 with valid data creates a project" do
      assert {:ok, %Project{} = project} = Main.create_project(@valid_attrs)
      assert project.complicity == 42
      assert project.content == "some content"
      assert project.estimated_progress == 42
      assert project.estimated_time == "some estimated_time"
      assert project.title == "some title"
    end

    test "create_project/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Main.create_project(@invalid_attrs)
    end

    test "update_project/2 with valid data updates the project" do
      project = project_fixture()
      assert {:ok, project} = Main.update_project(project, @update_attrs)
      assert %Project{} = project
      assert project.complicity == 43
      assert project.content == "some updated content"
      assert project.estimated_progress == 43
      assert project.estimated_time == "some updated estimated_time"
      assert project.title == "some updated title"
    end

    test "update_project/2 with invalid data returns error changeset" do
      project = project_fixture()
      assert {:error, %Ecto.Changeset{}} = Main.update_project(project, @invalid_attrs)
      assert project == Main.get_project!(project.id)
    end

    test "delete_project/1 deletes the project" do
      project = project_fixture()
      assert {:ok, %Project{}} = Main.delete_project(project)
      assert_raise Ecto.NoResultsError, fn -> Main.get_project!(project.id) end
    end

    test "change_project/1 returns a project changeset" do
      project = project_fixture()
      assert %Ecto.Changeset{} = Main.change_project(project)
    end
  end
end
