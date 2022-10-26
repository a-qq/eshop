interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  longDescription: string;
}

export type StoreApiResponse = Product[];

export const getProducts = async (
  pageNumber: number,
  pageSize: number = 24
) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${pageSize}&offset=${
      pageSize * (pageNumber - 1)
    }`
  );
  const data: StoreApiResponse = await res.json();
  return data;
};

export const getProduct = async (id: number) => {
  if(id < 1)
    return null
    
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`
  );

  const data: Product = await res.json();
  console.log(data);
  return data;
}; 
