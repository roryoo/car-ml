import Masonry from 'react-masonry-css';
import "../styles/ImageGrid.css"; 
const imageData = [
  { src: 'https://cdn.pixabay.com/photo/2015/05/28/23/12/auto-788747_1280.jpg', label: 'Vintage ' },
  { src: 'https://cdn.pixabay.com/photo/2022/08/18/08/07/car-7394195_1280.jpg', label: 'Electric ' },
  { src: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg', label: 'Coupe' },
  { src: 'https://cdn.pixabay.com/photo/2024/03/21/14/29/car-8647805_1280.jpg', label: 'Luxury ' },
  { src: 'https://cdn.pixabay.com/photo/2015/10/19/20/01/petrol-996617_1280.jpg', label: 'Fuel ' },
  { src: 'https://cdn.pixabay.com/photo/2021/09/25/10/08/road-6654573_1280.jpg', label: 'Hybrid ' },
  { src: 'https://hips.hearstapps.com/hmg-prod/images/56312-hyundaimotorsioniq5ndebutsatgoodwoodfestivalofspeedsettingnewbenchmarkforhigh-performanceevsanddrivingfun-64aef9e91163a.jpg?crop=0.611xw:0.458xh;0.139xw,0.311xh&resize=1200:*', label: 'Sports ' },
  { src: 'https://cdn.pixabay.com/photo/2016/06/19/14/46/mercedes-benz-1466821_1280.jpg', label: 'Ergonomic ' },
  { src: 'https://cdn.pixabay.com/photo/2015/09/09/18/06/family-932245_1280.jpg', label: 'Family ' },
 
 
];
 
const breakpointColumnsObj = {
  default: 3, 
  1100: 3,
  700: 2,
  500: 1
};
 
const ImageGrid = () => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {imageData.map((item, index) => (
        <div key={index} className="item">
          <img src={item.src} alt={item.label} />
          <span>{item.label}</span>
        </div>
      ))}
    </Masonry>
  );
};
 
export default ImageGrid;