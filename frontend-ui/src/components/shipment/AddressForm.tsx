import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface AddressData {
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  landmark: string;
  addressType: string;
  saveAddress: boolean;
}

interface AddressFormProps {
  type: "pickup" | "delivery";
  data: AddressData;
  onChange: (data: AddressData) => void;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry", "Jammu and Kashmir", "Ladakh",
  "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
];

const AddressForm = ({ type, data, onChange }: AddressFormProps) => {
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");

  const handleChange = (field: keyof AddressData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  // Auto-fill city & state from pincode using India Post API
  const fetchPincodeDetails = useCallback(async (pincode: string) => {
    if (pincode.length !== 6) return;
    setPincodeLoading(true);
    setPincodeError("");
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const json = await res.json();
      if (json[0]?.Status === "Success" && json[0]?.PostOffice?.length > 0) {
        const po = json[0].PostOffice[0];
        onChange({
          ...data,
          pincode,
          city: po.District || po.Division || "",
          state: po.State || "",
        });
      } else {
        setPincodeError("Invalid pincode");
      }
    } catch {
      setPincodeError("Could not verify pincode");
    } finally {
      setPincodeLoading(false);
    }
  }, [data, onChange]);

  // Trigger auto-fill when pincode reaches 6 digits
  useEffect(() => {
    if (data.pincode.length === 6) {
      fetchPincodeDetails(data.pincode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.pincode]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${type}-name`}>Contact Name *</Label>
          <Input
            id={`${type}-name`}
            placeholder="Enter full name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-phone`}>Phone Number *</Label>
          <div className="flex">
            <div className="flex items-center justify-center px-3 border rounded-l-md bg-muted text-muted-foreground border-r-0">
              +91
            </div>
            <Input
              id={`${type}-phone`}
              placeholder="9876543210"
              value={data.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  handleChange("phone", value);
                }
              }}
              className="rounded-l-none"
              maxLength={10}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-email`}>Email Address</Label>
        <Input
          id={`${type}-email`}
          type="email"
          placeholder="email@example.com"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-address`}>Complete Address *</Label>
        <Textarea
          id={`${type}-address`}
          placeholder="House/Flat No., Building, Street, Area"
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${type}-pincode`}>PIN Code *</Label>
          <div className="relative">
            <Input
              id={`${type}-pincode`}
              placeholder="6-digit PIN"
              value={data.pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 6) {
                  handleChange("pincode", value);
                }
              }}
              maxLength={6}
              inputMode="numeric"
            />
            {pincodeLoading && (
              <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
          {pincodeError && (
            <p className="text-xs text-red-500">{pincodeError}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-city`}>City *</Label>
          <Input
            id={`${type}-city`}
            placeholder="Auto-filled from PIN"
            value={data.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-state`}>State *</Label>
          <Select
            value={data.state}
            onValueChange={(value) => handleChange("state", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Auto-filled from PIN" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-landmark`}>Landmark</Label>
        <Input
          id={`${type}-landmark`}
          placeholder="Nearby landmark (optional)"
          value={data.landmark}
          onChange={(e) => handleChange("landmark", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Address Type</Label>
        <Select
          value={data.addressType}
          onValueChange={(value) => handleChange("addressType", value)}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="office">Office</SelectItem>
            <SelectItem value="warehouse">Warehouse</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id={`${type}-save`}
          checked={data.saveAddress}
          onCheckedChange={(checked) => handleChange("saveAddress", checked)}
        />
        <Label htmlFor={`${type}-save`} className="text-sm font-normal">
          Save this address for future shipments
        </Label>
      </div>
    </div>
  );
};

export default AddressForm;
