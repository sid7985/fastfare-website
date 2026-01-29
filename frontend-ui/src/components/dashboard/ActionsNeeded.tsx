import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ActionsNeededProps {
  hasActions?: boolean;
}

const ActionsNeeded = ({ hasActions = false }: ActionsNeededProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actions Needing Your Attention Today</CardTitle>
      </CardHeader>
      <CardContent>
        {hasActions ? (
          <div className="space-y-3">
            {/* Action items would go here */}
            <p className="text-muted-foreground">No pending actions</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 bg-muted/50 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <p className="text-muted-foreground">
              All caught up! No actions needed right now.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionsNeeded;
