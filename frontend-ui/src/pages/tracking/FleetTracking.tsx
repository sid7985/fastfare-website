import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    MapPin, Truck, Search, Plus, Minus, Maximize,
    Info, Star, MoreVertical
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const drivers = [
    { id: "402", name: "John Doe", vehicle: "Volva FH16", location: "Queens Blvd, NY", status: "Online", eta: "4 mins away", lat: 60, lng: 30 },
    { id: "110", name: "Sarah Smith", vehicle: "Ford Transit", location: "I-95 South, NJ", status: "On Trip", eta: "I-95 South", lat: 40, lng: 50 },
    { id: "205", name: "Mike Ross", vehicle: "Freightliner", location: "Warehouse A", status: "Idle", eta: "Warehouse A", lat: 20, lng: 70 },
    { id: "301", name: "David Kim", vehicle: "Scania R-series", location: "Offline", status: "Offline", eta: "Last seen 2h ago", lat: 80, lng: 20 },
];

const FleetTracking = () => {
    const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDrivers = drivers.filter(d => {
        const matchesStatus = filter === "All" || d.status === filter;
        const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Online': return 'bg-green-100 text-green-700';
            case 'On Trip': return 'bg-blue-100 text-blue-700';
            case 'Idle': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-400';
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] -m-4 lg:-m-6">
                {/* Sidebar Driver List */}
                <div className="w-full lg:w-80 h-1/3 lg:h-full border-b lg:border-b-0 lg:border-r bg-white flex flex-col z-10 order-2 lg:order-1">
                    <div className="p-4 border-b">
                        <h2 className="font-bold text-lg mb-4">Drivers</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search drivers..."
                                className="pl-9 bg-gray-50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 mt-4 text-sm overflow-x-auto pb-2 lg:pb-0">
                            {['All', 'Online', 'On Trip'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${filter === f ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredDrivers.map(driver => (
                            <div
                                key={driver.id}
                                onClick={() => setSelectedDriver(driver.id)}
                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedDriver === driver.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${driver.id}`} />
                                        <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-sm truncate">{driver.name}</h3>
                                            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${getStatusColor(driver.status)}`}>
                                                {driver.status.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5">{driver.vehicle} • {driver.eta}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 h-2/3 lg:h-full relative bg-gray-100 order-1 lg:order-2">
                    {/* Map Stats Overlay */}
                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur rounded-xl shadow-sm border p-3 lg:p-4 flex gap-3 lg:gap-6 overflow-x-auto max-w-[calc(100%-32px)]">
                        <div>
                            <p className="text-[10px] lg:text-xs text-gray-500 uppercase font-bold tracking-wider">Total</p>
                            <p className="text-lg lg:text-2xl font-bold">{drivers.length}</p>
                        </div>
                        <div>
                            <p className="text-[10px] lg:text-xs text-green-600 uppercase font-bold tracking-wider">Active</p>
                            <p className="text-lg lg:text-2xl font-bold text-green-600">{drivers.filter(d => d.status === 'Online').length}</p>
                        </div>
                        <div>
                            <p className="text-[10px] lg:text-xs text-orange-500 uppercase font-bold tracking-wider">Idle</p>
                            <p className="text-lg lg:text-2xl font-bold text-orange-500">{drivers.filter(d => d.status === 'Idle').length}</p>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="w-full h-full relative overflow-hidden bg-[#e5e7eb] flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-10 bg-repeat space" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 to-slate-200/50" />

                        {/* Map Elements (Filtered) */}
                        {filteredDrivers.filter(d => d.status !== 'Offline').map(d => (
                            <div
                                key={d.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                style={{
                                    left: `${d.lng}%`,
                                    top: `${d.lat}%`,
                                    zIndex: selectedDriver === d.id ? 50 : 1
                                }}
                                onClick={() => setSelectedDriver(d.id)}
                            >
                                <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-white border-2 border-white transition-transform group-hover:scale-110 ${d.status === 'Online' ? 'bg-green-500' : d.status === 'On Trip' ? 'bg-blue-500' : 'bg-orange-500'} ${selectedDriver === d.id ? 'scale-125 ring-4 ring-blue-500/30' : ''}`}>
                                    <Truck className="h-4 w-4" />
                                </div>
                                {/* Tooltip */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1.5 rounded-lg shadow-xl border text-xs whitespace-nowrap z-20 transition-opacity ${selectedDriver === d.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'}`}>
                                    <p className="font-bold">{d.name}</p>
                                    <p className="text-gray-500">{d.location}</p>
                                </div>
                            </div>
                        ))}

                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                            <Button variant="secondary" size="icon" className="shadow-lg bg-white hover:bg-gray-50 text-gray-700">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="secondary" size="icon" className="shadow-lg bg-white hover:bg-gray-50 text-gray-700">
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Button variant="secondary" size="icon" className="shadow-lg bg-white hover:bg-gray-50 text-gray-700">
                                <Maximize className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Bottom Panel - Driver Performance (Desktop Only) */}
                    <div className="hidden lg:block absolute bottom-0 left-0 right-0 bg-white border-t p-4 z-10 max-h-64 overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">Driver Performance</h3>
                            <Button variant="ghost" className="text-blue-600 text-sm h-8">View Full Report</Button>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="text-xs text-gray-500 bg-gray-50 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium">Driver Name</th>
                                    <th className="px-4 py-2 text-left font-medium">Vehicle ID</th>
                                    <th className="px-4 py-2 text-left font-medium">Location</th>
                                    <th className="px-4 py-2 text-left font-medium">Status</th>
                                    <th className="px-4 py-2 text-left font-medium">Safety Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredDrivers.map(driver => (
                                    <tr key={driver.id} className={`hover:bg-gray-50/50 ${selectedDriver === driver.id ? 'bg-blue-50/50' : ''}`} onClick={() => setSelectedDriver(driver.id)}>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${driver.id}`} />
                                                    <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-gray-900">{driver.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {driver.vehicle} <span className="text-xs text-gray-400">({driver.id})</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{driver.location}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                                                ● {driver.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                {[...Array(4)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                                                <Star className="h-3.5 w-3.5 text-gray-300 fill-current" />
                                                <span className="text-gray-700 ml-1 text-xs">4.2</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FleetTracking;
