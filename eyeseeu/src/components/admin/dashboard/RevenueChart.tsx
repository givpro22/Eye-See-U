import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '5k', lastMonth: 20, thisMonth: 30 },
  { name: '10k', lastMonth: 40, thisMonth: 65 },
  { name: '15k', lastMonth: 35, thisMonth: 25 },
  { name: '20k', lastMonth: 50, thisMonth: 50 },
  { name: '25k', lastMonth: 45, thisMonth: 60 },
  { name: '30k', lastMonth: 80, thisMonth: 40 },
  { name: '35k', lastMonth: 95, thisMonth: 70 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF7C7C" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FF7C7C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C084FC" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="lastMonth" stroke="#FF7C7C" fillOpacity={1} fill="url(#colorLast)" />
          <Area type="monotone" dataKey="thisMonth" stroke="#C084FC" fillOpacity={1} fill="url(#colorThis)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
