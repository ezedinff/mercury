defmodule MercuryWeb.ProjectView do
  use MercuryWeb, :view
  alias MercuryWeb.ProjectView

  def render("index.json", %{projects: projects}) do
    %{data: render_many(projects, ProjectView, "project.json")}
  end

  def render("show.json", %{project: project}) do
    %{data: render_one(project, ProjectView, "project.json")}
  end

  def render("project.json", %{project: project}) do
    %{
      id: project.id,
      title: project.title,
      content: project.content,
      complicity: project.complicity,
      estimated_time: project.estimated_time,
      estimated_progress: project.estimated_progress,
      user_id: project.user_id,
      image_binary_type: project.image_binary_type,
      image_binary: project.image_binary,
      image_url: project.image_url
    }
  end
end
