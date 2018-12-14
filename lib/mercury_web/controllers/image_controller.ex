defmodule Mercury.ImageController do
  use MercuryWeb, :controller

  def create(conn, %{"image" => image_base64}) do
    s3_url = Mercury.AssetStore.upload(image_base64)

    conn
    |> put_status(201)
    |> json(%{"url" => s3_url})
  end
end
