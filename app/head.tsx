import DefaultMetaTags from "@components/DefaultMetaTags";

export default async function Head({ params }) {
  const title = "Filecoin Client Explorer";
  const description = "Welcome to Filecoin Client Explorer";
  const url = "filecoin-discover.com";
  const img =
    "https://user-images.githubusercontent.com/28320272/231632725-db8f9109-a491-44a8-a4ee-b52f945b6454.png";

  return (
    <>
      <title>{title}</title>
      <DefaultMetaTags />
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />

      <meta property="twitter:card" content={img} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={img} />
    </>
  );
}
