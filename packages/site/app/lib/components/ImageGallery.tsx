import type { Gallery } from "../cms/types";
import { Grid } from "./Grid";
import { urlFor } from "./PortableTexBlogtImage";

interface ImageGalleryProps {
  value: Gallery;
}

export const ImageGallery = ({ value }: ImageGalleryProps) => {
  console.log(value.images?.[0].alt);

  return (
    <Grid className="gallery-grid-container">
      {value.images?.map((im, index) => {
        if (!im.asset) {
          return null;
        }

        return (
          <div className={`gallery-grid-image-${index} gallery-grid-area`}>
            <img
              srcSet={`
                    ${urlFor(im)?.width(200).auto("format").url()} 600w,
                    ${urlFor(im)?.width(800).auto("format").url()} 800w,
                    ${urlFor(im)?.width(1200).auto("format").url()} 1200w
                  `}
              sizes="(max-width: 1200px) 100vw, 1200px"
              loading="lazy"
              alt={im.alt}
            />
          </div>
        );
      })}
    </Grid>
  );
};
