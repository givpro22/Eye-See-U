import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2015', a: 20, b: 15 },
  { year: '2016', a: 50, b: 30 },
  { year: '2017', a: 75, b: 50 },
  { year: '2018', a: 90, b: 65 },
  { year: '2019', a: 100, b: 90 },
];

const SalesTrendChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">판매 분석</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="a" stroke="#3B82F6" strokeWidth={2} />
          <Line type="monotone" dataKey="b" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendChart;
