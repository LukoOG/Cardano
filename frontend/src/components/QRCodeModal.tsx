
import { useState, useEffect } from "react";
import { QrCode, Download, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftId: string;
  cropType: string;
}

const QRCodeModal = ({ isOpen, onClose, nftId, cropType }: QRCodeModalProps) => {
  const { toast } = useToast();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [traceUrl, setTraceUrl] = useState("");

  useEffect(() => {
    if (isOpen && nftId) {
      generateQRCode();
    }
  }, [isOpen, nftId]);

  const generateQRCode = async () => {
    try {
      const url = `https://farmfi.trace/${nftId}`;
      setTraceUrl(url);
      
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeDataUrl(qrDataUrl);
      
      toast({
        title: "QR Code Generated",
        description: `QR code for ${cropType} harvest created successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(traceUrl);
    toast({
      title: "Copied!",
      description: "Traceability URL copied to clipboard.",
    });
  };

  const downloadQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `farmfi-qr-${nftId}.png`;
      link.href = qrCodeDataUrl;
      link.click();
      
      toast({
        title: "Download Started",
        description: "QR code image download has started.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-farmfi-green-700">
            <QrCode className="h-5 w-5" />
            <span>QR Code - {nftId}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {qrCodeDataUrl && (
            <div className="text-center">
              <div className="inline-block p-4 bg-white border-2 border-farmfi-green-200 rounded-lg">
                <img 
                  src={qrCodeDataUrl} 
                  alt={`QR Code for ${nftId}`}
                  className="w-48 h-48"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Traceability URL</Label>
            <div className="flex space-x-2">
              <Input 
                value={traceUrl} 
                readOnly 
                className="text-sm"
              />
              <Button size="icon" variant="outline" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={downloadQR} 
            className="w-full bg-farmfi-green-600 hover:bg-farmfi-green-700 text-white"
            disabled={!qrCodeDataUrl}
          >
            <Download className="h-4 w-4 mr-2" />
            Download QR Code
          </Button>

          <div className="text-xs text-gray-600 bg-farmfi-green-50 p-3 rounded border">
            <p><strong>How to use:</strong></p>
            <p>• Print this QR code on product packaging</p>
            <p>• Customers can scan to view harvest details</p>
            <p>• Links directly to blockchain verification</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
