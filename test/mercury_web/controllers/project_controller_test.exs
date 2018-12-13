defmodule MercuryWeb.ProjectControllerTest do
  use MercuryWeb.ConnCase

  alias Mercury.Main
  alias Mercury.Main.Project

  @create_attrs %{complicity: 42, content: "some content", estimated_progress: 42, estimated_time: "some estimated_time", title: "some title"}
  @update_attrs %{complicity: 43, content: "some updated content", estimated_progress: 43, estimated_time: "some updated estimated_time", title: "some updated title"}
  @invalid_attrs %{complicity: nil, content: nil, estimated_progress: nil, estimated_time: nil, title: nil}

  def fixture(:project) do
    {:ok, project} = Main.create_project(@create_attrs)
    project
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all projects", %{conn: conn} do
      conn = get conn, project_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create project" do
    test "renders project when data is valid", %{conn: conn} do
      conn = post conn, project_path(conn, :create), project: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, project_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "complicity" => 42,
        "content" => "some content",
        "estimated_progress" => 42,
        "estimated_time" => "some estimated_time",
        "title" => "some title"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, project_path(conn, :create), project: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update project" do
    setup [:create_project]

    test "renders project when data is valid", %{conn: conn, project: %Project{id: id} = project} do
      conn = put conn, project_path(conn, :update, project), project: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, project_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "complicity" => 43,
        "content" => "some updated content",
        "estimated_progress" => 43,
        "estimated_time" => "some updated estimated_time",
        "title" => "some updated title"}
    end

    test "renders errors when data is invalid", %{conn: conn, project: project} do
      conn = put conn, project_path(conn, :update, project), project: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete project" do
    setup [:create_project]

    test "deletes chosen project", %{conn: conn, project: project} do
      conn = delete conn, project_path(conn, :delete, project)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, project_path(conn, :show, project)
      end
    end
  end

  defp create_project(_) do
    project = fixture(:project)
    {:ok, project: project}
  end
end
