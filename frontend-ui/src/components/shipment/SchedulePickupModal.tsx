import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Calendar } from "lucide-react";

interface SchedulePickupModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    awb: string;
}

const SchedulePickupModal = ({ open, onOpenChange, awb }: SchedulePickupModalProps) => {
    const [selectedDate, setSelectedDate] = useState<string>("today");

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dates = [
        { id: "today", label: "Today", value: today.toLocaleDateString('en-GB') },
        { id: "tomorrow", label: "Tomorrow", value: tomorrow.toLocaleDateString('en-GB') },
        { id: "date3", label: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: '2-digit' }), value: "date3" },
        { id: "date4", label: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: '2-digit' }), value: "date4" },
        { id: "date5", label: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: '2-digit' }), value: "date5" },
    ];

    const handleSchedule = () => {
        // Logic to schedule pickup (API call would go here)
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Schedule Your Pick Up</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Success Message */}
                    <div className="bg-green-50 p-4 rounded-lg flex gap-3 items-start border border-green-100">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-sm">
                            Your package has been assigned to <span className="font-semibold">Delhivery Surface</span> successfully.
                            The AWB number of the same is <span className="text-primary font-medium">{awb}</span>.
                        </p>
                    </div>

                    {/* Pickup Address */}
                    <div className="bg-muted/50 p-4 rounded-lg flex gap-3 items-start">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm">Pick Up Address</p>
                            <p className="text-sm text-muted-foreground">
                                f-50 prem nagar 2nd, Gurjar ki Thadi Underpass gujar ki thadi, Jaipur, Rajasthan, India, 302019
                            </p>
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <p className="font-medium text-sm">Please select a suitable date for your order to be picked up</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {dates.map((date) => (
                                <button
                                    key={date.id}
                                    onClick={() => setSelectedDate(date.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedDate === date.id
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-background border-input hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                >
                                    {date.label}
                                </button>
                            ))}
                        </div>

                        {selectedDate === "today" && (
                            <p className="text-xs text-blue-600">
                                In case you schedule the pick up for Today, You will not be able to reschedule this pick up.
                            </p>
                        )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Note:</span> Please ensure that your invoice is in the package, and your label is visible on the package to be delivered.
                    </p>
                </div>

                <DialogFooter className="flex items-center sm:justify-between w-full gap-4">
                    <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-transparent" onClick={() => onOpenChange(false)}>
                        I'll do it later
                    </Button>
                    <Button className="gradient-primary" onClick={handleSchedule}>
                        Schedule Pick Up
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SchedulePickupModal;
