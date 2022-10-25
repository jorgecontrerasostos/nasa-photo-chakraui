import React, { useEffect, useState } from "react";
import { Heading, Container, Text, Image } from "@chakra-ui/react";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const NasaPhoto = () => {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    fetchPhoto();
    async function fetchPhoto() {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      const data = await response.json();
      setPhotoData(data);
      console.log(data);
    }
  }, []);

  if (!photoData) return <div />;
  return (
    <>
      <Container maxW="full">
        <Heading as="h2">{photoData.title}</Heading>
        {photoData.media_type === "image" ? (
          <Image
            boxSize="600px"
            margin="auto"
            src={photoData.url}
            alt={photoData.title}
          />
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}
        <Text>{photoData.explanation}</Text>
      </Container>
    </>
  );
};

export default NasaPhoto;
