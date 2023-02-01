import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId:'bpi9efp0',
    dataset:'production',
    apiVersion: '2023-01-24',
    useCdn: true,
    token: 'sklhTum2gegXoxka30N2ey9b5bCvXYGlFo4AfOJ4xBW1gHWV9ALSjUdX5MMF7mDiO1BY21izdqe44OV3JQDsHg3amiVWjVgvOChtaju56h516KlSs8anzy5BKYybhvvTBgfAEeuNLai3ZJEYDl5GidZ394PMAOc0FlY9Yv5sWgbvuUZPVuuF'
});


const builder = imageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source);
}

export default urlFor;