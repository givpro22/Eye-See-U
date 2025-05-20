interface ProductCardProps {
  name: string;
  price: number | string;
  description?: string;
  image: string;
  state: 'AVAILABLE' | 'OUT_OF_STOCK' | 'HIDDEN';
  showHidden?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  image,
  state,
  showHidden = false,
}) => {
  if (state === 'HIDDEN' && showHidden) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <img src={image} alt={name} className="w-full h-48 object-contain rounded-lg" />
      <h3 className="mt-4 font-semibold text-lg">{name}</h3>
      <p className="text-purple-600 font-bold">{Number(price).toLocaleString()}원</p>
      {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
      <button className="mt-3 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">편집하기</button>
      {state !== 'AVAILABLE' && (
        <p className="text-xs text-red-500 mt-1">
          {state === 'OUT_OF_STOCK' ? '품절' : '숨김'}
        </p>
      )}
    </div>
  );
};

export default ProductCard;