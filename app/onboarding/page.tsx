'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Store, MapPin, Package, ChevronRight, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    location: '',
    mainProduct: '',
  });

  const businessTypes = [
    'Warung Makan',
    'Toko Kelontong',
    'Kafe',
    'Online Shop',
    'Jasa',
    'Lainnya',
  ];

  const handleNext = () => {
    if (step === 1 && !formData.businessName) {
      toast({
        title: 'Mohon Isi Nama Usaha',
        description: 'Nama usaha diperlukan untuk melanjutkan.',
        variant: 'destructive',
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    toast({
      title: 'Selamat Datang di TLATEN!',
      description: 'Profil usaha Anda sudah tersimpan. Mari mulai berjualan!',
    });

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mari Kenalan Dulu!</h1>
          <p className="text-gray-600">Ceritakan sedikit tentang usaha Anda</p>

          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step
                    ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500'
                    : i < step
                    ? 'w-2 bg-pink-300'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="shadow-xl border-2 border-pink-100">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Store className="w-8 h-8 text-pink-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-base">
                    Apa nama usaha Anda?
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Contoh: Warung Siti"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="h-14 text-base"
                    autoFocus
                  />
                  <p className="text-sm text-gray-500">
                    Nama ini akan muncul di dashboard Anda
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Jenis usaha apa yang Anda jalankan?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {businessTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="outline"
                        className={`h-14 text-base ${
                          formData.businessType === type
                            ? 'border-2 border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-300 hover:border-pink-300'
                        }`}
                        onClick={() => setFormData({ ...formData, businessType: type })}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-pink-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-cyan-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base">
                      Di mana lokasi usaha Anda?
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Contoh: Jakarta Selatan"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="h-14 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainProduct" className="text-base">
                      Apa produk utama yang Anda jual?
                    </Label>
                    <Input
                      id="mainProduct"
                      type="text"
                      placeholder="Contoh: Nasi goreng, Minuman"
                      value={formData.mainProduct}
                      onChange={(e) =>
                        setFormData({ ...formData, mainProduct: e.target.value })
                      }
                      className="h-14 text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="h-12 px-6"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Kembali
                </Button>
              )}
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                {step === 3 ? 'Selesai' : 'Lanjut'}
                {step < 3 && <ChevronRight className="w-5 h-5 ml-1" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Langkah {step} dari 3
        </p>
      </div>
    </div>
  );
}
