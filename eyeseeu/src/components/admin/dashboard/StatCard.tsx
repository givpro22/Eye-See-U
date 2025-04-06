interface Props {
    title: string;
    data: {
      total: number;
      revisit: number;
    };
  }
  
  const StatCard: React.FC<Props> = ({ title, data }) => {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {/* 원형 차트는 생략하고 텍스트 중심으로 표현 */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-2xl font-bold">{data.total.toLocaleString()}</p>
            <p className="text-sm text-blue-500 mt-1">새로운 고객</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold">{data.revisit.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">재방문 고객</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatCard;
  