export const SlidingImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => {
  const c =
    width && height
      ? `aspect-[${width}/${height}] h-[${height}px] object-cover`
      : "";

  return (
  <div className="relative overflow-hidden align-baseline md:col-end-5">
    <div className="animate-asset-slide-up overflow-hidden">
      <div className="animate-asset-slide-down overflow-hidden">
        <img src={src} className={c} alt={alt} />
      </div>
    </div>
  </div>  
  );
};
