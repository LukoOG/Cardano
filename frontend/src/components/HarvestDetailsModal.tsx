
import { Calendar, MapPin, Package, User, Building, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface HarvestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  harvest: {
    id: string;
    cropType: string;
    farmName: string;
    location: string;
    harvestDate: string;
    quantity: string;
    status: "pending" | "certified" | "rejected";
    certifier?: string;
  };
}

const HarvestDetailsModal = ({ isOpen, onClose, harvest }: HarvestDetailsModalProps) => {
  const getStatusBadge = () => {
    switch (harvest.status) {
      case "certified":
        return <Badge className="bg-farmfi-green-500 text-white">Certified</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-farmfi-earth-500 text-farmfi-earth-600">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-farmfi-green-700">Harvest Details - {harvest.id}</span>
            {getStatusBadge()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-farmfi-green-700 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-farmfi-green-500" />
                  <span className="font-medium">Crop Type:</span>
                </div>
                <p className="text-gray-700 ml-6">{harvest.cropType}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-farmfi-green-500" />
                  <span className="font-medium">Farm Name:</span>
                </div>
                <p className="text-gray-700 ml-6">{harvest.farmName}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-farmfi-green-500" />
                  <span className="font-medium">Location:</span>
                </div>
                <p className="text-gray-700 ml-6">{harvest.location}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-farmfi-green-500" />
                  <span className="font-medium">Harvest Date:</span>
                </div>
                <p className="text-gray-700 ml-6">{harvest.harvestDate}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-farmfi-green-500" />
                  <span className="font-medium">Quantity:</span>
                </div>
                <p className="text-gray-700 ml-6">{harvest.quantity}</p>
              </div>

              {harvest.certifier && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-farmfi-green-500" />
                    <span className="font-medium">Certified By:</span>
                  </div>
                  <p className="text-gray-700 ml-6">{harvest.certifier}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-farmfi-green-700">Additional Information</h3>
            
            <div className="bg-farmfi-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-farmfi-green-700 mb-2">Processing Method</h4>
              <p className="text-gray-700 text-sm">
                Traditional sun-drying method used. Beans were fermented for 5-7 days before drying.
                Quality grade: Premium A. Stored in dry, well-ventilated warehouse.
              </p>
            </div>

            <div className="bg-farmfi-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-farmfi-green-700 mb-2">Quality Metrics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Moisture Content:</span>
                  <span className="ml-2 text-gray-700">7.2%</span>
                </div>
                <div>
                  <span className="font-medium">Bean Size:</span>
                  <span className="ml-2 text-gray-700">Grade 1</span>
                </div>
                <div>
                  <span className="font-medium">Defect Rate:</span>
                  <span className="ml-2 text-gray-700">2.1%</span>
                </div>
                <div>
                  <span className="font-medium">pH Level:</span>
                  <span className="ml-2 text-gray-700">5.8</span>
                </div>
              </div>
            </div>

            <div className="bg-farmfi-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-farmfi-green-700 mb-2">Blockchain Information</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="font-medium">Transaction Hash:</span>
                  <span className="ml-2 text-gray-700 font-mono">0x1a2b3c4d5e6f7g8h9i0j...</span>
                </div>
                <div>
                  <span className="font-medium">Smart Contract:</span>
                  <span className="ml-2 text-gray-700 font-mono">0xAbC123DeF456...</span>
                </div>
                <div>
                  <span className="font-medium">Network:</span>
                  <span className="ml-2 text-gray-700">Ethereum Mainnet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HarvestDetailsModal;
