
import { useState } from "react";
import { Calendar, Sprout, MapPin, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MintHarvestForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: "",
    farmName: "",
    location: "",
    harvestDate: "",
    quantity: "",
    unit: "",
    description: "",
    coordinates: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate NFT minting process
    setTimeout(() => {
      toast({
        title: "Harvest NFT Minted Successfully!",
        description: `Your ${formData.cropType} harvest record has been created and is pending certification.`,
      });
      setIsLoading(false);
      setFormData({
        cropType: "",
        farmName: "",
        location: "",
        harvestDate: "",
        quantity: "",
        unit: "",
        description: "",
        coordinates: ""
      });
    }, 2000);
  };

  const cropOptions = [
    "Tomatoes", "Lettuce", "Carrots", "Potatoes", "Corn", "Wheat", 
    "Rice", "Soybeans", "Apples", "Oranges", "Other"
  ];

  return (
    <Card className="border-farmfi-green-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-farmfi-green-700">
          <Sprout className="h-5 w-5" />
          <span>Mint New Harvest NFT</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {cropOptions.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name</Label>
              <Input
                id="farmName"
                value={formData.farmName}
                onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                placeholder="Enter farm name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-farmfi-green-500" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="City, State/Province, Country"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvestDate">Harvest Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-farmfi-green-500" />
                <Input
                  id="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="relative">
                <Package className="absolute left-3 top-3 h-4 w-4 text-farmfi-green-500" />
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="0"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                  <SelectItem value="bushels">Bushels</SelectItem>
                  <SelectItem value="boxes">Boxes</SelectItem>
                  <SelectItem value="crates">Crates</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Additional Notes</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Organic certification, growing methods, storage conditions, etc."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-bg text-white hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Minting NFT..." : "Mint Harvest NFT"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MintHarvestForm;
