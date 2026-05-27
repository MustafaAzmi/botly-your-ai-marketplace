import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import {
  Camera, Plus, Package, Settings, Truck, Edit3, Trash2, Tag,
  Store as StoreIcon, MapPin, Phone, Clock, Star, Image as ImageIcon
} from "lucide-react";

export const Route = createFileRoute("/merchant-store")({
  head: () => ({
    meta: [
      { title: "إدارة المتجر — Botly" },
      { name: "description", content: "أضف منتجاتك وحدد الأسعار والخصومات وأدر إعدادات متجرك ومزود التوصيل." },
    ],
  }),
  component: MerchantStorePage,
});

type Product = {
  id: string;
  name: string;
  description: string;
  priceBefore: number;
  priceAfter: number;
  image: string;
  stock: number;
};

const initialProducts: Product[] = [
  { id: "1", name: "سماعات بلوتوث برو", description: "صوت نقي وعزل ضوضاء نشط", priceBefore: 599, priceAfter: 399, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", stock: 24 },
  { id: "2", name: "ساعة ذكية الجيل الجديد", description: "متابعة صحية كاملة + GPS", priceBefore: 1299, priceAfter: 899, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", stock: 12 },
  { id: "3", name: "حقيبة ظهر مقاومة للماء", description: "تتسع للابتوب 16 بوصة", priceBefore: 350, priceAfter: 249, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", stock: 40 },
];

const deliveryCompanies = ["أرامكس", "سمسا", "DHL", "FedEx", "بوسطة", "مندوب داخلي"];

function MerchantStorePage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [logo, setLogo] = useState<string>("https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200");
  const [cover, setCover] = useState<string>("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600");
  const [storeName, setStoreName] = useState("متجر Botly التجريبي");
  const [tagline, setTagline] = useState("أفضل العروض على المنتجات المختارة بعناية");

  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const saveProduct = (p: Product) => {
    if (products.find(x => x.id === p.id)) {
      setProducts(products.map(x => x.id === p.id ? p : x));
    } else {
      setProducts([{ ...p, id: Date.now().toString() }, ...products]);
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-wave-blue pb-16">
      {/* Cover + Logo (Facebook style) */}
      <div className="relative z-10">
        <div className="relative h-56 md:h-72 w-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-400">
          <img src={cover} alt="غلاف المتجر" className="w-full h-full object-cover" />
          <label className="absolute bottom-4 left-4 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setCover)} />
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur text-white px-4 py-2 rounded-xl text-sm hover:bg-black/80 transition">
              <Camera className="size-4" /> تغيير صورة الغلاف
            </div>
          </label>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-20">
            <div className="relative">
              <div className="size-32 md:size-40 rounded-3xl border-4 border-background bg-card overflow-hidden shadow-card">
                <img src={logo} alt="شعار المتجر" className="w-full h-full object-cover" />
              </div>
              <label className="absolute bottom-2 left-2 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setLogo)} />
                <div className="size-9 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-glow hover:scale-105 transition">
                  <Camera className="size-4" />
                </div>
              </label>
            </div>

            <div className="flex-1 md:pb-2">
              <h1 className="text-2xl md:text-3xl font-display font-bold">{storeName}</h1>
              <p className="text-muted-foreground text-sm mt-1">{tagline}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="rounded-full"><Star className="size-3 ml-1 fill-warning text-warning" /> 4.9</Badge>
                <Badge variant="secondary" className="rounded-full"><Package className="size-3 ml-1" /> {products.length} منتج</Badge>
                <Badge variant="secondary" className="rounded-full"><Truck className="size-3 ml-1" /> توصيل سريع</Badge>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="products" className="mt-8">
            <TabsList className="bg-card/80 backdrop-blur rounded-2xl p-1 h-12">
              <TabsTrigger value="products" className="rounded-xl gap-2"><Package className="size-4" /> المنتجات</TabsTrigger>
              <TabsTrigger value="delivery" className="rounded-xl gap-2"><Truck className="size-4" /> التوصيل</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl gap-2"><Settings className="size-4" /> الإعدادات</TabsTrigger>
            </TabsList>

            {/* PRODUCTS */}
            <TabsContent value="products" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold">منتجات المتجر</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditing({ id: "", name: "", description: "", priceBefore: 0, priceAfter: 0, image: "", stock: 0 })} className="rounded-xl shadow-glow">
                      <Plus className="size-4" /> إضافة منتج
                    </Button>
                  </DialogTrigger>
                  <ProductDialog product={editing} onSave={saveProduct} />
                </Dialog>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => {
                  const discount = Math.round(((p.priceBefore - p.priceAfter) / p.priceBefore) * 100);
                  return (
                    <Card key={p.id} className="overflow-hidden rounded-2xl group hover:shadow-card transition-all">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {discount > 0 && (
                          <Badge className="absolute top-3 right-3 rounded-full bg-destructive text-destructive-foreground">
                            <Tag className="size-3 ml-1" /> خصم {discount}%
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold leading-tight">{p.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-lg font-bold text-primary">{p.priceAfter} ر.س</span>
                          {p.priceBefore > p.priceAfter && (
                            <span className="text-sm text-muted-foreground line-through">{p.priceBefore}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-muted-foreground">المخزون: {p.stock}</span>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="size-8 rounded-lg" onClick={() => { setEditing(p); setOpen(true); }}>
                              <Edit3 className="size-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="size-8 rounded-lg text-destructive" onClick={() => setProducts(products.filter(x => x.id !== p.id))}>
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* DELIVERY */}
            <TabsContent value="delivery" className="mt-6">
              <Card className="p-6 rounded-2xl space-y-5">
                <div>
                  <h2 className="text-xl font-display font-bold flex items-center gap-2"><Truck className="size-5" /> شركة التوصيل</h2>
                  <p className="text-sm text-muted-foreground mt-1">اختر مزوّد التوصيل الافتراضي لطلباتك</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>شركة التوصيل</Label>
                    <Select defaultValue="أرامكس">
                      <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {deliveryCompanies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>سعر التوصيل (ر.س)</Label>
                    <Input type="number" defaultValue={25} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>وقت التوصيل المتوقع</Label>
                    <Input defaultValue="1-3 أيام عمل" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>حد الشحن المجاني (ر.س)</Label>
                    <Input type="number" defaultValue={300} className="h-11 rounded-xl" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">تفعيل التتبع المباشر</p>
                    <p className="text-xs text-muted-foreground">إرسال رابط تتبع للعميل عبر واتساب</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="rounded-xl">حفظ إعدادات التوصيل</Button>
              </Card>
            </TabsContent>

            {/* SETTINGS */}
            <TabsContent value="settings" className="mt-6 space-y-4">
              <Card className="p-6 rounded-2xl space-y-5">
                <h2 className="text-xl font-display font-bold flex items-center gap-2"><StoreIcon className="size-5" /> معلومات المتجر</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم المتجر</Label>
                    <Input value={storeName} onChange={e => setStoreName(e.target.value)} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>الشعار التعريفي</Label>
                    <Input value={tagline} onChange={e => setTagline(e.target.value)} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Phone className="size-3" /> رقم الواتساب</Label>
                    <Input defaultValue="+966 5xx xxx xxx" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><MapPin className="size-3" /> الموقع</Label>
                    <Input defaultValue="الرياض، السعودية" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="flex items-center gap-1"><Clock className="size-3" /> ساعات العمل</Label>
                    <Input defaultValue="السبت - الخميس | 9 ص - 11 م" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>وصف المتجر</Label>
                    <Textarea rows={3} defaultValue="متجر متخصص في الإلكترونيات والإكسسوارات بأفضل الأسعار وأعلى جودة." className="rounded-xl" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 rounded-2xl space-y-4">
                <h2 className="text-xl font-display font-bold">التحكم العام</h2>
                {[
                  { t: "تفعيل المتجر", d: "إظهار المتجر للعملاء في البحث" },
                  { t: "السماح بالطلبات", d: "قبول طلبات جديدة من العملاء" },
                  { t: "الردود الآلية بالـ AI", d: "تفعيل المساعد الذكي للرد على الاستفسارات" },
                  { t: "إشعارات الواتساب", d: "إرسال إشعارات الطلبات لرقم التاجر" },
                  { t: "عرض الأسعار قبل الخصم", d: "إظهار السعر الأصلي مشطوبًا" },
                ].map(item => (
                  <div key={item.t} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition">
                    <div>
                      <p className="font-medium text-sm">{item.t}</p>
                      <p className="text-xs text-muted-foreground">{item.d}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button className="rounded-xl flex-1">حفظ كل الإعدادات</Button>
                  <Button variant="outline" className="rounded-xl">إلغاء</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function ProductDialog({ product, onSave }: { product: Product | null; onSave: (p: Product) => void }) {
  const [form, setForm] = useState<Product>(
    product ?? { id: "", name: "", description: "", priceBefore: 0, priceAfter: 0, image: "", stock: 0 }
  );

  // sync when opening editor for different product
  if (product && product.id !== form.id) setForm(product);

  const onImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setForm({ ...form, image: URL.createObjectURL(f) });
  };

  const discount = form.priceBefore > 0 && form.priceAfter > 0
    ? Math.max(0, Math.round(((form.priceBefore - form.priceAfter) / form.priceBefore) * 100)) : 0;

  return (
    <DialogContent dir="rtl" className="max-w-lg rounded-2xl">
      <DialogHeader>
        <DialogTitle>{form.id ? "تعديل المنتج" : "إضافة منتج جديد"}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <label className="block cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={onImg} />
          <div className="aspect-video rounded-xl border-2 border-dashed border-border bg-muted/30 grid place-items-center overflow-hidden hover:border-primary transition">
            {form.image ? (
              <img src={form.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="size-8 mx-auto mb-2" />
                <p className="text-sm">اضغط لرفع صورة المنتج</p>
              </div>
            )}
          </div>
        </label>

        <div className="space-y-2">
          <Label>اسم المنتج</Label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="h-11 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>الوصف</Label>
          <Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>السعر قبل الخصم</Label>
            <Input type="number" value={form.priceBefore || ""} onChange={e => setForm({ ...form, priceBefore: +e.target.value })} className="h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>السعر بعد الخصم</Label>
            <Input type="number" value={form.priceAfter || ""} onChange={e => setForm({ ...form, priceAfter: +e.target.value })} className="h-11 rounded-xl" />
          </div>
        </div>
        {discount > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 text-primary text-sm">
            <Tag className="size-4" /> سيتم عرض خصم {discount}% للعملاء
          </div>
        )}
        <div className="space-y-2">
          <Label>الكمية المتوفرة</Label>
          <Input type="number" value={form.stock || ""} onChange={e => setForm({ ...form, stock: +e.target.value })} className="h-11 rounded-xl" />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave(form)} disabled={!form.name || form.priceAfter <= 0} className="rounded-xl w-full">
          حفظ المنتج
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
