import './chart.scss';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ title, dataSub = [] }) => {
  // Thay đổi cấu trúc của mảng dữ liệu
  const data = dataSub.slice(0, 6).map(item => ({
    name: `Tháng ${item.month} năm ${item.year}`,
    Total: item.totalRevenue,
  }));

  // Sắp xếp mảng theo tháng giảm dần
  data.sort((a, b) => {
    const monthA = parseInt(a.name.split(' ')[1]);
    const yearA = parseInt(a.name.split(' ')[3]);
    const monthB = parseInt(b.name.split(' ')[1]);
    const yearB = parseInt(b.name.split(' ')[3]);

    if (yearA === yearB) {
      return monthA - monthB;
    } else {
      return yearA - yearB;
    }
  });

  return (
    <div className="chart">
      <div className="title">{title}</div>
      {/* <ResponsiveContainer width="100%" height={100}> */}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
