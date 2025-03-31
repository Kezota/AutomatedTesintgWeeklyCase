import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/lib/types";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/useProduct";

export function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [updateName, setUpdateName] = useState<string>("");
  const [updateStock, setUpdateStock] = useState<number>(0);
  const [addName, setAddName] = useState<string>("");
  const [addStock, setAddStock] = useState<number>(0);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();

  // Middleware
  useEffect(() => {
    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return !!token;
    };
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddProduct = async () => {
    const newProduct: Product = { name: addName, stock: addStock };
    createProduct.mutate(newProduct, {
      onSuccess: () => {
        setAddDialogOpen(false);
        setAddName("");
        setAddStock(0);
      },
      onError: () => {
        setAddDialogOpen(false);
        setAddName("");
        setAddStock(0);
      },
    });
  };

  const handleUpdate = async () => {
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        id: selectedProduct.id!,
        name: updateName,
        stock: updateStock,
      };

      updateProduct.mutate(updatedProduct, {
        onSuccess: () => {
          setUpdateDialogOpen(false);
          setSelectedProduct(null);
          setUpdateName("");
          setUpdateStock(0);
        },
        onError: () => {
          setUpdateDialogOpen(false);
          setSelectedProduct(null);
          setUpdateName("");
          setUpdateStock(0);
        },
      });
    }
  };

  const handleDelete = async (id: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
      },
      onError: () => {
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Product Dashboard</h2>

      {/* Add Product Button */}
      <div className="mb-4 flex justify-end">
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => setAddDialogOpen(open)}
        ></Dialog>
      </div>

      {/* Shadcn Table for Products */}
      <Table>
        <TableCaption>List of Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Dialog
                  open={isUpdateDialogOpen}
                  onOpenChange={(open) => setUpdateDialogOpen(open)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-yellow-500 text-white mr-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setUpdateName(product.name);
                        setUpdateStock(product.stock);
                        setUpdateDialogOpen(true);
                      }}
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Dialog
                  open={isDeleteDialogOpen}
                  onOpenChange={(open) => setDeleteDialogOpen(open)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() => {
                        setSelectedProduct(product);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>{/* Footer or pagination if necessary */}</TableFooter>
      </Table>

      {/* Update Dialog */}
      <Dialog
        open={isUpdateDialogOpen}
        onOpenChange={(open) => setUpdateDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>Update product details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Product Name
              </Label>
              <Input
                id="name"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                value={updateStock}
                onChange={(e) => setUpdateStock(Number(e.target.value))}
                type="number"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-500 text-white"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
            <Button
              className="bg-gray-500 text-white"
              onClick={() => setUpdateDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => setDeleteDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-red-500 text-white"
              onClick={() => handleDelete(selectedProduct?.id || 0)}
            >
              Delete
            </Button>
            <Button
              className="bg-gray-500 text-white"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => setAddDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details of the new product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-name" className="text-right">
                Product Name
              </Label>
              <Input
                id="add-name"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-stock" className="text-right">
                Stock
              </Label>
              <Input
                id="add-stock"
                value={addStock}
                onChange={(e) => setAddStock(Number(e.target.value))}
                type="number"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-500 text-white"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
            <Button
              className="bg-gray-500 text-white"
              onClick={() => setAddDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <Button
          className="bg-blue-500 text-white"
          onClick={() => setAddDialogOpen(true)}
        >
          Add New Product
        </Button>
      </div>
    </section>
  );
}

export default Dashboard;
