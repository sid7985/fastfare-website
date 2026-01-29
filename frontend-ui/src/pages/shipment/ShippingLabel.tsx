import { forwardRef } from "react";
import logo from "@/assets/logo.png";

export interface LabelData {
    orderId: string;
    awbNumber: string;
    createdAt: string;
    paymentMode: string;
    codAmount?: number;
    totalWeight: number;
    dimensions: string;
    carrier: string;
    routingCode: string;
    pickup: {
        name: string;
        address: string;
        phone: string;
        pincode: string;
    };
    delivery: {
        name: string;
        address: string;
        phone: string;
        pincode: string;
    };
    products: Array<{
        name: string;
        sku: string;
        qty: number;
        price: number;
    }>;
}

interface ShippingLabelProps {
    data: LabelData;
}

const BarcodeByCSS = ({ value, className = "" }: { value: string; className?: string }) => (
    <div className={`flex flex-col items-center ${className}`}>
        {/* Simulated Barcode using repeating gradient */}
        <div
            className="h-12 w-full"
            style={{
                backgroundImage: `repeating-linear-gradient(90deg, 
          black 0px, black 2px, 
          transparent 2px, transparent 4px,
          black 4px, black 5px,
          transparent 5px, transparent 8px,
          black 8px, black 11px,
          transparent 11px, transparent 13px
        )`,
                backgroundSize: "60px 100%"
            }}
        />
        <span className="text-xs font-mono mt-1 tracking-widest">{value}</span>
    </div>
);

const ShippingLabel = forwardRef<HTMLDivElement, ShippingLabelProps>(({ data }, ref) => {
    return (
        <div ref={ref} className="bg-white p-4 max-w-[800px] mx-auto text-black font-sans box-border">
            <div className="border-[3px] border-black">
                {/* Section 1: Ship To */}
                <div className="p-2 border-b-2 border-black">
                    <p className="font-bold text-sm mb-1">Ship To</p>
                    <div className="text-lg font-bold">{data.delivery.name}</div>
                    <div className="text-sm whitespace-pre-wrap">{data.delivery.address}</div>
                    <div className="text-sm font-bold mt-1">PIN: {data.delivery.pincode}</div>
                    <div className="text-sm mt-1">Phone No.: {data.delivery.phone}</div>
                </div>

                {/* Section 2: Shipment Details & Routing */}
                <div className="flex border-b-2 border-black">
                    {/* Left: Dimensions, Payment, Weight */}
                    <div className="w-1/2 p-2 border-r-2 border-black text-sm space-y-1">
                        <div className="flex justify-between">
                            <span>Dimensions:</span>
                            <span>{data.dimensions}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Payment:</span>
                            <span>{data.paymentMode.toUpperCase()}</span>
                        </div>
                        {data.paymentMode === 'cod' && (
                            <div className="flex justify-between font-bold">
                                <span>COD Amount:</span>
                                <span>₹{data.codAmount}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Weight:</span>
                            <span>{data.totalWeight} kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span>eWaybill No.:</span>
                            <span>N/A</span>
                        </div>
                    </div>

                    {/* Right: Carrier & AWB Barcode */}
                    <div className="w-1/2 p-2 flex flex-col items-center justify-center">
                        <div className="text-lg font-serif mb-2">{data.carrier} Surface</div>
                        <BarcodeByCSS value={data.awbNumber} className="w-4/5" />
                        <div className="mt-2 font-bold text-sm">Routing Code: {data.routingCode}</div>
                    </div>
                </div>

                {/* Section 3: Return Address & Order Barcode */}
                <div className="flex border-b-2 border-black">
                    {/* Left: Return Address */}
                    <div className="w-1/2 p-2 border-r-2 border-black text-sm">
                        <p className="mb-1 text-xs text-gray-600">(If undelivered, return to)</p>
                        <div className="font-bold font-serif italic">{data.pickup.name}</div>
                        <div className="whitespace-pre-wrap">{data.pickup.address}</div>
                        <div className="font-bold mt-1">{data.pickup.pincode}</div>
                        <div className="mt-1">Phone No.: {data.pickup.phone}</div>
                    </div>

                    {/* Right: Order ID Barcode */}
                    <div className="w-1/2 p-2 flex flex-col items-center justify-center">
                        <div className="text-sm mb-2">Order #: {data.orderId}</div>
                        <BarcodeByCSS value={data.orderId} className="w-4/5" />
                        <div className="mt-2 text-xs">Invoice Date: {new Date(data.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>

                {/* Section 4: Product Table */}
                <div className="border-b-2 border-black">
                    <table className="w-full text-xs text-center border-collapse">
                        <thead>
                            <tr className="font-bold border-b border-black">
                                <th className="p-1 border-r border-black text-left w-1/3">Product Name & SKU</th>
                                <th className="p-1 border-r border-black">Qty</th>
                                <th className="p-1 border-r border-black">Unit Price</th>
                                <th className="p-1">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product, idx) => (
                                <tr key={idx} className="border-b border-black last:border-0">
                                    <td className="p-1 border-r border-black text-left">
                                        <div className="font-bold">{product.name}</div>
                                        <div className="text-[10px] text-gray-600">SKU: {product.sku}</div>
                                    </td>
                                    <td className="p-1 border-r border-black">{product.qty}</td>
                                    <td className="p-1 border-r border-black">{product.price}</td>
                                    <td className="p-1">{product.qty * product.price}</td>
                                </tr>
                            ))}
                            {/* Totals Row */}
                            <tr className="font-bold bg-gray-50">
                                <td className="p-1 border-r border-black text-right" colSpan={3}>Grand Total</td>
                                <td className="p-1">
                                    {data.products.reduce((sum, p) => sum + (p.qty * p.price), 0)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer: Disclaimer & Branding */}
                <div className="p-2 text-xs border-t-2 border-black flex justify-between items-end">
                    <div className="w-3/4">
                        All disputes are subject to local jurisdiction only. Goods once sold will only be taken back or exchanged as per the store's exchange/return policy.
                        <div className="mt-2 font-bold">THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE.</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-gray-500">Powered By:</div>
                        <div className="font-bold text-lg text-primary flex items-center justify-end gap-1">
                            <img src={logo} alt="FastFare" className="h-4 w-auto grayscale" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ShippingLabel;
