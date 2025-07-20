import {useState} from 'react';

function Dashboard() {
	const [reports, setReports] = useState([
		{id: 1, title: "Pothole on Main St", status: "pending", date:"2025-07-20"},
		{id: 2, title: "Broken Street Light", status: "resolved", date:"2025-04-13"},
		{id: 3, title: "Garbage dump on Road", status: "pending", date:"2025-04-12"},		
	]);

	const [stats, setStats] = useState({
		totalReports: 120,
		pending: 26,
		inProgress: 25,
		resolved: 69
	});

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="mb-8 min-w-full text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
				<p className="text-gray-600">Welcome back! Here's stuff for your</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-sm font-medium text-gray-500 uppercase">total reports</h3>
					<p className="text-3xl font-bold text-blue-600">{stats.totalReports}</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-sm font-medium text-gray-500 uppercase">pendings</h3>
					<p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-sm font-medium text-gray-500 uppercase">in progress</h3>
					<p className="text-3xl font-bold text-orange-600">{stats.inProgress}</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-sm font-medium text-gray-500 uppercase">resolved</h3>
					<p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md p-6 mb-8">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
					<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View All</button>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b">
								<th className="text-left py-2">Title</th>
								<th className="text-left py-2">Status</th>
								<th className="text-left py-2">Date</th>
								<th className="text-left py-2">Actions</th>
							</tr>
						</thead>
						<tbody>
							{reports.map((report) => (
								<tr key={report.id} className="border-b hover:bg-gray-50">
									<td className="py-3">{report.title}</td>
									<td className="py-3">
										<span className={`px-2 py-1 rounded-full text-xs ${
											report.status === 'pendinig' ? 'bg-yellow-100 text-yellow-800' :
											report.status === 'resolved' ? 'bg-green-100 text-green-800' :
											'bg-orange-100 text-orange-800'
										}`}>{report.status}</span>
									</td>
									<td className='py-3'>{report.date}</td>
									<td className='py-3'>
										<button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
										<button className="text-green-600 hover:text-green-800 mr-2">Edit</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>


		</div>
	)
}

export default Dashboard;