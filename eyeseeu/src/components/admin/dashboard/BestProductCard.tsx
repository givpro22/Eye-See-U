interface Props {
    name: string;
    price: number;
    image: string;
  }
  
  const BestProductCard: React.FC<Props> = ({ name, price, image }) => {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">특정 상품</h3>
        <img src={image} alt={name} className="w-28 h-28 mx-auto mb-2 rounded-full object-cover" />
        <p className="font-semibold text-sm">가장 많이 팔린 상품</p>
        <p className="text-purple-600 font-bold text-sm mt-1">{price.toLocaleString()}원</p>
      </div>
    );
  };
  
  export default BestProductCard;
  